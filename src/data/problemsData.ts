export interface ProblemCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgLight: string;
  borderLight: string;
}

export type ProblemScale = 'individual' | 'familia' | 'escola' | 'quarteirao' | 'bairro' | 'cidade';

export interface MappedProblem {
  id: number;
  title: string;
  question: string;
  categories: string[]; // Category IDs
  scales: ProblemScale[];
  tags: string[];
  includes?: string[];
  groupQuestions?: string[];
  importantNote?: string;
  hypotheses?: string[];
  relatedProblemIds?: number[];
}

export const PROBLEM_CATEGORIES: ProblemCategory[] = [
  {
    id: 'educacao',
    name: 'Educação e Escola',
    icon: '🎓',
    color: 'text-blue-600 dark:text-blue-400',
    bgLight: 'bg-blue-50 dark:bg-blue-950/40',
    borderLight: 'border-blue-200 dark:border-blue-800/60',
  },
  {
    id: 'vulnerabilidade',
    name: 'Vulnerabilidade Social e Assistência',
    icon: '🤝',
    color: 'text-purple-600 dark:text-purple-400',
    bgLight: 'bg-purple-50 dark:bg-purple-950/40',
    borderLight: 'border-purple-200 dark:border-purple-800/60',
  },
  {
    id: 'saude',
    name: 'Saúde e Bem-estar',
    icon: '❤️',
    color: 'text-rose-600 dark:text-rose-400',
    bgLight: 'bg-rose-50 dark:bg-rose-950/40',
    borderLight: 'border-rose-200 dark:border-rose-800/60',
  },
  {
    id: 'meio-ambiente',
    name: 'Meio Ambiente e Saneamento',
    icon: '🌱',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderLight: 'border-emerald-200 dark:border-emerald-800/60',
  },
  {
    id: 'urbanismo',
    name: 'Urbanismo e Infraestrutura',
    icon: '🏙️',
    color: 'text-amber-600 dark:text-amber-400',
    bgLight: 'bg-amber-50 dark:bg-amber-950/40',
    borderLight: 'border-amber-200 dark:border-amber-800/60',
  },
  {
    id: 'mobilidade',
    name: 'Mobilidade e Segurança Viária',
    icon: '🚦',
    color: 'text-orange-600 dark:text-orange-400',
    bgLight: 'bg-orange-50 dark:bg-orange-950/40',
    borderLight: 'border-orange-200 dark:border-orange-800/60',
  },
  {
    id: 'servicos-publicos',
    name: 'Serviços Públicos',
    icon: '🏛️',
    color: 'text-cyan-600 dark:text-cyan-400',
    bgLight: 'bg-cyan-50 dark:bg-cyan-950/40',
    borderLight: 'border-cyan-200 dark:border-cyan-800/60',
  },
  {
    id: 'economia',
    name: 'Economia Local',
    icon: '💼',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/40',
    borderLight: 'border-indigo-200 dark:border-indigo-800/60',
  },
  {
    id: 'convivencia',
    name: 'Convivência e Qualidade de Vida',
    icon: '🧩',
    color: 'text-teal-600 dark:text-teal-400',
    bgLight: 'bg-teal-50 dark:bg-teal-950/40',
    borderLight: 'border-teal-200 dark:border-teal-800/60',
  },
];

export const PROBLEM_SCALES: { id: ProblemScale; label: string; icon: string; description: string }[] = [
  { id: 'individual', label: '#individual', icon: '👤', description: 'Impacta diretamente a pessoa no nível pessoal e comportamental' },
  { id: 'familia', label: '#familia', icon: '🏠', description: 'Afeta o núcleo familiar e as relações domésticas' },
  { id: 'escola', label: '#escola', icon: '🏫', description: 'Ocorre ou se reflete no ecossistema e ambiente escolar' },
  { id: 'quarteirao', label: '#quarteirao', icon: '🛣️', description: 'Impacta o entorno imediato, ruas vizinhas e quarteirão' },
  { id: 'bairro', label: '#bairro', icon: '🏘️', description: 'Atinge a comunidade do bairro e seus espaços públicos' },
  { id: 'cidade', label: '#cidade', icon: '🌆', description: 'Tem dimensão sistêmica no município e na gestão pública' },
];

export const MAPPED_PROBLEMS: MappedProblem[] = [
  {
    id: 1,
    title: 'Desmotivação e engajamento escolar',
    question: 'O que faz alguns alunos perderem o interesse ou a motivação pela escola?',
    categories: ['educacao'],
    scales: ['individual', 'escola'],
    tags: ['#educacao', '#aprendizagem', '#engajamento', '#juventude', '#individual', '#escola'],
    includes: [
      'Desinteresse pelas disciplinas tradicionais',
      'Desconexão entre o currículo e o projeto de vida do estudante',
      'Sensação de falta de utilidade prática dos conteúdos'
    ],
    relatedProblemIds: [2, 3]
  },
  {
    id: 2,
    title: 'Formato das aulas e experiência de aprendizagem',
    question: 'Como o formato das aulas influencia o interesse e a aprendizagem dos alunos?',
    categories: ['educacao'],
    scales: ['escola'],
    tags: ['#educacao', '#pedagogia', '#aprendizagem', '#inovacao', '#escola'],
    includes: [
      'Formato expositivo passivo das aulas',
      'Rigidez da grade curricular',
      'Pouco uso de tecnologias interativas e metodologias ativas'
    ],
    relatedProblemIds: [1, 3]
  },
  {
    id: 3,
    title: 'Convivência, indisciplina e bullying',
    question: 'O que contribui para conflitos, indisciplina e bullying no ambiente escolar?',
    categories: ['educacao', 'convivencia', 'saude'],
    scales: ['individual', 'escola'],
    tags: ['#educacao', '#convivencia', '#saudeMental', '#juventude', '#individual', '#escola'],
    includes: [
      'Indisciplina em sala de aula',
      'Práticas recorrentes de bullying presencial e virtual',
      'Influências negativas e pressões entre pares'
    ],
    relatedProblemIds: [1, 4]
  },
  {
    id: 4,
    title: 'Violência e segurança no ambiente escolar',
    question: 'Quais fatores contribuem para situações de violência ou insegurança relacionadas à escola?',
    categories: ['educacao', 'mobilidade'],
    scales: ['escola', 'quarteirao', 'bairro'],
    tags: ['#educacao', '#seguranca', '#convivencia', '#escola', '#quarteirao', '#bairro'],
    includes: [
      'Furtos e agressões no entorno do portão escolar',
      'Falta de iluminação e policiamento nos caminhos escolares',
      'Clima de insegurança afetando a frequência dos alunos'
    ],
    relatedProblemIds: [3, 5, 12]
  },
  {
    id: 5,
    title: 'Drogas, dependência e vulnerabilidade',
    question: 'Quais fatores levam ao uso problemático de álcool e outras drogas e dificultam a busca por ajuda?',
    categories: ['saude', 'vulnerabilidade'],
    scales: ['individual', 'escola', 'quarteirao', 'bairro', 'cidade'],
    tags: ['#saude', '#vulnerabilidadeSocial', '#assistenciaSocial', '#seguranca', '#individual', '#escola', '#quarteirao', '#bairro', '#cidade'],
    includes: [
      'Uso precoce de drogas e substâncias',
      'Uso abusivo de álcool entre jovens',
      'Dependência química e sofrimento psíquico',
      'Ponto de oferta/venda de drogas no entorno da escola',
      'Uso de substâncias em espaços públicos do bairro'
    ],
    relatedProblemIds: [4, 6, 13]
  },
  {
    id: 6,
    title: 'Pessoas em situação de rua e acesso à assistência',
    question: 'Quais fatores levam pessoas à situação de rua e dificultam sua saída dessa condição?',
    categories: ['vulnerabilidade', 'saude'],
    scales: ['quarteirao', 'bairro', 'cidade'],
    tags: ['#vulnerabilidadeSocial', '#assistenciaSocial', '#saude', '#desigualdade', '#quarteirao', '#bairro', '#cidade'],
    groupQuestions: [
      'Falta de mecanismos de assistência adequados e humanizados?',
      'Falta de conhecimento sobre os mecanismos de apoio existentes?',
      'Dificuldade de acesso burocrático e geográfico aos serviços?',
      'Impacto da dependência química e ausência de rede de apoio?',
      'Sentimento de desesperança ou desmotivação acumulada?',
      'Estruturas históricas de desigualdade social e desemprego?'
    ],
    importantNote: 'Importante: Não apresentar as pessoas em situação de rua como "o problema"; o verdadeiro problema reside nas condições sociais adversas, vulnerabilidades acumuladas e barreiras no acesso a direitos, assistência digna e oportunidades.',
    relatedProblemIds: [5, 13, 14]
  },
  {
    id: 7,
    title: 'Lixo, terrenos vagos e espaços degradados',
    question: 'Por que determinados espaços acumulam lixo e permanecem degradados?',
    categories: ['meio-ambiente', 'urbanismo'],
    scales: ['quarteirao', 'bairro', 'cidade'],
    tags: ['#meioAmbiente', '#urbanismo', '#saudePublica', '#infraestrutura', '#quarteirao', '#bairro', '#cidade'],
    includes: [
      'Lotes vagos e terrenos abandonados repletos de lixo',
      'Descarte irregular de entulho e resíduos domésticos',
      'Espaços públicos visivelmente degradados',
      'Incêndios, queimadas e fumaça tóxica associados ao acúmulo de lixo'
    ],
    relatedProblemIds: [8, 9, 10]
  },
  {
    id: 8,
    title: 'Córregos, esgoto e saneamento',
    question: 'Quais são as causas dos problemas de saneamento e poluição dos córregos no território?',
    categories: ['meio-ambiente', 'urbanismo'],
    scales: ['bairro', 'cidade'],
    tags: ['#saneamento', '#meioAmbiente', '#saudePublica', '#infraestrutura', '#bairro', '#cidade'],
    includes: [
      'Descarte de lixo e móveis velhos nos leitos dos córregos',
      'Lançamento de esgoto in natura a céu aberto',
      'Deficiências históricas na rede de saneamento básico e drenagem'
    ],
    relatedProblemIds: [7, 9]
  },
  {
    id: 9,
    title: 'Animais abandonados, insetos e saúde urbana',
    question: 'O que contribui para problemas relacionados a animais abandonados, insetos e saúde urbana?',
    categories: ['saude', 'meio-ambiente'],
    scales: ['quarteirao', 'bairro', 'cidade'],
    tags: ['#saudePublica', '#meioAmbiente', '#bemEstarAnimal', '#quarteirao', '#bairro', '#cidade'],
    includes: [
      'Gatos e cães soltos sem supervisão ou castração',
      'Abandono sistemático de animais de estimação',
      'Proliferação de roedores, mosquitos (Aedes) e insetos associados ao lixo'
    ],
    relatedProblemIds: [7, 8]
  },
  {
    id: 10,
    title: 'Imóveis abandonados e espaços urbanos ociosos',
    question: 'Por que existem espaços urbanos abandonados ou subutilizados e como isso afeta o bairro?',
    categories: ['urbanismo'],
    scales: ['quarteirao', 'bairro', 'cidade'],
    tags: ['#urbanismo', '#infraestrutura', '#seguranca', '#espacoPublico', '#quarteirao', '#bairro', '#cidade'],
    includes: [
      'Imóveis privados e públicos abandonados',
      'Construções e obras paralisadas há anos',
      'Construções precárias ou mal executadas',
      'Espaços urbanos ociosos gerando sensação de abandono e risco à segurança'
    ],
    relatedProblemIds: [7, 11]
  },
  {
    id: 11,
    title: 'Falta de parques, arborização e espaços de convivência',
    question: 'Como a falta de áreas verdes e espaços públicos afeta a qualidade de vida no bairro?',
    categories: ['urbanismo', 'meio-ambiente', 'convivencia'],
    scales: ['bairro', 'cidade'],
    tags: ['#urbanismo', '#meioAmbiente', '#lazer', '#qualidadeDeVida', '#juventude', '#bairro', '#cidade'],
    includes: [
      'Escassez de parques, praças e áreas verdes arborizadas',
      'Pouca arborização viária criando ilhas de calor',
      'Ausência de espaços públicos estruturados para convivência, esporte e lazer',
      'Desmatamento e degradação da vegetação nativa no bairro'
    ],
    relatedProblemIds: [10, 15]
  },
  {
    id: 12,
    title: 'Trânsito e comportamento perigoso nas ruas',
    question: 'O que contribui para comportamentos perigosos no trânsito e para a insegurança nas ruas?',
    categories: ['mobilidade', 'convivencia'],
    scales: ['quarteirao', 'bairro', 'cidade'],
    tags: ['#mobilidade', '#transito', '#segurancaViaria', '#convivencia', '#quarteirao', '#bairro', '#cidade'],
    includes: [
      'Trânsito caótico e desorganizado em horários de pico',
      'Excesso de velocidade e condução perigosa de motocicletas e veículos',
      'Falta de travessias seguras e calçadas acessíveis para pedestres'
    ],
    relatedProblemIds: [4, 15]
  },
  {
    id: 13,
    title: 'Acesso a serviços públicos próximos',
    question: 'Os serviços de que as pessoas precisam estão próximos e acessíveis para quem vive no território?',
    categories: ['servicos-publicos'],
    scales: ['bairro', 'cidade'],
    tags: ['#servicosPublicos', '#saude', '#educacao', '#assistenciaSocial', '#acesso', '#bairro', '#cidade'],
    includes: [
      'Dificuldade de acesso a atendimento médico e postos de saúde básicos',
      'Demora e barreiras no acesso a atendimento de urgência/emergência',
      'Falta de vagas em creches e escolas perto de casa',
      'Desproporção e alta concentração de equipamentos públicos em regiões centrais'
    ],
    hypotheses: [
      'Hipótese do Grupo: A centralização excessiva dos equipamentos públicos faz parte da raiz do problema. A #descentralizacao surge como uma possível direção de solução e hipótese de transformação territorial.'
    ],
    relatedProblemIds: [5, 6, 14]
  },
  {
    id: 14,
    title: 'Comércio, serviços e oportunidades no bairro',
    question: 'Como a falta de comércio, serviços e oportunidades locais afeta a vida cotidiana dos moradores?',
    categories: ['economia'],
    scales: ['bairro', 'cidade'],
    tags: ['#economiaLocal', '#bairro', '#servicos', '#oportunidades', '#acesso', '#bairro', '#cidade'],
    includes: [
      'Escassez de comércio local diversificado',
      'Obrigação de longos deslocamentos para comprar produtos ou acessar serviços básicos',
      'Baixa oferta de empregos, estágios e oportunidades econômicas dentro do próprio território'
    ],
    relatedProblemIds: [13, 11]
  },
  {
    id: 15,
    title: 'Poluição sonora e convivência',
    question: 'Como o excesso de ruído afeta a convivência e a qualidade de vida no bairro?',
    categories: ['convivencia'],
    scales: ['quarteirao', 'bairro'],
    tags: ['#convivencia', '#ruido', '#qualidadeDeVida', '#quarteirao', '#bairro'],
    includes: [
      'Som alto e barulho excessivo em horários de descanso',
      'Conflitos entre vizinhos relacionados ao uso compartilhado dos espaços públicos',
      'Impactos do estresse sonoro no sono e na saúde mental dos moradores'
    ],
    relatedProblemIds: [11, 12]
  }
];
