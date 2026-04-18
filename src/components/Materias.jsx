import { useState, useEffect, useMemo } from 'react';
import { uerjSpecifics } from '../data/uerjSpecifics';
import { questoes as questoesBase } from '../data/questoesData';
import { TOPICOS } from '../utils/geradorCronograma';
import './Materias.css';

const SUBJECTS = [
  { name: 'Matemática', icon: '📐', color: '#3b82f6' },
  { name: 'Português', icon: '📝', color: '#10b981' },
  { name: 'Literatura', icon: '📚', color: '#8b5cf6' },
  { name: 'Redação', icon: '🖋️', color: '#f59e0b' },
  { name: 'Inglês', icon: '🌐', color: '#06b6d4' },
  { name: 'Biologia', icon: '🧬', color: '#22c55e' },
  { name: 'Química', icon: '🧪', color: '#a855f7' },
  { name: 'Física', icon: '🔋', color: '#ef4444' },
  { name: 'História', icon: '🏛️', color: '#d97706' },
  { name: 'Geografia', icon: '🌍', color: '#0ea5e9' },
  { name: 'Sociologia', icon: '👥', color: '#ec4899' },
  { name: 'Filosofia', icon: '💭', color: '#6366f1' },
];

export const STORAGE_ESTUDADOS = 'materias_topicos_estudados_v1';

// status: 0 = não iniciado, 1 = estudando, 2 = dominado
const STATUS = [
  { label: 'Não iniciado', icon: '○',  cls: 'nao-iniciado' },
  { label: 'Estudando',    icon: '📖', cls: 'estudando'    },
  { label: 'Dominado',     icon: '✓',  cls: 'dominado'     },
];

const DICAS_TOPICOS = {
  'Matemática': {
    'Funções': 'Domínio, contradomínio, injetora/sobrejetora. Gráficos: reta (1º grau), parábola (2º grau), hipérbole.',
    'Geometria Plana': 'Áreas e perímetros. Teorema de Pitágoras. Semelhança e congruência de triângulos.',
    'Geometria Espacial': 'Volumes: prisma, cilindro, cone, pirâmide, esfera. Sólidos de revolução.',
    'Trigonometria': 'Razões no triângulo retângulo. Ciclo trigonométrico. Lei dos senos e cossenos.',
    'Probabilidade': 'Eventos independentes e dependentes. Probabilidade condicional. União e intersecção.',
    'Análise Combinatória': 'Princípio fundamental da contagem. Permutação, arranjo, combinação.',
    'Estatística': 'Média, mediana, moda. Desvio padrão. Interpretação de gráficos.',
    'Progressões': 'PA: razão constante somada. PG: razão constante multiplicada. Fórmulas de termo geral e soma.',
    'Logaritmos': 'log(a·b)=log(a)+log(b). Mudança de base. Exponenciais e logarítmicas.',
    'Matrizes': 'Soma, multiplicação, determinantes. Sistemas lineares por matrizes.',
  },
  'Português': {
    'Interpretação de Texto': 'Ideia central, tese e argumentos. Intencionalidade discursiva. Inferências.',
    'Figuras de Linguagem': 'Metáfora, metonímia, ironia, hipérbole. Diferencie de linguagem denotativa.',
    'Sintaxe': 'Análise sintática: sujeito, predicado, complementos. Orações coordenadas e subordinadas.',
    'Concordância': 'Verbal e nominal. Casos especiais: sujeito composto, verbos impessoais.',
    'Regência': 'Verbos transitivos diretos e indiretos. Preposições exigidas.',
    'Pontuação': 'Vírgula em orações subordinadas, aposto, vocativo. Ponto e vírgula separando orações.',
    'Semântica': 'Sinonímia, antonímia, ambiguidade, polissemia. Denotação vs conotação.',
    'Crase': 'Fusão da preposição "a" com o artigo "a(s)". Regra prática: "para a" → "à".',
    'Morfologia': 'Classes de palavras: substantivo, verbo, adjetivo, artigo, pronome etc.',
    'Gêneros Textuais': 'Dissertação, narrativa, descritivo, injuntivo. Características de cada gênero.',
  },
  'Literatura': {
    'Barroco': 'Conflito fé/razão. Jogo de contrastes. Gregório de Matos, Padre Vieira.',
    'Arcadismo': 'Fugere urbem, bucolismo, inutilia truncat. Tomás Antônio Gonzaga.',
    'Romantismo': 'Subjetividade, nacionalismo, indianismo. José de Alencar, Álvares de Azevedo.',
    'Realismo': 'Crítica social, análise psicológica. Machado de Assis (2ª fase).',
    'Parnasianismo': 'Arte pela arte, objetividade, forma impecável. Olavo Bilac.',
    'Simbolismo': 'Sugestão, musicalidade, transcendência. Cruz e Sousa.',
    'Pré-Modernismo': 'Denúncia do Brasil esquecido. Euclides da Cunha, Lima Barreto, Monteiro Lobato.',
    'Modernismo 1ª Fase': 'Semana de 22. Ruptura, irreverência, nacionalismo. Oswald, Mário de Andrade.',
    'Modernismo 2ª Fase': 'Poesia madura, romance regional. Drummond, Graciliano Ramos, Jorge Amado.',
    'Literatura Contemporânea': 'Pluralidade, metalinguagem, minorias. Clarice, Guimarães Rosa.',
  },
  'Redação': {
    'Estrutura Dissertativa': 'Introdução (tese), 2 parágrafos de desenvolvimento, conclusão com proposta.',
    'Proposta de Intervenção': '5 elementos: agente, ação, meio/modo, finalidade, detalhamento.',
    'Repertório Sociocultural': 'Dados, autores, filmes, leis, contexto histórico. Amplia Competência III.',
    'Competências ENEM': 'C1 norma culta, C2 proposta/tema, C3 argumentação, C4 coesão, C5 proposta. Cada 0-200.',
    'Coesão e Coerência': 'Conectivos: portanto, ademais, contudo. Retomada pronominal. Progressão lógica.',
    'Treino de Tema': 'Leia matriz de referência e enunciado. 30min de planejamento antes de escrever.',
    'Correção por Pares': 'Troca de redações com colegas aplicando a matriz de competências.',
    'Refinamento': 'Reescrita após correção. Foca nos pontos de C3 (argumentação) e C5 (intervenção).',
  },
  'Inglês': {
    'Reading Comprehension': 'Main idea, supporting details, inference, author\'s purpose. Scan/skim techniques.',
    'Vocabulary': 'Cognates (true friends), false friends (actually = na verdade, não atualmente).',
    'Grammar — Tenses': 'Present/past simple, continuous, perfect. Future with will/going to.',
    'Cognates and False Friends': 'Pretend = fingir; library = biblioteca; push = empurrar; realize = perceber.',
    'Phrasal Verbs': 'Look up, give up, run into, figure out, carry on, put off, turn down.',
  },
  'Biologia': {
    'Citologia': 'Organelas: mitocôndria (energia), cloroplasto (fotossíntese), ribossomo (proteínas).',
    'Genética': '1ª Lei de Mendel (monoibridismo), 2ª Lei (diibridismo). Heredogramas.',
    'Ecologia': 'Cadeia alimentar, ciclos biogeoquímicos, relações ecológicas, biomas.',
    'Evolução': 'Seleção natural (Darwin). Fontes de variabilidade: mutação, recombinação.',
    'Fisiologia Humana': 'Sistemas: circulatório, respiratório, digestório, nervoso, endócrino.',
    'Botânica': 'Fotossíntese, respiração, transpiração. Briófitas → Pteridófitas → Gimnospermas → Angiospermas.',
    'Zoologia': 'Invertebrados (poríferos a artrópodes) e vertebrados (peixes a mamíferos).',
    'Microbiologia': 'Vírus (não-celulares), bactérias, protozoários, fungos. Doenças e profilaxia.',
    'Bioquímica': 'Água, sais, carboidratos, lipídios, proteínas, ácidos nucleicos, vitaminas.',
    'Embriologia': 'Segmentação, gastrulação, neurulação. Folhetos embrionários e derivados.',
  },
  'Química': {
    'Atomística': 'Modelos atômicos: Dalton, Thomson, Rutherford, Bohr. Distribuição eletrônica.',
    'Ligações Químicas': 'Iônica, covalente, metálica. Geometria molecular e polaridade.',
    'Termoquímica': 'ΔH: endotérmica (+) e exotérmica (−). Lei de Hess.',
    'Cinética': 'Velocidade das reações. Fatores: temperatura, concentração, catalisador, superfície.',
    'Equilíbrio': 'Kc, Kp. Princípio de Le Chatelier. Equilíbrio iônico (Ka, Kb, pH).',
    'Eletroquímica': 'Pilhas (espontânea) e eletrólise (forçada). Tabela de potenciais padrão.',
    'Química Orgânica — Funções': 'Hidrocarbonetos, álcoois, ácidos carboxílicos, ésteres, aminas.',
    'Química Orgânica — Reações': 'Substituição, adição, eliminação, oxidação. Reações de Grignard.',
    'Estequiometria': 'Cálculos de massa, volume, mols. Reagente limitante, rendimento, pureza.',
    'Soluções': 'Concentração comum, molaridade, fração molar, ppm. Diluição e mistura.',
  },
  'Física': {
    'Cinemática': 'MU e MUV. Gráficos s×t, v×t. Queda livre e lançamento vertical.',
    'Dinâmica': 'Leis de Newton. Força de atrito, tração, normal. Plano inclinado.',
    'Energia e Trabalho': 'Energia cinética, potencial gravitacional e elástica. Teorema da energia cinética.',
    'Hidrostática': 'Princípio de Pascal, Arquimedes. Pressão e empuxo. Vasos comunicantes.',
    'Termologia': 'Temperatura, calor, dilatação. Calorimetria (Q = m·c·ΔT). Mudanças de fase.',
    'Ondulatória': 'Ondas transversais e longitudinais. Período, frequência, comprimento. Som.',
    'Óptica': 'Espelhos, lentes. Equação de Gauss. Refração e reflexão. Instrumentos ópticos.',
    'Eletrostática': 'Lei de Coulomb. Campo e potencial elétrico. Capacitores.',
    'Eletrodinâmica': 'Corrente, tensão, resistência (Lei de Ohm). Associações de resistores.',
    'Eletromagnetismo': 'Campo magnético. Força sobre cargas (Lei de Lorentz). Indução (Faraday).',
  },
  'História': {
    'Antiguidade': 'Egito, Mesopotâmia, Grécia (democracia ateniense), Roma (república e império).',
    'Idade Média': 'Feudalismo, Igreja, Cruzadas, peste negra, formação dos Estados nacionais.',
    'Brasil Colônia': 'Capitanias, engenho, bandeirismo, mineração, escravidão africana.',
    'Brasil Império': '1º Reinado, Regência, 2º Reinado. Abolição, Proclamação da República.',
    'República Velha': 'Café-com-leite, coronelismo, Revolta da Vacina, Canudos, Contestado.',
    'Era Vargas': '1930, Estado Novo (1937), CLT, nacionalismo, redemocratização 1945.',
    'Ditadura Militar': 'Golpe 1964, AI-5, anos de chumbo, milagre econômico, abertura, Diretas Já.',
    'Guerra Fria': 'EUA vs URSS. Cortina de ferro, OTAN/Pacto de Varsóvia, Revolução Cubana.',
    'Redemocratização': 'Nova República. Constituição de 88. Impeachment de Collor (1992).',
    'História Contemporânea': 'Globalização, 11 de Setembro, Primavera Árabe, crises recentes.',
  },
  'Geografia': {
    'Cartografia': 'Projeções (Mercator, Peters), escala, fusos horários, coordenadas.',
    'Geopolítica': 'Nova ordem mundial, blocos econômicos (UE, Mercosul, BRICS), conflitos.',
    'Climatologia': 'Fatores (latitude, altitude, massas de ar). Tipos de clima no Brasil.',
    'Hidrografia': 'Bacias brasileiras (Amazônica, Paraná, São Francisco). Aproveitamento hidrelétrico.',
    'Biomas do Brasil': 'Amazônia, Cerrado, Caatinga, Mata Atlântica, Pampa, Pantanal.',
    'Urbanização': 'Êxodo rural, metropolização, segregação, favelização, mobilidade.',
    'Agropecuária': 'Modernização, agronegócio, agricultura familiar, conflitos agrários.',
    'Globalização': 'Fluxos de mercadorias, capital, informação. Desigualdade global.',
    'Demografia': 'Transição demográfica. Pirâmide etária brasileira. Envelhecimento.',
    'Geografia Econômica': 'Setores primário, secundário, terciário. Indústria 4.0.',
  },
  'Sociologia': {
    'Durkheim': 'Fato social: exterior, coercitivo, geral. Solidariedade mecânica e orgânica. Anomia.',
    'Weber': 'Ação social (4 tipos). Dominação (tradicional, carismática, racional-legal). Burocracia.',
    'Marx': 'Materialismo histórico. Infra e superestrutura. Mais-valia. Luta de classes.',
    'Movimentos Sociais': 'Feminismo (3 ondas), antirracistas, LGBTQIA+, ambientais, MST.',
    'Indústria Cultural': 'Escola de Frankfurt (Adorno, Horkheimer). Padronização, alienação cultural.',
    'Cidadania': 'T.H. Marshall: civil, política, social. Cidadania regulada no Brasil (Vargas).',
    'Desigualdade Social': 'Classe, renda, raça, gênero. Mobilidade social, interseccionalidade.',
    'Trabalho e Sociedade': 'Taylorismo, fordismo, toyotismo. Uberização e precarização.',
  },
  'Filosofia': {
    'Pré-Socráticos': 'Busca da arché. Tales (água), Heráclito (fogo, devir), Parmênides (ser).',
    'Sócrates e Platão': 'Maiêutica, ironia. Mundo das ideias, alegoria da caverna.',
    'Aristóteles': 'Lógica (silogismo). Potência e ato. Ética da virtude. Zoon politikon.',
    'Iluminismo': 'Razão, progresso, crítica ao absolutismo. Voltaire, Rousseau, Montesquieu.',
    'Kant': 'Imperativo categórico. Crítica da razão pura. Autonomia moral.',
    'Hegel': 'Dialética (tese-antítese-síntese). Fenomenologia do Espírito. Idealismo absoluto.',
    'Existencialismo': 'Sartre: "existência precede essência". Liberdade como condenação. Angústia.',
    'Ética': 'Deontologia (Kant), Consequencialismo (Mill, utilitarismo), Virtudes (Aristóteles).',
  },
};

export default function Materias({ focus, course, onPraticarMateria }) {
  const [materiaAberta, setMateriaAberta] = useState(null);
  const [busca, setBusca] = useState('');
  const [progresso, setProgresso] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_ESTUDADOS);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      // migração: boolean antigo → objeto novo
      const migrado = {};
      Object.entries(parsed).forEach(([k, v]) => {
        if (typeof v === 'boolean') migrado[k] = { status: v ? 2 : 0, updatedAt: null };
        else migrado[k] = v;
      });
      return migrado;
    } catch { return {}; }
  });
  const [filtroStatus, setFiltroStatus] = useState('todos');

  useEffect(() => {
    localStorage.setItem(STORAGE_ESTUDADOS, JSON.stringify(progresso));
  }, [progresso]);

  const specificSubjects = uerjSpecifics[course] || [];
  const isSpecific = (name) => (focus === 'uerj' || focus === 'ambos') && specificSubjects.includes(name);

  const contagemQuestoes = useMemo(() => {
    const c = {};
    questoesBase.forEach(q => { c[q.subject] = (c[q.subject] || 0) + 1; });
    return c;
  }, []);

  function getStatus(materia, topico) {
    const entry = progresso[`${materia}::${topico}`];
    return entry?.status ?? 0;
  }

  function calcularProgresso(nome) {
    const topicos = TOPICOS[nome] || [];
    const lista = Array.isArray(topicos) ? topicos : Object.keys(topicos);
    if (lista.length === 0) return { pct: 0, dominados: 0, estudando: 0, total: 0 };
    const dominados  = lista.filter(t => getStatus(nome, t) === 2).length;
    const estudando  = lista.filter(t => getStatus(nome, t) === 1).length;
    const pct = Math.round(((dominados + estudando * 0.5) / lista.length) * 100);
    return { pct, dominados, estudando, total: lista.length };
  }

  function avancarStatus(materia, topico) {
    const k = `${materia}::${topico}`;
    const atual = progresso[k]?.status ?? 0;
    const novo = (atual + 1) % 3;
    setProgresso(prev => ({ ...prev, [k]: { status: novo, updatedAt: new Date().toISOString() } }));
  }

  function formatDate(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    const hoje = new Date();
    const diffDias = Math.floor((hoje - d) / 86400000);
    if (diffDias === 0) return 'hoje';
    if (diffDias === 1) return 'ontem';
    return `há ${diffDias} dias`;
  }

  const filtered = SUBJECTS.filter(s =>
    !busca || s.name.toLowerCase().includes(busca.toLowerCase())
  );

  // ── DETAIL VIEW ───────────────────────────────────────────────────────────
  if (materiaAberta) {
    const subj = SUBJECTS.find(s => s.name === materiaAberta);
    const topicosRaw = TOPICOS[materiaAberta] || [];
    const topicosList = Array.isArray(topicosRaw) ? topicosRaw : Object.keys(topicosRaw);
    const dicas = DICAS_TOPICOS[materiaAberta] || {};
    const prog = calcularProgresso(materiaAberta);
    const totalQ = contagemQuestoes[materiaAberta] || 0;

    const topicosFiltrados = topicosList.filter(t => {
      const s = getStatus(materiaAberta, t);
      if (filtroStatus === 'todos') return true;
      if (filtroStatus === 'nao') return s === 0;
      if (filtroStatus === 'estudando') return s === 1;
      if (filtroStatus === 'dominado') return s === 2;
      return true;
    });

    return (
      <div className="materias-container">
        <button className="back-link" onClick={() => { setMateriaAberta(null); setFiltroStatus('todos'); }}>
          ← Voltar para matérias
        </button>

        <header className="materia-detail-header" style={{ '--materia-cor': subj.color }}>
          <div className="materia-detail-icon">{subj.icon}</div>
          <div className="materia-detail-info">
            <h1>{materiaAberta}</h1>
            <p>{prog.total} tópicos · {totalQ} questões · {prog.dominados} dominados · {prog.estudando} em andamento</p>
            <div className="progress-bar detail-bar">
              <div className="progress-fill estudando-fill" style={{ width: `${Math.round(((prog.dominados + prog.estudando) / prog.total) * 100)}%`, background: '#f59e0b' }} />
              <div className="progress-fill" style={{ width: `${Math.round((prog.dominados / prog.total) * 100)}%`, background: subj.color }} />
            </div>
            <div className="prog-legend">
              <span style={{ color: subj.color }}>■ {prog.dominados} dominados</span>
              <span style={{ color: '#f59e0b' }}>■ {prog.estudando} estudando</span>
              <span style={{ color: 'var(--text-muted)' }}>■ {prog.total - prog.dominados - prog.estudando} não iniciados</span>
            </div>
          </div>
          {onPraticarMateria && (
            <button className="btn-praticar-topo" onClick={() => onPraticarMateria(materiaAberta)}>
              ✍️ Praticar questões
            </button>
          )}
        </header>

        <div className="topicos-filtro">
          {[
            { k: 'todos',    label: `Todos (${topicosList.length})` },
            { k: 'nao',      label: `Não iniciado (${topicosList.filter(t => getStatus(materiaAberta,t)===0).length})` },
            { k: 'estudando',label: `Estudando (${prog.estudando})` },
            { k: 'dominado', label: `Dominado (${prog.dominados})` },
          ].map(f => (
            <button
              key={f.k}
              className={`filtro-chip ${filtroStatus === f.k ? 'ativo' : ''}`}
              onClick={() => setFiltroStatus(f.k)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="topicos-lista">
          {topicosFiltrados.map(topico => {
            const st = getStatus(materiaAberta, topico);
            const entry = progresso[`${materiaAberta}::${topico}`];
            const dica = dicas[topico];
            const quando = formatDate(entry?.updatedAt);
            return (
              <div key={topico} className={`topico-card status-${st}`}>
                <button
                  className={`topico-check st-${st}`}
                  onClick={() => avancarStatus(materiaAberta, topico)}
                  title={`Clique para avançar: ${STATUS[(st + 1) % 3].label}`}
                >
                  {STATUS[st].icon}
                </button>
                <div className="topico-content">
                  <div className="topico-title-row">
                    <h3 className={st === 2 ? 'topico-done' : ''}>{topico}</h3>
                    {quando && <span className="topico-quando">{quando}</span>}
                  </div>
                  {dica && <p className="topico-dica">{dica}</p>}
                </div>
                {onPraticarMateria && (
                  <button
                    className="topico-praticar"
                    onClick={() => onPraticarMateria(materiaAberta, topico)}
                    title={`Praticar questões de ${topico}`}
                  >
                    →
                  </button>
                )}
              </div>
            );
          })}
          {topicosFiltrados.length === 0 && (
            <p className="topicos-vazio">Nenhum tópico neste filtro.</p>
          )}
        </div>
      </div>
    );
  }

  // ── LIST VIEW ─────────────────────────────────────────────────────────────
  return (
    <div className="materias-container">
      <header className="materias-header">
        <div className="header-text">
          <h1>Suas Matérias</h1>
          <p>
            {SUBJECTS.length} matérias · organizadas por tópicos do VesTibular 2026
          </p>
        </div>
        {course && (
          <div className="course-indicator">
            <span className="label">Curso: {course}</span>
          </div>
        )}
      </header>

      <div className="materias-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar matéria..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>

      <div className="subjects-grid">
        {filtered.map((subject) => {
          const topicosRaw = TOPICOS[subject.name] || [];
          const totalTopicos = Array.isArray(topicosRaw) ? topicosRaw.length : Object.keys(topicosRaw).length;
          const prog = calcularProgresso(subject.name);
          const totalQ = contagemQuestoes[subject.name] || 0;

          return (
            <div
              key={subject.name}
              className={`subject-card ${isSpecific(subject.name) ? 'specific' : ''}`}
              onClick={() => setMateriaAberta(subject.name)}
              style={{ '--materia-cor': subject.color }}
            >
              {isSpecific(subject.name) && (
                <span className="specific-badge">Específica UERJ</span>
              )}

              <div className="subject-icon" style={{ background: `${subject.color}15`, color: subject.color }}>
                {subject.icon}
              </div>

              <div className="subject-info">
                <h3>{subject.name}</h3>
                <p>{totalTopicos} tópicos · {totalQ} questões</p>
              </div>

              <div className="subject-progress-container">
                <div className="progress-label">
                  <span>{prog.dominados}/{totalTopicos} dominados</span>
                  <strong style={{ color: prog.pct >= 70 ? '#16a34a' : prog.pct >= 30 ? '#ca8a04' : 'var(--text-muted)' }}>
                    {prog.pct}%
                  </strong>
                </div>
                <div className="progress-bar stacked">
                  <div className="progress-fill" style={{ width: `${Math.round(((prog.dominados + prog.estudando) / prog.total) * 100)}%`, background: '#f59e0b', position: 'absolute' }} />
                  <div className="progress-fill" style={{ width: `${Math.round((prog.dominados / prog.total) * 100)}%`, background: subject.color, position: 'absolute' }} />
                </div>
              </div>

              <button className="open-subject-btn">Ver tópicos →</button>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="questoes-empty">
          <span className="empty-icon">🔍</span>
          <p>Nenhuma matéria encontrada com "{busca}".</p>
        </div>
      )}
    </div>
  );
}
