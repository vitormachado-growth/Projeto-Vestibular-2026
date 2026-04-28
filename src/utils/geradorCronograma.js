const MATERIAS_ENEM = [
  'Matemática', 'Português', 'Redação', 'Literatura',
  'História', 'Geografia', 'Sociologia', 'Filosofia',
  'Biologia', 'Química', 'Física', 'Inglês',
];

const MATERIAS_UERJ = [
  'Matemática', 'Português', 'Redação', 'Literatura',
  'História', 'Geografia',
  'Biologia', 'Química', 'Física', 'Inglês',
];

export const TOPICOS = {
  'Matemática': ['Funções', 'Geometria Plana', 'Geometria Espacial', 'Trigonometria', 'Probabilidade', 'Análise Combinatória', 'Estatística', 'Progressões', 'Logaritmos', 'Matrizes'],
  'Português': ['Interpretação de Texto', 'Figuras de Linguagem', 'Sintaxe', 'Concordância', 'Regência', 'Pontuação', 'Semântica', 'Crase', 'Morfologia', 'Gêneros Textuais'],
  'Literatura': ['Barroco', 'Arcadismo', 'Romantismo', 'Realismo', 'Parnasianismo', 'Simbolismo', 'Pré-Modernismo', 'Modernismo 1ª Fase', 'Modernismo 2ª Fase', 'Literatura Contemporânea'],
  'Redação': ['Estrutura Dissertativa', 'Proposta de Intervenção', 'Repertório Sociocultural', 'Competências ENEM', 'Coesão e Coerência', 'Treino de Tema', 'Correção por Pares', 'Refinamento'],
  'História': ['Antiguidade', 'Idade Média', 'Brasil Colônia', 'Brasil Império', 'República Velha', 'Era Vargas', 'Ditadura Militar', 'Guerra Fria', 'Redemocratização', 'História Contemporânea'],
  'Geografia': ['Cartografia', 'Geopolítica', 'Climatologia', 'Hidrografia', 'Biomas do Brasil', 'Urbanização', 'Agropecuária', 'Globalização', 'Demografia', 'Geografia Econômica'],
  'Sociologia': ['Durkheim', 'Weber', 'Marx', 'Movimentos Sociais', 'Indústria Cultural', 'Cidadania', 'Desigualdade Social', 'Trabalho e Sociedade'],
  'Filosofia': ['Pré-Socráticos', 'Sócrates e Platão', 'Aristóteles', 'Iluminismo', 'Kant', 'Hegel', 'Existencialismo', 'Ética'],
  'Biologia': ['Citologia', 'Genética', 'Ecologia', 'Evolução', 'Fisiologia Humana', 'Botânica', 'Zoologia', 'Microbiologia', 'Bioquímica', 'Embriologia'],
  'Química': ['Atomística', 'Ligações Químicas', 'Termoquímica', 'Cinética', 'Equilíbrio', 'Eletroquímica', 'Química Orgânica — Funções', 'Química Orgânica — Reações', 'Estequiometria', 'Soluções'],
  'Física': ['Cinemática', 'Dinâmica', 'Energia e Trabalho', 'Hidrostática', 'Termologia', 'Ondulatória', 'Óptica', 'Eletrostática', 'Eletrodinâmica', 'Eletromagnetismo'],
  'Inglês': ['Reading Comprehension', 'Vocabulary', 'Grammar — Tenses', 'Cognates and False Friends', 'Phrasal Verbs'],
};

function materiasPorFoco(focus) {
  if (focus === 'enem') return MATERIAS_ENEM;
  if (focus === 'uerj') return MATERIAS_UERJ;
  return [...new Set([...MATERIAS_ENEM, ...MATERIAS_UERJ])];
}

const NIVEL_PESO = { forte: 1, medio: 2, fraco: 3 };

export function gerarCronograma(config) {
  const {
    focus, diasAtivos, janelas, niveis,
    duracaoSessao, incluirRedacao, incluirSimulado,
    prioridades,
  } = config;

  const materias = materiasPorFoco(focus);
  const sessaoMin = duracaoSessao;

  const materiasPonderadas = materias.map(m => {
    const nivel = niveis[m] || 'medio';
    const prioridade = prioridades.includes(m) ? 1.5 : 1;
    return { nome: m, peso: NIVEL_PESO[nivel] * prioridade };
  });

  const pesoTotal = materiasPonderadas.reduce((acc, m) => acc + m.peso, 0);

  const DIAS = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
  const DIAS_LABEL = {
    segunda: 'Segunda', terca: 'Terça', quarta: 'Quarta',
    quinta: 'Quinta', sexta: 'Sexta', sabado: 'Sábado', domingo: 'Domingo',
  };

  const slotsPorDia = {};
  const inicioMinPorDia = {};
  let totalSlotsSemana = 0;
  DIAS.forEach(d => {
    const janela = janelas?.[d];
    if (diasAtivos[d] && janela?.inicio && janela?.fim) {
      const inicioMin = parseHora(janela.inicio);
      const fimMin = parseHora(janela.fim);
      const minutosDia = Math.max(0, fimMin - inicioMin);
      const slots = Math.floor(minutosDia / sessaoMin);
      slotsPorDia[d] = slots;
      inicioMinPorDia[d] = inicioMin;
      totalSlotsSemana += slots;
    } else {
      slotsPorDia[d] = 0;
      inicioMinPorDia[d] = 8 * 60;
    }
  });

  if (totalSlotsSemana === 0) {
    return { sessoes: [], porDia: {}, totalHoras: 0, aviso: 'Nenhum tempo de estudo configurado.' };
  }

  const alocacao = {};
  materiasPonderadas.forEach(m => {
    alocacao[m.nome] = Math.max(1, Math.round((m.peso / pesoTotal) * totalSlotsSemana));
  });

  if (incluirRedacao) alocacao['Redação'] = Math.max(2, alocacao['Redação'] || 2);
  const totalSimulado = incluirSimulado ? Math.min(2, Math.floor(totalSlotsSemana * 0.1)) : 0;

  const somaAlocada = Object.values(alocacao).reduce((a, b) => a + b, 0) + totalSimulado;
  const ajuste = totalSlotsSemana - somaAlocada;
  if (ajuste !== 0) {
    const maisPesada = materiasPonderadas.sort((a, b) => b.peso - a.peso)[0].nome;
    alocacao[maisPesada] = Math.max(1, (alocacao[maisPesada] || 0) + ajuste);
  }

  const fila = [];
  Object.entries(alocacao).forEach(([materia, qtd]) => {
    const topicos = TOPICOS[materia] || ['Revisão Geral'];
    for (let i = 0; i < qtd; i++) {
      fila.push({
        materia,
        topico: topicos[i % topicos.length],
        duracao: sessaoMin,
        tipo: materia === 'Redação' ? 'redacao' : 'estudo',
      });
    }
  });
  for (let i = 0; i < totalSimulado; i++) {
    fila.push({
      materia: 'Simulado',
      topico: `Simulado ${focus.toUpperCase()}`,
      duracao: sessaoMin * 2,
      tipo: 'simulado',
    });
  }

  shuffle(fila);
  fila.sort(a => a.materia === 'Simulado' ? 1 : -1);

  // Garante que a fila não excede a capacidade total de slots
  if (fila.length > totalSlotsSemana) fila.splice(totalSlotsSemana);

  const porDia = {};
  DIAS.forEach(d => { porDia[d] = []; });

  let idx = 0;
  const diasComSlots = DIAS.filter(d => slotsPorDia[d] > 0);
  const capacidades = { ...slotsPorDia };

  while (idx < fila.length) {
    // Sai se não restar capacidade em nenhum dia
    const capacidadeRestante = diasComSlots.reduce((s, d) => s + capacidades[d], 0);
    if (capacidadeRestante === 0) break;

    let alocado = false;
    for (const dia of diasComSlots) {
      if (capacidades[dia] > 0 && idx < fila.length) {
        const sessao = fila[idx];
        const materiaJaHoje = porDia[dia].some(s => s.materia === sessao.materia);
        if (materiaJaHoje && capacidades[dia] > 1) {
          continue;
        }
        porDia[dia].push({ ...sessao, horario: gerarHorario(inicioMinPorDia[dia], porDia[dia].length, sessaoMin) });
        capacidades[dia]--;
        idx++;
        alocado = true;
      }
    }
    if (!alocado) {
      for (const dia of diasComSlots) {
        if (capacidades[dia] > 0 && idx < fila.length) {
          const sessao = fila[idx];
          porDia[dia].push({ ...sessao, horario: gerarHorario(inicioMinPorDia[dia], porDia[dia].length, sessaoMin) });
          capacidades[dia]--;
          idx++;
        }
      }
      if (idx >= fila.length) break;
    }
  }

  return {
    sessoes: fila,
    porDia,
    diasLabel: DIAS_LABEL,
    dias: DIAS,
    totalHoras: Math.round((totalSlotsSemana * sessaoMin / 60) * 10) / 10,
    totalSessoes: fila.length,
  };
}

function gerarHorario(inicioMin, indice, duracao) {
  const startMin = inicioMin + indice * duracao;
  const endMin = startMin + duracao;
  const h = Math.floor(startMin / 60);
  const m = startMin % 60;
  const h2 = Math.floor(endMin / 60);
  const m2 = endMin % 60;
  return `${pad(h)}:${pad(m)} – ${pad(h2)}:${pad(m2)}`;
}

function parseHora(s) {
  const [h, m] = String(s).split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function pad(n) {
  return n.toString().padStart(2, '0');
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export const MATERIAS = {
  enem: MATERIAS_ENEM,
  uerj: MATERIAS_UERJ,
  ambos: [...new Set([...MATERIAS_ENEM, ...MATERIAS_UERJ])],
};
