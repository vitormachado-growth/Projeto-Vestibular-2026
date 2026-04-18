import { TOPICOS } from './geradorCronograma';

const SUBJECT_KEYWORDS = {
  'Biologia': [
    'célula', 'celular', 'organela', 'mitocôndria', 'cloroplasto', 'ribossomo',
    'dna', 'rna', 'gene', 'genético', 'cromossomo', 'alelo', 'hereditariedade',
    'proteína', 'enzima', 'hormônio', 'sangue', 'coração', 'pulmão',
    'ecossistema', 'biodiversidade', 'cadeia alimentar', 'bioma',
    'evolução', 'seleção natural', 'darwin', 'espécie', 'mutação',
    'bactéria', 'vírus', 'fungo', 'protozoário', 'infecção', 'doença',
    'fotossíntese', 'respiração celular', 'glicose', 'atp',
    'meiose', 'mitose', 'embrião', 'gameta', 'fecundação',
    'planta', 'vegetal', 'animal', 'mendel', 'organismo',
  ],
  'Química': [
    'átomo', 'atômico', 'molécula', 'elemento químico', 'tabela periódica',
    'íon', 'cátion', 'ânion', 'iônica', 'covalente',
    'ph', 'ácido', 'base', 'ácido-base', 'neutralização',
    'reação química', 'equação química', 'balanceamento',
    'mol', 'molar', 'estequi', 'massa molar', 'avogadro',
    'solução', 'solubilidade', 'concentração', 'molaridade',
    'oxidação', 'redução', 'pilha', 'eletrólise', 'eletroquímica',
    'orgânica', 'alcano', 'álcool', 'éster', 'hidrocarboneto',
    'termoquímica', 'entalpia', 'exotérmica', 'endotérmica',
    'catalisador', 'cinética química', 'equilíbrio químico',
  ],
  'Física': [
    'velocidade', 'aceleração', 'movimento uniforme', 'trajetória',
    'força', 'newton', 'atrito', 'gravidade', 'peso',
    'energia cinética', 'energia potencial', 'trabalho mecânico', 'potência',
    'pressão', 'empuxo', 'densidade', 'hidrostática',
    'temperatura', 'calor', 'dilatação', 'termologia', 'calorimetria',
    'onda', 'frequência', 'comprimento de onda', 'som',
    'espelho', 'lente', 'refração', 'reflexão',
    'carga elétrica', 'campo elétrico', 'corrente elétrica',
    'resistência', 'resistor', 'lei de ohm',
    'campo magnético', 'indução', 'eletromagnet',
  ],
  'História': [
    'século', 'guerra', 'revolução', 'império', 'colônia', 'colonial',
    'monarquia', 'absolutismo', 'feudal', 'medieval',
    'vargas', 'getúlio', 'ditadura militar', 'ai-5',
    'república velha', 'coronelismo',
    'escravidão', 'escravo', 'abolição', 'quilombo',
    'independência', 'proclamação',
    'guerra fria', 'urss', 'nazismo', 'fascismo', 'holocausto',
    'revolução industrial', 'revolução francesa',
    'bandeirante', 'mineração aurífera', 'engenho',
  ],
  'Geografia': [
    'clima', 'precipitação', 'chuva',
    'relevo', 'planalto', 'planície',
    'bacia hidrográfica', 'rio', 'hidrelétrica',
    'bioma', 'amazônia', 'cerrado', 'caatinga', 'pantanal',
    'urbanização', 'metrópole', 'êxodo rural', 'favela',
    'agronegócio', 'agricultura', 'reforma agrária',
    'demografia', 'pirâmide etária', 'migração',
    'globalização', 'mercosul', 'bloco econômico',
    'cartografia', 'escala', 'fuso horário',
    'sustentabilidade', 'desmatamento', 'aquecimento global',
    'energia eólica', 'energia solar',
  ],
  'Sociologia': [
    'sociedade', 'social', 'classe social', 'desigualdade social',
    'durkheim', 'fato social', 'anomia', 'solidariedade',
    'weber', 'burocracia', 'dominação carismática',
    'marx', 'mais-valia', 'luta de classes', 'alienação',
    'bourdieu', 'habitus', 'capital cultural',
    'foucault', 'poder disciplinar',
    'movimento social', 'feminismo', 'movimento negro',
    'indústria cultural', 'escola de frankfurt',
  ],
  'Filosofia': [
    'filosofia', 'filosófic', 'filósofo',
    'sócrates', 'platão', 'aristóteles', 'mundo das ideias',
    'kant', 'imperativo categórico',
    'descartes', 'penso logo existo',
    'hegel', 'dialética', 'nietzsche', 'vontade de poder',
    'hobbes', 'rousseau', 'locke', 'contrato social',
    'maquiavel', 'o príncipe',
    'estoicismo', 'epicurismo',
    'existencialismo', 'sartre',
    'virtude', 'livre-arbítrio', 'epistemologia', 'metafísica',
  ],
  'Português': [
    'concordância', 'regência', 'crase', 'pontuação',
    'sintaxe', 'oração subordinada', 'sujeito oculto',
    'morfologia', 'substantivo', 'adjetivo', 'advérbio',
    'figura de linguagem', 'metáfora', 'metonímia', 'ironia',
    'gênero textual', 'dissertação', 'narrativa',
    'variação linguística', 'norma culta',
    'coesão', 'coerência', 'anáfora',
    'semântica', 'polissemia', 'sinonímia',
  ],
  'Literatura': [
    'barroco', 'arcadismo', 'romantismo', 'realismo',
    'parnasianismo', 'simbolismo', 'modernismo', 'pré-modernismo',
    'machado de assis', 'gregório de matos', 'padre vieira',
    'castro alves', 'álvares de azevedo', 'gonçalves dias',
    'olavo bilac', 'cruz e sousa',
    'mário de andrade', 'oswald de andrade', 'drummond',
    'clarice lispector', 'graciliano ramos',
    'guimarães rosa',
    'soneto', 'estrofe', 'poema', 'romance', 'conto',
  ],
};

function normalizar(t) {
  return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function contarMatches(texto, keywords) {
  let score = 0;
  for (const kw of keywords) {
    const kwNorm = normalizar(kw);
    if (texto.includes(kwNorm)) {
      score += kwNorm.length > 10 ? 4 : kwNorm.length > 6 ? 2 : 1;
    }
  }
  return score;
}

export function classificarSubjectUmbrella(texto, umbrella) {
  const textoNorm = normalizar(texto);
  let candidatos;
  if (umbrella === 'Ciências da Natureza') {
    candidatos = ['Biologia', 'Química', 'Física'];
  } else if (umbrella === 'Ciências Humanas') {
    candidatos = ['História', 'Geografia', 'Sociologia', 'Filosofia'];
  } else if (umbrella === 'Linguagens') {
    candidatos = ['Português', 'Literatura'];
  } else {
    return umbrella;
  }

  let melhor = null;
  let melhorScore = 0;
  for (const subj of candidatos) {
    const score = contarMatches(textoNorm, SUBJECT_KEYWORDS[subj] || []);
    if (score > melhorScore) {
      melhorScore = score;
      melhor = subj;
    }
  }
  return melhor || candidatos[0];
}

// TOPIC_KEYWORDS: chaves batem EXATAMENTE com as de TOPICOS
const TOPIC_KEYWORDS = {
  'Matemática': {
    'Funções': ['função', 'f(x)', 'domínio', 'contradomínio', 'afim', 'gráfico da função', 'raiz da função', 'quadrática', 'parábola', 'discriminante', 'bhaskara', 'vértice'],
    'Geometria Plana': ['triângulo', 'quadrado', 'retângulo', 'círculo', 'circunferência', 'área', 'perímetro', 'pitágoras', 'polígono', 'diagonal', 'losango', 'trapézio', 'hexágono'],
    'Geometria Espacial': ['volume', 'cilindro', 'cone', 'pirâmide', 'esfera', 'prisma', 'cubo', 'paralelepípedo', 'sólido geométrico', 'tronco'],
    'Trigonometria': ['seno', 'cosseno', 'tangente', 'hipotenusa', 'cateto', 'radiano', 'arco', 'ângulo', 'trigonomét'],
    'Probabilidade': ['probabilidade', 'chance', 'sorteio', 'aleatório', 'evento', 'dado', 'moeda', 'baralho', 'sorteado'],
    'Análise Combinatória': ['combinação', 'permutação', 'arranjo', 'fatorial', 'princípio da contagem', 'anagrama', 'distintas maneiras'],
    'Estatística': ['média', 'mediana', 'moda', 'desvio padrão', 'variância', 'frequência', 'histograma', 'gráfico de barras', 'amostra', 'estatística', 'quartil'],
    'Progressões': ['progressão', 'aritmética', 'geométrica', 'termo geral', 'primeiro termo', 'razão', ' pa ', ' pg ', 'p.a.', 'p.g.'],
    'Logaritmos': ['logaritmo', 'log', 'exponencial', 'mudança de base'],
    'Matrizes': ['matriz', 'determinante', 'sistema linear', 'escalonamento'],
  },
  'Português': {
    'Interpretação de Texto': ['ideia central', 'tese', 'argumento', 'o texto afirma', 'o autor defende', 'intenção', 'pode-se concluir', 'depreende-se', 'subentende-se'],
    'Figuras de Linguagem': ['metáfora', 'metonímia', 'ironia', 'hipérbole', 'antítese', 'paradoxo', 'personificação', 'eufemismo', 'sinestesia', 'catacrese', 'figura de linguagem'],
    'Sintaxe': ['oração subordinada', 'oração coordenada', 'período composto', 'sujeito', 'predicado', 'objeto direto', 'objeto indireto', 'aposto', 'adjunto adnominal'],
    'Concordância': ['concordância verbal', 'concordância nominal', 'sujeito composto'],
    'Regência': ['regência verbal', 'regência nominal', 'verbo transitivo', 'preposição exigida'],
    'Pontuação': ['pontuação', 'vírgula', 'ponto e vírgula', 'dois-pontos', 'travessão'],
    'Semântica': ['sinônimo', 'antônimo', 'polissemia', 'ambiguidade', 'denotação', 'conotação', 'semântica'],
    'Crase': ['crase', 'acento grave', 'preposição a'],
    'Morfologia': ['classe gramatical', 'substantivo', 'adjetivo', 'pronome', 'advérbio', 'numeral', 'artigo definido'],
    'Gêneros Textuais': ['gênero textual', 'dissertativo-argumentativo', 'narrativo', 'descritivo', 'injuntivo', 'crônica', 'editorial', 'reportagem', 'charge'],
  },
  'Literatura': {
    'Barroco': ['barroco', 'gregório de matos', 'padre vieira', 'boca do inferno', 'cultismo', 'conceptismo'],
    'Arcadismo': ['arcadismo', 'tomás antônio gonzaga', 'marília de dirceu', 'neoclassicismo', 'bucólico', 'árcade'],
    'Romantismo': ['romantismo', 'josé de alencar', 'álvares de azevedo', 'castro alves', 'indianismo', 'gonçalves dias', 'iracema', 'senhora'],
    'Realismo': ['realismo', 'machado de assis', 'memórias póstumas', 'dom casmurro', 'quincas borba', 'brás cubas', 'naturalismo', 'aluísio azevedo', 'o cortiço'],
    'Parnasianismo': ['parnasianismo', 'olavo bilac', 'arte pela arte', 'parnasiano'],
    'Simbolismo': ['simbolismo', 'cruz e sousa', 'alphonsus', 'simbolista'],
    'Pré-Modernismo': ['pré-modernismo', 'euclides da cunha', 'lima barreto', 'monteiro lobato', 'os sertões', 'augusto dos anjos'],
    'Modernismo 1ª Fase': ['semana de 22', 'oswald de andrade', 'mário de andrade', 'macunaíma', 'manuel bandeira', 'modernismo primeira fase'],
    'Modernismo 2ª Fase': ['drummond', 'cecília meireles', 'graciliano ramos', 'vidas secas', 'jorge amado', 'érico veríssimo', 'vinicius de moraes', 'modernismo segunda'],
    'Literatura Contemporânea': ['guimarães rosa', 'clarice lispector', 'joão cabral', 'grande sertão', 'literatura contemporânea', 'hilda hilst', 'caio fernando abreu'],
  },
  'Inglês': {
    'Reading Comprehension': ['according to', 'the text', 'the author', 'main idea', 'can be inferred', 'the passage', 'best describes', 'purpose of the text'],
    'Vocabulary': ['synonym', 'antonym', 'means', 'closest in meaning', 'vocabulary', 'definition'],
    'Grammar — Tenses': ['tense', 'present perfect', 'past simple', 'conditional', 'passive voice', 'modal verb', 'article', 'preposition'],
    'Cognates and False Friends': ['false friend', 'pretend', 'eventually', 'actually', 'library', 'cognate'],
    'Phrasal Verbs': ['phrasal verb', 'look up', 'give up', 'run into', 'figure out', 'carry on', 'put off'],
  },
  'Biologia': {
    'Citologia': ['célula', 'organela', 'mitocôndria', 'cloroplasto', 'ribossomo', 'núcleo celular', 'membrana plasmática', 'citoplasma', 'retículo endoplasmático', 'lisossomo'],
    'Genética': ['mendel', 'alelo', 'cromossomo', 'dominante', 'recessivo', 'heterozigoto', 'homozigoto', 'hereditariedade', 'fenótipo', 'genótipo', 'heredograma'],
    'Ecologia': ['ecossistema', 'cadeia alimentar', 'bioma', 'habitat', 'nicho ecológico', 'produtor', 'consumidor', 'decompositor', 'teia alimentar', 'ciclo do carbono', 'ciclo do nitrogênio'],
    'Evolução': ['evolução', 'seleção natural', 'darwin', 'lamarck', 'adaptação', 'mutação genética', 'especiação'],
    'Fisiologia Humana': ['sistema digestório', 'sistema circulatório', 'sistema respiratório', 'sistema nervoso', 'sistema endócrino', 'sistema urinário', 'hormônio', 'enzima digestiva', 'fisiologia humana'],
    'Botânica': ['fotossíntese', 'planta', 'folha', 'caule', 'raiz', 'flor', 'fruto', 'semente', 'briófita', 'gimnosperma', 'angiosperma', 'transpiração vegetal'],
    'Zoologia': ['invertebrado', 'vertebrado', 'peixe', 'anfíbio', 'réptil', 'ave', 'mamífero', 'artrópode', 'molusco', 'porífero'],
    'Microbiologia': ['bactéria', 'vírus', 'protozoário', 'fungo', 'microrganismo', 'antibiótico', 'vacina', 'infecção viral'],
    'Bioquímica': ['carboidrato', 'lipídio', 'proteína', 'ácido nucleico', 'atp', 'enzima', 'vitamina', 'aminoácido'],
    'Embriologia': ['embrião', 'gastrulação', 'mórula', 'blástula', 'ectoderma', 'mesoderma', 'endoderma', 'embriogênese'],
  },
  'Química': {
    'Atomística': ['átomo', 'modelo atômico', 'elétron', 'próton', 'nêutron', 'número atômico', 'distribuição eletrônica', 'bohr', 'rutherford', 'isótopo'],
    'Ligações Químicas': ['ligação iônica', 'ligação covalente', 'ligação metálica', 'polaridade', 'apolar', 'geometria molecular'],
    'Termoquímica': ['entalpia', 'termoquím', 'exotérm', 'endotérm', 'lei de hess', 'calor de reação'],
    'Cinética': ['velocidade de reação', 'cinética química', 'catalisador', 'energia de ativação'],
    'Equilíbrio': ['equilíbrio químico', 'le chatelier', 'constante de equilíbrio', 'kc', 'kp', 'deslocamento de equilíbrio'],
    'Eletroquímica': ['pilha', 'eletrólise', 'oxirredução', 'potencial padrão', 'eletroquím', 'anodo', 'catodo'],
    'Química Orgânica — Funções': ['orgânica', 'hidrocarboneto', 'alcano', 'alceno', 'álcool', 'aldeído', 'cetona', 'ácido carboxílico', 'éster', 'amina', 'amida'],
    'Química Orgânica — Reações': ['reação de substituição', 'reação de adição', 'reação de eliminação', 'reação orgânica', 'saponificação', 'polimerização'],
    'Estequiometria': ['estequi', 'mol', 'massa molar', 'reagente limitante', 'rendimento', 'pureza', 'cálculo estequiométrico'],
    'Soluções': ['solução', 'concentração', 'molaridade', 'fração molar', 'diluição', 'ppm', 'soluto'],
  },
  'Física': {
    'Cinemática': ['velocidade', 'aceleração', 'mru', 'muv', 'trajetória', 'deslocamento', 'queda livre', 'movimento uniforme'],
    'Dinâmica': ['força', 'newton', 'atrito', 'tração', 'força normal', 'plano inclinado', 'segunda lei de newton'],
    'Energia e Trabalho': ['energia cinética', 'energia potencial', 'trabalho mecânico', 'potência mecânica', 'conservação da energia'],
    'Hidrostática': ['pressão', 'empuxo', 'arquimedes', 'densidade', 'hidrostática', 'pascal', 'fluido'],
    'Termologia': ['temperatura', 'calor', 'dilatação', 'caloria', 'termologia', 'calorimetria', 'mudança de fase'],
    'Ondulatória': ['onda', 'frequência', 'período', 'comprimento de onda', 'amplitude', 'som', 'efeito doppler', 'ondas sonoras'],
    'Óptica': ['espelho', 'lente', 'refração', 'reflexão', 'ângulo de incidência', 'equação de gauss', 'imagem óptica'],
    'Eletrostática': ['carga elétrica', 'lei de coulomb', 'campo elétrico', 'potencial elétrico', 'capacitor'],
    'Eletrodinâmica': ['corrente elétrica', 'tensão elétrica', 'resistência elétrica', 'resistor', 'lei de ohm', 'circuito'],
    'Eletromagnetismo': ['campo magnético', 'indução magnética', 'lenz', 'faraday', 'eletromagnet', 'bobina', 'transformador'],
  },
  'História': {
    'Antiguidade': ['egito antigo', 'mesopotâmia', 'grécia antiga', 'roma antiga', 'império romano', 'democracia ateniense', 'antiguidade'],
    'Idade Média': ['feudal', 'medieval', 'idade média', 'cruzadas', 'peste negra', 'suserania', 'vassalagem', 'bizantino'],
    'Brasil Colônia': ['colônia', 'capitania hereditária', 'engenho', 'bandeirante', 'mineração aurífera', 'jesuíta', 'brasil colonial', 'pau-brasil'],
    'Brasil Império': ['dom pedro', 'regência', 'independência do brasil', 'segundo reinado', 'guerra do paraguai', 'brasil imperial'],
    'República Velha': ['república velha', 'coronelismo', 'café com leite', 'canudos', 'contestado', 'revolta da vacina', 'política do café'],
    'Era Vargas': ['vargas', 'estado novo', 'revolução de 30', 'clt', 'intentona comunista', 'getúlio'],
    'Ditadura Militar': ['ditadura militar', 'ai-5', 'golpe de 1964', 'anos de chumbo', 'diretas já', 'milagre econômico', 'regime militar'],
    'Guerra Fria': ['guerra fria', 'urss', 'soviét', 'cortina de ferro', 'otan', 'pacto de varsóvia', 'revolução cubana'],
    'Redemocratização': ['redemocratização', 'nova república', 'constituição de 1988', 'collor', 'impeachment', 'diretas'],
    'História Contemporânea': ['globalização', '11 de setembro', 'primavera árabe', 'holocausto', 'segunda guerra mundial', 'primeira guerra mundial', 'nazismo', 'fascismo'],
  },
  'Geografia': {
    'Cartografia': ['cartografia', 'escala', 'projeção cartográfica', 'mercator', 'fuso horário', 'coordenadas geográficas'],
    'Geopolítica': ['geopolítica', 'bloco econômico', 'mercosul', 'união europeia', 'brics', 'otan', 'onu', 'conflito internacional'],
    'Climatologia': ['clima', 'precipitação', 'massa de ar', 'frente fria', 'clima tropical', 'semiárido', 'climatologia'],
    'Hidrografia': ['bacia hidrográfica', 'hidrelétrica', 'aquífero', 'lençol freático', 'rio amazonas', 'rio são francisco'],
    'Biomas do Brasil': ['amazônia', 'cerrado', 'caatinga', 'mata atlântica', 'pampa', 'pantanal', 'bioma'],
    'Urbanização': ['urbanização', 'metrópole', 'êxodo rural', 'favela', 'segregação urbana', 'conurbação'],
    'Agropecuária': ['agropecuária', 'agricultura', 'agronegócio', 'reforma agrária', 'latifúndio', 'monocultura'],
    'Globalização': ['globalização', 'multinacional', 'fluxo de capital', 'comércio internacional'],
    'Demografia': ['demografia', 'pirâmide etária', 'transição demográfica', 'crescimento populacional', 'envelhecimento populacional', 'taxa de natalidade'],
    'Geografia Econômica': ['indústria', 'setor primário', 'setor secundário', 'setor terciário', 'pib', 'matriz energética', 'energia renovável', 'pré-sal'],
  },
  'Sociologia': {
    'Durkheim': ['durkheim', 'fato social', 'anomia', 'solidariedade mecânica', 'solidariedade orgânica', 'consciência coletiva'],
    'Weber': ['weber', 'ação social', 'dominação carismática', 'dominação tradicional', 'burocracia', 'ética protestante', 'tipo ideal'],
    'Marx': ['marx', 'mais-valia', 'luta de classes', 'alienação', 'proletariado', 'burguesia', 'materialismo histórico', 'infraestrutura'],
    'Movimentos Sociais': ['movimento social', 'feminismo', 'lgbt', 'movimento negro', 'mst', 'sindicato', 'movimento operário'],
    'Indústria Cultural': ['indústria cultural', 'escola de frankfurt', 'adorno', 'horkheimer', 'benjamin', 'marcuse'],
    'Cidadania': ['cidadania', 'direitos civis', 'direitos políticos', 'direitos sociais', 'marshall', 'cidadão'],
    'Desigualdade Social': ['desigualdade', 'pobreza', 'exclusão social', 'mobilidade social', 'pobreza extrema'],
    'Trabalho e Sociedade': ['taylorismo', 'fordismo', 'toyotismo', 'uberização', 'precarização', 'trabalho formal', 'trabalho informal'],
  },
  'Filosofia': {
    'Pré-Socráticos': ['tales', 'heráclito', 'parmênides', 'anaximandro', 'pitágoras', 'arché', 'pré-socrático'],
    'Sócrates e Platão': ['sócrates', 'platão', 'maiêutica', 'mundo das ideias', 'alegoria da caverna', 'mito da caverna'],
    'Aristóteles': ['aristóteles', 'potência e ato', 'zoon politikon', 'silogismo', 'ética a nicômaco', 'aristotélica'],
    'Iluminismo': ['iluminismo', 'voltaire', 'rousseau', 'montesquieu', 'contrato social', 'separação dos poderes', 'iluminista'],
    'Kant': ['kant', 'imperativo categórico', 'razão pura', 'crítica da razão', 'autonomia moral', 'kantiana'],
    'Hegel': ['hegel', 'dialética', 'tese antítese síntese', 'fenomenologia do espírito', 'hegeliana'],
    'Existencialismo': ['existencialismo', 'sartre', 'heidegger', 'camus', 'angústia existencial'],
    'Ética': ['ética', 'moral', 'virtude', 'utilitarismo', 'deontologia', 'bioética', 'ética kantiana'],
  },
};

const LIMIAR_CLASSIFICACAO = 1;

export function classificarTopico(texto, subject) {
  const topicosDisponiveis = TOPIC_KEYWORDS[subject];
  if (!topicosDisponiveis) return null;
  const textoNorm = normalizar(texto);

  let melhor = null;
  let melhorScore = 0;
  for (const [topico, keywords] of Object.entries(topicosDisponiveis)) {
    const score = contarMatches(textoNorm, keywords);
    if (score > melhorScore) {
      melhorScore = score;
      melhor = topico;
    }
  }
  return melhorScore >= LIMIAR_CLASSIFICACAO ? melhor : null;
}

export function classificarQuestao(q) {
  const texto = q.statement + ' ' + (q.alternatives || []).map(a => a.text).join(' ');
  let subject = q.subject;

  if (['Ciências da Natureza', 'Ciências Humanas', 'Linguagens'].includes(subject)) {
    subject = classificarSubjectUmbrella(texto, subject);
  }

  const topic = classificarTopico(texto, subject);

  return {
    ...q,
    subject,
    topic: topic || 'Geral',
  };
}

export function reclassificarQuestoes(questoes) {
  return questoes.map(q => {
    if (['Ciências da Natureza', 'Ciências Humanas', 'Linguagens'].includes(q.subject) || q.topic === 'Geral' || !q.topic) {
      return classificarQuestao(q);
    }
    return q;
  });
}

export function calcularCobertura(questoes) {
  const cobertura = {};
  const geraisPorMateria = {};

  Object.keys(TOPICOS).forEach(subj => {
    const topicos = Array.isArray(TOPICOS[subj]) ? TOPICOS[subj] : Object.keys(TOPICOS[subj]);
    cobertura[subj] = {};
    topicos.forEach(t => { cobertura[subj][t] = 0; });
    geraisPorMateria[subj] = 0;
  });

  questoes.forEach(q => {
    if (!cobertura[q.subject]) return;
    const qtop = q.topic || '';

    if (cobertura[q.subject][qtop] !== undefined) {
      cobertura[q.subject][qtop]++;
      return;
    }

    const qtopNorm = normalizar(qtop);
    const topicosSubj = Object.keys(cobertura[q.subject]);
    for (const t of topicosSubj) {
      const tNorm = normalizar(t);
      if (qtopNorm === tNorm) {
        cobertura[q.subject][t]++;
        return;
      }
      const tTokens = tNorm.split(/[\s—–-]+/).filter(w => w.length > 4);
      const qTokens = qtopNorm.split(/[\s—–-]+/).filter(w => w.length > 4);
      const overlap = tTokens.some(tk => qTokens.some(qk => qk.includes(tk) || tk.includes(qk)));
      if (overlap) {
        cobertura[q.subject][t]++;
        return;
      }
    }

    geraisPorMateria[q.subject]++;
  });

  return { cobertura, geraisPorMateria };
}
