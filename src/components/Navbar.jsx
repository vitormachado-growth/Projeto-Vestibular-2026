import { useState, useEffect, useRef, useMemo } from 'react';
import {
  gerarNotificacoes, getNotificacoesLidas,
  marcarLida, marcarTodasLidas,
  solicitarPermissaoBrowser, enviarNotificacaoBrowser,
} from '../utils/notificacoes';
import './Navbar.css';

const SECTIONS = [
  { type: 'section', label: 'Início', icon: '🏠', view: 'inicio' },
  { type: 'section', label: 'Cronograma', icon: '📅', view: 'cronograma' },
  { type: 'section', label: 'Matérias', icon: '📖', view: 'materias' },
  { type: 'section', label: 'Questões', icon: '✍️', view: 'questoes' },
  { type: 'section', label: 'Simulados', icon: '📝', view: 'simulados' },
  { type: 'section', label: 'Redação', icon: '✒️', view: 'redacao' },
  { type: 'section', label: 'Desempenho', icon: '📊', view: 'desempenho' },
  { type: 'section', label: 'Simulados Semanais', icon: '🏆', view: 'ranking' },
];

const SUBJECTS = [
  { subject: 'Matemática', icon: '📐' },
  { subject: 'Português', icon: '📝' },
  { subject: 'Física', icon: '⚛️' },
  { subject: 'Química', icon: '🧪' },
  { subject: 'Biologia', icon: '🧬' },
  { subject: 'História', icon: '🏛️' },
  { subject: 'Geografia', icon: '🌍' },
  { subject: 'Literatura', icon: '📚' },
  { subject: 'Filosofia', icon: '🤔' },
  { subject: 'Sociologia', icon: '👥' },
  { subject: 'Inglês', icon: '🇬🇧' },
].map(s => ({ type: 'subject', label: s.subject, icon: s.icon, view: 'questoes', subject: s.subject }));

const TOPICS = [
  { subject: 'Matemática', topics: ['Progressão Aritmética','Progressão Geométrica','Função do 1º Grau','Função do 2º Grau','Função Exponencial','Logaritmos','Probabilidade','Análise Combinatória','Estatística','Geometria Plana','Geometria Espacial','Geometria Analítica','Trigonometria','Matrizes','Sistemas Lineares','Inequações','Porcentagem e Proporção','Juros Simples','Juros Compostos','Potências e Raízes'] },
  { subject: 'Física', topics: ['Cinemática','MRU','MRUV','Queda Livre','Dinâmica','2ª Lei de Newton','Força de Atrito','Trabalho Mecânico','Energia e Trabalho','Conservação de Energia','Hidrostática','Termologia','Ondulatória','Eletrostática','Eletrodinâmica','Lei de Ohm','Eletromagnetismo','Óptica','Reflexão','Refração','Física Nuclear','Radioatividade'] },
  { subject: 'Química', topics: ['Ligações Químicas','Tabela Periódica','Soluções','Concentração','Estequiometria','Termoquímica','Cinética','Equilíbrio','Eletroquímica','Pilhas','Química Orgânica','Hidrocarbonetos','Álcoois','Ésteres','Polímeros','Ácidos e Bases','pH e Acidez','Misturas','Gases'] },
  { subject: 'Biologia', topics: ['Citologia','Célula','Divisão Celular','Genética','Genética Mendeliana','Evolução','Darwin','Ecologia','Cadeia Alimentar','Biomas do Brasil','Fotossíntese','Respiração Celular','Fisiologia Humana','Sistema Nervoso','Sistema Circulatório','Biotecnologia','Classificação Biológica','Zoologia','Botânica'] },
  { subject: 'História', topics: ['Grécia Antiga','Roma Antiga','Feudalismo Medieval','Renascimento','Iluminismo','Revolução Francesa','Revolução Industrial','Imperialismo','Primeira Guerra','Segunda Guerra Mundial','Revolução Russa','Guerra Fria','Brasil Colônia','Independência do Brasil','Era Vargas','Ditadura Militar','Redemocratização','República Velha','Escravidão Africana'] },
  { subject: 'Geografia', topics: ['Clima','Hidrografia','Relevo Brasileiro','Biomas do Brasil','Urbanização','Globalização','Geopolítica','Demografia','Cartografia','Migração','Agropecuária','Energias Renováveis','Amazônia','Cerrado','Pantanal','Recursos Hídricos'] },
  { subject: 'Português', topics: ['Interpretação de Texto','Concordância Verbal','Concordância Nominal','Regência','Colocação Pronominal','Crase','Morfologia','Sintaxe','Figuras de Linguagem','Semântica','Variação Linguística','Gêneros Textuais','Texto Argumentativo','Coesão Textual','Formação de Palavras'] },
  { subject: 'Literatura', topics: ['Trovadorismo','Humanismo','Classicismo','Barroco','Arcadismo','Romantismo','Realismo','Naturalismo','Parnasianismo','Simbolismo','Pré-Modernismo','Modernismo 1ª Fase','Modernismo 2ª Fase','Modernismo 3ª Fase','Machado de Assis','Clarice Lispector','Graciliano Ramos','Carlos Drummond','Fernando Pessoa'] },
  { subject: 'Filosofia', topics: ['Sócrates e Platão','Aristóteles','Pré-Socráticos','Descartes','Kant','Hegel','Marx','Nietzsche','Existencialismo','Sartre','Fenomenologia','Foucault','Lógica','Ética','Filosofia Política','Iluminismo'] },
  { subject: 'Sociologia', topics: ['Durkheim','Weber','Marx','Fato Social','Ação Social','Luta de Classes','Globalização','Movimentos Sociais','Cidadania','Desigualdade Social','Racismo Estrutural','Feminismo','Urbanização','Trabalho e Sociedade','Cultura'] },
  { subject: 'Inglês', topics: ['Reading Comprehension','Grammar','Vocabulary','Phrasal Verbs','Modals','Conditionals','Passive Voice','Articles','Comparatives','Present Perfect','Idioms','False Friends'] },
].flatMap(({ subject, topics }) =>
  topics.map(t => ({ type: 'topic', label: t, icon: '📌', subject, topic: t, view: 'questoes' }))
);

const SEARCH_POOL = [...SECTIONS, ...SUBJECTS, ...TOPICS];

const TIPO_COR = {
  alerta:  { bg: '#fef2f2', border: '#fca5a5', dot: '#ef4444' },
  info:    { bg: '#eff6ff', border: '#bfdbfe', dot: '#3b82f6' },
  revisar: { bg: '#fefce8', border: '#fde68a', dot: '#f59e0b' },
  sucesso: { bg: '#f0fdf4', border: '#bbf7d0', dot: '#16a34a' },
};

const TIPO_COR_DARK = {
  alerta:  { bg: '#3b1010', border: '#7f1d1d', dot: '#ef4444' },
  info:    { bg: '#1e3a5f', border: '#1d4ed8', dot: '#60a5fa' },
  revisar: { bg: '#3b2500', border: '#78350f', dot: '#f59e0b' },
  sucesso: { bg: '#052e16', border: '#14532d', dot: '#16a34a' },
};

export default function Navbar({ title, darkMode, onToggleDark, onNavigate, onNavigateToSubject, onMenuToggle }) {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [lidas, setLidas] = useState([]);
  const [permissao, setPermissao] = useState(() => {
    try { return (typeof Notification !== 'undefined') ? Notification.permission : 'unsupported'; }
    catch { return 'unsupported'; }
  });
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const ref = useRef(null);
  const searchRef = useRef(null);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_POOL.filter(item =>
      item.label.toLowerCase().includes(q) ||
      (item.subject && item.subject.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    const todas = gerarNotificacoes();
    setNotifs(todas);
    setLidas(getNotificacoesLidas());
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setQuery('');
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const naoLidas = notifs.filter(n => !lidas.includes(n.id));

  function handleOpen() {
    setOpen(o => !o);
  }

  function handleLer(notif) {
    marcarLida(notif.id);
    setLidas(getNotificacoesLidas());
    if (notif.rota && onNavigate) {
      onNavigate(notif.rota);
      setOpen(false);
    }
  }

  function handleLerTodas() {
    marcarTodasLidas(notifs.map(n => n.id));
    setLidas(notifs.map(n => n.id));
  }

  async function handlePermissao() {
    const result = await solicitarPermissaoBrowser();
    setPermissao(result);
    if (result === 'granted') {
      enviarNotificacaoBrowser('Notificações ativadas!', 'Você receberá lembretes de estudo enquanto o app estiver aberto.');
    }
  }

  function handleSelectResult(item) {
    setQuery('');
    if (item.type === 'section') {
      onNavigate(item.view);
    } else if (item.type === 'subject') {
      if (onNavigateToSubject) onNavigateToSubject(item.subject, null);
      else onNavigate('questoes');
    } else {
      if (onNavigateToSubject) onNavigateToSubject(item.subject, item.topic);
      else onNavigate('questoes');
    }
  }

  function handleSearchKeyDown(e) {
    if (!searchResults.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(i => Math.min(i + 1, searchResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedIdx]) handleSelectResult(searchResults[selectedIdx]);
    } else if (e.key === 'Escape') {
      setQuery('');
    }
  }

  const cores = darkMode ? TIPO_COR_DARK : TIPO_COR;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="hamburger-btn" onClick={onMenuToggle} aria-label="Abrir menu">
          ☰
        </button>
        <h1>{title}</h1>
      </div>

      <div className="navbar-right">
        <div className="search-bar" ref={searchRef}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="O que você quer estudar hoje?"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIdx(0); }}
            onKeyDown={handleSearchKeyDown}
          />
          {query && (
            <button className="search-clear" onClick={() => setQuery('')}>✕</button>
          )}
          {searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((item, i) => (
                <button
                  key={`${item.type}-${item.label}`}
                  className={`search-result-item ${i === selectedIdx ? 'selected' : ''}`}
                  onMouseEnter={() => setSelectedIdx(i)}
                  onMouseDown={e => { e.preventDefault(); handleSelectResult(item); }}
                >
                  <span className="search-result-icon">{item.icon}</span>
                  <div className="search-result-body">
                    <span className="search-result-label">{item.label}</span>
                    {item.type === 'topic' && (
                      <span className="search-result-sub">{item.subject}</span>
                    )}
                    {item.type === 'section' && (
                      <span className="search-result-sub">Página</span>
                    )}
                    {item.type === 'subject' && (
                      <span className="search-result-sub">Matéria · Ver questões</span>
                    )}
                  </div>
                  <span className="search-result-arrow">→</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="navbar-actions">
          {/* ── Sino ──────────────────────────────────────────────────────── */}
          <div className="notif-wrap" ref={ref}>
            <button
              className="icon-btn notif-btn"
              onClick={handleOpen}
              title="Notificações"
            >
              🔔
              {naoLidas.length > 0 && (
                <span className="notif-badge">{naoLidas.length}</span>
              )}
            </button>

            {open && (
              <div className="notif-panel">
                <div className="notif-panel-header">
                  <span>Notificações</span>
                  {naoLidas.length > 0 && (
                    <button className="notif-marcar-todas" onClick={handleLerTodas}>
                      Marcar todas como lidas
                    </button>
                  )}
                </div>

                {/* Permissão browser */}
                {permissao === 'default' && (
                  <button className="notif-permissao-btn" onClick={handlePermissao}>
                    🔔 Ativar notificações do navegador
                  </button>
                )}
                {permissao === 'denied' && (
                  <p className="notif-permissao-negada">
                    Notificações bloqueadas pelo navegador. Habilite nas configurações do site.
                  </p>
                )}

                <div className="notif-list">
                  {notifs.length === 0 && (
                    <p className="notif-vazia">Nenhuma notificação no momento.</p>
                  )}
                  {notifs.map(n => {
                    const lida = lidas.includes(n.id);
                    const c = cores[n.tipo] || cores.info;
                    return (
                      <button
                        key={n.id}
                        className={`notif-item ${lida ? 'lida' : ''}`}
                        style={!lida ? { background: c.bg, borderColor: c.border } : {}}
                        onClick={() => handleLer(n)}
                      >
                        <span className="notif-item-icone">{n.icone}</span>
                        <div className="notif-item-body">
                          <div className="notif-item-titulo">
                            {!lida && <span className="notif-dot" style={{ background: c.dot }} />}
                            {n.titulo}
                          </div>
                          <p className="notif-item-corpo">{n.corpo}</p>
                        </div>
                        {n.rota && <span className="notif-seta">→</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            className="icon-btn dark-toggle"
            onClick={onToggleDark}
            title={darkMode ? 'Modo claro' : 'Modo escuro'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}
