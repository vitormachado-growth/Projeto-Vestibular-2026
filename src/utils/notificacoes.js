import { TOPICOS } from './geradorCronograma';

const RANKING_KEY    = 'ranking_historico_v1';
const SIMULADOS_KEY  = 'simulados_historico_v1';
const ESTUDADOS_KEY  = 'materias_topicos_estudados_v1';
const LIDAS_KEY      = 'notificacoes_lidas_v1';

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function load(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}

export function gerarNotificacoes() {
  const hoje = new Date();
  const semana = getWeekNumber(hoje);
  const ano = hoje.getFullYear();
  const notifs = [];

  // ── 1. Simulado semanal pendente ─────────────────────────────────────────
  const ranking = load(RANKING_KEY) || [];
  const entradaSemana = ranking.find(e => e.semana === semana && e.ano === ano);
  if (!entradaSemana) {
    notifs.push({
      id: 'simulado-semanal-pendente',
      tipo: 'alerta',
      titulo: 'Simulado semanal disponível',
      corpo: 'Você ainda não fez o desafio desta semana. Faça agora e entre no ranking!',
      icone: '🏆',
      rota: 'ranking',
    });
  } else if (!entradaSemana.redacao) {
    notifs.push({
      id: 'redacao-semanal-pendente',
      tipo: 'info',
      titulo: 'Redação semanal pendente',
      corpo: 'Você fez o simulado, mas ainda não avaliou sua redação desta semana.',
      icone: '✒️',
      rota: 'ranking',
    });
  }

  // ── 2. Sem simulados livres esta semana ──────────────────────────────────
  const simulados = load(SIMULADOS_KEY) || [];
  const inicioSemana = new Date(hoje);
  inicioSemana.setDate(hoje.getDate() - hoje.getDay());
  inicioSemana.setHours(0, 0, 0, 0);
  const simEstaSemana = simulados.filter(s => new Date(s.date) >= inicioSemana);
  if (simEstaSemana.length === 0 && simulados.length > 0) {
    notifs.push({
      id: 'sem-simulado-livre-semana',
      tipo: 'info',
      titulo: 'Nenhum simulado esta semana',
      corpo: 'Pratique com um simulado livre para manter o ritmo de estudos.',
      icone: '📝',
      rota: 'simulados',
    });
  }

  // ── 3. Tópicos parados há mais de 5 dias ────────────────────────────────
  const estudados = load(ESTUDADOS_KEY) || {};
  const emAndamento = Object.entries(estudados)
    .filter(([, v]) => {
      const st = typeof v === 'boolean' ? (v ? 2 : 0) : (v?.status ?? 0);
      return st === 1;
    })
    .filter(([, v]) => {
      if (!v?.updatedAt) return false;
      const dias = (Date.now() - new Date(v.updatedAt)) / 86400000;
      return dias > 5;
    });
  if (emAndamento.length > 0) {
    const [chave] = emAndamento[0];
    const [mat, top] = chave.split('::');
    notifs.push({
      id: `revisar-${chave}`,
      tipo: 'revisar',
      titulo: `Revisar: ${top}`,
      corpo: `Você marcou "${top}" de ${mat} como "estudando" há mais de 5 dias. Hora de dominar!`,
      icone: '📖',
      rota: 'materias',
    });
  }

  // ── 4. Cobertura baixa ───────────────────────────────────────────────────
  let totalTopicos = 0, dominados = 0;
  Object.entries(TOPICOS).forEach(([mat, tops]) => {
    const lista = Array.isArray(tops) ? tops : Object.keys(tops);
    totalTopicos += lista.length;
    lista.forEach(t => {
      const entry = estudados[`${mat}::${t}`];
      const st = typeof entry === 'boolean' ? (entry ? 2 : 0) : (entry?.status ?? 0);
      if (st === 2) dominados++;
    });
  });
  const cobPct = Math.round((dominados / totalTopicos) * 100);
  if (cobPct < 10 && simulados.length > 2) {
    notifs.push({
      id: 'cobertura-baixa',
      tipo: 'alerta',
      titulo: 'Cobertura de tópicos baixa',
      corpo: `Você dominou apenas ${cobPct}% dos tópicos. Vá para Matérias e marque o que já estudou.`,
      icone: '📊',
      rota: 'materias',
    });
  }

  // ── 5. Primeiro acesso ───────────────────────────────────────────────────
  if (simulados.length === 0 && ranking.length === 0 && dominados === 0) {
    notifs.push({
      id: 'boas-vindas',
      tipo: 'sucesso',
      titulo: 'Bem-vindo ao VesTibular 2026!',
      corpo: 'Comece gerando seu cronograma de estudos personalizado.',
      icone: '🎓',
      rota: 'cronograma',
    });
  }

  return notifs;
}

export function getNotificacoesLidas() {
  try { return JSON.parse(localStorage.getItem(LIDAS_KEY) || '[]'); } catch { return []; }
}

export function marcarLida(id) {
  const lidas = getNotificacoesLidas();
  if (!lidas.includes(id)) {
    localStorage.setItem(LIDAS_KEY, JSON.stringify([...lidas, id]));
  }
}

export function marcarTodasLidas(ids) {
  localStorage.setItem(LIDAS_KEY, JSON.stringify(ids));
}

export function solicitarPermissaoBrowser() {
  if (!('Notification' in window)) return Promise.resolve('unsupported');
  if (Notification.permission === 'granted') return Promise.resolve('granted');
  if (Notification.permission === 'denied') return Promise.resolve('denied');
  return Notification.requestPermission();
}

export function enviarNotificacaoBrowser(titulo, corpo, icone = '/favicon.ico') {
  try {
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    new Notification(titulo, { body: corpo, icon: icone });
  } catch {}
}
