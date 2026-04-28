// Textos motivadores por temaId.
// Cobertura inicial: ENEM oficiais 2021–2025 e UERJ oficiais 2022–2025.
// Os textos foram adaptados/sintetizados para fins de estudo. Citações de
// autores são paráfrases ou trechos clássicos amplamente atestados.

export const TIPO_LABEL = {
  texto: 'Texto',
  dados: 'Dados',
  citacao: 'Citação',
};

export const textosMotivadores = {
  // ── ENEM 2025 — Envelhecimento populacional ──────────────────────────────
  1: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'O envelhecimento da população brasileira é um fenômeno irreversível: pela primeira vez na história, há mais pessoas com 60 anos ou mais do que crianças de até 14. Essa transformação inverte a pirâmide etária e exige repensar saúde, previdência, urbanismo e laços afetivos — não apenas para os idosos, mas para o desenho de toda a sociedade.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de IBGE/PNAD',
      conteudo:
        'A expectativa de vida ao nascer no Brasil ultrapassa hoje os 76 anos. A faixa acima de 60 anos é a que mais cresce: projeta-se que, em 2050, idosos representarão cerca de um terço da população brasileira.',
    },
    {
      tipo: 'citacao',
      fonte: 'Norberto Bobbio, "O tempo da memória" (1996)',
      conteudo:
        '"O velho vê o mundo da perspectiva do passado e o jovem da perspectiva do futuro. Ao velho cabe sobretudo manter viva a memória; ao jovem, projetar o que ainda não é."',
    },
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'A solidão tem se tornado um dos principais fatores silenciosos de adoecimento entre idosos brasileiros — não a pobreza material em si, mas o isolamento afetivo, a perda de papéis sociais e a invisibilidade no espaço público. Cuidar do envelhecer é também garantir que ninguém envelheça sozinho.',
    },
  ],

  // ── ENEM 2024 — Valorização da herança africana ──────────────────────────
  2: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'A presença africana no Brasil não se limita à música, à culinária ou às religiões de matriz: ela estrutura a língua que falamos, a estética nacional e os modos de viver em comunidade. Reconhecê-la é reescrever o que se entende por brasilidade — e desfazer séculos de hierarquização racial que apagaram contribuições fundamentais.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de IBGE/PNAD Contínua',
      conteudo:
        'Mais de 56% da população brasileira se autodeclara preta ou parda. Ainda assim, pessoas negras representam menos de 30% dos cargos de liderança em empresas e órgãos públicos, e recebem em média cerca de 40% menos que pessoas brancas no mesmo posto.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Lélia Gonzalez, "Por um feminismo afro-latino-americano" (1988)',
      conteudo:
        'A intelectual brasileira Lélia Gonzalez cunhou o conceito de "Améfrica Ladina" para descrever uma identidade construída por séculos de diáspora — uma cultura que não é mero reflexo da Europa, mas matriz própria, forjada na resistência.',
    },
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'A Lei 10.639/2003 tornou obrigatório o ensino de história e cultura afro-brasileira e africana nas escolas. Mais de duas décadas depois, sua aplicação efetiva ainda esbarra na falta de formação docente, na escassez de material didático e na resistência curricular.',
    },
  ],

  // ── ENEM 2023 — Trabalho de cuidado da mulher ────────────────────────────
  3: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Cuidar de crianças, idosos, doentes e da casa é trabalho — embora raramente seja reconhecido como tal. Esse trabalho, que sustenta a economia formal sem aparecer nas estatísticas oficiais, recai majoritariamente sobre mulheres, em especial as mais pobres e racializadas, e funciona como o piso invisível sobre o qual se ergue toda a sociedade.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de IBGE/IPEA',
      conteudo:
        'Mulheres brasileiras dedicam, em média, mais que o dobro de horas semanais que os homens a tarefas domésticas e de cuidado não remunerado. Esse tempo equivale a uma jornada extra que reduz oportunidades de estudo, lazer, ascensão profissional e acesso à previdência.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Silvia Federici, "O ponto zero da revolução" (2018)',
      conteudo:
        'Para a historiadora Silvia Federici, o trabalho doméstico foi naturalizado como "amor" e "vocação feminina" justamente para que pudesse ser extraído sem custo — uma das maiores transferências silenciosas de valor da história moderna.',
    },
  ],

  // ── ENEM 2022 — Comunidades e povos tradicionais ─────────────────────────
  4: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Indígenas, quilombolas, ribeirinhos, caiçaras, geraizeiros: comunidades tradicionais ocupam o Brasil há séculos e são responsáveis por preservar parcelas decisivas dos biomas, das línguas e dos saberes que constituem o país. Reconhecer seus territórios e modos de vida é proteger também o patrimônio coletivo brasileiro.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de IBGE/Funai/Imazon',
      conteudo:
        'As terras indígenas demarcadas — cerca de 13% do território nacional — estão entre as áreas mais bem preservadas da Amazônia. Onde há demarcação efetiva e fiscalização, o desmatamento é várias vezes menor que nas regiões adjacentes.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Ailton Krenak, "Ideias para adiar o fim do mundo" (2019)',
      conteudo:
        'Ailton Krenak alerta: a humanidade se desligou da Terra ao se imaginar como espécie separada da natureza. Para os povos originários, ao contrário, território, espiritualidade e vida são uma só trama — e qualquer projeto de futuro precisa partir dessa lição.',
    },
  ],

  // ── ENEM 2021 — Registro civil e cidadania ───────────────────────────────
  5: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Sem certidão de nascimento, uma pessoa é juridicamente invisível: não consegue matricular-se em escola, acessar o SUS de modo regular, abrir conta bancária, votar, casar ou comprar um imóvel. O registro civil é a porta de entrada para todos os outros direitos — e milhões de brasileiros ainda atravessam a vida sem ela.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de IBGE/CRC Nacional',
      conteudo:
        'Estima-se que cerca de 3 milhões de brasileiros vivam sem qualquer documento de identificação. A subnotificação é maior nas regiões Norte e Nordeste, em comunidades rurais e entre populações em situação de rua.',
    },
    {
      tipo: 'citacao',
      fonte: 'Hannah Arendt, "Origens do totalitarismo" (1951)',
      conteudo:
        '"O primeiro direito humano é o direito a ter direitos." Arendt formulou essa ideia ao analisar a condição de apátridas no século XX — e ela continua iluminando o problema de quem, sem documento, é excluído da própria categoria de cidadão.',
    },
  ],

  // ── UERJ 2025 — Estado, religião e corpo feminino ────────────────────────
  7: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'A laicidade do Estado moderno foi conquistada como garantia de que nenhuma fé pudesse impor-se às demais — nem à liberdade individual. Quando políticas públicas sobre o corpo feminino passam a se justificar por princípios religiosos específicos, esse pacto se rompe, e a autonomia das mulheres deixa de ser direito para tornar-se concessão.',
    },
    {
      tipo: 'citacao',
      fonte: 'Simone de Beauvoir, "O segundo sexo" (1949)',
      conteudo:
        '"Não se nasce mulher, torna-se mulher." Beauvoir denuncia, com essa frase, o caráter construído — e portanto contestável — dos papéis impostos ao corpo feminino por instituições culturais, religiosas e jurídicas.',
    },
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Em vários países, debates sobre aborto, contracepção, vestimenta e direitos reprodutivos são ciclicamente reabertos com base em justificativas religiosas. A história mostra que, quando o Estado adota a moral de um credo, perde a capacidade de proteger igualmente cidadãs de todas as crenças — inclusive as de nenhuma.',
    },
  ],

  // ── UERJ 2024 — "O menino do pijama listrado" ────────────────────────────
  8: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'O romance de John Boyne acompanha Bruno, filho de oficial nazista, e Shmuel, prisioneiro judeu de um campo de concentração, separados apenas por uma cerca. A inocência das crianças expõe o absurdo da fronteira que os adultos construíram: a desumanização do outro nunca é natural — é ensinada.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Hannah Arendt, "Eichmann em Jerusalém" (1963)',
      conteudo:
        'Hannah Arendt cunhou a expressão "banalidade do mal" ao acompanhar o julgamento de Adolf Eichmann: o horror nazista, escreveu ela, foi executado por homens comuns que apenas "cumpriam ordens" — uma advertência sobre o que acontece quando se delega o pensar.',
    },
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'A literatura sobre o Holocausto — de Primo Levi a Anne Frank — insiste em um mesmo gesto: dar rosto e nome a quem o regime tentou reduzir a número. Lembrar é resistir; e a empatia, embora frágil, é o primeiro antídoto contra a desumanização do outro.',
    },
  ],

  // ── UERJ 2023 — Resistência ao destino socialmente estabelecido ──────────
  9: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Onde se nasce, em que família, com que cor de pele, em que gênero — a sociedade transforma esses dados em prognósticos. Mas a história é também o registro de pessoas que recusaram esse roteiro: figuras anônimas e célebres que, ao se opor ao destino que lhes foi atribuído, alargaram o que se entende por humanidade.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Pierre Bourdieu, "A reprodução" (1970)',
      conteudo:
        'O sociólogo Pierre Bourdieu mostrou como instituições como a escola tendem a reproduzir as desigualdades em vez de corrigi-las — convertendo origem social em mérito individual. Resistir a essa engrenagem é, em si, um ato político.',
    },
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Carolina Maria de Jesus, catadora de papel da favela do Canindé, escreveu em diários o que se esperaria que ela jamais escrevesse — e tornou-se uma das vozes mais singulares da literatura brasileira. Sua trajetória mostra que romper com o destino socialmente estabelecido é também um gesto de afirmação da própria humanidade.',
    },
  ],

  // ── UERJ 2022 — "Certeza não é verdade" ──────────────────────────────────
  10: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Estamos certos do que sabemos? A história do conhecimento humano é também a história de certezas inabaláveis que se revelaram falsas — da Terra plana ao geocentrismo, do flogisto à frenologia. A humildade epistêmica nasce justamente desse aprendizado: distinguir convicção subjetiva de verdade factual é tarefa permanente.',
    },
    {
      tipo: 'citacao',
      fonte: 'Sócrates, conforme registrado por Platão na "Apologia"',
      conteudo:
        '"Sei que nada sei." A formulação atribuída a Sócrates não é uma confissão de ignorância passiva, mas o ponto de partida de toda investigação séria: reconhecer os limites do próprio saber para poder, então, perguntar.',
    },
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Em uma sociedade saturada de informação, a confiança apressada em "fontes" e o apego à própria certeza alimentam bolhas, fake news e polarização. Conduzir a vida pública e privada com base no princípio "certeza não é verdade" é, antes de tudo, recusar a tirania da própria opinião.',
    },
  ],

  // ── ENEM 2020 oficial impresso — Estigma das doenças mentais ─────────────
  6: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'O sofrimento psíquico afeta uma parcela enorme da população brasileira, mas continua cercado de tabu. Quem convive com depressão, ansiedade ou esquizofrenia muitas vezes evita buscar ajuda por medo do julgamento — e o adoecimento se cronifica num silêncio que produz mais dor do que a própria doença.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de OMS/Ministério da Saúde',
      conteudo:
        'Cerca de 1 em cada 4 brasileiros enfrentará algum transtorno mental ao longo da vida. Apesar da prevalência, o investimento público em saúde mental representa menos de 3% do orçamento total da saúde, e a Rede de Atenção Psicossocial sofre com escassez de profissionais e leitos.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Michel Foucault, "História da Loucura" (1961)',
      conteudo:
        'Foucault mostrou como a "loucura" foi historicamente isolada da convivência social: encarcerada em hospitais e manicômios, deslocada do mundo comum. Combater o estigma exige reverter essa lógica — reconhecer o sofrimento mental como parte da condição humana, não como exceção a ser escondida.',
    },
  ],

  // ── ENEM 2020 digital — Desigualdades regionais ──────────────────────────
  29: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'O Brasil é um país no qual cabem muitos países: o IDH de bairros nobres de São Paulo aproxima-se de nações desenvolvidas, enquanto regiões do interior do Maranhão e do Pará apresentam indicadores próximos aos de países em conflito. Essa disparidade se manifesta em saúde, escolaridade, renda e infraestrutura — e está na raiz das migrações internas e da formação das periferias urbanas.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de IBGE/Atlas do Desenvolvimento Humano',
      conteudo:
        'As cinco regiões brasileiras apresentam diferenças expressivas: o IDH médio do Sudeste e do Sul ultrapassa 0,75, enquanto o do Norte e do Nordeste fica abaixo de 0,70. A renda per capita do estado mais rico chega a ser quatro vezes superior à do mais pobre.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Celso Furtado, "Formação Econômica do Brasil" (1959)',
      conteudo:
        'O economista Celso Furtado mostrou que a desigualdade entre regiões brasileiras não é fruto de "atraso natural", mas resultado histórico de uma economia colonial que concentrou capital e infraestrutura no Sudeste enquanto extraía riqueza das demais regiões.',
    },
  ],

  // ── ENEM 2019 — Democratização do acesso ao cinema ───────────────────────
  30: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'O cinema é arte, indústria e ferramenta de educação cultural — mas seu acesso no Brasil continua privilegiado. Quem mora em capital, frequenta shopping e tem renda média paga pela sessão; quem mora num município pequeno do interior pode passar a vida sem entrar numa sala. Democratizar o cinema é também democratizar a imaginação coletiva sobre o país.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de Ancine',
      conteudo:
        'Cerca de 90% dos municípios brasileiros não possuem nenhuma sala de cinema. As salas existentes concentram-se em shoppings de capitais e cidades médias, e o ingresso médio compromete parcela significativa do salário mínimo brasileiro.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Glauber Rocha, "Estética da Fome" (1965)',
      conteudo:
        'Glauber Rocha defendia um cinema brasileiro que pertencesse ao povo brasileiro: feito a partir das contradições do país e visto pelas pessoas que ele retrata. Sem acesso, o cinema nacional volta-se a um público restrito e perde sua função de espelhar a sociedade que o produz.',
    },
  ],

  // ── UERJ 2021 — A mentira programada como arma política ──────────────────
  31: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Diferente do erro pontual ou da omissão, a mentira programada é estratégica: produzida em escala, distribuída por algoritmos, calculada para mobilizar emoções antes que a refutação chegue. Sua finalidade não é convencer, mas saturar — confundir o eleitor a ponto de tornar a verdade indistinguível do boato. É nesse caos que regimes autoritários historicamente prosperam.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Hannah Arendt, "Verdade e Política" (1967)',
      conteudo:
        'Arendt advertiu que a mentira sistemática, quando se torna política de Estado, não apenas distorce fatos — destrói o próprio chão da convivência democrática. Quando todos mentem o tempo todo, escreveu ela, o resultado não é que se acredite na mentira, mas que ninguém mais acredite em coisa alguma.',
    },
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Na era das redes sociais, a desinformação ganhou velocidade industrial: vídeos manipulados, áudios fabricados e narrativas falsas circulam em segundos por grupos fechados. Combatê-la exige não censura — que é remédio pior que a doença — mas educação midiática, transparência algorítmica e responsabilização das plataformas.',
    },
  ],

  // ── UERJ 2020 — Fabiano e a internalização da inferioridade ──────────────
  32: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'No romance de Graciliano Ramos, Fabiano se considera "um bicho" — repete a frase como quem repete uma sentença ouvida muitas vezes. Não é a pobreza material que o convence dessa inferioridade, mas o conjunto de palavras, gestos, instituições e silêncios que, durante toda a vida, lhe disseram que ele não pertence ao mundo dos "homens".',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Frantz Fanon, "Pele negra, máscaras brancas" (1952)',
      conteudo:
        'Fanon descreveu o processo pelo qual sujeitos colonizados internalizam o olhar do colonizador: passam a se ver com os olhos do outro, a desejar a brancura, a desprezar a si mesmos. A "inferioridade" não é fato biológico — é cicatriz de uma violência simbólica repetida.',
    },
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Pierre Bourdieu chamaria de "violência simbólica" o que Fabiano experimenta: poder que não precisa de força bruta para se exercer, porque seu efeito principal é convencer o dominado de que a dominação é justa, natural ou merecida. Romper com isso exige, antes de qualquer mudança material, recuperar a fala — dizer-se, nomear-se, recusar a definição que o outro impôs.',
    },
  ],

  // ── UERJ 2019 — Crime para vingar crime ──────────────────────────────────
  33: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'A história humana é cheia de vinganças que se repetem por gerações: em Verona, na Sicília, em comunidades onde o Estado se ausenta. A vingança parece justa para quem a executa — mas, na verdade, apenas adia o crime: troca um corpo por outro corpo, sem reparar o sofrimento original.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Norberto Bobbio, "A Era dos Direitos" (1990)',
      conteudo:
        'Bobbio defendia que o monopólio da força pelo Estado é a conquista civilizatória que separa a ordem democrática do estado de natureza. Quando o cidadão decide "fazer justiça com as próprias mãos", retorna-se a uma lógica de retaliação infinita — em que cada gesto produz o próximo.',
    },
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'O dilema permanece: quando o Estado falha em punir, a vingança privada parece tentadora. Mas essa tentação é o que regimes autoritários exploram para justificar arbitrariedade — milícias, linchamentos, execuções sumárias. A resposta não é abandonar a justiça formal, mas exigir que ela funcione para todos.',
    },
  ],

  // ── TEMAS GERAIS 2026 — PROPOSTAS CONTEMPORÂNEAS ─────────────────────────

  // 11 — IA e futuro do trabalho ───────────────────────────────────────────
  11: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'A inteligência artificial generativa começou a transformar não apenas trabalhos manuais, mas profissões cognitivas — direito, jornalismo, design, medicina, programação. A questão deixou de ser "quando seremos automatizados" para "como redistribuir o ganho de produtividade que a automação gera, sem condenar trabalhadores ao desemprego estrutural".',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de relatórios da OIT/McKinsey',
      conteudo:
        'Estima-se que entre 25% e 40% das tarefas executadas por trabalhadores brasileiros possam ser automatizadas pela IA generativa nos próximos dez anos. O impacto distribui-se de forma desigual: profissões intelectuais de classe média serão tão afetadas quanto funções operacionais.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Yuval Harari, "21 Lições para o Século 21" (2018)',
      conteudo:
        'Harari adverte que a IA não criará apenas desemprego, mas uma nova classe social: os "irrelevantes" — pessoas cuja força de trabalho deixou de ser economicamente útil. Evitar esse cenário exigirá repensar educação, renda básica e o próprio sentido do trabalho humano.',
    },
  ],

  // 12 — Saúde mental da juventude e redes sociais ─────────────────────────
  12: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Adolescentes da geração Z chegaram à idade adulta com um celular nas mãos desde os 11 anos — vivem mediados por algoritmos que medem cada deslize de atenção. Em troca dessa hiperconexão, recebem ansiedade comparativa, distorção de imagem corporal, fragmentação do sono e uma sensação difusa de inadequação. As estatísticas de transtornos mentais juvenis cresceram em paralelo direto à popularização das plataformas.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de OMS/Ministério da Saúde',
      conteudo:
        'Casos de ansiedade e depressão entre jovens brasileiros de 14 a 24 anos cresceram mais de 30% na última década. Pesquisas recentes vinculam o aumento ao uso intensivo de redes sociais visuais, especialmente entre meninas adolescentes.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Byung-Chul Han, "Sociedade do Cansaço" (2010)',
      conteudo:
        'Para o filósofo Byung-Chul Han, a sociedade contemporânea não é mais disciplinar — é de desempenho. O sujeito não é vigiado por outros; vigia a si mesmo, exige de si rendimento permanente. Daí a epidemia de burnout, ansiedade e depressão entre os mais jovens.',
    },
  ],

  // 13 — Crise climática e gerações futuras ────────────────────────────────
  13: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'As enchentes do Rio Grande do Sul em 2024, as ondas de calor inéditas no Sudeste, a estiagem na Amazônia e os incêndios no Pantanal não são eventos isolados — são manifestações conectadas de uma crise climática que deixou de ser hipótese futura e tornou-se realidade presente. A geração que decidir agir nesta década definirá o que sobra para as próximas.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de relatórios do IPCC',
      conteudo:
        'Para limitar o aquecimento global a 1,5 °C — patamar a partir do qual eventos extremos se tornam mais frequentes e severos —, as emissões globais precisariam cair pela metade até 2030. No ritmo atual, o orçamento de carbono compatível com essa meta deve esgotar-se ainda nesta década.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Ailton Krenak, "Ideias para adiar o fim do mundo" (2019)',
      conteudo:
        'Krenak alerta que a "humanidade" que se imaginava à parte da natureza está colhendo o resultado dessa cisão. Adiar o fim do mundo exige reaprender com povos originários a viver dentro do planeta, não sobre ele.',
    },
  ],

  // 14 — Desinformação e polarização política ──────────────────────────────
  14: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Em sociedades democráticas, o desacordo é saudável — mas o desacordo exige um chão comum de fatos. Quando cada bolha algorítmica passa a habitar uma versão diferente da realidade, a conversa pública dá lugar à guerra cultural permanente, e o adversário deixa de ser interlocutor para tornar-se inimigo.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de pesquisas Reuters/Datafolha',
      conteudo:
        'Mais de 60% dos brasileiros declaram já ter sido expostos a notícias falsas durante períodos eleitorais. Apenas uma fração consegue identificar a manipulação no momento em que a recebe; a maioria descobre depois — quando o conteúdo já cumpriu seu papel.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Eli Pariser, "O Filtro Invisível" (2011)',
      conteudo:
        'O ativista Eli Pariser cunhou o termo "filtro bolha" para descrever o efeito dos algoritmos personalizados: cada usuário recebe um recorte do mundo afinado às suas inclinações prévias e gradualmente perde contato com pontos de vista divergentes. O custo dessa comodidade é a fragmentação do espaço público.',
    },
  ],

  // 15 — Trabalho por aplicativo e precarização ────────────────────────────
  15: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Motoristas e entregadores de aplicativos compõem um exército de trabalhadores formalmente "autônomos" e materialmente vulneráveis: não têm férias, 13°, FGTS, previdência nem garantia mínima de remuneração. Quando o algoritmo decide reduzir tarifas, eles reduzem; quando o cliente reclama injustamente, eles perdem o cadastro. A "flexibilidade" oferecida pela plataforma traduz-se, na prática, na transferência integral do risco para quem pedala ou dirige.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de IBGE/PNAD Contínua',
      conteudo:
        'Estima-se que mais de 1,5 milhão de brasileiros trabalhem regularmente para plataformas digitais como motoristas, entregadores ou prestadores de serviços. A média de horas trabalhadas excede 50 por semana — e a renda líquida, descontados combustível e manutenção, frequentemente fica abaixo do salário mínimo.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Ricardo Antunes, "O privilégio da servidão" (2018)',
      conteudo:
        'O sociólogo Ricardo Antunes descreve o "uberismo" como nova forma de superexploração: o trabalhador se vê como "empreendedor de si mesmo", mas opera sob controle algorítmico tão rígido quanto o do chão de fábrica fordista — sem nenhuma das proteções conquistadas pelas lutas operárias do século XX.',
    },
  ],

  // 16 — Envelhecimento e previdência ──────────────────────────────────────
  16: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'O Brasil envelhece em ritmo acelerado, mas seu sistema previdenciário foi desenhado num país jovem. Quando a relação entre contribuintes ativos e aposentados se inverte, a sustentabilidade do sistema depende de escolhas coletivas: aumentar a idade mínima, reformular alíquotas, criar fundos complementares ou revisar a proteção a quem não pôde contribuir o suficiente.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de IBGE/IPEA',
      conteudo:
        'A relação entre trabalhadores ativos e aposentados era de cerca de 8 para 1 nos anos 1990. Projeta-se que, em 2050, será inferior a 2 para 1 — pressionando previdência, saúde pública e o cuidado familiar com idosos dependentes.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Simone de Beauvoir, "A velhice" (1970)',
      conteudo:
        'Beauvoir denuncia: o tratamento que uma sociedade dispensa aos seus velhos revela, com brutal clareza, o que ela realmente pensa do ser humano. Onde o idoso é descartado quando deixa de produzir, é a ideia de dignidade que está em causa.',
    },
  ],

  // 17 — Inclusão de pessoas neurodivergentes ──────────────────────────────
  17: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Autismo, TDAH, dislexia e outras formas de neurodivergência não são doenças a serem curadas — são modos diferentes de processar o mundo. O capacitismo estrutural, contudo, exige que escolas, empresas e cidades funcionem segundo um padrão neurotípico, e penaliza quem dele se desvia. Inclusão real não é tolerar o diferente; é redesenhar ambientes para que diferenças não virem desvantagens.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de Ministério da Saúde/CDC',
      conteudo:
        'Estima-se que cerca de 2% da população brasileira esteja no espectro autista, e que entre 5% e 10% das crianças apresentem TDAH. Mesmo com avanços diagnósticos, o acesso a terapias multidisciplinares pelo SUS é desigual, e o mercado de trabalho ainda contrata muito aquém do potencial dessa população.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Paulo Freire, "Pedagogia do Oprimido" (1968)',
      conteudo:
        'Freire defendia que toda educação genuína parte do reconhecimento da diferença, não de seu apagamento. Aplicar essa lição às pessoas neurodivergentes significa abandonar a pedagogia que padroniza e adotar uma que se adapta a múltiplos modos de aprender, comunicar e existir.',
    },
  ],

  // 18 — Crise hídrica nas cidades ─────────────────────────────────────────
  18: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Apesar de concentrar mais de 12% da água doce do planeta, o Brasil convive com crises hídricas recorrentes em suas grandes cidades. A combinação entre desmatamento, mudança climática, perdas em redes deterioradas e consumo desigual cria o paradoxo de cidadãos racionados em meio à abundância continental.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de Trata Brasil/SNIS',
      conteudo:
        'Cerca de 35 milhões de brasileiros ainda não têm acesso a água tratada, e quase metade da população vive sem coleta adequada de esgoto. Nas redes urbanas, mais de um terço da água tratada é perdida em vazamentos antes de chegar às torneiras.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Aldo Leopold, "Almanaque de uma região arenosa" (1949)',
      conteudo:
        'Leopold defendeu uma "ética da terra": tratar solo, água e biodiversidade não como recursos a serem explorados, mas como comunidade da qual fazemos parte. Sem essa mudança de perspectiva, a crise hídrica é apenas o sintoma — não a causa.',
    },
  ],

  // 19 — Migração climática e refugiados ───────────────────────────────────
  19: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'O Brasil tornou-se rota e destino de fluxos migratórios diversos: venezuelanos fugindo do colapso econômico, haitianos vítimas de desastres ambientais, ucranianos deslocados pela guerra, bolivianos buscando trabalho. A cada novo grupo, repete-se o teste: a Constituição de 1988 garante acolhimento, mas a sociedade nem sempre responde à altura desse compromisso.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de ACNUR/Polícia Federal',
      conteudo:
        'Mais de 700 mil estrangeiros solicitaram refúgio ou residência humanitária no Brasil na última década. A operação Acolhida, que recepciona venezuelanos em Roraima, é referência internacional, mas convive com tensões locais e oferta limitada de moradia, emprego e saúde.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Hannah Arendt, "Origens do totalitarismo" (1951)',
      conteudo:
        'Arendt observou que o refugiado é a figura que revela a fragilidade dos direitos humanos: quem perde sua nação descobre que "direitos universais" só valem quando algum Estado se compromete a garanti-los. Acolher é, portanto, afirmar que ser humano basta para ter direitos.',
    },
  ],

  // 20 — Privacidade digital e vigilância algorítmica ──────────────────────
  20: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Cada clique, cada localização, cada compra deixa um rastro que é coletado, organizado e vendido. As maiores empresas do mundo enriqueceram não vendendo produtos, mas vendendo nossa atenção e nossos perfis comportamentais. A LGPD foi um avanço, mas a regulação corre atrás de tecnologias que mudam a cada ciclo de meses.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de relatórios da ANPD/Internet Lab',
      conteudo:
        'Pesquisas indicam que aplicativos populares de mensagens, transporte e redes sociais coletam, em média, dezenas de tipos diferentes de dados pessoais por usuário. A maioria das pessoas concorda com termos de uso sem lê-los — porque, na prática, recusar significaria abandonar serviços essenciais.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Shoshana Zuboff, "A era do capitalismo de vigilância" (2019)',
      conteudo:
        'Zuboff descreve uma economia em que o "produto" não é o serviço gratuito que usamos — somos nós, nossos comportamentos previstos e moldados. A privacidade deixa de ser questão individual para tornar-se questão de poder: quem detém os dados detém a capacidade de prever e influenciar decisões coletivas.',
    },
  ],

  // 21 — Cultura pop brasileira e identidade nacional ──────────────────────
  21: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'O funk carioca, o rap paulista, o sertanejo universitário, o piseiro nordestino, o cinema de quebrada e a literatura periférica deslocaram, nas últimas décadas, o centro cultural do Brasil. Onde o cânone via apenas violência ou folclore, surgiu um arquivo riquíssimo de invenções narrativas, sonoras e estéticas — disputando, com sucesso crescente, o que significa ser brasileiro hoje.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de Spotify/Sebrae/Ancine',
      conteudo:
        'O funk e o sertanejo lideram, há anos, as listas dos gêneros mais consumidos no Brasil em plataformas digitais. Filmes brasileiros sobre realidades periféricas, como "Cidade de Deus" e "Bacurau", obtêm reconhecimento internacional crescente, ressignificando a imagem do país no exterior.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Stuart Hall, "A identidade cultural na pós-modernidade" (1992)',
      conteudo:
        'Para Stuart Hall, identidades culturais não são essências fixas — são processos em disputa, narrados e renarrados. O que a cultura pop periférica brasileira faz é justamente isso: tomar o microfone, contar a si mesma e recusar o lugar reservado por outros.',
    },
  ],

  // 22 — Insegurança alimentar e fome ──────────────────────────────────────
  22: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'O Brasil já foi celebrado por sair do Mapa da Fome da ONU em 2014 — e voltou a integrá-lo poucos anos depois. A insegurança alimentar grave, em que famílias passam fome regularmente, atinge milhões de brasileiros, sobretudo nas periferias urbanas, no interior nordestino e entre populações rurais e indígenas. Em um país que é um dos maiores produtores de alimentos do mundo, a fome é estritamente uma escolha política.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de Rede PENSSAN/IBGE',
      conteudo:
        'Pesquisas recentes apontam que mais de 30 milhões de brasileiros convivem com algum nível de insegurança alimentar grave. Domicílios chefiados por mulheres negras com filhos são desproporcionalmente afetados, refletindo desigualdades de raça, gênero e território.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Josué de Castro, "Geografia da Fome" (1946)',
      conteudo:
        'O médico e geógrafo Josué de Castro mostrou que a fome no Brasil nunca foi resultado da escassez, mas da forma como a produção, a propriedade e a distribuição de alimentos foram organizadas. Combatê-la é problema de justiça, não de tecnologia agrícola.',
    },
  ],

  // 23 — Fast fashion e sustentabilidade ───────────────────────────────────
  23: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Coleções que mudam a cada duas semanas, peças vendidas a preço de lanche, marcas globais que produzem milhões de roupas por ano: a indústria fast fashion fez da moda um item descartável. Por trás dos preços baixos, há trabalho análogo à escravidão em fábricas asiáticas, montanhas de tecido em aterros e uma das pegadas de carbono mais altas de qualquer indústria de consumo.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de relatórios da ONU Meio Ambiente/Greenpeace',
      conteudo:
        'A indústria têxtil é responsável por cerca de 10% das emissões globais de CO₂ — mais que aviação e transporte marítimo somados — e por aproximadamente 20% da poluição industrial das águas no planeta. Estima-se que mais de 90 milhões de toneladas de roupas vão parar em lixões a cada ano.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Naomi Klein, "Sem Logo" (1999)',
      conteudo:
        'Naomi Klein já denunciava, há mais de duas décadas, a engrenagem global da moda barata: marcas com sede em países ricos terceirizam produção em países pobres, captam o valor da imagem e externalizam custos ambientais e humanos. Consumir conscientemente é resistir ativamente a essa lógica.',
    },
  ],

  // 24 — Violência contra a mulher e feminicídio ───────────────────────────
  24: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'A Lei Maria da Penha (2006) e a Lei do Feminicídio (2015) marcaram avanços jurídicos importantes — mas o Brasil continua entre os países que mais matam mulheres por sua condição de gênero. A violência doméstica não é "questão privada": é desfecho previsível de uma cultura que naturaliza posse, ciúme e controle masculinos sobre o corpo e a vida das mulheres.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de Fórum Brasileiro de Segurança Pública',
      conteudo:
        'Mais de 1.400 mulheres são vítimas de feminicídio por ano no Brasil — uma a cada seis horas, em média. A maioria é assassinada em casa, por companheiros ou ex-companheiros, e expressou sinais anteriores de ameaça que não receberam resposta institucional adequada.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Heleieth Saffioti, "A mulher na sociedade de classes" (1969)',
      conteudo:
        'A socióloga Heleieth Saffioti foi pioneira ao analisar a violência contra mulheres como engrenagem do "patriarcado" — sistema social que precede e atravessa o capitalismo, distribuindo poder e vida segundo o gênero. Combatê-la, portanto, exige mudança cultural profunda, não apenas leis mais duras.',
    },
  ],

  // 25 — Transição energética e papel do Brasil ────────────────────────────
  25: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'O Brasil é privilegiado: vento abundante no Nordeste, irradiação solar entre as maiores do mundo, hidrelétricas instaladas, biomassa, e potencial enorme em hidrogênio verde. A pergunta não é se o país pode liderar a transição global — é se vai disputar essa posição estratégica ou continuar refém da exportação de petróleo e minério bruto, com baixo valor agregado.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de EPE/IRENA',
      conteudo:
        'A matriz elétrica brasileira já tem mais de 80% de fontes renováveis — proporção rara entre grandes economias. Ainda assim, a dependência de combustíveis fósseis no transporte e no setor industrial mantém o Brasil entre os dez maiores emissores globais de gases de efeito estufa.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Antonio Donato Nobre, "O Futuro Climático da Amazônia" (2014)',
      conteudo:
        'O cientista Antonio Nobre argumenta que o Brasil tem uma vantagem que nenhum outro país repete: floresta amazônica em pé equivale a uma máquina termodinâmica que regula o clima do continente. Proteger a floresta e investir em renováveis não é gesto ambiental — é estratégia geopolítica.',
    },
  ],

  // 26 — Educação pública e evasão pós-pandemia ────────────────────────────
  26: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'A pandemia interrompeu a escolaridade de milhões de estudantes brasileiros — e quem voltou, voltou diferente: com lacunas em alfabetização, saúde mental fragilizada, vínculos enfraquecidos com a escola. A reposição não acontece sozinha; sem investimento sistemático em recomposição da aprendizagem, o efeito de longo prazo é uma geração inteira aquém do que poderia ser.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de Inep/Saeb/UNICEF',
      conteudo:
        'Avaliações pós-pandemia indicam que parcela significativa dos alunos da rede pública brasileira retornou com desempenho em leitura e matemática inferior ao esperado para a série. A evasão escolar entre adolescentes do ensino médio cresceu, sobretudo em famílias de baixa renda.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Paulo Freire, "Pedagogia da Autonomia" (1996)',
      conteudo:
        'Para Paulo Freire, a escola pública não é apenas lugar de transmissão de conteúdos — é espaço de formação ética e política do cidadão. Quando o Estado falha em oferecê-la com qualidade, falha duplamente: aprofunda desigualdades imediatas e compromete o futuro democrático do país.',
    },
  ],

  // 27 — Cyberbullying e proteção das crianças ─────────────────────────────
  27: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'Crianças e adolescentes nasceram dentro do ambiente digital, mas raramente têm maturidade emocional para lidar com sua brutalidade: humilhações que viralizam em horas, exposição íntima sem consentimento, comunidades que normalizam o ódio. A escola tradicional ainda forma para o mundo "real", mas é no virtual que parte significativa do sofrimento dessa geração se constrói.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de SaferNet/Unicef',
      conteudo:
        'Pesquisas indicam que cerca de uma em cada três crianças e adolescentes brasileiros já viveu alguma forma de violência online — desde insultos até ameaças, perseguição ou exposição não autorizada de imagens. Apenas uma fração denuncia — por medo, vergonha ou descrença na resposta institucional.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado da Convenção da ONU sobre os Direitos da Criança (1989)',
      conteudo:
        'A Convenção, ratificada pelo Brasil, estabelece que toda criança tem direito à proteção contra qualquer forma de violência, abuso ou exploração — inclusive simbólica. Aplicar esse princípio ao ambiente digital exige co-responsabilidade entre famílias, escolas, plataformas e Estado.',
    },
  ],

  // 28 — Crise da Amazônia: soberania, sustentabilidade e povos originários ─
  28: [
    {
      tipo: 'texto',
      fonte: 'Texto adaptado',
      conteudo:
        'A Amazônia não é apenas o pulmão verde do planeta — é sistema climático que regula chuvas em todo o continente sul-americano, território de mais de 300 povos indígenas, banco genético insubstituível e fronteira geopolítica disputada. Cada hectare desmatado por garimpo, pasto ou monocultura aproxima a floresta do "ponto de não retorno" — quando ela deixa de regenerar e se converte em savana.',
    },
    {
      tipo: 'dados',
      fonte: 'Adaptado de Inpe/Prodes/Imazon',
      conteudo:
        'A taxa de desmatamento da Amazônia oscila ano a ano conforme a política ambiental vigente: caiu fortemente no início dos anos 2010, voltou a crescer no fim da década e tem-se reduzido novamente em períodos de fiscalização ativa. Áreas de garimpo ilegal cresceram mais de 600% em terras indígenas na década passada.',
    },
    {
      tipo: 'citacao',
      fonte: 'Adaptado de Davi Kopenawa, "A queda do céu" (2010)',
      conteudo:
        'O xamã yanomami Davi Kopenawa adverte: para os "brancos", a floresta é "natureza" — algo separado do humano, à disposição do mercado. Para os povos originários, é parente, é genealogia, é o que torna possível continuar respirando. Defendê-la é, primeiro, ouvir quem nunca a abandonou.',
    },
  ],
};

export function getMotivadores(temaId) {
  return textosMotivadores[temaId] || null;
}
