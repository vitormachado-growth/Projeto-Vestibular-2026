import { useState, useMemo } from 'react';
import { questoes } from '../data/questoesData';
import './Ranking.css';

const STORAGE_KEY = 'ranking_historico_v1';

const TEMAS_REDACAO = [
  'Desafios para a valorização de comunidades tradicionais no Brasil',
  'O papel da educação financeira na redução das desigualdades sociais',
  'Os impactos das redes sociais na saúde mental dos jovens brasileiros',
  'A invisibilidade da população em situação de rua no Brasil',
  'Desafios da inclusão digital no Brasil contemporâneo',
  'O avanço do trabalho informal e seus efeitos na proteção social',
  'A crise hídrica no Brasil e os desafios para o desenvolvimento sustentável',
  'Os obstáculos ao acesso à saúde mental no Brasil',
  'Desigualdade racial no mercado de trabalho brasileiro',
  'O papel do saneamento básico na garantia de direitos',
  'Violência contra a mulher no ambiente doméstico',
  'Os desafios da mobilidade urbana nas grandes cidades',
  'A desinformação como ameaça à democracia',
  'O impacto do desmatamento na soberania alimentar do Brasil',
  'Desafios da integração de refugiados e migrantes no Brasil',
  'A superexploração do trabalho na era dos aplicativos',
  'Crises climáticas e populações vulneráveis no Brasil',
  'O acesso à cultura como direito fundamental no Brasil',
  'A evasão escolar no Brasil: causas e consequências',
  'Desafios para a proteção de crianças e adolescentes na era digital',
  'O papel do esporte na transformação social no Brasil',
  'O envelhecimento da população e os desafios para a previdência social',
  'Ciência e negacionismo: impactos na saúde pública',
  'A importância da leitura para a cidadania plena',
];

const COMPETENCIAS = [
  { id: 'c1', label: 'Competência 1', desc: 'Domínio da norma culta' },
  { id: 'c2', label: 'Competência 2', desc: 'Compreensão da proposta e aplicação de conceitos' },
  { id: 'c3', label: 'Competência 3', desc: 'Seleção e organização das informações' },
  { id: 'c4', label: 'Competência 4', desc: 'Coesão e coerência textual' },
  { id: 'c5', label: 'Competência 5', desc: 'Proposta de intervenção respeitando direitos humanos' },
];

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0x100000000;
  };
}

function getWeeklyQuestions(semana, ano, count = 15) {
  const seed = semana * 1000 + ano;
  const rng = seededRandom(seed);
  const pool = [...questoes];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

function getWeeklyTema(semana) {
  return TEMAS_REDACAO[(semana - 1) % TEMAS_REDACAO.length];
}

function formatWeek(semana, ano) {
  return `Semana ${semana}/${ano}`;
}

function scoreClass(pct) {
  return pct >= 70 ? 'great' : pct >= 50 ? 'good' : 'bad';
}

function loadHistorico() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveEntry(entry) {
  const hist = loadHistorico();
  const idx = hist.findIndex(e => e.semana === entry.semana && e.ano === entry.ano);
  if (idx >= 0) hist[idx] = entry;
  else hist.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hist));
}

// ── Sub-screens ───────────────────────────────────────────────────────────────

function SimuladoSemanal({ questions, onFinish, onCancel }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const total = questions.length;

  function selectAnswer(qid, alt) {
    setAnswers(prev => ({ ...prev, [qid]: alt }));
  }

  function finish() {
    let corretas = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) corretas++;
    });
    const pct = Math.round((corretas / total) * 100);
    onFinish({ corretas, total, pct, answers });
  }

  if (finished) {
    let corretas = 0;
    questions.forEach(q => { if (answers[q.id] === q.answer) corretas++; });
    const pct = Math.round((corretas / total) * 100);
    return (
      <div className="rk-result-wrap">
        <div className={`rk-score-circle ${scoreClass(pct)}`}>{pct}%</div>
        <p className="rk-result-sub">{corretas}/{total} corretas</p>
        <button className="rk-btn-primary" onClick={() => onFinish({ corretas, total, pct, answers })}>
          Continuar para Redação
        </button>
      </div>
    );
  }

  const answered = Object.keys(answers).length;

  return (
    <div className="rk-exam-wrap">
      <div className="rk-exam-topbar">
        <span className="rk-exam-progress">{current + 1}/{total}</span>
        <div className="rk-dots">
          {questions.map((q2, i) => (
            <button
              key={q2.id}
              className={`rk-dot ${i === current ? 'active' : ''} ${answers[q2.id] ? 'answered' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <button className="rk-btn-cancel" onClick={onCancel}>✕</button>
      </div>

      <div className="rk-question-card">
        <div className="rk-q-meta">
          <span className="rk-tag">{q.subject}</span>
          <span className="rk-tag muted">{q.topic}</span>
        </div>
        <p className="rk-q-statement">{q.statement}</p>
        <div className="rk-alternatives">
          {q.alternatives.map(alt => (
            <button
              key={alt.id}
              className={`rk-alt ${answers[q.id] === alt.id ? 'selected' : ''}`}
              onClick={() => selectAnswer(q.id, alt.id)}
            >
              <span className="rk-alt-letter">{alt.id.toUpperCase()}</span>
              {alt.text}
            </button>
          ))}
        </div>
      </div>

      <div className="rk-exam-footer">
        <button
          className="rk-btn-secondary"
          disabled={current === 0}
          onClick={() => setCurrent(c => c - 1)}
        >
          ← Anterior
        </button>
        {current < total - 1 ? (
          <button
            className="rk-btn-primary"
            onClick={() => setCurrent(c => c + 1)}
          >
            Próxima →
          </button>
        ) : (
          <button
            className="rk-btn-primary"
            disabled={answered < total}
            onClick={() => setFinished(true)}
            title={answered < total ? `Responda todas as ${total} questões` : ''}
          >
            Finalizar ({answered}/{total})
          </button>
        )}
      </div>
    </div>
  );
}

function AvaliarRedacao({ tema, onFinish, onCancel }) {
  const [notas, setNotas] = useState({ c1: 0, c2: 0, c3: 0, c4: 0, c5: 0 });

  const options = [0, 40, 80, 120, 160, 200];
  const total = Object.values(notas).reduce((s, v) => s + v, 0);

  return (
    <div className="rk-avaliar-wrap">
      <h2 className="rk-avaliar-title">Avalie sua Redação</h2>
      <p className="rk-avaliar-tema">Tema: <strong>{tema}</strong></p>
      <p className="rk-avaliar-sub">
        Escreva sua redação no papel e avalie cada competência conforme os critérios do ENEM.
      </p>

      <div className="rk-competencias">
        {COMPETENCIAS.map(comp => (
          <div key={comp.id} className="rk-comp-row">
            <div className="rk-comp-info">
              <span className="rk-comp-label">{comp.label}</span>
              <span className="rk-comp-desc">{comp.desc}</span>
            </div>
            <div className="rk-comp-options">
              {options.map(v => (
                <button
                  key={v}
                  className={`rk-nota-btn ${notas[comp.id] === v ? 'selected' : ''}`}
                  onClick={() => setNotas(prev => ({ ...prev, [comp.id]: v }))}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rk-total-redacao">
        Nota total: <strong>{total}</strong> / 1000
      </div>

      <div className="rk-avaliar-footer">
        <button className="rk-btn-secondary" onClick={onCancel}>Cancelar</button>
        <button
          className="rk-btn-primary"
          onClick={() => onFinish(notas)}
        >
          Salvar semana
        </button>
      </div>
    </div>
  );
}

// ── Dados fictícios do leaderboard ───────────────────────────────────────────

const MOCK_USERS = [
  { id: 'lucas',   nome: 'Lucas Mendes',    iniciais: 'LM', cor: '#6366f1', score: 892 },
  { id: 'ana',     nome: 'Ana Beatriz',     iniciais: 'AB', cor: '#ec4899', score: 845 },
  { id: 'pedro',   nome: 'Pedro Alves',     iniciais: 'PA', cor: '#f59e0b', score: 798 },
  { id: 'mari',    nome: 'Mariana Costa',   iniciais: 'MC', cor: '#10b981', score: 756 },
  { id: 'gabriel', nome: 'Gabriel Santos',  iniciais: 'GS', cor: '#3b82f6', score: 721 },
  { id: 'julia',   nome: 'Julia Ferreira',  iniciais: 'JF', cor: '#8b5cf6', score: 689 },
  { id: 'rafael',  nome: 'Rafael Lima',     iniciais: 'RL', cor: '#ef4444', score: 645 },
];

function Podio({ players }) {
  const [segundo, primeiro, terceiro] = [players[1], players[0], players[2]];
  const medals = { 0: { label: '🥇', color: '#f59e0b', height: 90 }, 1: { label: '🥈', color: '#94a3b8', height: 60 }, 2: { label: '🥉', color: '#cd7c3a', height: 44 } };

  const Card = ({ player, pos, originalPos }) => {
    const m = medals[originalPos];
    return (
      <div className={`podio-card pos-${pos}`}>
        <span className="podio-medal">{m.label}</span>
        <div className="podio-avatar" style={{ background: player.cor }}>
          {player.iniciais}
          {player.isYou && <span className="podio-you-badge">Você</span>}
        </div>
        <span className="podio-name">{player.isYou ? 'Você' : player.nome.split(' ')[0]}</span>
        <span className="podio-score">{player.score} pts</span>
        <div className="podio-block" style={{ height: m.height, background: m.color }} />
      </div>
    );
  };

  return (
    <div className="podio-wrap">
      {segundo && <Card player={segundo} pos="second" originalPos={1} />}
      {primeiro && <Card player={primeiro} pos="first"  originalPos={0} />}
      {terceiro && <Card player={terceiro} pos="third"  originalPos={2} />}
    </div>
  );
}

// ── Main Ranking component ────────────────────────────────────────────────────

export default function Ranking() {
  const today = new Date();
  const semanaAtual = getWeekNumber(today);
  const anoAtual = today.getFullYear();

  const [historico, setHistorico] = useState(loadHistorico);
  const [phase, setPhase] = useState('home'); // home | simulado | redacao | avaliar
  const [simResult, setSimResult] = useState(null);

  const questions = useMemo(
    () => getWeeklyQuestions(semanaAtual, anoAtual),
    [semanaAtual, anoAtual]
  );
  const tema = getWeeklyTema(semanaAtual);

  const entradaAtual = historico.find(e => e.semana === semanaAtual && e.ano === anoAtual);
  const simDone = entradaAtual?.simulado != null;
  const redDone = entradaAtual?.redacao != null;
  const semanaCompleta = simDone && redDone;

  function handleSimFinish(result) {
    setSimResult(result);
    setPhase('redacao');
  }

  function handleRedacaoSkip() {
    if (!simResult) return;
    const entry = {
      semana: semanaAtual, ano: anoAtual,
      simulado: simResult,
      redacao: null,
      score: simResult.pct * 10,
    };
    saveEntry(entry);
    setHistorico(loadHistorico());
    setPhase('home');
    setSimResult(null);
  }

  function handleAvaliacaoFinish(notas) {
    const notaRedacao = Object.values(notas).reduce((s, v) => s + v, 0);
    const simPts = (simResult?.pct ?? entradaAtual?.simulado?.pct ?? 0) * 10;
    const redPts = notaRedacao;
    const score = Math.round((simPts + redPts) / 2);

    const entry = {
      semana: semanaAtual, ano: anoAtual,
      simulado: simResult ?? entradaAtual?.simulado,
      redacao: { notas, total: notaRedacao },
      score,
    };
    saveEntry(entry);
    setHistorico(loadHistorico());
    setPhase('home');
    setSimResult(null);
  }

  // ── Phase screens ───────────────────────────────────────────────────────────

  if (phase === 'simulado') {
    return (
      <SimuladoSemanal
        questions={questions}
        onFinish={handleSimFinish}
        onCancel={() => setPhase('home')}
      />
    );
  }

  if (phase === 'redacao') {
    return (
      <div className="rk-redacao-wrap">
        <div className="rk-redacao-header">
          <h2>Redação Semanal</h2>
          <p>Escreva sua redação sobre o tema abaixo e depois avalie-a.</p>
        </div>
        <div className="rk-tema-card">
          <span className="rk-tema-label">Tema da semana</span>
          <p className="rk-tema-text">{tema}</p>
        </div>
        <div className="rk-redacao-tips">
          <h3>Estrutura sugerida</h3>
          <ul>
            <li><strong>Introdução:</strong> apresente o tema com repertório sociocultural.</li>
            <li><strong>Desenvolvimento 1:</strong> argumento + dados/exemplos concretos.</li>
            <li><strong>Desenvolvimento 2:</strong> aprofundamento ou segundo argumento.</li>
            <li><strong>Conclusão:</strong> proposta de intervenção com agente, ação, meio, finalidade e detalhamento.</li>
          </ul>
        </div>
        <div className="rk-redacao-footer">
          <button className="rk-btn-secondary" onClick={handleRedacaoSkip}>
            Pular redação
          </button>
          <button className="rk-btn-primary" onClick={() => setPhase('avaliar')}>
            Já escrevi — avaliar
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'avaliar') {
    return (
      <AvaliarRedacao
        tema={tema}
        onFinish={handleAvaliacaoFinish}
        onCancel={() => setPhase('redacao')}
      />
    );
  }

  // ── Home ────────────────────────────────────────────────────────────────────

  // Monta leaderboard: usuários fictícios + "Você" com melhor score salvo
  const meuMelhorScore = useMemo(() => {
    const scores = historico.filter(e => e.score != null).map(e => e.score);
    return scores.length > 0 ? Math.max(...scores) : null;
  }, [historico]);

  const leaderboard = useMemo(() => {
    const lista = [...MOCK_USERS.map(u => ({ ...u }))];
    const eu = { id: 'voce', nome: 'Você', iniciais: 'VM', cor: '#3b82f6', score: meuMelhorScore ?? 0, isYou: true };
    lista.push(eu);
    return lista.sort((a, b) => b.score - a.score);
  }, [meuMelhorScore]);

  const minhaPosicao = leaderboard.findIndex(u => u.isYou) + 1;

  return (
    <div className="rk-wrap">

      <div className="rk-header">
        <div>
          <h1>Simulados Semanais</h1>
          <p>Desafio da {formatWeek(semanaAtual, anoAtual)}</p>
        </div>
        {meuMelhorScore && (
          <div className="rk-my-pos">
            <span className="rk-my-pos-label">Sua posição</span>
            <span className="rk-my-pos-value">#{minhaPosicao}</span>
          </div>
        )}
      </div>

      {/* ── Desafio da semana ─────────────────────────────────────────────── */}
      <div className="rk-challenge-card">
        <div className="rk-challenge-top">
          <div>
            <span className="rk-challenge-tag">Esta semana</span>
            <h2 className="rk-challenge-title">Desafio Semanal</h2>
          </div>
          <div className="rk-challenge-badges">
            <span className={`rk-badge ${simDone ? 'done' : 'pending'}`}>
              {simDone ? '✓' : '○'} Simulado
            </span>
            <span className={`rk-badge ${redDone ? 'done' : 'pending'}`}>
              {redDone ? '✓' : '○'} Redação
            </span>
          </div>
        </div>

        <div className="rk-challenge-actions">
          <div className="rk-action-card">
            <span className="rk-action-icon">📝</span>
            <div>
              <strong>Simulado — 15 questões</strong>
              <p>{questions.length} questões selecionadas para esta semana</p>
            </div>
            {simDone ? (
              <span className="rk-done-tag">{entradaAtual.simulado.pct}% ✓</span>
            ) : (
              <button className="rk-btn-primary small" onClick={() => setPhase('simulado')}>
                Iniciar
              </button>
            )}
          </div>

          <div className="rk-action-card">
            <span className="rk-action-icon">✒️</span>
            <div>
              <strong>Redação semanal</strong>
              <p className="rk-action-tema">{tema}</p>
            </div>
            {redDone ? (
              <span className="rk-done-tag">{entradaAtual.redacao.total}/1000 ✓</span>
            ) : (
              <button
                className={`rk-btn-primary small ${!simDone ? 'disabled' : ''}`}
                onClick={() => simDone && setPhase('redacao')}
                disabled={!simDone}
                title={!simDone ? 'Complete o simulado primeiro' : ''}
              >
                {simDone ? 'Iniciar' : 'Após o simulado'}
              </button>
            )}
          </div>
        </div>

        {semanaCompleta && (
          <div className="rk-semana-score">
            <span className="rk-semana-score-label">Pontuação da semana</span>
            <span className={`rk-semana-score-value ${scoreClass(entradaAtual.score / 10)}`}>
              {entradaAtual.score}
            </span>
            <span className="rk-semana-score-sub">/ 1000 pts</span>
          </div>
        )}
      </div>

      {/* ── Pódio ─────────────────────────────────────────────────────────── */}
      <div className="rk-section">
        <h2>Ranking geral — {formatWeek(semanaAtual, anoAtual)}</h2>
        <Podio players={leaderboard.slice(0, 3)} />
      </div>

      {/* ── Lista completa ────────────────────────────────────────────────── */}
      <div className="rk-section">
        <h2>Classificação completa</h2>
        <div className="rk-ranking-list">
          {leaderboard.map((user, i) => {
            const barColor = user.score >= 700 ? '#16a34a' : user.score >= 500 ? '#ca8a04' : '#dc2626';
            return (
              <div key={user.id} className={`rk-rank-row ${user.isYou ? 'current-week' : ''}`}>
                <span className="rk-rank-pos">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                </span>
                <div className="rk-rank-avatar" style={{ background: user.cor }}>
                  {user.iniciais}
                </div>
                <span className="rk-rank-week">
                  {user.isYou ? 'Você' : user.nome}
                </span>
                <div className="rk-rank-bar-wrap">
                  <div className="rk-rank-bar-fill" style={{ width: `${user.score / 10}%`, background: barColor }} />
                </div>
                <span className={`rk-rank-score ${scoreClass(user.score / 10)}`}>
                  {user.score > 0 ? `${user.score} pts` : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
