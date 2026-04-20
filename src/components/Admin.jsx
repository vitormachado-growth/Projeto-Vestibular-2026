import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './Admin.css';

const Admin = () => {
  const [tab, setTab] = useState('simulados');

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Painel de Administração</h1>
        <p>Gerencie simulados semanais e temporadas</p>
      </header>

      <nav className="admin-tabs">
        <button
          className={`admin-tab ${tab === 'simulados' ? 'active' : ''}`}
          onClick={() => setTab('simulados')}
        >
          📝 Simulados
        </button>
        <button
          className={`admin-tab ${tab === 'temporadas' ? 'active' : ''}`}
          onClick={() => setTab('temporadas')}
        >
          📅 Temporadas
        </button>
      </nav>

      <div className="admin-content">
        {tab === 'simulados' ? <SimuladosTab /> : <TemporadasTab />}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────
   Tab 1: Simulados
   ───────────────────────────────────── */

const SimuladosTab = () => {
  const [simulados, setSimulados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [creating, setCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('simulados_semanais')
      .select('*, simulados_semanais_questoes(count)')
      .order('created_at', { ascending: false });
    setSimulados(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (editingId) {
    return <SimuladoEditor id={editingId} onBack={() => { setEditingId(null); load(); }} />;
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Lista de Simulados</h2>
        <button className="admin-btn primary" onClick={() => setCreating(true)}>
          + Novo simulado
        </button>
      </div>

      {creating && (
        <NewSimuladoForm
          onCancel={() => setCreating(false)}
          onCreated={(id) => { setCreating(false); setEditingId(id); }}
        />
      )}

      {loading ? (
        <p className="admin-muted">Carregando…</p>
      ) : simulados.length === 0 ? (
        <p className="admin-muted">Nenhum simulado cadastrado ainda.</p>
      ) : (
        <div className="admin-table">
          <div className="admin-table-head">
            <span>Título</span>
            <span>Tipo</span>
            <span>Questões</span>
            <span>Redação</span>
            <span></span>
          </div>
          {simulados.map(s => (
            <div key={s.id} className="admin-table-row">
              <span className="truncate">{s.titulo}</span>
              <span className="admin-badge">
                {s.tipo === 'humanas_linguagens' ? 'Humanas + Linguagens' : 'Matemática + Naturezas'}
              </span>
              <span>{s.simulados_semanais_questoes?.[0]?.count ?? 0} / 80</span>
              <span>{s.tem_redacao ? '✓' : '—'}</span>
              <span>
                <button className="admin-btn small" onClick={() => setEditingId(s.id)}>Editar</button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const NewSimuladoForm = ({ onCancel, onCreated }) => {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('humanas_linguagens');
  const [temRedacao, setTemRedacao] = useState(tipo === 'humanas_linguagens');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleTipo = (t) => {
    setTipo(t);
    setTemRedacao(t === 'humanas_linguagens');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    setSaving(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('simulados_semanais')
      .insert({ titulo: titulo.trim(), tipo, tem_redacao: temRedacao })
      .select()
      .single();
    setSaving(false);
    if (err) { setError(err.message); return; }
    onCreated(data.id);
  };

  return (
    <form className="admin-card" onSubmit={handleCreate}>
      <h3>Novo simulado</h3>
      {error && <div className="admin-alert error">{error}</div>}
      <div className="admin-field">
        <label>Título</label>
        <input
          type="text"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Ex: Simulado Semanal #1"
          required
        />
      </div>
      <div className="admin-field">
        <label>Tipo</label>
        <select value={tipo} onChange={e => handleTipo(e.target.value)}>
          <option value="humanas_linguagens">Humanas + Linguagens (+ Redação)</option>
          <option value="matematica_naturezas">Matemática + Naturezas</option>
        </select>
      </div>
      <div className="admin-field inline">
        <input
          id="temRed"
          type="checkbox"
          checked={temRedacao}
          onChange={e => setTemRedacao(e.target.checked)}
        />
        <label htmlFor="temRed">Inclui redação</label>
      </div>
      <div className="admin-actions">
        <button type="button" className="admin-btn" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="admin-btn primary" disabled={saving}>
          {saving ? 'Criando…' : 'Criar e editar'}
        </button>
      </div>
    </form>
  );
};

/* ─────────────────────────────────────
   Simulado Editor
   ───────────────────────────────────── */

const AREAS_POR_TIPO = {
  humanas_linguagens: ['humanas', 'linguagens'],
  matematica_naturezas: ['matematica', 'naturezas'],
};

const AREA_LABELS = {
  humanas: 'Humanas',
  linguagens: 'Linguagens',
  matematica: 'Matemática',
  naturezas: 'Naturezas',
};

const ENEM_DISCIPLINE = {
  humanas: 'ciencias-humanas',
  linguagens: 'linguagens',
  matematica: 'matematica',
  naturezas: 'ciencias-natureza',
};

const emptyQuestao = (ordem, area) => ({
  ordem,
  area,
  enunciado: '',
  alternativas: [
    { letra: 'A', texto: '' },
    { letra: 'B', texto: '' },
    { letra: 'C', texto: '' },
    { letra: 'D', texto: '' },
    { letra: 'E', texto: '' },
  ],
  gabarito: '',
  _novo: true,
});

const SimuladoEditor = ({ id, onBack }) => {
  const [simulado, setSimulado] = useState(null);
  const [questoes, setQuestoes] = useState([]);
  const [redacao, setRedacao] = useState({ tema: '', textos_motivadores: '' });
  const [areaAtiva, setAreaAtiva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: sim } = await supabase
        .from('simulados_semanais').select('*').eq('id', id).single();

      const { data: qs } = await supabase
        .from('simulados_semanais_questoes')
        .select('*')
        .eq('simulado_id', id)
        .order('ordem');

      const { data: red } = await supabase
        .from('simulados_semanais_redacao')
        .select('*')
        .eq('simulado_id', id)
        .maybeSingle();

      setSimulado(sim);
      setQuestoes(qs || []);
      if (red) setRedacao({ tema: red.tema, textos_motivadores: red.textos_motivadores || '' });

      const areas = AREAS_POR_TIPO[sim.tipo];
      setAreaAtiva(areas[0]);
      setLoading(false);
    })();
  }, [id]);

  const updateQuestao = (idx, patch) => {
    setQuestoes(qs => qs.map((q, i) => i === idx ? { ...q, ...patch } : q));
  };

  const updateAlternativa = (idx, letra, texto) => {
    setQuestoes(qs => qs.map((q, i) =>
      i === idx
        ? { ...q, alternativas: q.alternativas.map(a => a.letra === letra ? { ...a, texto } : a) }
        : q
    ));
  };

  const addQuestao = () => {
    const maxOrdem = questoes.reduce((m, q) => Math.max(m, q.ordem), 0);
    setQuestoes(qs => [...qs, emptyQuestao(maxOrdem + 1, areaAtiva)]);
  };

  const handleImportEnem = (novas) => {
    setQuestoes(qs => [...qs, ...novas]);
    setShowImport(false);
    setMsg(`${novas.length} questões importadas! Lembre-se de clicar em "Salvar tudo".`);
    setTimeout(() => setMsg(null), 5000);
  };

  const proximaOrdem = () => questoes.reduce((m, q) => Math.max(m, q.ordem), 0) + 1;

  const removeQuestao = async (idx) => {
    const q = questoes[idx];
    if (q.id) {
      if (!confirm('Remover esta questão?')) return;
      await supabase.from('simulados_semanais_questoes').delete().eq('id', q.id);
    }
    setQuestoes(qs => qs.filter((_, i) => i !== idx));
  };

  const salvarTudo = async () => {
    setSaving(true);
    setMsg(null);

    // Salva/atualiza cada questão
    for (const q of questoes) {
      if (!q.enunciado.trim() || !q.gabarito) continue;
      const payload = {
        simulado_id: id,
        ordem: q.ordem,
        area: q.area,
        enunciado: q.enunciado.trim(),
        alternativas: q.alternativas,
        gabarito: q.gabarito,
      };
      if (q.id) {
        await supabase.from('simulados_semanais_questoes').update(payload).eq('id', q.id);
      } else {
        await supabase.from('simulados_semanais_questoes').insert(payload);
      }
    }

    // Redação
    if (simulado.tem_redacao && redacao.tema.trim()) {
      await supabase.from('simulados_semanais_redacao').upsert({
        simulado_id: id,
        tema: redacao.tema.trim(),
        textos_motivadores: redacao.textos_motivadores.trim() || null,
      }, { onConflict: 'simulado_id' });
    }

    setSaving(false);
    setMsg('Salvo com sucesso!');
    setTimeout(() => setMsg(null), 3000);
  };

  if (loading) return <p className="admin-muted">Carregando…</p>;

  const areas = AREAS_POR_TIPO[simulado.tipo];
  const questoesDaArea = questoes.filter(q => q.area === areaAtiva);

  return (
    <div className="admin-section">
      <div className="admin-editor-header">
        <button className="admin-btn" onClick={onBack}>← Voltar</button>
        <div>
          <h2>{simulado.titulo}</h2>
          <p className="admin-muted">
            {simulado.tipo === 'humanas_linguagens' ? 'Humanas + Linguagens' : 'Matemática + Naturezas'}
            {simulado.tem_redacao && ' + Redação'} · {questoes.length} questões
          </p>
        </div>
        <button className="admin-btn primary" onClick={salvarTudo} disabled={saving}>
          {saving ? 'Salvando…' : '💾 Salvar tudo'}
        </button>
      </div>

      {msg && <div className="admin-alert success">{msg}</div>}

      <div className="admin-area-tabs">
        {areas.map(a => (
          <button
            key={a}
            className={`admin-area-tab ${areaAtiva === a ? 'active' : ''}`}
            onClick={() => setAreaAtiva(a)}
          >
            {AREA_LABELS[a]} ({questoes.filter(q => q.area === a).length})
          </button>
        ))}
        {simulado.tem_redacao && (
          <button
            className={`admin-area-tab ${areaAtiva === 'redacao' ? 'active' : ''}`}
            onClick={() => setAreaAtiva('redacao')}
          >
            ✍️ Redação
          </button>
        )}
      </div>

      {areaAtiva === 'redacao' ? (
        <div className="admin-card">
          <div className="admin-field">
            <label>Tema da redação</label>
            <input
              type="text"
              value={redacao.tema}
              onChange={e => setRedacao(r => ({ ...r, tema: e.target.value }))}
              placeholder="Ex: Desafios da inclusão digital no Brasil"
            />
          </div>
          <div className="admin-field">
            <label>Textos motivadores (opcional)</label>
            <textarea
              rows={8}
              value={redacao.textos_motivadores}
              onChange={e => setRedacao(r => ({ ...r, textos_motivadores: e.target.value }))}
              placeholder="Cole aqui os textos de apoio…"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="admin-questoes-list">
            {questoesDaArea.length === 0 ? (
              <p className="admin-muted">Nenhuma questão em {AREA_LABELS[areaAtiva]} ainda.</p>
            ) : (
              questoesDaArea.map((q) => {
                const idx = questoes.indexOf(q);
                return (
                  <QuestaoEditor
                    key={q.id || `novo-${q.ordem}`}
                    questao={q}
                    onChange={patch => updateQuestao(idx, patch)}
                    onAlt={(letra, texto) => updateAlternativa(idx, letra, texto)}
                    onRemove={() => removeQuestao(idx)}
                  />
                );
              })
            )}
          </div>
          <div className="admin-add-actions">
            <button className="admin-btn primary" onClick={() => setShowImport(true)}>
              🎲 Sortear do ENEM
            </button>
            <button className="admin-btn" onClick={addQuestao}>
              + Criar em branco
            </button>
          </div>
        </>
      )}

      {showImport && (
        <SorteadorEnem
          area={areaAtiva}
          proximaOrdem={proximaOrdem()}
          onImport={handleImportEnem}
          onClose={() => setShowImport(false)}
        />
      )}
    </div>
  );
};

/* ─────────────────────────────────────
   Sorteador ENEM (api.enem.dev)
   ───────────────────────────────────── */

const mapearQuestao = (q, ordem, area) => ({
  ordem,
  area,
  enunciado: [q.context, q.alternativesIntroduction, q.alternativeIntroduction]
    .filter(Boolean).join('\n\n') || q.title || '',
  alternativas: (q.alternatives || []).map(a => ({
    letra: a.letter,
    texto: a.text || (a.file ? `[Imagem: ${a.file}]` : ''),
  })),
  gabarito: q.correctAlternative,
  _novo: true,
});

const PAGE_SIZE = 50;

const buscarPorAnoArea = async (year, discipline) => {
  try {
    // 1ª página + total
    const r1 = await fetch(`https://api.enem.dev/v1/exams/${year}/questions?limit=${PAGE_SIZE}&offset=0`);
    const d1 = await r1.json();
    const total = d1.metadata?.total ?? 0;
    const paginas = Math.ceil(total / PAGE_SIZE);

    // Páginas restantes em paralelo
    const offsets = Array.from({ length: paginas - 1 }, (_, i) => (i + 1) * PAGE_SIZE);
    const resto = await Promise.all(
      offsets.map(off =>
        fetch(`https://api.enem.dev/v1/exams/${year}/questions?limit=${PAGE_SIZE}&offset=${off}`)
          .then(r => r.json())
          .then(d => d.questions || [])
          .catch(() => [])
      )
    );

    const todas = [...(d1.questions || []), ...resto.flat()];
    return todas.filter(q => q.discipline === discipline);
  } catch {
    return [];
  }
};

const SorteadorEnem = ({ area, proximaOrdem, onImport, onClose }) => {
  const [anos, setAnos] = useState([]);
  const [anosEscolhidos, setAnosEscolhidos] = useState(new Set());
  const [quantidade, setQuantidade] = useState(40);
  const [loading, setLoading] = useState(false);
  const [loadingAnos, setLoadingAnos] = useState(true);
  const [progresso, setProgresso] = useState('');
  const [error, setError] = useState(null);

  const discipline = ENEM_DISCIPLINE[area];

  useEffect(() => {
    fetch('https://api.enem.dev/v1/exams')
      .then(r => r.json())
      .then(data => {
        const arr = (Array.isArray(data) ? data : []).sort((a, b) => b.year - a.year);
        setAnos(arr);
        setAnosEscolhidos(new Set(arr.slice(0, 5).map(a => a.year)));
        setLoadingAnos(false);
      })
      .catch(() => { setError('Falha ao carregar anos.'); setLoadingAnos(false); });
  }, []);

  const toggleAno = (year) =>
    setAnosEscolhidos(s => { const n = new Set(s); n.has(year) ? n.delete(year) : n.add(year); return n; });

  const sortear = async () => {
    setLoading(true);
    setError(null);
    try {
      const lista = [...anosEscolhidos];
      setProgresso(`Buscando "${discipline}" em ${lista.length} prova(s)…`);

      // Busca sequencial pra não sobrecarregar a API
      const pool = [];
      for (const year of lista) {
        setProgresso(`Buscando ENEM ${year} (~4 páginas)…`);
        const qs = await buscarPorAnoArea(year, discipline);
        pool.push(...qs);
      }

      if (pool.length === 0) {
        setError(`Nenhuma questão de "${discipline}" encontrada. Tente outros anos ou verifique sua conexão.`);
        setLoading(false);
        return;
      }

      const embaralhadas = [...pool].sort(() => Math.random() - 0.5);
      const escolhidas = embaralhadas.slice(0, Math.min(quantidade, embaralhadas.length));
      setProgresso(`${pool.length} questões no pool → sorteando ${escolhidas.length}…`);
      onImport(escolhidas.map((q, i) => mapearQuestao(q, proximaOrdem + i, area)));
    } catch {
      setError('Erro ao sortear. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal-sm" onClick={e => e.stopPropagation()}>
        <header className="admin-modal-head">
          <div>
            <h3>🎲 Sortear questões</h3>
            <p className="admin-muted">Área: {AREA_LABELS[area]}</p>
          </div>
          <button className="admin-modal-close" onClick={onClose}>×</button>
        </header>

        <div className="admin-modal-body">
          {error && <div className="admin-alert error">{error}</div>}

          <div className="admin-field">
            <label>Quantidade de questões: <strong>{quantidade}</strong></label>
            <input
              type="range"
              min={5} max={45} step={5}
              value={quantidade}
              onChange={e => setQuantidade(+e.target.value)}
              className="admin-range"
            />
            <div className="admin-range-labels">
              <span>5</span><span>15</span><span>25</span><span>35</span><span>45</span>
            </div>
          </div>

          <div className="admin-field">
            <label>Sortear de quais anos?</label>
            {loadingAnos ? (
              <p className="admin-muted">Carregando anos…</p>
            ) : (
              <>
                <div className="admin-anos-grid">
                  {anos.map(a => (
                    <label key={a.year} className={`admin-ano-chip ${anosEscolhidos.has(a.year) ? 'active' : ''}`}>
                      <input type="checkbox" checked={anosEscolhidos.has(a.year)} onChange={() => toggleAno(a.year)} />
                      {a.year}
                    </label>
                  ))}
                </div>
                <div className="admin-anos-quick">
                  <button type="button" className="admin-btn small" onClick={() => setAnosEscolhidos(new Set(anos.slice(0, 5).map(a => a.year)))}>Últimos 5</button>
                  <button type="button" className="admin-btn small" onClick={() => setAnosEscolhidos(new Set(anos.map(a => a.year)))}>Todos</button>
                  <button type="button" className="admin-btn small" onClick={() => setAnosEscolhidos(new Set())}>Limpar</button>
                </div>
              </>
            )}
          </div>

          {loading && (
            <div className="admin-sortear-status">
              <span className="admin-spin" />
              <span>{progresso}</span>
            </div>
          )}
        </div>

        <footer className="admin-modal-foot">
          <button className="admin-btn" onClick={onClose} disabled={loading}>Cancelar</button>
          <button
            className="admin-btn primary"
            onClick={sortear}
            disabled={loading || anosEscolhidos.size === 0}
          >
            {loading ? 'Sorteando…' : `🎲 Sortear ${quantidade} questões`}
          </button>
        </footer>
      </div>
    </div>
  );
};

/* Renderiza texto com imagens inline (markdown ![]() e [Imagem: url]) */
export const RenderConteudo = ({ texto, className = '' }) => {
  if (!texto) return null;
  const partes = texto.split(/(!\[.*?\]\(.*?\)|\[Imagem:\s*.*?\])/g);
  return (
    <span className={className}>
      {partes.map((parte, i) => {
        const md = parte.match(/^!\[.*?\]\((.*?)\)$/);
        const tag = parte.match(/^\[Imagem:\s*(.*?)\]$/);
        const url = md?.[1] || tag?.[1];
        if (url) {
          return (
            <img
              key={i}
              src={url}
              alt="Imagem da questão"
              className="questao-img"
              loading="lazy"
            />
          );
        }
        return <span key={i}>{parte}</span>;
      })}
    </span>
  );
};

const temImagem = (texto) => /!\[.*?\]\(.*?\)|\[Imagem:/i.test(texto || '');

const QuestaoEditor = ({ questao, onChange, onAlt, onRemove }) => {
  const [preview, setPreview] = useState(temImagem(questao.enunciado));

  return (
    <div className="admin-questao">
      <div className="admin-questao-head">
        <strong>Questão {questao.ordem}</strong>
        <div style={{ display: 'flex', gap: 8 }}>
          {temImagem(questao.enunciado) && (
            <button
              type="button"
              className="admin-btn small"
              onClick={() => setPreview(v => !v)}
            >
              {preview ? '✏️ Editar' : '🖼 Ver prévia'}
            </button>
          )}
          <button className="admin-btn danger small" onClick={onRemove}>Remover</button>
        </div>
      </div>

      <div className="admin-field">
        <label>Enunciado</label>
        {preview ? (
          <div className="admin-questao-preview">
            <RenderConteudo texto={questao.enunciado} />
          </div>
        ) : (
          <textarea
            rows={4}
            value={questao.enunciado}
            onChange={e => onChange({ enunciado: e.target.value })}
            placeholder="Texto da questão…"
          />
        )}
      </div>

      <div className="admin-alternativas">
        {questao.alternativas.map(alt => (
          <div key={alt.letra} className="admin-alt">
            <span className="admin-alt-letra">{alt.letra}</span>
            {temImagem(alt.texto) ? (
              <div className="admin-alt-img-wrap">
                <RenderConteudo texto={alt.texto} />
              </div>
            ) : (
              <input
                type="text"
                value={alt.texto}
                onChange={e => onAlt(alt.letra, e.target.value)}
                placeholder={`Alternativa ${alt.letra}`}
              />
            )}
            <label className="admin-alt-correta">
              <input
                type="radio"
                name={`gab-${questao.ordem}`}
                checked={questao.gabarito === alt.letra}
                onChange={() => onChange({ gabarito: alt.letra })}
              />
              Correta
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────
   Tab 2: Temporadas
   ───────────────────────────────────── */

const TemporadasTab = () => {
  const [temporadas, setTemporadas] = useState([]);
  const [simulados, setSimulados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    const [{ data: temps }, { data: sims }] = await Promise.all([
      supabase.from('simulado_temporadas').select('*, simulados_semanais(titulo, tipo)').order('numero', { ascending: false }),
      supabase.from('simulados_semanais').select('id, titulo, tipo').order('created_at', { ascending: false }),
    ]);
    setTemporadas(temps || []);
    setSimulados(sims || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const deletar = async (id) => {
    if (!confirm('Excluir esta temporada?')) return;
    await supabase.from('simulado_temporadas').delete().eq('id', id);
    load();
  };

  const hoje = new Date().toISOString().split('T')[0];
  const statusDe = (t) => {
    if (t.semana_fim < hoje) return 'finalizada';
    if (t.semana_inicio > hoje) return 'futura';
    return 'ativa';
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Calendário de Temporadas</h2>
        <button className="admin-btn primary" onClick={() => setCreating(true)}>
          + Agendar temporada
        </button>
      </div>

      {creating && (
        <NovaTemporadaForm
          simulados={simulados}
          proxNumero={(temporadas[0]?.numero || 0) + 1}
          onCancel={() => setCreating(false)}
          onCreated={() => { setCreating(false); load(); }}
        />
      )}

      {loading ? (
        <p className="admin-muted">Carregando…</p>
      ) : temporadas.length === 0 ? (
        <p className="admin-muted">Nenhuma temporada agendada.</p>
      ) : (
        <div className="admin-table">
          <div className="admin-table-head">
            <span>#</span>
            <span>Simulado</span>
            <span>Período</span>
            <span>Status</span>
            <span></span>
          </div>
          {temporadas.map(t => {
            const st = statusDe(t);
            return (
              <div key={t.id} className="admin-table-row">
                <span>#{t.numero}</span>
                <span className="truncate">{t.simulados_semanais?.titulo || '(removido)'}</span>
                <span>{formatDateBR(t.semana_inicio)} — {formatDateBR(t.semana_fim)}</span>
                <span className={`admin-status ${st}`}>{st}</span>
                <span>
                  {st !== 'finalizada' && (
                    <button className="admin-btn danger small" onClick={() => deletar(t.id)}>Excluir</button>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const NovaTemporadaForm = ({ simulados, proxNumero, onCancel, onCreated }) => {
  const [simuladoId, setSimuladoId] = useState('');
  const [inicio, setInicio] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const fim = inicio ? addDias(inicio, 6) : '';

  const handle = async (e) => {
    e.preventDefault();
    if (!simuladoId || !inicio) return;
    setSaving(true);
    setError(null);
    const { error: err } = await supabase.from('simulado_temporadas').insert({
      numero: proxNumero,
      simulado_id: simuladoId,
      semana_inicio: inicio,
      semana_fim: fim,
    });
    setSaving(false);
    if (err) { setError(err.message); return; }
    onCreated();
  };

  return (
    <form className="admin-card" onSubmit={handle}>
      <h3>Agendar temporada #{proxNumero}</h3>
      {error && <div className="admin-alert error">{error}</div>}
      <div className="admin-field">
        <label>Simulado</label>
        <select value={simuladoId} onChange={e => setSimuladoId(e.target.value)} required>
          <option value="">Selecione…</option>
          {simulados.map(s => (
            <option key={s.id} value={s.id}>{s.titulo}</option>
          ))}
        </select>
      </div>
      <div className="admin-field">
        <label>Início da semana</label>
        <input type="date" value={inicio} onChange={e => setInicio(e.target.value)} required />
        {fim && <small className="admin-muted">Fim: {formatDateBR(fim)}</small>}
      </div>
      <div className="admin-actions">
        <button type="button" className="admin-btn" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="admin-btn primary" disabled={saving}>
          {saving ? 'Agendando…' : 'Agendar'}
        </button>
      </div>
    </form>
  );
};

/* ─────────────────────────────────────
   Utils
   ───────────────────────────────────── */

const formatDateBR = (iso) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

const addDias = (iso, n) => {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
};

export default Admin;
