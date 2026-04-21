import { useState, useMemo } from 'react';
import { STORAGE_SIMULADOS, ReviewItem } from './Simulado';
import { questoes as questoesBase } from '../data/questoesData';
import './Desempenho.css';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

function formatDateShort(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

function scoreClass(pct) {
  return pct >= 70 ? 'great' : pct >= 50 ? 'good' : 'bad';
}

function barColor(pct) {
  return pct >= 70 ? '#16a34a' : pct >= 50 ? '#ca8a04' : '#dc2626';
}

export default function Desempenho() {
  const [historico, setHistorico] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_SIMULADOS);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });
  const [revisando, setRevisando] = useState(null);

  function abrirRevisao(s) {
    if (s.questions?.length > 0) { setRevisando(s); return; }
    if (s.questionIds?.length > 0) {
      try {
        const importadas = JSON.parse(localStorage.getItem('questoes_importadas_v1') || '[]');
        const pool = [...questoesBase, ...importadas];
        const map = Object.fromEntries(pool.map(q => [q.id, q]));
        const questions = s.questionIds.map(id => map[id]).filter(Boolean);
        setRevisando({ ...s, questions });
      } catch { setRevisando({ ...s, questions: [] }); }
    }
  }

  function limparHistorico() {
    if (confirm('Apagar todo o histórico de simulados?')) {
      localStorage.removeItem(STORAGE_SIMULADOS);
      setHistorico([]);
    }
  }

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const kpis = useMemo(() => {
    if (historico.length === 0) return null;
    const totalSims = historico.length;
    const avgPct = Math.round(historico.reduce((s, e) => s + e.pct, 0) / totalSims);
    const melhor = Math.max(...historico.map(e => e.pct));
    const totalQuestoes = historico.reduce((s, e) => s + e.total, 0);
    const totalCorretas = historico.reduce((s, e) => s + e.corretas, 0);
    return { totalSims, avgPct, melhor, totalQuestoes, totalCorretas };
  }, [historico]);

  // ── TREND (últimos 15) ────────────────────────────────────────────────────
  const trend = useMemo(() => {
    return historico.slice(-15);
  }, [historico]);

  // ── BY SUBJECT ────────────────────────────────────────────────────────────
  const bySubject = useMemo(() => {
    const map = {};
    historico.forEach(sim => {
      Object.entries(sim.bySubject || {}).forEach(([subj, { total, corretas }]) => {
        if (!map[subj]) map[subj] = { total: 0, corretas: 0 };
        map[subj].total += total;
        map[subj].corretas += corretas;
      });
    });
    return Object.entries(map)
      .map(([subj, { total, corretas }]) => ({
        subj,
        total,
        corretas,
        pct: Math.round((corretas / total) * 100),
      }))
      .sort((a, b) => b.pct - a.pct);
  }, [historico]);

  // ── EMPTY ─────────────────────────────────────────────────────────────────
  if (historico.length === 0) {
    return (
      <div className="desemp-wrap">
        <div className="desemp-header">
          <div>
            <h1>Desempenho</h1>
            <p>Acompanhe sua evolução ao longo dos simulados</p>
          </div>
        </div>
        <div className="desemp-empty">
          <span className="empty-icon">📊</span>
          <h2>Nenhum simulado realizado ainda</h2>
          <p>Complete um simulado para ver seu desempenho aqui.</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="desemp-wrap">

      <div className="desemp-header">
        <div>
          <h1>Desempenho</h1>
          <p>{historico.length} simulado{historico.length > 1 ? 's' : ''} realizado{historico.length > 1 ? 's' : ''}</p>
        </div>
        <button className="btn-limpar-hist" onClick={limparHistorico}>
          ✕ Limpar histórico
        </button>
      </div>

      {/* ── KPIs ─────────────────────────────────────────────────────────── */}
      <div className="desemp-kpis">
        <div className="desemp-kpi">
          <span className="desemp-kpi-label">Simulados</span>
          <span className="desemp-kpi-value blue">{kpis.totalSims}</span>
          <span className="desemp-kpi-sub">realizados</span>
        </div>
        <div className="desemp-kpi">
          <span className="desemp-kpi-label">Média geral</span>
          <span className={`desemp-kpi-value ${scoreClass(kpis.avgPct)}`}>{kpis.avgPct}%</span>
          <span className="desemp-kpi-sub">de acerto</span>
        </div>
        <div className="desemp-kpi">
          <span className="desemp-kpi-label">Melhor resultado</span>
          <span className={`desemp-kpi-value ${scoreClass(kpis.melhor)}`}>{kpis.melhor}%</span>
          <span className="desemp-kpi-sub">de acerto</span>
        </div>
        <div className="desemp-kpi">
          <span className="desemp-kpi-label">Questões respondidas</span>
          <span className="desemp-kpi-value">{kpis.totalQuestoes}</span>
          <span className="desemp-kpi-sub">{kpis.totalCorretas} corretas</span>
        </div>
      </div>

      {/* ── TREND ────────────────────────────────────────────────────────── */}
      <div className="desemp-section">
        <h2>Evolução (últimos {trend.length} simulados)</h2>
        <div className="trend-chart">
          {/* gridlines */}
          {[100, 75, 50, 25].map(v => (
            <div
              key={v}
              className="trend-gridline"
              style={{ bottom: `${v}%`, fontSize: '0.62rem' }}
            >
              {v}%
            </div>
          ))}
          {trend.map((sim, i) => {
            const h = Math.max(4, sim.pct);
            const color = barColor(sim.pct);
            return (
              <div key={sim.id} className="trend-bar-wrap">
                <div
                  className="trend-bar"
                  style={{
                    height: `${h}%`,
                    background: color,
                    opacity: 0.85,
                  }}
                  data-tip={`${sim.pct}% · ${formatDate(sim.date)} · ${sim.corretas}/${sim.total}`}
                >
                  <span className="trend-pct-label" style={{ color }}>{sim.pct}%</span>
                </div>
                <span className="trend-bar-label">{formatDateShort(sim.date)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── BY SUBJECT ───────────────────────────────────────────────────── */}
      {bySubject.length > 0 && (
        <div className="desemp-section">
          <h2>Desempenho por matéria</h2>
          {bySubject.map(({ subj, total, corretas, pct }) => {
            const color = barColor(pct);
            return (
              <div key={subj} className="desemp-subject-row">
                <span className="desemp-subject-name">{subj}</span>
                <div className="desemp-subject-bar-wrap">
                  <div
                    className="desemp-subject-bar-fill"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
                <span className="desemp-subject-pct" style={{ color }}>{pct}%</span>
                <span className="desemp-subject-count">{corretas}/{total}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── HISTORY ──────────────────────────────────────────────────────── */}
      <div className="desemp-section">
        <h2>Histórico de simulados</h2>
        <div className="desemp-history">
          {[...historico].reverse().map((sim, i, arr) => {
            const color = barColor(sim.pct);
            const prev = arr[i + 1];
            const delta = prev ? sim.pct - prev.pct : null;
            const trendIcon = delta === null ? '—' : delta > 0 ? '↑' : delta < 0 ? '↓' : '→';
            const trendColor = delta === null ? 'var(--text-muted)' : delta > 0 ? '#16a34a' : delta < 0 ? '#dc2626' : 'var(--text-muted)';
            return (
              <div key={sim.id} className="desemp-hist-row">
                <span className="desemp-hist-num">#{historico.length - i}</span>
                <span className="desemp-hist-date">{formatDate(sim.date)}</span>
                <span className={`desemp-hist-score ${scoreClass(sim.pct)}`}>
                  {sim.pct}%
                </span>
                <div className="desemp-hist-bar-wrap">
                  <div
                    className="desemp-hist-bar-fill"
                    style={{ width: `${sim.pct}%`, background: color }}
                  />
                </div>
                <span className="desemp-hist-detail">
                  {sim.corretas}/{sim.total} corretas
                </span>
                <span className="desemp-hist-trend" style={{ color: trendColor }}>
                  {trendIcon}
                </span>
                {(sim.questions?.length > 0 || sim.questionIds?.length > 0) && (
                  <button className="inicio-historico-ver-btn" onClick={() => abrirRevisao(sim)}>
                    Ver
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>

    {revisando && (
      <div className="sim-revisao-modal-overlay" onClick={() => setRevisando(null)}>
        <div className="sim-revisao-modal" onClick={e => e.stopPropagation()}>
          <div className="sim-revisao-modal-header">
            <div>
              <h2>Revisão do simulado</h2>
              <p className="sim-revisao-modal-sub">
                {new Date(revisando.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                {' — '}{revisando.corretas}/{revisando.total} acertos ({revisando.pct}%)
              </p>
            </div>
            <button className="sim-revisao-modal-close" onClick={() => setRevisando(null)}>✕</button>
          </div>
          <div className="sim-revisao-modal-body">
            {revisando.questions?.length > 0 ? revisando.questions.map((q, i) => (
              <ReviewItem
                key={q.id}
                q={q}
                i={i}
                userAns={revisando.answers?.[q.id]}
                correct={revisando.answers?.[q.id] === q.answer}
              />
            )) : (
              <p style={{ color: 'var(--text-muted)', padding: '1rem' }}>
                Questões não disponíveis para este simulado.
              </p>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
