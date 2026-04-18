const CONECTIVOS = [
  'portanto', 'contudo', 'entretanto', 'todavia', 'assim', 'dessa forma',
  'desse modo', 'por conseguinte', 'logo', 'ademais', 'além disso',
  'em primeiro lugar', 'em segundo lugar', 'por outro lado', 'no entanto',
  'porquanto', 'à vista disso', 'nesse sentido', 'com efeito', 'de fato',
  'em síntese', 'em suma', 'por fim', 'outrossim', 'por exemplo',
  'uma vez que', 'visto que', 'já que', 'haja vista', 'conforme',
  'segundo', 'de acordo com', 'consoante', 'apesar disso', 'embora',
  'conquanto', 'à medida que', 'ainda que', 'posto que', 'a fim de',
];

const MARCAS_INFORMAIS = [
  /\bné\b/i, /\bpra\b/i, /\btipo\b/i, /\bmeio que\b/i, /\bcoisa\b/i,
  /\bnegócio\b/i, /\bgente\b/i, /\ba gente\b/i, /\bokay\b/i, /\bok\b/i,
  /\bbeleza\b/i, /\bmassa\b/i, /\bdemais\b/i, /\bmuito doido\b/i,
  /!{2,}/, /\?{2,}/, /\.{4,}/, / kkk/i, / rs\b/i,
];

const AGENTES_INTERVENCAO = [
  'governo', 'estado', 'ministério', 'congresso', 'poder público',
  'poder legislativo', 'poder executivo', 'poder judiciário',
  'sociedade civil', 'ong', 'organizações não governamentais',
  'escolas', 'universidades', 'mídia', 'família',
];

const MEIOS_INTERVENCAO = [
  'por meio de', 'através de', 'mediante', 'por intermédio de',
  'com o auxílio de', 'utilizando', 'via',
];

const FINALIDADES = [
  'a fim de', 'para que', 'com o intuito de', 'com o objetivo de',
  'visando', 'com a finalidade de', 'para',
];

function normalizar(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function contarParagrafos(texto) {
  return texto.split(/\n\s*\n/).filter(p => p.trim().length > 20).length;
}

function contarFrases(texto) {
  return texto.split(/[.!?]+/).filter(f => f.trim().length > 0).length;
}

function palavrasRepetidas(texto) {
  const palavras = normalizar(texto)
    .replace(/[^\wá-úà-ùâ-ûã-õç\s]/g, ' ')
    .split(/\s+/)
    .filter(p => p.length > 5);
  const contagem = {};
  palavras.forEach(p => { contagem[p] = (contagem[p] || 0) + 1; });
  return Object.entries(contagem)
    .filter(([, n]) => n >= 4)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
}

function detectarInformalidades(texto) {
  return MARCAS_INFORMAIS.filter(re => re.test(texto)).length;
}

function contarConectivos(texto) {
  const t = normalizar(texto);
  return CONECTIVOS.reduce((acc, c) => {
    const regex = new RegExp(`\\b${normalizar(c)}\\b`, 'g');
    const matches = t.match(regex);
    return acc + (matches ? matches.length : 0);
  }, 0);
}

function palavrasChaveTema(temaTitulo) {
  const stopwords = new Set([
    'de','da','do','das','dos','e','a','o','as','os','em','no','na',
    'nos','nas','para','por','com','um','uma','uns','umas','que',
    'como','mais','menos','ou','se','sobre','entre',
  ]);
  return temaTitulo
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\wá-úà-ùâ-ûã-õç\s]/g, ' ')
    .split(/\s+/)
    .filter(p => p.length > 3 && !stopwords.has(p));
}

function aderenciaTema(texto, tema) {
  const chaves = palavrasChaveTema(tema.titulo);
  const t = normalizar(texto);
  const encontradas = chaves.filter(k => t.includes(k));
  return chaves.length ? encontradas.length / chaves.length : 0;
}

function temProposta(texto) {
  const paragrafos = texto.split(/\n\s*\n/).filter(p => p.trim().length > 20);
  if (paragrafos.length === 0) return { score: 0, detalhes: [] };

  const ultimoParagrafo = normalizar(paragrafos[paragrafos.length - 1]);
  const detalhes = {
    agente: AGENTES_INTERVENCAO.some(a => ultimoParagrafo.includes(normalizar(a))),
    meio: MEIOS_INTERVENCAO.some(m => ultimoParagrafo.includes(normalizar(m))),
    finalidade: FINALIDADES.some(f => ultimoParagrafo.includes(normalizar(f))),
    acao: /\b(criar|implementar|promover|desenvolver|estabelecer|garantir|incentivar|fomentar|ampliar|reforçar|investir|capacitar)\w*/i.test(paragrafos[paragrafos.length - 1]),
    detalhamento: paragrafos[paragrafos.length - 1].length > 200,
  };
  const acertos = Object.values(detalhes).filter(Boolean).length;
  return { score: acertos, detalhes };
}

export function corrigirRedacao(texto, tema) {
  const palavras = texto.trim().split(/\s+/).filter(Boolean);
  const totalPalavras = palavras.length;
  const paragrafos = contarParagrafos(texto);
  const frases = contarFrases(texto);
  const conectivos = contarConectivos(texto);
  const repetidas = palavrasRepetidas(texto);
  const informalidades = detectarInformalidades(texto);
  const aderencia = aderenciaTema(texto, tema);
  const proposta = temProposta(texto);

  // ── COMPETÊNCIA I — Norma culta ────────────────────────────────────────
  let c1 = 200;
  const obsC1 = [];
  if (informalidades >= 3) { c1 -= 80; obsC1.push(`${informalidades} marcas de informalidade detectadas (evite "pra", "né", "tipo", pontuação excessiva).`); }
  else if (informalidades >= 1) { c1 -= 40; obsC1.push(`${informalidades} marca(s) de informalidade detectada(s).`); }
  if (repetidas.length >= 3) { c1 -= 40; obsC1.push(`Palavras muito repetidas: ${repetidas.slice(0,3).map(([p])=>p).join(', ')}.`); }
  const mediaPalavrasPorFrase = frases > 0 ? totalPalavras / frases : 0;
  if (mediaPalavrasPorFrase > 35) { c1 -= 40; obsC1.push('Frases excessivamente longas — pode prejudicar a clareza.'); }
  else if (mediaPalavrasPorFrase < 8 && frases > 5) { c1 -= 20; obsC1.push('Frases muito curtas e fragmentadas.'); }
  if (obsC1.length === 0) obsC1.push('Bom domínio da norma culta, sem desvios significativos detectados.');

  // ── COMPETÊNCIA II — Compreender a proposta ────────────────────────────
  let c2 = Math.round(aderencia * 200);
  const obsC2 = [];
  if (aderencia >= 0.6) obsC2.push(`Excelente aderência ao tema — ${Math.round(aderencia*100)}% das palavras-chave do tema aparecem no texto.`);
  else if (aderencia >= 0.35) obsC2.push(`Aderência razoável — ${Math.round(aderencia*100)}% das palavras-chave do tema. Explore mais o recorte proposto.`);
  else obsC2.push(`Aderência baixa — apenas ${Math.round(aderencia*100)}% das palavras-chave. Releia o tema e aproxime-se dele.`);
  if (paragrafos < 4) { c2 -= 30; obsC2.push(`Estrutura incompleta: ${paragrafos} parágrafo(s). O ideal são 4: introdução, 2 de desenvolvimento, conclusão.`); }
  else obsC2.push(`Estrutura adequada com ${paragrafos} parágrafos.`);
  c2 = Math.max(0, Math.min(200, c2));

  // ── COMPETÊNCIA III — Argumentação ─────────────────────────────────────
  let c3 = 200;
  const obsC3 = [];
  if (paragrafos < 3) { c3 -= 100; obsC3.push('Poucos parágrafos de desenvolvimento — a argumentação ficou limitada.'); }
  else if (paragrafos === 3) { c3 -= 40; obsC3.push('Desenvolvimento um pouco enxuto — o ideal é 2 parágrafos de argumentação robusta.'); }
  if (totalPalavras < 200) { c3 -= 60; obsC3.push('Texto curto dificulta o aprofundamento dos argumentos.'); }
  else if (totalPalavras >= 280) obsC3.push('Extensão adequada para desenvolver bons argumentos.');
  const temCitacao = /(segundo|conforme|de acordo com|como afirm|o filósofo|o sociólogo|a constituição|a lei|o artigo|\b\d{4}\b)/i.test(texto);
  if (!temCitacao) { c3 -= 40; obsC3.push('Não foram detectadas referências a dados, autores ou contexto histórico. Repertório sociocultural fortalece a argumentação.'); }
  else obsC3.push('Bom uso de repertório sociocultural (dados, autores ou contexto).');
  c3 = Math.max(0, c3);

  // ── COMPETÊNCIA IV — Coesão ────────────────────────────────────────────
  let c4 = 200;
  const obsC4 = [];
  const conectivosPorParagrafo = paragrafos > 0 ? conectivos / paragrafos : 0;
  if (conectivos < 3) { c4 -= 100; obsC4.push(`Apenas ${conectivos} conectivo(s) detectado(s). Use "portanto", "ademais", "contudo", "dessa forma" para costurar as ideias.`); }
  else if (conectivos < 6) { c4 -= 50; obsC4.push(`${conectivos} conectivos — razoável, mas pode melhorar a fluidez.`); }
  else obsC4.push(`Bom uso de conectivos (${conectivos} detectados), com média de ${conectivosPorParagrafo.toFixed(1)} por parágrafo.`);
  c4 = Math.max(0, c4);

  // ── COMPETÊNCIA V — Proposta de intervenção ────────────────────────────
  let c5 = proposta.score * 40;
  const obsC5 = [];
  const elementos = [];
  if (!proposta.detalhes.agente) elementos.push('agente');
  if (!proposta.detalhes.acao) elementos.push('ação concreta');
  if (!proposta.detalhes.meio) elementos.push('meio/modo');
  if (!proposta.detalhes.finalidade) elementos.push('finalidade');
  if (!proposta.detalhes.detalhamento) elementos.push('detalhamento');
  if (elementos.length === 0) obsC5.push('Proposta completa com os 5 elementos (agente, ação, meio, finalidade, detalhamento).');
  else obsC5.push(`Faltam na proposta: ${elementos.join(', ')}.`);
  if (proposta.score <= 2) obsC5.push('Dica: termine com "Portanto, cabe ao [AGENTE] [AÇÃO], por meio de [MEIO], a fim de [FINALIDADE]".');

  const notaTotal = c1 + c2 + c3 + c4 + c5;

  return {
    notaTotal,
    competencias: [
      { numero: 'I', titulo: 'Domínio da norma culta', nota: c1, observacoes: obsC1 },
      { numero: 'II', titulo: 'Compreender a proposta e estrutura', nota: c2, observacoes: obsC2 },
      { numero: 'III', titulo: 'Selecionar e argumentar', nota: c3, observacoes: obsC3 },
      { numero: 'IV', titulo: 'Mecanismos de coesão', nota: c4, observacoes: obsC4 },
      { numero: 'V', titulo: 'Proposta de intervenção', nota: c5, observacoes: obsC5 },
    ],
    metricas: {
      palavras: totalPalavras,
      paragrafos,
      frases,
      conectivos,
      informalidades,
      repetidas: repetidas.map(([p, n]) => `${p} (${n}x)`),
      aderenciaTema: Math.round(aderencia * 100),
    },
  };
}
