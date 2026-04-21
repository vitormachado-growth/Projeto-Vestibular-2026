import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { questoes as questoesBase } from '../data/questoesData';
import './Simulado.css';

const STORAGE_IMPORTADAS = 'questoes_importadas_v1';
export const STORAGE_SIMULADOS = 'simulados_historico_v1';

// Converte markdown ![alt](url) em elementos <img>
function renderMd(text) {
  if (!text) return null;
  const IMG_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const parts = [];
  let last = 0, m, key = 0;
  while ((m = IMG_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(<span key={key++}>{text.slice(last, m.index)}</span>);
    parts.push(
      <img key={key++} src={m[2]} alt={m[1] || 'imagem da questão'}
        className="sim-q-img" loading="lazy" />
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<span key={key++}>{text.slice(last)}</span>);
  return parts.length ? parts : text;
}

const SUBJECTS = [
  'Matemática', 'Português', 'Literatura', 'Inglês', 'Biologia',
  'Química', 'Física', 'História', 'Geografia', 'Sociologia', 'Filosofia',
  'Linguagens', 'Ciências da Natureza', 'Ciências Humanas',
];

const QTD_OPTIONS = [10, 15, 20, 25, 30, 35, 40, 45];
const TIME_OPTIONS = [
  { value: 0, label: 'Sem limite' },
  { value: 30, label: '30 min' },
  { value: 60, label: '1 hora' },
  { value: 120, label: '2 horas' },
  { value: 180, label: '3 horas' },
];
const DIFF_OPTIONS = [
  { value: '', label: 'Todas' },
  { value: 'facil', label: 'Fácil' },
  { value: 'medio', label: 'Médio' },
  { value: 'dificil', label: 'Difícil' },
];
const DIFF_LABEL = { facil: 'Fácil', medio: 'Médio', dificil: 'Difícil' };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ── CONFIG SCREEN ─────────────────────────────────────────────────────────────
function ConfigScreen({ questoesTotal, onStart }) {
  const [qtd, setQtd] = useState(20);
  const [tempo, setTempo] = useState(0);
  const [dificuldade, setDificuldade] = useState('');
  const [subjects, setSubjects] = useState([]);

  function toggleSubject(s) {
    setSubjects(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  }

  const disponiveis = useMemo(() => {
    return questoesTotal.filter(q => {
      if (dificuldade && q.difficulty !== dificuldade) return false;
      if (subjects.length > 0 && !subjects.includes(q.subject)) return false;
      return true;
    }).length;
  }, [questoesTotal, dificuldade, subjects]);

  const qtdFinal = Math.min(qtd, disponiveis);
  const canStart = disponiveis > 0;

  return (
    <div className="simulado-wrap">
      <div className="sim-config-header">
        <h1>Novo Simulado</h1>
        <p>Configure sua prova e teste seus conhecimentos com questões reais</p>
      </div>

      <div className="sim-config-grid">
        <div className="sim-config-card">
          <h3>Quantidade de questões</h3>
          <div className="sim-chips">
            {QTD_OPTIONS.map(n => (
              <button
                key={n}
                className={`sim-chip ${qtd === n ? 'active' : ''}`}
                onClick={() => setQtd(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="sim-config-card">
          <h3>Tempo limite</h3>
          <div className="sim-chips">
            {TIME_OPTIONS.map(t => (
              <button
                key={t.value}
                className={`sim-chip ${tempo === t.value ? 'active' : ''}`}
                onClick={() => setTempo(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sim-config-card">
          <h3>Dificuldade</h3>
          <div className="sim-chips">
            {DIFF_OPTIONS.map(d => (
              <button
                key={d.value}
                className={`sim-chip ${dificuldade === d.value ? 'active' : ''}`}
                onClick={() => setDificuldade(d.value)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="sim-config-card full">
          <h3>
            Matérias{' '}
            <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
              — {subjects.length === 0 ? 'todas' : subjects.join(', ')}
            </span>
          </h3>
          <div className="sim-subjects-grid">
            {SUBJECTS.map(s => (
              <button
                key={s}
                className={`sim-subject-chip ${subjects.includes(s) ? 'active' : ''}`}
                onClick={() => toggleSubject(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sim-config-summary">
        {canStart
          ? `${disponiveis} questões disponíveis com esses filtros — serão sorteadas ${qtdFinal}`
          : 'Nenhuma questão disponível com esses filtros. Ajuste as opções.'}
      </div>

      <button
        className="sim-start-btn"
        disabled={!canStart}
        onClick={() => onStart({ qtd: qtdFinal, tempo, dificuldade, subjects })}
      >
        Iniciar Simulado
      </button>
    </div>
  );
}

// ── EXAM SCREEN ───────────────────────────────────────────────────────────────
function ExamScreen({ questions, tempoInicial, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(tempoInicial > 0 ? tempoInicial * 60 : null);
  const timerRef = useRef(null);

  const handleFinish = useCallback(() => {
    clearInterval(timerRef.current);
    onFinish(answers);
  }, [answers, onFinish]);

  useEffect(() => {
    if (timeLeft === null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          onFinish(answers);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  function selectAnswer(qId, altId) {
    setAnswers(prev => ({ ...prev, [qId]: altId }));
  }

  const q = questions[current];
  const answered = Object.keys(answers).length;
  const timerClass = timeLeft === null ? '' : timeLeft < 60 ? 'danger' : timeLeft < 300 ? 'warning' : '';

  return (
    <div className="simulado-wrap">
      <div className="sim-exam-wrap">

        <div className="sim-exam-topbar">
          <div className="sim-topbar-left">
            <span className="sim-topbar-title">Simulado</span>
            <span className="sim-topbar-progress">
              Questão {current + 1} / {questions.length}
            </span>
          </div>
          <div className="sim-topbar-center">
            <div className="sim-progress-bar-wrap">
              <div
                className="sim-progress-bar-fill"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span className="sim-answered-count">{answered} respondidas</span>
          </div>
          {timeLeft !== null && (
            <div className={`sim-timer ${timerClass}`}>{formatTime(timeLeft)}</div>
          )}
        </div>

        <div className="sim-question-nav">
          {questions.map((_, i) => (
            <button
              key={i}
              className={`sim-q-dot ${i === current ? 'current' : ''} ${answers[questions[i].id] ? 'answered' : ''}`}
              onClick={() => setCurrent(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="sim-question-card">
          <div className="sim-q-meta">
            <span className="tag tag-subject">{q.subject}</span>
            <span className="tag tag-year">{q.year}</span>
            {q.difficulty && (
              <span className={`tag tag-diff-${q.difficulty}`}>{DIFF_LABEL[q.difficulty]}</span>
            )}
          </div>

          <div className="sim-q-statement">
            {q.statement.split('\n').map((line, i) => (
              <p key={i}>{renderMd(line)}</p>
            ))}
          </div>

          <div className="sim-alternatives">
            {q.alternatives.map(alt => {
              const sel = answers[q.id] === alt.id;
              return (
                <button
                  key={alt.id}
                  className={`sim-alternative ${sel ? 'selected' : ''}`}
                  onClick={() => selectAnswer(q.id, alt.id)}
                >
                  <span className="sim-alt-letter">{alt.id.toUpperCase()}</span>
                  <span>{renderMd(alt.text)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="sim-exam-footer">
          <button
            className="sim-nav-btn"
            disabled={current === 0}
            onClick={() => setCurrent(c => c - 1)}
          >
            ← Anterior
          </button>
          {current < questions.length - 1 ? (
            <button
              className="sim-nav-btn"
              onClick={() => setCurrent(c => c + 1)}
            >
              Próxima →
            </button>
          ) : (
            <button className="sim-submit-btn" onClick={handleFinish}>
              Finalizar Simulado
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

// ── RESULT SCREEN ─────────────────────────────────────────────────────────────
function ResultScreen({ questions, answers, onNovo }) {
  const [showReview, setShowReview] = useState(false);

  const corretas = questions.filter(q => answers[q.id] === q.answer).length;
  const total = questions.length;
  const pct = Math.round((corretas / total) * 100);

  const scoreClass = pct >= 70 ? 'great' : pct >= 50 ? 'good' : 'bad';
  const headline = pct >= 70 ? 'Ótimo resultado!' : pct >= 50 ? 'Bom esforço!' : 'Continue praticando!';

  const bySubject = useMemo(() => {
    const map = {};
    questions.forEach(q => {
      if (!map[q.subject]) map[q.subject] = { total: 0, corretas: 0 };
      map[q.subject].total++;
      if (answers[q.id] === q.answer) map[q.subject].corretas++;
    });
    return Object.entries(map).sort((a, b) => b[1].corretas / b[1].total - a[1].corretas / a[1].total);
  }, [questions, answers]);

  return (
    <div className="simulado-wrap">
      <div className="sim-result-wrap">

        <div className="sim-result-hero">
          <div className={`sim-score-circle ${scoreClass}`}>
            <span className="sim-score-pct">{pct}%</span>
            <span className="sim-score-label">acertos</span>
          </div>
          <h2>{headline}</h2>
          <p>{corretas} de {total} questões corretas</p>
        </div>

        <div className="sim-result-stats">
          <div className="sim-stat-card">
            <div className="sim-stat-value green">{corretas}</div>
            <div className="sim-stat-label">Corretas</div>
          </div>
          <div className="sim-stat-card">
            <div className="sim-stat-value red">{total - corretas}</div>
            <div className="sim-stat-label">Erradas</div>
          </div>
          <div className="sim-stat-card">
            <div className="sim-stat-value gray">
              {total - Object.keys(answers).length}
            </div>
            <div className="sim-stat-label">Não respondidas</div>
          </div>
        </div>

        <div className="sim-result-section">
          <h3>Desempenho por matéria</h3>
          {bySubject.map(([subject, { total: t, corretas: c }]) => {
            const p = Math.round((c / t) * 100);
            const barColor = p >= 70 ? '#16a34a' : p >= 50 ? '#ca8a04' : '#dc2626';
            return (
              <div key={subject} className="sim-subject-row">
                <span className="sim-subject-name">{subject}</span>
                <div className="sim-subject-bar-wrap">
                  <div
                    className="sim-subject-bar-fill"
                    style={{ width: `${p}%`, background: barColor }}
                  />
                </div>
                <span className="sim-subject-pct" style={{ color: barColor }}>{p}%</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: 36 }}>
                  {c}/{t}
                </span>
              </div>
            );
          })}
        </div>

        <div className="sim-result-section">
          <h3>
            Revisão das questões
            <button
              style={{ marginLeft: '0.75rem', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
              onClick={() => setShowReview(v => !v)}
            >
              {showReview ? 'Ocultar' : 'Mostrar'}
            </button>
          </h3>
          {showReview && (
            <div className="sim-review-list">
              {questions.map((q, i) => {
                const userAns = answers[q.id];
                const correct = userAns === q.answer;
                return (
                  <ReviewItem key={q.id} q={q} i={i} userAns={userAns} correct={correct} />
                );
              })}
            </div>
          )}
        </div>

        <div className="sim-result-actions">
          <button className="sim-btn-novo" onClick={onNovo}>
            Novo Simulado
          </button>
        </div>

      </div>
    </div>
  );
}

export function ReviewItem({ q, i, userAns, correct }) {
  const [expanded, setExpanded] = useState(false);
  const opts = ['a','b','c','d','e'];
  return (
    <div className={`sim-review-item ${correct ? 'correct' : 'wrong'}`}>
      <span className="sim-review-icon">{correct ? '✓' : '✗'}</span>
      <div className="sim-review-content">
        <div className="sim-review-q">
          <strong>Q{i + 1}</strong> — {q.statement.replace(/\n/g, ' ').slice(0, 120)}{q.statement.length > 120 ? '…' : ''}
        </div>
        <div className="sim-review-ans">
          {userAns ? (
            <>
              Sua resposta:{' '}
              <span className={correct ? 'correct-ans' : 'wrong-ans'}>{userAns.toUpperCase()}</span>
              {!correct && (
                <> · Gabarito: <span className="correct-ans">{q.answer.toUpperCase()}</span></>
              )}
            </>
          ) : (
            <span style={{ color: '#94a3b8' }}>
              Não respondida · Gabarito: <strong>{q.answer.toUpperCase()}</strong>
            </span>
          )}
        </div>
        {!correct && q.explanation && (
          <div className="sim-review-explanation">{q.explanation}</div>
        )}
        <button className="sim-review-expand-btn" onClick={() => setExpanded(v => !v)}>
          {expanded ? 'Ocultar questão ▲' : 'Ver questão completa ▼'}
        </button>
        {expanded && (
          <div className="sim-review-full">
            <p className="sim-review-full-statement">{renderMd(q.statement)}</p>
            <div className="sim-review-full-opts">
              {opts.map(l => {
                const text = q.options?.[l] ?? q[l] ?? q.alternatives?.find(a => a.id === l)?.text;
                if (!text) return null;
                const isCorrect = l === q.answer;
                const isUser = l === userAns;
                return (
                  <div key={l} className={`sim-review-opt ${isCorrect ? 'opt-correct' : ''} ${isUser && !isCorrect ? 'opt-wrong' : ''}`}>
                    <span className="sim-review-opt-letter">{l.toUpperCase()}</span>
                    <span>{renderMd(text)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function Simulado() {
  const [phase, setPhase] = useState('config'); // 'config' | 'exam' | 'result'
  const [questions, setQuestions] = useState([]);
  const [config, setConfig] = useState(null);
  const [answers, setAnswers] = useState({});

  const questoes = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_IMPORTADAS);
      const importadas = raw ? JSON.parse(raw) : [];
      return [...questoesBase, ...importadas];
    } catch { return questoesBase; }
  }, []);

  function handleStart({ qtd, tempo, dificuldade, subjects }) {
    let pool = questoes.filter(q => {
      if (dificuldade && q.difficulty !== dificuldade) return false;
      if (subjects.length > 0 && !subjects.includes(q.subject)) return false;
      return true;
    });
    const selected = shuffle(pool).slice(0, qtd);
    setQuestions(selected);
    setConfig({ tempo });
    setAnswers({});
    setPhase('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleFinish(userAnswers) {
    setAnswers(userAnswers);
    setPhase('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Salva resultado no histórico
    const corretas = questions.filter(q => userAnswers[q.id] === q.answer).length;
    const bySubject = {};
    questions.forEach(q => {
      if (!bySubject[q.subject]) bySubject[q.subject] = { total: 0, corretas: 0 };
      bySubject[q.subject].total++;
      if (userAnswers[q.id] === q.answer) bySubject[q.subject].corretas++;
    });
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      total: questions.length,
      corretas,
      pct: Math.round((corretas / questions.length) * 100),
      bySubject,
      questionIds: questions.map(q => q.id),
      answers: userAnswers,
    };
    try {
      const raw = localStorage.getItem(STORAGE_SIMULADOS);
      const historico = raw ? JSON.parse(raw) : [];
      historico.push(entry);
      localStorage.setItem(STORAGE_SIMULADOS, JSON.stringify(historico));
    } catch (err) {
      console.error('Erro ao salvar histórico:', err);
    }
  }

  function handleNovo() {
    setPhase('config');
    setQuestions([]);
    setAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (phase === 'exam') {
    return (
      <ExamScreen
        questions={questions}
        tempoInicial={config.tempo}
        onFinish={handleFinish}
      />
    );
  }

  if (phase === 'result') {
    return (
      <ResultScreen
        questions={questions}
        answers={answers}
        onNovo={handleNovo}
      />
    );
  }

  return <ConfigScreen questoesTotal={questoes} onStart={handleStart} />;
}
