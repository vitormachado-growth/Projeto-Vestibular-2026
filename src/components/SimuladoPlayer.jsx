import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { RenderConteudo } from './Admin';
import './SimuladoPlayer.css';

const AREA_LABELS = {
  humanas: 'Humanas',
  linguagens: 'Linguagens',
  matematica: 'Matemática',
  naturezas: 'Naturezas',
};

const AREAS_POR_TIPO = {
  humanas_linguagens: ['humanas', 'linguagens'],
  matematica_naturezas: ['matematica', 'naturezas'],
};

const COMPETENCIAS = [
  { id: 'c1', label: 'Competência 1', desc: 'Domínio da norma culta' },
  { id: 'c2', label: 'Competência 2', desc: 'Compreensão da proposta e aplicação de conceitos' },
  { id: 'c3', label: 'Competência 3', desc: 'Seleção e organização das informações' },
  { id: 'c4', label: 'Competência 4', desc: 'Coesão e coerência textual' },
  { id: 'c5', label: 'Competência 5', desc: 'Proposta de intervenção respeitando direitos humanos' },
];

const NOTA_OPTS = [0, 40, 80, 120, 160, 200];

export default function SimuladoPlayer({ simuladoId, temporadaId, onClose }) {
  const [loading, setLoading] = useState(true);
  const [simulado, setSimulado] = useState(null);
  const [questoes, setQuestoes] = useState([]);
  const [redacao, setRedacao] = useState(null);
  const [resultadoExistente, setResultadoExistente] = useState(null);
  const [userId, setUserId] = useState(null);

  // Play state
  const [fase, setFase] = useState('intro'); // intro | questoes | redacao | avaliar | finalizado
  const [respostas, setRespostas] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [notasRedacao, setNotasRedacao] = useState({ c1: 0, c2: 0, c3: 0, c4: 0, c5: 0 });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setLoading(false); return; }
        setUserId(user.id);

        const [
          { data: sim, error: e1 },
          { data: qs,  error: e2 },
          { data: red, error: e3 },
          { data: resExist, error: e4 },
        ] = await Promise.all([
          supabase.from('simulados_semanais').select('*').eq('id', simuladoId).single(),
          supabase.from('simulados_semanais_questoes').select('*').eq('simulado_id', simuladoId).order('area').order('ordem'),
          supabase.from('simulados_semanais_redacao').select('*').eq('simulado_id', simuladoId).maybeSingle(),
          supabase.from('simulado_resultados').select('*').eq('simulado_id', simuladoId).eq('user_id', user.id).maybeSingle(),
        ]);

        if (e1) console.error('simulado:', e1);
        if (e2) console.error('questoes:', e2);
        if (e3) console.error('redacao:', e3);
        if (e4) console.error('resultado:', e4);

        setSimulado(sim);
        setQuestoes(qs || []);
        setRedacao(red);
        setResultadoExistente(resExist);

        if (resExist) {
          setRespostas(resExist.respostas || {});
          if (resExist.redacao_notas) setNotasRedacao(resExist.redacao_notas);
          setFase('finalizado');
        }
      } catch (err) {
        console.error('SimuladoPlayer load error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [simuladoId]);

  const questoesOrdenadas = questoes; // já ordenadas por area+ordem

  const calcularAcertos = () => {
    let ac = 0;
    for (const q of questoesOrdenadas) {
      if (respostas[q.id] === q.gabarito) ac++;
    }
    return ac;
  };

  const porArea = () => {
    const map = {};
    for (const q of questoesOrdenadas) {
      if (!map[q.area]) map[q.area] = { total: 0, acertos: 0 };
      map[q.area].total++;
      if (respostas[q.id] === q.gabarito) map[q.area].acertos++;
    }
    return map;
  };

  const salvarResultado = async (notasFinal = null) => {
    setSaving(true);
    const acertos = calcularAcertos();
    const redTotal = notasFinal
      ? Object.values(notasFinal).reduce((s, v) => s + v, 0)
      : null;

    const payload = {
      user_id: userId,
      simulado_id: simuladoId,
      temporada_id: temporadaId || null,
      respostas,
      acertos,
      total_questoes: questoesOrdenadas.length,
      redacao_notas: notasFinal,
      redacao_total: redTotal,
    };

    const { data, error } = await supabase
      .from('simulado_resultados')
      .upsert(payload, { onConflict: 'user_id,simulado_id' })
      .select()
      .single();

    setSaving(false);
    if (error) {
      alert('Erro ao salvar: ' + error.message);
      return;
    }
    setResultadoExistente(data);
    setFase('finalizado');
  };

  const handleFinalizarQuestoes = () => {
    if (simulado.tem_redacao && redacao) {
      setFase('redacao');
    } else {
      salvarResultado();
    }
  };

  if (loading) {
    return (
      <div className="sp-wrap">
        <div className="sp-loading-card">
          <div className="sp-spinner" />
          <p>Carregando simulado…</p>
        </div>
      </div>
    );
  }

  if (!simulado) {
    return (
      <div className="sp-wrap">
        <button className="sp-back" onClick={onClose}>← Voltar</button>
        <div className="sp-loading-card">
          <p>Simulado não encontrado ou erro ao carregar.</p>
          <small>Verifique o console para detalhes.</small>
        </div>
      </div>
    );
  }

  // ── RESULTADO ─────────────────────────────────────
  if (fase === 'finalizado') {
    const r = resultadoExistente;
    const pct = r.total_questoes > 0 ? Math.round((r.acertos / r.total_questoes) * 100) : 0;
    const areas = porArea();

    return (
      <div className="sp-wrap">
        <button className="sp-back" onClick={onClose}>← Voltar</button>
        <div className="sp-result-card">
          <h1>{simulado.titulo}</h1>
          <p className="sp-result-sub">Seu resultado</p>

          <div className={`sp-score-circle ${pct >= 70 ? 'great' : pct >= 50 ? 'good' : 'bad'}`}>
            {pct}%
          </div>
          <p className="sp-result-count">{r.acertos} de {r.total_questoes} questões</p>

          <div className="sp-result-areas">
            {Object.entries(areas).map(([area, v]) => (
              <div key={area} className="sp-area-row">
                <span className="sp-area-label">{AREA_LABELS[area]}</span>
                <div className="sp-area-bar">
                  <div
                    className="sp-area-fill"
                    style={{ width: `${(v.acertos / v.total) * 100}%` }}
                  />
                </div>
                <span className="sp-area-pts">{v.acertos}/{v.total}</span>
              </div>
            ))}
          </div>

          {r.redacao_total != null && (
            <div className="sp-redacao-result">
              <span className="sp-redacao-label">Nota da redação</span>
              <span className="sp-redacao-value">{r.redacao_total} / 1000</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── INTRO ─────────────────────────────────────────
  if (fase === 'intro') {
    const areas = AREAS_POR_TIPO[simulado.tipo] || [];
    const totalPorArea = areas.reduce((acc, a) => {
      acc[a] = questoesOrdenadas.filter(q => q.area === a).length;
      return acc;
    }, {});

    return (
      <div className="sp-wrap">
        <button className="sp-back" onClick={onClose}>← Voltar</button>
        <div className="sp-intro-card">
          <h1>{simulado.titulo}</h1>
          <p className="sp-intro-sub">
            {questoesOrdenadas.length} questões
            {simulado.tem_redacao && redacao ? ' + redação' : ''}
          </p>

          <div className="sp-intro-areas">
            {areas.map(a => (
              <div key={a} className="sp-intro-area">
                <span>{AREA_LABELS[a]}</span>
                <strong>{totalPorArea[a] || 0} questões</strong>
              </div>
            ))}
            {simulado.tem_redacao && redacao && (
              <div className="sp-intro-area">
                <span>Redação</span>
                <strong>Tema: {redacao.tema.slice(0, 40)}…</strong>
              </div>
            )}
          </div>

          <div className="sp-intro-warn">
            <strong>⚠️ Atenção:</strong> você só pode fazer este simulado uma vez.
            Reserve tempo suficiente antes de começar.
          </div>

          <button
            className="sp-btn-primary"
            onClick={() => setFase('questoes')}
            disabled={questoesOrdenadas.length === 0}
          >
            Começar simulado
          </button>
        </div>
      </div>
    );
  }

  // ── QUESTÕES ──────────────────────────────────────
  if (fase === 'questoes') {
    const q = questoesOrdenadas[currentIdx];
    const total = questoesOrdenadas.length;
    const answered = Object.keys(respostas).length;

    // Dots agrupados por área
    const groups = {};
    questoesOrdenadas.forEach((qt, i) => {
      if (!groups[qt.area]) groups[qt.area] = [];
      groups[qt.area].push({ idx: i, id: qt.id });
    });

    return (
      <div className="sp-wrap">
        <div className="sp-topbar">
          <span className="sp-progress">{currentIdx + 1}/{total}</span>
          <span className="sp-area-badge">{AREA_LABELS[q.area]}</span>
          <button className="sp-btn-cancel" onClick={onClose}>✕</button>
        </div>

        <div className="sp-nav">
          {Object.entries(groups).map(([area, items]) => (
            <div key={area} className="sp-nav-group">
              <label>{AREA_LABELS[area]}</label>
              <div className="sp-dots">
                {items.map(it => (
                  <button
                    key={it.id}
                    className={`sp-dot ${it.idx === currentIdx ? 'active' : ''} ${respostas[it.id] ? 'answered' : ''}`}
                    onClick={() => setCurrentIdx(it.idx)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="sp-question">
          <div className="sp-q-body">
            <RenderConteudo texto={q.enunciado} />
          </div>
          <div className="sp-alts">
            {q.alternativas.map(alt => (
              <button
                key={alt.letra}
                className={`sp-alt ${respostas[q.id] === alt.letra ? 'selected' : ''}`}
                onClick={() => setRespostas(r => ({ ...r, [q.id]: alt.letra }))}
              >
                <span className="sp-alt-letra">{alt.letra}</span>
                <div className="sp-alt-body"><RenderConteudo texto={alt.texto} /></div>
              </button>
            ))}
          </div>
        </div>

        <div className="sp-footer">
          <button
            className="sp-btn-secondary"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(i => i - 1)}
          >
            ← Anterior
          </button>
          {currentIdx < total - 1 ? (
            <button className="sp-btn-primary" onClick={() => setCurrentIdx(i => i + 1)}>
              Próxima →
            </button>
          ) : (
            <button
              className="sp-btn-primary"
              disabled={saving}
              onClick={() => {
                const unanswered = total - answered;
                if (unanswered > 0 && !confirm(`${unanswered} questão(ões) não respondida(s). Finalizar mesmo assim?`)) return;
                handleFinalizarQuestoes();
              }}
            >
              {saving ? 'Salvando…' : `Finalizar (${answered}/${total})`}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── REDAÇÃO ────────────────────────────────────────
  if (fase === 'redacao') {
    return (
      <div className="sp-wrap">
        <div className="sp-redacao-head">
          <h2>Redação</h2>
          <p>Escreva sua redação no papel. Depois, avalie-a com os critérios do ENEM.</p>
        </div>
        <div className="sp-tema-card">
          <span className="sp-tema-label">Tema</span>
          <p className="sp-tema-text">{redacao.tema}</p>
        </div>
        {redacao.textos_motivadores && (
          <div className="sp-textos">
            <h3>Textos motivadores</h3>
            <pre>{redacao.textos_motivadores}</pre>
          </div>
        )}
        <div className="sp-footer">
          <button className="sp-btn-secondary" onClick={() => salvarResultado()}>
            Pular redação
          </button>
          <button className="sp-btn-primary" onClick={() => setFase('avaliar')}>
            Já escrevi — avaliar
          </button>
        </div>
      </div>
    );
  }

  // ── AVALIAR REDAÇÃO ─────────────────────────────────
  if (fase === 'avaliar') {
    const total = Object.values(notasRedacao).reduce((s, v) => s + v, 0);
    return (
      <div className="sp-wrap">
        <div className="sp-redacao-head">
          <h2>Avalie sua redação</h2>
          <p>Atribua uma nota de 0 a 200 para cada competência.</p>
        </div>
        <div className="sp-competencias">
          {COMPETENCIAS.map(comp => (
            <div key={comp.id} className="sp-comp-row">
              <div>
                <strong>{comp.label}</strong>
                <small>{comp.desc}</small>
              </div>
              <div className="sp-comp-opts">
                {NOTA_OPTS.map(v => (
                  <button
                    key={v}
                    className={`sp-nota-btn ${notasRedacao[comp.id] === v ? 'selected' : ''}`}
                    onClick={() => setNotasRedacao(n => ({ ...n, [comp.id]: v }))}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="sp-redacao-total">Total: <strong>{total}</strong> / 1000</div>
        <div className="sp-footer">
          <button className="sp-btn-secondary" onClick={() => setFase('redacao')}>
            Voltar
          </button>
          <button
            className="sp-btn-primary"
            disabled={saving}
            onClick={() => salvarResultado(notasRedacao)}
          >
            {saving ? 'Salvando…' : 'Salvar resultado'}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
