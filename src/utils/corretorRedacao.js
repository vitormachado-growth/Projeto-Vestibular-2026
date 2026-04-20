// ── Conectivos categorizados ──────────────────────────────────────────────────
const CONECTIVOS_CAT = {
  adicao:       ['além disso', 'ademais', 'outrossim', 'também', 'igualmente', 'do mesmo modo', 'bem como', 'a par disso', 'ainda'],
  contraste:    ['contudo', 'todavia', 'entretanto', 'no entanto', 'porém', 'conquanto', 'ainda que', 'embora', 'apesar disso', 'por outro lado', 'não obstante'],
  causa:        ['pois', 'porque', 'já que', 'visto que', 'uma vez que', 'haja vista', 'dado que', 'porquanto'],
  consequencia: ['portanto', 'logo', 'por conseguinte', 'assim', 'dessa forma', 'desse modo', 'à vista disso', 'com efeito', 'por isso', 'diante disso'],
  conclusao:    ['em suma', 'em síntese', 'por fim', 'enfim', 'em conclusão', 'nesse sentido', 'ante o exposto'],
  exemplificacao: ['por exemplo', 'a saber', 'ou seja', 'isto é', 'tal como', 'como demonstra', 'como ilustra'],
  sequencia:    ['em primeiro lugar', 'em segundo lugar', 'primeiramente', 'num segundo momento', 'por último', 'inicialmente'],
};

// ── Padrões de argumento ──────────────────────────────────────────────────────
const PADROES_ARGUMENTO = {
  exemplificacao: [
    /\bpor exemplo\b/i, /\bcomo é o caso\b/i, /\btal como\b/i, /\bvale mencionar\b/i,
    /\bcomo vemos em\b/i, /\bcomo ocorre\b/i, /\bexemplifica\b/i, /\billustrado por\b/i,
    /\bcomo demonstra\b/i, /\bcite-se\b/i,
  ],
  causalidade: [
    /\bpois\b/i, /\bporque\b/i, /\bjá que\b/i, /\bvisto que\b/i, /\buma vez que\b/i,
    /\bdado que\b/i, /\bdecorre\b/i, /\borigina-se\b/i, /\bprovoca\b/i, /\bacarreta\b/i,
    /\bgera\b/i, /\bcausa\b/i, /\bresulta em\b/i, /\bleva a\b/i,
  ],
  autoridade: [
    /\bsegundo\b/i, /\bconforme\b/i, /\bde acordo com\b/i, /\bcomo afirm/i,
    /\bpesquisa\b/i, /\bestudo\b/i, /\bdado[s]?\b/i, /\bestatística\b/i,
    /\bo filósofo\b/i, /\bo sociólogo\b/i, /\ba constituição\b/i, /\ba lei\b/i,
    /\bo artigo\b/i, /\ba onu\b/i, /\ba unesco\b/i, /\bo ibge\b/i, /\boms\b/i,
    /\bpesquisador/i, /\bcientista\b/i, /\bteoria\b/i, /\b\d{4}\b/,
  ],
  contraargumento: [
    /\bembora\b/i, /\bapesar de\b/i, /\bno entanto\b/i, /\btodavia\b/i,
    /\bentretanto\b/i, /\bcontudo\b/i, /\bmesmo que\b/i, /\bainda que\b/i,
    /\bpor outro lado\b/i, /\bnão obstante\b/i, /\bpesar disso\b/i,
  ],
};

const MARCAS_INFORMAIS = [
  /\bné\b/i, /\bpra\b/i, /\btipo\b/i, /\bmeio que\b/i,
  /\bnegócio\b/i, /\ba gente\b/i, /\bokay\b/i, /\bok\b/i,
  /\bbeleza\b/i, /\bmassa\b/i, /\bmuito doido\b/i, /\bcaralho\b/i,
  /!{2,}/, /\?{2,}/, /\.{4,}/, / kkk/i, / rs\b/i, /\bhahaha\b/i,
];

const AGENTES = [
  'governo federal', 'governo estadual', 'governo municipal', 'poder público',
  'poder legislativo', 'poder executivo', 'poder judiciário', 'congresso nacional',
  'ministério', 'secretaria', 'município', 'estado', 'governo', 'união',
  'sociedade civil', 'ong', 'organizações não governamentais', 'terceiro setor',
  'escola', 'universidade', 'instituição de ensino', 'família', 'mídia',
  'setor privado', 'empresa', 'indústria', 'sindicato', 'comunidade',
];

const ACOES = [
  'criar', 'implementar', 'promover', 'desenvolver', 'estabelecer', 'garantir',
  'incentivar', 'fomentar', 'ampliar', 'reforçar', 'investir', 'capacitar',
  'conscientizar', 'regulamentar', 'fiscalizar', 'assegurar', 'combater',
  'proporcionar', 'viabilizar', 'elaborar', 'implantar', 'adotar', 'fortalecer',
];

const MEIOS = [
  'por meio de', 'através de', 'mediante', 'por intermédio de',
  'com o auxílio de', 'utilizando', 'via', 'com a adoção de',
  'por intermédio de', 'a partir de', 'com base em',
];

const FINALIDADES = [
  'a fim de', 'para que', 'com o intuito de', 'com o objetivo de',
  'visando', 'com a finalidade de', 'com vistas a', 'de modo a', 'para',
];

// ── Utilitários ───────────────────────────────────────────────────────────────
function norm(txt) {
  return txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function contarParagrafos(texto) {
  return texto.split(/\n\s*\n/).filter(p => p.trim().length > 30).length;
}

function contarFrases(texto) {
  return texto.split(/[.!?]+/).filter(f => f.trim().length > 5).length;
}

function comprimentoFrases(texto) {
  const frases = texto.split(/[.!?]+/).map(f => f.trim().split(/\s+/).filter(Boolean).length).filter(n => n > 2);
  if (!frases.length) return { media: 0, desvio: 0, longas: 0, curtas: 0 };
  const media = frases.reduce((a, b) => a + b, 0) / frases.length;
  const desvio = Math.sqrt(frases.map(n => (n - media) ** 2).reduce((a, b) => a + b, 0) / frases.length);
  return { media, desvio, longas: frases.filter(n => n > 35).length, curtas: frases.filter(n => n < 7).length };
}

function diversidadeVocabular(texto) {
  const palavras = norm(texto).replace(/[^a-záàâãéêíóôõúç\s]/g, '').split(/\s+/).filter(p => p.length > 2);
  if (!palavras.length) return 0;
  const unicas = new Set(palavras).size;
  return Math.round((unicas / palavras.length) * 100);
}

function palavrasRepetidas(texto) {
  const palavras = norm(texto).replace(/[^a-záàâãéêíóôõúç\s]/g, ' ').split(/\s+/).filter(p => p.length > 5);
  const cont = {};
  palavras.forEach(p => { cont[p] = (cont[p] || 0) + 1; });
  return Object.entries(cont).filter(([, n]) => n >= 4).sort(([, a], [, b]) => b - a).slice(0, 5);
}

function detectarInformalidades(texto) {
  return MARCAS_INFORMAIS.filter(re => re.test(texto));
}

function analisarConectivos(texto) {
  const t = norm(texto);
  const resultado = {};
  let total = 0;
  for (const [cat, lista] of Object.entries(CONECTIVOS_CAT)) {
    let count = 0;
    for (const c of lista) {
      const re = new RegExp(`\\b${norm(c)}\\b`, 'g');
      const m = t.match(re);
      if (m) count += m.length;
    }
    resultado[cat] = count;
    total += count;
  }
  const categorias = Object.entries(resultado).filter(([, n]) => n > 0).map(([cat]) => cat);
  return { total, porCategoria: resultado, categorias };
}

function detectarTiposArgumento(texto) {
  const encontrados = [];
  for (const [tipo, padroes] of Object.entries(PADROES_ARGUMENTO)) {
    if (padroes.some(re => re.test(texto))) encontrados.push(tipo);
  }
  return encontrados;
}

function calcularAderencia(texto, tema) {
  const stopwords = new Set(['de','da','do','das','dos','e','a','o','as','os','em','no','na','nos','nas','para','por','com','um','uma','uns','umas','que','como','mais','menos','ou','se','sobre','entre','ao','aos','às']);
  const extrairChaves = str => norm(str).replace(/[^a-záàâãéêíóôõúç\s]/g, ' ').split(/\s+/).filter(p => p.length > 3 && !stopwords.has(p));

  const chavesTitle = extrairChaves(tema.titulo);
  const chavesDesc = extrairChaves(tema.descricao || '').slice(0, 8);
  const t = norm(texto);

  const encontradasTitle = chavesTitle.filter(k => t.includes(k)).length;
  const encontradasDesc = chavesDesc.filter(k => t.includes(k)).length;

  const scoreTitle = chavesTitle.length ? encontradasTitle / chavesTitle.length : 0;
  const scoreDesc = chavesDesc.length ? encontradasDesc / chavesDesc.length : 0;

  return Math.round((scoreTitle * 0.7 + scoreDesc * 0.3) * 100);
}

function analisarProposta(texto) {
  const paragrafos = texto.split(/\n\s*\n/).filter(p => p.trim().length > 30);
  if (!paragrafos.length) return { score: 0, elementos: {}, agenteDetectado: '', acaoDetectada: '' };

  const ultimo = norm(paragrafos[paragrafos.length - 1]);
  const original = paragrafos[paragrafos.length - 1];

  const agenteDetectado = AGENTES.find(a => ultimo.includes(norm(a))) || '';
  const acaoDetectada = ACOES.find(a => new RegExp(`\\b${a}`, 'i').test(original)) || '';

  const elementos = {
    agente: !!agenteDetectado,
    acao: !!acaoDetectada,
    meio: MEIOS.some(m => ultimo.includes(norm(m))),
    finalidade: FINALIDADES.some(f => ultimo.includes(norm(f))),
    detalhamento: original.length > 200,
  };

  return { score: Object.values(elementos).filter(Boolean).length, elementos, agenteDetectado, acaoDetectada };
}

function gerarTemplateProposta(proposta, tema) {
  const agente = proposta.agenteDetectado || 'o poder público';
  const acao = proposta.acaoDetectada || 'implementar políticas públicas';
  const temaResumido = tema.titulo.split(' ').slice(0, 4).join(' ').toLowerCase();
  return `Portanto, cabe ao ${agente} ${acao}, por meio de campanhas de conscientização e investimento em políticas educacionais, a fim de combater ${temaResumido} e assegurar a dignidade dos cidadãos brasileiros.`;
}

// ── CORRECTOR PRINCIPAL ───────────────────────────────────────────────────────
export function corrigirRedacao(texto, tema) {
  const palavras = texto.trim().split(/\s+/).filter(Boolean);
  const totalPalavras = palavras.length;
  const paragrafos = contarParagrafos(texto);
  const frases = contarFrases(texto);
  const frasesInfo = comprimentoFrases(texto);
  const conectivos = analisarConectivos(texto);
  const repetidas = palavrasRepetidas(texto);
  const informais = detectarInformalidades(texto);
  const diversidade = diversidadeVocabular(texto);
  const aderencia = calcularAderencia(texto, tema);
  const tiposArg = detectarTiposArgumento(texto);
  const proposta = analisarProposta(texto);

  const sugestoes = [];
  const pontosFortes = [];

  // ── C1: Domínio da norma culta ─────────────────────────────────────────────
  let c1 = 200;
  const obsC1 = [];

  if (informais.length >= 3) {
    c1 -= 80;
    obsC1.push(`${informais.length} marcas de informalidade (ex: "pra", "né", "tipo", pontuação excessiva). Revise cada ocorrência.`);
    sugestoes.push('Elimine marcas de oralidade: substitua "pra" por "para", "né" por "não é mesmo", evite "!!" e "...".');
  } else if (informais.length >= 1) {
    c1 -= 40;
    obsC1.push(`${informais.length} marca(s) de informalidade detectada(s) — revise o uso da norma culta.`);
  }

  if (repetidas.length >= 3) {
    c1 -= 40;
    const repStr = repetidas.slice(0, 3).map(([p, n]) => `"${p}" (${n}x)`).join(', ');
    obsC1.push(`Repetição excessiva: ${repStr}. Use sinônimos ou pronomes para variar.`);
    sugestoes.push(`Palavra muito repetida: ${repetidas[0][0]}. Substitua por sinônimos para enriquecer o vocabulário.`);
  } else if (repetidas.length > 0) {
    c1 -= 20;
    obsC1.push(`Algumas palavras repetidas: ${repetidas.map(([p]) => `"${p}"`).join(', ')}.`);
  }

  if (frasesInfo.longas > 2) {
    c1 -= 40;
    obsC1.push(`${frasesInfo.longas} frase(s) com mais de 35 palavras. Quebre-as em dois períodos para maior clareza.`);
  } else if (frasesInfo.curtas > 4) {
    c1 -= 20;
    obsC1.push('Muitas frases muito curtas. Conecte-as para dar fluidez ao texto.');
  }

  if (diversidade >= 65) {
    pontosFortes.push(`Vocabulário diversificado (${diversidade}% de palavras únicas) — demonstra bom repertório lexical.`);
  } else if (diversidade < 45) {
    c1 -= 20;
    obsC1.push(`Vocabulário repetitivo (${diversidade}% de diversidade). Amplie o uso de sinônimos e expressões variadas.`);
    sugestoes.push('Amplie seu vocabulário: antes de escrever, liste 5 sinônimos das palavras centrais do tema.');
  }

  if (c1 === 200) obsC1.push('Excelente domínio da norma culta — nenhum desvio significativo detectado.');
  else if (c1 >= 160) obsC1.push('Bom domínio da linguagem formal, com pequenos pontos a aprimorar.');
  c1 = Math.max(0, c1);

  // ── C2: Compreensão da proposta e estrutura ────────────────────────────────
  let c2 = Math.round((aderencia / 100) * 200);
  const obsC2 = [];

  if (aderencia >= 65) {
    obsC2.push(`Excelente aderência ao tema (${aderencia}%) — o texto explora bem o recorte proposto.`);
    pontosFortes.push('Alta aderência ao tema: o texto dialoga diretamente com a proposta.');
  } else if (aderencia >= 40) {
    obsC2.push(`Aderência razoável ao tema (${aderencia}%). Aprofunde o recorte — mencione mais elementos centrais da proposta.`);
    sugestoes.push(`Releia o tema e certifique-se de que usa palavras centrais como: ${tema.titulo.split(' ').slice(0, 5).join(', ')}.`);
  } else {
    obsC2.push(`Baixa aderência (${aderencia}%). O texto se distancia do tema proposto — releia a proposta e reescreva com foco no recorte indicado.`);
    sugestoes.push('CRÍTICO: Texto pouco aderente ao tema. Reescreva mantendo foco explícito no recorte da proposta.');
    c2 -= 30;
  }

  if (paragrafos < 4) {
    c2 -= 30;
    obsC2.push(`${paragrafos} parágrafo(s) — estrutura incompleta. O ideal é: introdução + 2 parágrafos de desenvolvimento + conclusão.`);
    sugestoes.push('Estruture a redação em 4 parágrafos: introdução (tese), desenvolvimento 1, desenvolvimento 2, conclusão (proposta).');
  } else if (paragrafos === 4) {
    obsC2.push('Estrutura adequada com 4 parágrafos (introdução + 2 desenvolvimentos + conclusão).');
  } else if (paragrafos >= 5) {
    obsC2.push(`${paragrafos} parágrafos — estrutura ampla. Verifique se cada parágrafo tem unidade e progressão temática.`);
  }
  c2 = Math.max(0, Math.min(200, c2));

  // ── C3: Seleção e organização de argumentos ────────────────────────────────
  let c3 = 120;
  const obsC3 = [];

  // Bônus por tipos de argumento
  const bonusArg = tiposArg.length * 20;
  c3 = Math.min(200, c3 + bonusArg);

  if (tiposArg.length === 0) {
    c3 -= 40;
    obsC3.push('Nenhum tipo de argumento claramente identificado. Use exemplos, dados, causalidade ou contraargumentos.');
    sugestoes.push('Inclua ao menos um dado estatístico ou citação de fonte confiável (IBGE, OMS, pesquisa) para embasar seus argumentos.');
  } else {
    const nomesTipos = { exemplificacao: 'exemplificação', causalidade: 'causalidade', autoridade: 'autoridade/repertório', contraargumento: 'contraargumento' };
    obsC3.push(`Tipos de argumento detectados: ${tiposArg.map(t => nomesTipos[t]).join(', ')}.`);
    if (tiposArg.length >= 3) pontosFortes.push(`Argumentação variada com ${tiposArg.length} estratégias argumentativas distintas.`);
  }

  if (tiposArg.includes('autoridade')) {
    obsC3.push('Bom uso de repertório sociocultural (dados, autores, leis ou contexto histórico).');
  } else {
    c3 -= 20;
    obsC3.push('Sem repertório de autoridade. Cite dados, pesquisas, filósofos, leis ou estatísticas para fortalecer a argumentação.');
    sugestoes.push('Acrescente uma citação ou dado: "Segundo o IBGE...", "De acordo com a Constituição Federal...", "Pesquisa da OMS indica...".');
  }

  if (!tiposArg.includes('contraargumento')) {
    obsC3.push('Ausência de contraargumento. Reconhecer visões opostas e refutá-las demonstra maturidade argumentativa.');
  } else {
    obsC3.push('Boa incorporação de contraargumento — demonstra visão crítica e capacidade de debate.');
  }

  if (totalPalavras < 200) {
    c3 -= 60;
    obsC3.push('Texto curto limita o aprofundamento dos argumentos. Expanda cada ideia central.');
  } else if (totalPalavras >= 300) {
    obsC3.push(`Extensão adequada (${totalPalavras} palavras) para desenvolvimento de argumentos sólidos.`);
  }

  if (paragrafos < 3) {
    c3 = Math.max(0, c3 - 60);
    obsC3.push('Poucos parágrafos — a argumentação ficou comprimida. Cada argumento merece seu próprio parágrafo.');
  }
  c3 = Math.max(0, Math.min(200, c3));

  // ── C4: Coesão e coerência ────────────────────────────────────────────────
  let c4 = 200;
  const obsC4 = [];
  const { total: totalConectivos, categorias: catUsadas, porCategoria } = conectivos;
  const variedadeCat = catUsadas.length;

  if (totalConectivos < 3) {
    c4 -= 100;
    obsC4.push(`Apenas ${totalConectivos} conectivo(s). Use: "Além disso" (adição), "Contudo" (contraste), "Portanto" (conclusão), "Uma vez que" (causa).`);
    sugestoes.push('Adicione conectivos variados entre e dentro dos parágrafos para melhorar a fluidez do texto.');
  } else if (totalConectivos < 6) {
    c4 -= 50;
    obsC4.push(`${totalConectivos} conectivos — razoável. Diversifique as categorias para melhorar a coesão.`);
  } else {
    obsC4.push(`Bom uso de conectivos (${totalConectivos} no total).`);
    pontosFortes.push(`Coesão textual bem construída com ${totalConectivos} conectivos.`);
  }

  if (variedadeCat < 2 && totalConectivos >= 3) {
    c4 -= 40;
    obsC4.push('Conectivos concentrados em poucos tipos. Varie: use conectivos de adição, contraste, causa E conclusão.');
  } else if (variedadeCat >= 4) {
    obsC4.push(`Excelente variedade: ${variedadeCat} categorias de conectivo usadas (${catUsadas.join(', ')}).`);
  } else if (variedadeCat >= 2) {
    obsC4.push(`${variedadeCat} categorias de conectivo: ${catUsadas.join(', ')}.`);
  }

  if (repetidas.length >= 4 && c4 > 120) {
    c4 -= 20;
    obsC4.push('Repetição lexical excessiva prejudica a coesão. Use pronomes e sinônimos para retomar ideias.');
  }
  c4 = Math.max(0, c4);

  // ── C5: Proposta de intervenção ────────────────────────────────────────────
  const c5 = proposta.score * 40;
  const obsC5 = [];
  const faltantes = [];

  if (!proposta.elementos.agente) faltantes.push('agente responsável (governo, escola, família...)');
  if (!proposta.elementos.acao) faltantes.push('ação concreta (criar, implementar, promover...)');
  if (!proposta.elementos.meio) faltantes.push('meio/modo (por meio de, através de...)');
  if (!proposta.elementos.finalidade) faltantes.push('finalidade (a fim de, para que, visando...)');
  if (!proposta.elementos.detalhamento) faltantes.push('detalhamento (proposta deve ter mais de 200 caracteres)');

  if (faltantes.length === 0) {
    obsC5.push('Proposta de intervenção completa com todos os 5 elementos exigidos pelo ENEM.');
    pontosFortes.push('Proposta de intervenção bem estruturada com agente, ação, meio, finalidade e detalhamento.');
  } else {
    obsC5.push(`Proposta incompleta — faltam: ${faltantes.join('; ')}.`);
  }

  if (proposta.score <= 3) {
    const template = gerarTemplateProposta(proposta, tema);
    obsC5.push(`Modelo sugerido: "${template}"`);
    sugestoes.push('Reescreva a conclusão com a estrutura: [Agente] deve [Ação], por meio de [Meio], a fim de [Finalidade].');
  }

  // ── Nota total e sugestões finais ─────────────────────────────────────────
  const notaTotal = c1 + c2 + c3 + c4 + c5;

  // Garante no máximo 5 sugestões priorizadas
  const sugestoesFinal = sugestoes.slice(0, 5);

  // Completa pontos fortes se vazio
  if (pontosFortes.length === 0) {
    if (totalPalavras >= 250) pontosFortes.push(`Boa extensão do texto (${totalPalavras} palavras).`);
    if (paragrafos >= 4) pontosFortes.push('Estrutura de 4 parágrafos corretamente organizada.');
    if (totalConectivos >= 5) pontosFortes.push('Uso adequado de conectivos para encadeamento das ideias.');
  }

  return {
    notaTotal,
    competencias: [
      { numero: 'I',   titulo: 'Domínio da norma culta',          nota: c1, observacoes: obsC1 },
      { numero: 'II',  titulo: 'Compreensão da proposta',          nota: c2, observacoes: obsC2 },
      { numero: 'III', titulo: 'Seleção e argumentação',           nota: c3, observacoes: obsC3 },
      { numero: 'IV',  titulo: 'Coesão e coerência',               nota: c4, observacoes: obsC4 },
      { numero: 'V',   titulo: 'Proposta de intervenção',          nota: c5, observacoes: obsC5 },
    ],
    pontosFortes,
    sugestoes: sugestoesFinal,
    metricas: {
      palavras: totalPalavras,
      paragrafos,
      frases,
      conectivos: totalConectivos,
      categoriaConectivos: catUsadas,
      tiposArgumentos: tiposArg,
      diversidadeVocabular: diversidade,
      informalidades: informais.length,
      aderenciaTema: aderencia,
      repetidas: repetidas.map(([p, n]) => `${p} (${n}x)`),
    },
  };
}
