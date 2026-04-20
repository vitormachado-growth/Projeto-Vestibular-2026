import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import SimuladoPlayer from './SimuladoPlayer';
import './Ranking.css';

const TIPO_LABEL = {
  humanas_linguagens: 'Humanas + Linguagens',
  matematica_naturezas: 'Matemática + Naturezas',
};

const formatDateBR = (iso) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

function statusDe(temporada, hoje) {
  if (!temporada) return null;
  if (temporada.semana_fim < hoje) return 'finalizada';
  if (temporada.semana_inicio > hoje) return 'futura';
  return 'ativa';
}

export default function Ranking() {
  const [simulados, setSimulados] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(null); // { simuladoId, temporadaId }

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);
    const resQuery = user
      ? supabase.from('simulado_resultados').select('*').eq('user_id', user.id)
      : Promise.resolve({ data: [] });

    const [{ data: sims }, { data: temps }, { data: ress }, { data: lb }] = await Promise.all([
      supabase
        .from('simulados_semanais')
        .select('*, simulados_semanais_questoes(count)')
        .order('created_at', { ascending: false }),
      supabase
        .from('simulado_temporadas')
        .select('*')
        .order('semana_inicio', { ascending: false }),
      resQuery,
      supabase.from('simulado_leaderboard').select('*'),
    ]);
    setSimulados(sims || []);
    setTemporadas(temps || []);
    setResultados(ress || []);
    setLeaderboard(lb || []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const calcPontuacao = (r) => {
    if (!r.total_questoes) return 0;
    const pctQ = r.acertos / r.total_questoes;
    // Com redação: 80% vem das questões, 20% da redação (escala 0-1000)
    if (r.redacao_total != null) {
      return Math.round(pctQ * 800 + r.redacao_total * 0.2);
    }
    return Math.round(pctQ * 1000);
  };

  const resultadoPorSimulado = resultados.reduce((acc, r) => {
    acc[r.simulado_id] = r;
    return acc;
  }, {});

  const hoje = new Date().toISOString().split('T')[0];

  // Mapeia simulado_id → temporada (a mais recente se houver várias)
  const temporadaPorSimulado = temporadas.reduce((acc, t) => {
    if (!acc[t.simulado_id]) acc[t.simulado_id] = t;
    return acc;
  }, {});

  const temporadaAtiva = temporadas.find(t => statusDe(t, hoje) === 'ativa');
  const simuladoAtivo = temporadaAtiva
    ? simulados.find(s => s.id === temporadaAtiva.simulado_id)
    : null;

  // Agrupa resultados por simulado e ordena por pontuação
  const leaderboardPorSimulado = leaderboard.reduce((acc, r) => {
    if (!acc[r.simulado_id]) acc[r.simulado_id] = [];
    acc[r.simulado_id].push({ ...r, pontuacao: calcPontuacao(r) });
    return acc;
  }, {});
  Object.values(leaderboardPorSimulado).forEach(entries =>
    entries.sort((a, b) => b.pontuacao - a.pontuacao)
  );

  // Simulados que já têm ao menos 1 resultado — ordenados pela ordem de exibição
  const simuladosComRanking = simulados.filter(s => leaderboardPorSimulado[s.id]?.length > 0);

  if (playing) {
    return (
      <SimuladoPlayer
        simuladoId={playing.simuladoId}
        temporadaId={playing.temporadaId}
        onClose={() => {
          setPlaying(null);
          loadData();
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="rk-wrap">
        <p className="rk-empty">Carregando simulados…</p>
      </div>
    );
  }

  const abrirSimulado = (simuladoId, temporadaId) => {
    setPlaying({ simuladoId, temporadaId });
  };

  return (
    <div className="rk-wrap">
      <div className="rk-header">
        <div>
          <h1>Simulados Semanais</h1>
          <p>
            {temporadaAtiva
              ? `Temporada #${temporadaAtiva.numero} — ${formatDateBR(temporadaAtiva.semana_inicio)} a ${formatDateBR(temporadaAtiva.semana_fim)}`
              : 'Nenhuma temporada ativa no momento'}
          </p>
        </div>
      </div>

      {simuladoAtivo && (
        <SimuladoCard
          simulado={simuladoAtivo}
          temporada={temporadaAtiva}
          resultado={resultadoPorSimulado[simuladoAtivo.id]}
          onIniciar={abrirSimulado}
          destacado
        />
      )}

      <div className="rk-section">
        <h2>Todos os simulados</h2>
        {simulados.length === 0 ? (
          <div className="rk-empty">
            <span className="rk-empty-icon">📝</span>
            <h2>Nenhum simulado disponível</h2>
            <p>Os simulados criados no painel admin aparecerão aqui.</p>
          </div>
        ) : (
          <div className="rk-simulados-grid">
            {simulados.map(s => (
              <SimuladoCard
                key={s.id}
                simulado={s}
                temporada={temporadaPorSimulado[s.id]}
                resultado={resultadoPorSimulado[s.id]}
                onIniciar={abrirSimulado}
              />
            ))}
          </div>
        )}
      </div>

      {simuladosComRanking.map(s => {
        const entries = leaderboardPorSimulado[s.id];
        const minhaPosicao = entries.findIndex(r => r.user_id === currentUserId) + 1;
        return (
          <Leaderboard
            key={s.id}
            titulo={s.titulo}
            entries={entries}
            currentUserId={currentUserId}
            minhaPosicao={minhaPosicao}
          />
        );
      })}
    </div>
  );
}

function Leaderboard({ titulo, entries, currentUserId, minhaPosicao }) {
  const top3 = entries.slice(0, 3);

  const initial = (e) => (e.apelido || e.nome_completo || '?').charAt(0).toUpperCase();
  const nomeEx = (e) => e.apelido || e.nome_completo?.split(' ')[0] || 'Aluno';

  return (
    <>
      <div className="rk-section">
        <div className="rk-lb-head">
          <h2>🏆 Ranking — {titulo}</h2>
          {minhaPosicao > 0 && (
            <div className="rk-my-pos">
              <span className="rk-my-pos-label">Sua posição</span>
              <span className="rk-my-pos-value">#{minhaPosicao}</span>
            </div>
          )}
        </div>

        {top3.length > 0 && <Podio players={top3} currentUserId={currentUserId} />}
      </div>

      <div className="rk-section">
        <h2>Classificação completa</h2>
        <div className="rk-ranking-list">
          {entries.map((e, i) => {
            const isYou = e.user_id === currentUserId;
            const barPct = Math.min(100, (e.pontuacao / 1000) * 100);
            const barColor = e.pontuacao >= 700 ? '#16a34a' : e.pontuacao >= 500 ? '#ca8a04' : '#dc2626';
            return (
              <div key={e.user_id} className={`rk-rank-row ${isYou ? 'current-week' : ''}`}>
                <span className="rk-rank-pos">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                </span>
                <div className="rk-rank-avatar">
                  {e.avatar_url ? <img src={e.avatar_url} alt="" /> : initial(e)}
                </div>
                <span className="rk-rank-week">{isYou ? 'Você' : nomeEx(e)}</span>
                <div className="rk-rank-bar-wrap">
                  <div className="rk-rank-bar-fill" style={{ width: `${barPct}%`, background: barColor }} />
                </div>
                <span className="rk-rank-score">{e.pontuacao} pts</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Podio({ players, currentUserId }) {
  const [segundo, primeiro, terceiro] = [players[1], players[0], players[2]];
  const medals = {
    0: { label: '🥇', color: '#f59e0b', height: 90 },
    1: { label: '🥈', color: '#94a3b8', height: 60 },
    2: { label: '🥉', color: '#cd7c3a', height: 44 },
  };

  const Card = ({ player, pos, originalPos }) => {
    if (!player) return null;
    const m = medals[originalPos];
    const isYou = player.user_id === currentUserId;
    const nome = player.apelido || player.nome_completo?.split(' ')[0] || 'Aluno';
    const initial = nome.charAt(0).toUpperCase();
    return (
      <div className={`podio-card pos-${pos}`}>
        <span className="podio-medal">{m.label}</span>
        <div className="podio-avatar">
          {player.avatar_url ? <img src={player.avatar_url} alt={nome} /> : initial}
          {isYou && <span className="podio-you-badge">Você</span>}
        </div>
        <span className="podio-name">{isYou ? 'Você' : nome}</span>
        <span className="podio-score">{player.pontuacao} pts</span>
        <div className="podio-block" style={{ height: m.height, background: m.color }} />
      </div>
    );
  };

  return (
    <div className="podio-wrap">
      {segundo && <Card player={segundo} pos="second" originalPos={1} />}
      {primeiro && <Card player={primeiro} pos="first" originalPos={0} />}
      {terceiro && <Card player={terceiro} pos="third" originalPos={2} />}
    </div>
  );
}

function SimuladoCard({ simulado, temporada, resultado, onIniciar, destacado }) {
  const hoje = new Date().toISOString().split('T')[0];
  const status = statusDe(temporada, hoje);
  const questoesCount = simulado.simulados_semanais_questoes?.[0]?.count ?? 0;
  const feito = !!resultado;

  const statusLabel = {
    ativa: '🔴 Esta semana',
    futura: '⏳ Em breve',
    finalizada: '✓ Finalizada',
  };

  const pct = feito && resultado.total_questoes > 0
    ? Math.round((resultado.acertos / resultado.total_questoes) * 100)
    : null;

  const podeFazer = questoesCount > 0 && status !== 'futura';

  const labelBotao = () => {
    if (feito) return 'Ver resultado';
    if (status === 'finalizada') return 'Encerrado';
    if (status === 'futura') return 'Em breve';
    if (questoesCount === 0) return 'Sem questões';
    return 'Iniciar';
  };

  return (
    <div className={`rk-sim-card ${destacado ? 'destacado' : ''} ${status || ''} ${feito ? 'feito' : ''}`}>
      <div className="rk-sim-card-head">
        <div>
          {destacado && <span className="rk-challenge-tag">Esta semana</span>}
          <h3 className="rk-sim-title">{simulado.titulo}</h3>
        </div>
        {feito ? (
          <span className="rk-sim-status ativa">✓ {pct}%</span>
        ) : status ? (
          <span className={`rk-sim-status ${status}`}>{statusLabel[status]}</span>
        ) : null}
      </div>

      <div className="rk-sim-meta">
        <span className="rk-sim-tag">{TIPO_LABEL[simulado.tipo] || simulado.tipo}</span>
        <span className="rk-sim-dot">•</span>
        <span>{questoesCount} / 80 questões</span>
        {simulado.tem_redacao && (
          <>
            <span className="rk-sim-dot">•</span>
            <span>✒️ com redação</span>
          </>
        )}
      </div>

      {temporada && (
        <p className="rk-sim-periodo">
          {formatDateBR(temporada.semana_inicio)} — {formatDateBR(temporada.semana_fim)}
        </p>
      )}

      <div className="rk-sim-actions">
        <button
          className="rk-btn-primary small"
          disabled={!feito && !podeFazer}
          onClick={() => onIniciar(simulado.id, temporada?.id)}
        >
          {labelBotao()}
        </button>
      </div>
    </div>
  );
}
