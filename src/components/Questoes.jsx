import { useState, useMemo, useEffect } from 'react';
import { questoes as questoesBase } from '../data/questoesData';
import ImportarQuestoes from './ImportarQuestoes';
import CoberturaPanel from './CoberturaPanel';
import { reclassificarQuestoes } from '../utils/classificadorTopicos';
import './Questoes.css';

const SUBJECTS = [
  'Matemática', 'Português', 'Literatura', 'Inglês', 'Biologia',
  'Química', 'Física', 'História', 'Geografia', 'Sociologia', 'Filosofia',
  'Linguagens', 'Ciências da Natureza', 'Ciências Humanas',
];

const STORAGE_IMPORTADAS = 'questoes_importadas_v1';
const TYPES = [
  { value: 'enem', label: 'ENEM' },
  { value: 'uerj', label: 'UERJ' },
];
const YEARS = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
const DIFFICULTIES = [
  { value: 'facil', label: 'Fácil' },
  { value: 'medio', label: 'Médio' },
  { value: 'dificil', label: 'Difícil' },
];
const DIFF_LABEL = { facil: 'Fácil', medio: 'Médio', dificil: 'Difícil' };

export default function Questoes({ initialFilter }) {
  const [filters, setFilters] = useState({
    subject: initialFilter?.subject || '',
    topic: initialFilter?.topic || '',
    type: '',
    year: 0,
    difficulty: '',
  });
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [importarAberto, setImportarAberto] = useState(false);
  const [coberturaAberta, setCoberturaAberta] = useState(false);
  const [questoesImportadas, setQuestoesImportadas] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_IMPORTADAS);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  const questoes = useMemo(
    () => [...questoesBase, ...questoesImportadas],
    [questoesImportadas]
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_IMPORTADAS, JSON.stringify(questoesImportadas));
  }, [questoesImportadas]);

  function handleImport(novas) {
    setQuestoesImportadas(prev => {
      const idsExistentes = new Set([
        ...questoesBase.map(q => q.id),
        ...prev.map(q => q.id),
      ]);
      const filtradas = novas.filter(q => !idsExistentes.has(q.id));
      return [...prev, ...filtradas];
    });
    setImportarAberto(false);
  }

  function limparImportadas() {
    if (confirm(`Remover ${questoesImportadas.length} questões importadas?`)) {
      setQuestoesImportadas([]);
    }
  }

  const filtered = useMemo(() => {
    const topicoNorm = filters.topic
      ? filters.topic.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      : '';
    return questoes.filter(q => {
      if (filters.subject && q.subject !== filters.subject) return false;
      if (filters.type && q.type !== filters.type) return false;
      if (filters.year && q.year !== filters.year) return false;
      if (filters.difficulty && q.difficulty !== filters.difficulty) return false;
      if (topicoNorm) {
        const qTopico = (q.topic || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (!qTopico.includes(topicoNorm)) {
          const chavePrincipal = topicoNorm.split(/[\s—–-]+/)[0];
          if (chavePrincipal.length >= 4 && !qTopico.includes(chavePrincipal)) return false;
          if (chavePrincipal.length < 4) return false;
        }
      }
      return true;
    });
  }, [filters, questoes]);

  const selectedQuestion = filtered.find(q => q.id === selectedId) ?? null;
  const currentIndex = filtered.findIndex(q => q.id === selectedId);
  const hasFilters = filters.subject || filters.topic || filters.type || filters.year || filters.difficulty;

  function toggleChip(key, value) {
    setFilters(prev => ({ ...prev, [key]: prev[key] === value ? (key === 'year' ? 0 : '') : value }));
  }

  function clearFilters() {
    setFilters({ subject: '', topic: '', type: '', year: 0, difficulty: '' });
  }

  function clearTopic() {
    setFilters(prev => ({ ...prev, topic: '' }));
  }

  function openQuestion(q) {
    setSelectedId(q.id);
    setSelectedAnswer(null);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    setSelectedId(null);
    setSelectedAnswer(null);
    setShowResult(false);
  }

  function handleConfirm() {
    if (selectedAnswer) setShowResult(true);
  }

  function navigateTo(q) {
    setSelectedId(q.id);
    setSelectedAnswer(null);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── QUESTION DETAIL VIEW ──────────────────────────────────────────────────
  if (selectedQuestion) {
    const prevQ = currentIndex > 0 ? filtered[currentIndex - 1] : null;
    const nextQ = currentIndex < filtered.length - 1 ? filtered[currentIndex + 1] : null;
    const isCorrect = selectedAnswer === selectedQuestion.answer;

    return (
      <div className="questoes-wrap">
        <div className="questao-detail">

          <div className="questao-topbar">
            <button className="btn-back" onClick={goBack}>
              ← Voltar à lista
            </button>
            <span className="questao-counter">
              Questão {currentIndex + 1} de {filtered.length}
            </span>
          </div>

          <div className="questao-meta">
            <div className="questao-tags">
              <span className="tag tag-subject">{selectedQuestion.subject}</span>
              <span className={`tag tag-type tag-${selectedQuestion.type}`}>
                {selectedQuestion.type.toUpperCase()}
              </span>
              <span className="tag tag-year">{selectedQuestion.year}</span>
              <span className={`tag tag-diff tag-diff-${selectedQuestion.difficulty}`}>
                {DIFF_LABEL[selectedQuestion.difficulty]}
              </span>
            </div>
            <p className="questao-topic">
              {selectedQuestion.topic}
              {selectedQuestion.subtopic && (
                <span className="questao-subtopic"> · {selectedQuestion.subtopic}</span>
              )}
            </p>
          </div>

          <div className="questao-statement">
            {selectedQuestion.statement.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <div className="questao-alternatives">
            {selectedQuestion.alternatives.map(alt => {
              let cls = 'alternative';
              if (showResult) {
                if (alt.id === selectedQuestion.answer) cls += ' alt-correct';
                else if (alt.id === selectedAnswer) cls += ' alt-wrong';
              } else if (selectedAnswer === alt.id) {
                cls += ' alt-selected';
              }
              return (
                <button
                  key={alt.id}
                  className={cls}
                  onClick={() => !showResult && setSelectedAnswer(alt.id)}
                  disabled={showResult}
                >
                  <span className="alt-letter">{alt.id.toUpperCase()}</span>
                  <span className="alt-text">{alt.text}</span>
                </button>
              );
            })}
          </div>

          {!showResult ? (
            <div className="questao-confirm-row">
              <button
                className="btn-confirm"
                onClick={handleConfirm}
                disabled={!selectedAnswer}
              >
                Confirmar Resposta
              </button>
            </div>
          ) : (
            <div className={`questao-result ${isCorrect ? 'result-ok' : 'result-err'}`}>
              <div className="result-headline">
                <span className="result-icon">{isCorrect ? '✓' : '✗'}</span>
                <span className="result-label">
                  {isCorrect
                    ? 'Resposta correta!'
                    : `Incorreta — gabarito: ${selectedQuestion.answer.toUpperCase()}`}
                </span>
              </div>
              <p className="result-explanation">{selectedQuestion.explanation}</p>
            </div>
          )}

          <div className="questao-footer-nav">
            <button
              className="btn-nav"
              onClick={() => prevQ && navigateTo(prevQ)}
              disabled={!prevQ}
            >
              ← Anterior
            </button>
            <button
              className="btn-nav btn-nav-next"
              onClick={() => (nextQ ? navigateTo(nextQ) : goBack())}
            >
              {nextQ ? 'Próxima →' : 'Concluir'}
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ── LIST VIEW ─────────────────────────────────────────────────────────────
  return (
    <div className="questoes-wrap">

      <div className="questoes-header">
        <div>
          <h1>Banco de Questões</h1>
          <p className="questoes-subtitle">
            {filtered.length}{' '}
            {filtered.length === 1 ? 'questão encontrada' : 'questões encontradas'}
            {questoesImportadas.length > 0 && (
              <span className="importadas-badge">
                · {questoesImportadas.length} importadas
              </span>
            )}
          </p>
        </div>
        <div className="questoes-header-actions">
          <button className="btn-importar" onClick={() => setImportarAberto(true)}>
            ＋ Importar questões
          </button>
          <button className="btn-cobertura" onClick={() => setCoberturaAberta(true)}>
            📊 Cobertura
          </button>
          {questoesImportadas.length > 0 && (
            <button className="btn-limpar" onClick={limparImportadas}>
              ✕ Remover importadas
            </button>
          )}
          {hasFilters && (
            <button className="btn-limpar" onClick={clearFilters}>
              ✕ Limpar filtros
            </button>
          )}
        </div>
      </div>

      {importarAberto && (
        <ImportarQuestoes
          onImport={handleImport}
          onClose={() => setImportarAberto(false)}
        />
      )}

      {coberturaAberta && (
        <CoberturaPanel
          questoes={questoes}
          onClose={() => setCoberturaAberta(false)}
          onPraticar={(subject, topic) => {
            setFilters(prev => ({ ...prev, subject, topic }));
            setCoberturaAberta(false);
          }}
          onReclassificar={() => {
            const reclassificadas = reclassificarQuestoes(questoesImportadas);
            setQuestoesImportadas(reclassificadas);
          }}
        />
      )}

      {filters.topic && (
        <div className="topic-filter-banner">
          <span className="topic-filter-icon">🎯</span>
          <span className="topic-filter-text">
            Filtrando por tópico: <strong>{filters.topic}</strong>
          </span>
          <button className="topic-filter-close" onClick={clearTopic}>
            ✕ Remover
          </button>
        </div>
      )}

      <div className="filters-bar">
        <div className="filter-group">
          <label className="filter-label">Matéria</label>
          <select
            className="filter-select"
            value={filters.subject}
            onChange={e => setFilters(prev => ({ ...prev, subject: e.target.value }))}
          >
            <option value="">Todas</option>
            {SUBJECTS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Tipo</label>
          <div className="chips">
            {TYPES.map(t => (
              <button
                key={t.value}
                className={`chip chip-${t.value} ${filters.type === t.value ? 'chip-active' : ''}`}
                onClick={() => toggleChip('type', t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Ano</label>
          <div className="chips">
            {YEARS.map(y => (
              <button
                key={y}
                className={`chip ${filters.year === y ? 'chip-active' : ''}`}
                onClick={() => toggleChip('year', y)}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Dificuldade</label>
          <div className="chips">
            {DIFFICULTIES.map(d => (
              <button
                key={d.value}
                className={`chip chip-diff-${d.value} ${filters.difficulty === d.value ? 'chip-active' : ''}`}
                onClick={() => toggleChip('difficulty', d.value)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="questoes-empty">
          <span className="empty-icon">🔍</span>
          <p>Nenhuma questão encontrada com os filtros selecionados.</p>
          <button className="btn-limpar" onClick={clearFilters}>Limpar filtros</button>
        </div>
      ) : (
        <div className="questoes-grid">
          {filtered.map(q => (
            <div key={q.id} className="questao-card" onClick={() => openQuestion(q)}>
              <div className="questao-card-tags">
                <span className="tag tag-subject">{q.subject}</span>
                <span className={`tag tag-type tag-${q.type}`}>{q.type.toUpperCase()}</span>
                <span className="tag tag-year">{q.year}</span>
                <span className={`tag tag-diff tag-diff-${q.difficulty}`}>
                  {DIFF_LABEL[q.difficulty]}
                </span>
              </div>
              <p className="questao-card-preview">
                {q.statement.replace(/\n/g, ' ').slice(0, 130)}…
              </p>
              <div className="questao-card-footer">
                <span className="questao-card-topic">{q.subtopic || q.topic}</span>
                <span className="btn-resolver">Resolver →</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
