import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './UerjDiscursivaAdmin.css';

const DISCIPLINAS_VALIDAS = [
  'biologia',
  'fisica',
  'geografia',
  'historia',
  'lingua_portuguesa',
  'lingua_estrangeira',
  'matematica',
  'quimica',
];

const SAMPLE_JSON = `{
  "ano": 2024,
  "titulo": "UERJ 2024 — Exame Discursivo",
  "data_aplicacao": "2024-12-01",
  "redacao": {
    "tema": "Tema da redação aqui",
    "textos_motivadores": "Textos motivadores (com quebras de linha se precisar)",
    "comando": "Instrução do que o candidato deve produzir",
    "padrao_resposta": "Expectativas da banca / critérios"
  },
  "questoes": [
    {
      "disciplina": "biologia",
      "ordem": 1,
      "enunciado": "Texto da questão...",
      "padrao_resposta": "Resposta esperada pela banca",
      "imagens": []
    },
    {
      "disciplina": "quimica",
      "ordem": 1,
      "enunciado": "Texto da questão de química...",
      "padrao_resposta": "Resposta esperada"
    }
  ]
}`;

export default function UerjDiscursivaAdmin() {
  const [provas, setProvas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importerOpen, setImporterOpen] = useState(false);
  const [modo, setModo] = useState('json'); // 'json' | 'ia'
  const [jsonText, setJsonText] = useState('');
  const [importing, setImporting] = useState(false);
  const [erro, setErro] = useState(null);

  // Modo IA
  const [iaRawText, setIaRawText] = useState('');
  const [iaAno, setIaAno] = useState('');
  const [iaTitulo, setIaTitulo] = useState('');
  const [iaEstruturando, setIaEstruturando] = useState(false);
  const [iaErro, setIaErro] = useState(null);
  const [iaJsonGerado, setIaJsonGerado] = useState('');

  const carregar = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('uerj_discursivas')
      .select('id, ano, titulo, data_aplicacao, ativa, criado_em')
      .order('ano', { ascending: false });
    if (error) {
      console.error(error);
    } else {
      setProvas(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { carregar(); }, []);

  const validar = (json) => {
    if (typeof json !== 'object' || json === null) throw new Error('JSON precisa ser um objeto');
    if (!Number.isInteger(json.ano)) throw new Error('Campo "ano" obrigatório (int)');
    if (typeof json.titulo !== 'string' || !json.titulo.trim()) throw new Error('Campo "titulo" obrigatório');
    if (!Array.isArray(json.questoes)) throw new Error('Campo "questoes" precisa ser array');
    json.questoes.forEach((q, i) => {
      if (!DISCIPLINAS_VALIDAS.includes(q.disciplina)) {
        throw new Error(`Questão #${i + 1}: disciplina inválida "${q.disciplina}". Use: ${DISCIPLINAS_VALIDAS.join(', ')}`);
      }
      if (!Number.isInteger(q.ordem)) throw new Error(`Questão #${i + 1}: "ordem" precisa ser int`);
      if (typeof q.enunciado !== 'string' || !q.enunciado.trim()) throw new Error(`Questão #${i + 1}: "enunciado" vazio`);
      if (typeof q.padrao_resposta !== 'string' || !q.padrao_resposta.trim()) throw new Error(`Questão #${i + 1}: "padrao_resposta" vazio`);
    });
    if (json.redacao) {
      if (typeof json.redacao.tema !== 'string' || !json.redacao.tema.trim()) throw new Error('Redação: "tema" obrigatório');
    }
  };

  const importar = async () => {
    setErro(null);
    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch (e) {
      setErro('JSON inválido: ' + e.message);
      return;
    }
    try {
      validar(parsed);
    } catch (e) {
      setErro(e.message);
      return;
    }

    setImporting(true);
    try {
      const { data: prova, error: e1 } = await supabase
        .from('uerj_discursivas')
        .insert({
          ano: parsed.ano,
          titulo: parsed.titulo,
          data_aplicacao: parsed.data_aplicacao || null,
          ativa: true,
        })
        .select()
        .single();
      if (e1) throw e1;

      const questoes = parsed.questoes.map((q) => ({
        prova_id: prova.id,
        disciplina: q.disciplina,
        ordem: q.ordem,
        enunciado: q.enunciado,
        padrao_resposta: q.padrao_resposta,
        imagens: q.imagens || [],
      }));
      const { error: e2 } = await supabase.from('uerj_discursiva_questoes').insert(questoes);
      if (e2) throw e2;

      if (parsed.redacao) {
        const { error: e3 } = await supabase.from('uerj_discursiva_redacao').insert({
          prova_id: prova.id,
          tema: parsed.redacao.tema,
          textos_motivadores: parsed.redacao.textos_motivadores || null,
          comando: parsed.redacao.comando || null,
          padrao_resposta: parsed.redacao.padrao_resposta || null,
        });
        if (e3) throw e3;
      }

      setJsonText('');
      setImporterOpen(false);
      await carregar();
    } catch (e) {
      setErro('Erro ao importar: ' + (e.message || JSON.stringify(e)));
    } finally {
      setImporting(false);
    }
  };

  const estruturarComIa = async () => {
    setIaErro(null);
    if (!iaRawText.trim()) {
      setIaErro('Cola o texto bruto da prova antes de estruturar.');
      return;
    }
    setIaEstruturando(true);
    try {
      const { data, error } = await supabase.functions.invoke('structure-discursive-import', {
        body: {
          rawText: iaRawText,
          ano: iaAno ? parseInt(iaAno, 10) : undefined,
          titulo: iaTitulo || undefined,
        },
      });
      if (error) throw error;
      if (data?.erro) throw new Error(data.erro);
      const formatado = JSON.stringify(data.estrutura, null, 2);
      setIaJsonGerado(formatado);
    } catch (e) {
      setIaErro(e.message || JSON.stringify(e));
    } finally {
      setIaEstruturando(false);
    }
  };

  const usarJsonGerado = () => {
    setJsonText(iaJsonGerado);
    setModo('json');
  };

  const deletar = async (id, titulo) => {
    if (!confirm(`Deletar "${titulo}"? Isso remove questões, redação e resultados.`)) return;
    const { error } = await supabase.from('uerj_discursivas').delete().eq('id', id);
    if (error) {
      alert('Erro ao deletar: ' + error.message);
      return;
    }
    await carregar();
  };

  return (
    <div className="uerj-admin">
      <header className="uerj-admin-header">
        <div>
          <h1>UERJ — Provas Discursivas</h1>
          <p>Cadastre as provas do Exame Discursivo via JSON.</p>
        </div>
        <button
          className="uerj-admin-btn-primary"
          onClick={() => setImporterOpen((v) => !v)}
        >
          {importerOpen ? '× Fechar importer' : '+ Importar prova'}
        </button>
      </header>

      {importerOpen && (
        <section className="uerj-admin-importer">
          <div className="uerj-admin-modo-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={modo === 'json'}
              className={`uerj-admin-modo-tab ${modo === 'json' ? 'is-active' : ''}`}
              onClick={() => setModo('json')}
            >
              📋 JSON manual
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={modo === 'ia'}
              className={`uerj-admin-modo-tab ${modo === 'ia' ? 'is-active' : ''}`}
              onClick={() => setModo('ia')}
            >
              🤖 Estruturar com IA
            </button>
          </div>

          {modo === 'json' && (
            <>
              <div className="uerj-admin-importer-header">
                <h2>Importar via JSON</h2>
                <button
                  className="uerj-admin-btn-ghost"
                  onClick={() => setJsonText(SAMPLE_JSON)}
                >
                  Colar exemplo
                </button>
              </div>
              <textarea
                className="uerj-admin-json"
                placeholder='{ "ano": 2024, "titulo": "...", "questoes": [...] }'
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                rows={20}
              />
              {erro && <div className="uerj-admin-erro">{erro}</div>}
              <div className="uerj-admin-importer-actions">
                <button
                  className="uerj-admin-btn-primary"
                  onClick={importar}
                  disabled={importing || !jsonText.trim()}
                >
                  {importing ? 'Importando…' : 'Importar'}
                </button>
              </div>
            </>
          )}

          {modo === 'ia' && (
            <>
              <div className="uerj-admin-importer-header">
                <h2>Estruturar prova com IA</h2>
              </div>
              <p className="uerj-admin-help">
                Cola o texto bruto do caderno UERJ (questões + padrões + redação) abaixo.
                A IA identifica disciplinas, separa cada questão com seu padrão de resposta
                e devolve um JSON pronto pra revisar.
              </p>
              <div className="uerj-admin-ia-meta">
                <label>
                  <span>Ano (opcional)</span>
                  <input
                    type="number"
                    placeholder="2024"
                    value={iaAno}
                    onChange={(e) => setIaAno(e.target.value)}
                  />
                </label>
                <label>
                  <span>Título (opcional)</span>
                  <input
                    type="text"
                    placeholder="UERJ 2024 — Exame Discursivo"
                    value={iaTitulo}
                    onChange={(e) => setIaTitulo(e.target.value)}
                  />
                </label>
              </div>
              <textarea
                className="uerj-admin-json"
                placeholder="Cola aqui o texto extraído do PDF (questões, padrões de resposta, redação...)"
                value={iaRawText}
                onChange={(e) => setIaRawText(e.target.value)}
                rows={18}
              />
              {iaErro && <div className="uerj-admin-erro">{iaErro}</div>}
              <div className="uerj-admin-importer-actions">
                <button
                  className="uerj-admin-btn-primary"
                  onClick={estruturarComIa}
                  disabled={iaEstruturando || !iaRawText.trim()}
                >
                  {iaEstruturando ? 'Estruturando…' : '🤖 Estruturar com IA'}
                </button>
              </div>

              {iaJsonGerado && (
                <div className="uerj-admin-ia-resultado">
                  <div className="uerj-admin-importer-header">
                    <h3>JSON gerado pela IA</h3>
                    <button className="uerj-admin-btn-ghost" onClick={usarJsonGerado}>
                      ↓ Revisar no editor JSON
                    </button>
                  </div>
                  <textarea
                    className="uerj-admin-json"
                    value={iaJsonGerado}
                    onChange={(e) => setIaJsonGerado(e.target.value)}
                    rows={16}
                  />
                  <p className="uerj-admin-help">
                    A IA pode errar disciplinas, número da ordem ou misturar enunciado com padrão.
                    Sempre revisa antes de importar.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      )}

      <section className="uerj-admin-lista">
        {loading ? (
          <p className="uerj-admin-empty">Carregando…</p>
        ) : provas.length === 0 ? (
          <p className="uerj-admin-empty">Nenhuma prova cadastrada ainda.</p>
        ) : (
          <ul>
            {provas.map((p) => (
              <li key={p.id} className="uerj-admin-prova">
                <div>
                  <strong>{p.titulo}</strong>
                  <span className="uerj-admin-meta">
                    {p.data_aplicacao ? new Date(p.data_aplicacao).toLocaleDateString('pt-BR') : `Ano ${p.ano}`}
                    {' · '}
                    {p.ativa ? 'ativa' : 'inativa'}
                  </span>
                </div>
                <button
                  className="uerj-admin-btn-danger"
                  onClick={() => deletar(p.id, p.titulo)}
                >
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
