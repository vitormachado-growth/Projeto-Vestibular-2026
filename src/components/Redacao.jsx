import { useState, useMemo, useEffect, useRef } from 'react';
import { corrigirRedacao } from '../utils/corretorRedacao';
import './Redacao.css';

export const STORAGE_REDACOES  = 'redacoes_historico_v1';
const STORAGE_RASCUNHO = 'redacao_rascunho_v1';

function loadHistorico() {
  try { return JSON.parse(localStorage.getItem(STORAGE_REDACOES) || '[]'); } catch { return []; }
}

function saveRedacao(entry) {
  const hist = loadHistorico();
  hist.push(entry);
  localStorage.setItem(STORAGE_REDACOES, JSON.stringify(hist));
}

function loadRascunho(temaId) {
  try {
    const raw = localStorage.getItem(STORAGE_RASCUNHO);
    if (!raw) return null;
    const r = JSON.parse(raw);
    return r.temaId === temaId ? r : null;
  } catch { return null; }
}

function saveRascunho(temaId, texto) {
  localStorage.setItem(STORAGE_RASCUNHO, JSON.stringify({
    temaId,
    texto,
    savedAt: new Date().toISOString(),
  }));
}

function clearRascunho() {
  localStorage.removeItem(STORAGE_RASCUNHO);
}

function notaClasse(nota) {
  if (nota >= 800) return 'ok';
  if (nota >= 600) return 'medio';
  return 'baixo';
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

const TEMAS = [
  // ── ENEM — PROVAS OFICIAIS ────────────────────────────────────────────────
  { id: 1, ano: 2025, banca: 'enem', categoria: 'oficial',
    titulo: 'Perspectivas acerca do envelhecimento na sociedade brasileira',
    descricao: 'Discuta os desafios demográficos, sociais e econômicos do envelhecimento populacional no Brasil, propondo caminhos para garantir dignidade, saúde e inclusão aos idosos.' },
  { id: 2, ano: 2024, banca: 'enem', categoria: 'oficial',
    titulo: 'Desafios para a valorização da herança africana no Brasil',
    descricao: 'Analise como a matriz africana estrutura a cultura, a religiosidade e a identidade brasileiras, e proponha caminhos para seu reconhecimento efetivo diante do racismo estrutural.' },
  { id: 3, ano: 2023, banca: 'enem', categoria: 'oficial',
    titulo: 'Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil',
    descricao: 'Discuta as causas históricas, sociais e culturais que invisibilizam o trabalho de cuidado executado predominantemente por mulheres, propondo uma intervenção concreta.' },
  { id: 4, ano: 2022, banca: 'enem', categoria: 'oficial',
    titulo: 'Desafios para a valorização de comunidades e povos tradicionais no Brasil',
    descricao: 'Aborde o papel dos povos originários, quilombolas e ribeirinhos na preservação cultural e ambiental, e os obstáculos à sua efetiva valorização.' },
  { id: 5, ano: 2021, banca: 'enem', categoria: 'oficial',
    titulo: 'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil',
    descricao: 'Reflita sobre a importância do registro civil como porta de entrada para direitos fundamentais e proponha soluções para a subnotificação. (ENEM impresso e digital)' },
  { id: 6, ano: 2020, banca: 'enem', categoria: 'oficial',
    titulo: 'O estigma associado às doenças mentais na sociedade brasileira',
    descricao: 'Analise como o preconceito relacionado à saúde mental impacta o acesso a tratamento e a inclusão social dos portadores. (ENEM impresso)' },
  { id: 29, ano: 2020, banca: 'enem', categoria: 'oficial',
    titulo: 'O desafio de reduzir as desigualdades entre as regiões do Brasil',
    descricao: 'Discuta as disparidades regionais (Norte/Nordeste vs Sul/Sudeste) em renda, educação, saúde e infraestrutura, e proponha políticas de integração nacional. (ENEM digital)' },
  { id: 30, ano: 2019, banca: 'enem', categoria: 'oficial',
    titulo: 'Democratização do acesso ao cinema no Brasil',
    descricao: 'Aborde as barreiras econômicas, geográficas e culturais que limitam o acesso da população brasileira ao cinema, e proponha soluções para ampliar o acesso à sétima arte.' },

  // ── UERJ — PROVAS OFICIAIS ────────────────────────────────────────────────
  { id: 7, ano: 2025, banca: 'uerj', categoria: 'oficial',
    titulo: 'O governo de uma nação pode exercer controle sobre o corpo feminino com base em princípios religiosos?',
    descricao: 'Discuta, em forma de texto dissertativo-argumentativo, os limites entre laicidade do Estado, autonomia corporal feminina e influência religiosa sobre políticas públicas.' },
  { id: 8, ano: 2024, banca: 'uerj', categoria: 'oficial',
    titulo: 'Qual seria, para você, a moral da história narrada em "O menino do pijama listrado"?',
    descricao: 'Reflita sobre os ensinamentos éticos e humanos da obra de John Boyne diante do Holocausto, discutindo empatia, inocência e as consequências da desumanização do outro.' },
  { id: 9, ano: 2023, banca: 'uerj', categoria: 'oficial',
    titulo: 'A capacidade de se opor a um destino socialmente estabelecido fortalece nossa humanidade?',
    descricao: 'Disserte sobre o livre-arbítrio frente a determinismos sociais — classe, gênero, raça, origem — e o valor da resistência individual e coletiva como afirmação da dignidade humana.' },
  { id: 10, ano: 2022, banca: 'uerj', categoria: 'oficial',
    titulo: 'O princípio "certeza não é verdade" deve orientar as pessoas na condução de suas vidas públicas e privadas?',
    descricao: 'Reflita sobre a diferença entre convicção subjetiva e verdade factual, e o papel da humildade epistêmica na vida pessoal e nas relações democráticas.' },
  { id: 31, ano: 2021, banca: 'uerj', categoria: 'oficial',
    titulo: 'A mentira programada é uma arma política válida para conquistar o poder e sustentá-lo?',
    descricao: 'Analise o uso sistemático da desinformação como estratégia política, suas consequências éticas para a democracia e os limites entre retórica e manipulação.' },
  { id: 32, ano: 2020, banca: 'uerj', categoria: 'oficial',
    titulo: 'O que leva pessoas, em condições semelhantes às de Fabiano, a se considerarem inferiores às demais?',
    descricao: 'Referência a "Vidas Secas" de Graciliano Ramos. Discuta os mecanismos sociais, econômicos e psicológicos que produzem a internalização da inferioridade em sujeitos marginalizados.' },
  { id: 33, ano: 2019, banca: 'uerj', categoria: 'oficial',
    titulo: 'É justificável cometer um crime para vingar outro crime?',
    descricao: 'Disserte sobre os limites entre justiça e vingança, o papel do Estado de Direito e os dilemas éticos da autotutela frente à impunidade ou ao sofrimento individual.' },

  // ── TEMAS GERAIS — PROPOSTAS CONTEMPORÂNEAS ───────────────────────────────
  { id: 11, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'Inteligência artificial e o futuro do trabalho no Brasil',
    descricao: 'Discuta os impactos da IA generativa sobre profissões, educação e desigualdades, propondo políticas de transição e requalificação.' },
  { id: 12, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'Os desafios da saúde mental da juventude na era das redes sociais',
    descricao: 'Analise a relação entre uso intensivo de redes, algoritmos de engajamento e o aumento de transtornos ansiosos e depressivos entre adolescentes brasileiros.' },
  { id: 13, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'A crise climática e o direito das gerações futuras no Brasil',
    descricao: 'Reflita sobre a responsabilidade intergeracional diante das mudanças climáticas e proponha ações concretas frente ao desmatamento, seca e eventos extremos.' },
  { id: 14, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'Desafios para o combate à desinformação e à polarização política',
    descricao: 'Discuta como a circulação de conteúdos falsos fragiliza o debate público e apresente caminhos para uma cidadania digital crítica.' },
  { id: 15, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'O trabalho por aplicativo e a precarização das relações laborais',
    descricao: 'Aborde as condições de motoristas e entregadores de plataformas digitais, a ausência de direitos trabalhistas e os limites da regulamentação brasileira.' },
  { id: 16, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'Envelhecimento populacional e o futuro da previdência no Brasil',
    descricao: 'Analise a transição demográfica brasileira e discuta como garantir dignidade à população idosa diante da mudança na pirâmide etária.' },
  { id: 17, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'Caminhos para a inclusão de pessoas neurodivergentes na sociedade brasileira',
    descricao: 'Discuta o acesso à educação, ao trabalho e à saúde para autistas, pessoas com TDAH e outras neurodivergências, superando o capacitismo estrutural.' },
  { id: 18, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'A crise hídrica e o acesso à água potável nas grandes cidades brasileiras',
    descricao: 'Avalie a vulnerabilidade dos sistemas de abastecimento diante da crise climática e proponha estratégias de conservação e gestão.' },
  { id: 19, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'Os desafios da migração climática e o acolhimento de refugiados no Brasil',
    descricao: 'Analise o deslocamento de populações por desastres ambientais e guerras, e o papel do Brasil diante de venezuelanos, haitianos e outros refugiados.' },
  { id: 20, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'A privacidade digital e a vigilância algorítmica na sociedade contemporânea',
    descricao: 'Reflita sobre a coleta massiva de dados pessoais, os limites da LGPD e os impactos da vigilância corporativa e estatal sobre a liberdade individual.' },
  { id: 21, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'Cultura pop brasileira e construção de identidade nacional',
    descricao: 'Discuta como o funk, o rap, o sertanejo e o cinema periférico redefinem a representação do Brasil contemporâneo dentro e fora do país.' },
  { id: 22, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'A insegurança alimentar e o retorno da fome ao Brasil',
    descricao: 'Analise os fatores que levaram ao aumento da insegurança alimentar e proponha soluções estruturais para garantir o direito humano à alimentação.' },
  { id: 23, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'Fast fashion e sustentabilidade: o custo invisível do consumo',
    descricao: 'Reflita sobre o impacto ambiental e trabalhista da moda descartável e discuta alternativas conscientes de consumo.' },
  { id: 24, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'A violência contra a mulher e o feminicídio no Brasil',
    descricao: 'Examine as raízes estruturais da violência de gênero e apresente políticas públicas e culturais eficazes para seu enfrentamento.' },
  { id: 25, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'A transição energética e o papel do Brasil no mercado global',
    descricao: 'Discuta o potencial brasileiro em energias renováveis (eólica, solar, hidrogênio verde) frente à dependência do petróleo e da mineração.' },
  { id: 26, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'Educação pública e a evasão escolar pós-pandemia',
    descricao: 'Analise os efeitos da pandemia sobre a aprendizagem e a permanência escolar, e proponha caminhos para recomposição educacional.' },
  { id: 27, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'Cyberbullying e a proteção das crianças no ambiente digital',
    descricao: 'Discuta a responsabilidade de plataformas, famílias e escolas na proteção da infância diante da violência online.' },
  { id: 28, ano: 2026, banca: 'geral', categoria: 'geral',
    titulo: 'A crise da Amazônia: soberania, sustentabilidade e povos originários',
    descricao: 'Aborde os conflitos entre desenvolvimento econômico, preservação ambiental e direitos indígenas na maior floresta tropical do mundo.' },
];

const FILTROS = [
  { value: 'enem-oficial', label: 'ENEM Oficial', match: t => t.banca === 'enem' && t.categoria === 'oficial' },
  { value: 'uerj-oficial', label: 'UERJ Oficial', match: t => t.banca === 'uerj' && t.categoria === 'oficial' },
  { value: 'geral', label: 'Temas Gerais', match: t => t.categoria === 'geral' },
];

const MIN_PALAVRAS = 150;
const MAX_PALAVRAS = 500;

export default function Redacao() {
  const [temaId, setTemaId] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [texto, setTexto] = useState('');
  const [enviada, setEnviada] = useState(false);
  const [correcao, setCorrecao] = useState(null);
  const [historico, setHistorico] = useState(loadHistorico);
  const [verHistorico, setVerHistorico] = useState(false);
  const [rascunhoSalvoEm, setRascunhoSalvoEm] = useState(null);
  const debounceRef = useRef(null);

  const temasPorSecao = useMemo(() => {
    const grupos = FILTROS.map(f => ({
      ...f,
      temas: TEMAS.filter(f.match),
    }));
    if (!filtroCategoria) return grupos;
    return grupos.filter(g => g.value === filtroCategoria);
  }, [filtroCategoria]);

  const totalFiltrado = temasPorSecao.reduce((acc, g) => acc + g.temas.length, 0);

  const tema = TEMAS.find(t => t.id === temaId);

  const palavras = useMemo(
    () => texto.trim().split(/\s+/).filter(Boolean).length,
    [texto]
  );
  const caracteres = texto.length;
  const linhas = texto.split('\n').filter(l => l.trim()).length;

  const dentroLimite = palavras >= MIN_PALAVRAS && palavras <= MAX_PALAVRAS;

  // Auto-save com debounce de 1.5s
  useEffect(() => {
    if (!temaId || enviada || !texto) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      saveRascunho(temaId, texto);
      setRascunhoSalvoEm(new Date());
    }, 1500);
    return () => clearTimeout(debounceRef.current);
  }, [texto, temaId, enviada]);

  function escolherTema(id) {
    const rascunho = loadRascunho(id);
    setTemaId(id);
    setTexto(rascunho?.texto || '');
    setRascunhoSalvoEm(rascunho ? new Date(rascunho.savedAt) : null);
    setEnviada(false);
    setCorrecao(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function voltarTemas() {
    setTemaId(null);
    setTexto('');
    setEnviada(false);
    setCorrecao(null);
    setRascunhoSalvoEm(null);
  }

  function enviar() {
    if (!dentroLimite) return;
    const resultado = corrigirRedacao(texto, tema);
    setCorrecao(resultado);
    setEnviada(true);
    const entry = {
      id: Date.now(),
      temaId: tema.id,
      titulo: tema.titulo,
      banca: tema.banca,
      ano: tema.ano,
      data: new Date().toISOString(),
      notaTotal: resultado.notaTotal,
      competencias: resultado.competencias.map(c => ({ numero: c.numero, nota: c.nota, titulo: c.titulo })),
      palavras: resultado.metricas.palavras,
    };
    saveRedacao(entry);
    clearRascunho();
    setHistorico(loadHistorico());
    setRascunhoSalvoEm(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Stats derivados do histórico
  const stats = useMemo(() => {
    if (historico.length === 0) return null;
    const media = Math.round(historico.reduce((s, e) => s + e.notaTotal, 0) / historico.length);
    const melhor = Math.max(...historico.map(e => e.notaTotal));
    const porComp = [1,2,3,4,5].map(n => {
      const vals = historico.flatMap(e => e.competencias.filter(c => c.numero === n).map(c => c.nota));
      return { numero: n, media: vals.length ? Math.round(vals.reduce((a,b)=>a+b,0)/vals.length) : 0 };
    });
    return { total: historico.length, media, melhor, porComp };
  }, [historico]);

  // Mapa temaId → melhor nota já feita
  const notasPorTema = useMemo(() => {
    const map = {};
    historico.forEach(e => {
      if (!map[e.temaId] || e.notaTotal > map[e.temaId]) map[e.temaId] = e.notaTotal;
    });
    return map;
  }, [historico]);

  if (tema) {
    return (
      <div className="redacao-wrap">
        <div className="redacao-editor">

          <div className="redacao-topbar">
            <button className="btn-back" onClick={voltarTemas}>← Trocar tema</button>
            <span className={`tag tag-type tag-${tema.banca}`}>
              {tema.banca.toUpperCase()} {tema.ano}
            </span>
          </div>

          <div className="tema-box">
            <h2>{tema.titulo}</h2>
            <p>{tema.descricao}</p>
          </div>

          {!enviada ? (
            <>
              {rascunhoSalvoEm && texto.length > 0 && (
                <div className="rascunho-banner">
                  <span>📄 Rascunho restaurado — salvo em {rascunhoSalvoEm.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                  <button onClick={() => { setTexto(''); clearRascunho(); setRascunhoSalvoEm(null); }}>
                    Descartar
                  </button>
                </div>
              )}
              <textarea
                className="redacao-textarea"
                placeholder="Comece sua redação aqui. Lembre-se: introdução, desenvolvimento (2 parágrafos), conclusão com proposta de intervenção..."
                value={texto}
                onChange={e => setTexto(e.target.value)}
                rows={18}
              />

              <div className="redacao-stats">
                <div className="stat">
                  <span className="stat-label">Palavras</span>
                  <span className={`stat-value ${palavras > MAX_PALAVRAS ? 'stat-over' : ''}`}>
                    {palavras} / {MAX_PALAVRAS}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Linhas</span>
                  <span className="stat-value">{linhas}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Caracteres</span>
                  <span className="stat-value">{caracteres}</span>
                </div>
                <div className="rascunho-status">
                  {rascunhoSalvoEm ? (
                    <span className="rascunho-salvo">
                      ✓ Rascunho salvo às {rascunhoSalvoEm.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  ) : texto.length > 0 ? (
                    <span className="rascunho-salvando">Salvando…</span>
                  ) : null}
                </div>
              </div>

              <div className="redacao-actions">
                <p className="redacao-hint">
                  {palavras < MIN_PALAVRAS
                    ? `Escreva pelo menos ${MIN_PALAVRAS - palavras} palavras a mais para enviar.`
                    : palavras > MAX_PALAVRAS
                    ? 'Você ultrapassou o limite máximo de 500 palavras.'
                    : '✓ Redação dentro do limite ideal.'}
                </p>
                <button
                  className="btn-enviar"
                  onClick={enviar}
                  disabled={!dentroLimite}
                >
                  Enviar redação
                </button>
              </div>
            </>
          ) : correcao && (
            <div className="redacao-enviada">
              <div className="nota-final">
                <span className="nota-label">Nota da IA</span>
                <span className={`nota-valor nota-${notaClasse(correcao.notaTotal)}`}>
                  {correcao.notaTotal}
                </span>
                <span className="nota-max">/ 1000</span>
              </div>

              <div className="competencias-grid">
                {correcao.competencias.map(c => (
                  <div key={c.numero} className={`comp-card comp-${notaClasse(c.nota * 5)}`}>
                    <div className="comp-header">
                      <span className="comp-numero">Competência {c.numero}</span>
                      <span className="comp-nota">{c.nota}/200</span>
                    </div>
                    <p className="comp-titulo">{c.titulo}</p>
                    <ul className="comp-observacoes">
                      {c.observacoes.map((o, i) => (
                        <li key={i}>{o}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="metricas-box">
                <h4>Análise do texto</h4>
                <div className="metricas-grid">
                  <div><strong>{correcao.metricas.palavras}</strong> palavras</div>
                  <div><strong>{correcao.metricas.paragrafos}</strong> parágrafos</div>
                  <div><strong>{correcao.metricas.frases}</strong> frases</div>
                  <div><strong>{correcao.metricas.conectivos}</strong> conectivos</div>
                  <div><strong>{correcao.metricas.aderenciaTema}%</strong> aderência ao tema</div>
                  <div><strong>{correcao.metricas.informalidades}</strong> informalidades</div>
                </div>
                {correcao.metricas.repetidas.length > 0 && (
                  <p className="metricas-repetidas">
                    <strong>Palavras repetidas:</strong> {correcao.metricas.repetidas.join(', ')}
                  </p>
                )}
              </div>

              <details className="redacao-details">
                <summary>Ver texto enviado</summary>
                <div className="redacao-preview">
                  {texto.split('\n').map((linha, i) =>
                    linha.trim() ? <p key={i}>{linha}</p> : <br key={i} />
                  )}
                </div>
              </details>

              <div className="redacao-actions-final">
                <button className="btn-enviar btn-secundario" onClick={() => { setEnviada(false); setCorrecao(null); }}>
                  Editar redação
                </button>
                <button className="btn-enviar" onClick={voltarTemas}>
                  Nova redação
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="redacao-wrap">
      <div className="redacao-header">
        <div>
          <h1>Redação</h1>
          <p className="redacao-subtitle">
            {totalFiltrado} tema{totalFiltrado !== 1 && 's'} disponíve{totalFiltrado === 1 ? 'l' : 'is'}
            {stats ? ` · ${stats.total} redação${stats.total > 1 ? 'ões' : ''} feita${stats.total > 1 ? 's' : ''}` : ''}
          </p>
        </div>
        {historico.length > 0 && (
          <button className="btn-ver-historico" onClick={() => setVerHistorico(v => !v)}>
            {verHistorico ? 'Ver temas' : `📋 Histórico (${historico.length})`}
          </button>
        )}
      </div>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      {stats && !verHistorico && (
        <div className="red-stats-bar">
          <div className="red-stat">
            <span className="red-stat-val blue">{stats.total}</span>
            <span className="red-stat-label">feitas</span>
          </div>
          <div className="red-stat">
            <span className={`red-stat-val ${notaClasse(stats.media)}`}>{stats.media}</span>
            <span className="red-stat-label">média</span>
          </div>
          <div className="red-stat">
            <span className={`red-stat-val ${notaClasse(stats.melhor)}`}>{stats.melhor}</span>
            <span className="red-stat-label">melhor</span>
          </div>
          <div className="red-comp-bars">
            {stats.porComp.map(c => (
              <div key={c.numero} className="red-comp-mini">
                <span className="red-comp-mini-label">C{c.numero}</span>
                <div className="red-comp-mini-bar-wrap">
                  <div
                    className="red-comp-mini-bar-fill"
                    style={{
                      width: `${(c.media / 200) * 100}%`,
                      background: c.media >= 160 ? '#16a34a' : c.media >= 120 ? '#f59e0b' : '#ef4444',
                    }}
                  />
                </div>
                <span className="red-comp-mini-val">{c.media}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Histórico ────────────────────────────────────────────────────── */}
      {verHistorico && (
        <div className="red-historico">
          <h2 className="red-hist-titulo">Histórico de redações</h2>
          {[...historico].reverse().map((entry, i) => (
            <div key={entry.id} className="red-hist-row">
              <span className="red-hist-num">#{historico.length - i}</span>
              <span className="red-hist-data">{formatDate(entry.data)}</span>
              <span className={`red-hist-nota nota-${notaClasse(entry.notaTotal)}`}>{entry.notaTotal}</span>
              <div className="red-hist-bar-wrap">
                <div
                  className="red-hist-bar-fill"
                  style={{
                    width: `${(entry.notaTotal / 1000) * 100}%`,
                    background: entry.notaTotal >= 800 ? '#16a34a' : entry.notaTotal >= 600 ? '#f59e0b' : '#ef4444',
                  }}
                />
              </div>
              <span className="red-hist-tema">{entry.titulo}</span>
              <span className={`red-hist-banca tag-${entry.banca}`}>{entry.banca.toUpperCase()}</span>
              <div className="red-hist-comps">
                {entry.competencias.map(c => (
                  <span
                    key={c.numero}
                    className="red-hist-comp"
                    title={`C${c.numero}: ${c.nota}/200`}
                    style={{ background: c.nota >= 160 ? '#dcfce7' : c.nota >= 120 ? '#fef3c7' : '#fef2f2',
                             color: c.nota >= 160 ? '#15803d' : c.nota >= 120 ? '#92400e' : '#991b1b' }}
                  >
                    C{c.numero}: {c.nota}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Filtros + temas ──────────────────────────────────────────────── */}
      {!verHistorico && (
        <>
          <div className="filters-bar">
            <div className="filter-group">
              <label className="filter-label">Categoria</label>
              <div className="chips">
                <button
                  className={`chip ${filtroCategoria === '' ? 'chip-active' : ''}`}
                  onClick={() => setFiltroCategoria('')}
                >
                  Todos
                </button>
                {FILTROS.map(f => (
                  <button
                    key={f.value}
                    className={`chip chip-${f.value} ${filtroCategoria === f.value ? 'chip-active' : ''}`}
                    onClick={() => setFiltroCategoria(prev => prev === f.value ? '' : f.value)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {temasPorSecao.map(secao => (
            secao.temas.length === 0 ? null : (
              <section key={secao.value} className="tema-secao">
                <h2 className={`tema-secao-titulo secao-${secao.value}`}>
                  {secao.label}
                  <span className="tema-secao-count">{secao.temas.length}</span>
                </h2>
                <div className="temas-grid">
                  {secao.temas.map(t => {
                    const nota = notasPorTema[t.id];
                    return (
                      <div key={t.id} className={`tema-card ${nota ? 'feito' : ''}`} onClick={() => escolherTema(t.id)}>
                        <div className="tema-card-tags">
                          <span className={`tag tag-type tag-${t.banca}`}>
                            {t.banca === 'geral' ? 'PROPOSTA' : t.banca.toUpperCase()}
                          </span>
                          <span className="tag tag-year">{t.ano}</span>
                          {nota && (
                            <span className={`tag tag-feito nota-${notaClasse(nota)}`}>
                              ✓ {nota} pts
                            </span>
                          )}
                        </div>
                        <h3 className="tema-card-titulo">{t.titulo}</h3>
                        <p className="tema-card-desc">{t.descricao}</p>
                        <span className="btn-resolver">{nota ? 'Refazer →' : 'Escrever →'}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )
          ))}
        </>
      )}
    </div>
  );
}
