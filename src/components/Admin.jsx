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

const TEMAS_REDACAO = [
  {
    tema: 'O impacto das fake news na sociedade contemporânea',
    textos_motivadores:
      'Texto I\n"Um estudo realizado por pesquisadores do Instituto de Tecnologia de Massachusetts (MIT) apontou que as notícias falsas (fake news) têm 70% mais chances de serem compartilhadas nas redes sociais do que as verdadeiras. A pesquisa revelou que a mentira se espalha mais rápido, de forma mais profunda e com maior alcance do que a verdade, apelando para sentimentos como surpresa e repulsa." (Adaptado de revistas científicas).\n\nTexto II\n"A desinformação atinge o cerne da democracia, pois o voto e as escolhas políticas dependem de cidadãos bem informados. Quando a realidade é substituída por narrativas fabricadas, o debate público perde sua racionalidade e o tecido social é fragmentado pela polarização extrema." (Artigo de opinião sobre educação midiática).',
  },
  {
    tema: 'Desafios para a valorização da herança africana no Brasil',
    textos_motivadores:
      'Texto I\n"A Lei nº 10.639, de 9 de janeiro de 2003, alterou a Lei de Diretrizes e Bases da Educação Nacional para incluir no currículo oficial da Rede de Ensino a obrigatoriedade da temática \'História e Cultura Afro-Brasileira\'. O objetivo é resgatar a contribuição do negro nas áreas social, econômica e política pertinentes à História do Brasil." (Adaptado da legislação brasileira).\n\nTexto II\n"O mito da democracia racial no Brasil mascarou durante muito tempo o racismo estrutural que apaga e desvaloriza a estética, as religiões e as contribuições intelectuais da população negra. Reconhecer a herança africana exige mais do que tolerância; exige a reconstrução do imaginário nacional e o combate ativo ao preconceito." (Trecho de análise sociológica).',
  },
  {
    tema: 'Desafios para o enfrentamento da invisibilidade do trabalho de cuidado',
    textos_motivadores:
      'Texto I\n"Dados do Instituto Brasileiro de Geografia e Estatística (IBGE) mostram que as mulheres dedicam quase o dobro de horas semanais aos afazeres domésticos e ao cuidado de pessoas (crianças, idosos, enfermos) em comparação aos homens. Essa carga dupla ou tripla afeta diretamente a inserção e a permanência feminina no mercado de trabalho remunerado." (Adaptado da Pnad Contínua/IBGE).\n\nTexto II\n"A economia do cuidado é a base invisível que sustenta todas as outras engrenagens da sociedade capitalista. Sem quem cozinhe, limpe e eduque, a força de trabalho não pode existir. No entanto, esse esforço contínuo não entra no cálculo do Produto Interno Bruto (PIB) e é socialmente encarado como uma \'vocação\' feminina, e não como um trabalho que merece reconhecimento e remuneração." (Artigo sobre economia e gênero).',
  },
  {
    tema: 'Desafios para a valorização de comunidades e povos tradicionais no Brasil',
    textos_motivadores:
      'Texto I\n"A Constituição Federal de 1988, em seu Art. 231, reconhece aos índios sua organização social, costumes, línguas, crenças e tradições, e os direitos originários sobre as terras que tradicionalmente ocupam, competindo à União demarcá-las, proteger e fazer respeitar todos os seus bens." (Constituição da República Federativa do Brasil).\n\nTexto II\n"As comunidades tradicionais, como quilombolas, ribeirinhos, caiçaras e indígenas, são consideradas pelos cientistas como as principais guardiãs da biodiversidade. Seus modos de vida ancestrais utilizam os recursos naturais de forma sustentável, contrastando com o avanço predatório de atividades extrativistas e do agronegócio sobre seus territórios." (Reportagem ambiental).',
  },
  {
    tema: 'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil',
    textos_motivadores:
      'Texto I\n"No Brasil, milhões de pessoas vivem sem o registro civil de nascimento. Conhecidos como os \'invisíveis\', esses cidadãos não existem oficialmente para o Estado. Sem a certidão de nascimento, é impossível obter RG, CPF, matricular-se em escolas públicas, receber vacinas pelo SUS ou ter acesso a benefícios sociais." (Levantamento sobre sub-registro no Brasil).\n\nTexto II\n"Todo ser humano tem direito a ser reconhecido, em todos os lugares, como pessoa perante a lei." (Artigo VI da Declaração Universal dos Direitos Humanos, 1948). O documento é o passaporte que garante a transição do indivíduo da invisibilidade para a cidadania plena.',
  },
  {
    tema: 'O impacto das tecnologias digitais no desenvolvimento socioemocional de jovens',
    textos_motivadores:
      'Texto I\n"Sociedades médicas de pediatria e psicologia alertam para o aumento de quadros de ansiedade, depressão e Transtorno de Déficit de Atenção em crianças e adolescentes devido ao uso excessivo de telas. A hiperestimulação constante altera as vias de recompensa do cérebro, reduzindo a tolerância à frustração e a capacidade de foco prolongado." (Boletim médico sobre saúde digital).\n\nTexto II\n"A tela, que deveria ser uma janela para o mundo, muitas vezes torna-se um espelho que reflete o isolamento. Jovens hiperconectados no ambiente virtual frequentemente relatam sentimentos de solidão profunda no mundo físico, evidenciando uma perda de habilidades sociais essenciais, como a leitura de expressões faciais e o diálogo olho no olho." (Artigo de psicologia comportamental).',
  },
  {
    tema: 'Perspectivas acerca do envelhecimento na sociedade brasileira',
    textos_motivadores:
      'Texto I\n"A pirâmide etária brasileira está passando por uma inversão histórica. Projeções demográficas indicam que, nas próximas décadas, o número de idosos no país superará o de jovens e crianças. Esse rápido processo de transição impõe desafios imediatos para a previdência social, o sistema de saúde público e a infraestrutura urbana." (Adaptado de dados censitários).\n\nTexto II\n"O Estatuto da Pessoa Idosa (Lei nº 10.741/2003) assegura a participação do idoso na comunidade, defendendo sua dignidade, bem-estar e o direito à vida. Contudo, o etarismo — o preconceito baseado na idade — ainda marginaliza essa população, excluindo-a do mercado de trabalho e limitando sua autonomia na tomada de decisões familiares e sociais." (Reflexão sobre direitos humanos).',
  },
  {
    tema: 'Meio ambiente e sustentabilidade: os desafios da proteção ambiental',
    textos_motivadores:
      'Texto I\n"Art. 225. Todos têm direito ao meio ambiente ecologicamente equilibrado, bem de uso comum do povo e essencial à sadia qualidade de vida, impondo-se ao poder público e à coletividade o dever de defendê-lo e preservá-lo para as presentes e futuras gerações." (Constituição Federal de 1988).\n\nTexto II\n"Os relatórios recentes do Painel Intergovernamental sobre Mudanças Climáticas (IPCC) soam um alerta vermelho para a humanidade. Ondas de calor extremo, secas prolongadas e enchentes devastadoras não são mais previsões futuras, mas a realidade presente. A mudança de um modelo de produção linear para uma economia circular e descarbonizada é uma questão de sobrevivência." (Resumo de relatório ambiental global).',
  },
  {
    tema: 'A influência das redes sociais na autoestima de adolescentes',
    textos_motivadores:
      'Texto I\n"O fenômeno chamado \'dismorfia do Snapchat\' ocorre quando pacientes buscam cirurgias plásticas ou procedimentos estéticos para se parecerem com as versões editadas e filtradas de si mesmos. Essa distorção de imagem corporal tem gerado uma epidemia de insatisfação crônica entre os mais jovens." (Artigo de revistas de dermatologia e psiquiatria).\n\nTexto II\n"Os algoritmos das redes sociais são desenhados para reter a atenção, frequentemente priorizando conteúdos que geram comparação social. Ao visualizar vidas aparentemente perfeitas e corpos inatingíveis, adolescentes desenvolvem uma métrica irreal de sucesso e beleza, o que se converte em gatilho para transtornos alimentares e baixa autoestima." (Estudo sobre comportamento digital).',
  },
  {
    tema: 'Desafios para a (re)inserção socioeconômica da população em situação de rua',
    textos_motivadores:
      'Texto I\n"Estudos de institutos de pesquisa econômica revelam que a população em situação de rua no Brasil cresceu exponencialmente na última década, impulsionada pelo desemprego, crise habitacional e ausência de redes de apoio. Esse grupo demográfico é extremamente heterogêneo, incluindo desde trabalhadores informais até famílias inteiras desabrigadas." (Dados de institutos de pesquisa social).\n\nTexto II\n"A arquitetura hostil, presente na instalação de espetos de metal sob viadutos, bancos de praças divididos e pedras em calçadas, reflete a \'aporofobia\' (o medo e a rejeição aos pobres). Em vez de promover políticas públicas de acolhimento, moradia e saúde mental (como o modelo \'Housing First\'), muitas cidades optam por varrer essas pessoas do campo de visão da sociedade." (Ensaio sobre urbanismo e desigualdade).',
  },
];

// O campo `discipline` da API tem ~5% de erros (ex: questão de química marcada como humanas).
// O `index` da questão segue o padrão oficial do ENEM e é confiável.
const AREA_INDEX_RANGE = {
  linguagens: [1, 45],
  humanas: [46, 90],
  naturezas: [91, 135],
  matematica: [136, 180],
};

const isQuestaoDaArea = (q, area) => {
  const [min, max] = AREA_INDEX_RANGE[area] || [];
  return typeof q.index === 'number' && q.index >= min && q.index <= max;
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
            <div className="admin-field-header">
              <label>Tema da redação</label>
              <button
                type="button"
                className="admin-btn-sortear"
                onClick={() => {
                  const t = TEMAS_REDACAO[Math.floor(Math.random() * TEMAS_REDACAO.length)];
                  setRedacao({ tema: t.tema, textos_motivadores: t.textos_motivadores });
                }}
              >
                🎲 Sortear tema
              </button>
            </div>
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

const buscarPorAnoArea = async (year, area) => {
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
    // Dedup por index (bordas de paginação às vezes duplicam) + filtra por faixa de índice da área
    const vistos = new Set();
    return todas.filter(q => {
      if (vistos.has(q.index)) return false;
      vistos.add(q.index);
      return isQuestaoDaArea(q, area);
    });
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
      setProgresso(`Buscando questões de ${AREA_LABELS[area]} em ${lista.length} prova(s)…`);

      // Busca sequencial pra não sobrecarregar a API
      const pool = [];
      for (const year of lista) {
        setProgresso(`Buscando ENEM ${year} (~4 páginas)…`);
        const qs = await buscarPorAnoArea(year, area);
        pool.push(...qs);
      }

      if (pool.length === 0) {
        setError(`Nenhuma questão de ${AREA_LABELS[area]} encontrada. Tente outros anos ou verifique sua conexão.`);
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
