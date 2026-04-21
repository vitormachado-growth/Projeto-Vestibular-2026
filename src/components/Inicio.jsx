import { useMemo, useState, useEffect } from 'react';
import { STORAGE_SIMULADOS } from './Simulado';
import { STORAGE_ESTUDADOS } from './Materias';
import { TOPICOS } from '../utils/geradorCronograma';
import './Inicio.css';

const PROVAS = [
  { id: 'enem1',  nome: 'ENEM — 1º dia',   data: new Date('2026-11-09T08:00:00'), cor: '#10b981', focos: ['enem', 'ambos'] },
  { id: 'enem2',  nome: 'ENEM — 2º dia',   data: new Date('2026-11-16T08:00:00'), cor: '#3b82f6', focos: ['enem', 'ambos'] },
  { id: 'uerj1',  nome: 'UERJ — 1ª fase',  data: new Date('2026-06-07T08:00:00'), cor: '#f59e0b', focos: ['uerj', 'ambos'] },
  { id: 'uerj2',  nome: 'UERJ — 2ª fase',  data: new Date('2026-11-30T08:00:00'), cor: '#8b5cf6', focos: ['uerj', 'ambos'] },
];

function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { dias: 0, horas: 0, min: 0, seg: 0, ended: true };
    return {
      dias:  Math.floor(diff / 86400000),
      horas: Math.floor((diff % 86400000) / 3600000),
      min:   Math.floor((diff % 3600000)  / 60000),
      seg:   Math.floor((diff % 60000)    / 1000),
      ended: false,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

function CountdownCard({ prova, showSeg }) {
  const t = useCountdown(prova.data.getTime());
  const urgente = t.dias < 30;
  const atencao = t.dias < 90;

  const units = [
    { val: t.dias,  label: 'DIAS' },
    { val: t.horas, label: 'HRS'  },
    { val: t.min,   label: 'MIN'  },
    ...(showSeg ? [{ val: t.seg, label: 'SEG' }] : []),
  ];

  return (
    <div className={`cd-card ${urgente ? 'urgente' : atencao ? 'atencao' : ''}`} style={{ '--cd-cor': prova.cor }}>
      <div className="cd-topo">
        <span className="cd-nome" style={{ color: prova.cor }}>{prova.nome}</span>
        <span className="cd-data-label">
          {prova.data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      </div>
      {t.ended ? (
        <p className="cd-ended">Prova realizada ✓</p>
      ) : (
        <div className="cd-unidades">
          {units.map((u, i) => (
            <div key={u.label} className="cd-unidade-wrap">
              <div className="cd-unidade">
                <span className="cd-num">{String(u.val).padStart(2, '0')}</span>
                <span className="cd-label">{u.label}</span>
              </div>
              {i < 3 && <span className="cd-sep">:</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const RANKING_KEY = 'ranking_historico_v1';

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function formatWeek(semana, ano) {
  return `Semana ${semana}/${ano}`;
}

function scoreClass(score) {
  const pct = score / 10;
  return pct >= 70 ? 'great' : pct >= 50 ? 'good' : 'bad';
}

function loadRanking() {
  try {
    const raw = localStorage.getItem(RANKING_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function loadSimulados() {
  try {
    const raw = localStorage.getItem(STORAGE_SIMULADOS);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export default function Inicio({ onNavigate, focus }) {
  const today = new Date();
  const semanaAtual = getWeekNumber(today);
  const anoAtual = today.getFullYear();

  const ranking = useMemo(() => {
    return loadRanking()
      .filter(e => e.score != null)
      .sort((a, b) => b.score - a.score);
  }, []);

  const simulados = useMemo(() => loadSimulados(), []);

  const entradaAtual = useMemo(
    () => ranking.find(e => e.semana === semanaAtual && e.ano === anoAtual),
    [ranking, semanaAtual, anoAtual]
  );

  const simStats = useMemo(() => {
    if (simulados.length === 0) return null;
    const avg = Math.round(simulados.reduce((s, e) => s + e.pct, 0) / simulados.length);
    const melhor = Math.max(...simulados.map(e => e.pct));
    return { total: simulados.length, avg, melhor };
  }, [simulados]);

  const cobertura = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_ESTUDADOS);
      const prog = raw ? JSON.parse(raw) : {};
      let totalTopicos = 0, dominados = 0, estudando = 0;
      Object.entries(TOPICOS).forEach(([mat, tops]) => {
        const lista = Array.isArray(tops) ? tops : Object.keys(tops);
        totalTopicos += lista.length;
        lista.forEach(t => {
          const entry = prog[`${mat}::${t}`];
          const st = typeof entry === 'boolean' ? (entry ? 2 : 0) : (entry?.status ?? 0);
          if (st === 2) dominados++;
          else if (st === 1) estudando++;
        });
      });
      const pct = totalTopicos ? Math.round(((dominados + estudando * 0.5) / totalTopicos) * 100) : 0;
      return { totalTopicos, dominados, estudando, pct };
    } catch { return null; }
  }, []);

  const diaSemana = today.toLocaleDateString('pt-BR', { weekday: 'long' });
  const dataFormatada = today.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });

  return (
    <div className="inicio-wrap">

      {/* ── Saudação ───────────────────────────────────────────────────────── */}
      <div className="inicio-hero">
        <div>
          <p className="inicio-data">{diaSemana}, {dataFormatada}</p>
          <h1 className="inicio-titulo">Bom estudo, Estudante!</h1>
          <p className="inicio-sub">
            {focus === 'enem' && 'Foco no ENEM 2026 — cada sessão conta.'}
            {focus === 'uerj' && 'Foco na UERJ 2026 — constância é tudo.'}
            {focus === 'ambos' && 'ENEM + UERJ 2026 — você está no caminho.'}
          </p>
        </div>
      </div>

      {/* ── Contagem regressiva ────────────────────────────────────────────── */}
      {(() => {
        const provasFiltradas = PROVAS.filter(p => p.focos.includes(focus));
        const showSeg = provasFiltradas.length <= 2;
        return (
          <div className="cd-grid">
            {provasFiltradas.map(p => (
              <CountdownCard key={p.id} prova={p} showSeg={showSeg} />
            ))}
          </div>
        );
      })()}

      {/* ── Cards rápidos ──────────────────────────────────────────────────── */}
      <div className="inicio-cards">
        <button className="inicio-card accent" onClick={() => onNavigate('cronograma')}>
          <span className="inicio-card-icon">📅</span>
          <span className="inicio-card-label">Cronograma</span>
          <span className="inicio-card-sub">Ver plano da semana</span>
        </button>
        <button className="inicio-card" onClick={() => onNavigate('questoes')}>
          <span className="inicio-card-icon">✍️</span>
          <span className="inicio-card-label">Questões</span>
          <span className="inicio-card-sub">Praticar agora</span>
        </button>
        <button className="inicio-card" onClick={() => onNavigate('ranking')}>
          <span className="inicio-card-icon">🏆</span>
          <span className="inicio-card-label">Simulado Semanal</span>
          <span className="inicio-card-sub">
            {entradaAtual ? `${entradaAtual.score} pts esta semana` : 'Desafio disponível'}
          </span>
        </button>
        <button className="inicio-card" onClick={() => onNavigate('redacao')}>
          <span className="inicio-card-icon">✒️</span>
          <span className="inicio-card-label">Redação</span>
          <span className="inicio-card-sub">Treinar agora</span>
        </button>
      </div>

      <div className="inicio-main">

        {/* ── Ranking ──────────────────────────────────────────────────────── */}
        <div className="inicio-section">
          <div className="inicio-section-header">
            <h2>Ranking — Simulados Semanais</h2>
            <button className="inicio-link" onClick={() => onNavigate('ranking')}>
              Ver tudo →
            </button>
          </div>

          {/* Pódio sempre visível */}
          <div className="inicio-podio">
            {[1, 0, 2].map(pos => {
              const entry = ranking[pos];
              const medals = ['🥇', '🥈', '🥉'];
              const heights = ['80px', '100px', '64px'];
              const colors = ['#f59e0b', '#e2e8f0', '#cd7c2f'];
              const isAtual = entry && entry.semana === semanaAtual && entry.ano === anoAtual;
              return (
                <div key={pos} className={`inicio-podio-col ${pos === 0 ? 'top' : ''}`}>
                  <div className="inicio-podio-info">
                    {entry ? (
                      <>
                        <span className="inicio-podio-medal">{medals[pos]}</span>
                        <span className="inicio-podio-semana">{formatWeek(entry.semana, entry.ano)}{isAtual ? ' ★' : ''}</span>
                        <span className="inicio-podio-score" style={{ color: entry.score >= 700 ? '#16a34a' : entry.score >= 500 ? '#ca8a04' : '#dc2626' }}>
                          {entry.score} pts
                        </span>
                      </>
                    ) : (
                      <span className="inicio-podio-vazio">—</span>
                    )}
                  </div>
                  <div
                    className="inicio-podio-bloco"
                    style={{ height: heights[pos], background: entry ? colors[pos] : 'var(--border-color)', opacity: entry ? 1 : 0.35 }}
                  >
                    <span className="inicio-podio-num">{pos + 1}º</span>
                  </div>
                </div>
              );
            })}
          </div>

          {ranking.length === 0 && (
            <p className="inicio-empty-sm" style={{ textAlign: 'center', marginTop: '0.75rem' }}>
              Nenhum simulado semanal concluído ainda.
            </p>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <button className="inicio-btn-sm" onClick={() => onNavigate('ranking')}>
              {ranking.length === 0 ? 'Fazer o primeiro simulado →' : 'Ver ranking completo →'}
            </button>
          </div>
        </div>

        {/* ── Stats simulados livres ────────────────────────────────────────── */}
        <div className="inicio-aside">
          <div className="inicio-section compact">
            <h2>Simulados livres</h2>
            {simStats ? (
              <div className="inicio-stat-list">
                <div className="inicio-stat">
                  <span className="inicio-stat-val blue">{simStats.total}</span>
                  <span className="inicio-stat-label">realizados</span>
                </div>
                <div className="inicio-stat">
                  <span className={`inicio-stat-val ${simStats.avg >= 70 ? 'great' : simStats.avg >= 50 ? 'good' : 'bad'}`}>
                    {simStats.avg}%
                  </span>
                  <span className="inicio-stat-label">média</span>
                </div>
                <div className="inicio-stat">
                  <span className={`inicio-stat-val ${simStats.melhor >= 70 ? 'great' : simStats.melhor >= 50 ? 'good' : 'bad'}`}>
                    {simStats.melhor}%
                  </span>
                  <span className="inicio-stat-label">melhor</span>
                </div>
              </div>
            ) : (
              <p className="inicio-empty-sm">Nenhum simulado livre ainda.</p>
            )}
            <button className="inicio-btn-sm mt" onClick={() => onNavigate('simulados')}>
              Fazer simulado →
            </button>
          </div>
        </div>

      </div>

      {/* ── Cobertura de tópicos (full width) ─────────────────────────────── */}
      <div className="inicio-section inicio-cob-full">
        <div className="inicio-cob-full-inner">
          <div className="inicio-cob-full-left">
            <h2>Cobertura de tópicos</h2>
            {cobertura && cobertura.totalTopicos > 0 ? (
              <div className="inicio-cob-legend inicio-cob-legend-row">
                <span className="dom">■ {cobertura.dominados} dominados</span>
                <span className="est">■ {cobertura.estudando} estudando</span>
                <span className="nao">■ {cobertura.totalTopicos - cobertura.dominados - cobertura.estudando} não iniciados</span>
              </div>
            ) : (
              <p className="inicio-empty-sm">Nenhum tópico marcado ainda.</p>
            )}
            <button className="inicio-btn-sm mt" onClick={() => onNavigate('materias')}>
              Ver matérias →
            </button>
          </div>
          <div className="inicio-cob-full-bar">
            <div className="inicio-cob-bar-wrap">
              <div className="inicio-cob-bar">
                <div className="inicio-cob-fill estudando" style={{ width: `${cobertura ? Math.round(((cobertura.dominados + cobertura.estudando) / cobertura.totalTopicos) * 100) : 0}%` }} />
                <div className="inicio-cob-fill dominado"  style={{ width: `${cobertura ? Math.round((cobertura.dominados / cobertura.totalTopicos) * 100) : 0}%` }} />
              </div>
              <span className="inicio-cob-pct">{cobertura?.pct ?? 0}%</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
