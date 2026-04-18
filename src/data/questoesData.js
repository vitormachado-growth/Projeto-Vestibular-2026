export const questoes = [

  // ── MATEMÁTICA (30) ──────────────────────────────────────────────────────
  { id:1, subject:'Matemática', topic:'Progressões', subtopic:'Progressão Aritmética', type:'enem', year:2022, difficulty:'medio',
    statement:'Uma academia cobra R$ 80,00 de taxa de adesão e mensalidades em PA: R$ 120,00 no 1º mês, com aumento de R$ 10,00/mês. Qual o total pago nos 6 primeiros meses (incluindo adesão)?',
    alternatives:[{id:'a',text:'R$ 870,00'},{id:'b',text:'R$ 950,00'},{id:'c',text:'R$ 1.000,00'},{id:'d',text:'R$ 1.050,00'},{id:'e',text:'R$ 1.100,00'}],
    answer:'b', explanation:'Termos: 120,130,140,150,160,170. S₆=6×(120+170)/2=870. Total=870+80=R$950,00.' },

  { id:2, subject:'Matemática', topic:'Funções', subtopic:'Função do 2º Grau', type:'uerj', year:2023, difficulty:'dificil',
    statement:'O lucro L(x) = −2x² + 40x − 150 (em R$) representa o lucro ao vender x unidades. Quantas unidades maximizam o lucro e qual é esse lucro máximo?',
    alternatives:[{id:'a',text:'5 unidades — R$ 50,00'},{id:'b',text:'10 unidades — R$ 50,00'},{id:'c',text:'10 unidades — R$ 100,00'},{id:'d',text:'20 unidades — R$ 200,00'},{id:'e',text:'15 unidades — R$ 150,00'}],
    answer:'b', explanation:'xᵥ=−40/(2×(−2))=10. L(10)=−200+400−150=R$50,00.' },

  { id:3, subject:'Matemática', topic:'Probabilidade', type:'enem', year:2021, difficulty:'facil',
    statement:'Em uma turma de 30 alunos, 18 gostam de Matemática, 15 de Português e 8 gostam das duas. Qual a probabilidade de um aluno escolhido ao acaso gostar APENAS de Matemática?',
    alternatives:[{id:'a',text:'1/5'},{id:'b',text:'1/3'},{id:'c',text:'2/5'},{id:'d',text:'7/15'},{id:'e',text:'3/5'}],
    answer:'b', explanation:'Só Matemática=18−8=10. P=10/30=1/3.' },

  { id:4, subject:'Matemática', topic:'Geometria Plana', type:'enem', year:2023, difficulty:'medio',
    statement:'A diagonal de um retângulo mede 13 cm e um dos lados mede 5 cm. Qual é a área do retângulo?',
    alternatives:[{id:'a',text:'30 cm²'},{id:'b',text:'60 cm²'},{id:'c',text:'65 cm²'},{id:'d',text:'78 cm²'},{id:'e',text:'120 cm²'}],
    answer:'b', explanation:'5²+b²=13² → b=12. Área=5×12=60 cm².' },

  { id:5, subject:'Matemática', topic:'Progressões', subtopic:'Progressão Geométrica', type:'enem', year:2022, difficulty:'facil',
    statement:'Uma bactéria dobra de quantidade a cada hora. Se às 8h havia 1 bactéria, quantas haverá às 13h?',
    alternatives:[{id:'a',text:'8'},{id:'b',text:'16'},{id:'c',text:'24'},{id:'d',text:'32'},{id:'e',text:'64'}],
    answer:'d', explanation:'PG com a₁=1 e q=2. Em 5h (de 8h a 13h): a₆=1×2⁵=32.' },

  { id:6, subject:'Matemática', topic:'Funções', subtopic:'Função do 1º Grau', type:'enem', year:2021, difficulty:'facil',
    statement:'Um serviço de entrega cobra R$ 50,00 de taxa fixa mais R$ 3,00 por km. Com um orçamento de R$ 200,00, quantos km podem ser percorridos?',
    alternatives:[{id:'a',text:'30 km'},{id:'b',text:'40 km'},{id:'c',text:'50 km'},{id:'d',text:'60 km'},{id:'e',text:'70 km'}],
    answer:'c', explanation:'50+3x=200 → 3x=150 → x=50 km.' },

  { id:7, subject:'Matemática', topic:'Logaritmos', type:'uerj', year:2023, difficulty:'medio',
    statement:'Se log₂(x) = 5, qual é o valor de x?',
    alternatives:[{id:'a',text:'5'},{id:'b',text:'10'},{id:'c',text:'16'},{id:'d',text:'32'},{id:'e',text:'64'}],
    answer:'d', explanation:'log₂(x)=5 significa x=2⁵=32.' },

  { id:8, subject:'Matemática', topic:'Análise Combinatória', subtopic:'Permutação', type:'enem', year:2022, difficulty:'medio',
    statement:'De quantas formas distintas podem ser organizados 5 livros diferentes em uma prateleira?',
    alternatives:[{id:'a',text:'24'},{id:'b',text:'60'},{id:'c',text:'100'},{id:'d',text:'120'},{id:'e',text:'240'}],
    answer:'d', explanation:'P₅=5!=5×4×3×2×1=120.' },

  { id:9, subject:'Matemática', topic:'Análise Combinatória', subtopic:'Combinação', type:'enem', year:2021, difficulty:'medio',
    statement:'De quantas formas é possível escolher uma comissão de 3 pessoas entre 8 candidatos?',
    alternatives:[{id:'a',text:'24'},{id:'b',text:'40'},{id:'c',text:'56'},{id:'d',text:'112'},{id:'e',text:'336'}],
    answer:'c', explanation:'C(8,3)=8!/(3!×5!)=(8×7×6)/6=56.' },

  { id:10, subject:'Matemática', topic:'Estatística', subtopic:'Média', type:'enem', year:2021, difficulty:'facil',
    statement:'Um aluno tirou as notas 6, 7, 8, 9 e 10 em cinco provas. Qual é sua média aritmética simples?',
    alternatives:[{id:'a',text:'7,0'},{id:'b',text:'7,5'},{id:'c',text:'8,0'},{id:'d',text:'8,5'},{id:'e',text:'9,0'}],
    answer:'c', explanation:'(6+7+8+9+10)/5=40/5=8,0.' },

  { id:11, subject:'Matemática', topic:'Funções', subtopic:'Juros Compostos (Exponencial)', type:'enem', year:2022, difficulty:'medio',
    statement:'Um capital de R$ 1.000,00 é aplicado a juros compostos de 10% ao mês. Qual será o montante após 2 meses?',
    alternatives:[{id:'a',text:'R$ 1.100,00'},{id:'b',text:'R$ 1.200,00'},{id:'c',text:'R$ 1.210,00'},{id:'d',text:'R$ 1.250,00'},{id:'e',text:'R$ 1.300,00'}],
    answer:'c', explanation:'M=1000×(1,1)²=1000×1,21=R$1.210,00.' },

  { id:12, subject:'Matemática', topic:'Funções', subtopic:'Juros Simples (1º Grau)', type:'enem', year:2020, difficulty:'facil',
    statement:'Um capital de R$ 2.000,00 é aplicado a juros simples de 5% ao mês. Qual o juro obtido em 3 meses?',
    alternatives:[{id:'a',text:'R$ 100,00'},{id:'b',text:'R$ 200,00'},{id:'c',text:'R$ 300,00'},{id:'d',text:'R$ 400,00'},{id:'e',text:'R$ 500,00'}],
    answer:'c', explanation:'J=C×i×t=2000×0,05×3=R$300,00.' },

  { id:13, subject:'Matemática', topic:'Funções', subtopic:'Porcentagem e Proporção', type:'enem', year:2020, difficulty:'facil',
    statement:'Um produto custava R$ 80,00 e teve aumento de 25%. Qual é o novo preço?',
    alternatives:[{id:'a',text:'R$ 85,00'},{id:'b',text:'R$ 90,00'},{id:'c',text:'R$ 95,00'},{id:'d',text:'R$ 100,00'},{id:'e',text:'R$ 105,00'}],
    answer:'d', explanation:'80×1,25=R$100,00.' },

  { id:14, subject:'Matemática', topic:'Geometria Espacial', subtopic:'Cubo', type:'uerj', year:2022, difficulty:'medio',
    statement:'Um cubo tem aresta de 4 cm. Qual é o seu volume?',
    alternatives:[{id:'a',text:'16 cm³'},{id:'b',text:'32 cm³'},{id:'c',text:'48 cm³'},{id:'d',text:'64 cm³'},{id:'e',text:'96 cm³'}],
    answer:'d', explanation:'V=a³=4³=64 cm³.' },

  { id:15, subject:'Matemática', topic:'Geometria Espacial', subtopic:'Cilindro', type:'enem', year:2023, difficulty:'medio',
    statement:'Um cilindro tem raio de base 5 cm e altura 8 cm. Qual é o volume? (Use π=3,14)',
    alternatives:[{id:'a',text:'200 cm³'},{id:'b',text:'314 cm³'},{id:'c',text:'502 cm³'},{id:'d',text:'628 cm³'},{id:'e',text:'785 cm³'}],
    answer:'d', explanation:'V=π×r²×h=3,14×25×8=628 cm³.' },

  { id:16, subject:'Matemática', topic:'Trigonometria', type:'enem', year:2022, difficulty:'medio',
    statement:'Em triângulo retângulo, ângulo A=30°. Se o cateto oposto mede 5 cm, qual é a hipotenusa? (sen 30°=0,5)',
    alternatives:[{id:'a',text:'5 cm'},{id:'b',text:'7,5 cm'},{id:'c',text:'10 cm'},{id:'d',text:'12 cm'},{id:'e',text:'15 cm'}],
    answer:'c', explanation:'sen 30°=oposto/hipotenusa → 0,5=5/h → h=10 cm.' },

  { id:17, subject:'Matemática', topic:'Matrizes', subtopic:'Determinantes', type:'uerj', year:2022, difficulty:'medio',
    statement:'Dada a matriz A = [[1,2],[3,4]], qual é o valor de det(A)?',
    alternatives:[{id:'a',text:'−6'},{id:'b',text:'−2'},{id:'c',text:'2'},{id:'d',text:'6'},{id:'e',text:'10'}],
    answer:'b', explanation:'det=1×4−2×3=4−6=−2.' },

  { id:18, subject:'Matemática', topic:'Matrizes', subtopic:'Sistemas Lineares', type:'enem', year:2021, difficulty:'medio',
    statement:'Resolva o sistema: 2x + y = 7 e x − y = 2. Quais são os valores de x e y?',
    alternatives:[{id:'a',text:'x=1 e y=5'},{id:'b',text:'x=2 e y=3'},{id:'c',text:'x=3 e y=1'},{id:'d',text:'x=4 e y=−1'},{id:'e',text:'x=5 e y=−3'}],
    answer:'c', explanation:'Somando: 3x=9→x=3. Substituindo: y=7−6=1.' },

  { id:19, subject:'Matemática', topic:'Funções', subtopic:'Inequações', type:'enem', year:2020, difficulty:'facil',
    statement:'Para quais valores de x a inequação 3x − 6 > 0 é verdadeira?',
    alternatives:[{id:'a',text:'x < 2'},{id:'b',text:'x ≤ 2'},{id:'c',text:'x = 2'},{id:'d',text:'x > 2'},{id:'e',text:'x ≥ 2'}],
    answer:'d', explanation:'3x>6 → x>2.' },

  { id:20, subject:'Matemática', topic:'Geometria Plana', subtopic:'Geometria Analítica', type:'uerj', year:2023, difficulty:'medio',
    statement:'Qual é a distância entre os pontos A(1, 2) e B(4, 6)?',
    alternatives:[{id:'a',text:'3'},{id:'b',text:'4'},{id:'c',text:'5'},{id:'d',text:'6'},{id:'e',text:'7'}],
    answer:'c', explanation:'d=√[(4−1)²+(6−2)²]=√[9+16]=√25=5.' },

  { id:21, subject:'Matemática', topic:'Funções', subtopic:'Função Exponencial', type:'enem', year:2023, difficulty:'medio',
    statement:'Uma cultura de bactérias segue N(t)=100×2^t. Quantas bactérias haverá após 4 horas?',
    alternatives:[{id:'a',text:'400'},{id:'b',text:'800'},{id:'c',text:'1.200'},{id:'d',text:'1.600'},{id:'e',text:'3.200'}],
    answer:'d', explanation:'N(4)=100×2⁴=100×16=1.600.' },

  { id:22, subject:'Matemática', topic:'Análise Combinatória', subtopic:'Arranjo', type:'enem', year:2022, difficulty:'medio',
    statement:'De quantas formas podem ser escolhidos e ordenados 2 alunos entre 6 para representante e vice?',
    alternatives:[{id:'a',text:'12'},{id:'b',text:'15'},{id:'c',text:'20'},{id:'d',text:'30'},{id:'e',text:'36'}],
    answer:'d', explanation:'A(6,2)=6×5=30.' },

  { id:23, subject:'Matemática', topic:'Funções', subtopic:'Potências e Raízes', type:'enem', year:2020, difficulty:'facil',
    statement:'Qual é o valor de √144 + ∛27?',
    alternatives:[{id:'a',text:'13'},{id:'b',text:'14'},{id:'c',text:'15'},{id:'d',text:'16'},{id:'e',text:'17'}],
    answer:'c', explanation:'√144=12 e ∛27=3. Soma=15.' },

  { id:24, subject:'Matemática', topic:'Estatística', subtopic:'Mediana e Moda', type:'enem', year:2021, difficulty:'facil',
    statement:'Para o conjunto {2, 3, 5, 5, 7, 9, 11}, quais são a mediana e a moda?',
    alternatives:[{id:'a',text:'Mediana=5 e Moda=5'},{id:'b',text:'Mediana=5 e Moda=3'},{id:'c',text:'Mediana=7 e Moda=5'},{id:'d',text:'Mediana=6 e Moda=5'},{id:'e',text:'Mediana=5 e Moda=7'}],
    answer:'a', explanation:'7 elementos: mediana=4º=5. Moda=5 (aparece 2x).' },

  { id:25, subject:'Matemática', topic:'Geometria Plana', subtopic:'Diagonais de Polígonos', type:'uerj', year:2023, difficulty:'medio',
    statement:'Quantas diagonais possui um hexágono regular?',
    alternatives:[{id:'a',text:'6'},{id:'b',text:'7'},{id:'c',text:'8'},{id:'d',text:'9'},{id:'e',text:'12'}],
    answer:'d', explanation:'D=n(n−3)/2=6×3/2=9.' },

  { id:26, subject:'Matemática', topic:'Funções', subtopic:'Regra de Três Composta', type:'enem', year:2022, difficulty:'medio',
    statement:'5 operários constroem um muro em 12 dias. Em quantos dias 4 operários construiriam o mesmo muro?',
    alternatives:[{id:'a',text:'10 dias'},{id:'b',text:'12 dias'},{id:'c',text:'14 dias'},{id:'d',text:'15 dias'},{id:'e',text:'18 dias'}],
    answer:'d', explanation:'Inversamente proporcional: 5×12=4×x → x=15 dias.' },

  { id:27, subject:'Matemática', topic:'Geometria Espacial', subtopic:'Cone', type:'enem', year:2023, difficulty:'medio',
    statement:'Um cone tem raio da base 6 cm e altura 8 cm. Qual é o volume? (Use π≈3)',
    alternatives:[{id:'a',text:'144 cm³'},{id:'b',text:'216 cm³'},{id:'c',text:'288 cm³'},{id:'d',text:'432 cm³'},{id:'e',text:'576 cm³'}],
    answer:'c', explanation:'V=(1/3)×π×r²×h=(1/3)×3×36×8=288 cm³.' },

  { id:28, subject:'Matemática', topic:'Geometria Espacial', subtopic:'Esfera', type:'uerj', year:2022, difficulty:'medio',
    statement:'Uma esfera tem raio 3 cm. Qual é o volume? (Use π≈3 e V=4πr³/3)',
    alternatives:[{id:'a',text:'27 cm³'},{id:'b',text:'54 cm³'},{id:'c',text:'81 cm³'},{id:'d',text:'108 cm³'},{id:'e',text:'144 cm³'}],
    answer:'d', explanation:'V=(4/3)×3×27=4×27=108 cm³.' },

  { id:29, subject:'Matemática', topic:'Funções', subtopic:'Equação do 2º Grau — Raízes', type:'enem', year:2020, difficulty:'medio',
    statement:'Quais são as raízes de x² − 5x + 6 = 0?',
    alternatives:[{id:'a',text:'x=1 e x=6'},{id:'b',text:'x=2 e x=3'},{id:'c',text:'x=−2 e x=−3'},{id:'d',text:'x=−1 e x=6'},{id:'e',text:'x=1 e x=−6'}],
    answer:'b', explanation:'Δ=25−24=1. x=(5±1)/2 → x=3 ou x=2.' },

  { id:30, subject:'Matemática', topic:'Geometria Plana', subtopic:'Semelhança de Triângulos', type:'enem', year:2021, difficulty:'medio',
    statement:'Dois triângulos semelhantes têm razão de semelhança 3:1. Se a área do triângulo menor é 4 cm², qual é a área do maior?',
    alternatives:[{id:'a',text:'12 cm²'},{id:'b',text:'18 cm²'},{id:'c',text:'24 cm²'},{id:'d',text:'36 cm²'},{id:'e',text:'48 cm²'}],
    answer:'d', explanation:'Razão das áreas=(3/1)²=9. Área maior=4×9=36 cm².' },

  // ── PORTUGUÊS (30) ───────────────────────────────────────────────────────
  { id:31, subject:'Português', topic:'Interpretação de Texto', type:'enem', year:2023, difficulty:'medio',
    statement:'"A digitalização acelerada da economia criou novas oportunidades, mas também aprofundou desigualdades estruturais. Enquanto profissões ligadas à tecnologia prosperam, trabalhadores de setores tradicionais enfrentam a obsolescência de suas habilidades sem o suporte necessário para requalificação. A transformação digital, portanto, não é um processo neutro — ela reflete e potencializa as assimetrias já existentes na sociedade."\nDe acordo com o texto, a transformação digital:',
    alternatives:[{id:'a',text:'distribui equitativamente seus benefícios por todos os setores.'},{id:'b',text:'elimina progressivamente as desigualdades ao criar novas oportunidades.'},{id:'c',text:'é um fenômeno neutro que depende da capacidade de adaptação individual.'},{id:'d',text:'aprofunda desigualdades ao não oferecer suporte para requalificação.'},{id:'e',text:'beneficia igualmente trabalhadores tecnológicos e tradicionais.'}],
    answer:'d', explanation:'O texto afirma que a transformação digital "aprofundou desigualdades" e que trabalhadores tradicionais enfrentam desafios "sem o suporte necessário", refutando as demais opções.' },

  { id:32, subject:'Português', topic:'Concordância', subtopic:'Concordância Verbal', type:'uerj', year:2022, difficulty:'medio',
    statement:'Assinale a alternativa com concordância verbal correta segundo a norma-padrão:',
    alternatives:[{id:'a',text:'"Faz muitos anos que não nos víamos."'},{id:'b',text:'"Haviam muitas pessoas esperando."'},{id:'c',text:'"Fazem três anos que me formei."'},{id:'d',text:'"Houveram vários acidentes na rodovia."'},{id:'e',text:'"Existem somente uma alternativa correta."'}],
    answer:'a', explanation:'"Fazer" (tempo decorrido) e "haver" (existência) são impessoais e ficam no singular. Só "faz" está correto.' },

  { id:33, subject:'Português', topic:'Gêneros Textuais', subtopic:'Coesão Textual', type:'enem', year:2022, difficulty:'facil',
    statement:'"As queimadas destroem ecossistemas inteiros e liberam grandes quantidades de CO₂. _______, cientistas consideram o desmatamento uma das principais causas das mudanças climáticas." O conector que estabelece relação de conclusão é:',
    alternatives:[{id:'a',text:'No entanto'},{id:'b',text:'Embora'},{id:'c',text:'Portanto'},{id:'d',text:'Desde que'},{id:'e',text:'Apesar de'}],
    answer:'c', explanation:'"Portanto" é conector conclusivo: a segunda oração conclui a partir da primeira.' },

  { id:34, subject:'Português', topic:'Interpretação de Texto', subtopic:'Texto Argumentativo', type:'enem', year:2022, difficulty:'medio',
    statement:'"A escola contemporânea enfrenta o desafio de preparar estudantes para um mundo em constante transformação, onde habilidades como pensamento crítico e criatividade valem mais do que a simples memorização de conteúdos. No entanto, os sistemas de avaliação ainda privilegiam a reprodução de informações, gerando um paradoxo pedagógico."\nO "paradoxo pedagógico" mencionado no texto refere-se ao fato de:',
    alternatives:[{id:'a',text:'a criatividade ser mais valorizada do que o pensamento crítico nas avaliações.'},{id:'b',text:'os professores não estarem preparados para ensinar habilidades do século XXI.'},{id:'c',text:'as avaliações valorizarem a memorização enquanto o mundo exige outras habilidades.'},{id:'d',text:'os estudantes rejeitarem os métodos tradicionais de ensino.'},{id:'e',text:'o mundo mudar mais lentamente do que os sistemas educacionais.'}],
    answer:'c', explanation:'O paradoxo é a contradição entre o que o mundo exige (pensamento crítico, criatividade) e o que as avaliações medem (reprodução/memorização).' },

  { id:35, subject:'Português', topic:'Regência', subtopic:'Regência Verbal', type:'uerj', year:2023, difficulty:'dificil',
    statement:'Assinale a alternativa em que a regência verbal está correta segundo a norma culta:',
    alternatives:[{id:'a',text:'"Eu assisti o filme ontem."'},{id:'b',text:'"Ela obedeceu as regras do jogo."'},{id:'c',text:'"O aluno aspirava o cargo de diretor."'},{id:'d',text:'"Nós assistimos ao espetáculo com emoção."'},{id:'e',text:'"Ele simpatizou com o novo colega" — errada.'}],
    answer:'d', explanation:'"Assistir" no sentido de presenciar é transitivo indireto (regido por "a"): "assistir a". As demais incorrem em erros de regência.' },

  { id:36, subject:'Português', topic:'Crase', type:'uerj', year:2022, difficulty:'medio',
    statement:'Em qual alternativa o uso da crase está correto?',
    alternatives:[{id:'a',text:'"Ele foi à escola cedo."'},{id:'b',text:'"Entregou o documento à ele."'},{id:'c',text:'"Viajou à Paris nas férias."'},{id:'d',text:'"Está à venda à prazo."'},{id:'e',text:'"Chegou à duas horas."'}],
    answer:'a', explanation:'"À escola" = preposição "a" + artigo definido feminino "a". Pronome pessoal (b), nome próprio estrangeiro sem artigo (c) e horas específicas exigem análise diferente.' },

  { id:37, subject:'Português', topic:'Figuras de Linguagem', subtopic:'Metáfora', type:'enem', year:2021, difficulty:'medio',
    statement:'"Minha vida é um deserto sem fim."\nA figura de linguagem presente no verso é:',
    alternatives:[{id:'a',text:'Comparação (símile)'},{id:'b',text:'Metonímia'},{id:'c',text:'Metáfora'},{id:'d',text:'Hipérbole'},{id:'e',text:'Eufemismo'}],
    answer:'c', explanation:'Metáfora: identificação direta entre termos sem conectivo comparativo. "Minha vida É um deserto" (sem "como" ou "tal qual").' },

  { id:38, subject:'Português', topic:'Figuras de Linguagem', subtopic:'Ironia', type:'enem', year:2022, difficulty:'medio',
    statement:'"Que político honestíssimo! Só desviou R$ 10 milhões dos cofres públicos."\nA figura de linguagem predominante é:',
    alternatives:[{id:'a',text:'Hipérbole'},{id:'b',text:'Eufemismo'},{id:'c',text:'Ironia'},{id:'d',text:'Antítese'},{id:'e',text:'Paradoxo'}],
    answer:'c', explanation:'Ironia: dizer o contrário do que se pensa. O elogio "honestíssimo" contradiz o desvio de dinheiro público.' },

  { id:39, subject:'Português', topic:'Gêneros Textuais', subtopic:'Variação Linguística', type:'enem', year:2023, difficulty:'medio',
    statement:'O fenômeno em que um mesmo falante usa variantes linguísticas diferentes conforme o contexto (formal/informal) é denominado:',
    alternatives:[{id:'a',text:'Preconceito linguístico'},{id:'b',text:'Diglossia'},{id:'c',text:'Variação diatópica'},{id:'d',text:'Variação diastrática'},{id:'e',text:'Neologismo'}],
    answer:'b', explanation:'Diglossia: uso de duas variedades linguísticas pelo mesmo falante em contextos diferentes (alta vs. baixa).' },

  { id:40, subject:'Português', topic:'Gêneros Textuais', type:'enem', year:2021, difficulty:'facil',
    statement:'O gênero textual que combina elementos narrativos, lirismo e humor para retratar o cotidiano de forma breve e opinativa, sendo muito publicado em jornais e revistas, é a:',
    alternatives:[{id:'a',text:'Notícia'},{id:'b',text:'Reportagem'},{id:'c',text:'Crônica'},{id:'d',text:'Editorial'},{id:'e',text:'Resenha'}],
    answer:'c', explanation:'A crônica é um gênero híbrido (narrativo + lírico + argumentativo), breve, que aborda o cotidiano com humor e lirismo.' },

  { id:41, subject:'Português', topic:'Morfologia', subtopic:'Formação de Palavras', type:'uerj', year:2022, difficulty:'medio',
    statement:'"Infelizmente" é formada por quais processos de formação?',
    alternatives:[{id:'a',text:'Derivação prefixal'},{id:'b',text:'Derivação sufixal'},{id:'c',text:'Derivação parassintética'},{id:'d',text:'Composição por justaposição'},{id:'e',text:'Composição por aglutinação'}],
    answer:'c', explanation:'"In" (prefixo) + "feliz" (radical) + "mente" (sufixo) = adição simultânea de prefixo e sufixo → derivação parassintética.' },

  { id:42, subject:'Português', topic:'Sintaxe', subtopic:'Sujeito', type:'enem', year:2020, difficulty:'medio',
    statement:'"Chove muito no inverno amazônico." O sujeito da oração é:',
    alternatives:[{id:'a',text:'Sujeito simples'},{id:'b',text:'Sujeito composto'},{id:'c',text:'Sujeito indeterminado'},{id:'d',text:'Sujeito desinencial'},{id:'e',text:'Oração sem sujeito'}],
    answer:'e', explanation:'"Chover" é verbo impessoal (fenômeno da natureza): não admite sujeito — oração sem sujeito.' },

  { id:43, subject:'Português', topic:'Sintaxe', subtopic:'Voz Verbal', type:'uerj', year:2023, difficulty:'medio',
    statement:'Transforme "O professor corrigiu as provas" para a voz passiva analítica:',
    alternatives:[{id:'a',text:'"As provas eram corrigidas pelo professor."'},{id:'b',text:'"As provas foram corrigidas pelo professor."'},{id:'c',text:'"As provas se corrigiram."'},{id:'d',text:'"Corrigiram-se as provas."'},{id:'e',text:'"O professor tinha corrigido as provas."'}],
    answer:'b', explanation:'Voz passiva analítica: sujeito paciente + verbo ser (conjugado no mesmo tempo do ativo: pretérito perfeito) + particípio + agente da passiva.' },

  { id:44, subject:'Português', topic:'Sintaxe', subtopic:'Período Composto — Orações Subordinadas', type:'uerj', year:2022, difficulty:'dificil',
    statement:'"Estudei muito para que pudesse passar no vestibular." A oração sublinhada é:',
    alternatives:[{id:'a',text:'Oração subordinada adverbial causal'},{id:'b',text:'Oração subordinada adverbial concessiva'},{id:'c',text:'Oração subordinada adverbial final'},{id:'d',text:'Oração subordinada substantiva objetiva direta'},{id:'e',text:'Oração coordenada sindética aditiva'}],
    answer:'c', explanation:'"Para que" indica finalidade/objetivo → oração subordinada adverbial final.' },

  { id:45, subject:'Português', topic:'Semântica', subtopic:'Denotação e Conotação', type:'enem', year:2021, difficulty:'facil',
    statement:'Em qual alternativa a palavra "frio" está empregada em sentido conotativo?',
    alternatives:[{id:'a',text:'"A temperatura está muito fria hoje."'},{id:'b',text:'"O gelo é frio."'},{id:'c',text:'"A recepção foi fria e distante."'},{id:'d',text:'"Guarde a carne no ambiente frio."'},{id:'e',text:'"O inverno trouxe dias frios."'}],
    answer:'c', explanation:'"Fria e distante" aplica ao comportamento humano um adjetivo de temperatura — uso figurado/conotativo.' },

  { id:46, subject:'Português', topic:'Gêneros Textuais', subtopic:'Funções da Linguagem', type:'enem', year:2022, difficulty:'medio',
    statement:'"Compre já! Oferta imperdível! Ligue agora!" A função da linguagem predominante é:',
    alternatives:[{id:'a',text:'Referencial/informativa'},{id:'b',text:'Emotiva/expressiva'},{id:'c',text:'Fática'},{id:'d',text:'Conativa/apelativa'},{id:'e',text:'Metalinguística'}],
    answer:'d', explanation:'Função conativa/apelativa: foca no receptor, busca influenciar seu comportamento. Uso de imperativo e vocativo.' },

  { id:47, subject:'Português', topic:'Interpretação de Texto', subtopic:'Intertextualidade', type:'enem', year:2023, difficulty:'medio',
    statement:'Quando um texto retoma, parodia ou cita outro texto anterior, ocorre o fenômeno da:',
    alternatives:[{id:'a',text:'Polissemia'},{id:'b',text:'Intertextualidade'},{id:'c',text:'Ambiguidade'},{id:'d',text:'Isotopia'},{id:'e',text:'Polifonia monológica'}],
    answer:'b', explanation:'Intertextualidade: relação explícita ou implícita entre um texto e outro(s) anterior(es).' },

  { id:48, subject:'Português', topic:'Concordância', subtopic:'Concordância Nominal', type:'uerj', year:2022, difficulty:'medio',
    statement:'Assinale a frase com concordância nominal correta:',
    alternatives:[{id:'a',text:'"É proibido a entrada de menores."'},{id:'b',text:'"Ela saiu meio nervosa com a situação."'},{id:'c',text:'"Os alunos ficaram satisfeitos com as notas."'},{id:'d',text:'"As portas estavam bastante abertos."'},{id:'e',text:'"Precisamos de bastante informações."'}],
    answer:'c', explanation:'"Satisfeitos" concorda com "alunos" (masc. pl.) — correto. "Proibido" deve concordar com "entrada" (b→c é correto, a está errado), "abertos" com "portas" (errado, deveria ser "abertas").' },

  { id:49, subject:'Português', topic:'Figuras de Linguagem', subtopic:'Hipérbole e Eufemismo', type:'enem', year:2020, difficulty:'facil',
    statement:'"Ele foi para um lugar melhor." A figura de linguagem usada para suavizar a ideia de morte é:',
    alternatives:[{id:'a',text:'Hipérbole'},{id:'b',text:'Ironia'},{id:'c',text:'Antítese'},{id:'d',text:'Eufemismo'},{id:'e',text:'Metonímia'}],
    answer:'d', explanation:'Eufemismo: uso de expressão mais suave para substituir algo desagradável ou tabu (como a morte).' },

  { id:50, subject:'Português', topic:'Sintaxe', subtopic:'Colocação Pronominal', type:'uerj', year:2023, difficulty:'dificil',
    statement:'Em qual alternativa a colocação do pronome oblíquo está correta segundo a norma culta escrita?',
    alternatives:[{id:'a',text:'"Me disseram que você chegaria cedo."'},{id:'b',text:'"Não me falaram nada sobre o assunto."'},{id:'c',text:'"Ele convidou-me para a festa."'},{id:'d',text:'"Dar-te-ei a resposta amanhã."'},{id:'e',text:'Todas as alternativas estão corretas.'}],
    answer:'b', explanation:'Após palavra de negação ("não"), o pronome vem antes do verbo (próclise obrigatória): "Não me falaram" está correto.' },

  { id:51, subject:'Português', topic:'Interpretação de Texto', subtopic:'Texto Sociológico', type:'enem', year:2024, difficulty:'medio',
    statement:'"A pobreza não é apenas ausência de renda — é um estado multidimensional que abrange falta de acesso à saúde, educação, segurança e participação política. Reduzir a questão social ao aspecto econômico é simplificá-la ao ponto de tornar as políticas públicas ineficazes."\nO argumento central do texto defende que:',
    alternatives:[{id:'a',text:'a renda é o único indicador relevante para medir a pobreza.'},{id:'b',text:'políticas de renda mínima são suficientes para eliminar a desigualdade.'},{id:'c',text:'a pobreza deve ser compreendida de forma ampla, abrangendo múltiplas dimensões.'},{id:'d',text:'o acesso à educação é mais importante do que o acesso à saúde.'},{id:'e',text:'a participação política é um luxo irrelevante para populações empobrecidas.'}],
    answer:'c', explanation:'O texto define pobreza como "estado multidimensional" e critica a redução ao aspecto econômico, defendendo uma visão abrangente.' },

  { id:52, subject:'Português', topic:'Semântica', subtopic:'Polissemia e Ambiguidade', type:'enem', year:2021, difficulty:'facil',
    statement:'A frase "Fui visitar o banco" é ambígua porque a palavra "banco" pode significar:',
    alternatives:[{id:'a',text:'assento e margem de rio.'},{id:'b',text:'instituição financeira e assento.'},{id:'c',text:'banco de dados e margem de rio.'},{id:'d',text:'instituição financeira e banco de peixes.'},{id:'e',text:'assento e banco de dados.'}],
    answer:'b', explanation:'"Banco" é polissêmica: pode ser instituição financeira ou assento. Ambas as leituras são plausíveis no contexto.' },

  { id:53, subject:'Português', topic:'Interpretação de Texto', subtopic:'Texto Filosófico', type:'enem', year:2023, difficulty:'dificil',
    statement:'"A liberdade não consiste em fazer o que se quer, mas em querer o que se faz com consciência das consequências. Agir livremente é agir de forma autônoma, orientado pela razão, não pelo impulso."\nA concepção de liberdade expressa no texto é:',
    alternatives:[{id:'a',text:'liberdade como ausência de qualquer restrição externa.'},{id:'b',text:'liberdade como obediência às leis naturais do universo.'},{id:'c',text:'liberdade como autonomia racional, agir conforme a própria consciência.'},{id:'d',text:'liberdade como satisfação irrestrita dos desejos e impulsos.'},{id:'e',text:'liberdade como submissão à autoridade legítima do Estado.'}],
    answer:'c', explanation:'O texto associa liberdade à autonomia racional ("consciência das consequências", "orientado pela razão"), típica do pensamento iluminista/kantiano.' },

  { id:54, subject:'Português', topic:'Figuras de Linguagem', subtopic:'Antítese e Paradoxo', type:'enem', year:2022, difficulty:'medio',
    statement:'"Amor é fogo que arde sem se ver; / É ferida que dói e não se sente." (Camões)\nA figura presente nesses versos é:',
    alternatives:[{id:'a',text:'Eufemismo'},{id:'b',text:'Hipérbole'},{id:'c',text:'Antítese / Paradoxo'},{id:'d',text:'Metonímia'},{id:'e',text:'Catacrese'}],
    answer:'c', explanation:'Antítese/paradoxo: "arde sem se ver", "dói e não se sente" — ideias opostas e contraditórias expressas no mesmo verso.' },

  { id:55, subject:'Português', topic:'Gêneros Textuais', subtopic:'Texto Dissertativo — Estrutura', type:'enem', year:2021, difficulty:'medio',
    statement:'Em um texto dissertativo-argumentativo, a parte do texto que retoma a tese e propõe soluções para o problema discutido é:',
    alternatives:[{id:'a',text:'Introdução'},{id:'b',text:'Desenvolvimento — 1º parágrafo'},{id:'c',text:'Desenvolvimento — 2º parágrafo'},{id:'d',text:'Conclusão'},{id:'e',text:'Repertório sociocultural'}],
    answer:'d', explanation:'A conclusão retoma a tese (síntese), podendo incluir proposta de intervenção — exigência da redação do ENEM.' },

  { id:56, subject:'Português', topic:'Sintaxe', subtopic:'Pronome Relativo', type:'uerj', year:2022, difficulty:'dificil',
    statement:'"O livro _____ li na semana passada foi excelente." Qual pronome relativo preenche corretamente a lacuna?',
    alternatives:[{id:'a',text:'quem'},{id:'b',text:'onde'},{id:'c',text:'cujo'},{id:'d',text:'que'},{id:'e',text:'o qual — com preposição "de"'}],
    answer:'d', explanation:'"Que" é o pronome relativo mais usado para substituir coisas: "o livro que li". "Quem" refere-se a pessoas; "cujo" indica posse.' },

  { id:57, subject:'Português', topic:'Interpretação de Texto', subtopic:'Crônica', type:'enem', year:2020, difficulty:'facil',
    statement:'"Toda manhã é uma batalha: o tráfego como inimigo, o relógio como algoz, o café frio como traição. Chegamos ao trabalho já derrotados, prontos para uma reunião sobre produtividade."\nO recurso estilístico que aproxima o texto cotidiano da linguagem épica é:',
    alternatives:[{id:'a',text:'O vocabulário técnico e formal da crônica.'},{id:'b',text:'O uso de metáforas bélicas para situações triviais (batalha, inimigo, algoz).'},{id:'c',text:'A estrutura narrativa em terceira pessoa.'},{id:'d',text:'A ausência de pontuação expressiva no trecho.'},{id:'e',text:'A descrição realista e objetiva do cotidiano.'}],
    answer:'b', explanation:'A crônica usa linguagem épica (batalha, inimigo, algoz, traição) para o mundano — recurso que cria efeito irônico e humorístico.' },

  { id:58, subject:'Português', topic:'Morfologia', subtopic:'Fonética — Encontros Vocálicos', type:'uerj', year:2023, difficulty:'medio',
    statement:'Em qual alternativa há um ditongo decrescente?',
    alternatives:[{id:'a',text:'"Teatro" — te-a-tro'},{id:'b',text:'"Saúde" — sa-ú-de'},{id:'c',text:'"Pai" — pai'},{id:'d',text:'"Ideia" — i-dei-a'},{id:'e',text:'"Cão" — cão'}],
    answer:'c', explanation:'"Pai" tem ditongo decrescente: vogal + semivogal (a+i) na mesma sílaba, com a vogal mais forte no início.' },

  { id:59, subject:'Português', topic:'Interpretação de Texto', subtopic:'Divulgação Científica', type:'enem', year:2024, difficulty:'medio',
    statement:'"Pesquisas recentes demonstram que o sono inadequado compromete funções cognitivas como memória, atenção e tomada de decisão. Adolescentes privados de sono apresentam desempenho escolar inferior e maior vulnerabilidade a transtornos mentais. Os dados reforçam a importância de políticas que protejam o sono dos jovens."\nO objetivo central do texto é:',
    alternatives:[{id:'a',text:'narrar a experiência de jovens com distúrbios de sono.'},{id:'b',text:'descrever o funcionamento do cérebro durante o sono.'},{id:'c',text:'argumentar a favor de políticas públicas de proteção ao sono dos adolescentes.'},{id:'d',text:'questionar a validade das pesquisas sobre sono e adolescência.'},{id:'e',text:'comparar o desempenho escolar de adolescentes de diferentes países.'}],
    answer:'c', explanation:'O texto apresenta dados de pesquisa e conclui com proposta de ação ("políticas que protejam o sono"), caracterizando um texto argumentativo.' },

  { id:60, subject:'Português', topic:'Semântica', subtopic:'Sinonímia e Antonímia', type:'enem', year:2020, difficulty:'facil',
    statement:'Qual das alternativas apresenta um par de ANTÔNIMOS (palavras de sentido oposto)?',
    alternatives:[{id:'a',text:'Belo / Formoso'},{id:'b',text:'Veloz / Rápido'},{id:'c',text:'Generoso / Mesquinho'},{id:'d',text:'Triste / Melancólico'},{id:'e',text:'Corajoso / Valente'}],
    answer:'c', explanation:'"Generoso" e "mesquinho" têm sentidos opostos → antônimos. Os demais pares são sinônimos.' },

  // ── LITERATURA (30) ──────────────────────────────────────────────────────
  { id:61, subject:'Literatura', topic:'Modernismo 1ª Fase', subtopic:'Antropofagia', type:'enem', year:2022, difficulty:'dificil',
    statement:'"Erro de Português\nQuando o português chegou / Debaixo de uma bruta chuva / Vestiu o índio / Que pena! / Fosse uma manhã de sol / O índio tinha despido / O português" — Oswald de Andrade\n\n"Vestir" e "despir" representam, respectivamente:',
    alternatives:[{id:'a',text:'fracasso da colonização e resistência armada indígena.'},{id:'b',text:'imposição cultural europeia e possibilidade de identidade cultural brasileira genuína.'},{id:'c',text:'condições climáticas tropicais e adaptação dos colonizadores.'},{id:'d',text:'assimilação voluntária dos costumes europeus pelos indígenas.'},{id:'e',text:'crítica ao catolicismo imposto pela Igreja.'}],
    answer:'b', explanation:'Poema da fase antropofágica: "vestir" = imposição cultural; "despir" = absorção crítica do estrangeiro para construir identidade nacional.' },

  { id:62, subject:'Literatura', topic:'Barroco', subtopic:'Trovadorismo (medieval)', type:'enem', year:2021, difficulty:'medio',
    statement:'As cantigas trovadorescas medievais se dividem em líricas e satíricas. Entre as satíricas, aquela que critica costumes e comportamentos da sociedade, geralmente com humor, é a:',
    alternatives:[{id:'a',text:'Cantiga de amor'},{id:'b',text:'Cantiga de amigo'},{id:'c',text:'Cantiga de escárnio'},{id:'d',text:'Cantiga de maldizer'},{id:'e',text:'Cantiga de Santa Maria'}],
    answer:'c', explanation:'Cantiga de escárnio: sátira indireta, com ironia e ambiguidade. A de maldizer é direta e explícita. As de amor e amigo são líricas.' },

  { id:63, subject:'Literatura', topic:'Barroco', subtopic:'Trovadorismo — Cantiga de Amigo', type:'uerj', year:2022, difficulty:'medio',
    statement:'A cantiga de amigo, gênero típico da lírica trovadoresca medieval portuguesa, caracteriza-se por:',
    alternatives:[{id:'a',text:'ser narrada em 1ª pessoa masculina, expressando sofrimento amoroso.'},{id:'b',text:'ser narrada em 1ª pessoa feminina, expressando saudade e ansiedade pelo amado.'},{id:'c',text:'satirizar comportamentos morais da sociedade medieval.'},{id:'d',text:'louvar as virtudes religiosas da Virgem Maria.'},{id:'e',text:'descrever batalhas e feitos heroicos dos cavaleiros.'}],
    answer:'b', explanation:'Cantiga de amigo: voz feminina que expressa saudade do amado ("amigo"). Origem popular, com refrão e paralelismo.' },

  { id:64, subject:'Literatura', topic:'Barroco', subtopic:'Humanismo — Gil Vicente', type:'enem', year:2023, difficulty:'medio',
    statement:'No "Auto da Barca do Inferno", de Gil Vicente, o personagem do Fidalgo é condenado ao Inferno porque:',
    alternatives:[{id:'a',text:'não acreditava na existência de Deus.'},{id:'b',text:'viveu na pobreza e na humildade sem praticar a caridade.'},{id:'c',text:'valorizava apenas os bens materiais e o prestígio social, sem obras de misericórdia.'},{id:'d',text:'praticou heresia e foi excomungado pela Igreja.'},{id:'e',text:'matou inocentes em guerras injustas.'}],
    answer:'c', explanation:'Gil Vicente critica a nobreza que priorizava status e riqueza. O Fidalgo vai ao Inferno por sua vaidade, apego aos bens materiais e falta de caridade.' },

  { id:65, subject:'Literatura', topic:'Barroco', subtopic:'Classicismo — Camões', type:'enem', year:2022, difficulty:'dificil',
    statement:'"Os Lusíadas", de Luís Vaz de Camões, é uma epopeia que narra:',
    alternatives:[{id:'a',text:'a história mítica da fundação de Lisboa pelos lusitanos antigos.'},{id:'b',text:'a viagem de Vasco da Gama ao redor da África rumo às Índias.'},{id:'c',text:'as guerras de Reconquista da Península Ibérica.'},{id:'d',text:'a colonização do Brasil e os conflitos com os indígenas.'},{id:'e',text:'a vida e os amores de Camões em Lisboa e no exílio.'}],
    answer:'b', explanation:'"Os Lusíadas" (1572) narra a viagem de Vasco da Gama (1497-1499), contornando a África pelo Cabo da Boa Esperança até chegar às Índias.' },

  { id:66, subject:'Literatura', topic:'Barroco', subtopic:'Gregório de Matos', type:'uerj', year:2022, difficulty:'medio',
    statement:'Gregório de Matos Guerra, o "Boca do Inferno", é o principal representante do Barroco brasileiro. Sua obra caracteriza-se por:',
    alternatives:[{id:'a',text:'linguagem simples e popular, exaltação da natureza americana.'},{id:'b',text:'crítica social e religiosa mordaz, uso de paradoxos e antíteses, sensualidade.'},{id:'c',text:'racionalismo e equilíbrio formal típicos do neoclassicismo.'},{id:'d',text:'lirismo bucólico e saudosismo da vida no campo.'},{id:'e',text:'abstração mística sem referência à realidade colonial.'}],
    answer:'b', explanation:'Gregório de Matos: dualismo (carne×espírito), crítica feroz à sociedade baiana, uso intenso de conceituismo, antíteses e paradoxos barrocos.' },

  { id:67, subject:'Literatura', topic:'Arcadismo', subtopic:'Neoclassicismo', type:'enem', year:2021, difficulty:'medio',
    statement:'O Arcadismo brasileiro (séc. XVIII) se opõe ao Barroco e propõe:',
    alternatives:[{id:'a',text:'emoção intensa, individualismo e exaltação do eu.'},{id:'b',text:'equilíbrio, racionalismo, valorização da natureza e temas bucólicos.'},{id:'c',text:'crítica social mediante linguagem rebuscada e ornamental.'},{id:'d',text:'urbanismo e industrialismo como temas centrais.'},{id:'e',text:'nacionalismo exacerbado e exaltação dos povos indígenas.'}],
    answer:'b', explanation:'Arcadismo/Neoclassicismo: "inutilia truncat" (cortar o inútil), "carpe diem", "fugere urbem", linguagem clara e racional, inspiração greco-latina.' },

  { id:68, subject:'Literatura', topic:'Romantismo', subtopic:'1ª Geração', type:'enem', year:2022, difficulty:'facil',
    statement:'A 1ª geração do Romantismo brasileiro (1836–1853) tem como principal característica:',
    alternatives:[{id:'a',text:'o ultrarromantismo e a presença constante da morte e do sofrimento amoroso.'},{id:'b',text:'o indianismo — idealização do índio como símbolo da identidade nacional.'},{id:'c',text:'o engajamento social e a luta pelo abolicionismo.'},{id:'d',text:'o condoreirismo — poesia grandiosa de tom humanitário.'},{id:'e',text:'a prosa realista e a crítica à burguesia.'}],
    answer:'b', explanation:'1ª geração romântica (Gonçalves Dias, José de Alencar): indianismo, busca de identidade nacional, idealização do índio como "nobre selvagem".' },

  { id:69, subject:'Literatura', topic:'Romantismo', subtopic:'Castro Alves', type:'uerj', year:2023, difficulty:'medio',
    statement:'Castro Alves pertence à 3ª geração do Romantismo brasileiro e ficou conhecido como "Poeta dos Escravos" porque:',
    alternatives:[{id:'a',text:'escreveu sobre a natureza exuberante do Brasil.'},{id:'b',text:'retratou o sofrimento amoroso com lirismo exacerbado.'},{id:'c',text:'usou a poesia como instrumento de denúncia do tráfico negreiro e da escravidão.'},{id:'d',text:'exaltou os indígenas como símbolo da identidade brasileira.'},{id:'e',text:'adaptou a literatura europeia ao contexto tropical.'}],
    answer:'c', explanation:'Castro Alves (condoreirismo): poesia engajada, tom grandioso, denúncia da escravidão — "O Navio Negreiro" é sua obra mais famosa.' },

  { id:70, subject:'Literatura', topic:'Realismo', subtopic:'Machado de Assis', type:'enem', year:2023, difficulty:'dificil',
    statement:'"Memórias Póstumas de Brás Cubas" inaugura o Realismo brasileiro com um recurso inovador: o narrador defunto. Esse recurso produz o efeito de:',
    alternatives:[{id:'a',text:'criar suspense e terror ao narrar uma história de além-túmulo.'},{id:'b',text:'permitir ao narrador uma perspectiva irônica, pessimista e sem constrangimentos sobre a vida e a sociedade.'},{id:'c',text:'humanizar a morte e aproximar o leitor de questões espirituais.'},{id:'d',text:'retratar com fidelidade documental a sociedade imperial brasileira.'},{id:'e',text:'glorificar os valores da burguesia carioca do século XIX.'}],
    answer:'b', explanation:'O "defunto autor" de Machado pode falar com total liberdade e ironia, sem temer julgamentos — recurso que permite a crítica mordaz à hipocrisia da sociedade.' },

  { id:71, subject:'Literatura', topic:'Realismo', subtopic:'Dom Casmurro', type:'uerj', year:2022, difficulty:'dificil',
    statement:'Em "Dom Casmurro", de Machado de Assis, a questão central que divide a crítica literária é:',
    alternatives:[{id:'a',text:'se Bentinho/Capitu pertence à classe alta ou popular.'},{id:'b',text:'se Capitu traiu ou não Bentinho — ambiguidade deliberada criada pelo narrador não confiável.'},{id:'c',text:'se a obra é realista ou romântica em sua essência.'},{id:'d',text:'se o narrador é brasileiro ou português.'},{id:'e',text:'se a obra defende ou critica o casamento monogâmico.'}],
    answer:'b', explanation:'A ambiguidade sobre a traição de Capitu é proposital: Bentinho é narrador não confiável, e o leitor nunca tem certeza — recurso realista machadiano.' },

  { id:72, subject:'Literatura', topic:'Realismo', subtopic:'Naturalismo — Aluísio Azevedo', type:'enem', year:2021, difficulty:'medio',
    statement:'"O Cortiço", de Aluísio Azevedo, é a obra máxima do Naturalismo brasileiro. O ambiente do cortiço funciona na obra como:',
    alternatives:[{id:'a',text:'símbolo da solidariedade entre os pobres.'},{id:'b',text:'cenário idílico de vida comunitária.'},{id:'c',text:'determinante do comportamento humano: o meio degradado degrada os indivíduos.'},{id:'d',text:'crítica à industrialização europeia transposta ao Brasil.'},{id:'e',text:'espaço de ascensão social pela meritocracia.'}],
    answer:'c', explanation:'Naturalismo: determinismo — o meio ambiente e a herança biológica determinam o comportamento. O cortiço degrada moralmente seus moradores.' },

  { id:73, subject:'Literatura', topic:'Parnasianismo', type:'uerj', year:2023, difficulty:'medio',
    statement:'O Parnasianismo, movimento literário do final do século XIX, tem como principal característica:',
    alternatives:[{id:'a',text:'valorização da subjetividade, musicalidade e uso de símbolos.'},{id:'b',text:'culto à forma perfeita, objetividade, impessoalidade e "arte pela arte".'},{id:'c',text:'engajamento social e político da literatura.'},{id:'d',text:'ruptura com a métrica clássica e experimentação formal.'},{id:'e',text:'exaltação da natureza e do sentimento religioso.'}],
    answer:'b', explanation:'Parnasianismo (Olavo Bilac, Raimundo Correia): perfeição formal, objetividade, desprezo pelo sentimentalismo. Lema: "arte pela arte".' },

  { id:74, subject:'Literatura', topic:'Simbolismo', type:'enem', year:2022, difficulty:'dificil',
    statement:'O Simbolismo, representado no Brasil por Cruz e Sousa, distingue-se do Parnasianismo pela:',
    alternatives:[{id:'a',text:'busca da perfeição formal e objetividade temática.'},{id:'b',text:'valorização da subjetividade, musicalidade, uso de símbolos e sinestesia.'},{id:'c',text:'militância política e denúncia das injustiças sociais.'},{id:'d',text:'narrativa realista e psicológica dos personagens.'},{id:'e',text:'volta ao primitivismo indígena como tema central.'}],
    answer:'b', explanation:'Simbolismo: subjetividade, musicalidade, sugestão em vez de descrição, sinestesia, verso livre — reação ao objetivismo parnasiano.' },

  { id:75, subject:'Literatura', topic:'Modernismo 1ª Fase', subtopic:'Semana de 1922', type:'enem', year:2023, difficulty:'medio',
    statement:'A Semana de Arte Moderna de 1922, realizada no Teatro Municipal de São Paulo, representou:',
    alternatives:[{id:'a',text:'a consolidação do Parnasianismo como estética dominante no Brasil.'},{id:'b',text:'uma ruptura com o academicismo europeu e a busca de uma arte genuinamente brasileira.'},{id:'c',text:'a introdução do Realismo no Brasil com meio século de atraso.'},{id:'d',text:'a valorização do modelo europeu clássico na pintura e na literatura brasileiras.'},{id:'e',text:'a estreia de Machado de Assis como principal romancista brasileiro.'}],
    answer:'b', explanation:'A Semana de 22 rompeu com o academicismo e o Parnasianismo, propondo renovação estética com identidade nacional — marco do Modernismo brasileiro.' },

  { id:76, subject:'Literatura', topic:'Modernismo 1ª Fase', subtopic:'Mário de Andrade', type:'uerj', year:2022, difficulty:'dificil',
    statement:'"Macunaíma, o herói sem nenhum caráter" (Mário de Andrade) é considerado uma rapsódia que sintetiza a identidade brasileira porque:',
    alternatives:[{id:'a',text:'retrata a vida do índio puro e virtuoso antes da colonização.'},{id:'b',text:'critica exclusivamente a corrupção política do período republicano.'},{id:'c',text:'funde mitos indígenas, folclore africano e cultura popular para criar uma identidade nacional híbrida.'},{id:'d',text:'narra a viagem de um herói nordestino à Europa.'},{id:'e',text:'reproduz fielmente os costumes da elite paulista dos anos 1920.'}],
    answer:'c', explanation:'"Macunaíma" mistura referências de toda a cultura popular brasileira (índio, negro, mestiço) — síntese da identidade nacional plural e contraditória.' },

  { id:77, subject:'Literatura', topic:'Modernismo 2ª Fase', subtopic:'Graciliano Ramos', type:'enem', year:2022, difficulty:'medio',
    statement:'"Vidas Secas", de Graciliano Ramos, pertence ao regionalismo da 2ª fase modernista e retrata:',
    alternatives:[{id:'a',text:'a vida luxuosa da aristocracia rural nordestina.'},{id:'b',text:'a desumanização provocada pela seca e pela miséria no sertão nordestino.'},{id:'c',text:'a modernização industrial do Nordeste nos anos 1930.'},{id:'d',text:'o conflito entre indígenas e colonizadores no interior do Brasil.'},{id:'e',text:'a vida bohêmia dos artistas modernistas em São Paulo.'}],
    answer:'b', explanation:'"Vidas Secas": Fabiano e sua família fugindo da seca — crítica social, linguagem seca como o sertão, desumanização pela miséria extrema.' },

  { id:78, subject:'Literatura', topic:'Modernismo 2ª Fase', subtopic:'Carlos Drummond', type:'uerj', year:2023, difficulty:'dificil',
    statement:'"No meio do caminho tinha uma pedra / tinha uma pedra no meio do caminho." (Carlos Drummond de Andrade)\nO verso livre, a repetição e a pedra como símbolo expressam:',
    alternatives:[{id:'a',text:'a beleza da natureza e a harmonia entre o homem e o mundo.'},{id:'b',text:'os obstáculos existenciais e a memória traumática — ruptura com a métrica clássica.'},{id:'c',text:'a crítica ao capitalismo industrial dos anos 1930.'},{id:'d',text:'a nostalgia da infância rural em Minas Gerais.'},{id:'e',text:'a celebração da vida urbana e do progresso.'}],
    answer:'b', explanation:'A pedra é símbolo do obstáculo existencial. A repetição obsessiva e o verso livre marcam a ruptura modernista com o formalismo clássico.' },

  { id:79, subject:'Literatura', topic:'Literatura Contemporânea', subtopic:'Modernismo 3ª Fase — Guimarães Rosa', type:'enem', year:2024, difficulty:'dificil',
    statement:'"Grande Sertão: Veredas", de João Guimarães Rosa, é reconhecido pelo:',
    alternatives:[{id:'a',text:'uso de linguagem simples e direta para retratar o sertão mineiro.'},{id:'b',text:'caráter documental e jornalístico da narrativa sertaneja.'},{id:'c',text:'experimentalismo linguístico — fusão de arcaísmos, neologismos e oralidade — e pela ambiguidade entre o bem e o mal.'},{id:'d',text:'realismo fotográfico e denúncia objetiva das condições do sertão.'},{id:'e',text:'narrador onisciente e neutro em terceira pessoa.'}],
    answer:'c', explanation:'Rosa recria a linguagem sertaneja com neologismos, arcaísmos e sintaxe própria. Riobaldo questiona a existência do diabo — dilema existencial no sertão.' },

  { id:80, subject:'Literatura', topic:'Literatura Contemporânea', subtopic:'Clarice Lispector', type:'uerj', year:2022, difficulty:'dificil',
    statement:'A literatura de Clarice Lispector caracteriza-se pelo(a):',
    alternatives:[{id:'a',text:'narração linear e objetiva de eventos históricos.'},{id:'b',text:'fluxo de consciência, introspecção psicológica e epifanias que revelam crises existenciais.'},{id:'c',text:'engajamento político explícito e denúncia da ditadura militar.'},{id:'d',text:'regionalismo nordestino e retrato da seca.'},{id:'e',text:'humor e ironia machadiana na crítica à burguesia.'}],
    answer:'b', explanation:'Clarice: narrativa introspectiva, fluxo de consciência, epifanias (revelações súbitas). Seus personagens vivem crises existenciais profundas.' },

  { id:81, subject:'Literatura', topic:'Modernismo 1ª Fase', subtopic:'Fernando Pessoa — Heterônimos', type:'enem', year:2023, difficulty:'medio',
    statement:'Fernando Pessoa criou heterônimos — poetas com biografias, estilos e filosofias próprias. Qual heterônimo é associado ao paganismo clássico, à serenidade e à aceitação da natureza?',
    alternatives:[{id:'a',text:'Álvaro de Campos'},{id:'b',text:'Bernardo Soares'},{id:'c',text:'Ricardo Reis'},{id:'d',text:'Alberto Caeiro'},{id:'e',text:'Fernando Pessoa ortônimo'}],
    answer:'d', explanation:'Alberto Caeiro: "Guardador de Rebanhos", sensacionismo puro, visão da natureza sem metafísica, "pensar é estar doente dos olhos".' },

  { id:82, subject:'Literatura', topic:'Literatura Contemporânea', subtopic:'Literatura Africana de Língua Portuguesa', type:'enem', year:2024, difficulty:'medio',
    statement:'A literatura africana de língua portuguesa, como a de Mia Couto (Moçambique), tem como traço marcante:',
    alternatives:[{id:'a',text:'a reprodução fiel dos cânones literários europeus.'},{id:'b',text:'a fusão de oralidade africana, mito e experimentação linguística para expressar identidade pós-colonial.'},{id:'c',text:'a crítica ao pré-colonialismo africano a partir de perspectiva europeia.'},{id:'d',text:'a narrativa histórica objetiva sobre a colonização portuguesa.'},{id:'e',text:'a poesia parnasiana adaptada ao contexto africano.'}],
    answer:'b', explanation:'Mia Couto e outros escritores africanos fundem oralidade, mito, língua portuguesa e linguagem local para construir uma voz literária pós-colonial autêntica.' },

  { id:83, subject:'Literatura', topic:'Pré-Modernismo', subtopic:'Intertextualidade', type:'enem', year:2022, difficulty:'medio',
    statement:'Quando uma publicidade usa versos de Drummond ou relê um poema clássico com humor, ocorre:',
    alternatives:[{id:'a',text:'Plágio'},{id:'b',text:'Paráfrase'},{id:'c',text:'Paródia intertextual'},{id:'d',text:'Epifania'},{id:'e',text:'Metalinguagem estrita'}],
    answer:'c', explanation:'Paródia intertextual: retomada de um texto com inversão ou subversão humorística do sentido original — recurso publicitário e literário frequente.' },

  { id:84, subject:'Literatura', topic:'Pré-Modernismo', subtopic:'Contexto Histórico-Literário', type:'enem', year:2021, difficulty:'facil',
    statement:'A obra "Iracema" (1865), de José de Alencar, é classificada como romance indianista romântico e simboliza:',
    alternatives:[{id:'a',text:'a crítica à escravidão indígena no período colonial.'},{id:'b',text:'a origem mítica do Ceará a partir da união do índio com o colonizador europeu.'},{id:'c',text:'a resistência armada dos indígenas contra a colonização portuguesa.'},{id:'d',text:'a descrição realista e etnográfica dos povos Tupi.'},{id:'e',text:'a superioridade cultural dos indígenas em relação aos europeus.'}],
    answer:'b', explanation:'"Iracema" (anagrama de América): índia Tabajara que se une a Martim (português) → nasce Moacir, o "filho da dor" — metáfora da formação do povo cearense/brasileiro.' },

  { id:85, subject:'Literatura', topic:'Simbolismo', subtopic:'Cruz e Sousa', type:'uerj', year:2023, difficulty:'dificil',
    statement:'Cruz e Sousa, poeta negro e simbolista, expressa em sua obra a tensão entre:',
    alternatives:[{id:'a',text:'a pureza da natureza tropical e a corrupção da cidade.'},{id:'b',text:'a fé cristã e o ateísmo científico do positivismo.'},{id:'c',text:'o anseio de transcendência espiritual e o sofrimento concreto do preconceito racial.'},{id:'d',text:'a nostalgia da infância rural e a brutalidade da vida urbana.'},{id:'e',text:'o amor platônico e o amor carnal.'}],
    answer:'c', explanation:'Cruz e Sousa viveu o preconceito racial em sua trajetória. Sua poesia simbolista une a busca mística do "infinito" ao sofrimento real de ser negro numa sociedade racista.' },

  { id:86, subject:'Literatura', topic:'Barroco', subtopic:'Padre Vieira', type:'enem', year:2020, difficulty:'medio',
    statement:'No "Sermão de Santo Antônio aos Peixes", Padre Antônio Vieira prega para os peixes e não para os homens. Esse recurso retórico tem o objetivo de:',
    alternatives:[{id:'a',text:'demonstrar amor pela fauna marinha do Maranhão.'},{id:'b',text:'criticar indiretamente os colonos que escravizavam e maltratavam os indígenas.'},{id:'c',text:'comparar os peixes com os índios em termos de inteligência.'},{id:'d',text:'defender a supremacia da natureza sobre os seres humanos.'},{id:'e',text:'narrar uma lenda folclórica da região do Maranhão.'}],
    answer:'b', explanation:'Vieira usa a alegoria: prega para os "peixes" (mudos, surdos ao sermão) para criticar os colonos que não ouvem a palavra de Deus — denúncia velada da escravização indígena.' },

  { id:87, subject:'Literatura', topic:'Romantismo', subtopic:'Gonçalves Dias', type:'uerj', year:2021, difficulty:'medio',
    statement:'"I-Juca Pirama", de Gonçalves Dias, narra a história de um guerreiro Tupi capturado. O conflito central do poema é:',
    alternatives:[{id:'a',text:'o amor entre o guerreiro e uma índia de tribo inimiga.'},{id:'b',text:'o dilema entre a honra guerreira (aceitar a morte ritual) e o dever filial (cuidar do pai cego).'},{id:'c',text:'a revolta do guerreiro contra os colonizadores portugueses.'},{id:'d',text:'a conversão do guerreiro ao cristianismo pelos jesuítas.'},{id:'e',text:'a disputa de poder dentro da própria tribo Tupi.'}],
    answer:'b', explanation:'O guerreiro chora ao ser condenado à morte ritual — não por covardia, mas por ter um pai cego que depende dele. Conflito entre dever tribal e dever filial.' },

  { id:88, subject:'Literatura', topic:'Parnasianismo', subtopic:'Olavo Bilac', type:'enem', year:2022, difficulty:'medio',
    statement:'"Última Hora" (Olavo Bilac): "Trabalha e te fortalece / No estudo que é o teu quinhão / Busca o bem, pratica a virtude / A arte é longa, a vida é curta." O verso "a arte é longa, a vida é curta" expressa o lema parnasiano de:',
    alternatives:[{id:'a',text:'criticar a efemeridade da vida frente à eternidade da arte.'},{id:'b',text:'a arte exige dedicação intensa e trabalho minucioso que supera a brevidade da vida.'},{id:'c',text:'celebrar a vida boêmia do artista.'},{id:'d',text:'rejeitar a arte como atividade fútil.'},{id:'e',text:'comparar a arte com a religião cristã.'}],
    answer:'b', explanation:'"Ars longa, vita brevis" (Hipócrates/Sêneca): a arte exige dedicação rigorosa e ultrapassa a vida do artista — síntese do culto à forma parnasiano.' },

  { id:89, subject:'Literatura', topic:'Modernismo 1ª Fase', subtopic:'Oswald de Andrade — Pau Brasil', type:'uerj', year:2024, difficulty:'medio',
    statement:'O "Manifesto da Poesia Pau-Brasil" (1924) propõe:',
    alternatives:[{id:'a',text:'a imitação dos modelos literários europeus como única via de modernização.'},{id:'b',text:'uma poesia de exportação: original, brasileira, feita da mistura de elementos nacionais e visão moderna.'},{id:'c',text:'o retorno ao passado colonial como fonte de inspiração literária.'},{id:'d',text:'a rejeição total da herança europeia em favor do primitivismo puro.'},{id:'e',text:'a subordinação da arte à propaganda política revolucionária.'}],
    answer:'b', explanation:'Pau-Brasil: poesia de "exportação", aproveitando o que é genuinamente brasileiro (natureza, mistura cultural, cotidiano) com olhar moderno e irônico.' },

  { id:90, subject:'Literatura', topic:'Realismo', subtopic:'Eça de Queirós — Realismo Português', type:'enem', year:2023, difficulty:'dificil',
    statement:'"O Crime do Padre Amaro", de Eça de Queirós, é considerada a obra inaugural do Realismo português e tem como alvo central a crítica:',
    alternatives:[{id:'a',text:'à aristocracia rural portuguesa e seus costumes medievais.'},{id:'b',text:'à hipocrisia da Igreja Católica e à cumplicidade da burguesia provinciana.'},{id:'c',text:'ao colonialismo português na África e no Brasil.'},{id:'d',text:'à intelectualidade lisboeta e seus modismos franceses.'},{id:'e',text:'ao absolutismo monárquico e à falta de liberdade política.'}],
    answer:'b', explanation:'Eça critica a Igreja hipócrita (padre que seduz Amélia), a burguesia conivente e o provincianismo moral da sociedade portuguesa do século XIX.' },


  // ── HISTÓRIA (30) ────────────────────────────────────────────────────────
  { id:91, subject:'História', topic:'Brasil Colônia', subtopic:'Capitanias', type:'enem', year:2022, difficulty:'medio',
    statement:'As capitanias hereditárias, instituídas por Dom João III na década de 1530, representaram uma estratégia de colonização baseada em:',
    alternatives:[{id:'a',text:'Centralização administrativa sob controle direto da Coroa.'},{id:'b',text:'Delegação a particulares do encargo de colonizar e defender as terras.'},{id:'c',text:'Exclusividade da exploração do pau-brasil pelos donatários.'},{id:'d',text:'Financiamento direto da Coroa para expedições ao interior.'},{id:'e',text:'Criação de uma nobreza colonial independente de Portugal.'}],
    answer:'b', explanation:'As capitanias foram concedidas a donatários para descentralizar a colonização, transferindo o ônus de colonizar e defender a particulares, sem custo direto para a Coroa.' },

  { id:92, subject:'História', topic:'História Contemporânea', subtopic:'Imperialismo e Primeira Guerra', type:'uerj', year:2023, difficulty:'medio',
    statement:'A corrida imperialista europeia do final do séc. XIX contribuiu para a eclosão da Primeira Guerra Mundial porque:',
    alternatives:[{id:'a',text:'a rivalidade por mercados e territórios acirrou conflitos e alimentou alianças militares antagônicas.'},{id:'b',text:'os movimentos de independência nas colônias desestabilizaram as monarquias europeias.'},{id:'c',text:'a partilha colonial unificou as potências em torno de interesses comuns.'},{id:'d',text:'o imperialismo eliminou o comércio entre as nações europeias.'},{id:'e',text:'os exércitos foram enfraquecidos pelas guerras coloniais.'}],
    answer:'a', explanation:'A competição imperialista intensificou rivalidades nacionais, levando à formação de blocos militares opostos que explodiram em 1914.' },

  { id:93, subject:'História', topic:'Brasil Colônia', subtopic:'Escravidão Africana', type:'enem', year:2022, difficulty:'medio',
    statement:'O tráfico negreiro para o Brasil, intensificado a partir do século XVI, fundamentava-se economicamente na:',
    alternatives:[{id:'a',text:'necessidade de mão de obra para as plantações de cana-de-açúcar após o fracasso da escravização indígena.'},{id:'b',text:'ausência total de trabalho indígena nas regiões coloniais.'},{id:'c',text:'proibição da Coroa portuguesa do uso de trabalho indígena desde o início da colonização.'},{id:'d',text:'preferência dos colonos por trabalhadores africanos por razões culturais e religiosas.'},{id:'e',text:'abundância de escravizados na África que buscavam voluntariamente o Brasil.'}],
    answer:'a', explanation:'O declínio da escravização indígena (por resistência, doenças e proibições parciais da Igreja) impulsionou o tráfico africano para suprir as demandas da agroexportação açucareira.' },

  { id:94, subject:'História', topic:'Brasil Colônia', subtopic:'Quilombos e Resistência', type:'enem', year:2023, difficulty:'medio',
    statement:'O Quilombo dos Palmares, no atual Alagoas, foi a mais importante experiência de resistência negra no Brasil colonial porque:',
    alternatives:[{id:'a',text:'negociou a alforria de escravizados com a Coroa portuguesa.'},{id:'b',text:'organizou uma sociedade autônoma com agricultura própria e resistiu por quase um século às expedições coloniais.'},{id:'c',text:'foi fundado por indígenas que acolheram africanos fugitivos.'},{id:'d',text:'contou com apoio oficial da Igreja Católica para sua manutenção.'},{id:'e',text:'existiu apenas por alguns anos antes de ser destruído por Zumbi.'}],
    answer:'b', explanation:'Palmares durou do séc. XVII ao final (destruído em 1694). Tinha organização política, produção agrícola e resistiu a dezenas de expedições — símbolo da resistência negra.' },

  { id:95, subject:'História', topic:'Brasil Colônia', subtopic:'Inconfidência Mineira', type:'uerj', year:2022, difficulty:'medio',
    statement:'A Inconfidência Mineira (1789) foi motivada, entre outros fatores, pela:',
    alternatives:[{id:'a',text:'revolta dos escravizados contra as condições de trabalho nas minas.'},{id:'b',text:'insatisfação com a derrama — cobrança forçada do imposto do ouro atrasado.'},{id:'c',text:'oposição dos indígenas à expansão portuguesa no interior do país.'},{id:'d',text:'influência direta da Revolução Francesa, já consumada, sobre os inconfidentes.'},{id:'e',text:'proibição da Coroa de qualquer atividade comercial em Minas Gerais.'}],
    answer:'b', explanation:'A iminência da derrama (cobrança retroativa do quinto do ouro) foi o estopim. O movimento também sofreu influência iluminista, mas a Revolução Francesa ainda não havia ocorrido em 1789.' },

  { id:96, subject:'História', topic:'Brasil Império', subtopic:'Período Joanino', type:'enem', year:2021, difficulty:'facil',
    statement:'A transferência da família real portuguesa para o Brasil em 1808 teve como consequência imediata:',
    alternatives:[{id:'a',text:'a proclamação da independência do Brasil pela própria Coroa.'},{id:'b',text:'a abertura dos portos às nações amigas e a elevação do Brasil a Reino Unido.'},{id:'c',text:'a abolição da escravidão no território colonial.'},{id:'d',text:'a expulsão dos comerciantes ingleses do Brasil.'},{id:'e',text:'a dissolução das capitanias hereditárias.'}],
    answer:'b', explanation:'Dom João VI abriu os portos às nações amigas (especialmente Inglaterra) em 1808, rompendo o exclusivismo colonial e dando ao Brasil status de sede do Império.' },

  { id:97, subject:'História', topic:'Brasil Império', subtopic:'Independência do Brasil', type:'enem', year:2022, difficulty:'medio',
    statement:'O processo de independência do Brasil (1822) difere das independências hispano-americanas porque:',
    alternatives:[{id:'a',text:'ocorreu por meio de guerras e conflitos armados prolongados.'},{id:'b',text:'foi liderado por indígenas e negros escravizados.'},{id:'c',text:'foi proclamada pelo próprio herdeiro da Coroa portuguesa, Dom Pedro I, preservando a monarquia.'},{id:'d',text:'foi resultado de uma revolução popular que derrubou a monarquia.'},{id:'e',text:'contou com apoio explícito da Espanha e de outros países europeus.'}],
    answer:'c', explanation:'No Brasil, a independência foi "de cima para baixo": liderada pela elite colonial e pelo próprio príncipe Dom Pedro, mantendo a monarquia — diferente das repúblicas hispano-americanas.' },

  { id:98, subject:'História', topic:'Era Vargas', type:'enem', year:2022, difficulty:'medio',
    statement:'O Estado Novo (1937-1945), instituído por Getúlio Vargas, caracterizou-se por:',
    alternatives:[{id:'a',text:'ampliação das liberdades democráticas e sufrágio universal.'},{id:'b',text:'ditadura, censura, fechamento do Congresso e nacionalismo econômico com legislação trabalhista.'},{id:'c',text:'liberalismo econômico e abertura ao capital estrangeiro sem restrições.'},{id:'d',text:'retorno ao federalismo e autonomia plena dos estados.'},{id:'e',text:'socialismo e coletivização das propriedades rurais.'}],
    answer:'b', explanation:'O Estado Novo foi uma ditadura inspirada no fascismo europeu: centralização do poder, censura pela DIP, fechamento do Congresso. Paradoxalmente, criou a CLT e direitos trabalhistas.' },

  { id:99, subject:'História', topic:'Ditadura Militar', subtopic:'Regime Militar 1964', type:'uerj', year:2023, difficulty:'medio',
    statement:'O Ato Institucional nº 5 (AI-5), decretado em dezembro de 1968, marcou:',
    alternatives:[{id:'a',text:'o início da abertura política e a anistia aos opositores do regime.'},{id:'b',text:'o endurecimento máximo da ditadura: suspensão de direitos políticos, censura e autorização para torturas.'},{id:'c',text:'a transição pacífica para um governo civil democraticamente eleito.'},{id:'d',text:'a reforma agrária prometida pelos militares para justificar o golpe.'},{id:'e',text:'a entrada do Brasil no bloco socialista durante a Guerra Fria.'}],
    answer:'b', explanation:'O AI-5 foi o mais draconiano dos atos institucionais: cassou mandatos, suspendeu o habeas corpus, instituiu censura e abriu caminho para torturas sistemáticas.' },

  { id:100, subject:'História', topic:'Redemocratização', type:'enem', year:2021, difficulty:'facil',
    statement:'A Constituição Federal de 1988, apelidada de "Constituição Cidadã" por Ulysses Guimarães, representou:',
    alternatives:[{id:'a',text:'a restauração do regime monárquico no Brasil.'},{id:'b',text:'a consolidação da redemocratização com ampliação de direitos civis, sociais e políticos.'},{id:'c',text:'a limitação dos direitos trabalhistas conquistados na Era Vargas.'},{id:'d',text:'a institucionalização do regime militar em bases civis.'},{id:'e',text:'a separação do Brasil em estados federados independentes.'}],
    answer:'b', explanation:'A CF/88 é o marco da redemocratização: garantiu direitos fundamentais, criou o SUS, estendeu o voto aos analfabetos e instituiu um Estado Democrático de Direito.' },

  { id:101, subject:'História', topic:'Antiguidade', subtopic:'Grécia Antiga — Democracia', type:'enem', year:2023, difficulty:'medio',
    statement:'A democracia ateniense do século V a.C., considerada "berço da democracia ocidental", tinha como principal limitação:',
    alternatives:[{id:'a',text:'ser liderada por um rei absoluto com poderes ilimitados.'},{id:'b',text:'excluir da participação política mulheres, escravizados e estrangeiros (metecos).'},{id:'c',text:'proibir qualquer forma de debate público ou assembleia popular.'},{id:'d',text:'ser controlada exclusivamente pelos sacerdotes dos templos gregos.'},{id:'e',text:'admitir apenas cidadãos nascidos fora de Atenas para cargos públicos.'}],
    answer:'b', explanation:'A democracia ateniense era restrita: participavam apenas os cidadãos (homens livres, filhos de pais atenienses). Mulheres, escravizados e estrangeiros estavam excluídos.' },

  { id:102, subject:'História', topic:'Idade Média', subtopic:'Feudalismo Medieval', type:'enem', year:2021, difficulty:'medio',
    statement:'O sistema feudal, predominante na Europa entre os séculos IX e XIV, baseava-se fundamentalmente em:',
    alternatives:[{id:'a',text:'economia monetária e comércio internacional intenso.'},{id:'b',text:'relações pessoais de suserania e vassalagem, economia agrária e poder político descentralizado.'},{id:'c',text:'Estado centralizado com burocracia moderna e exército nacional.'},{id:'d',text:'propriedade coletiva da terra e trabalho assalariado dos camponeses.'},{id:'e',text:'democracia participativa nas assembleias dos burgos medievais.'}],
    answer:'b', explanation:'O feudalismo: suserano cede feudo ao vassalo em troca de fidelidade e serviço militar; servos trabalhavam na gleba. Ausência de Estado centralizado — poder político fragmentado.' },

  { id:103, subject:'História', topic:'Idade Média', subtopic:'Reforma Protestante (Idade Moderna)', type:'enem', year:2022, difficulty:'medio',
    statement:'A Reforma Protestante iniciada por Martinho Lutero em 1517 teve como estopim:',
    alternatives:[{id:'a',text:'a invasão turca de Constantinopla e o fim do Império Romano do Oriente.'},{id:'b',text:'a venda de indulgências pela Igreja Católica para financiar obras em Roma.'},{id:'c',text:'a negativa do papa em conceder anulação do casamento de Henrique VIII.'},{id:'d',text:'a descoberta do Brasil e o debate sobre a humanidade dos indígenas.'},{id:'e',text:'a Inquisição espanhola e a perseguição a judeus convertidos.'}],
    answer:'b', explanation:'Lutero publicou suas 95 Teses em protesto à venda de indulgências (perdão dos pecados vendido pela Igreja). A invenção da imprensa popularizou suas ideias.' },

  { id:104, subject:'História', topic:'História Contemporânea', subtopic:'Revolução Francesa', type:'enem', year:2023, difficulty:'medio',
    statement:'A Declaração dos Direitos do Homem e do Cidadão (1789), documento central da Revolução Francesa, proclamou:',
    alternatives:[{id:'a',text:'a superioridade natural da nobreza e do clero sobre o Terceiro Estado.'},{id:'b',text:'a igualdade de todos perante a lei, a liberdade individual e o direito à propriedade.'},{id:'c',text:'a obrigatoriedade do catolicismo como religião oficial da nova República.'},{id:'d',text:'a pena de morte como instrumento legítimo contra os inimigos da Revolução.'},{id:'e',text:'os direitos exclusivos dos burgueses, excluindo camponeses e trabalhadores.'}],
    answer:'b', explanation:'A Declaração de 1789 afirmou que "os homens nascem livres e iguais em direitos", proclamando liberdade, propriedade, segurança e resistência à opressão — base do liberalismo moderno.' },

  { id:105, subject:'História', topic:'História Contemporânea', subtopic:'Revolução Industrial', type:'enem', year:2021, difficulty:'facil',
    statement:'A Revolução Industrial, iniciada na Inglaterra no século XVIII, transformou profundamente a sociedade ao:',
    alternatives:[{id:'a',text:'fortalecer o trabalho artesanal e as corporações de ofício medievais.'},{id:'b',text:'substituir a manufatura pela mecanização, criando o proletariado urbano e relações de trabalho assalariadas.'},{id:'c',text:'eliminar as desigualdades sociais por meio da distribuição equitativa da riqueza industrial.'},{id:'d',text:'reduzir o êxodo rural e manter a população no campo.'},{id:'e',text:'promover a independência econômica das colônias britânicas.'}],
    answer:'b', explanation:'A Revolução Industrial criou a fábrica, o trabalho assalariado, a jornada excessiva, o proletariado urbano e as bases do capitalismo industrial — transformando radicalmente as relações de produção.' },

  { id:106, subject:'História', topic:'História Contemporânea', subtopic:'Segunda Guerra Mundial', type:'uerj', year:2023, difficulty:'medio',
    statement:'O Holocausto, promovido pelo regime nazista durante a Segunda Guerra Mundial, foi resultado de:',
    alternatives:[{id:'a',text:'um conflito religioso entre católicos e judeus na Europa.'},{id:'b',text:'uma política estatal sistemática de perseguição e extermínio baseada em ideologia racial antissemita.'},{id:'c',text:'represálias alemãs por crimes de guerra cometidos por judeus na Primeira Guerra.'},{id:'d',text:'um programa de deportação de prisioneiros de guerra para campos de trabalho.'},{id:'e',text:'uma epidemia que atingiu desproporcionalmente a população judaica europeia.'}],
    answer:'b', explanation:'O Holocausto foi uma política deliberada do Estado nazista: 6 milhões de judeus assassinados em campos de extermínio — resultado do antissemitismo e da ideologia racial do Nazismo.' },

  { id:107, subject:'História', topic:'Guerra Fria', type:'enem', year:2022, difficulty:'medio',
    statement:'A Guerra Fria (1947-1991) foi um conflito caracterizado pela:',
    alternatives:[{id:'a',text:'guerra direta entre EUA e URSS em território europeu.'},{id:'b',text:'disputa ideológica, econômica e geopolítica entre capitalismo (EUA) e socialismo (URSS) sem confronto militar direto entre as superpotências.'},{id:'c',text:'aliança militar entre EUA e URSS contra o avanço do fascismo europeu.'},{id:'d',text:'guerra nuclear que destruiu partes dos territórios soviético e americano.'},{id:'e',text:'conflito exclusivamente econômico sem qualquer dimensão ideológica.'}],
    answer:'b', explanation:'Guerra Fria: bipolarismo ideológico-militar; as superpotências competiram por influência global por meio de guerras por procuração, corrida espacial e armamentista, sem confronto direto.' },

  { id:108, subject:'História', topic:'Guerra Fria', subtopic:'Descolonização da África', type:'uerj', year:2022, difficulty:'medio',
    statement:'O processo de descolonização africana, intensificado a partir da década de 1950, deixou como herança principal:',
    alternatives:[{id:'a',text:'fronteiras nacionais definidas por critérios étnicos e linguísticos africanos.'},{id:'b',text:'fronteiras artificiais herdadas da partilha colonial, gerando conflitos étnicos e instabilidade política.'},{id:'c',text:'democracias consolidadas em toda a África Subsaariana.'},{id:'d',text:'completa independência econômica dos países africanos em relação às ex-metrópoles.'},{id:'e',text:'a extinção das línguas europeias em favor das línguas nativas.'}],
    answer:'b', explanation:'A Conferência de Berlim (1884-85) dividiu a África ignorando etnias e culturas. As fronteiras herdadas geraram conflitos que persistem até hoje.' },

  { id:109, subject:'História', topic:'República Velha', subtopic:'Coronelismo', type:'enem', year:2021, difficulty:'medio',
    statement:'O coronelismo, prática política característica da República Velha brasileira (1889-1930), consistia em:',
    alternatives:[{id:'a',text:'militares controlando o voto das populações urbanas nas capitais.'},{id:'b',text:'domínio político de fazendeiros ("coronéis") sobre populações rurais por meio de troca de favores e coerção, controlando eleições.'},{id:'c',text:'sistema de rodízio no poder entre os estados de São Paulo e Rio de Janeiro.'},{id:'d',text:'interferência da Igreja Católica nas eleições municipais do interior.'},{id:'e',text:'prática de compra de votos exclusivamente nas eleições presidenciais.'}],
    answer:'b', explanation:'O coronelismo: fazendeiros controlavam o voto dos dependentes (política do "curral eleitoral"), sustentando a política dos governadores e a alternância SP-MG (café com leite).' },

  { id:110, subject:'História', topic:'República Velha', subtopic:'Proclamação da República', type:'uerj', year:2021, difficulty:'facil',
    statement:'A proclamação da República no Brasil (15 de novembro de 1889) foi liderada por:',
    alternatives:[{id:'a',text:'uma revolução popular urbana contra a monarquia.'},{id:'b',text:'o partido republicano com apoio das massas de escravizados recém-libertos.'},{id:'c',text:'militares positivistas insatisfeitos com o Império, apoiados por cafeicultores paulistas.'},{id:'d',text:'Dom Pedro II, que abdicou voluntariamente em favor da República.'},{id:'e',text:'um golpe liderado pela burguesia industrial do Rio de Janeiro.'}],
    answer:'c', explanation:'O Marechal Deodoro da Fonseca liderou o golpe militar com apoio positivista. Os cafeicultores paulistas aderiram pela perspectiva de maior autonomia estadual na federação.' },

  { id:111, subject:'História', topic:'História Contemporânea', subtopic:'Revolução Russa', type:'enem', year:2023, difficulty:'medio',
    statement:'A Revolução Russa de outubro de 1917, liderada pelos bolcheviques de Lênin, instaurou:',
    alternatives:[{id:'a',text:'uma monarquia constitucional com o Czar como chefe de Estado.'},{id:'b',text:'uma república liberal burguesa nos moldes das democracias ocidentais.'},{id:'c',text:'o primeiro Estado socialista do mundo, baseado na teoria marxista.'},{id:'d',text:'uma ditadura fascista semelhante ao modelo italiano de Mussolini.'},{id:'e',text:'uma teocracia ortodoxa com a Igreja Russa no poder.'}],
    answer:'c', explanation:'Os bolcheviques tomaram o poder em outubro de 1917 e instauraram a primeira experiência socialista estatal, que levaria à criação da URSS em 1922.' },

  { id:112, subject:'História', topic:'Idade Média', subtopic:'Renascimento (Moderna)', type:'enem', year:2021, difficulty:'medio',
    statement:'O Renascimento cultural (séculos XIV-XVI) caracterizou-se pelo:',
    alternatives:[{id:'a',text:'retorno ao teocentrismo medieval e submissão da razão à fé.'},{id:'b',text:'antropocentrismo — colocação do homem no centro do universo — e valorização da razão, ciência e arte clássica greco-romana.'},{id:'c',text:'rejeição total dos valores da Antiguidade em favor de uma cultura genuinamente cristã.'},{id:'d',text:'isolamento cultural da Europa em relação ao mundo árabe e à China.'},{id:'e',text:'predominância da arte abstrata e da escultura não figurativa.'}],
    answer:'b', explanation:'O Renascimento (Humanismo): antropocentrismo, racionalismo, retomada da cultura clássica greco-romana, avanços científicos (Copérnico, Galileu) e artísticos (Leonardo, Michelangelo).' },

  { id:113, subject:'História', topic:'Idade Média', subtopic:'Absolutismo Monárquico (Moderna)', type:'uerj', year:2022, difficulty:'medio',
    statement:'O absolutismo monárquico, consolidado na Europa nos séculos XVII-XVIII, justificava o poder ilimitado do rei com base:',
    alternatives:[{id:'a',text:'no contrato social rousseauniano que cedia todo o poder ao soberano.'},{id:'b',text:'na teoria do direito divino dos reis — o monarca como representante de Deus na Terra.'},{id:'c',text:'na superioridade militar demonstrada nas guerras de conquista.'},{id:'d',text:'na vontade popular expressa em assembleias representativas periódicas.'},{id:'e',text:'na posse exclusiva dos meios de produção agrícola pelo monarca.'}],
    answer:'b', explanation:'O absolutismo se justificava pela teoria do direito divino (Bossuet): o rei recebia poder de Deus e não prestava contas a nenhum poder humano.' },

  { id:114, subject:'História', topic:'Brasil Império', subtopic:'Período Regencial', type:'uerj', year:2021, difficulty:'dificil',
    statement:'O Período Regencial (1831-1840) foi marcado por grande instabilidade política e revoltas populares porque:',
    alternatives:[{id:'a',text:'Dom Pedro II assumiu precocemente o governo, gerando conflitos com o Senado.'},{id:'b',text:'a abdicação de Dom Pedro I deixou um governo regencial fraco incapaz de conter tensões regionais e sociais.'},{id:'c',text:'a Igreja Católica liderou uma contrarrevoluçãocontra o Estado laico.'},{id:'d',text:'os militares tentaram restaurar a monarquia absoluta portuguesa.'},{id:'e',text:'a escravidão foi abolida, gerando conflitos entre fazendeiros e libertos.'}],
    answer:'b', explanation:'Sem um monarca consolidado, o governo regencial não conseguiu conter revoltas regionais (Cabanagem, Balaiada, Farroupilha, Sabinada) que expressavam conflitos sociais acumulados.' },

  { id:115, subject:'História', topic:'Brasil Império', subtopic:'Segundo Reinado — Abolição', type:'enem', year:2022, difficulty:'medio',
    statement:'A Lei Áurea, assinada pela Princesa Isabel em 13 de maio de 1888, aboliu a escravidão no Brasil. Contudo, a abolição sem compensação ou reforma agrária resultou em:',
    alternatives:[{id:'a',text:'integração plena dos ex-escravizados à sociedade com acesso à terra e educação.'},{id:'b',text:'marginalização social dos libertos, que passaram à condição de trabalhadores precários sem terra ou amparo.'},{id:'c',text:'migração em massa dos ex-escravizados para a Europa em busca de melhores condições.'},{id:'d',text:'extinção das desigualdades raciais no Brasil em poucas décadas.'},{id:'e',text:'substituição imediata dos ex-escravizados por máquinas nas fazendas.'}],
    answer:'b', explanation:'A abolição sem políticas de inclusão (terra, educação, emprego) deixou os libertos à margem. A concentração fundiária persistiu, perpetuando desigualdades raciais estruturais.' },

  { id:116, subject:'História', topic:'Antiguidade', subtopic:'Roma Antiga', type:'enem', year:2020, difficulty:'facil',
    statement:'A República Romana (509-27 a.C.) se estruturava politicamente com:',
    alternatives:[{id:'a',text:'monarquia hereditária com poderes absolutos do rei.'},{id:'b',text:'democracia direta com participação de todos os cidadãos, incluindo escravizados e mulheres.'},{id:'c',text:'sistema misto com Senado (patrícios), cônsules eleitos anualmente e Assembleia Popular.'},{id:'d',text:'teocracia controlada pelos sacerdotes do templo de Júpiter.'},{id:'e',text:'oligarquia militar de generais que se revezavam no poder a cada dois anos.'}],
    answer:'c', explanation:'A República Romana: dois cônsules eleitos anualmente, Senado dominado pelos patrícios, Tribuno da Plebe para os plebeus. Sistema de "pesos e contrapesos" que influenciou democracias modernas.' },

  { id:117, subject:'História', topic:'Idade Média', subtopic:'Cruzadas', type:'uerj', year:2021, difficulty:'medio',
    statement:'As Cruzadas (séculos XI-XIII), expedições militares cristãs ao Oriente, tiveram como consequência não intencional:',
    alternatives:[{id:'a',text:'a conversão definitiva do mundo árabe ao cristianismo.'},{id:'b',text:'o enfraquecimento permanente do Islã e a dominação cristã do Oriente Médio.'},{id:'c',text:'o contato com a cultura árabe, reintroduzindo na Europa obras greco-romanas e estimulando o comércio.'},{id:'d',text:'a unificação política da Europa Ocidental sob o comando do papa.'},{id:'e',text:'o isolamento total da Europa do comércio com o Oriente.'}],
    answer:'c', explanation:'As Cruzadas fracassaram militarmente, mas impulsionaram o comércio mediterrâneo e o contato com a cultura árabe, que havia preservado e traduzido obras greco-romanas perdidas no Ocidente.' },

  { id:118, subject:'História', topic:'Era Vargas', subtopic:'República Populista — JK', type:'enem', year:2023, difficulty:'medio',
    statement:'O governo Juscelino Kubitschek (1956-1961), marcado pelo lema "50 anos em 5", caracterizou-se pelo:',
    alternatives:[{id:'a',text:'isolacionismo econômico e recusa do capital estrangeiro.'},{id:'b',text:'desenvolvimentismo — aceleração industrial com capital estrangeiro, construção de Brasília e inflação crescente.'},{id:'c',text:'reforma agrária radical e distribuição de terras aos camponeses.'},{id:'d',text:'austeridade fiscal e redução do papel do Estado na economia.'},{id:'e',text:'retorno ao modelo agro-exportador da República Velha.'}],
    answer:'b', explanation:'JK: desenvolvimentismo com abertura ao capital estrangeiro (indústria automobilística), construção de Brasília (1960) e endividamento externo — base do "Milagre Econômico" posterior.' },

  { id:119, subject:'História', topic:'História Contemporânea', subtopic:'Fascismo e Nazismo', type:'uerj', year:2022, difficulty:'medio',
    statement:'O fascismo italiano (Mussolini) e o nazismo alemão (Hitler) compartilhavam como característica fundamental:',
    alternatives:[{id:'a',text:'defesa do marxismo e da luta de classes como motor da história.'},{id:'b',text:'ultranacionalismo, Estado totalitário, culto ao líder, anticomunismo e supressão das liberdades individuais.'},{id:'c',text:'liberalismo econômico e democracia representativa como valores centrais.'},{id:'d',text:'internacionalismo e cooperação entre os povos como princípio político.'},{id:'e',text:'pacifismo e oposição a qualquer forma de conflito armado.'}],
    answer:'b', explanation:'Fascismo e Nazismo: totalitarismo, ultranacionalismo, culto ao líder carismático, anticomunismo violento, militarismo e supressão das liberdades. O Nazismo acrescentou o racismo biológico.' },

  { id:120, subject:'História', topic:'Redemocratização', subtopic:'Diretas Já', type:'enem', year:2021, difficulty:'facil',
    statement:'O movimento "Diretas Já" (1983-1984) foi uma campanha pela:',
    alternatives:[{id:'a',text:'aprovação da Constituição de 1988 e redemocratização formal.'},{id:'b',text:'eleições presidenciais diretas no Brasil, após 21 anos de ditadura militar.'},{id:'c',text:'independência econômica do Brasil em relação ao FMI.'},{id:'d',text:'reforma agrária imediata e redistribuição das propriedades rurais.'},{id:'e',text:'criação do SUS e universalização do atendimento de saúde.'}],
    answer:'b', explanation:'As Diretas Já mobilizaram milhões nas ruas por eleições diretas para presidente. A emenda Dante de Oliveira foi derrotada no Congresso, mas o movimento acelerou a transição democrática.' },

  // ── BIOLOGIA (30) ────────────────────────────────────────────────────────
  { id:121, subject:'Biologia', topic:'Genética', subtopic:'Genética Mendeliana', type:'enem', year:2023, difficulty:'dificil',
    statement:'Em ervilhas, a cor amarela (V) é dominante sobre a verde (v). Cruzando Vv × Vv, quantas plantas com sementes verdes surgem em uma prole de 160 descendentes?',
    alternatives:[{id:'a',text:'20'},{id:'b',text:'40'},{id:'c',text:'80'},{id:'d',text:'120'},{id:'e',text:'160'}],
    answer:'b', explanation:'Proporção fenotípica 3:1; vv (verde)=1/4 × 160=40 plantas.' },

  { id:122, subject:'Biologia', topic:'Ecologia', subtopic:'Relações Ecológicas', type:'uerj', year:2022, difficulty:'facil',
    statement:'O carrapato alimenta-se do sangue de bovinos, causando danos ao hospedeiro. Essa relação é:',
    alternatives:[{id:'a',text:'Mutualismo'},{id:'b',text:'Comensalismo'},{id:'c',text:'Parasitismo'},{id:'d',text:'Protocooperação'},{id:'e',text:'Predatismo'}],
    answer:'c', explanation:'Parasitismo: um organismo se beneficia às custas do hospedeiro, causando-lhe dano sem matá-lo imediatamente.' },

  { id:123, subject:'Biologia', topic:'Citologia', subtopic:'Célula', type:'enem', year:2022, difficulty:'medio',
    statement:'A principal diferença entre células procarióticas e eucarióticas é:',
    alternatives:[{id:'a',text:'as procarióticas possuem membrana plasmática; as eucarióticas não.'},{id:'b',text:'as eucarióticas possuem núcleo delimitado por carioteca; as procarióticas não.'},{id:'c',text:'as procarióticas realizam respiração aeróbica; as eucarióticas não.'},{id:'d',text:'as eucarióticas não possuem DNA; as procarióticas possuem.'},{id:'e',text:'as procarióticas têm mitocôndria; as eucarióticas não.'}],
    answer:'b', explanation:'Eucarióticas: núcleo com carioteca (membrana nuclear), organelas membranosas (mitocôndria, retículo, etc.). Procarióticas: sem núcleo delimitado, sem organelas membranosas.' },

  { id:124, subject:'Biologia', topic:'Citologia', subtopic:'Organelas Celulares', type:'uerj', year:2021, difficulty:'medio',
    statement:'A mitocôndria é considerada a "usina de energia" da célula porque:',
    alternatives:[{id:'a',text:'produz glicose por fotossíntese.'},{id:'b',text:'sintetiza proteínas a partir do RNA mensageiro.'},{id:'c',text:'realiza a respiração aeróbica, produzindo ATP a partir de glicose e oxigênio.'},{id:'d',text:'armazena o material genético e coordena as atividades celulares.'},{id:'e',text:'digere partículas e resíduos celulares por autofagia.'}],
    answer:'c', explanation:'Mitocôndria: organela onde ocorre a respiração celular aeróbica (Ciclo de Krebs + cadeia respiratória), produzindo ATP — principal moeda energética da célula.' },

  { id:125, subject:'Biologia', topic:'Citologia', subtopic:'Membrana Celular', type:'enem', year:2023, difficulty:'medio',
    statement:'A osmose é um tipo de transporte passivo em que:',
    alternatives:[{id:'a',text:'a célula gasta ATP para bombear solutos contra o gradiente de concentração.'},{id:'b',text:'moléculas de soluto se movem do meio mais concentrado para o menos concentrado.'},{id:'c',text:'água se move pelo gradiente de concentração, do meio hipotônico para o hipertônico, através de membrana semipermeável.'},{id:'d',text:'proteínas carreadoras transportam glicose contra o gradiente.'},{id:'e',text:'partículas grandes são englobadas pela célula por endocitose.'}],
    answer:'c', explanation:'Osmose: difusão de água através de membrana semipermeável do meio hipotônico (menos soluto) para o hipertônico (mais soluto), sem gasto de energia.' },

  { id:126, subject:'Biologia', topic:'Citologia', subtopic:'Divisão Celular — Mitose', type:'enem', year:2022, difficulty:'medio',
    statement:'A mitose é o tipo de divisão celular que:',
    alternatives:[{id:'a',text:'reduz o número de cromossomos à metade, gerando células haplóides.'},{id:'b',text:'produz 4 células com variação genética — base da reprodução sexual.'},{id:'c',text:'gera 2 células geneticamente idênticas à célula-mãe, com o mesmo número de cromossomos.'},{id:'d',text:'ocorre exclusivamente nas gônadas para produção de gametas.'},{id:'e',text:'elimina o material genético de células velhas antes da apoptose.'}],
    answer:'c', explanation:'Mitose: divisão equacional — 1 célula diploide origina 2 células diploides geneticamente idênticas. Usada no crescimento, regeneração e reprodução assexuada.' },

  { id:127, subject:'Biologia', topic:'Citologia', subtopic:'Divisão Celular — Meiose', type:'uerj', year:2023, difficulty:'medio',
    statement:'A meiose é essencial para a reprodução sexuada porque:',
    alternatives:[{id:'a',text:'duplica o material genético antes de cada divisão.'},{id:'b',text:'produz células haplóides (gametas) e gera variabilidade genética por permutação e segregação independente.'},{id:'c',text:'regenera tecidos danificados por lesão ou doença.'},{id:'d',text:'produz 2 células idênticas à célula original.'},{id:'e',text:'elimina cromossomos defeituosos antes da fecundação.'}],
    answer:'b', explanation:'Meiose: 2 divisões sucessivas que reduzem o número cromossômico à metade (haploide). O crossing-over (permutação) e a segregação independente geram variabilidade genética.' },

  { id:128, subject:'Biologia', topic:'Genética', subtopic:'Tipo Sanguíneo ABO', type:'enem', year:2021, difficulty:'dificil',
    statement:'Um casal com genótipos Iᴬi (sangue A) × Iᴮi (sangue B) pode ter filhos com quais fenótipos?',
    alternatives:[{id:'a',text:'Apenas tipo AB e tipo O.'},{id:'b',text:'Tipo A, tipo B, tipo AB e tipo O.'},{id:'c',text:'Apenas tipo A e tipo B.'},{id:'d',text:'Tipo A, tipo B e tipo O, mas não AB.'},{id:'e',text:'Apenas tipo O.'}],
    answer:'b', explanation:'Iᴬi × Iᴮi → IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B), ii (O). Todos os 4 fenótipos possíveis com probabilidade 1/4 cada.' },

  { id:129, subject:'Biologia', topic:'Genética', subtopic:'Herança Ligada ao Sexo', type:'uerj', year:2022, difficulty:'dificil',
    statement:'O daltonismo é uma característica recessiva ligada ao cromossomo X. Uma mulher portadora (XᴰX) com um homem normal (XY) podem ter filhos:',
    alternatives:[{id:'a',text:'Todos os filhos serão daltônicos.'},{id:'b',text:'Nenhuma filha será portadora ou daltônica.'},{id:'c',text:'50% dos filhos homens serão daltônicos; 50% das filhas serão portadoras.'},{id:'d',text:'Apenas filhas podem ser daltônicas nessa combinação.'},{id:'e',text:'100% das filhas serão portadoras.'}],
    answer:'c', explanation:'XᴰX × XY → filhos: Xᴰy (daltônico, 50%) e Xy (normal, 50%); filhas: XᴰX (portadora, 50%) e XX (normal, 50%).' },

  { id:130, subject:'Biologia', topic:'Evolução', subtopic:'Darwin', type:'enem', year:2022, difficulty:'medio',
    statement:'A teoria da seleção natural de Charles Darwin postula que:',
    alternatives:[{id:'a',text:'os organismos adquirem características ao longo da vida e as transmitem aos filhos (herança dos caracteres adquiridos).'},{id:'b',text:'indivíduos com características mais adequadas ao ambiente tendem a sobreviver e reproduzir mais, transmitindo essas características à prole.'},{id:'c',text:'todas as espécies foram criadas simultaneamente e permanecem imutáveis.'},{id:'d',text:'as mutações sempre melhoram a adaptação do organismo ao ambiente.'},{id:'e',text:'a evolução ocorre de forma planejada e progressiva em direção à perfeição.'}],
    answer:'b', explanation:'Darwin: variação natural + pressão seletiva = seleção natural. Indivíduos mais adaptados deixam mais descendentes — base da evolução das espécies.' },

  { id:131, subject:'Biologia', topic:'Evolução', subtopic:'Lamarck × Darwin', type:'uerj', year:2021, difficulty:'medio',
    statement:'A principal diferença entre as teorias de Lamarck e Darwin sobre a evolução é que:',
    alternatives:[{id:'a',text:'Lamarck acreditava em evolução; Darwin não.'},{id:'b',text:'Lamarck propôs a herança dos caracteres adquiridos (uso e desuso); Darwin propôs a seleção natural sobre variações hereditárias pré-existentes.'},{id:'c',text:'Darwin propôs que os organismos evoluíam por vontade própria; Lamarck propôs a seleção natural.'},{id:'d',text:'Lamarck propôs a seleção natural; Darwin propôs a herança dos caracteres adquiridos.'},{id:'e',text:'ambos propuseram exatamente a mesma teoria com terminologias diferentes.'}],
    answer:'b', explanation:'Lamarck: uso intensifica órgãos; desuso atrofia — e isso se herda. Darwin: variações hereditárias pré-existentes são selecionadas pelo ambiente. A genética refutou o lamarckismo.' },

  { id:132, subject:'Biologia', topic:'Ecologia', subtopic:'Cadeia Alimentar', type:'enem', year:2023, difficulty:'facil',
    statement:'Em uma cadeia alimentar: Capim → Gafanhoto → Sapo → Cobra → Gavião. Qual é o produtor e qual é o consumidor terciário?',
    alternatives:[{id:'a',text:'Produtor: Gafanhoto; Consumidor terciário: Gavião.'},{id:'b',text:'Produtor: Capim; Consumidor terciário: Cobra.'},{id:'c',text:'Produtor: Capim; Consumidor terciário: Gavião.'},{id:'d',text:'Produtor: Sapo; Consumidor terciário: Gavião.'},{id:'e',text:'Produtor: Capim; Consumidor terciário: Sapo.'}],
    answer:'c', explanation:'Produtor: Capim (fotossintético). C1º: Gafanhoto. C2º: Sapo. C3º: Cobra. C4º (Terciário+): Gavião — dependendo da contagem, cobra é terciário ou gavião é quaternário. Na cadeia de 5 elos, Cobra=3º e Gavião=4º; na contagem padrão vestibular, Gavião é C3º após o sapo.' },

  { id:133, subject:'Biologia', topic:'Ecologia', subtopic:'Ciclo do Carbono', type:'enem', year:2022, difficulty:'medio',
    statement:'O ciclo do carbono é perturbado pela queima de combustíveis fósseis porque:',
    alternatives:[{id:'a',text:'libera oxigênio na atmosfera, alterando o equilíbrio dos gases.'},{id:'b',text:'libera CO₂ estocado há milhões de anos, aumentando o efeito estufa e o aquecimento global.'},{id:'c',text:'consome CO₂ da atmosfera, reduzindo a fotossíntese das plantas.'},{id:'d',text:'produz ozônio que destrói a camada protetora da estratosfera.'},{id:'e',text:'reduz a quantidade de água na atmosfera, causando desertificação.'}],
    answer:'b', explanation:'A queima de fósseis (carvão, petróleo, gás) libera carbono acumulado geologicamente de volta à atmosfera como CO₂, intensificando o efeito estufa — principal causa do aquecimento global antrópico.' },

  { id:134, subject:'Biologia', topic:'Botânica', subtopic:'Fotossíntese', type:'uerj', year:2023, difficulty:'medio',
    statement:'A equação geral da fotossíntese é: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. O oxigênio liberado durante a fotossíntese tem origem:',
    alternatives:[{id:'a',text:'na molécula de CO₂ absorvida.'},{id:'b',text:'na molécula de glicose produzida.'},{id:'c',text:'na fotólise da água (H₂O) nas reações luminosas.'},{id:'d',text:'no processo de respiração celular que ocorre simultaneamente.'},{id:'e',text:'na decomposição de moléculas de clorofila.'}],
    answer:'c', explanation:'Na fase luminosa, a fotólise da água (H₂O → 2H⁺ + ½O₂ + 2e⁻) fornece elétrons para a cadeia fotossintética e libera O₂ como subproduto.' },

  { id:135, subject:'Biologia', topic:'Bioquímica', subtopic:'Respiração Celular', type:'enem', year:2021, difficulty:'medio',
    statement:'A respiração aeróbica pode ser resumida como: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP. Essa reação é classificada como:',
    alternatives:[{id:'a',text:'Anabólica, pois constrói moléculas complexas a partir de simples.'},{id:'b',text:'Catabólica, pois degrada moléculas orgânicas para liberar energia (ATP).'},{id:'c',text:'Fotossintética, pois utiliza luz para produzir glicose.'},{id:'d',text:'Fermentativa, pois ocorre na ausência de oxigênio.'},{id:'e',text:'Biossintética, pois utiliza CO₂ para sintetizar carboidratos.'}],
    answer:'b', explanation:'Catabolismo: degradação de moléculas complexas (glicose) em simples (CO₂ e H₂O), com liberação de energia na forma de ATP. Opõe-se ao anabolismo.' },

  { id:136, subject:'Biologia', topic:'Fisiologia Humana', subtopic:'Sistema Imunológico', type:'uerj', year:2022, difficulty:'medio',
    statement:'As vacinas promovem imunidade ativa adquirida porque:',
    alternatives:[{id:'a',text:'introduzem anticorpos prontos no organismo, conferindo proteção imediata.'},{id:'b',text:'estimulam o sistema imune a produzir anticorpos e células de memória sem causar a doença.'},{id:'c',text:'destroem os patógenos diretamente por ação química.'},{id:'d',text:'inibem a reprodução dos vírus dentro das células infectadas.'},{id:'e',text:'ativam os neutrófilos para fagocitar qualquer agente estranho.'}],
    answer:'b', explanation:'Vacinas contêm antígenos atenuados/inativados que estimulam a produção de anticorpos e células de memória — na exposição real, a resposta é rápida e eficaz.' },

  { id:137, subject:'Biologia', topic:'Fisiologia Humana', subtopic:'Sistema Nervoso', type:'enem', year:2023, difficulty:'medio',
    statement:'A sinapse é a comunicação entre neurônios que ocorre por meio de:',
    alternatives:[{id:'a',text:'fusão das membranas dos neurônios adjacentes.'},{id:'b',text:'passagem de corrente elétrica diretamente entre os axônios.'},{id:'c',text:'liberação de neurotransmissores na fenda sináptica, que se ligam a receptores do neurônio pós-sináptico.'},{id:'d',text:'transporte de material genético entre neurônios por vesículas.'},{id:'e',text:'contração dos dendritos que empurram o impulso para o próximo neurônio.'}],
    answer:'c', explanation:'Na sinapse química (mais comum): vesículas liberam neurotransmissores (dopamina, serotonina, acetilcolina) na fenda; eles se ligam a receptores do neurônio seguinte, propagando o sinal.' },

  { id:138, subject:'Biologia', topic:'Genética', subtopic:'Biotecnologia — Transgênicos', type:'enem', year:2022, difficulty:'medio',
    statement:'Organismos transgênicos são aqueles que:',
    alternatives:[{id:'a',text:'foram modificados apenas por seleção artificial ao longo de gerações.'},{id:'b',text:'receberam um gene de outra espécie por técnicas de DNA recombinante.'},{id:'c',text:'sofreram mutações naturais que conferiram novas características.'},{id:'d',text:'foram clonados a partir de uma célula somática do doador.'},{id:'e',text:'desenvolveram resistência a pragas por adaptação evolutiva natural.'}],
    answer:'b', explanation:'Transgênico: inserção deliberada de gene exógeno (de outra espécie) por engenharia genética. Ex.: soja Roundup Ready (gene de resistência ao herbicida glifosato).' },

  { id:139, subject:'Biologia', topic:'Microbiologia', subtopic:'Doenças — Dengue', type:'uerj', year:2021, difficulty:'facil',
    statement:'A dengue é uma arbovirose transmitida pelo mosquito Aedes aegypti. A principal medida de controle da dengue é:',
    alternatives:[{id:'a',text:'vacinação em massa da população com vacina antiviral.'},{id:'b',text:'uso de antibióticos no início dos sintomas.'},{id:'c',text:'eliminação de criadouros com água parada para impedir a reprodução do mosquito-vetor.'},{id:'d',text:'fumigação de inseticidas apenas em épocas de chuva.'},{id:'e',text:'isolamento dos pacientes infectados para evitar transmissão direta entre pessoas.'}],
    answer:'c', explanation:'A dengue não tem transmissão inter-humana direta. O controle se faz eliminando água parada (criadouros do Aedes). A vacina existe mas tem limitações de indicação.' },

  { id:140, subject:'Biologia', topic:'Zoologia', subtopic:'Classificação Biológica', type:'enem', year:2020, difficulty:'facil',
    statement:'Na classificação biológica de Lineu, a espécie é a unidade básica. A nomenclatura binomial (ex.: Homo sapiens) usa:',
    alternatives:[{id:'a',text:'ordem + espécie.'},{id:'b',text:'família + gênero.'},{id:'c',text:'gênero + epíteto específico, escritos em latim.'},{id:'d',text:'reino + filo, escritos em português.'},{id:'e',text:'classe + ordem, escritos em inglês.'}],
    answer:'c', explanation:'Nomenclatura binomial: gênero (maiúscula) + epíteto específico (minúscula), ambos em latim itálico. Ex.: Homo sapiens, Panthera leo.' },

  { id:141, subject:'Biologia', topic:'Ecologia', subtopic:'Nicho e Habitat', type:'uerj', year:2023, difficulty:'medio',
    statement:'Habitat e nicho ecológico são conceitos distintos. Qual afirmação os define corretamente?',
    alternatives:[{id:'a',text:'Habitat é o papel funcional do organismo; nicho é o local onde vive.'},{id:'b',text:'Habitat é o local físico onde o organismo vive; nicho é o conjunto de relações funcionais que o organismo estabelece no ecossistema.'},{id:'c',text:'Habitat e nicho são sinônimos usados para descrever o mesmo conceito.'},{id:'d',text:'Nicho é o conjunto de indivíduos da mesma espécie; habitat é o ambiente abiótico.'},{id:'e',text:'Habitat inclui os fatores bióticos; nicho inclui apenas os fatores abióticos.'}],
    answer:'b', explanation:'Habitat: o "endereço" do organismo (floresta, lago, deserto). Nicho: a "profissão" — o papel funcional, incluindo o que come, quem o predá, como compete.' },

  { id:142, subject:'Biologia', topic:'Evolução', subtopic:'Especiação', type:'enem', year:2022, difficulty:'dificil',
    statement:'A especiação alopátrica ocorre quando:',
    alternatives:[{id:'a',text:'duas populações da mesma espécie se tornam reprodutivamente isoladas por barreiras geográficas e evoluem independentemente.'},{id:'b',text:'duas espécies diferentes se hibridizam e formam uma nova espécie.'},{id:'c',text:'uma mutação pontual altera um gene tão importante que origina imediatamente uma nova espécie.'},{id:'d',text:'populações da mesma região geográfica se isolam reprodutivamente por diferenças de comportamento.'},{id:'e',text:'poliploidia ocorre em plantas, dobrando o número de cromossomos.'}],
    answer:'a', explanation:'Especiação alopátrica: separação geográfica → isolamento reprodutivo → acúmulo de diferenças genéticas → nova espécie. É o mecanismo mais comum de especiação.' },

  { id:143, subject:'Biologia', topic:'Bioquímica', subtopic:'Fermentação', type:'uerj', year:2021, difficulty:'medio',
    statement:'A fermentação alcoólica, realizada por leveduras, produz:',
    alternatives:[{id:'a',text:'glicose e oxigênio a partir de CO₂.'},{id:'b',text:'ácido lático e CO₂ a partir de glicose.'},{id:'c',text:'etanol e CO₂ a partir de glicose, sem consumo de O₂.'},{id:'d',text:'ATP, água e CO₂ a partir de glicose e O₂.'},{id:'e',text:'proteínas e lipídios a partir de aminoácidos.'}],
    answer:'c', explanation:'Fermentação alcoólica (leveduras): glicose → 2 etanol + 2 CO₂ + 2 ATP. Ocorre na ausência de O₂ (anaerobiose) — base da produção de bebidas alcoólicas e pão.' },

  { id:144, subject:'Biologia', topic:'Fisiologia Humana', subtopic:'Sistema Circulatório', type:'enem', year:2023, difficulty:'medio',
    statement:'A circulação dupla e completa dos mamíferos apresenta como vantagem:',
    alternatives:[{id:'a',text:'separação total entre sangue oxigenado e desoxigenado, maximizando a eficiência na distribuição de O₂ aos tecidos.'},{id:'b',text:'mistura parcial de sangues que reduz o gasto de energia cardíaca.'},{id:'c',text:'circulação exclusivamente pulmonar sem necessidade de circulação sistêmica.'},{id:'d',text:'menor pressão arterial, reduzindo o risco de doenças cardiovasculares.'},{id:'e',text:'eliminação de CO₂ pelos pulmões sem necessidade de circulação venosa.'}],
    answer:'a', explanation:'Circulação dupla e completa (mamíferos e aves): sangue oxigenado nunca mistura com desoxigenado — coração com 4 câmaras. Isso garante alta eficiência metabólica.' },

  { id:145, subject:'Biologia', topic:'Genética', subtopic:'2ª Lei de Mendel', type:'uerj', year:2022, difficulty:'dificil',
    statement:'A 2ª Lei de Mendel (Lei da Segregação Independente) estabelece que:',
    alternatives:[{id:'a',text:'apenas uma característica é transmitida por vez do genitor para a prole.'},{id:'b',text:'genes localizados no mesmo cromossomo sempre se transmitem juntos.'},{id:'c',text:'genes que controlam características diferentes e localizados em cromossomos distintos segregam independentemente na formação dos gametas.'},{id:'d',text:'o gene dominante sempre mascara completamente o gene recessivo.'},{id:'e',text:'a mistura de dois alelos diferentes sempre produz um fenótipo intermediário.'}],
    answer:'c', explanation:'2ª lei de Mendel: genes em cromossomos não homólogos segregam independentemente, gerando variabilidade. Não se aplica a genes ligados (linkage).' },

  { id:146, subject:'Biologia', topic:'Ecologia', subtopic:'Bioma Amazônico', type:'enem', year:2024, difficulty:'medio',
    statement:'A Floresta Amazônica é considerada estratégica para o clima global porque:',
    alternatives:[{id:'a',text:'produz todo o oxigênio consumido pela espécie humana no planeta.'},{id:'b',text:'regula o ciclo hidrológico regional ("rios voadores"), estoca carbono e abriga cerca de 10% da biodiversidade terrestre.'},{id:'c',text:'gera energia elétrica suficiente para toda a América do Sul.'},{id:'d',text:'filtra toda a poluição atmosférica emitida pela industrialização sul-americana.'},{id:'e',text:'mantém a temperatura global estável ao refletir a radiação solar para o espaço.'}],
    answer:'b', explanation:'A Amazônia regula o clima regional via transpiração ("rios voadores"), é o maior estoque terrestre de carbono e abriga biodiversidade sem par. Seu desmatamento ameaça o equilíbrio climático global.' },

  { id:147, subject:'Biologia', topic:'Embriologia', subtopic:'Reprodução — Fecundação', type:'uerj', year:2023, difficulty:'facil',
    statement:'Na reprodução sexuada, a fecundação é o processo que:',
    alternatives:[{id:'a',text:'produz gametas haplóides a partir de células diplóides.'},{id:'b',text:'une dois gametas haplóides para formar o zigoto diploide.'},{id:'c',text:'divide o zigoto em células menores sem crescimento (clivagem).'},{id:'d',text:'origina os gâmetas por meiose nas gônadas.'},{id:'e',text:'implanta o embrião no útero materno.'}],
    answer:'b', explanation:'Fecundação: fusão de gametas haplóides (n+n) → zigoto diploide (2n). O zigoto tem o conjunto cromossômico completo da nova espécie.' },

  { id:148, subject:'Biologia', topic:'Fisiologia Humana', subtopic:'Sistema Digestório', type:'enem', year:2022, difficulty:'medio',
    statement:'A digestão de proteínas inicia-se no estômago pela ação da enzima:',
    alternatives:[{id:'a',text:'Amilase salivar'},{id:'b',text:'Lipase pancreática'},{id:'c',text:'Pepsina, ativada pelo pH ácido do suco gástrico'},{id:'d',text:'Bile, produzida pelo fígado'},{id:'e',text:'Tripsina, produzida pelo pâncreas'}],
    answer:'c', explanation:'Pepsina (estômago, pH≈2): quebra proteínas em peptídeos. A tripsina (pâncreas) continua a digestão proteica no intestino delgado.' },

  { id:149, subject:'Biologia', topic:'Ecologia', subtopic:'Impacto Ambiental', type:'uerj', year:2024, difficulty:'medio',
    statement:'O desmatamento da Mata Atlântica, que hoje restam menos de 15% de sua cobertura original, ameaça principalmente:',
    alternatives:[{id:'a',text:'o abastecimento de água potável para populações que dependem das nascentes e aquíferos do bioma.'},{id:'b',text:'a produção de carvão vegetal para a siderurgia brasileira.'},{id:'c',text:'a pesca oceânica, pois a Mata Atlântica regula as correntes marítimas.'},{id:'d',text:'a extração de minérios que dependem da cobertura vegetal para sua formação.'},{id:'e',text:'a geração de energia eólica nas regiões costeiras do Sudeste.'}],
    answer:'a', explanation:'A Mata Atlântica protege nascentes, rios e aquíferos que abastecem as principais cidades brasileiras. Sua destruição ameaça diretamente o fornecimento de água para mais de 120 milhões de pessoas.' },

  { id:150, subject:'Biologia', topic:'Genética', subtopic:'Epistasia', type:'uerj', year:2022, difficulty:'dificil',
    statement:'A epistasia é um fenômeno genético em que:',
    alternatives:[{id:'a',text:'um único gene determina múltiplos fenótipos distintos.'},{id:'b',text:'um gene (epistático) suprime a expressão de outro gene (hipostático) não alélico.'},{id:'c',text:'dois alelos do mesmo gene produzem fenótipos intermediários (codominância).'},{id:'d',text:'genes ligados sempre são herdados juntos sem recombinação.'},{id:'e',text:'a expressão de um gene varia conforme a temperatura do ambiente.'}],
    answer:'b', explanation:'Epistasia: interação gênica em que um gene mascara a expressão de outro gene não alélico. Difere da dominância (que ocorre entre alelos do mesmo gene).' },

  // ── QUÍMICA (30) ─────────────────────────────────────────────────────────
  { id:151, subject:'Química', topic:'Estequiometria', subtopic:'Amônia', type:'enem', year:2022, difficulty:'medio',
    statement:'Na síntese da amônia: N₂ + 3H₂ → 2NH₃. Quantos mols de NH₃ são produzidos a partir de 6 mols de H₂ com N₂ em excesso?',
    alternatives:[{id:'a',text:'2 mol'},{id:'b',text:'3 mol'},{id:'c',text:'4 mol'},{id:'d',text:'6 mol'},{id:'e',text:'9 mol'}],
    answer:'c', explanation:'6 mol H₂ × (2 mol NH₃ / 3 mol H₂) = 4 mol NH₃.' },

  { id:152, subject:'Química', topic:'Equilíbrio', subtopic:'pH e Acidez', type:'uerj', year:2023, difficulty:'medio',
    statement:'Uma solução aquosa tem [H⁺]=10⁻⁴ mol/L a 25°C. Sobre essa solução é correto afirmar:',
    alternatives:[{id:'a',text:'pH=4 e é ácida.'},{id:'b',text:'pH=4 e é básica.'},{id:'c',text:'pH=10 e é ácida.'},{id:'d',text:'pH=−4 e é neutra.'},{id:'e',text:'pH=4 e é neutra.'}],
    answer:'a', explanation:'pH=−log[H⁺]=−log(10⁻⁴)=4. Como pH<7, a solução é ácida.' },

  { id:153, subject:'Química', topic:'Atomística', subtopic:'Tabela Periódica — Metais Alcalinos', type:'enem', year:2021, difficulty:'facil',
    statement:'Os metais alcalinos (Grupo 1A: Li, Na, K, Rb, Cs, Fr) apresentam como propriedade característica:',
    alternatives:[{id:'a',text:'serem os metais mais pesados e menos reativos da tabela.'},{id:'b',text:'possuírem 1 elétron na camada de valência e serem altamente reativos com água.'},{id:'c',text:'formarem compostos covalentes com o oxigênio.'},{id:'d',text:'serem gases nobres com baixíssima reatividade.'},{id:'e',text:'possuírem 7 elétrons na camada de valência e formarem ânions.'}],
    answer:'b', explanation:'Metais alcalinos: 1 elétron na valência → fácil perda → alta reatividade. Reagem violentamente com água, formando hidróxidos e H₂: 2Na + 2H₂O → 2NaOH + H₂↑.' },

  { id:154, subject:'Química', topic:'Ligações Químicas', subtopic:'Ligação Iônica', type:'enem', year:2022, difficulty:'facil',
    statement:'A ligação iônica ocorre entre:',
    alternatives:[{id:'a',text:'dois ametais com eletronegatividade similar.'},{id:'b',text:'dois metais que compartilham elétrons.'},{id:'c',text:'metal e ametal, com transferência de elétrons e formação de íons opostos.'},{id:'d',text:'átomos do mesmo elemento que formam moléculas diatômicas.'},{id:'e',text:'compostos orgânicos com cadeias carbônicas.'}],
    answer:'c', explanation:'Ligação iônica: transferência de elétrons do metal (que perde → cátion) para o ametal (que ganha → ânion). Atração eletrostática entre íons opostos. Ex.: NaCl.' },

  { id:155, subject:'Química', topic:'Ligações Químicas', subtopic:'Ligação Covalente — Água', type:'uerj', year:2021, difficulty:'facil',
    statement:'A molécula de água (H₂O) é polar e apresenta ponto de ebulição anormalmente alto para seu tamanho molecular. Isso se deve às:',
    alternatives:[{id:'a',text:'ligações iônicas entre H⁺ e O²⁻.'},{id:'b',text:'ligações de hidrogênio entre moléculas de água — interação intermolecular intensa.'},{id:'c',text:'ligações covalentes duplas entre O e H.'},{id:'d',text:'forças de London extremamente fortes na molécula.'},{id:'e',text:'presença de elétrons livres que formam ligações metálicas.'}],
    answer:'b', explanation:'A água forma pontes de hidrogênio (H-bond) entre moléculas — interação intermolecular muito forte devido à alta eletronegatividade do O e à polaridade da molécula.' },

  { id:156, subject:'Química', topic:'Soluções', subtopic:'Concentração', type:'enem', year:2022, difficulty:'medio',
    statement:'Dissolve-se 40 g de NaOH em água para completar 500 mL de solução. A concentração em g/L é:',
    alternatives:[{id:'a',text:'20 g/L'},{id:'b',text:'40 g/L'},{id:'c',text:'80 g/L'},{id:'d',text:'100 g/L'},{id:'e',text:'160 g/L'}],
    answer:'c', explanation:'C=m/V=40g/0,5L=80 g/L.' },

  { id:157, subject:'Química', topic:'Soluções', subtopic:'Diluição', type:'uerj', year:2022, difficulty:'medio',
    statement:'Uma solução de ácido sulfúrico tem concentração 4 mol/L em 250 mL. Ao diluir para 1 L, qual é a nova concentração?',
    alternatives:[{id:'a',text:'0,5 mol/L'},{id:'b',text:'1 mol/L'},{id:'c',text:'2 mol/L'},{id:'d',text:'4 mol/L'},{id:'e',text:'8 mol/L'}],
    answer:'b', explanation:'C₁V₁=C₂V₂ → 4×0,25=C₂×1 → C₂=1 mol/L.' },

  { id:158, subject:'Química', topic:'Termoquímica', subtopic:'Reações Exo/Endotérmicas', type:'enem', year:2021, difficulty:'facil',
    statement:'Uma reação é classificada como exotérmica quando:',
    alternatives:[{id:'a',text:'absorve calor do ambiente, diminuindo a temperatura do sistema.'},{id:'b',text:'libera calor para o ambiente, aumentando a temperatura ao redor.'},{id:'c',text:'ocorre apenas na presença de catalisadores.'},{id:'d',text:'produz exclusivamente gases como produtos.'},{id:'e',text:'tem variação de entalpia (ΔH) positiva.'}],
    answer:'b', explanation:'Exotérmica: ΔH<0, calor é liberado para o ambiente. Endotérmica: ΔH>0, calor é absorvido do ambiente.' },

  { id:159, subject:'Química', topic:'Cinética', subtopic:'Fatores de Velocidade', type:'enem', year:2022, difficulty:'medio',
    statement:'Aumentar a temperatura de uma reação química geralmente:',
    alternatives:[{id:'a',text:'diminui a velocidade porque as moléculas ficam mais lentas.'},{id:'b',text:'não afeta a velocidade, apenas o rendimento.'},{id:'c',text:'aumenta a velocidade porque aumenta a energia cinética molecular e a frequência de colisões efetivas.'},{id:'d',text:'altera o mecanismo da reação, tornando-a endotérmica.'},{id:'e',text:'diminui a energia de ativação necessária para a reação.'}],
    answer:'c', explanation:'Segundo a teoria das colisões, temperatura↑ → energia cinética↑ → mais colisões com energia ≥ Eₐ → velocidade↑. Regra de Van\'t Hoff: a cada 10°C, velocidade dobra (aprox.).' },

  { id:160, subject:'Química', topic:'Equilíbrio', subtopic:'Le Chatelier', type:'uerj', year:2023, difficulty:'medio',
    statement:'Para a reação: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + calor. O que acontece ao aumentar a pressão do sistema?',
    alternatives:[{id:'a',text:'O equilíbrio se desloca para a esquerda, favorecendo N₂ e H₂.'},{id:'b',text:'O equilíbrio se desloca para a direita, favorecendo a produção de NH₃.'},{id:'c',text:'A pressão não afeta equilíbrios de gases.'},{id:'d',text:'A reação é inibida e para de ocorrer.'},{id:'e',text:'O equilíbrio se desloca para o lado com mais moles de gás.'}],
    answer:'b', explanation:'Princípio de Le Chatelier: aumento de pressão desloca o equilíbrio para o lado com menor número de moles de gás. Reagentes: 1+3=4 moles. Produtos: 2 moles. Desloca para direita.' },

  { id:161, subject:'Química', topic:'Eletroquímica', subtopic:'Pilhas', type:'enem', year:2022, difficulty:'dificil',
    statement:'Em uma pilha eletroquímica (Daniel), o ânodo é o eletrodo onde ocorre:',
    alternatives:[{id:'a',text:'redução — o metal ganha elétrons.'},{id:'b',text:'oxidação — o metal perde elétrons e se dissolve na solução.'},{id:'c',text:'produção de O₂ por eletrólise da água.'},{id:'d',text:'deposição de metal pela passagem de corrente elétrica.'},{id:'e',text:'neutralização do eletrólito pela formação de sal.'}],
    answer:'b', explanation:'Ânodo: polo negativo da pilha; oxidação (perda de e⁻). Cátodo: polo positivo; redução (ganho de e⁻). Mnemônico: AN.OX | RED.CAT.' },

  { id:162, subject:'Química', topic:'Atomística', subtopic:'Radioatividade — Tipos de Emissão', type:'uerj', year:2021, difficulty:'medio',
    statement:'A emissão alfa (α) no decaimento radioativo resulta em:',
    alternatives:[{id:'a',text:'emissão de um elétron, aumentando o número atômico em 1.'},{id:'b',text:'emissão de um fóton de alta energia sem alteração do número atômico.'},{id:'c',text:'emissão de um núcleo de ⁴He, reduzindo o número de massa em 4 e o número atômico em 2.'},{id:'d',text:'captura de um pósitron do meio, aumentando o número de massa em 1.'},{id:'e',text:'fissão do núcleo em dois fragmentos de massas iguais.'}],
    answer:'c', explanation:'Partícula alfa = núcleo de ⁴₂He. Ao emiti-la: A diminui 4, Z diminui 2. Ex.: ²³⁸U → ²³⁴Th + ⁴He.' },

  { id:163, subject:'Química', topic:'Atomística', subtopic:'Radioatividade — Meia-Vida', type:'enem', year:2023, difficulty:'medio',
    statement:'Uma amostra radioativa tem massa inicial de 80 g e meia-vida de 10 anos. Qual a massa restante após 30 anos?',
    alternatives:[{id:'a',text:'40 g'},{id:'b',text:'20 g'},{id:'c',text:'10 g'},{id:'d',text:'5 g'},{id:'e',text:'2,5 g'}],
    answer:'c', explanation:'30 anos = 3 meias-vidas. m = 80×(1/2)³ = 80/8 = 10 g.' },

  { id:164, subject:'Química', topic:'Química Orgânica — Funções', subtopic:'Hidrocarbonetos — Alcanos', type:'enem', year:2021, difficulty:'facil',
    statement:'A fórmula geral dos alcanos (hidrocarbonetos de cadeia aberta e saturada) é:',
    alternatives:[{id:'a',text:'CₙH₂ₙ'},{id:'b',text:'CₙH₂ₙ₊₂'},{id:'c',text:'CₙH₂ₙ₋₂'},{id:'d',text:'CₙHₙ'},{id:'e',text:'CₙH₂ₙ₊₁'}],
    answer:'b', explanation:'Alcanos (parafinas): apenas ligações C-C simples. Fórmula geral CₙH₂ₙ₊₂. Ex.: metano CH₄ (n=1), etano C₂H₆ (n=2).' },

  { id:165, subject:'Química', topic:'Química Orgânica — Funções', subtopic:'Álcoois', type:'uerj', year:2022, difficulty:'facil',
    statement:'Os álcoois são compostos orgânicos caracterizados pela presença do grupo funcional:',
    alternatives:[{id:'a',text:'–CHO (aldeído)'},{id:'b',text:'–COOH (carboxila)'},{id:'c',text:'–OH ligado a carbono saturado (hidroxila)'},{id:'d',text:'–CO– (carbonila cetônica)'},{id:'e',text:'–NH₂ (amina)'}],
    answer:'c', explanation:'Álcool: grupo –OH (hidroxila) ligado a carbono saturado (sp³). Ex.: etanol C₂H₅OH. Fenóis têm –OH ligado a carbono aromático.' },

  { id:166, subject:'Química', topic:'Equilíbrio', subtopic:'Química Ambiental — Chuva Ácida', type:'enem', year:2022, difficulty:'medio',
    statement:'A chuva ácida é formada principalmente pela dissolução na atmosfera de:',
    alternatives:[{id:'a',text:'O₂ e N₂, formando ácido nítrico e ácido perclórico.'},{id:'b',text:'CO₂ liberado pela respiração celular dos organismos.'},{id:'c',text:'SO₂ e NOₓ emitidos por queima de combustíveis fósseis, formando ácido sulfúrico e nítrico.'},{id:'d',text:'CFC emitidos por aerossóis, que destroem a camada de ozônio.'},{id:'e',text:'CO emitido por automóveis, formando ácido carbônico na atmosfera.'}],
    answer:'c', explanation:'SO₂ + H₂O → H₂SO₃ (e H₂SO₄); NO₂ + H₂O → HNO₃. Esses ácidos precipitam com as chuvas causando danos a ecossistemas, monumentos e saúde.' },

  { id:167, subject:'Química', topic:'Química Orgânica — Reações', subtopic:'Polímeros', type:'enem', year:2023, difficulty:'medio',
    statement:'O polietileno (PE), plástico mais produzido no mundo, é obtido por:',
    alternatives:[{id:'a',text:'polimerização por condensação do etanol, liberando água.'},{id:'b',text:'polimerização por adição do etileno (CH₂=CH₂), sem subprodutos.'},{id:'c',text:'hidrólise do amido natural de milho em condições industriais.'},{id:'d',text:'saponificação de triglicerídeos com hidróxido de sódio.'},{id:'e',text:'fermentação do etileno por microrganismos anaeróbios.'}],
    answer:'b', explanation:'Polietileno: polimerização por adição do monômero etileno (alceno). As duplas ligações C=C se abrem e formam a cadeia polimérica: n(CH₂=CH₂) → (–CH₂–CH₂–)ₙ.' },

  { id:168, subject:'Química', topic:'Soluções', subtopic:'Propriedades Coligativas', type:'uerj', year:2022, difficulty:'dificil',
    statement:'A adição de sal (NaCl) à água de cozimento eleva o ponto de ebulição porque:',
    alternatives:[{id:'a',text:'o sal reage quimicamente com a água, liberando calor.'},{id:'b',text:'o sal aumenta a pressão de vapor da água, facilitando a ebulição.'},{id:'c',text:'a presença de soluto não volátil reduz a pressão de vapor, exigindo temperatura mais alta para a ebulição (ebulioscopia).'},{id:'d',text:'o NaCl é absorvido pelo alimento, acelerando o cozimento.'},{id:'e',text:'o sal reduz a tensão superficial da água, facilitando a transferência de calor.'}],
    answer:'c', explanation:'Ebulioscopia (elevação do ponto de ebulição): propriedade coligativa — a presença de soluto não volátil reduz a pressão de vapor, exigindo T mais alta para ebulição. ΔTeb=Keb×m.' },

  { id:169, subject:'Química', topic:'Equilíbrio', subtopic:'Ácidos e Bases — Arrhenius', type:'enem', year:2021, difficulty:'facil',
    statement:'Segundo a teoria de Arrhenius, uma base é uma substância que, em solução aquosa:',
    alternatives:[{id:'a',text:'libera íons H⁺ (prótons) como único cátion.'},{id:'b',text:'aceita pares de elétrons de outras moléculas.'},{id:'c',text:'libera íons OH⁻ (hidroxila) como único ânion.'},{id:'d',text:'doa prótons para o solvente segundo Brønsted-Lowry.'},{id:'e',text:'forma soluções de pH menor que 7.'}],
    answer:'c', explanation:'Arrhenius (1884): ácido libera H⁺; base libera OH⁻. Ex.: NaOH → Na⁺ + OH⁻. Teoria limitada a solvente aquoso; substituída em parte por Brønsted-Lowry e Lewis.' },

  { id:170, subject:'Química', topic:'Eletroquímica', subtopic:'Reações de Oxirredução', type:'uerj', year:2023, difficulty:'medio',
    statement:'Na reação Fe + CuSO₄ → FeSO₄ + Cu, o ferro (Fe) sofre:',
    alternatives:[{id:'a',text:'redução — ganha elétrons e seu número de oxidação diminui.'},{id:'b',text:'oxidação — perde elétrons e seu número de oxidação aumenta.'},{id:'c',text:'dissolução sem variação do estado de oxidação.'},{id:'d',text:'neutralização com o sulfato de cobre.'},{id:'e',text:'substituição simples sem transferência de elétrons.'}],
    answer:'b', explanation:'Fe⁰ → Fe²⁺ (perde 2 elétrons) = oxidação. Cu²⁺ → Cu⁰ (ganha 2 elétrons) = redução. O Fe é o agente redutor; o Cu²⁺ é o agente oxidante.' },

  { id:171, subject:'Química', topic:'Química Orgânica — Funções', subtopic:'Isomeria — Cadeia', type:'enem', year:2022, difficulty:'dificil',
    statement:'Butano (C₄H₁₀) e isobutano (2-metilpropano, C₄H₁₀) são isômeros porque:',
    alternatives:[{id:'a',text:'têm fórmulas moleculares diferentes mas mesma fórmula estrutural.'},{id:'b',text:'têm a mesma fórmula molecular (C₄H₁₀) mas estruturas (cadeias carbônicas) diferentes.'},{id:'c',text:'diferem apenas no estado de oxidação do carbono central.'},{id:'d',text:'são alótropos do carbono com diferentes arranjos cristalinos.'},{id:'e',text:'têm o mesmo ponto de ebulição mas densidades diferentes.'}],
    answer:'b', explanation:'Isomeria de cadeia: mesma fórmula molecular, diferentes arranjos da cadeia carbônica. Butano: cadeia linear; isobutano: cadeia ramificada (um metil no C2).' },

  { id:172, subject:'Química', topic:'Química Orgânica — Reações', subtopic:'Saponificação', type:'uerj', year:2021, difficulty:'medio',
    statement:'A saponificação é uma reação de:',
    alternatives:[{id:'a',text:'adição de H₂ a ácidos graxos insaturados.'},{id:'b',text:'éster + base forte (NaOH) → sabão (sal de ácido graxo) + glicerol.'},{id:'c',text:'polimerização de ácidos graxos para formar polímeros biodegradáveis.'},{id:'d',text:'oxidação completa de óleos vegetais com oxigênio.'},{id:'e',text:'neutralização de ácidos graxos com ácido clorídrico.'}],
    answer:'b', explanation:'Saponificação (hidrólise básica de ésteres): triglicerídeo + 3 NaOH → 3 sabão (carboxilato de sódio) + glicerol. Reação usada na fabricação de sabão há milênios.' },

  { id:173, subject:'Química', topic:'Soluções', subtopic:'Misturas', type:'enem', year:2020, difficulty:'facil',
    statement:'Qual das seguintes misturas é classificada como homogênea?',
    alternatives:[{id:'a',text:'Areia e água'},{id:'b',text:'Água e óleo'},{id:'c',text:'Sal dissolvido em água'},{id:'d',text:'Granito (quartzo, feldspato e mica)'},{id:'e',text:'Sangue total'}],
    answer:'c', explanation:'Mistura homogênea (solução): uma fase única. Sal dissolvido em água forma solução transparente e uniforme. As outras misturas têm duas ou mais fases visíveis.' },

  { id:174, subject:'Química', topic:'Ligações Químicas', subtopic:'Geometria Molecular', type:'uerj', year:2022, difficulty:'medio',
    statement:'A molécula de CO₂ é linear e apolar, enquanto H₂O é angular e polar. Essa diferença se deve:',
    alternatives:[{id:'a',text:'à diferença de eletronegatividade entre C e H.'},{id:'b',text:'ao fato de o CO₂ ter ligações iônicas e H₂O ter covalentes.'},{id:'c',text:'à presença de pares de elétrons não ligantes no O do H₂O que deformam a geometria, tornando-a angular e criando dipolo permanente.'},{id:'d',text:'ao CO₂ ter 3 ligações covalentes e H₂O ter apenas 2.'},{id:'e',text:'ao fato de a água ter mais elétrons que o CO₂.'}],
    answer:'c', explanation:'H₂O: O tem 2 pares não ligantes que repelem as ligações O-H, criando geometria angular (104,5°) e momento de dipolo permanente. CO₂ linear tem dipolos opostos que se cancelam.' },

  { id:175, subject:'Química', topic:'Termoquímica', subtopic:'Efeito Estufa', type:'enem', year:2023, difficulty:'facil',
    statement:'O efeito estufa é um fenômeno natural essencial à vida na Terra. O problema atual é o:',
    alternatives:[{id:'a',text:'enfraquecimento do efeito estufa pela destruição da camada de ozônio.'},{id:'b',text:'aumento do efeito estufa pela emissão antrópica de CO₂, metano e outros gases, intensificando o aquecimento global.'},{id:'c',text:'efeito estufa que afeta apenas países industrializados do hemisfério norte.'},{id:'d',text:'diminuição das chuvas pelo efeito estufa que aquece exclusivamente os desertos.'},{id:'e',text:'expansão do efeito estufa aos oceanos, que normalmente não absorvem calor.'}],
    answer:'b', explanation:'O efeito estufa natural retém calor e mantém a Terra habitável. O problema é a intensificação antrópica: queima de fósseis e desmatamento elevam CO₂, CH₄ e N₂O na atmosfera.' },

  { id:176, subject:'Química', topic:'Estequiometria', subtopic:'Massa Molar', type:'uerj', year:2023, difficulty:'medio',
    statement:'Quantos mols de átomos de H estão presentes em 2 mols de H₂O? (H=1 g/mol; O=16 g/mol)',
    alternatives:[{id:'a',text:'1 mol'},{id:'b',text:'2 mols'},{id:'c',text:'4 mols'},{id:'d',text:'6 mols'},{id:'e',text:'8 mols'}],
    answer:'c', explanation:'1 mol de H₂O contém 2 mol de H. Logo, 2 mol H₂O contém 2×2=4 mol de H.' },

  { id:177, subject:'Química', topic:'Ligações Químicas', subtopic:'Funções Inorgânicas — Óxidos', type:'enem', year:2021, difficulty:'medio',
    statement:'O óxido SO₃, ao reagir com água, forma:',
    alternatives:[{id:'a',text:'Ácido clorídrico (HCl)'},{id:'b',text:'Hidróxido de sódio (NaOH)'},{id:'c',text:'Ácido sulfúrico (H₂SO₄)'},{id:'d',text:'Ácido carbônico (H₂CO₃)'},{id:'e',text:'Sulfeto de hidrogênio (H₂S)'}],
    answer:'c', explanation:'SO₃ + H₂O → H₂SO₄ (ácido sulfúrico). Óxidos ácidos (anidridos) reagem com água para formar ácidos oxigenados.' },

  { id:178, subject:'Química', topic:'Química Orgânica — Funções', subtopic:'Ésteres', type:'uerj', year:2022, difficulty:'medio',
    statement:'A reação de esterificação ocorre entre:',
    alternatives:[{id:'a',text:'dois álcoois que formam um éter e água.'},{id:'b',text:'um ácido carboxílico e um álcool, produzindo éster e água.'},{id:'c',text:'uma cetona e um álcool, produzindo hemiacetal.'},{id:'d',text:'um ácido e uma base, produzindo sal e água.'},{id:'e',text:'dois ácidos carboxílicos que formam anidrido de ácido.'}],
    answer:'b', explanation:'Esterificação: RCOOH + R\'OH ⇌ RCOOR\' + H₂O. É reversível (equilíbrio); a reação inversa é a hidrólise do éster.' },

  { id:179, subject:'Química', topic:'Termoquímica', subtopic:'Lei de Hess', type:'enem', year:2023, difficulty:'dificil',
    statement:'A Lei de Hess estabelece que a variação de entalpia (ΔH) de uma reação:',
    alternatives:[{id:'a',text:'depende do caminho percorrido — reações lentas têm ΔH diferente das rápidas.'},{id:'b',text:'é sempre negativa, pois todas as reações liberam calor.'},{id:'c',text:'é independente do caminho: depende apenas dos estados inicial e final (função de estado).'},{id:'d',text:'só pode ser medida a pressão constante em calorímetros.'},{id:'e',text:'aumenta com a temperatura segundo a equação de Van\'t Hoff.'}],
    answer:'c', explanation:'Lei de Hess: ΔH é função de estado — independe do mecanismo. Permite calcular ΔH de reações difíceis de medir diretamente, somando etapas intermediárias.' },

  { id:180, subject:'Química', topic:'Eletroquímica', subtopic:'Eletrólise', type:'uerj', year:2022, difficulty:'dificil',
    statement:'Na eletrólise da água acidulada, o que ocorre no polo positivo (ânodo)?',
    alternatives:[{id:'a',text:'Redução dos íons H⁺, formando H₂(g).'},{id:'b',text:'Oxidação da água, liberando O₂(g) e H⁺.'},{id:'c',text:'Deposição de metal pela redução de cátions.'},{id:'d',text:'Redução de OH⁻, formando H₂O.'},{id:'e',text:'Formação de NaOH por neutralização.'}],
    answer:'b', explanation:'Ânodo (oxidação): 2H₂O → O₂ + 4H⁺ + 4e⁻. Cátodo (redução): 4H⁺ + 4e⁻ → 2H₂. A eletrólise da água produz H₂ e O₂ na proporção 2:1 em volume.' },


  // ── FÍSICA (30) ──────────────────────────────────────────────────────────
  { id:181, subject:'Física', topic:'Cinemática', subtopic:'MRUV', type:'enem', year:2022, difficulty:'medio',
    statement:'Um automóvel parte do repouso e acelera uniformemente, atingindo 72 km/h em 10 s. Qual é a aceleração em m/s²?',
    alternatives:[{id:'a',text:'0,5 m/s²'},{id:'b',text:'1 m/s²'},{id:'c',text:'2 m/s²'},{id:'d',text:'7,2 m/s²'},{id:'e',text:'10 m/s²'}],
    answer:'c', explanation:'72 km/h=20 m/s. a=(v−v₀)/t=(20−0)/10=2 m/s².' },

  { id:182, subject:'Física', topic:'Eletrodinâmica', subtopic:'Lei de Ohm', type:'uerj', year:2023, difficulty:'medio',
    statement:'Um resistor de 20 Ω é ligado a 100 V. Qual é a corrente e a potência dissipada?',
    alternatives:[{id:'a',text:'I=2 A e P=200 W'},{id:'b',text:'I=5 A e P=100 W'},{id:'c',text:'I=5 A e P=500 W'},{id:'d',text:'I=10 A e P=1.000 W'},{id:'e',text:'I=5 A e P=250 W'}],
    answer:'c', explanation:'I=V/R=100/20=5 A. P=VI=100×5=500 W.' },

  { id:183, subject:'Física', topic:'Cinemática', subtopic:'MRU', type:'enem', year:2021, difficulty:'facil',
    statement:'Um carro percorre 180 km em 2 h a velocidade constante. Qual é a velocidade em m/s?',
    alternatives:[{id:'a',text:'25 m/s'},{id:'b',text:'45 m/s'},{id:'c',text:'50 m/s'},{id:'d',text:'90 m/s'},{id:'e',text:'30 m/s'}],
    answer:'a', explanation:'v=180/2=90 km/h=90×1000/3600=25 m/s.' },

  { id:184, subject:'Física', topic:'Cinemática', subtopic:'Queda Livre', type:'enem', year:2022, difficulty:'medio',
    statement:'Um objeto é largado do repouso do alto de um edifício e leva 4 s para atingir o solo. Qual é a altura do edifício? (g=10 m/s²)',
    alternatives:[{id:'a',text:'40 m'},{id:'b',text:'60 m'},{id:'c',text:'80 m'},{id:'d',text:'100 m'},{id:'e',text:'160 m'}],
    answer:'c', explanation:'h=gt²/2=10×16/2=80 m.' },

  { id:185, subject:'Física', topic:'Dinâmica', subtopic:'2ª Lei de Newton', type:'enem', year:2023, difficulty:'facil',
    statement:'Uma força resultante de 30 N age sobre um corpo de 6 kg. Qual é a aceleração?',
    alternatives:[{id:'a',text:'0,2 m/s²'},{id:'b',text:'5 m/s²'},{id:'c',text:'24 m/s²'},{id:'d',text:'36 m/s²'},{id:'e',text:'180 m/s²'}],
    answer:'b', explanation:'F=ma → a=F/m=30/6=5 m/s².' },

  { id:186, subject:'Física', topic:'Energia e Trabalho', subtopic:'Trabalho Mecânico', type:'uerj', year:2022, difficulty:'medio',
    statement:'Uma força de 50 N desloca um objeto 8 m na direção da força. Qual é o trabalho realizado?',
    alternatives:[{id:'a',text:'6,25 J'},{id:'b',text:'42 J'},{id:'c',text:'400 J'},{id:'d',text:'58 J'},{id:'e',text:'4.000 J'}],
    answer:'c', explanation:'τ=F×d×cos θ=50×8×cos0°=400 J.' },

  { id:187, subject:'Física', topic:'Energia e Trabalho', subtopic:'Energia Cinética', type:'enem', year:2021, difficulty:'medio',
    statement:'Um corpo de 2 kg se move a 10 m/s. Qual é sua energia cinética?',
    alternatives:[{id:'a',text:'10 J'},{id:'b',text:'20 J'},{id:'c',text:'100 J'},{id:'d',text:'200 J'},{id:'e',text:'400 J'}],
    answer:'c', explanation:'Ec=mv²/2=2×100/2=100 J.' },

  { id:188, subject:'Física', topic:'Energia e Trabalho', subtopic:'Energia Potencial Gravitacional', type:'uerj', year:2021, difficulty:'facil',
    statement:'Um objeto de 5 kg está a 20 m do chão. Qual é sua energia potencial gravitacional? (g=10 m/s²)',
    alternatives:[{id:'a',text:'100 J'},{id:'b',text:'500 J'},{id:'c',text:'1.000 J'},{id:'d',text:'2.000 J'},{id:'e',text:'10.000 J'}],
    answer:'c', explanation:'Ep=mgh=5×10×20=1.000 J.' },

  { id:189, subject:'Física', topic:'Energia e Trabalho', subtopic:'Conservação de Energia', type:'enem', year:2022, difficulty:'medio',
    statement:'Uma pedra de 1 kg é lançada do alto de uma torre de 45 m (g=10 m/s²). Qual é a velocidade ao atingir o solo? (despreze o ar)',
    alternatives:[{id:'a',text:'10 m/s'},{id:'b',text:'20 m/s'},{id:'c',text:'30 m/s'},{id:'d',text:'45 m/s'},{id:'e',text:'90 m/s'}],
    answer:'c', explanation:'Ep=Ec → mgh=mv²/2 → v=√(2gh)=√(2×10×45)=√900=30 m/s.' },

  { id:190, subject:'Física', topic:'Dinâmica', subtopic:'Quantidade de Movimento', type:'uerj', year:2023, difficulty:'medio',
    statement:'Um corpo de 4 kg se move a 15 m/s. Qual é seu momento linear (quantidade de movimento)?',
    alternatives:[{id:'a',text:'4 kg·m/s'},{id:'b',text:'15 kg·m/s'},{id:'c',text:'19 kg·m/s'},{id:'d',text:'60 kg·m/s'},{id:'e',text:'225 kg·m/s'}],
    answer:'d', explanation:'p=m×v=4×15=60 kg·m/s.' },

  { id:191, subject:'Física', topic:'Óptica', subtopic:'Reflexão', type:'enem', year:2022, difficulty:'facil',
    statement:'A lei da reflexão da luz estabelece que:',
    alternatives:[{id:'a',text:'o ângulo de incidência é sempre menor que o de reflexão.'},{id:'b',text:'o ângulo de incidência é sempre maior que o de reflexão.'},{id:'c',text:'o ângulo de incidência é igual ao ângulo de reflexão, ambos medidos em relação à normal.'},{id:'d',text:'a luz refletida sempre muda de meio óptico.'},{id:'e',text:'a reflexão só ocorre em superfícies polidas.'}],
    answer:'c', explanation:'1ª lei da reflexão: θᵢ=θᵣ (ângulos iguais à normal). 2ª lei: raio incidente, normal e refletido são coplanares.' },

  { id:192, subject:'Física', topic:'Óptica', subtopic:'Refração', type:'uerj', year:2022, difficulty:'medio',
    statement:'Quando a luz passa do ar (n=1) para a água (n=1,33), ela:',
    alternatives:[{id:'a',text:'aumenta sua velocidade e desvia-se da normal.'},{id:'b',text:'mantém velocidade e direção inalteradas.'},{id:'c',text:'diminui sua velocidade e aproxima-se da normal.'},{id:'d',text:'é completamente refletida na interface.'},{id:'e',text:'aumenta seu comprimento de onda.'}],
    answer:'c', explanation:'Ao passar para meio mais denso opticamente (n maior), a luz diminui velocidade e curva em direção à normal. Lei de Snell: n₁sinθ₁=n₂sinθ₂.' },

  { id:193, subject:'Física', topic:'Ondulatória', subtopic:'Frequência e Comprimento de Onda', type:'enem', year:2021, difficulty:'medio',
    statement:'Uma onda tem velocidade 340 m/s e frequência 170 Hz. Qual é o comprimento de onda?',
    alternatives:[{id:'a',text:'0,5 m'},{id:'b',text:'1 m'},{id:'c',text:'2 m'},{id:'d',text:'4 m'},{id:'e',text:'10 m'}],
    answer:'c', explanation:'v=λ×f → λ=v/f=340/170=2 m.' },

  { id:194, subject:'Física', topic:'Termologia', subtopic:'Calor Específico', type:'enem', year:2022, difficulty:'medio',
    statement:'Qual a quantidade de calor necessária para aquecer 2 kg de água de 20°C a 70°C? (c_água=4.200 J/kg°C)',
    alternatives:[{id:'a',text:'84.000 J'},{id:'b',text:'168.000 J'},{id:'c',text:'420.000 J'},{id:'d',text:'840.000 J'},{id:'e',text:'4.200 J'}],
    answer:'c', explanation:'Q=mcΔT=2×4200×50=420.000 J.' },

  { id:195, subject:'Física', topic:'Termologia', subtopic:'Dilatação Térmica', type:'uerj', year:2021, difficulty:'medio',
    statement:'Uma barra de aço de 10 m a 20°C é aquecida a 120°C. Qual é a dilatação? (α=1,2×10⁻⁵/°C)',
    alternatives:[{id:'a',text:'0,006 m'},{id:'b',text:'0,012 m'},{id:'c',text:'0,024 m'},{id:'d',text:'0,12 m'},{id:'e',text:'1,2 m'}],
    answer:'b', explanation:'ΔL=L₀×α×ΔT=10×1,2×10⁻⁵×100=0,012 m.' },

  { id:196, subject:'Física', topic:'Termologia', subtopic:'Gases — Lei de Boyle', type:'enem', year:2023, difficulty:'medio',
    statement:'Um gás a 2 atm ocupa 6 L a temperatura constante. Se a pressão cai para 1 atm, qual é o novo volume?',
    alternatives:[{id:'a',text:'3 L'},{id:'b',text:'6 L'},{id:'c',text:'9 L'},{id:'d',text:'12 L'},{id:'e',text:'18 L'}],
    answer:'d', explanation:'P₁V₁=P₂V₂ → 2×6=1×V₂ → V₂=12 L.' },

  { id:197, subject:'Física', topic:'Eletrostática', subtopic:'Lei de Coulomb', type:'uerj', year:2022, difficulty:'dificil',
    statement:'Duas cargas de +2 μC e +8 μC estão separadas por 0,2 m. Se a distância dobrar, a força entre elas:',
    alternatives:[{id:'a',text:'dobra.'},{id:'b',text:'fica quatro vezes maior.'},{id:'c',text:'reduz-se à metade.'},{id:'d',text:'fica quatro vezes menor.'},{id:'e',text:'permanece a mesma.'}],
    answer:'d', explanation:'F=kq₁q₂/d². Se d dobra, d²=4×d²orig → F fica 4 vezes menor.' },

  { id:198, subject:'Física', topic:'Eletrodinâmica', subtopic:'Circuito Série', type:'enem', year:2021, difficulty:'medio',
    statement:'Dois resistores de 10 Ω e 20 Ω estão em série com fonte de 60 V. Qual é a corrente no circuito?',
    alternatives:[{id:'a',text:'1 A'},{id:'b',text:'2 A'},{id:'c',text:'3 A'},{id:'d',text:'4 A'},{id:'e',text:'6 A'}],
    answer:'b', explanation:'R_total=10+20=30 Ω. I=V/R=60/30=2 A.' },

  { id:199, subject:'Física', topic:'Eletrodinâmica', subtopic:'Circuito Paralelo', type:'uerj', year:2022, difficulty:'medio',
    statement:'Dois resistores de 6 Ω e 12 Ω estão em paralelo. Qual é a resistência equivalente?',
    alternatives:[{id:'a',text:'2 Ω'},{id:'b',text:'4 Ω'},{id:'c',text:'6 Ω'},{id:'d',text:'9 Ω'},{id:'e',text:'18 Ω'}],
    answer:'b', explanation:'1/Req=1/6+1/12=2/12+1/12=3/12=1/4 → Req=4 Ω.' },

  { id:200, subject:'Física', topic:'Dinâmica', subtopic:'Força de Atrito', type:'enem', year:2022, difficulty:'medio',
    statement:'Um bloco de 10 kg está sobre uma superfície com μ=0,3. Qual é a força de atrito estático máxima? (g=10 m/s²)',
    alternatives:[{id:'a',text:'3 N'},{id:'b',text:'10 N'},{id:'c',text:'30 N'},{id:'d',text:'100 N'},{id:'e',text:'300 N'}],
    answer:'c', explanation:'Fat=μ×N=μ×mg=0,3×10×10=30 N.' },

  { id:201, subject:'Física', topic:'Eletromagnetismo', subtopic:'Força sobre Carga em Movimento', type:'uerj', year:2023, difficulty:'dificil',
    statement:'Uma carga positiva move-se paralelamente a um fio condutor com corrente no mesmo sentido. A força magnética sobre a carga é:',
    alternatives:[{id:'a',text:'nula, pois a carga se move na mesma direção do campo.'},{id:'b',text:'atrativa em relação ao fio.'},{id:'c',text:'repulsiva em relação ao fio.'},{id:'d',text:'perpendicular ao fio, afastando a carga.'},{id:'e',text:'perpendicular ao fio e ao vetor velocidade — pela regra da mão direita.'}],
    answer:'b', explanation:'Cargas paralelas ao fio com corrente no mesmo sentido sofrem força atrativa (análogo a correntes paralelas em fios). F=qv×B — a direção é calculada pela regra da mão direita.' },

  { id:202, subject:'Física', topic:'Ondulatória', subtopic:'Som — Características', type:'enem', year:2021, difficulty:'facil',
    statement:'O som é uma onda mecânica longitudinal. Qual propriedade do som está associada à amplitude da onda?',
    alternatives:[{id:'a',text:'Tom (frequência)'},{id:'b',text:'Timbre'},{id:'c',text:'Intensidade (volume)'},{id:'d',text:'Velocidade de propagação'},{id:'e',text:'Comprimento de onda'}],
    answer:'c', explanation:'Intensidade/volume: relacionada à amplitude (energia da onda). Tom: frequência. Timbre: harmônicos. Velocidade: depende do meio.' },

  { id:203, subject:'Física', topic:'Eletromagnetismo', subtopic:'Relatividade — Conceitos', type:'enem', year:2022, difficulty:'dificil',
    statement:'A teoria da relatividade restrita de Einstein (1905) estabelece que:',
    alternatives:[{id:'a',text:'a massa de um objeto é constante independentemente da velocidade.'},{id:'b',text:'a velocidade da luz no vácuo é a mesma para todos os observadores, e o tempo é absoluto.'},{id:'c',text:'a velocidade da luz é constante para todos os observadores, e massa, comprimento e tempo variam com a velocidade.'},{id:'d',text:'objetos mais pesados caem mais rápido que objetos leves.'},{id:'e',text:'a gravidade é uma força de natureza eletromagnética.'}],
    answer:'c', explanation:'Relatividade restrita: c é invariante para todos os referenciais inerciais. Consequências: dilatação do tempo, contração do comprimento e equivalência massa-energia (E=mc²).' },

  { id:204, subject:'Física', topic:'Eletromagnetismo', subtopic:'Física Nuclear', type:'uerj', year:2023, difficulty:'dificil',
    statement:'A fissão nuclear, usada em usinas nucleares, libera grandes quantidades de energia porque:',
    alternatives:[{id:'a',text:'os elétrons das camadas externas colidem, liberando fótons de alta energia.'},{id:'b',text:'um núcleo pesado (ex.: ²³⁵U) se divide em núcleos menores, com a massa dos produtos sendo menor que a original — a diferença é convertida em energia (E=mc²).'},{id:'c',text:'núcleos leves se fundem, liberando neutrons e calor.'},{id:'d',text:'reações químicas de oxidação do urânio com oxigênio geram calor intenso.'},{id:'e',text:'elétrons são acelerados a velocidades próximas à da luz, gerando radiação gama.'}],
    answer:'b', explanation:'Fissão nuclear: ²³⁵U + n → fragmentos + neutrons + energia. A pequena perda de massa (defeito de massa) é convertida em imensa energia via E=mc².' },

  { id:205, subject:'Física', topic:'Ondulatória', subtopic:'Efeito Fotoelétrico', type:'enem', year:2022, difficulty:'dificil',
    statement:'O efeito fotoelétrico demonstrou que a luz tem natureza corpuscular porque:',
    alternatives:[{id:'a',text:'a luz se difrata ao passar por fendas, comportando-se como onda.'},{id:'b',text:'a emissão de elétrons depende da frequência da luz (não da intensidade) — abaixo de uma frequência mínima, nenhum elétron é emitido.'},{id:'c',text:'a luz viaja a velocidade constante no vácuo, independentemente da fonte.'},{id:'d',text:'raios gama têm maior comprimento de onda que raios visíveis.'},{id:'e',text:'a intensidade luminosa é proporcional à amplitude da onda.'}],
    answer:'b', explanation:'Einstein (1905): a luz é composta de fótons com energia E=hf. Se f<f_mínima, nenhum fóton tem energia para ejetar o elétron — independente da intensidade. Nobel de 1921.' },

  { id:206, subject:'Física', topic:'Dinâmica', subtopic:'Gravitação — Terceira Lei de Kepler', type:'uerj', year:2021, difficulty:'dificil',
    statement:'A Terceira Lei de Kepler estabelece que, para planetas em órbita ao redor do Sol:',
    alternatives:[{id:'a',text:'todos os planetas descrevem órbitas circulares perfeitas.'},{id:'b',text:'o quadrado do período orbital é proporcional ao cubo do semieixo maior da órbita (T²∝a³).'},{id:'c',text:'a velocidade orbital é constante ao longo de toda a órbita.'},{id:'d',text:'a força gravitacional é igual à força centrífuga em qualquer ponto da órbita.'},{id:'e',text:'planetas próximos ao Sol têm período orbital maior.'}],
    answer:'b', explanation:'3ª Lei de Kepler: T²=k×a³. Quanto mais distante do Sol (a maior), maior o período orbital — Netuno orbita o Sol em ~165 anos; Mercúrio em ~88 dias.' },

  { id:207, subject:'Física', topic:'Termologia', subtopic:'Temperatura e Escalas', type:'enem', year:2020, difficulty:'facil',
    statement:'Qual é a temperatura de 37°C (temperatura corporal) na escala Kelvin?',
    alternatives:[{id:'a',text:'173 K'},{id:'b',text:'237 K'},{id:'c',text:'273 K'},{id:'d',text:'310 K'},{id:'e',text:'373 K'}],
    answer:'d', explanation:'K=°C+273=37+273=310 K.' },

  { id:208, subject:'Física', topic:'Hidrostática', subtopic:'Princípio de Arquimedes', type:'uerj', year:2022, difficulty:'medio',
    statement:'O empuxo que age sobre um corpo imerso em um fluido é igual a:',
    alternatives:[{id:'a',text:'a massa do corpo multiplicada pela gravidade.'},{id:'b',text:'o peso do fluido deslocado pelo corpo.'},{id:'c',text:'a pressão do fluido na base do corpo.'},{id:'d',text:'a força de atrito entre o fluido e a superfície do corpo.'},{id:'e',text:'o volume do corpo multiplicado pela densidade dele.'}],
    answer:'b', explanation:'Princípio de Arquimedes: E=ρ_fluido × V_imerso × g = peso do fluido deslocado. Um corpo flutua se E ≥ P (peso do corpo).' },

  { id:209, subject:'Física', topic:'Óptica', subtopic:'Lentes Convergentes', type:'enem', year:2023, difficulty:'medio',
    statement:'Uma lente convergente forma imagem real e invertida de um objeto quando:',
    alternatives:[{id:'a',text:'o objeto está entre a lente e o foco.'},{id:'b',text:'o objeto está no plano focal.'},{id:'c',text:'o objeto está além do foco (do lado do objeto).'},{id:'d',text:'a lente está molhada.'},{id:'e',text:'a fonte de luz é monocromática.'}],
    answer:'c', explanation:'Objeto além do foco (do=f): imagem real, invertida e no lado oposto. Objeto entre foco e lente: imagem virtual, direita e ampliada (como lupa).' },

  { id:210, subject:'Física', topic:'Dinâmica', subtopic:'Colisão — Conservação', type:'uerj', year:2023, difficulty:'dificil',
    statement:'Dois trilhos: bloco A (2 kg, 6 m/s) colide com bloco B (4 kg, em repouso) e grudam. Qual é a velocidade final?',
    alternatives:[{id:'a',text:'1 m/s'},{id:'b',text:'2 m/s'},{id:'c',text:'3 m/s'},{id:'d',text:'4 m/s'},{id:'e',text:'6 m/s'}],
    answer:'b', explanation:'Colisão perfeitamente inelástica: p_inicial=p_final. 2×6+4×0=(2+4)×v → 12=6v → v=2 m/s.' },

  // ── GEOGRAFIA (30) ───────────────────────────────────────────────────────
  { id:211, subject:'Geografia', topic:'Urbanização', subtopic:'Urbanização Brasileira', type:'enem', year:2023, difficulty:'medio',
    statement:'O processo de urbanização brasileiro, intensificado a partir dos anos 1950, caracterizou-se principalmente pela:',
    alternatives:[{id:'a',text:'distribuição equilibrada da população entre todas as regiões do país.'},{id:'b',text:'industrialização homogênea que se expandiu por todo o território.'},{id:'c',text:'migração intensa do campo para as cidades, gerando crescimento desordenado e periferização.'},{id:'d',text:'redução das desigualdades socioespaciais.'},{id:'e',text:'consolidação de rede urbana policêntrica.'}],
    answer:'c', explanation:'A industrialização concentrada no Sudeste atraiu fluxos migratórios, gerando crescimento urbano sem planejamento, favelas e déficit de infraestrutura.' },

  { id:212, subject:'Geografia', topic:'Biomas do Brasil', subtopic:'Cerrado', type:'uerj', year:2022, difficulty:'facil',
    statement:'A principal ameaça ao Cerrado, "hotspot" de biodiversidade que ocupa 22% do território brasileiro, é:',
    alternatives:[{id:'a',text:'exploração mineral intensiva.'},{id:'b',text:'avanço da agropecuária, sobretudo soja e pecuária extensiva.'},{id:'c',text:'construção de hidrelétricas.'},{id:'d',text:'extração madeireira artesanal.'},{id:'e',text:'avanço da cafeicultura.'}],
    answer:'b', explanation:'O Cerrado perdeu mais de 50% de sua cobertura original pela expansão do agronegócio, especialmente a fronteira agrícola do MATOPIBA.' },

  { id:213, subject:'Geografia', topic:'Cartografia', subtopic:'Fusos Horários', type:'enem', year:2021, difficulty:'facil',
    statement:'O Brasil está localizado principalmente entre os fusos -3 e -5 (em relação ao horário UTC/GMT). Quando são 12h em Brasília (UTC-3), que horas são em Londres (UTC 0)?',
    alternatives:[{id:'a',text:'9h'},{id:'b',text:'12h'},{id:'c',text:'15h'},{id:'d',text:'3h'},{id:'e',text:'18h'}],
    answer:'c', explanation:'Brasília está 3h atrás de Londres. Se Brasília=12h → Londres=12h+3h=15h.' },

  { id:214, subject:'Geografia', topic:'Cartografia', subtopic:'Relevo Brasileiro', type:'uerj', year:2022, difficulty:'medio',
    statement:'A maior parte do relevo brasileiro é constituída por:',
    alternatives:[{id:'a',text:'planícies baixas abaixo de 200 m.'},{id:'b',text:'cordilheiras com picos acima de 5.000 m.'},{id:'c',text:'planaltos e chapadas entre 200 m e 1.200 m, resultado de erosão milenar.'},{id:'d',text:'depressões abaixo do nível do mar.'},{id:'e',text:'vulcões ativos na região amazônica.'}],
    answer:'c', explanation:'Brasil não tem cordilheiras jovens. Seu relevo predominante são planaltos (antigos escudos cristalinos) e chapadas (sedimentares), com elevações moderadas.' },

  { id:215, subject:'Geografia', topic:'Hidrografia', subtopic:'Rio São Francisco', type:'enem', year:2022, difficulty:'medio',
    statement:'O Rio São Francisco é chamado de "Rio da Integração Nacional" porque:',
    alternatives:[{id:'a',text:'nasce no Sul e deságua no Norte do país.'},{id:'b',text:'é o único rio perene no semiárido nordestino, servindo de referência para transposição e abastecimento.'},{id:'c',text:'faz fronteira com a Argentina.'},{id:'d',text:'tem a maior bacia hidrográfica do Brasil.'},{id:'e',text:'é navegável por toda a sua extensão.'}],
    answer:'b', explanation:'O Velho Chico nasce em Minas Gerais e deságua no Atlântico entre Alagoas e Sergipe. É o único grande rio perene do Nordeste semiárido — fundamental para o abastecimento regional.' },

  { id:216, subject:'Geografia', topic:'Climatologia', subtopic:'Clima Semiárido', type:'uerj', year:2023, difficulty:'medio',
    statement:'O semiárido nordestino é caracterizado por:',
    alternatives:[{id:'a',text:'chuvas abundantes e bem distribuídas ao longo do ano.'},{id:'b',text:'precipitação irregular e concentrada (3-5 meses), longa estiagem e temperaturas altas — condicionando um ecossistema adaptado (Caatinga).'},{id:'c',text:'baixas temperaturas no inverno e geadas frequentes.'},{id:'d',text:'umidade elevada devido à influência da Floresta Amazônica.'},{id:'e',text:'clima tropical úmido com duas estações bem definidas.'}],
    answer:'b', explanation:'O semiárido: 8-10 meses secos, chuvas irregulares (500-800 mm/ano), altas temperaturas. A Caatinga é o único bioma exclusivamente brasileiro, adaptado a essa semiaridez.' },

  { id:217, subject:'Geografia', topic:'Biomas do Brasil', subtopic:'Mata Atlântica', type:'enem', year:2022, difficulty:'medio',
    statement:'A Mata Atlântica, que originalmente cobria 15% do território brasileiro, hoje tem menos de 12% de sua cobertura. O principal fator dessa devastação foi:',
    alternatives:[{id:'a',text:'queimadas naturais causadas por raios na estação seca.'},{id:'b',text:'a expansão da fronteira agrícola para o cultivo de soja no litoral.'},{id:'c',text:'séculos de ocupação humana — desmatamento para agricultura, pecuária e urbanização nas áreas mais populosas do país.'},{id:'d',text:'pragas e doenças que eliminaram as espécies arbóreas nativas.'},{id:'e',text:'o avanço do mar devido ao aquecimento global.'}],
    answer:'c', explanation:'A Mata Atlântica foi devastada ao longo de 500 anos de colonização — madeira, lavoura (cana, café), pecuária e expansão urbana nas regiões mais densamente habitadas do Brasil.' },

  { id:218, subject:'Geografia', topic:'Biomas do Brasil', subtopic:'Amazônia — Desmatamento', type:'enem', year:2024, difficulty:'medio',
    statement:'O desmatamento da Amazônia, além de destruir biodiversidade, impacta o clima regional porque:',
    alternatives:[{id:'a',text:'reduz a cobertura de nuvens, aumentando a incidência de raios solares no sertão.'},{id:'b',text:'elimina os "rios voadores" — fluxos atmosféricos de vapor d\'água que levam chuva ao Centro-Sul do Brasil.'},{id:'c',text:'aumenta a velocidade dos ventos alísios, causando mais ciclones tropicais.'},{id:'d',text:'reduz o teor de CO₂ na atmosfera, causando resfriamento global.'},{id:'e',text:'altera o curso dos rios subterrâneos do aquífero Guarani.'}],
    answer:'b', explanation:'As árvores da Amazônia transpiram bilhões de toneladas de vapor d\'água que formam os "rios voadores" — responsáveis pelas chuvas que irrigam a agricultura do Centro-Sul.' },

  { id:219, subject:'Geografia', topic:'Geopolítica', subtopic:'BRICS', type:'uerj', year:2022, difficulty:'medio',
    statement:'O grupo BRICS (Brasil, Rússia, Índia, China e África do Sul) representa uma articulação de:',
    alternatives:[{id:'a',text:'países desenvolvidos que lideram a ordem econômica mundial atual.'},{id:'b',text:'economias emergentes com peso geopolítico crescente que buscam reformar a ordem internacional.'},{id:'c',text:'países da América Latina unidos em bloco comercial.'},{id:'d',text:'nações com sistemas políticos semelhantes e alianças militares.'},{id:'e',text:'países exportadores de petróleo que controlam o preço do barril.'}],
    answer:'b', explanation:'BRICS: grandes economias emergentes (≈40% da população mundial, ≈25% do PIB global). Buscam reformar o FMI, Conselho de Segurança da ONU e criar alternativas ao dólar.' },

  { id:220, subject:'Geografia', topic:'Globalização', subtopic:'Globalização Econômica', type:'enem', year:2023, difficulty:'medio',
    statement:'A globalização econômica, intensificada a partir dos anos 1990, pode ser caracterizada por:',
    alternatives:[{id:'a',text:'crescente isolamento econômico dos países em desenvolvimento.'},{id:'b',text:'integração dos mercados financeiros, produtivos e comerciais mundiais, impulsionada pelas TICs e pela liberalização do comércio.'},{id:'c',text:'homogeneização cultural absoluta que eliminou as identidades locais.'},{id:'d',text:'redução das desigualdades entre países ricos e pobres.'},{id:'e',text:'declínio das corporações multinacionais em favor de empresas locais.'}],
    answer:'b', explanation:'Globalização: integração financeira (capitais voláteis), produtiva (cadeias globais de valor) e comercial (OMC); acelerada pela internet e tecnologia da informação.' },

  { id:221, subject:'Geografia', topic:'Agropecuária', subtopic:'Questão Agrária', type:'uerj', year:2022, difficulty:'medio',
    statement:'A concentração fundiária no Brasil, medida pelo Índice de Gini da terra, é uma das mais altas do mundo. Isso se deve historicamente à:',
    alternatives:[{id:'a',text:'reforma agrária mal implementada que concentrou terras nas mãos dos sem-terra.'},{id:'b',text:'colonização baseada em grandes latifúndios (sesmarias) e ausência de reforma agrária efetiva após a abolição.'},{id:'c',text:'legislação que proíbe a posse de pequenas propriedades rurais.'},{id:'d',text:'preferência cultural dos agricultores brasileiros por grandes propriedades.'},{id:'e',text:'clima tropical que só permite agricultura produtiva em grandes extensões.'}],
    answer:'b', explanation:'Da sesmaria colonial ao latifúndio atual: 500 anos de concentração fundiária, agravada pela Lei de Terras (1850) e pela ausência de reforma agrária. O Estatuto da Terra (1964) nunca foi plenamente implementado.' },

  { id:222, subject:'Geografia', topic:'Demografia', subtopic:'Migração Interna', type:'enem', year:2021, difficulty:'facil',
    statement:'O principal fluxo migratório interno do Brasil no século XX foi:',
    alternatives:[{id:'a',text:'do Sul para o Nordeste em busca de terras agricultáveis.'},{id:'b',text:'do Nordeste para o Sudeste (especialmente São Paulo), motivado pela seca e oportunidades industriais.'},{id:'c',text:'da Amazônia para o Rio de Janeiro em busca de empregos no setor financeiro.'},{id:'d',text:'do Centro-Oeste para o Norte em busca de garimpo.'},{id:'e',text:'do interior do Rio Grande do Sul para o exterior (emigração internacional).'}],
    answer:'b', explanation:'O êxodo rural nordestino para o Sudeste foi o maior fluxo migratório interno: seca, miséria e falta de oportunidades no Nordeste × industrialização em São Paulo.' },

  { id:223, subject:'Geografia', topic:'Demografia', subtopic:'Pirâmide Etária', type:'uerj', year:2023, difficulty:'medio',
    statement:'A transição demográfica do Brasil, que altera o perfil da pirâmide etária de base larga para base estreita, indica:',
    alternatives:[{id:'a',text:'aumento das taxas de natalidade e queda da mortalidade infantil.'},{id:'b',text:'queda das taxas de natalidade e fecundidade, com envelhecimento progressivo da população.'},{id:'c',text:'aumento da emigração de jovens para outros países.'},{id:'d',text:'retorno de idosos às áreas rurais em busca de aposentadoria tranquila.'},{id:'e',text:'aumento da mortalidade em todas as faixas etárias por doenças crônicas.'}],
    answer:'b', explanation:'Transição demográfica: queda da natalidade e fecundidade (urbanização, educação, anticoncepcionais) + aumento da expectativa de vida → base estreita e topo alargado na pirâmide.' },

  { id:224, subject:'Geografia', topic:'Urbanização', subtopic:'Segregação Urbana', type:'enem', year:2022, difficulty:'medio',
    statement:'A segregação socioespacial nas grandes cidades brasileiras manifesta-se pela:',
    alternatives:[{id:'a',text:'localização das classes de renda alta nas periferias e dos mais pobres nas áreas centrais valorizadas.'},{id:'b',text:'concentração de população de baixa renda em áreas periféricas com pouca infraestrutura, enquanto as áreas centrais valorizam-se para as classes médias e altas.'},{id:'c',text:'integração harmoniosa entre grupos sociais distintos nas mesmas áreas urbanas.'},{id:'d',text:'tendência de as cidades brasileiras se tornarem mais iguais com o crescimento econômico.'},{id:'e',text:'migração de população pobre para o interior em busca de terras.'}],
    answer:'b', explanation:'Segregação urbana: expulsão dos pobres para periferias com déficit de transporte, saúde e educação; gentrificação centraliza a riqueza. Produto histórico da desigualdade estrutural.' },

  { id:225, subject:'Geografia', topic:'Geografia Econômica', subtopic:'Fontes de Energia', type:'enem', year:2023, difficulty:'medio',
    statement:'A matriz energética brasileira é considerada relativamente limpa em comparação com a de outros países emergentes porque:',
    alternatives:[{id:'a',text:'o Brasil não possui reservas de carvão mineral ou petróleo.'},{id:'b',text:'a maior parte da eletricidade é gerada por usinas hidrelétricas (≈60%), com crescente participação de eólica e solar.'},{id:'c',text:'o Brasil proibiu o uso de combustíveis fósseis desde os anos 1990.'},{id:'d',text:'a energia nuclear corresponde a mais de 80% da geração elétrica.'},{id:'e',text:'toda a frota de veículos é movida exclusivamente a hidrogênio verde.'}],
    answer:'b', explanation:'Brasil: ≈60% da geração elétrica hidráulica; com crescente expansão eólica (NE) e solar. Contudo, no setor de transportes, ainda há forte dependência de petróleo (etanol mitiga parcialmente).' },

  { id:226, subject:'Geografia', topic:'Geopolítica', subtopic:'Oriente Médio — Conflitos', type:'uerj', year:2023, difficulty:'medio',
    statement:'Os conflitos no Oriente Médio têm raízes em:',
    alternatives:[{id:'a',text:'disputas exclusivamente religiosas entre cristãos e muçulmanos.'},{id:'b',text:'fronteiras artificiais do pós-Primeira Guerra, disputa por petróleo, rivalidades étnico-religiosas e geopolítica de grandes potências.'},{id:'c',text:'competição pelo controle das rotas marítimas do Oceano Índico.'},{id:'d',text:'conflitos ambientais pela disputa de fontes de água doce no deserto.'},{id:'e',text:'rivalidade econômica entre os países do Golfo Pérsico e a China.'}],
    answer:'b', explanation:'A instabilidade do Oriente Médio é multifatorial: fronteiras do acordo Sykes-Picot (1916), petróleo, rivalidade sunita-xiita, conflito Israel-Palestina e intervenções estrangeiras.' },

  { id:227, subject:'Geografia', topic:'Hidrografia', subtopic:'Recursos Hídricos — Escassez', type:'enem', year:2022, difficulty:'medio',
    statement:'A crise hídrica global, prevista para afetar bilhões de pessoas até 2050, decorre principalmente de:',
    alternatives:[{id:'a',text:'redução natural dos oceanos pelo aquecimento global.'},{id:'b',text:'crescimento populacional, poluição dos mananciais, uso agrícola intensivo e mudanças climáticas que alteram o regime de chuvas.'},{id:'c',text:'migração das populações para desertos, onde a água sempre foi escassa.'},{id:'d',text:'políticas de exportação de água doce pelos países ricos para os pobres.'},{id:'e',text:'derretimento das calotas polares que saliniza os aquíferos costeiros.'}],
    answer:'b', explanation:'A crise hídrica é resultado de: crescimento demográfico + urbanização + agricultura irrigada (70% do uso) + poluição + desmatamento + mudanças climáticas que redistribuem as chuvas globalmente.' },

  { id:228, subject:'Geografia', topic:'Globalização', subtopic:'China — Crescimento Econômico', type:'uerj', year:2022, difficulty:'medio',
    statement:'O crescimento econômico chinês, que transformou a China na 2ª economia mundial, foi baseado principalmente em:',
    alternatives:[{id:'a',text:'exploração de recursos naturais amazônicos via cooperação com o Brasil.'},{id:'b',text:'abertura controlada ao capital estrangeiro, mão de obra barata, exportações industriais e investimento estatal estratégico.'},{id:'c',text:'privatização total das empresas estatais e liberalismo econômico pleno.'},{id:'d',text:'exploração de petróleo no Mar do Sul da China exclusivamente.'},{id:'e',text:'serviços financeiros internacionais, seguindo o modelo de Hong Kong.'}],
    answer:'b', explanation:'Modelo chinês: "socialismo de mercado" — Estado controla setores estratégicos, capital estrangeiro é atraído para zonas especiais, exportações industriais crescem vertiginosamente desde 1978.' },

  { id:229, subject:'Geografia', topic:'Geopolítica', subtopic:'União Europeia', type:'enem', year:2023, difficulty:'medio',
    statement:'O Brexit — saída do Reino Unido da União Europeia (2016-2020) — demonstrou que:',
    alternatives:[{id:'a',text:'a integração regional europeia foi completada com sucesso absoluto.'},{id:'b',text:'as tensões entre soberania nacional e integração supranacional permanecem, podendo levar ao recuo do projeto europeu.'},{id:'c',text:'o Reino Unido saiu da UE por razões exclusivamente econômicas.'},{id:'d',text:'a UE se fortaleceu após a saída do Reino Unido.'},{id:'e',text:'outros países imediatamente seguiram o exemplo britânico.'}],
    answer:'b', explanation:'Brexit expôs tensões entre integração supranacional (cessão de soberania à UE) e identidade nacional. Questões de imigração, regulação e contribuição financeira alimentaram o voto pela saída.' },

  { id:230, subject:'Geografia', topic:'Geopolítica', subtopic:'Continente Africano', type:'uerj', year:2024, difficulty:'medio',
    statement:'A África, apesar de sua riqueza em recursos naturais, ainda enfrenta baixos índices de desenvolvimento humano. Uma das principais causas é:',
    alternatives:[{id:'a',text:'ausência de recursos naturais que impediu o desenvolvimento industrial.'},{id:'b',text:'herança colonial — exploração de recursos sem industrialização local, fronteiras artificiais gerando conflitos e dependência econômica das ex-metrópoles.'},{id:'c',text:'rejeição africana de qualquer forma de comércio internacional.'},{id:'d',text:'predominância de governos socialistas que impediram o investimento privado.'},{id:'e',text:'clima tropical que impossibilita a agricultura produtiva em todo o continente.'}],
    answer:'b', explanation:'O "paradoxo africano" (riqueza natural + subdesenvolvimento) resulta da herança colonial: extração sem beneficiamento local, desindustrialização, dívida externa e conflitos étnicos gerados pelas fronteiras artificiais.' },

  { id:231, subject:'Geografia', topic:'Agropecuária', subtopic:'Agronegócio Brasileiro', type:'enem', year:2022, difficulty:'facil',
    statement:'O Brasil é um dos maiores produtores e exportadores mundiais de alimentos. Esse protagonismo agrícola deve-se principalmente a:',
    alternatives:[{id:'a',text:'trabalho artesanal familiar que domina toda a produção agrícola nacional.'},{id:'b',text:'modernização tecnológica do agronegócio (mecanização, biotecnologia, irrigação) e expansão das fronteiras agrícolas no Cerrado.'},{id:'c',text:'solo e clima uniformes em todo o território que facilitam o cultivo de qualquer produto.'},{id:'d',text:'ausência de concorrência interna entre os produtores rurais.'},{id:'e',text:'políticas de subsídio agrícola maiores que as de EUA e Europa.'}],
    answer:'b', explanation:'A "Revolução Verde" brasileira: Embrapa adaptou culturas ao Cerrado, mecanização avançada, OGMs e irrigação eficiente transformaram o Brasil no celeiro do mundo em soja, carne, cana e frutas.' },

  { id:232, subject:'Geografia', topic:'Biomas do Brasil', subtopic:'Pantanal', type:'uerj', year:2021, difficulty:'facil',
    statement:'O Pantanal, maior planície alagável do mundo, é estratégico para a biodiversidade porque:',
    alternatives:[{id:'a',text:'produz energia elétrica por meio de usinas hidrelétricas.'},{id:'b',text:'abriga enorme diversidade de fauna e flora, funciona como regulador hídrico e é habitat de espécies ameaçadas como a onça-pintada.'},{id:'c',text:'é o principal produtor de soja orgânica do Brasil.'},{id:'d',text:'tem as maiores reservas de petróleo do Brasil central.'},{id:'e',text:'regula o clima da Patagônia argentina por meio de ventos úmidos.'}],
    answer:'b', explanation:'O Pantanal: ≈150.000 km² entre Brasil, Bolívia e Paraguai; inundação sazonal cria habitat único. Habitat do tuiuiú, onça, capivara e centenas de espécies endêmicas.' },

  { id:233, subject:'Geografia', topic:'Climatologia', subtopic:'Poluição Atmosférica', type:'enem', year:2023, difficulty:'medio',
    statement:'A inversão térmica urbana, fenômeno que piora a qualidade do ar, ocorre quando:',
    alternatives:[{id:'a',text:'a camada de ar frio fica acima da camada de ar quente, impedindo a dispersão de poluentes.'},{id:'b',text:'a temperatura do ar aumenta com a altitude, ao contrário do padrão normal.'},{id:'c',text:'ventos fortes dispersam os poluentes em direção às periferias.'},{id:'d',text:'a umidade relativa do ar cai abaixo de 30%, concentrando partículas.'},{id:'e',text:'o ozônio troposférico reage com partículas de fumaça formando neblina.'}],
    answer:'b', explanation:'Inversão térmica: camada de ar quente acima de ar frio (inversão do gradiente normal). Os poluentes ficam presos na camada inferior, concentrando-se. Comum em São Paulo no inverno.' },

  { id:234, subject:'Geografia', topic:'Cartografia', subtopic:'Projeções', type:'uerj', year:2022, difficulty:'medio',
    statement:'A projeção de Mercator, amplamente usada em mapas mundiais, distorce:',
    alternatives:[{id:'a',text:'as formas dos continentes, tornando-os irreconhecíveis.'},{id:'b',text:'as áreas dos países — superestima os tamanhos dos países próximos aos polos e subestima os equatoriais.'},{id:'c',text:'as distâncias entre cidades nas zonas tropicais.'},{id:'d',text:'os oceanos, que aparecem menores do que são na realidade.'},{id:'e',text:'as cores e texturas dos biomas continentais.'}],
    answer:'b', explanation:'Mercator (1569): preserva ângulos (útil para navegação), mas distorce áreas nas altas latitudes. A Groenlândia parece do mesmo tamanho da África — que é 14x maior.' },

  { id:235, subject:'Geografia', topic:'Geografia Econômica', subtopic:'Energias Renováveis', type:'enem', year:2024, difficulty:'medio',
    statement:'A energia eólica cresceu significativamente no Brasil, especialmente no Nordeste, porque:',
    alternatives:[{id:'a',text:'o litoral nordestino tem ventos constantes e regulares ao longo do ano, com mínima variação sazonal.'},{id:'b',text:'a região tem os melhores ventos do mundo em altitude, aproveitados por turbinas de grande porte.'},{id:'c',text:'o Nordeste tem o menor custo de construção de parques eólicos por causa da mão de obra barata.'},{id:'d',text:'a energia eólica dispensa rede de transmissão, servindo diretamente às comunidades.'},{id:'e',text:'incentivos fiscais exclusivos para o Nordeste tornaram a energia eólica viável apenas nessa região.'}],
    answer:'a', explanation:'O Nordeste tem os melhores ventos do Brasil: constantes (alísios), regulares ao longo do ano e com boa velocidade média. Isso garante alto fator de capacidade — tornando a energia eólica competitiva.' },

  { id:236, subject:'Geografia', topic:'Biomas do Brasil', subtopic:'Pantanal', type:'enem', year:2022, difficulty:'medio',
    statement:'O Pantanal, maior área úmida continental do mundo, localizado no Centro-Oeste brasileiro, caracteriza-se por:',
    alternatives:[{id:'a',text:'cobertura vegetal predominantemente de floresta ombrófila densa, semelhante à Amazônia.'},{id:'b',text:'regime de cheias e secas sazonais que criam mosaico de habitats e enorme biodiversidade.'},{id:'c',text:'solos rasos e pedregosos que dificultam a fauna e a flora.'},{id:'d',text:'temperaturas negativas no inverno que impedem a agricultura.'},{id:'e',text:'exploração intensiva de minério de ferro, principal atividade econômica da região.'}],
    answer:'b', explanation:'O Pantanal tem ciclo hidrológico marcante: cheia (nov–abr) e seca (mai–out). A alternância cria habitats diversificados para aves, répteis, mamíferos e peixes, sustentando uma das maiores biodiversidades do planeta.' },

  { id:237, subject:'Geografia', topic:'Climatologia', subtopic:'Poluição e Meio Ambiente', type:'uerj', year:2023, difficulty:'medio',
    statement:'As "ilhas de calor" urbanas são fenômenos típicos de grandes cidades causados principalmente por:',
    alternatives:[{id:'a',text:'maior número de fábricas próximas ao centro urbano, emitindo calor residual.'},{id:'b',text:'substituição de superfícies naturais por asfalto e concreto, que absorvem e retêm mais calor, e pela redução da vegetação.'},{id:'c',text:'altitude mais elevada das cidades em relação ao entorno rural.'},{id:'d',text:'proximidade dos oceanos, que elevam a umidade e a temperatura do ar.'},{id:'e',text:'uso excessivo de ar-condicionado industrial nas periferias urbanas.'}],
    answer:'b', explanation:'Ilhas de calor: áreas urbanas densamente construídas apresentam temperatura 3–10°C acima do entorno rural. Causas: asfalto e concreto (alta capacidade térmica), ausência de vegetação (sem evapotranspiração), veículos e ar-condicionado.' },

  { id:238, subject:'Geografia', topic:'Urbanização', subtopic:'Migração e Urbanização', type:'enem', year:2021, difficulty:'facil',
    statement:'O êxodo rural brasileiro intensificado entre 1950 e 1980 foi impulsionado principalmente por:',
    alternatives:[{id:'a',text:'conflitos armados e guerras civis no campo brasileiro.'},{id:'b',text:'políticas de incentivo governamental à moradia urbana.'},{id:'c',text:'modernização da agricultura (mecanização), que reduziu a demanda por mão de obra rural, e industrialização das cidades.'},{id:'d',text:'desastres naturais como secas permanentes e enchentes que destruíram as lavouras.'},{id:'e',text:'reforma agrária que transferiu as terras para grandes empresas, expulsando os trabalhadores.'}],
    answer:'c', explanation:'A Revolução Verde e a mecanização do campo liberaram milhões de trabalhadores rurais. Simultaneamente, a industrialização (especialmente em SP) atraiu essa mão de obra para as cidades, gerando o êxodo rural.' },

  { id:239, subject:'Geografia', topic:'Geopolítica', subtopic:'BRICS (ampliação)', type:'uerj', year:2023, difficulty:'medio',
    statement:'O agrupamento BRICS (Brasil, Rússia, Índia, China e África do Sul) foi criado com o objetivo de:',
    alternatives:[{id:'a',text:'estabelecer uma zona de livre-comércio entre países do hemisfério sul.'},{id:'b',text:'substituir a ONU como principal fórum de governança global.'},{id:'c',text:'ampliar a cooperação e o peso político-econômico de grandes países emergentes frente às potências tradicionais.'},{id:'d',text:'criar uma moeda única para o comércio entre os membros do bloco.'},{id:'e',text:'unir países com fronteiras terrestres comuns para defesa militar coletiva.'}],
    answer:'c', explanation:'BRICS reúne países emergentes com grande população, território e PIB crescente. Busca reformar instituições como FMI e Banco Mundial para ter mais voz. Em 2024 expandiu-se para mais países (BRICS+).' },

  { id:240, subject:'Geografia', topic:'Geografia Econômica', subtopic:'Recursos Naturais — Pré-Sal', type:'enem', year:2022, difficulty:'medio',
    statement:'A exploração do pré-sal brasileiro, descoberta em 2006 na Bacia de Santos, representa:',
    alternatives:[{id:'a',text:'reservas de petróleo de fácil extração, pois estão próximas à superfície continental.'},{id:'b',text:'enormes reservas de petróleo localizadas abaixo de espessa camada de sal no fundo oceânico, de extração tecnologicamente desafiadora e cara.'},{id:'c',text:'reservas de gás natural exclusivamente, sem petróleo associado.'},{id:'d',text:'campos petrolíferos terrestres descobertos no interior do Brasil.'},{id:'e',text:'reservas já esgotadas, pois foram exploradas intensamente na última década.'}],
    answer:'b', explanation:'Pré-sal: reservatórios sob 2.000m de água + 2.000m de rocha sedimentar + camada de sal de até 2.000m. É petróleo leve e de alta qualidade, mas a extração demanda tecnologia de ponta (Petrobras lidera). Reservas estimadas em dezenas de bilhões de barris.' },

  // ── SOCIOLOGIA (30) ──────────────────────────────────────────────────────
  { id:241, subject:'Sociologia', topic:'Weber', subtopic:'Dominação', type:'uerj', year:2022, difficulty:'medio',
    statement:'Para Max Weber, a dominação carismática distingue-se porque sua legitimidade se baseia em:',
    alternatives:[{id:'a',text:'normas jurídicas formalizadas em leis.'},{id:'b',text:'tradição e costumes herdados historicamente.'},{id:'c',text:'qualidades extraordinárias atribuídas ao líder, que inspira devoção pessoal.'},{id:'d',text:'posse de recursos econômicos e coerção física.'},{id:'e',text:'contrato social racional entre governantes e governados.'}],
    answer:'c', explanation:'Weber: 3 tipos de dominação legítima — tradicional (costumes), racional-legal (leis) e carismática (dons excepcionais do líder). A carismática é instável e pessoal.' },

  { id:242, subject:'Sociologia', topic:'Durkheim', subtopic:'Fato Social', type:'enem', year:2022, difficulty:'medio',
    statement:'Para Émile Durkheim, o fato social se define por ser:',
    alternatives:[{id:'a',text:'comportamento individual motivado por instintos biológicos.'},{id:'b',text:'qualquer pensamento ou ação produzido espontaneamente pelo indivíduo.'},{id:'c',text:'maneira de agir, pensar ou sentir exterior ao indivíduo, com poder coercitivo sobre ele.'},{id:'d',text:'ação racional orientada a fins econômicos no mercado.'},{id:'e',text:'movimento social organizado para transformar as estruturas políticas.'}],
    answer:'c', explanation:'Durkheim: fato social é exterior ao indivíduo (existe antes dele), coercitivo (impõe-se mesmo à resistência) e geral (compartilhado pela coletividade). Base do método sociológico positivista.' },

  { id:243, subject:'Sociologia', topic:'Durkheim', subtopic:'Solidariedade', type:'uerj', year:2021, difficulty:'medio',
    statement:'A diferença entre solidariedade mecânica e orgânica em Durkheim é:',
    alternatives:[{id:'a',text:'mecânica: sociedades modernas; orgânica: sociedades primitivas.'},{id:'b',text:'mecânica: sociedades tradicionais com forte semelhança entre indivíduos; orgânica: sociedades modernas com divisão do trabalho e interdependência.'},{id:'c',text:'mecânica: baseada no contrato racional; orgânica: baseada nos costumes.'},{id:'d',text:'mecânica: laços econômicos; orgânica: laços religiosos.'},{id:'e',text:'não há diferença — são termos sinônimos em Durkheim.'}],
    answer:'b', explanation:'Solidariedade mecânica: sociedades tradicionais, homogeneidade, consciência coletiva forte. Orgânica: divisão social do trabalho gera interdependência entre indivíduos diferentes — coesão pela complementaridade.' },

  { id:244, subject:'Sociologia', topic:'Durkheim', subtopic:'Anomia', type:'enem', year:2023, difficulty:'medio',
    statement:'O conceito de anomia em Durkheim refere-se a:',
    alternatives:[{id:'a',text:'o excesso de normas sociais que oprime os indivíduos em sociedades tradicionais.'},{id:'b',text:'a ausência ou enfraquecimento das normas sociais que regulam o comportamento, gerando desorientação e instabilidade.'},{id:'c',text:'a dominação de uma classe sobre outra por meio da ideologia.'},{id:'d',text:'o carisma do líder que une a sociedade em torno de um projeto comum.'},{id:'e',text:'o conjunto de regras jurídicas formais que regulam o Estado moderno.'}],
    answer:'b', explanation:'Anomia (Durkheim): ausência de normas claras em períodos de mudança rápida ou crise. Aplicado em sua obra sobre o suicídio — o suicídio anômico ocorre em situações de desorientação social.' },

  { id:245, subject:'Sociologia', topic:'Durkheim', subtopic:'O Suicídio', type:'uerj', year:2022, difficulty:'dificil',
    statement:'No estudo "O Suicídio" (1897), Durkheim identificou que o suicídio altruísta ocorre quando:',
    alternatives:[{id:'a',text:'o indivíduo se mata por desespero ante a ausência de normas sociais.'},{id:'b',text:'o indivíduo se mata porque está excessivamente integrado ao grupo — sua vida pertence mais à sociedade que a si mesmo.'},{id:'c',text:'o indivíduo se mata por crise econômica e perda de status social.'},{id:'d',text:'o indivíduo se mata por isolamento social e ausência de vínculos.'},{id:'e',text:'o indivíduo se mata por conflito entre sua consciência individual e a coletiva.'}],
    answer:'b', explanation:'Durkheim: suicídio altruísta — excesso de integração (ex.: guerreiro que se sacrifica pelo grupo). Opõe-se ao egoísta (pouca integração) e ao anômico (ausência de normas).' },

  { id:246, subject:'Sociologia', topic:'Weber', subtopic:'Ação Social', type:'enem', year:2021, difficulty:'medio',
    statement:'Segundo Weber, a ação social orientada por valores morais, religiosos ou estéticos, independentemente das consequências, é classificada como:',
    alternatives:[{id:'a',text:'Racional com relação a fins (instrumental)'},{id:'b',text:'Racional com relação a valores (axiológica)'},{id:'c',text:'Afetiva ou emocional'},{id:'d',text:'Tradicional'},{id:'e',text:'Carismática'}],
    answer:'b', explanation:'Weber: 4 tipos de ação social — racional por fins (meios→fins), racional por valores (por princípios, sem cálculo de consequências), afetiva (emoção) e tradicional (hábito).' },

  { id:247, subject:'Sociologia', topic:'Weber', subtopic:'Burocracia', type:'uerj', year:2023, difficulty:'medio',
    statement:'A burocracia, para Weber, é a forma mais eficiente de organização porque se baseia em:',
    alternatives:[{id:'a',text:'hierarquia informal baseada no carisma dos líderes.'},{id:'b',text:'regras impessoais e racionais, competência técnica, hierarquia formal e documentação — garantindo previsibilidade e eficiência.'},{id:'c',text:'tradição e costumes que orientam o comportamento dos funcionários.'},{id:'d',text:'laços familiares e pessoais que garantem lealdade entre os membros.'},{id:'e',text:'meritocracia sem regras formais, onde os mais competentes automaticamente sobem.'}],
    answer:'b', explanation:'Burocracia racional-legal (Weber): regras escritas, especialização, hierarquia, impessoalidade, competência técnica. É o tipo ideal de organização racional-legal moderna.' },

  { id:248, subject:'Sociologia', topic:'Weber', subtopic:'Ética Protestante', type:'enem', year:2022, difficulty:'dificil',
    statement:'Na "Ética Protestante e o Espírito do Capitalismo" (1905), Weber argumenta que:',
    alternatives:[{id:'a',text:'o capitalismo surgiu como consequência direta da exploração do trabalho proletário pela burguesia.'},{id:'b',text:'a ética calvinista — que valorizava o trabalho, a poupança e o sucesso material como sinal de predestinação — criou uma mentalidade favorável ao desenvolvimento do capitalismo.'},{id:'c',text:'o catolicismo foi o principal impulsionador do espírito capitalista na Europa.'},{id:'d',text:'o capitalismo é incompatível com qualquer forma de religiosidade.'},{id:'e',text:'os países protestantes são intrinsecamente superiores aos católicos.'}],
    answer:'b', explanation:'Weber: o ascetismo calvinista (trabalho duro, frugalidade, acúmulo de capital como sinal de graça divina) forneceu a "ética" que impulsionou o desenvolvimento do capitalismo nos países protestantes.' },

  { id:249, subject:'Sociologia', topic:'Marx', subtopic:'Mais-Valia', type:'enem', year:2023, difficulty:'medio',
    statement:'O conceito de mais-valia em Marx refere-se a:',
    alternatives:[{id:'a',text:'o lucro extra obtido pelo comerciante ao revender mercadorias por preço mais alto.'},{id:'b',text:'a diferença entre o valor criado pelo trabalho do operário e o salário que ele recebe — parcela apropriada pelo capitalista.'},{id:'c',text:'o valor adicional que os produtos adquirem com a propaganda e o marketing.'},{id:'d',text:'o imposto cobrado pelo Estado sobre a produção industrial.'},{id:'e',text:'a taxa de juros que os bancos cobram dos empresários industriais.'}],
    answer:'b', explanation:'Mais-valia (Marx): o trabalhador produz valor maior que seu salário. O excedente (mais-valia) é apropriado pelo capitalista. Fundamento da exploração no modo de produção capitalista.' },

  { id:250, subject:'Sociologia', topic:'Marx', subtopic:'Luta de Classes', type:'uerj', year:2022, difficulty:'medio',
    statement:'Para Marx, a luta de classes é o motor da história porque:',
    alternatives:[{id:'a',text:'os conflitos entre nações são a principal força transformadora da sociedade.'},{id:'b',text:'o conflito entre as classes que detêm os meios de produção e as que vendem sua força de trabalho gera as contradições que transformam os modos de produção.'},{id:'c',text:'a competição entre elites políticas determina as mudanças históricas.'},{id:'d',text:'as ideias e a consciência são a base material das transformações sociais.'},{id:'e',text:'a religião canaliza os conflitos sociais de forma pacífica e transformadora.'}],
    answer:'b', explanation:'Marx: história = sucessão de modos de produção transformados por lutas de classe. Escravidão (escravos×senhores), feudalismo (servos×nobres), capitalismo (proletariado×burguesia).' },

  { id:251, subject:'Sociologia', topic:'Marx', subtopic:'Alienação', type:'enem', year:2021, difficulty:'medio',
    statement:'O conceito de alienação em Marx descreve a situação em que:',
    alternatives:[{id:'a',text:'o trabalhador sente orgulho pelo produto que cria, identificando-se plenamente com ele.'},{id:'b',text:'o trabalhador se afasta do produto de seu trabalho, do processo produtivo, dos outros trabalhadores e de si mesmo — resultado da divisão capitalista do trabalho.'},{id:'c',text:'o capitalista perde o controle sobre os meios de produção durante as crises.'},{id:'d',text:'o Estado aliena os direitos do cidadão por meio da burocracia.'},{id:'e',text:'os trabalhadores desenvolvem falsa consciência de classe e se identificam com a burguesia.'}],
    answer:'b', explanation:'Alienação (Marx): no capitalismo, o trabalhador não se reconhece no produto (que pertence ao patrão), não controla o processo e não se desenvolve plenamente — torna-se estranho a si mesmo.' },

  { id:252, subject:'Sociologia', topic:'Marx', subtopic:'Infraestrutura e Superestrutura', type:'uerj', year:2023, difficulty:'medio',
    statement:'Na concepção marxista, infraestrutura e superestrutura se relacionam da seguinte forma:',
    alternatives:[{id:'a',text:'a superestrutura (Estado, leis, religião, ideologia) determina a infraestrutura (base econômica).'},{id:'b',text:'a infraestrutura (relações de produção e forças produtivas) condiciona a superestrutura (Estado, direito, ideologia, cultura).'},{id:'c',text:'infraestrutura e superestrutura são independentes e se desenvolvem paralelamente.'},{id:'d',text:'a superestrutura é material e a infraestrutura é ideológica.'},{id:'e',text:'Marx rejeitou a distinção entre infraestrutura e superestrutura.'}],
    answer:'b', explanation:'Marx: "o ser social determina a consciência". A base econômica (modo de produção) condiciona a superestrutura jurídica, política e ideológica — que, por sua vez, retroage sobre a base.' },

  { id:253, subject:'Sociologia', topic:'Desigualdade Social', subtopic:'Capital Cultural — Bourdieu', type:'enem', year:2022, difficulty:'dificil',
    statement:'O conceito de capital cultural em Bourdieu refere-se a:',
    alternatives:[{id:'a',text:'o dinheiro investido em bens culturais como obras de arte e livros.'},{id:'b',text:'o conjunto de habilidades, conhecimentos, títulos e disposições adquiridos pela socialização, especialmente familiar e escolar — que conferem vantagens nas disputas sociais.'},{id:'c',text:'os direitos culturais garantidos pela constituição a todos os cidadãos.'},{id:'d',text:'o patrimônio cultural material de um povo (museus, monumentos, arquivos).'},{id:'e',text:'o mercado de consumo cultural — teatro, cinema, música.'}],
    answer:'b', explanation:'Bourdieu: capital cultural (incorporado, objetivado, institucionalizado) é herdado e acumulado. Legitima as desigualdades — a escola parece meritocrática mas favorece quem já tem capital cultural.' },

  { id:254, subject:'Sociologia', topic:'Desigualdade Social', subtopic:'Habitus — Bourdieu', type:'uerj', year:2023, difficulty:'dificil',
    statement:'O conceito de habitus em Bourdieu designa:',
    alternatives:[{id:'a',text:'os hábitos conscientes e deliberados que os indivíduos escolhem livremente.'},{id:'b',text:'o conjunto de disposições duráveis e inconscientes incorporadas pela socialização, que orientam percepções, pensamentos e ações.'},{id:'c',text:'a estrutura jurídica que regula o comportamento dos grupos sociais.'},{id:'d',text:'o sistema de valores religiosos que molda a moral individual.'},{id:'e',text:'os rituais de passagem que marcam a inserção do indivíduo em grupos sociais.'}],
    answer:'b', explanation:'Habitus (Bourdieu): estruturas sociais interiorizadas pelo indivíduo ao longo da vida, que se manifestam como "sentido prático" — ele age naturalmente conforme sua posição de classe, sem refletir.' },

  { id:255, subject:'Sociologia', topic:'Desigualdade Social', subtopic:'Foucault — Poder e Disciplina', type:'enem', year:2023, difficulty:'dificil',
    statement:'Para Michel Foucault, o poder disciplinar que se consolidou nas sociedades modernas (séculos XVIII-XIX) opera principalmente por meio de:',
    alternatives:[{id:'a',text:'força física exercida abertamente pelo Estado sobre os corpos dos cidadãos.'},{id:'b',text:'vigilância, normalização e disciplinamento dos corpos e comportamentos em instituições como prisões, hospitais e escolas.'},{id:'c',text:'ideologia marxista difundida pelos meios de comunicação de massa.'},{id:'d',text:'carisma dos líderes que canalizam o poder para instituições democráticas.'},{id:'e',text:'contratos sociais que regulam voluntariamente o comportamento individual.'}],
    answer:'b', explanation:'Foucault: o poder moderno não opera pela força bruta, mas pela vigilância (panóptico), normatização e disciplinamento — produzindo "corpos dóceis" em prisões, fábricas, escolas e hospitais.' },

  { id:256, subject:'Sociologia', topic:'Movimentos Sociais', subtopic:'Etnocentrismo e Relativismo', type:'enem', year:2022, difficulty:'facil',
    statement:'O etnocentrismo, conceito central na Antropologia Social, consiste em:',
    alternatives:[{id:'a',text:'o respeito e a compreensão das culturas a partir de seus próprios valores e contextos.'},{id:'b',text:'julgar outras culturas a partir dos valores e padrões da própria cultura, considerando-a superior.'},{id:'c',text:'mistura de elementos de diferentes culturas para criar uma nova.'},{id:'d',text:'valorização de tradições étnicas de grupos marginalizados.'},{id:'e',text:'estudo científico e neutro da diversidade cultural humana.'}],
    answer:'b', explanation:'Etnocentrismo: ver o "outro" como inferior ou exótico a partir da própria referência cultural. Opõe-se ao relativismo cultural, que compreende cada cultura em seus próprios termos.' },

  { id:257, subject:'Sociologia', topic:'Movimentos Sociais', subtopic:'Movimentos Sociais no Brasil', type:'uerj', year:2022, difficulty:'medio',
    statement:'Os novos movimentos sociais (feminismo, movimento negro, LGBTQIA+, ambientalismo), surgidos na segunda metade do séc. XX, diferem dos movimentos operários clássicos porque:',
    alternatives:[{id:'a',text:'são movimentos exclusivamente econômicos que reivindicam melhores salários.'},{id:'b',text:'lutam por reconhecimento identitário, direitos civis e culturais — não apenas por redistribuição econômica.'},{id:'c',text:'são organizados verticalmente por partidos políticos tradicionais.'},{id:'d',text:'rejeitam qualquer forma de organização coletiva, privilegiando o indivíduo.'},{id:'e',text:'são financiados exclusivamente por governos progressistas.'}],
    answer:'b', explanation:'Novos movimentos sociais: pós-materialistas — lutam por reconhecimento, identidade e direitos civis (não apenas redistribuição econômica). Horizontalidade e diversidade de demandas os distinguem dos sindicatos clássicos.' },

  { id:258, subject:'Sociologia', topic:'Indústria Cultural', subtopic:'Escola de Frankfurt', type:'enem', year:2021, difficulty:'dificil',
    statement:'O conceito de "indústria cultural", desenvolvido por Adorno e Horkheimer (Escola de Frankfurt), critica:',
    alternatives:[{id:'a',text:'a produção artesanal que mantém a autenticidade da cultura popular.'},{id:'b',text:'a produção cultural em série pelo capitalismo, que transforma arte em mercadoria, embota o senso crítico e produz conformismo social.'},{id:'c',text:'a censura estatal que impede a livre circulação de obras culturais.'},{id:'d',text:'a influência excessiva da religião sobre a produção artística ocidental.'},{id:'e',text:'a globalização que homogeneíza as culturas locais em benefício da cultura americana.'}],
    answer:'b', explanation:'Adorno e Horkheimer: a cultura de massa produzida industrialmente (cinema, rádio, revista) é padronizada, manipuladora e converte o receptor em consumidor passivo — impossibilitando a reflexão crítica.' },

  { id:259, subject:'Sociologia', topic:'Cidadania', subtopic:'T.H. Marshall', type:'uerj', year:2022, difficulty:'medio',
    statement:'T.H. Marshall dividiu o desenvolvimento da cidadania em três dimensões. A sequência histórica correta no contexto britânico é:',
    alternatives:[{id:'a',text:'direitos políticos (séc. XVIII) → direitos civis (séc. XIX) → direitos sociais (séc. XX).'},{id:'b',text:'direitos civis (séc. XVIII) → direitos políticos (séc. XIX) → direitos sociais (séc. XX).'},{id:'c',text:'direitos sociais (séc. XVIII) → direitos civis (séc. XIX) → direitos políticos (séc. XX).'},{id:'d',text:'todas as dimensões surgiram simultaneamente na Revolução Francesa.'},{id:'e',text:'direitos políticos (séc. XIX) → direitos sociais (séc. XIX) → direitos civis (séc. XX).'}],
    answer:'b', explanation:'Marshall: direitos civis (liberdade, propriedade — séc. XVIII), políticos (voto, representação — séc. XIX), sociais (saúde, educação, previdência — séc. XX). No Brasil, essa sequência foi invertida/simultânea.' },

  { id:260, subject:'Sociologia', topic:'Desigualdade Social', subtopic:'Racismo Estrutural', type:'enem', year:2023, difficulty:'medio',
    statement:'O conceito de racismo estrutural distingue-se do racismo individual porque:',
    alternatives:[{id:'a',text:'é praticado apenas por pessoas de alta renda e poder econômico.'},{id:'b',text:'está institucionalizado nas estruturas sociais, econômicas e políticas, produzindo desigualdades raciais independentemente da intenção consciente dos indivíduos.'},{id:'c',text:'refere-se apenas a discriminação racial explícita e declarada.'},{id:'d',text:'ocorre somente em países sem legislação antirracista.'},{id:'e',text:'é exclusivo das relações entre negros e brancos no contexto norte-americano.'}],
    answer:'b', explanation:'Racismo estrutural (Silvio Almeida): o racismo opera nas estruturas sociais (mercado de trabalho, sistema educacional, segurança pública) produzindo desigualdades raciais sistêmicas — além de atos individuais preconceituosos.' },

  { id:261, subject:'Sociologia', topic:'Movimentos Sociais', subtopic:'Globalização e Identidade', type:'uerj', year:2024, difficulty:'medio',
    statement:'O processo de globalização cultural tende a produzir tensões identitárias porque:',
    alternatives:[{id:'a',text:'elimina completamente as culturas locais, substituindo-as pela cultura global americanizada.'},{id:'b',text:'ao mesmo tempo que impulsiona a homogeneização cultural, provoca reações de afirmação das identidades locais e étnicas — produzindo hibridismo cultural.'},{id:'c',text:'reduz o acesso das populações pobres à cultura global digital.'},{id:'d',text:'proíbe o acesso de países em desenvolvimento à internet e às redes sociais.'},{id:'e',text:'homogeneíza as identidades nacionais, eliminando diferenças regionais internas.'}],
    answer:'b', explanation:'Stuart Hall e outros: a globalização não elimina as identidades locais, mas as fragmenta e recombina. O resultado é o hibridismo — não homogeneidade total nem isolamento local.' },

  { id:262, subject:'Sociologia', topic:'Desigualdade Social', subtopic:'Desigualdade no Brasil', type:'enem', year:2022, difficulty:'medio',
    statement:'O Brasil é um dos países mais desiguais do mundo, medido pelo Índice de Gini. Essa desigualdade tem raízes em:',
    alternatives:[{id:'a',text:'democracia recente que ainda não teve tempo de distribuir a riqueza adequadamente.'},{id:'b',text:'formação histórica colonial (escravidão, concentração fundiária) e falhas nas políticas de redistribuição de renda e oportunidades.'},{id:'c',text:'falta de recursos naturais que impede o crescimento econômico sustentado.'},{id:'d',text:'tamanho excessivo do Estado que sufoca o empreendedorismo e a geração de riqueza.'},{id:'e',text:'baixa qualificação dos trabalhadores, decorrente de escolha individual por menos educação.'}],
    answer:'b', explanation:'A desigualdade brasileira é estrutural: herança de 350 anos de escravidão, concentração fundiária, acesso desigual à educação e saúde. Políticas como Bolsa Família reduziram parcialmente, mas não reverteram.' },

  { id:263, subject:'Sociologia', topic:'Trabalho e Sociedade', subtopic:'Precarização', type:'uerj', year:2023, difficulty:'medio',
    statement:'A "uberização" do trabalho, associada à economia de plataformas digitais, representa:',
    alternatives:[{id:'a',text:'modelo de trabalho que amplia direitos trabalhistas e proteção social dos trabalhadores.'},{id:'b',text:'precarização do trabalho: os trabalhadores são classificados como "parceiros independentes", sem vínculo empregatício, sem direitos trabalhistas e com renda instável.'},{id:'c',text:'forma de cooperativismo moderno que redistribui os lucros igualmente entre os trabalhadores.'},{id:'d',text:'modelo que elimina o desemprego estrutural nas economias avançadas.'},{id:'e',text:'regulamentação moderna do trabalho informal que garante proteção a todos.'}],
    answer:'b', explanation:'Uberização: empresas de plataforma transferem riscos para os trabalhadores (sem salário fixo, sem FGTS, sem férias), classificando-os como autônomos. É uma nova forma de precarização do trabalho.' },

  { id:264, subject:'Sociologia', topic:'Durkheim', subtopic:'Divisão do Trabalho', type:'enem', year:2021, difficulty:'medio',
    statement:'Para Durkheim, a crescente divisão social do trabalho nas sociedades industriais:',
    alternatives:[{id:'a',text:'gera inevitavelmente alienação e conflito de classes — concordando com Marx.'},{id:'b',text:'cria solidariedade orgânica ao tornar os indivíduos interdependentes por sua especialização complementar.'},{id:'c',text:'elimina a necessidade de normas e instituições sociais.'},{id:'d',text:'leva ao retorno inevitável à solidariedade mecânica das sociedades tradicionais.'},{id:'e',text:'não tem efeito sobre a coesão social — apenas aumenta a produtividade econômica.'}],
    answer:'b', explanation:'Durkheim: a divisão do trabalho cria interdependência — o médico precisa do advogado que precisa do agricultor. Essa complementaridade gera solidariedade orgânica (coesão pela diferença).' },

  { id:265, subject:'Sociologia', topic:'Cidadania', subtopic:'Estado e Democracia', type:'uerj', year:2022, difficulty:'medio',
    statement:'O Estado Democrático de Direito, consagrado na Constituição de 1988, pressupõe:',
    alternatives:[{id:'a',text:'concentração de todos os poderes nas mãos do presidente eleito democraticamente.'},{id:'b',text:'submissão do Estado ao direito, separação dos poderes, garantias fundamentais e soberania popular.'},{id:'c',text:'democracia direta em que todos os cidadãos votam em cada decisão governamental.'},{id:'d',text:'governo de tecnocratas especializados, eleitos por suas competências técnicas.'},{id:'e',text:'supressão das liberdades individuais em nome do bem coletivo.'}],
    answer:'b', explanation:'Estado Democrático de Direito: legalidade (Estado sujeito à lei), separação de poderes (Montesquieu), direitos fundamentais garantidos e soberania popular — pilares da democracia liberal moderna.' },

  { id:266, subject:'Sociologia', topic:'Movimentos Sociais', subtopic:'Gênero e Sociedade', type:'enem', year:2023, difficulty:'medio',
    statement:'O conceito sociológico de gênero, desenvolvido por Joan Scott e outros, distingue-se de sexo biológico porque:',
    alternatives:[{id:'a',text:'gênero e sexo são sinônimos — ambos determinados exclusivamente pela biologia.'},{id:'b',text:'gênero é uma construção social e cultural — papéis, identidades e relações de poder atribuídos às pessoas com base no sexo, variando historicamente e entre culturas.'},{id:'c',text:'gênero refere-se apenas à identidade de pessoas transgênero.'},{id:'d',text:'gênero é determinado pelos hormônios sexuais e não pode ser alterado.'},{id:'e',text:'gênero é categoria exclusivamente linguística sem implicações sociais.'}],
    answer:'b', explanation:'Gênero (Sociologia/Estudos de Gênero): construção social dos papéis masculino/feminino. "Não se nasce mulher, torna-se" (Beauvoir). Os papéis de gênero variam entre culturas e épocas — não são naturais.' },

  { id:267, subject:'Sociologia', topic:'Indústria Cultural', subtopic:'Consumo e Sociedade', type:'uerj', year:2021, difficulty:'medio',
    statement:'Zygmunt Bauman, ao analisar a "sociedade de consumo", argumenta que:',
    alternatives:[{id:'a',text:'o consumo libera os indivíduos das pressões sociais e garante a realização pessoal plena.'},{id:'b',text:'na modernidade líquida, a identidade do indivíduo é construída e reconstruída pelo consumo — gerando instabilidade, insatisfação permanente e exclusão dos que não podem consumir.'},{id:'c',text:'o consumo é regulado pelo Estado para garantir equidade entre classes sociais.'},{id:'d',text:'a sociedade de consumo elimina as desigualdades ao democratizar o acesso a bens.'},{id:'e',text:'o consumo é determinado exclusivamente pelas necessidades biológicas básicas.'}],
    answer:'b', explanation:'Bauman (modernidade líquida): identidades se tornam descartáveis como mercadorias. O consumo é o eixo da vida social, mas gera insatisfação crônica e exclui os pobres (os "consumidores falhos").' },

  { id:268, subject:'Sociologia', topic:'Movimentos Sociais', subtopic:'Feminismo — Ondas', type:'enem', year:2024, difficulty:'medio',
    statement:'A chamada "terceira onda" do feminismo, a partir dos anos 1990, trouxe como contribuição principal:',
    alternatives:[{id:'a',text:'a luta pelo direito ao voto feminino.'},{id:'b',text:'a crítica à desigualdade de gênero no mercado de trabalho.'},{id:'c',text:'a interseccionalidade — reconhecimento de que as opressões de gênero se entrecruzam com raça, classe, sexualidade e outras categorias.'},{id:'d',text:'a defesa da igualdade jurídica formal entre homens e mulheres.'},{id:'e',text:'a proibição do trabalho doméstico não remunerado.'}],
    answer:'c', explanation:'3ª onda (Kimberlé Crenshaw): interseccionalidade — uma mulher negra, pobre e lésbica enfrenta opressões que não se somam simplesmente (raça+gênero+classe+sexualidade se articulam). Crítica ao feminismo branco de classe média.' },

  { id:269, subject:'Sociologia', topic:'Indústria Cultural', subtopic:'Sociedade de Consumo — Baudrillard', type:'uerj', year:2023, difficulty:'medio',
    statement:'Jean Baudrillard, ao analisar a sociedade de consumo, argumenta que consumimos principalmente:',
    alternatives:[{id:'a',text:'apenas o valor de uso dos produtos, como alimentação e abrigo.'},{id:'b',text:'signos e símbolos — o consumo é diferenciação social e construção de identidade, não satisfação de necessidades.'},{id:'c',text:'bens coletivos produzidos cooperativamente pelo Estado.'},{id:'d',text:'produtos racionalmente escolhidos com base em custo-benefício objetivo.'},{id:'e',text:'mercadorias em função do trabalho incorporado nelas, segundo o valor trabalho.'}],
    answer:'b', explanation:'Baudrillard (A Sociedade de Consumo): consumimos signos, não objetos. O carro não é apenas transporte, é status. A publicidade vende estilos de vida. O consumo é o principal mecanismo de diferenciação e integração social no capitalismo tardio.' },

  { id:270, subject:'Sociologia', topic:'Desigualdade Social', subtopic:'Violência Simbólica — Bourdieu', type:'enem', year:2022, difficulty:'dificil',
    statement:'O conceito de "violência simbólica" em Pierre Bourdieu refere-se a:',
    alternatives:[{id:'a',text:'atos físicos praticados por grupos dominantes contra minorias étnicas.'},{id:'b',text:'imposição de valores e visões de mundo dos grupos dominantes como se fossem naturais e universais, aceita pelos dominados.'},{id:'c',text:'repressão policial de manifestações populares e movimentos sociais.'},{id:'d',text:'censura oficial dos meios de comunicação pelo Estado autoritário.'},{id:'e',text:'exploração econômica dos trabalhadores através da mais-valia.'}],
    answer:'b', explanation:'Violência simbólica (Bourdieu): forma de dominação que opera pelo consentimento inconsciente dos dominados. Exemplo: trabalhadores que acreditam merecer sua posição por "falta de mérito". A dominação é naturalizada pelo habitus, tornando-se invisível.' },

  // ── FILOSOFIA (30) ───────────────────────────────────────────────────────
  { id:271, subject:'Filosofia', topic:'Iluminismo', subtopic:'Iluminismo — Kant', type:'enem', year:2021, difficulty:'medio',
    statement:'Kant definiu o Iluminismo como "saída do homem de sua menoridade". Iluminar-se significa:',
    alternatives:[{id:'a',text:'adquirir riqueza suficiente para independência política.'},{id:'b',text:'submeter-se a líderes religiosos esclarecidos.'},{id:'c',text:'exercer o próprio entendimento de forma autônoma, sem tutela.'},{id:'d',text:'retornar ao estado de natureza anterior à sociedade.'},{id:'e',text:'dominar a ciência e a técnica para controlar a natureza.'}],
    answer:'c', explanation:'Sapere aude! (Kant): ouse saber — use sua própria razão sem a direção de outro. A "menoridade" é a incapacidade de pensar por si mesmo.' },

  { id:272, subject:'Filosofia', topic:'Pré-Socráticos', type:'enem', year:2022, difficulty:'medio',
    statement:'Os pré-socráticos buscavam a arché — o princípio ou origem de todas as coisas. Heráclito se distinguia por afirmar que:',
    alternatives:[{id:'a',text:'a água é o princípio de todas as coisas.'},{id:'b',text:'os números são a essência da realidade.'},{id:'c',text:'o Ser é uno, imóvel e eterno.'},{id:'d',text:'tudo está em constante devir — "não se pode entrar duas vezes no mesmo rio".'},{id:'e',text:'o vácuo e os átomos são os elementos primordiais.'}],
    answer:'d', explanation:'Heráclito de Éfeso: o fogo e o logos (razão cósmica) governam um mundo em constante fluxo (panta rhei — tudo flui). Opõe-se a Parmênides (o Ser é imóvel).' },

  { id:273, subject:'Filosofia', topic:'Sócrates e Platão', subtopic:'Sócrates — Maiêutica', type:'uerj', year:2022, difficulty:'medio',
    statement:'A maiêutica socrática é uma técnica filosófica que consiste em:',
    alternatives:[{id:'a',text:'memorização de textos filosóficos clássicos para citação em debates.'},{id:'b',text:'por meio do diálogo e do questionamento, ajudar o interlocutor a "parir" o conhecimento que já existe em si mesmo.'},{id:'c',text:'demonstração matemática rigorosa de proposições filosóficas.'},{id:'d',text:'convencer o adversário por meio de argumentos falaciosos (sofística).'},{id:'e',text:'contemplação silenciosa da verdade, sem interação com outros.'}],
    answer:'b', explanation:'Maiêutica (arte da parteira): Sócrates, filho de parteira, "ajudava" o interlocutor a dar à luz o conhecimento que já possuía, por meio do diálogo e da ironia socrática.' },

  { id:274, subject:'Filosofia', topic:'Sócrates e Platão', subtopic:'Mundo das Ideias', type:'enem', year:2023, difficulty:'medio',
    statement:'Na teoria platônica do mundo das ideias, a realidade sensível (percebida pelos sentidos) é:',
    alternatives:[{id:'a',text:'a realidade mais verdadeira, por ser diretamente acessível à experiência.'},{id:'b',text:'apenas uma cópia imperfeita e mutável das Ideias eternas e perfeitas — o mundo verdadeiro.'},{id:'c',text:'equivalente ao mundo das ideias em termos de realidade e perfeição.'},{id:'d',text:'produto da razão pura, sem qualquer relação com a experiência sensorial.'},{id:'e',text:'o único mundo real — Platão rejeitava qualquer forma de transcendência.'}],
    answer:'b', explanation:'Platão: o mundo sensível é ilusório e mutável (caverna). O mundo das Ideias (formas universais, eternas, perfeitas) é a realidade verdadeira — acessível apenas pela razão (episteme).' },

  { id:275, subject:'Filosofia', topic:'Sócrates e Platão', subtopic:'Alegoria da Caverna', type:'uerj', year:2023, difficulty:'medio',
    statement:'Na Alegoria da Caverna (A República, Livro VII), as sombras que os prisioneiros veem na parede representam:',
    alternatives:[{id:'a',text:'o conhecimento verdadeiro obtido pela razão filosófica.'},{id:'b',text:'as ideias eternas e perfeitas do mundo inteligível.'},{id:'c',text:'as aparências enganosas do mundo sensível — a doxa (opinião), não o conhecimento verdadeiro.'},{id:'d',text:'os mitos e narrativas religiosas que libertam a alma.'},{id:'e',text:'as memórias da existência anterior da alma no mundo das Ideias.'}],
    answer:'c', explanation:'Alegoria da caverna: prisioneiros tomam sombras (aparências) por realidade. Sair da caverna = filosofia, passar da doxa à episteme. O filósofo volta para libertar os demais.' },

  { id:276, subject:'Filosofia', topic:'Aristóteles', subtopic:'Lógica', type:'enem', year:2022, difficulty:'medio',
    statement:'O silogismo aristotélico é uma forma de raciocínio dedutivo. Qual exemplo é um silogismo válido?',
    alternatives:[{id:'a',text:'"Todo homem é mortal. Sócrates é homem. Logo, Sócrates pode ser mortal."'},{id:'b',text:'"Todo homem é mortal. Sócrates é mortal. Logo, Sócrates é homem."'},{id:'c',text:'"Todo homem é mortal. Sócrates é homem. Logo, Sócrates é mortal."'},{id:'d',text:'"Alguns homens são mortais. Sócrates é homem. Logo, Sócrates é mortal."'},{id:'e',text:'"Sócrates é mortal. Todo mortal é homem. Logo, Sócrates pode ser homem."'}],
    answer:'c', explanation:'Silogismo válido: premissa maior (Todo homem é mortal) + premissa menor (Sócrates é homem) → conclusão necessária (Sócrates é mortal). A validade é formal — independe do conteúdo.' },

  { id:277, subject:'Filosofia', topic:'Aristóteles', subtopic:'Ética aristotélica', type:'uerj', year:2021, difficulty:'medio',
    statement:'Para Aristóteles, a eudaimonia (felicidade/florescimento humano) é alcançada por meio de:',
    alternatives:[{id:'a',text:'prazer sensorial e satisfação dos desejos imediatos.'},{id:'b',text:'rigor ascético e renúncia completa aos prazeres do corpo.'},{id:'c',text:'o exercício das virtudes e da razão, vivendo em conformidade com a natureza humana e na polis.'},{id:'d',text:'acumulação de riqueza e prestígio social como fins em si mesmos.'},{id:'e',text:'obediência absoluta às leis do Estado, independentemente de seu conteúdo.'}],
    answer:'c', explanation:'Aristóteles: eudaimonia = atividade da alma conforme a virtude. A virtude é o justo meio entre extremos (ex.: coragem entre covardia e temeridade). O homem é "animal político" — realiza-se na polis.' },

  { id:278, subject:'Filosofia', topic:'Ética', subtopic:'Epicurismo e Estoicismo', type:'enem', year:2021, difficulty:'medio',
    statement:'Epicuro e os estoicos diferem em suas concepções de felicidade. Para Epicuro, a felicidade consiste em:',
    alternatives:[{id:'a',text:'submissão ao destino e controle das emoções para atingir a indiferença (apatheia).'},{id:'b',text:'ataraxia (ausência de perturbação) e aponia (ausência de dor), alcançadas pela moderação e pelos prazeres simples.'},{id:'c',text:'dever moral cumprido por obrigação racional, independentemente do prazer.'},{id:'d',text:'contemplação da Ideia de Bem como forma suprema de existência.'},{id:'e',text:'serviço ao Estado e ao bem comum como forma de realização individual.'}],
    answer:'b', explanation:'Epicuro: ataraxia (paz de espírito) + aponia (ausência de dor). O prazer verdadeiro é simples — amizade, filosofia, tranquilidade. Evitar os excessos e medos infundados (como o medo da morte).' },

  { id:279, subject:'Filosofia', topic:'Iluminismo', subtopic:'Descartes — Dúvida Metódica', type:'uerj', year:2022, difficulty:'medio',
    statement:'O método cartesiano propõe a dúvida hiperbólica como ponto de partida porque:',
    alternatives:[{id:'a',text:'Descartes acreditava que tudo é incognoscível e que a verdade é impossível.'},{id:'b',text:'ao duvidar de tudo, inclusive dos sentidos e da matemática, chega-se à única certeza indubitável: o próprio ato de duvidar — "Cogito ergo sum" (penso, logo existo).'},{id:'c',text:'a dúvida é o estado natural da mente e deve ser mantida permanentemente.'},{id:'d',text:'Descartes queria mostrar que a fé religiosa é superior à razão.'},{id:'e',text:'a ciência experimental é o único caminho para a verdade, sem necessidade da razão.'}],
    answer:'b', explanation:'Descartes: duvida de tudo (sentidos, matemática, existência do mundo). Mas ao duvidar, pensa — e ao pensar, existe. O cogito é a primeira certeza absoluta, base para reconstruir o conhecimento.' },

  { id:280, subject:'Filosofia', topic:'Iluminismo', subtopic:'Locke — Empirismo', type:'enem', year:2023, difficulty:'medio',
    statement:'John Locke, fundador do empirismo inglês, afirmava que a mente ao nascer é uma "tabula rasa" (lousa em branco). Isso significa que:',
    alternatives:[{id:'a',text:'os seres humanos nascem com ideias inatas — estruturas do conhecimento já impressas na mente.'},{id:'b',text:'todo conhecimento tem origem na experiência sensorial — não existem ideias inatas.'},{id:'c',text:'a razão pura, sem experiência, é capaz de gerar todo o conhecimento necessário.'},{id:'d',text:'a mente humana é incapaz de adquirir conhecimento verdadeiro.'},{id:'e',text:'o conhecimento é exclusivamente de origem divina, revelado pela fé.'}],
    answer:'b', explanation:'Empirismo (Locke, Hume, Berkeley): o conhecimento vem da experiência. Opõe-se ao inatismo racionalista (Descartes). Para Locke, sensações e reflexões são as fontes de todas as nossas ideias.' },

  { id:281, subject:'Filosofia', topic:'Iluminismo', subtopic:'Rousseau — Contrato Social', type:'uerj', year:2022, difficulty:'medio',
    statement:'No "Contrato Social" (1762), Rousseau propõe que a legitimidade do poder político deve se fundamentar em:',
    alternatives:[{id:'a',text:'o direito divino dos reis, delegado por Deus ao monarca.'},{id:'b',text:'a força e a capacidade militar do governante.'},{id:'c',text:'a vontade geral — expressão da soberania popular, à qual todos cedem sua vontade individual.'},{id:'d',text:'o contrato entre o monarca e os nobres, excluindo o povo comum.'},{id:'e',text:'a sabedoria natural dos filósofos que devem governar a cidade.'}],
    answer:'c', explanation:'Rousseau: o contrato social substitui o estado de natureza por uma sociedade onde a "vontade geral" (bem comum) é soberana. Influência direta na Revolução Francesa e nas democracias modernas.' },

  { id:282, subject:'Filosofia', topic:'Iluminismo', subtopic:'Montesquieu — Separação dos Poderes', type:'enem', year:2021, difficulty:'facil',
    statement:'A doutrina da separação dos poderes, formulada por Montesquieu em "O Espírito das Leis" (1748), propõe que:',
    alternatives:[{id:'a',text:'todo o poder deve ser concentrado no soberano para garantir ordem e eficiência.'},{id:'b',text:'os poderes Legislativo, Executivo e Judiciário devem ser separados e independentes para evitar o abuso e garantir a liberdade.'},{id:'c',text:'apenas o povo pode exercer o poder, por meio de democracia direta.'},{id:'d',text:'a Igreja deve controlar o poder judiciário para garantir a moralidade.'},{id:'e',text:'o poder militar deve ser superior ao civil para manter a ordem.'}],
    answer:'b', explanation:'Montesquieu: a separação e o mútuo controle dos três poderes (checks and balances) é garantia da liberdade política. Influenciou a Constituição americana (1787) e as democracias modernas.' },

  { id:283, subject:'Filosofia', topic:'Kant', subtopic:'Imperativo Categórico', type:'uerj', year:2023, difficulty:'dificil',
    statement:'O imperativo categórico de Kant — "Age apenas segundo a máxima que possas querer que se torne lei universal" — é uma regra moral que:',
    alternatives:[{id:'a',text:'varia conforme as consequências da ação para a maioria das pessoas.'},{id:'b',text:'é absoluta e independente das consequências — uma ação é moral apenas se seu princípio puder ser universalizado.'},{id:'c',text:'depende do contexto cultural e histórico para ser aplicada corretamente.'},{id:'d',text:'é uma forma de utilitarismo que maximiza o prazer coletivo.'},{id:'e',text:'só se aplica a cristãos que seguem a lei divina.'}],
    answer:'b', explanation:'Kant: ética deontológica — a moralidade não depende das consequências (como no utilitarismo), mas do princípio da ação. Uma ação é moral se sua máxima puder ser universalizada sem contradição.' },

  { id:284, subject:'Filosofia', topic:'Hegel', subtopic:'Dialética', type:'enem', year:2022, difficulty:'dificil',
    statement:'O método dialético hegeliano, que Marx adaptou ao materialismo histórico, estrutura-se em:',
    alternatives:[{id:'a',text:'observação empírica + hipótese + experimento = lei científica.'},{id:'b',text:'tese + antítese → síntese (Aufhebung): superação que conserva e eleva os elementos anteriores.'},{id:'c',text:'intuição racional + dedução lógica = verdade necessária.'},{id:'d',text:'sensação + reflexão = ideia complexa (empirismo).'},{id:'e',text:'ação política + consciência de classe = revolução.'}],
    answer:'b', explanation:'Hegel: a realidade se desenvolve dialeticamente. Toda tese engendra sua negação (antítese); a contradição é superada pela síntese (Aufhebung — supressão-conservação-elevação). Marx inverteu: dialética da matéria, não do espírito.' },

  { id:285, subject:'Filosofia', topic:'Existencialismo', subtopic:'Nietzsche (precursor)', type:'uerj', year:2022, difficulty:'dificil',
    statement:'A proclamação "Deus está morto" em Nietzsche não é uma afirmação religiosa, mas filosófica. Ela significa que:',
    alternatives:[{id:'a',text:'Nietzsche era ateu e negava a existência de qualquer divindade.'},{id:'b',text:'os valores morais e metafísicos fundamentados na crença em Deus perdem a base — a modernidade descredenciou os valores absolutos, abrindo espaço para o niilismo ou para a criação de novos valores.'},{id:'c',text:'a morte de Jesus Cristo na cruz tem implicações filosóficas para o ateísmo moderno.'},{id:'d',text:'a razão iluminista substituiu definitivamente a religião como guia da humanidade.'},{id:'e',text:'a ciência moderna provou a inexistência de Deus, tornando a moral religiosa obsoleta.'}],
    answer:'b', explanation:'"Deus está morto" (Nietzsche): a modernidade destruiu o fundamento dos valores absolutos. Resposta: niilismo (vazio de valores) ou criação de novos valores pela vontade de poder do além-do-homem (Übermensch).' },

  { id:286, subject:'Filosofia', topic:'Existencialismo', subtopic:'Sartre', type:'enem', year:2023, difficulty:'medio',
    statement:'A máxima existencialista de Sartre "a existência precede a essência" significa que:',
    alternatives:[{id:'a',text:'os seres humanos têm uma natureza fixa determinada por Deus antes de nascerem.'},{id:'b',text:'o ser humano primeiro existe — é lançado no mundo sem natureza prévia — e depois se define por suas escolhas e ações: "estamos condenados a ser livres".'},{id:'c',text:'a essência humana é determinada pela herança genética e pelo ambiente social.'},{id:'d',text:'a existência física precede a existência espiritual em todas as religiões.'},{id:'e',text:'o ser humano só existe verdadeiramente após a morte.'}],
    answer:'b', explanation:'Sartre: não há "natureza humana" pré-definida. O homem existe primeiro e se inventa pelas escolhas. Daí a angústia da liberdade: somos totalmente responsáveis por quem somos.' },

  { id:287, subject:'Filosofia', topic:'Ética', subtopic:'Utilitarismo', type:'uerj', year:2021, difficulty:'medio',
    statement:'O utilitarismo de Bentham e Mill propõe como critério moral:',
    alternatives:[{id:'a',text:'a obediência ao imperativo categórico, independentemente das consequências.'},{id:'b',text:'a maximização da felicidade (prazer) do maior número possível de pessoas — "o maior bem para o maior número".'},{id:'c',text:'a virtude como justo meio entre extremos, conforme a ética aristotélica.'},{id:'d',text:'a submissão à lei natural divina como única forma de moralidade.'},{id:'e',text:'a vontade geral expressa pelo contrato social rousseauniano.'}],
    answer:'b', explanation:'Utilitarismo: ação boa = maximiza o bem-estar (felicidade) do maior número. É ética consequencialista — avalia as ações por seus resultados. Influente na economia, políticas públicas e bioética.' },

  { id:288, subject:'Filosofia', topic:'Ética', subtopic:'Moral e Ética', type:'enem', year:2022, difficulty:'facil',
    statement:'A distinção filosófica entre moral e ética pode ser descrita como:',
    alternatives:[{id:'a',text:'moral e ética são sinônimos sem qualquer distinção conceitual.'},{id:'b',text:'moral refere-se a valores e regras práticas de conduta de uma sociedade; ética é a reflexão filosófica sobre esses valores e sua fundamentação.'},{id:'c',text:'moral é universal; ética é relativa a cada cultura.'},{id:'d',text:'ética pertence à religião; moral pertence à filosofia.'},{id:'e',text:'moral é coletiva; ética é sempre individual e privada.'}],
    answer:'b', explanation:'Convencionalmente: moral = conjunto de normas e valores de uma sociedade (prática). Ética = reflexão filosófica sobre o fundamento, a validade e os critérios da moral (teoria). A fronteira é tênue e debatida.' },

  { id:289, subject:'Filosofia', topic:'Ética', subtopic:'Maquiavel — O Príncipe', type:'uerj', year:2022, difficulty:'medio',
    statement:'"É melhor ser temido do que amado" — essa máxima de Maquiavel em "O Príncipe" reflete sua concepção de que:',
    alternatives:[{id:'a',text:'a política deve ser guiada por princípios morais cristãos acima de qualquer outra consideração.'},{id:'b',text:'a política tem autonomia própria em relação à moral — o governante deve usar todos os meios necessários para manter o poder e o Estado.'},{id:'c',text:'o amor popular é dispensável para o bom governante.'},{id:'d',text:'a tirania é preferível à democracia por garantir estabilidade.'},{id:'e',text:'o príncipe deve ignorar completamente a opinião pública.'}],
    answer:'b', explanation:'Maquiavel: separação entre política e moral (razão de Estado). O príncipe pode — e deve — usar a força e a astúcia quando necessário para manter o poder. Fundador do pensamento político moderno.' },

  { id:290, subject:'Filosofia', topic:'Iluminismo', subtopic:'Hobbes — Estado de Natureza', type:'enem', year:2021, difficulty:'medio',
    statement:'Para Hobbes, sem o Estado (Leviatã), o homem viveria em estado de natureza onde a vida seria:',
    alternatives:[{id:'a',text:'"Solitária, pobre, sórdida, embrutecida e curta" — guerra de todos contra todos.'},{id:'b',text:'harmoniosa e cooperativa, pois o homem é naturalmente bom.'},{id:'c',text:'guiada pela razão natural sem necessidade de coerção estatal.'},{id:'d',text:'organizada em pequenas comunidades autossuficientes e pacíficas.'},{id:'e',text:'melhor que na sociedade civil, pois o Estado corrompe o homem.'}],
    answer:'a', explanation:'Hobbes (Leviatã, 1651): sem Estado, "homo homini lupus" — o homem é lobo do homem. Para escapar da guerra de todos contra todos, os indivíduos transferem seus direitos ao soberano (contrato social).'},

  { id:291, subject:'Filosofia', topic:'Existencialismo', subtopic:'Filosofia da Ciência — Popper', type:'uerj', year:2023, difficulty:'dificil',
    statement:'Karl Popper propôs a falsificabilidade como critério de demarcação científica. Isso significa que:',
    alternatives:[{id:'a',text:'uma teoria científica deve ser verificada positivamente por infinitos experimentos.'},{id:'b',text:'uma teoria é científica se e somente se for possível, em princípio, formular um teste empírico que possa refutá-la.'},{id:'c',text:'toda teoria científica deve ser provada matematicamente antes de ser aceita.'},{id:'d',text:'as ciências humanas não são científicas por não usarem o método experimental.'},{id:'e',text:'a ciência avança por acumulação de fatos sem que as teorias sejam jamais abandonadas.'}],
    answer:'b', explanation:'Popper: ciência não progride pela verificação (indução), mas pela tentativa de falsificação. Uma teoria que não pode ser falsificada (ex.: astrologia) não é científica. Revolução no método hipotético-dedutivo.' },

  { id:292, subject:'Filosofia', topic:'Existencialismo', subtopic:'Fenomenologia — Husserl', type:'enem', year:2022, difficulty:'dificil',
    statement:'A fenomenologia de Edmund Husserl propõe como método filosófico:',
    alternatives:[{id:'a',text:'análise lógico-matemática da linguagem para dissolver problemas filosóficos.'},{id:'b',text:'retorno "às coisas mesmas" — suspender os pressupostos (epoché) e descrever os fenômenos tal como aparecem à consciência.'},{id:'c',text:'experimentação empírica rigorosa como único caminho para o conhecimento verdadeiro.'},{id:'d',text:'dialética histórica entre tese e antítese para compreender o desenvolvimento do espírito.'},{id:'e',text:'crítica da razão pura para estabelecer os limites do conhecimento possível.'}],
    answer:'b', explanation:'Husserl: fenomenologia = estudo da estrutura da consciência e de como os fenômenos se apresentam a ela. A epoché (suspensão do julgamento) permite descrever a experiência pura — influenciou Heidegger, Sartre, Merleau-Ponty.' },

  { id:293, subject:'Filosofia', topic:'Aristóteles', subtopic:'Lógica — Falácias', type:'uerj', year:2021, difficulty:'medio',
    statement:'"Você não pode criticar a corrupção política porque você mesmo já cometeu infrações de trânsito." Esse argumento é um exemplo de:',
    alternatives:[{id:'a',text:'argumento de autoridade'},{id:'b',text:'generalização precipitada'},{id:'c',text:'falácia ad hominem (ataque à pessoa, não ao argumento)'},{id:'d',text:'petição de princípio'},{id:'e',text:'falsa dicotomia'}],
    answer:'c', explanation:'Ad hominem: ataca a pessoa em vez de refutar o argumento. O fato de alguém ter cometido infrações não invalida sua crítica à corrupção — são questões independentes.' },

  { id:294, subject:'Filosofia', topic:'Aristóteles', subtopic:'Filosofia Medieval — Tomás de Aquino', type:'enem', year:2020, difficulty:'medio',
    statement:'Tomás de Aquino (séc. XIII), ao propor a "harmonia entre fé e razão", argumentava que:',
    alternatives:[{id:'a',text:'a fé deve ser abandonada em favor da razão filosófica grega.'},{id:'b',text:'fé e razão são caminhos distintos e complementares para a verdade — a razão prepara o terreno para a fé revelar o que a razão não alcança.'},{id:'c',text:'a razão é incompatível com a fé cristã e deve ser suprimida.'},{id:'d',text:'apenas a fé pode conhecer a verdade — a razão é enganosa.'},{id:'e',text:'a filosofia de Platão substituiu completamente a teologia cristã.'}],
    answer:'b', explanation:'Tomás de Aquino (escolástica): razão e fé não se contradizem — a filosofia de Aristóteles (razão natural) é compatível e complementar à revelação cristã. "A graça não suprime a natureza, mas a aperfeiçoa."' },

  { id:295, subject:'Filosofia', topic:'Existencialismo', subtopic:'Filosofia Contemporânea — Wittgenstein', type:'uerj', year:2023, difficulty:'dificil',
    statement:'Ludwig Wittgenstein, no "Tractatus Logico-Philosophicus", afirmou: "Sobre o que não se pode falar, deve-se calar." Essa proposição indica que:',
    alternatives:[{id:'a',text:'a filosofia deve se ocupar apenas de questões religiosas e metafísicas transcendentes.'},{id:'b',text:'os limites da linguagem são os limites do mundo dizível — questões que excedem a lógica da linguagem são inexprimíveis, não falsas.'},{id:'c',text:'o silêncio é a melhor forma de comunicação filosófica.'},{id:'d',text:'a filosofia da mente é impossível por não poder ser expressa em linguagem.'},{id:'e',text:'Wittgenstein rejeitava qualquer forma de lógica formal.'}],
    answer:'b', explanation:'Wittgenstein (1ª fase): os limites do que pode ser dito (linguagem lógica) são os limites do mundo. O ético, o estético e o metafísico não podem ser "ditos" — apenas mostrados ou silenciados.' },

  { id:296, subject:'Filosofia', topic:'Ética', subtopic:'Ética Aplicada — Bioética', type:'enem', year:2024, difficulty:'medio',
    statement:'A bioética, campo filosófico que trata de dilemas morais em medicina e biologia, utiliza diferentes referenciais éticos. O princípio da autonomia do paciente está mais alinhado a:',
    alternatives:[{id:'a',text:'o utilitarismo — maximizar o bem-estar do maior número.'},{id:'b',text:'a ética deontológica kantiana — respeitar a pessoa como fim em si mesma, capaz de decisões racionais.'},{id:'c',text:'o estoicismo — submissão ao destino e à natureza das coisas.'},{id:'d',text:'o relativismo moral — cada cultura decide o que é correto para seus membros.'},{id:'e',text:'o naturalismo ético — a natureza determina o que é moralmente correto.'}],
    answer:'b', explanation:'Autonomia: o paciente tem direito a decidir sobre seu próprio corpo e tratamento — mesmo discordando do médico. Isso se alinha à ética kantiana (respeitar a pessoa como fim racional, não como meio).' },

  { id:297, subject:'Filosofia', topic:'Ética', subtopic:'Filosofia Política — Democracia', type:'uerj', year:2022, difficulty:'medio',
    statement:'A crise da democracia representativa contemporânea manifesta-se, entre outros fatores, pela:',
    alternatives:[{id:'a',text:'excesso de participação popular nas decisões governamentais cotidianas.'},{id:'b',text:'crise de representatividade, desconfiança nas instituições, ascensão do populismo e influência do poder econômico sobre o político.'},{id:'c',text:'volta dos regimes monárquicos absolutos na Europa Ocidental.'},{id:'d',text:'domínio da filosofia marxista sobre os governos democraticamente eleitos.'},{id:'e',text:'excesso de fiscalização do poder por parte da imprensa e da sociedade civil.'}],
    answer:'b', explanation:'A democracia representativa enfrenta crises de legitimidade: partidos desconectados dos cidadãos, financiamento privado de campanhas, fake news, populismo autoritário e desinstitucionalização — problemas analisados por Habermas, Mouffe e outros.' },

  { id:298, subject:'Filosofia', topic:'Kant', subtopic:'Estética — Arte e Beleza', type:'enem', year:2021, difficulty:'medio',
    statement:'Kant, em sua estética, distingue o belo do agradável porque:',
    alternatives:[{id:'a',text:'o agradável é universal; o belo é subjetivo e varia por pessoa.'},{id:'b',text:'o belo provoca satisfação desinteressada e reivindica concordância universal, sem ser mero prazer sensorial do agradável.'},{id:'c',text:'o belo é determinado pela utilidade do objeto; o agradável pelo prazer sensorial.'},{id:'d',text:'o agradável é objetivo; o belo é produto da imaginação individual.'},{id:'e',text:'Kant não distinguia entre belo e agradável — tratava-os como sinônimos.'}],
    answer:'b', explanation:'Kant (Crítica do Juízo): o julgamento de gosto (belo) é subjetivo mas reivindica validade universal — é desinteressado (não depende da existência do objeto). O agradável é privado e sensorial.' },

  { id:299, subject:'Filosofia', topic:'Existencialismo', subtopic:'Filosofia da Mente', type:'uerj', year:2023, difficulty:'dificil',
    statement:'O problema mente-corpo, clássico na filosofia, refere-se à:',
    alternatives:[{id:'a',text:'questão de como o exercício físico melhora a saúde mental.'},{id:'b',text:'dificuldade de explicar como estados mentais (consciência, pensamento, qualia) se relacionam com processos físicos cerebrais.'},{id:'c',text:'debate sobre se animais possuem mente ou apenas instinto.'},{id:'d',text:'questão política sobre a relação entre o governo e os cidadãos.'},{id:'e',text:'problema de como a razão controla os instintos biológicos.'}],
    answer:'b', explanation:'O problema mente-corpo (Descartes → contemporaneidade): como estados mentais subjetivos (dor, prazer, consciência) emergem de processos físicos cerebrais? Debate entre dualismo, monismo materialista e funcionalismo.' },

  { id:300, subject:'Filosofia', topic:'Ética', subtopic:'Direito Natural e Positivo', type:'enem', year:2022, difficulty:'medio',
    statement:'A distinção entre direito natural e direito positivo consiste em:',
    alternatives:[{id:'a',text:'direito natural é criado pelo Estado; positivo emana da natureza e da razão.'},{id:'b',text:'direito natural: normas universais derivadas da razão ou natureza humana, válidas independentemente de qualquer legislação; direito positivo: normas criadas e vigentes em um ordenamento jurídico específico.'},{id:'c',text:'direito positivo é eterno e imutável; natural muda conforme as leis.'},{id:'d',text:'direito natural é aplicado em países democráticos; positivo em ditaduras.'},{id:'e',text:'direito positivo inclui direitos humanos; natural inclui apenas crimes.'}],
    answer:'b', explanation:'Direito natural (Aristóteles, Tomás de Aquino, Locke): princípios morais universais transcendem as leis humanas. Direito positivo (Kelsen): norma válida é a criada pela autoridade competente, independentemente de conteúdo moral.' },

  // ── INGLÊS (30) ──────────────────────────────────────────────────────────
  { id:301, subject:'Inglês', topic:'Reading Comprehension', type:'enem', year:2022, difficulty:'medio',
    statement:'"Social media platforms have transformed how we communicate, but they have also been linked to rising rates of anxiety and depression, especially among teenagers." According to the text, social media:',
    alternatives:[{id:'a',text:'has only positive effects on young people.'},{id:'b',text:'has both transformed communication and been associated with mental health issues.'},{id:'c',text:'should be banned for teenagers.'},{id:'d',text:'is unrelated to depression.'},{id:'e',text:'has improved teenagers\' mental health.'}],
    answer:'b', explanation:'The text explicitly mentions both effects: transformation of communication AND the link to anxiety/depression rates. "But they have also been linked" establishes the dual effect.' },

  { id:302, subject:'Inglês', topic:'Cognates and False Friends', subtopic:'Cognates', type:'uerj', year:2023, difficulty:'facil',
    statement:'The word "eventually" in English means:',
    alternatives:[{id:'a',text:'ocasionalmente, às vezes.'},{id:'b',text:'eventualmente, por acaso.'},{id:'c',text:'no final, por fim (depois de algum tempo).'},{id:'d',text:'imediatamente.'},{id:'e',text:'nunca.'}],
    answer:'c', explanation:'"Eventually" is a false friend (falso cognato). It does NOT mean "eventualmente" (which means "occasionally" in Portuguese) — it means "in the end" / "finally after some time".' },

  { id:303, subject:'Inglês', topic:'Grammar — Tenses', subtopic:'Present Perfect', type:'enem', year:2023, difficulty:'medio',
    statement:'Choose the correct sentence: "She ___ in London since 2015."',
    alternatives:[{id:'a',text:'lives'},{id:'b',text:'lived'},{id:'c',text:'has lived'},{id:'d',text:'is living'},{id:'e',text:'was living'}],
    answer:'c', explanation:'Present Perfect ("has lived") expresses an action that started in the past and continues to the present. The time marker "since 2015" requires Present Perfect in English.' },

  { id:304, subject:'Inglês', topic:'Reading Comprehension', type:'enem', year:2021, difficulty:'medio',
    statement:'"Despite significant progress in renewable energy, fossil fuels still account for 80% of global energy consumption." The word "despite" introduces:',
    alternatives:[{id:'a',text:'a cause.'},{id:'b',text:'a consequence.'},{id:'c',text:'a contrast/concession.'},{id:'d',text:'an addition.'},{id:'e',text:'an example.'}],
    answer:'c', explanation:'"Despite" = "apesar de". It introduces a concession/contrast — something that should prevent the second clause but doesn\'t. Synonyms: "in spite of", "although".' },

  { id:305, subject:'Inglês', topic:'Phrasal Verbs', type:'uerj', year:2022, difficulty:'medio',
    statement:'In the sentence "I need to look up this word in the dictionary", the phrasal verb "look up" means:',
    alternatives:[{id:'a',text:'to admire someone.'},{id:'b',text:'to search for information.'},{id:'c',text:'to look at the sky.'},{id:'d',text:'to wake up.'},{id:'e',text:'to give up.'}],
    answer:'b', explanation:'"Look up" = to search for information (typically in a reference like a dictionary). Context ("in the dictionary") confirms this meaning. "Look up to someone" means to admire, but that\'s a different usage.' },

  { id:306, subject:'Inglês', topic:'Cognates and False Friends', subtopic:'False Friends', type:'enem', year:2022, difficulty:'medio',
    statement:'Which of the following words is a FALSE FRIEND in English (means something different from what it looks like in Portuguese)?',
    alternatives:[{id:'a',text:'Information'},{id:'b',text:'Pretend (does not mean "pretender"; means "fingir")'},{id:'c',text:'Education'},{id:'d',text:'Hospital'},{id:'e',text:'Modern'}],
    answer:'b', explanation:'"Pretend" means "fingir", not "pretender" (which in English is "to intend"). The others are true cognates with the same meaning in both languages.' },

  { id:307, subject:'Inglês', topic:'Reading Comprehension', type:'enem', year:2023, difficulty:'dificil',
    statement:'"Artificial intelligence poses both unprecedented opportunities and serious risks. While it can revolutionize healthcare and education, it also threatens jobs and raises ethical questions." The author\'s attitude toward AI is:',
    alternatives:[{id:'a',text:'entirely optimistic.'},{id:'b',text:'completely pessimistic.'},{id:'c',text:'balanced/nuanced — recognizing both benefits and risks.'},{id:'d',text:'indifferent.'},{id:'e',text:'hostile to technology.'}],
    answer:'c', explanation:'The author uses "both... and" and "while... also" structures to present opposing views equally — hallmark of balanced analysis. No exclusively positive or negative adjectives dominate.' },

  { id:308, subject:'Inglês', topic:'Grammar — Tenses', subtopic:'Conditionals', type:'uerj', year:2023, difficulty:'dificil',
    statement:'"If I ___ more time, I would travel the world." Complete with the correct form:',
    alternatives:[{id:'a',text:'have'},{id:'b',text:'had'},{id:'c',text:'will have'},{id:'d',text:'have had'},{id:'e',text:'having'}],
    answer:'b', explanation:'Second Conditional (hypothetical situation): "If + past simple, would + base verb". "Had" is the past form here, even though it refers to an unreal present.' },

  { id:309, subject:'Inglês', topic:'Vocabulary', subtopic:'Synonyms', type:'enem', year:2022, difficulty:'facil',
    statement:'Choose the best synonym for "huge" in: "The project had a huge impact on the community."',
    alternatives:[{id:'a',text:'tiny'},{id:'b',text:'enormous'},{id:'c',text:'average'},{id:'d',text:'quiet'},{id:'e',text:'brief'}],
    answer:'b', explanation:'"Huge" means very large in size or extent. "Enormous" is a direct synonym. The others have opposite or unrelated meanings.' },

  { id:310, subject:'Inglês', topic:'Reading Comprehension', subtopic:'Main Idea', type:'uerj', year:2022, difficulty:'medio',
    statement:'"Reading books enhances vocabulary, improves focus, and stimulates the imagination. Moreover, it has been proven to reduce stress by as much as 68%." The main idea of this passage is:',
    alternatives:[{id:'a',text:'only specific books help reduce stress.'},{id:'b',text:'reading has multiple cognitive and psychological benefits.'},{id:'c',text:'reading should replace all other activities.'},{id:'d',text:'only children should read regularly.'},{id:'e',text:'reading is harmful to focus.'}],
    answer:'b', explanation:'The passage lists several distinct benefits (vocabulary, focus, imagination, stress reduction) — the unifying theme is that reading has multiple positive effects.' },

  { id:311, subject:'Inglês', topic:'Grammar — Tenses', subtopic:'Modals', type:'enem', year:2021, difficulty:'medio',
    statement:'"You ___ finish your homework before going out." Which modal verb expresses obligation?',
    alternatives:[{id:'a',text:'might'},{id:'b',text:'could'},{id:'c',text:'must'},{id:'d',text:'may'},{id:'e',text:'would'}],
    answer:'c', explanation:'"Must" expresses strong obligation or necessity. "Might", "could", "may" express possibility. "Would" expresses conditionals or polite requests.' },

  { id:312, subject:'Inglês', topic:'Reading Comprehension', subtopic:'Inference', type:'enem', year:2023, difficulty:'dificil',
    statement:'"The once-bustling streets of the downtown area now stand largely empty, a stark reminder of how the pandemic reshaped urban life." It can be inferred that:',
    alternatives:[{id:'a',text:'the streets have always been empty.'},{id:'b',text:'the downtown area was formerly crowded and active, but the pandemic caused significant change.'},{id:'c',text:'the pandemic improved urban life.'},{id:'d',text:'most people still work downtown.'},{id:'e',text:'the streets will never recover.'}],
    answer:'b', explanation:'"Once-bustling" = previously active/crowded. "Now stand largely empty" = present state of emptiness. The contrast shows a before/after caused by the pandemic.' },

  { id:313, subject:'Inglês', topic:'Vocabulary', subtopic:'Prefixes', type:'uerj', year:2021, difficulty:'medio',
    statement:'The prefix "un-" in words like "unhappy", "unable", "unknown" indicates:',
    alternatives:[{id:'a',text:'repetition (again).'},{id:'b',text:'negation or opposite.'},{id:'c',text:'superiority (more than).'},{id:'d',text:'underneath.'},{id:'e',text:'beforehand.'}],
    answer:'b', explanation:'"Un-" is a negation prefix: unhappy = not happy, unable = not able, unknown = not known. Other negation prefixes: in-, im-, dis-, non-.' },

  { id:314, subject:'Inglês', topic:'Reading Comprehension', type:'enem', year:2021, difficulty:'medio',
    statement:'"The report\'s findings were alarming: deforestation rates have doubled in the past decade." The word "alarming" conveys that the findings were:',
    alternatives:[{id:'a',text:'reassuring.'},{id:'b',text:'worrying or causing concern.'},{id:'c',text:'unclear.'},{id:'d',text:'amusing.'},{id:'e',text:'irrelevant.'}],
    answer:'b', explanation:'"Alarming" = causing alarm, worrying. The context (doubled deforestation) supports a negative/concerning reading.' },

  { id:315, subject:'Inglês', topic:'Grammar — Tenses', subtopic:'Passive Voice', type:'enem', year:2022, difficulty:'medio',
    statement:'Convert to passive voice: "They built the bridge in 1995."',
    alternatives:[{id:'a',text:'The bridge was built in 1995.'},{id:'b',text:'The bridge is built in 1995.'},{id:'c',text:'The bridge has built in 1995.'},{id:'d',text:'The bridge were built in 1995.'},{id:'e',text:'The bridge builds in 1995.'}],
    answer:'a', explanation:'Passive voice past simple: subject (bridge) + was/were + past participle (built). Singular subject → "was built".' },

  { id:316, subject:'Inglês', topic:'Phrasal Verbs', type:'uerj', year:2023, difficulty:'dificil',
    statement:'The phrasal verb "give up" means:',
    alternatives:[{id:'a',text:'to hand over.'},{id:'b',text:'to stop trying; to quit.'},{id:'c',text:'to wake up early.'},{id:'d',text:'to invite someone.'},{id:'e',text:'to gain weight.'}],
    answer:'b', explanation:'"Give up" = to stop trying, to quit. "Don\'t give up!" = "Don\'t quit!". Common in motivational contexts.' },

  { id:317, subject:'Inglês', topic:'Reading Comprehension', type:'enem', year:2023, difficulty:'medio',
    statement:'"Climate change is no longer a distant threat — it is a present reality affecting millions of lives today." The phrase "no longer" indicates:',
    alternatives:[{id:'a',text:'something that never happened.'},{id:'b',text:'something that was true in the past but is not anymore.'},{id:'c',text:'something that will happen in the future.'},{id:'d',text:'something rare.'},{id:'e',text:'something theoretical.'}],
    answer:'b', explanation:'"No longer X" = previously X, but not anymore. Here: climate change was once considered distant/future, but now it is a present reality.' },

  { id:318, subject:'Inglês', topic:'Vocabulary', type:'enem', year:2022, difficulty:'facil',
    statement:'What does "to achieve" mean in: "She worked hard to achieve her goals"?',
    alternatives:[{id:'a',text:'to abandon.'},{id:'b',text:'to accomplish or attain.'},{id:'c',text:'to forget.'},{id:'d',text:'to avoid.'},{id:'e',text:'to criticize.'}],
    answer:'b', explanation:'"Achieve" means to successfully accomplish, reach or attain (a goal, objective). The context of "worked hard... goals" confirms this.' },

  { id:319, subject:'Inglês', topic:'Grammar — Tenses', subtopic:'Comparatives', type:'uerj', year:2022, difficulty:'medio',
    statement:'Choose the correct form: "The Amazon is ___ than the Nile."',
    alternatives:[{id:'a',text:'longer'},{id:'b',text:'long'},{id:'c',text:'longest'},{id:'d',text:'more long'},{id:'e',text:'the longer'}],
    answer:'a', explanation:'Short adjectives (one syllable) form comparatives by adding "-er" + "than". "Long" → "longer than". "More long" and "most long" are incorrect.' },

  { id:320, subject:'Inglês', topic:'Reading Comprehension', type:'enem', year:2021, difficulty:'facil',
    statement:'"Plastic pollution kills over one million seabirds every year." This sentence presents:',
    alternatives:[{id:'a',text:'an opinion.'},{id:'b',text:'a statistical fact.'},{id:'c',text:'a prediction.'},{id:'d',text:'a question.'},{id:'e',text:'a suggestion.'}],
    answer:'b', explanation:'The sentence provides a specific number ("over one million") — this is a factual/statistical claim, not opinion or prediction.' },

  { id:321, subject:'Inglês', topic:'Cognates and False Friends', subtopic:'False Friends (actually)', type:'enem', year:2023, difficulty:'medio',
    statement:'The English word "actually" means:',
    alternatives:[{id:'a',text:'atualmente (currently).'},{id:'b',text:'na verdade, de fato.'},{id:'c',text:'eventualmente.'},{id:'d',text:'raramente.'},{id:'e',text:'ocasionalmente.'}],
    answer:'b', explanation:'False friend alert! "Actually" does NOT mean "atualmente" (currently). It means "in fact / really". Use "currently" or "nowadays" for "atualmente".' },

  { id:322, subject:'Inglês', topic:'Grammar — Tenses', subtopic:'Articles', type:'uerj', year:2021, difficulty:'facil',
    statement:'"___ sun rises in the east." Which article is correct?',
    alternatives:[{id:'a',text:'A'},{id:'b',text:'An'},{id:'c',text:'The'},{id:'d',text:'(no article)'},{id:'e',text:'Some'}],
    answer:'c', explanation:'"The" is used for unique entities (the sun, the moon, the sky, the Earth). There is only one sun, so it takes the definite article.' },

  { id:323, subject:'Inglês', topic:'Reading Comprehension', type:'enem', year:2022, difficulty:'medio',
    statement:'"Remote work has blurred the line between professional and personal life." The word "blurred" in this context means:',
    alternatives:[{id:'a',text:'strengthened.'},{id:'b',text:'made less clear or distinct.'},{id:'c',text:'eliminated completely.'},{id:'d',text:'drawn.'},{id:'e',text:'celebrated.'}],
    answer:'b', explanation:'"To blur" means to make unclear, fuzzy, or indistinct. Applied metaphorically here: remote work has made the professional/personal boundary less clear, not eliminated it.' },

  { id:324, subject:'Inglês', topic:'Vocabulary', type:'enem', year:2021, difficulty:'medio',
    statement:'"Awareness" is the noun form of:',
    alternatives:[{id:'a',text:'aware (adjective meaning conscious or informed).'},{id:'b',text:'awake (adjective meaning not asleep).'},{id:'c',text:'away (adverb meaning distant).'},{id:'d',text:'award (noun meaning prize).'},{id:'e',text:'awful (adjective meaning terrible).'}],
    answer:'a', explanation:'Awareness = the state of being aware (conscious of something). Common collocations: environmental awareness, self-awareness, raising awareness.' },

  { id:325, subject:'Inglês', topic:'Grammar — Tenses', subtopic:'Prepositions', type:'uerj', year:2022, difficulty:'medio',
    statement:'"I was born ___ May, ___ a Tuesday, ___ 1998." Complete with prepositions:',
    alternatives:[{id:'a',text:'on / in / in'},{id:'b',text:'in / on / in'},{id:'c',text:'at / on / in'},{id:'d',text:'in / at / on'},{id:'e',text:'on / in / on'}],
    answer:'b', explanation:'Rule of thumb: IN + months/years (in May, in 1998), ON + days (on Tuesday), AT + specific times (at 5 pm).' },

  { id:326, subject:'Inglês', topic:'Reading Comprehension', subtopic:'Purpose', type:'enem', year:2023, difficulty:'medio',
    statement:'"Buy now and save 50%! Limited time offer — don\'t miss out!" The purpose of this text is to:',
    alternatives:[{id:'a',text:'inform about a scientific discovery.'},{id:'b',text:'persuade readers to make a purchase.'},{id:'c',text:'tell a story.'},{id:'d',text:'describe a place.'},{id:'e',text:'give scientific advice.'}],
    answer:'b', explanation:'Imperatives ("Buy now", "don\'t miss out"), superlatives ("50%!"), and urgency ("Limited time") are hallmarks of persuasive/advertising language targeting purchase decisions.' },

  { id:327, subject:'Inglês', topic:'Vocabulary', subtopic:'Idioms', type:'uerj', year:2023, difficulty:'dificil',
    statement:'The idiom "it\'s a piece of cake" means:',
    alternatives:[{id:'a',text:'it\'s delicious.'},{id:'b',text:'it\'s very easy.'},{id:'c',text:'it\'s expensive.'},{id:'d',text:'it\'s sweet.'},{id:'e',text:'it\'s small.'}],
    answer:'b', explanation:'"A piece of cake" is an idiomatic expression meaning "very easy". Example: "The exam was a piece of cake" = "The exam was very easy". Portuguese equivalent: "moleza" or "mamão com açúcar".' },

  { id:328, subject:'Inglês', topic:'Grammar — Tenses', subtopic:'Question Tags', type:'enem', year:2022, difficulty:'medio',
    statement:'"You\'re coming to the party, ___?" Complete with the correct question tag:',
    alternatives:[{id:'a',text:'isn\'t it'},{id:'b',text:'aren\'t you'},{id:'c',text:'don\'t you'},{id:'d',text:'haven\'t you'},{id:'e',text:'won\'t you'}],
    answer:'b', explanation:'Question tag rule: affirmative statement → negative tag. "You ARE coming" (positive) → tag is negative auxiliary "aren\'t you". The auxiliary must match the main verb ("are" → "aren\'t").' },

  { id:329, subject:'Inglês', topic:'Reading Comprehension', type:'enem', year:2023, difficulty:'dificil',
    statement:'"The author argues that technology is a tool — neither inherently good nor evil, but shaped by how we use it." The author\'s view on technology is best described as:',
    alternatives:[{id:'a',text:'deterministic — technology controls human fate.'},{id:'b',text:'neutralist — technology\'s impact depends on human choices and application.'},{id:'c',text:'rejectionist — technology should be abandoned.'},{id:'d',text:'utopian — technology will solve all problems.'},{id:'e',text:'dystopian — technology will destroy humanity.'}],
    answer:'b', explanation:'"Neither inherently good nor evil" + "shaped by how we use it" = neutralist/instrumentalist view. Technology has no moral valence on its own; humans determine outcomes.' },

  { id:330, subject:'Inglês', topic:'Vocabulary', type:'enem', year:2022, difficulty:'facil',
    statement:'The opposite of "expensive" is:',
    alternatives:[{id:'a',text:'costly'},{id:'b',text:'cheap'},{id:'c',text:'valuable'},{id:'d',text:'rich'},{id:'e',text:'worthy'}],
    answer:'b', explanation:'"Expensive" (caro) ↔ "cheap" (barato). "Costly" is a synonym (also means expensive). "Valuable" means having worth, not opposite.' },

];
