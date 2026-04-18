import { classificarQuestao } from '../utils/classificadorTopicos';

const API_BASE = 'https://api.enem.dev/v1';

const ANOS_FALLBACK = [
  2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
];

export async function listarProvas() {
  try {
    const res = await fetch(`${API_BASE}/exams`);
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    const anos = Array.isArray(data)
      ? data.map(e => ({ year: e.year ?? e })).filter(e => e.year)
      : ANOS_FALLBACK.map(y => ({ year: y }));
    const anosSet = new Set(anos.map(a => a.year));
    ANOS_FALLBACK.forEach(y => { if (!anosSet.has(y)) anos.push({ year: y }); });
    return anos.sort((a, b) => b.year - a.year);
  } catch {
    return ANOS_FALLBACK.map(y => ({ year: y })).sort((a, b) => b.year - a.year);
  }
}

function mapearSubject(discipline, language) {
  if (discipline === 'matematica') return 'Matemática';
  if (discipline === 'ciencias-natureza') return 'Ciências da Natureza';
  if (discipline === 'ciencias-humanas') return 'Ciências Humanas';
  if (discipline === 'linguagens') {
    if (language === 'ingles') return 'Inglês';
    if (language === 'espanhol') return null;
    return 'Linguagens';
  }
  return 'Linguagens';
}

function converterQuestao(q, idOffset) {
  const subject = mapearSubject(q.discipline, q.language);
  if (!subject) return null;

  const partes = [];
  if (q.context) partes.push(q.context);
  if (q.alternativesIntroduction) partes.push(q.alternativesIntroduction);
  const statement = partes.join('\n\n').trim();

  if (!statement || !q.alternatives || q.alternatives.length === 0) return null;

  return {
    id: idOffset + q.index,
    subject,
    topic: q.language
      ? `${subject} — ${q.language === 'ingles' ? 'English Reading' : q.language}`
      : `ENEM ${q.year} · Q${q.index}`,
    type: 'enem',
    year: q.year,
    difficulty: 'medio',
    statement,
    alternatives: q.alternatives.map(a => ({
      id: a.letter.toLowerCase(),
      text: a.text || '(sem texto — questão com imagem)',
    })),
    answer: q.correctAlternative.toLowerCase(),
    explanation: 'Questão oficial do ENEM. Consulte o gabarito oficial para justificativa detalhada.',
    origem: 'enem.dev',
  };
}

export async function baixarProva(year, onProgress) {
  const LIMIT = 50;
  let offset = 0;
  let total = Infinity;
  const convertidas = [];
  const idOffset = year * 10000;
  let puladas = 0;

  while (offset < total) {
    const url = `${API_BASE}/exams/${year}/questions?limit=${LIMIT}&offset=${offset}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Falha ao baixar página ${offset} (${res.status})`);
    const data = await res.json();

    total = data.metadata?.total || 0;
    for (const q of data.questions || []) {
      const c = converterQuestao(q, idOffset);
      if (c) {
        const classificada = classificarQuestao(c);
        convertidas.push(classificada);
      } else puladas++;
    }

    offset += LIMIT;
    if (onProgress) onProgress({ baixadas: Math.min(offset, total), total, convertidas: convertidas.length });

    if (!data.metadata?.hasMore) break;
  }

  return { questoes: convertidas, total, puladas };
}

export async function baixarTodasProvas(anos, onProgress) {
  const todas = [];
  let totalPuladas = 0;
  let totalOriginal = 0;

  for (let i = 0; i < anos.length; i++) {
    const ano = anos[i];
    if (onProgress) onProgress({
      fase: 'ano',
      anoAtual: ano,
      anoIndex: i,
      anosTotal: anos.length,
      questoesAcumuladas: todas.length,
    });

    try {
      const res = await baixarProva(ano, (p) => {
        if (onProgress) onProgress({
          fase: 'baixando',
          anoAtual: ano,
          anoIndex: i,
          anosTotal: anos.length,
          baixadasAno: p.baixadas,
          totalAno: p.total,
          questoesAcumuladas: todas.length + p.convertidas,
        });
      });
      todas.push(...res.questoes);
      totalPuladas += res.puladas;
      totalOriginal += res.total;
    } catch (e) {
      console.error(`Erro no ano ${ano}:`, e.message);
    }
  }

  return {
    questoes: todas,
    totalOriginal,
    totalPuladas,
    anosProcessados: anos.length,
  };
}
