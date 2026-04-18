import { useState, useEffect } from 'react';
import { listarProvas, baixarProva, baixarTodasProvas } from '../services/enemApi';

const EXEMPLO = `[
  {
    "subject": "Matemática",
    "topic": "Equações do 1º grau",
    "type": "enem",
    "year": 2024,
    "difficulty": "facil",
    "statement": "Se 3x + 5 = 20, qual é o valor de x?",
    "alternatives": [
      {"id": "a", "text": "3"},
      {"id": "b", "text": "5"},
      {"id": "c", "text": "7"},
      {"id": "d", "text": "15"},
      {"id": "e", "text": "25"}
    ],
    "answer": "b",
    "explanation": "3x = 20 - 5 = 15, logo x = 5."
  }
]`;

const SUBJECTS_VALIDOS = [
  'Matemática', 'Português', 'Literatura', 'Inglês', 'Biologia',
  'Química', 'Física', 'História', 'Geografia', 'Sociologia', 'Filosofia',
  'Redação', 'Linguagens', 'Ciências da Natureza', 'Ciências Humanas',
];

function validarQuestao(q, idx) {
  const erros = [];
  if (!q.subject) erros.push(`[${idx}] falta "subject"`);
  else if (!SUBJECTS_VALIDOS.includes(q.subject))
    erros.push(`[${idx}] subject inválido "${q.subject}"`);
  if (!q.statement || typeof q.statement !== 'string') erros.push(`[${idx}] falta "statement"`);
  if (!Array.isArray(q.alternatives) || q.alternatives.length < 2)
    erros.push(`[${idx}] "alternatives" deve ser array com pelo menos 2 itens`);
  else {
    q.alternatives.forEach((alt, i) => {
      if (!alt.id) erros.push(`[${idx}] alternativa ${i} sem "id"`);
      if (!alt.text) erros.push(`[${idx}] alternativa ${i} sem "text"`);
    });
  }
  if (!q.answer) erros.push(`[${idx}] falta "answer"`);
  else if (Array.isArray(q.alternatives) && !q.alternatives.some(a => a.id === q.answer))
    erros.push(`[${idx}] "answer" ("${q.answer}") não corresponde a nenhuma alternativa`);
  return erros;
}

export default function ImportarQuestoes({ onImport, onClose }) {
  const [tab, setTab] = useState('api');

  return (
    <div className="polo-overlay" onClick={onClose}>
      <div className="import-modal" onClick={e => e.stopPropagation()}>
        <div className="polo-header">
          <div>
            <p className="polo-eyebrow">Importar questões</p>
            <h2>Adicionar questões ao banco</h2>
          </div>
          <button className="polo-close" onClick={onClose}>✕</button>
        </div>

        <div className="import-tabs">
          <button
            className={`import-tab ${tab === 'api' ? 'active' : ''}`}
            onClick={() => setTab('api')}
          >
            🌐 Baixar do ENEM (enem.dev)
          </button>
          <button
            className={`import-tab ${tab === 'json' ? 'active' : ''}`}
            onClick={() => setTab('json')}
          >
            📋 Colar JSON
          </button>
        </div>

        {tab === 'api' ? (
          <AbaApi onImport={onImport} onClose={onClose} />
        ) : (
          <AbaJson onImport={onImport} onClose={onClose} />
        )}
      </div>
    </div>
  );
}

function AbaApi({ onImport, onClose }) {
  const ANOS_DEFAULT = [2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009];
  const [provas, setProvas] = useState(ANOS_DEFAULT.map(y => ({ year: y })));
  const [carregandoProvas, setCarregandoProvas] = useState(false);
  const [anoSelecionado, setAnoSelecionado] = useState(2023);
  const [baixando, setBaixando] = useState(false);
  const [modoBulk, setModoBulk] = useState(false);
  const [progresso, setProgresso] = useState(null);
  const [progressoBulk, setProgressoBulk] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    listarProvas().then(data => {
      if (data.length > 0) setProvas(data);
    }).catch(() => {});
  }, []);

  async function baixar() {
    if (!anoSelecionado) return;
    setBaixando(true);
    setModoBulk(false);
    setErro(null);
    setResultado(null);
    setProgresso({ baixadas: 0, total: 0, convertidas: 0 });
    try {
      const res = await baixarProva(anoSelecionado, setProgresso);
      setResultado(res);
    } catch (e) {
      setErro(e.message);
    } finally {
      setBaixando(false);
    }
  }

  async function baixarTudo() {
    setBaixando(true);
    setModoBulk(true);
    setErro(null);
    setResultado(null);
    setProgressoBulk({ fase: 'iniciando' });
    try {
      const anos = provas.map(p => p.year);
      const res = await baixarTodasProvas(anos, setProgressoBulk);
      setResultado({ questoes: res.questoes, total: res.totalOriginal, puladas: res.totalPuladas, anos: res.anosProcessados });
    } catch (e) {
      setErro(e.message);
    } finally {
      setBaixando(false);
    }
  }

  function confirmar() {
    if (resultado) onImport(resultado.questoes);
  }

  return (
    <>
      <p className="polo-desc">
        Baixa questões diretamente da <strong>api.enem.dev</strong> (open-source) e classifica cada uma
        por tópico automaticamente. Questões em Espanhol são ignoradas.
      </p>

      <div className="bulk-download-box">
        <div>
          <strong>⬇ Popular banco completo</strong>
          <p>Baixa todas as {provas.length} provas ENEM (~3.000 questões reais) e classifica por tópico. Leva 1-2 minutos.</p>
        </div>
        <button
          className="btn-primario"
          onClick={baixarTudo}
          disabled={baixando || provas.length === 0}
        >
          {baixando && modoBulk ? '⏳' : '🚀'} Baixar tudo
        </button>
      </div>

      <div className="api-controls">
        <label className="filter-label">Ou baixe uma prova específica:</label>
        <div className="anos-grid">
          {provas.map(p => (
            <button
              key={p.year}
              className={`ano-chip ${anoSelecionado === p.year ? 'ativo' : ''}`}
              onClick={() => setAnoSelecionado(p.year)}
              disabled={baixando}
            >
              {p.year}
            </button>
          ))}
        </div>
      </div>

      {baixando && !modoBulk && progresso && (
        <div className="import-progresso">
          <div className="progresso-header">
            <strong>⬇ Baixando ENEM {anoSelecionado}...</strong>
            <span>
              {progresso.baixadas}/{progresso.total || '?'} questões
              {progresso.convertidas !== undefined && ` · ${progresso.convertidas} convertidas`}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: progresso.total
                  ? `${Math.min(100, (progresso.baixadas / progresso.total) * 100)}%`
                  : '0%',
              }}
            />
          </div>
        </div>
      )}

      {baixando && modoBulk && progressoBulk && (
        <div className="import-progresso">
          <div className="progresso-header">
            <strong>🚀 Baixando todas as provas...</strong>
            <span>
              {progressoBulk.anoAtual && `ENEM ${progressoBulk.anoAtual}`}
              {progressoBulk.anoIndex !== undefined && ` · ${progressoBulk.anoIndex + 1}/${progressoBulk.anosTotal} provas`}
              {progressoBulk.questoesAcumuladas !== undefined && ` · ${progressoBulk.questoesAcumuladas} questões`}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: progressoBulk.anosTotal
                  ? `${((progressoBulk.anoIndex + (progressoBulk.baixadasAno && progressoBulk.totalAno ? progressoBulk.baixadasAno / progressoBulk.totalAno : 0)) / progressoBulk.anosTotal) * 100}%`
                  : '0%',
              }}
            />
          </div>
        </div>
      )}

      {erro && !baixando && (
        <div className="import-erros">
          <strong>❌ Erro:</strong>
          <p style={{ marginTop: '0.5rem' }}>{erro}</p>
        </div>
      )}

      {resultado && (
        <div className="import-previa">
          <strong>✓ {resultado.questoes.length} questões prontas para importar</strong>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.82rem' }}>
            {resultado.total} questões na prova · {resultado.puladas} puladas (Espanhol ou sem conteúdo)
          </p>
          <div className="previa-lista">
            {resumoMaterias(resultado.questoes).map(([mat, qtd]) => (
              <div key={mat} className="previa-item">
                <span className="previa-tag">{mat}</span>
                <span>{qtd} questões</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="import-footer">
        <button className="btn-secundario" onClick={onClose}>Cancelar</button>
        {!resultado ? (
          <button className="btn-primario" onClick={baixar} disabled={baixando || !anoSelecionado}>
            {baixando ? '⏳ Baixando...' : `⬇ Baixar ENEM ${anoSelecionado}`}
          </button>
        ) : (
          <button className="btn-primario" onClick={confirmar}>
            ✓ Importar {resultado.questoes.length} questões
          </button>
        )}
      </div>
    </>
  );
}

function resumoMaterias(questoes) {
  const contagem = {};
  questoes.forEach(q => {
    contagem[q.subject] = (contagem[q.subject] || 0) + 1;
  });
  return Object.entries(contagem).sort(([, a], [, b]) => b - a);
}

function AbaJson({ onImport, onClose }) {
  const [texto, setTexto] = useState('');
  const [erros, setErros] = useState([]);
  const [previa, setPrevia] = useState(null);

  function processar() {
    setErros([]);
    setPrevia(null);
    let parsed;
    try {
      parsed = JSON.parse(texto);
    } catch (e) {
      setErros([`JSON inválido: ${e.message}`]);
      return;
    }
    const lista = Array.isArray(parsed) ? parsed : [parsed];
    const todosErros = [];
    lista.forEach((q, i) => todosErros.push(...validarQuestao(q, i)));
    if (todosErros.length > 0) {
      setErros(todosErros);
      return;
    }
    const idBase = Date.now();
    const comIds = lista.map((q, i) => ({
      type: q.type || 'enem',
      year: q.year || new Date().getFullYear(),
      difficulty: q.difficulty || 'medio',
      topic: q.topic || 'Importada',
      explanation: q.explanation || '',
      ...q,
      id: idBase + i,
    }));
    setPrevia(comIds);
  }

  return (
    <>
      <p className="polo-desc">
        Cole um array JSON. Campos obrigatórios: <strong>subject</strong>, <strong>statement</strong>,{' '}
        <strong>alternatives</strong>, <strong>answer</strong>.
      </p>

      <div className="import-toolbar">
        <button
          className="btn-acao"
          onClick={() => { setTexto(EXEMPLO); setErros([]); setPrevia(null); }}
        >
          📋 Usar exemplo
        </button>
        <span className="import-hint">
          Matérias: {SUBJECTS_VALIDOS.slice(0, 6).join(', ')}...
        </span>
      </div>

      <textarea
        className="import-textarea"
        placeholder="Cole aqui o JSON..."
        value={texto}
        onChange={e => setTexto(e.target.value)}
        rows={12}
      />

      {erros.length > 0 && (
        <div className="import-erros">
          <strong>❌ {erros.length} erro(s):</strong>
          <ul>
            {erros.slice(0, 10).map((e, i) => <li key={i}>{e}</li>)}
            {erros.length > 10 && <li>... e mais {erros.length - 10}</li>}
          </ul>
        </div>
      )}

      {previa && (
        <div className="import-previa">
          <strong>✓ {previa.length} questão(ões) válida(s)</strong>
          <div className="previa-lista">
            {previa.slice(0, 3).map((q, i) => (
              <div key={i} className="previa-item">
                <span className="previa-tag">{q.subject}</span>
                <span>{q.statement.slice(0, 80)}…</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="import-footer">
        <button className="btn-secundario" onClick={onClose}>Cancelar</button>
        {!previa ? (
          <button className="btn-primario" onClick={processar} disabled={!texto.trim()}>
            🔍 Validar
          </button>
        ) : (
          <button className="btn-primario" onClick={() => onImport(previa)}>
            ✓ Importar {previa.length} questões
          </button>
        )}
      </div>
    </>
  );
}
