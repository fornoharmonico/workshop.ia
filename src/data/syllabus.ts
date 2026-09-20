import { Activity, Encounter, FAQItem, MethodTool } from '../types/workshop';

/**
 * EMENTA OFICIAL V2.2 — FORNOLOGIA AUTORAL
 * Workshop Inteligência Artificial Aplicada: do Problema ao Protótipo
 * 
 * Fonte de verdade pedagógica, metodológica e conceitual.
 * Baseada na Constituição da Fornologia, no Glossário Autoral e na Matriz Canônica V2.2.
 */

export const WORKSHOP_METADATA = {
  version: "V2.2",
  title: "Workshop Inteligência Artificial Aplicada",
  subtitle: "do Problema ao Protótipo",
  headlineDescription: "Desenvolvimento de soluções para desafios pessoais, estudantis, profissionais, escolares e comunitários",
  format: "workshop prático e imersivo",
  modality: "presencial ou híbrido",
  totalDuration: "12 horas",
  encountersCount: 4,
  encounterDuration: "três horas por encontro (180 minutos cada)",
  canonicalTriadsCount: 12,
  canonicalPromptsCount: 12,
  canonicalArtifactsCount: 12,
  masterDocumentName: "Documento Mestre do Projeto",
  targetAudience: "jovens e estudantes de 12 a 17 anos (com consentimento parental)",
  capacity: "até 20 estudantes, organizados em equipes conforme o contexto da turma",
  
  objective: "Capacitar jovens a reconhecer, investigar, planejar, testar e comunicar soluções para problemas pessoais, estudantis, profissionais, escolares ou comunitários, utilizando Inteligência Artificial Generativa de maneira criativa, crítica, ética, consciente e responsável.",
  
  justificationText: `A Inteligência Artificial Generativa já faz parte da vida cotidiana de jovens e adultos. Ela pode organizar informações, produzir textos e imagens, comparar possibilidades, apoiar pesquisas, estruturar projetos e acelerar a criação. O acesso à tecnologia, entretanto, não garante uma utilização consciente ou produtiva.

Uma resposta bem escrita pode conter informação falsa. Uma recomendação aparentemente segura pode ignorar contexto. Um estudante pode utilizar a IA para ampliar seu pensamento ou apenas para evitar o esforço de pensar.

Por isso, a formação não deve se limitar a ensinar comandos ou apresentar ferramentas. É necessário desenvolver capacidades como:
● formular boas perguntas;
● compreender problemas antes de buscar respostas;
● distinguir observações, hipóteses e dúvidas;
● reconhecer quando não sabemos algo;
● verificar informações quando necessário;
● proteger dados pessoais;
● revisar e questionar outputs da IA;
● assumir responsabilidade pelas decisões;
● reconhecer recursos disponíveis e lacunas;
● planejar a realização de uma solução;
● testar ideias no mundo real;
● aprender com evidências;
● planejar próximos passos;
● comunicar projetos com clareza.

A proposta apresenta a IA como parceira cognitiva: uma tecnologia que pode ajudar a perguntar, investigar, organizar, comparar, criar, revisar e planejar, sem substituir a agência humana.`,

  cognitivePartnerText: `A proposta deste workshop é apresentar a IA como uma parceira cognitiva, isto é, como um recurso que pode ajudar o estudante a planejar seu futuro, organizar seu presente, validar ideias, enxergar outras perspectivas, investigar possibilidades, revisar produções e construir soluções. A proposta também busca criar condições para que os estudantes não sejam apenas consumidores de tecnologia, mas usuários críticos, criadores responsáveis e participantes ativos das transformações sociais e profissionais. Conduzimos os participantes por uma jornada que vai desde o diagnóstico de desafios individuais e coletivos até a prototipação, teste no mundo real e comunicação da solução.`,

  methodologyOverview: `A oficina é uma aplicação da Fornologia, metodologia autoral de investigação, criação, planejamento e desenvolvimento de projetos que articula inteligência humana, inteligência coletiva e, quando pertinente, Inteligência Artificial como parceira cognitiva.

A Fornologia opera por dois princípios centrais:
● Primazia da Pergunta: primeiro fazer a pergunta que permite ao participante pensar e decidir; somente depois, quando útil, oferecer sugestões.
● Metabolização Socrática: transformar estruturas conceituais complexas em perguntas simples, progressivas e contextualizadas. O sistema conhece a forma; o participante fornece o conteúdo.

O objetivo não é ensinar uma coleção de frameworks. É conduzir uma experiência única em que as respostas construídas ao longo da jornada se acumulam em artefatos e, juntas, formam o Documento Mestre do Projeto.

A diretriz pedagógica é: experienciar primeiro; explicar somente o que ajudar a agir melhor. A complexidade metodológica permanece nos bastidores (no repertório do facilitador, nos prompts e no sistema). Para o participante, a experiência é simples, conversacional e orientada à ação.`,

  corePrinciples: [
    {
      name: "Primazia da pergunta",
      description: "A jornada pergunta antes de responder. O agente não antecipa decisões que o participante pode construir."
    },
    {
      name: "Metabolização Socrática",
      description: "Conceitos complexos tornam-se perguntas simples, progressivas e contextualizadas."
    },
    {
      name: "Forma no sistema; conteúdo humano",
      description: "A Fornologia oferece a estrutura e os critérios; a equipe fornece o conteúdo, a visão e as escolhas."
    },
    {
      name: "Problema antes da solução",
      description: "Investigar a fundo as causas e evidências antes de correr para prototipar soluções."
    },
    {
      name: "Agência humana",
      description: "A IA recomenda, compara e provoca; a equipe humana decide com soberania e responsabilidade."
    },
    {
      name: "Hipótese não é fato",
      description: "O sistema preserva a incerteza. Nenhuma afirmação plausível substitui a comprovação real."
    },
    {
      name: "“Não sei” é válido",
      description: "Lacunas não devem ser preenchidas com invenções; tornam-se pesquisa, observação, pergunta ou teste."
    },
    {
      name: "Revisão crítica",
      description: "Outputs da IA não são automaticamente verdadeiros nem finais. Toda entrega passa por crítica humana."
    },
    {
      name: "Experiência antes de teoria extensa",
      description: "O participante aprende principalmente fazendo, experimentando e interagindo com a realidade."
    },
    {
      name: "Problemas reais",
      description: "Sempre que possível, trabalhar sobre desafios autênticos da vida dos jovens, da escola ou da comunidade."
    },
    {
      name: "Evidência antes de validação",
      description: "Teste não realizado não pode ser tratado como validação. O sistema marca explicitamente quando não há evidência externa."
    },
    {
      name: "Progressão flexível",
      description: "A jornada tem ordem lógica, mas não vínculo computacional rígido com os encontros. Equipes avançam em ritmos próprios."
    },
    {
      name: "Menos burocracia, mais pensamento",
      description: "Eliminação de taxonomias sobrepostas. Técnicas relacionadas vivem integradas em 12 movimentos canônicos."
    },
    {
      name: "Autoria terminológica",
      description: "A experiência ativa utiliza exclusivamente a linguagem própria da Fornologia, sem jargões externos."
    },
    {
      name: "Rigor invisível",
      description: "O sistema organiza informação completa e detalhada sem exigir o preenchimento de formulários pesados."
    },
    {
      name: "Continuidade de contexto",
      description: "Não perguntar novamente aquilo que a jornada já consolidou. O sistema injeta o contexto autoritativo necessário."
    }
  ],

  expectedResults: [
    "Utilizar IA de maneira criativa, crítica, ética, consciente e responsável;",
    "Reconhecer quando a IA deve perguntar, organizar, criar ou revisar em vez de decidir, assumindo integral responsabilidade pelas escolhas;",
    "Formular perguntas melhores e oferecer contexto útil;",
    "Distinguir observação, hipótese e dúvida;",
    "Investigar causas sem confundir plausibilidade com evidência;",
    "Mapear recursos tangíveis, intangíveis, monetários e não monetários nas dimensões cultural, social, ambiental e financeira;",
    "Definir propósito e direção para uma solução;",
    "Estruturar e revisar criticamente um briefing;",
    "Diferenciar requisitos essenciais e desejáveis;",
    "Definir e materializar um MVP testável;",
    "Organizar quando, o que acontece, onde, quem participa, objetivo, essenciais, expectativas, melhorias, organização, prioridades e riscos de uma realização;",
    "Planejar e realizar testes sem induzir respostas;",
    "Analisar evidências sem inventar consenso;",
    "Propor melhorias fundamentadas para a evolução de V0 para V1;",
    "Pensar a sustentabilidade em múltiplas dimensões e arranjos de continuidade;",
    "Organizar prioridades no tempo (Agora, Depois, Futuramente) e linha do tempo em 7 etapas;",
    "Comunicar problema, solução, testes, aprendizados e próximos passos com clareza e honestidade;",
    "Trabalhar em equipe com colaboração ativa, protagonismo comunitário e consolidação soberana do Documento Mestre do Projeto."
  ],

  facilitator: {
    name: "Pedro Lago",
    role: "Criador da Fornologia & Facilitador do Workshop",
    bio: "Pedro Lago é criador da Fornologia e fundador d'O Forno, escola de planejamento e gestão de projetos. Graduado em Comunicação Social pela Universidade Federal de São João del-Rei (UFSJ). Poeta, músico, compositor e gestor cultural com mais de uma década de atuação, já idealizou, viabilizou e realizou dezenas de projetos artísticos, educacionais e comunitários com a ajuda da Fornologia: metodologia autoral de investigação, planejamento e criação orientada por perguntas, autonomia e agência humana.",
    fornoUrl: "https://ofornoapp.netlify.app/",
    email: "fornoharmonico@gmail.com",
    phone: "+55 32 99834-4329",
    whatsappUrl: "https://wa.me/5532998344329"
  }
};

/**
 * 12 ENTREGAS CANÔNICAS (AF01 A AF12) + DOCUMENTO MESTRE
 */
export const EXPECTED_DELIVERABLES = [
  {
    encounterId: 1,
    title: "Encontro 1 — INVESTIGAR E DIRECIONAR",
    subtitle: "Cronograma flexível recomendado: Movimentos A01 a A04",
    deliverables: [
      "AF01: Mapa de Problemas + Problema Escolhido",
      "AF02: Diagnóstico do Problema",
      "AF03: Mapa de Recursos",
      "AF04: Propósito e Direção"
    ]
  },
  {
    encounterId: 2,
    title: "Encontro 2 — DEFINIR E MATERIALIZAR",
    subtitle: "Cronograma flexível recomendado: Movimentos A05 a A08",
    deliverables: [
      "AF05: Briefing V0 (Primeira formulação estruturada da proposta)",
      "AF06: Briefing V1 (Versão autoritativa revisada criticamente com decisões humanas)",
      "AF07: Especificação de Funcionamento / PRD (Essencial agora vs. Desejável depois)",
      "AF08: MVP + Protótipo V0 (com Plano de Realização completo integrado)"
    ]
  },
  {
    encounterId: 3,
    title: "Encontro 3 — TESTAR, APRENDER E PLANEJAR",
    subtitle: "Cronograma flexível recomendado: Movimentos A09 a A11",
    deliverables: [
      "AF09: Testes, Aprendizados e Plano de Evolução V0→V1 (com status de evidências reais)",
      "AF10: Modelo de Sustentabilidade (Viabilidade, valor gerado e arranjos de continuidade)",
      "AF11: Roadmap + Linha do Tempo em 7 Etapas (Priorização temporal e marcos de evolução)"
    ]
  },
  {
    encounterId: 4,
    title: "Encontro 4 — COMUNICAR E CELEBRAR",
    subtitle: "Cronograma flexível recomendado: Movimento A12",
    deliverables: [
      "AF12: Kit de Comunicação Final (Pitch V1 + Roteiro Visual de até 6 telas + Roteiro de Ensaio/Simulação)",
      "Documento Mestre do Projeto: Projeção consolidada e unificada da autoria da equipe",
      "Apresentação Final e Celebração Coletiva da Aprendizagem"
    ]
  }
];

/**
 * AS 12 FERRAMENTAS / MOVIMENTOS DA FORNOLOGIA V2.2
 * Cada movimento possui uma pergunta socrática orientadora, respeitando a Primazia da Pergunta.
 */
export const METHOD_TOOLS: MethodTool[] = [
  {
    id: "escolha-problema",
    name: "Escolher o Problema",
    orientingQuestion: "O que está acontecendo e o que queremos enfrentar?",
    description: "Inventário de desafios observados na vida pessoal, escolar e comunitária, agrupamento e escolha humana consciente do foco.",
    iconName: "Search",
    category: "Investigação"
  },
  {
    id: "diagnostico",
    name: "Diagnóstico do Problema",
    orientingQuestion: "O que observamos, o que supomos e quais são as causas possíveis?",
    description: "Separação rigorosa entre observações diretas, hipóteses e dúvidas, e aprofundamento investigativo de causas plausíveis.",
    iconName: "Search",
    category: "Investigação"
  },
  {
    id: "mapa-recursos",
    name: "Mapa de Recursos",
    orientingQuestion: "Quais recursos temos, precisamos e podemos mobilizar nas 4 dimensões?",
    description: "Mapeamento nas dimensões cultural, social, ambiental e financeira, identificando o que já existe, o que podemos mobilizar e as lacunas.",
    iconName: "Compass",
    category: "Sistêmica"
  },
  {
    id: "proposito-direcao",
    name: "Propósito e Direção",
    orientingQuestion: "Que transformação queremos provocar e qual caminho escolhemos?",
    description: "Definição do propósito inegociável, princípios éticos de ação e escolha consciente da direção de solução pela equipe.",
    iconName: "Target",
    category: "Propósito"
  },
  {
    id: "briefing-v0",
    name: "Briefing V0",
    orientingQuestion: "Como organizamos a primeira visão do projeto sem inventar fatos?",
    description: "Consolidação inicial que amarra problema, recursos, público e direção em um documento coeso sem dados forjados.",
    iconName: "FileText",
    category: "Estruturação"
  },
  {
    id: "briefing-v1",
    name: "Revisão Crítica do Briefing (V1)",
    orientingQuestion: "O que a crítica aponta e quais decisões assumimos conscientemente?",
    description: "Submissão do rascunho à crítica da IA e de pares, devolvendo a soberania de decisão à equipe para consolidar o Briefing V1.",
    iconName: "ShieldCheck",
    category: "Revisão"
  },
  {
    id: "especificacao-prd",
    name: "Especificação de Funcionamento",
    orientingQuestion: "Como a solução precisa funcionar e o que é essencial vs. desejável?",
    description: "Detalhamento da experiência e dos critérios de funcionamento da solução, protegendo o escopo essencial.",
    iconName: "Cpu",
    category: "Especificação"
  },
  {
    id: "mvp-prototipo",
    name: "MVP + Protótipo V0",
    orientingQuestion: "Qual é a menor versão testável e como realizá-la com qualidade?",
    description: "Recorte da hipótese principal e Plano de Realização invisível (quando, onde, quem, o que acontece) para materializar o V0.",
    iconName: "Layers",
    category: "Materialização"
  },
  {
    id: "testes-aprendizados",
    name: "Testes, Aprendizados e Evolução",
    orientingQuestion: "O que aprendemos com evidências reais e o que manter, corrigir ou melhorar?",
    description: "Planejamento e acolhimento de evidências do mundo real para orientar a evolução fundamentada do protótipo V0 para V1.",
    iconName: "FlaskConical",
    category: "Aprendizagem"
  },
  {
    id: "sustentabilidade",
    name: "Modelo de Sustentabilidade",
    orientingQuestion: "Como a solução gera valor e se sustenta no tempo?",
    description: "Estruturação de nove componentes autorais examinando público, valor, acesso, atividades, parceiros, esforços e continuidade.",
    iconName: "BrainCircuit",
    category: "Sustentabilidade"
  },
  {
    id: "roadmap-linha-tempo",
    name: "Roadmap + Linha do Tempo em 7 Etapas",
    orientingQuestion: "O que faremos agora, depois e futuramente em uma sequência de 7 tempos?",
    description: "Organização temporal de prioridades (Agora, Depois, Futuramente) e desdobramento da jornada em 7 etapas coordenadas.",
    iconName: "Calendar",
    category: "Planejamento"
  },
  {
    id: "comunicacao-final",
    name: "Kit de Comunicação Final",
    orientingQuestion: "Como comunicar a verdade da nossa trajetória em um pitch de 3 minutos?",
    description: "Construção e refinamento do Pitch V1, roteiro visual de até 6 telas e roteiro de ensaio/simulação para a banca.",
    iconName: "Presentation",
    category: "Comunicação"
  }
];

/**
 * 4 ENCONTROS PEDAGÓGICOS — CRONOGRAMA RECOMENDADO E FLEXÍVEL (12 HORAS TOTAIS)
 * 
 * ATENÇÃO METODOLÓGICA (Constituição V2.2):
 * A distribuição abaixo é uma referência de facilitação pedagógica, não um vínculo rígido.
 * As 12 atividades canônicas não são computacionalmente atreladas aos encontros.
 * Equipes avançam em seus próprios ritmos.
 */
export const ENCOUNTERS: Encounter[] = [
  {
    id: 1,
    title: "Encontro 1 — INVESTIGAR E DIRECIONAR",
    subtitle: "Da Escolha do Problema à Definição de Propósito e Direção",
    objective: "Criar vínculo, compreender a relação dos participantes com IA, levantar e escolher problemas reais, investigar causas, reconhecer recursos disponíveis e necessários nas 4 dimensões e definir uma direção clara.",
    totalDurationMinutes: 180,
    deliverable: "AF01 (Mapa de Problemas), AF02 (Diagnóstico), AF03 (Mapa de Recursos) e AF04 (Propósito e Direção)",
    mainDeliverables: [
      "AF01 — Mapa de Problemas + Problema Escolhido",
      "AF02 — Diagnóstico do Problema",
      "AF03 — Mapa de Recursos",
      "AF04 — Propósito e Direção"
    ],
    expectedProgress: "Avanço esperado, mas não obrigatório: concluir os quatro primeiros movimentos da jornada (A01 a A04).",
    homeworkMission: "Missão opcional entre encontros: observar o problema no cotidiano e ouvir espontaneamente 1 ou 2 pessoas afetadas.",
    suggestedActivities: ['A01', 'A02', 'A03', 'A04'],
    suggestedExperience: [
      "Acolhimento, apresentação, acordos e diagnóstico de familiaridade com IA;",
      "Mapeamento íntimo opcional e privado;",
      "Mapeamento coletivo e escolha humana do problema;",
      "Diagnóstico do problema com investigação de observações, hipóteses, dúvidas e causas;",
      "Mapa de recursos disponíveis versus necessários nas dimensões cultural, social, ambiental e financeira;",
      "Definição de propósito e direção de solução;",
      "Síntese e alinhamento para continuidade."
    ],
    activities: [
      {
        id: 'A01',
        code: 'A01',
        order: 1,
        title: 'Escolher o problema',
        durationMinutes: 40,
        description: 'Transformar observações individuais e coletivas em um mapa simples de desafios e registrar a escolha humana do problema a investigar.',
        category: 'Investigação',
        promptId: 'P01',
        artifactFamilyId: 'AF01',
        whatIsIt: 'Mapeamento de desafios reais e escolha consciente da equipe sobre qual problema investigar.',
        whyDoIt: 'Garantir que o projeto nasça de um incômodo autêntico e de relevância humana, sem soluções pré-fabricadas.',
        howToApply: [
          'Instrua a turma a observar desafios na vida pessoal, escola, quarteirão ou comunidade.',
          'Permita o registro livre de problemas percebidos.',
          'Ajude a agrupar temas próximos e conduza a escolha coletiva com justificativa humana.'
        ],
        socraticQuestions: [
          'Quais situações cotidianas geram incômodo ou frustração recorrente?',
          'Por que este problema específico mobiliza a equipe a agir?'
        ],
        checklist: [
          'Inventário de problemas elaborado',
          'Problema escolhido registrado com justificativa da equipe'
        ]
      },
      {
        id: 'A02',
        code: 'A02',
        order: 2,
        title: 'Entender melhor o problema',
        durationMinutes: 45,
        description: 'Diagnosticar o problema separando observações de hipóteses e dúvidas, aprofundando causas plausíveis sem saltar prematuramente para soluções.',
        category: 'Investigação',
        promptId: 'P02',
        artifactFamilyId: 'AF02',
        whatIsIt: 'Diagnóstico estruturado que enquadra o problema e investiga causas possíveis com critério de parada.',
        whyDoIt: 'Evitar o erro de criar soluções precipitadas para sintomas superficiais sem compreender a raiz do desafio.',
        howToApply: [
          'Enquadre o que acontece, quem é afetado e as consequências observáveis.',
          'Separe o que é fato observado, o que é suposição e o que não sabemos.',
          'Aprofunde perguntas de "por que isso acontece?" até o ganho informacional se esgotar.'
        ],
        socraticQuestions: [
          'Isso que listamos é algo que observamos concretamente ou uma explicação que supomos?',
          'O que ainda precisaríamos descobrir para ter certeza?'
        ],
        checklist: [
          'Observações, hipóteses e dúvidas separadas',
          'Causas possíveis investigadas com validação da equipe'
        ]
      },
      {
        id: 'A03',
        code: 'A03',
        order: 3,
        title: 'O que temos e o que precisamos',
        durationMinutes: 30,
        description: 'Mapear recursos disponíveis versus necessários nas dimensões cultural, social, ambiental e financeira, reconhecendo potenciais e lacunas.',
        category: 'Sistêmica',
        promptId: 'P03',
        artifactFamilyId: 'AF03',
        whatIsIt: 'Mapa comparativo de recursos (Temos, Precisamos, Podemos mobilizar e Precisamos investigar).',
        whyDoIt: 'Superar a crença de que projetos só dependem de dinheiro, revelando a força dos saberes, redes e espaços locais.',
        howToApply: [
          'Explore saberes e competências da equipe (Cultural).',
          'Mapeie pessoas, redes e parceiros mobilizáveis (Social).',
          'Mapeie espaços, ferramentas e tecnologias disponíveis (Ambiental).',
          'Identifique custos prováveis e arranjos não monetários de suporte (Financeira).'
        ],
        socraticQuestions: [
          'Que conhecimentos ou habilidades vocês já têm que podem ajudar?',
          'Que pessoas, parcerias ou espaços locais já estão acessíveis?'
        ],
        checklist: [
          '4 dimensões mapeadas com Temos / Precisamos / Podemos mobilizar',
          'Maiores forças e lacunas identificadas'
        ]
      },
      {
        id: 'A04',
        code: 'A04',
        order: 4,
        title: 'Que transformação queremos provocar?',
        durationMinutes: 25,
        description: 'Definir propósito e direção: fazer a passagem do entendimento do problema e recursos para uma direção de solução escolhida pela equipe.',
        category: 'Propósito',
        promptId: 'P04',
        artifactFamilyId: 'AF04',
        whatIsIt: 'Definição da transformação desejada, princípios de ação e direção de solução.',
        whyDoIt: 'Garantir que a equipe saiba por que está agindo antes de escolher formatos tecnológicos específicos.',
        howToApply: [
          'Discuta a transformação concreta que a equipe quer provocar.',
          'Pactue princípios inegociáveis de ação.',
          'Escolha conscientemente a direção da intervenção.'
        ],
        socraticQuestions: [
          'Se nosso projeto der certo, o que muda na vida das pessoas afetadas?',
          'Quais princípios éticos guiam nossa atuação?'
        ],
        checklist: [
          'Transformação desejada formulada',
          'Direção da solução escolhida e aprovada pela equipe'
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Encontro 2 — DEFINIR E MATERIALIZAR",
    subtitle: "Da Estruturação do Briefing ao MVP e Protótipo V0",
    objective: "Transformar a investigação em uma proposta estruturada (Briefing V0 e V1), definir a especificação de funcionamento, recortar a menor versão testável (MVP com Plano de Realização) e materializar o Protótipo V0.",
    totalDurationMinutes: 180,
    deliverable: "AF05 (Briefing V0), AF06 (Briefing V1), AF07 (Especificação / PRD) e AF08 (MVP + Protótipo V0)",
    mainDeliverables: [
      "AF05 — Briefing V0",
      "AF06 — Briefing V1 (Versão autoritativa revisada)",
      "AF07 — Especificação de Funcionamento / PRD",
      "AF08 — MVP + Protótipo V0 (com Plano de Realização)"
    ],
    expectedProgress: "Avanço esperado, mas não obrigatório: chegar ao Protótipo V0 (A05 a A08) e, se houver tempo, iniciar planejamento de testes.",
    homeworkMission: "Missão entre encontros: realizar testes reais com pessoas do público-alvo (sem inventar evidências).",
    suggestedActivities: ['A05', 'A06', 'A07', 'A08'],
    suggestedExperience: [
      "Retrospectiva breve;",
      "Construção do primeiro briefing (Briefing V0);",
      "Revisão crítica e consolidação da versão revisada (Briefing V1);",
      "Definição de como a solução precisa funcionar;",
      "Definição da hipótese principal e recorte do MVP;",
      "Planejamento completo da realização do MVP por perguntas simples;",
      "Materialização do Protótipo V0;",
      "Início da preparação para o teste no mundo real."
    ],
    activities: [
      {
        id: 'A05',
        code: 'A05',
        order: 5,
        title: 'Organizar a primeira versão do projeto',
        durationMinutes: 25,
        description: 'Consolidar problema, recursos, público, propósito e direção em um primeiro rascunho estruturado (Briefing V0), sem inventar informação nova.',
        category: 'Estruturação',
        promptId: 'P05',
        artifactFamilyId: 'AF05',
        whatIsIt: 'Primeiro briefing organizado da proposta.',
        whyDoIt: 'Sintetizar as investigações em uma visão coesa antes da revisão crítica.',
        howToApply: [
          'Injete os dados dos artefatos AF01 a AF04.',
          'Organize o rascunho sem inventar novos fatos.',
          'Valide com a equipe se a síntese representa sua visão.'
        ],
        socraticQuestions: [
          'Se alguém ler este rascunho, entenderá com clareza o problema e a direção da solução?'
        ],
        checklist: [
          'Briefing V0 consolidado na família AF05'
        ]
      },
      {
        id: 'A06',
        code: 'A06',
        order: 6,
        title: 'Revisar e melhorar o projeto',
        durationMinutes: 30,
        description: 'Submeter o Briefing V0 a crítica da IA e de pares, devolver decisões à equipe e consolidar o Briefing V1 com mudanças conscientemente aprovadas.',
        category: 'Revisão',
        promptId: 'P06',
        artifactFamilyId: 'AF06',
        whatIsIt: 'Revisão crítica e consolidação da versão autoritativa do briefing.',
        whyDoIt: 'Exercitar a agência humana, o pacto de revisão e a soberania das decisões da equipe.',
        howToApply: [
          'Solicite pontos fortes, fragilidades e perguntas provocativas da IA.',
          'Pactue o que a equipe aceita, rejeita ou quer modificar.',
          'Gere o Briefing V1 refletindo apenas as decisões aprovadas.'
        ],
        socraticQuestions: [
          'Quais críticas apontadas pela IA ou pelos colegas fazem sentido incorporar?',
          'O que a equipe decide manter deliberadamente com base em seus princípios?'
        ],
        checklist: [
          'Crítica analisada conscientemente',
          'Briefing V1 consolidado como versão autoritativa'
        ]
      },
      {
        id: 'A07',
        code: 'A07',
        order: 7,
        title: 'Como a solução precisa funcionar?',
        durationMinutes: 30,
        description: 'Transformar o Briefing V1 em requisitos claros, distinguindo o essencial agora do desejável depois, sem jargões desnecessários.',
        category: 'Especificação',
        promptId: 'P07',
        artifactFamilyId: 'AF07',
        whatIsIt: 'Especificação simples do funcionamento da solução (PRD).',
        whyDoIt: 'Alinhar o funcionamento prático da proposta antes de investir tempo na construção.',
        howToApply: [
          'Defina o que o usuário precisa conseguir fazer ou experimentar.',
          'Separe o que é indispensável agora do que pode esperar.',
          'Registre limitações e critérios básicos de funcionamento.'
        ],
        socraticQuestions: [
          'Sem o quê a experiência da solução simplesmente não acontece?',
          'O que podemos deixar deliberadamente para depois sem prejudicar o objetivo?'
        ],
        checklist: [
          'Essencial vs. desejável discriminado',
          'Artefato AF07 validado pela equipe'
        ]
      },
      {
        id: 'A08',
        code: 'A08',
        order: 8,
        title: 'Construir a menor versão que podemos testar',
        durationMinutes: 55,
        description: 'Definir a hipótese principal, recortar o MVP, estruturar o Plano de Realização completo (quando, o que acontece, onde, quem) e materializar o Protótipo V0.',
        category: 'Materialização',
        promptId: 'P08',
        artifactFamilyId: 'AF08',
        whatIsIt: 'Definição do MVP, Plano de Realização e materialização do Protótipo V0.',
        whyDoIt: 'Tirar a ideia do papel com o menor esforço necessário para aprender com o mundo real.',
        howToApply: [
          'Formule a hipótese central que precisa ser testada.',
          'Preencha o Plano de Realização através de perguntas simples.',
          'Materialize o Protótipo V0 no formato mais adequado (digital, físico, serviço ou experiência).'
        ],
        socraticQuestions: [
          'Qual é a coisa mais importante que precisamos aprender com este protótipo?',
          'Como alguém do público pode experimentar esta versão em poucos minutos?'
        ],
        checklist: [
          'Hipótese de teste definida',
          'Plano de Realização completo estruturado',
          'Protótipo V0 materializado e acessível'
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Encontro 3 — TESTAR, APRENDER E PLANEJAR",
    subtitle: "Das Evidências do Mundo Real ao Modelo de Sustentabilidade e Roadmap",
    objective: "Acolher e analisar evidências de testes no mundo real (ou marcar honestamente como não validado), estruturar o modelo de sustentabilidade e priorizar próximos passos com o Roadmap e a Linha do Tempo em 7 Etapas.",
    totalDurationMinutes: 180,
    deliverable: "AF09 (Testes e Aprendizados), AF10 (Sustentabilidade) e AF11 (Roadmap + 7 Etapas)",
    mainDeliverables: [
      "AF09 — Testes, Aprendizados e Plano de Evolução V0→V1",
      "AF10 — Modelo de Sustentabilidade",
      "AF11 — Roadmap + Linha do Tempo em 7 Etapas"
    ],
    expectedProgress: "Avanço esperado, mas não obrigatório: consolidar aprendizados empíricos, estruturar sustentabilidade e planejar sequência temporal (A09 a A11).",
    homeworkMission: "Missão entre encontros: ensaiar a fala da apresentação final de 3 minutos.",
    suggestedActivities: ['A09', 'A10', 'A11'],
    suggestedExperience: [
      "Recuperar o plano de teste ou registrar evidências de campo;",
      "Analisar o que funcionou, dificuldades, padrões e contradições;",
      "Decidir o que manter, corrigir, melhorar ou simplificar na evolução V0→V1;",
      "Construir o modelo de sustentabilidade da solução em múltiplas dimensões;",
      "Criar Roadmap (Agora, Depois, Futuramente) e Linha do Tempo em 7 Etapas;",
      "Se houver tempo, realizar ajustes prioritários no protótipo."
    ],
    activities: [
      {
        id: 'A09',
        code: 'A09',
        order: 9,
        title: 'Testar, aprender e decidir o que melhorar',
        durationMinutes: 50,
        description: 'Planejar testes, colher evidências reais (ou registrar ausência de teste), analisar aprendizados sem inventar validação e definir evolução V0→V1.',
        category: 'Aprendizagem',
        promptId: 'P09',
        artifactFamilyId: 'AF09',
        whatIsIt: 'Ciclo completo de teste, aprendizado por evidências e plano de melhorias V0→V1.',
        whyDoIt: 'Garantir que a evolução do projeto seja guiada por fatos reais observados, e não por especulações.',
        howToApply: [
          'Se houver evidências de teste externo, organize o que funcionou, dificuldades e falas.',
          'Se não houve teste real, marque explicitamente: STATUS: SEM EVIDÊNCIA EXTERNA / NÃO VALIDADO.',
          'Classifique o estado da hipótese e defina 3 a 5 prioridades de evolução V0→V1.'
        ],
        socraticQuestions: [
          'O que as pessoas realmente fizeram ou disseram ao experimentar o protótipo?',
          'Quais surpresas nos obrigam a repensar aspectos da solução?'
        ],
        checklist: [
          'Status de validação registrado com honestidade empírica',
          'Prioridades de evolução de V0 para V1 consolidadas'
        ]
      },
      {
        id: 'A10',
        code: 'A10',
        order: 10,
        title: 'Como essa solução pode se sustentar?',
        durationMinutes: 40,
        description: 'Examinar pessoas atendidas, valor gerado, formas de acesso, atividades, recursos, apoios, custos e formas de sustentação sem presumir lucro comercial obrigatório.',
        category: 'Sustentabilidade',
        promptId: 'P10',
        artifactFamilyId: 'AF10',
        whatIsIt: 'Modelo de sustentabilidade em nove componentes autorais.',
        whyDoIt: 'Planejar como a iniciativa pode continuar existindo no tempo e gerando impacto sustentável.',
        howToApply: [
          'Identifique quem recebe valor e de que forma.',
          'Mapeie custos, esforços e os recursos necessários.',
          'Explore formas plurais de sustentação (apoios institucionais, parcerias, voluntariado, trocas, editais, receita).'
        ],
        socraticQuestions: [
          'Além do dinheiro, que apoios e parcerias garantem a vida longa deste projeto?',
          'Quais são os maiores custos de energia, tempo ou recursos para mantê-lo?'
        ],
        checklist: [
          'Nove componentes de sustentabilidade preenchidos',
          'Principais hipóteses de sustentabilidade a testar identificadas'
        ]
      },
      {
        id: 'A11',
        code: 'A11',
        order: 11,
        title: 'O que fazemos agora, depois e futuramente?',
        durationMinutes: 40,
        description: 'Transformar prioridades, aprendizados e sustentabilidade em um Roadmap (Agora, Depois, Futuramente) e uma Linha do Tempo em 7 Etapas (verbo + substantivo).',
        category: 'Planejamento',
        promptId: 'P11',
        artifactFamilyId: 'AF11',
        whatIsIt: 'Roadmap de prioridades e Linha do Tempo em 7 Etapas.',
        whyDoIt: 'Organizar a evolução do projeto no tempo e ter clareza do que deliberadamente não faremos agora.',
        howToApply: [
          'Separe as melhorias em Agora, Depois, Futuramente e Não faremos agora.',
          'Construa a Linha do Tempo em 7 Etapas nomeadas em formato verbo + substantivo.',
          'Identifique responsáveis e dependências críticas.'
        ],
        socraticQuestions: [
          'Se tivermos que escolher uma única melhoria para implementar imediatamente, qual seria?',
          'Quais são os 7 passos lógicos para o projeto avançar no mundo real?'
        ],
        checklist: [
          'Horizontes de prioridade definidos',
          'Linha do Tempo em 7 Etapas estruturada'
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Encontro 4 — COMUNICAR E CELEBRAR",
    subtitle: "Do Roteiro Oral e Visual à Simulação com Banca e Celebração Coletiva",
    objective: "Construir a narrativa autêntica da jornada, produzir o Pitch V1 autoritativo, roteiro visual de apoio, roteiro de ensaio/simulação, apresentar diante da banca e celebrar a agência e o aprendizado.",
    totalDurationMinutes: 180,
    deliverable: "AF12 (Kit de Comunicação Final: Pitch V1, Roteiro Visual e Roteiro de Ensaio) e Apresentação Final",
    mainDeliverables: [
      "AF12 — Pitch V1 (Versão oral autoritativa de 3 minutos)",
      "AF12 — Roteiro Visual de Apoio (Até 6 telas)",
      "AF12 — Roteiro de Ensaio/Simulação para Banca",
      "Documento Mestre do Projeto (Visão consolidada da autoria)",
      "Apresentação Final e Celebração"
    ],
    expectedProgress: "Concluir a comunicação final (A12), apresentar publicamente o projeto e celebrar a trajetória vivida.",
    homeworkMission: "Levar a aprendizagem, as perguntas e a agência crítica para a vida, escola e comunidade.",
    suggestedActivities: ['A12'],
    suggestedExperience: [
      "Recuperar a trajetória real do projeto;",
      "Construir o rascunho de pitch (Pitch V0 transitório);",
      "Revisar criticamente e consolidar o Pitch V1 como versão autoritativa;",
      "Organizar o roteiro visual de apoio (até 6 telas);",
      "Preparar roteiro de ensaio/simulação com perguntas prováveis de banca;",
      "Ensaiar presencialmente a apresentação cronometrada de 3 minutos;",
      "Apresentações finais diante de convidados e banca;",
      "Retrospectiva, depoimentos e celebração da autoria humana."
    ],
    activities: [
      {
        id: 'A12',
        code: 'A12',
        order: 12,
        title: 'Preparar a apresentação final',
        durationMinutes: 60,
        description: 'Construir o Pitch V0 transitório, revisar criticamente, consolidar somente o Pitch V1 como versão autoritativa e gerar roteiro visual e roteiro de ensaio/simulação para banca.',
        category: 'Comunicação',
        promptId: 'P12',
        artifactFamilyId: 'AF12',
        whatIsIt: 'Kit de Comunicação Final: Pitch V1, Roteiro Visual e Roteiro de Ensaio/Simulação.',
        whyDoIt: 'Aprender a comunicar a verdade do projeto com clareza, honestidade e impacto em 3 minutos.',
        howToApply: [
          'Conte a história real: problema, pessoas afetadas, descobertas, solução, protótipo, evidências e próximos passos.',
          'Revise criticamente o rascunho e consolide o Pitch V1 (o V0 é descartado do artefato final).',
          'Estruture o roteiro visual de até 6 telas para apoiar a fala.',
          'Prepare a divisão de falas, transições e respostas para até 5 perguntas prováveis de banca.'
        ],
        socraticQuestions: [
          'Nossa narrativa conta a verdade do que foi vivido, sem inventar dados ou certezas?',
          'Quem fala o quê e como demonstramos o protótipo no tempo exato?'
        ],
        checklist: [
          'Pitch V1 consolidado como versão autoritativa',
          'Roteiro visual de até 6 telas estruturado',
          'Roteiro de ensaio e simulação pronto para prática presencial'
        ]
      }
    ]
  }
];

/**
 * FAQ OFICIAL DA EMENTA V2.2
 */
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "O que é a Fornologia V2.2?",
    answer: "A Fornologia é uma metodologia autoral de investigação, criação, planejamento, experimentação, aprendizagem e comunicação de projetos. Ela não oferece respostas prontas; ela faz as perguntas certas, na ordem certa, para que equipes construam suas próprias soluções com autonomia e com apoio da IA como parceira cognitiva."
  },
  {
    question: "Para quem é indicado o workshop?",
    answer: "O workshop é voltado para jovens e estudantes de 12 a 17 anos (Ensino Fundamental II e Ensino Médio), sob autorização parental. É aplicável em escolas, organizações sociais e centros de inovação pedagógica."
  },
  {
    question: "É preciso saber programar ou dominar informática avançada?",
    answer: "Não. Não há pré-requisito de programação. O foco é metodológico, crítico e socrático: aprender a formular boas perguntas, investigar causas-raiz, reconhecer recursos e prototipar com ética e autonomia."
  },
  {
    question: "Quantos encontros e qual é a carga horária?",
    answer: "A carga horária padrão é de 12 horas, distribuídas em 4 encontros práticos de 3 horas (180 minutos cada). Essa divisão de tempo é uma referência de facilitação flexível; as 12 atividades da jornada possuem progressão lógica independente dos encontros."
  },
  {
    question: "Qual é a relação entre atividades, prompts e artefatos na V2.2?",
    answer: "A Fornologia V2.2 possui uma estrutura rigorosa de 12 tríades canônicas: cada atividade canônica (A01 a A12) possui um prompt de condução (P01 a P12) e consolida um artefato correspondente (AF01 a AF12). A visão unificada de todos os artefatos compõe o Documento Mestre do Projeto."
  },
  {
    question: "O que é o Documento Mestre do Projeto?",
    answer: "É uma projeção dinâmica e consolidada de todo o conhecimento construído pela equipe ao longo da jornada (AF01 a AF12). Ele não é uma entidade separada nem armazena versões obsoletas; ele reflete o estado autoritativo mais recente do projeto."
  },
  {
    question: "O que significa 'Metabolização Socrática' e 'Primazia da Pergunta'?",
    answer: "Primazia da Pergunta significa que o sistema sempre pergunta antes de sugerir, estimulando a reflexão humana. Metabolização Socrática é o princípio pelo qual conceitos complexos são traduzidos em perguntas simples e cotidianas: o sistema conhece a estrutura, mas o participante é quem fornece o conteúdo."
  },
  {
    question: "Como o workshop protege os dados dos jovens e cumpre a LGPD?",
    answer: "Em estrita conformidade com o Art. 14 da LGPD, os desafios individuais são privados (armazenados localmente no navegador, sem recolhimento nem envio a servidores). Os estudantes são orientados a jamais inserir dados pessoais ou sensíveis nos prompts de IA."
  },
  {
    question: "O que acontece se a equipe não conseguir testar o protótipo no mundo real?",
    answer: "A Fornologia opera sob o Princípio da Evidência antes da Afirmação: se não houve teste externo, o projeto é registrado de forma honesta e transparente com o status 'SEM EVIDÊNCIA EXTERNA / NÃO VALIDADO'. Nenhuma hipótese é forjada pela IA como se fosse validação."
  },
  {
    question: "Quem é o facilitador do workshop?",
    answer: "Pedro Lago, criador da Fornologia e fundador d'O Forno, escola de planejamento e gestão de projetos."
  }
];

/**
 * CHECKLIST DO PACTO DE REVISÃO CRÍTICA (V2.2)
 */
export const CRITICAL_REVISION_CHECKLIST = [
  {
    id: "rev-1",
    title: "Checagem de Fatos vs. Hipóteses",
    description: "Verifique se suposições, hipóteses ou ideias não foram registradas como verdades comprovadas sem evidência real."
  },
  {
    id: "rev-2",
    title: "Alucinações e Dados Não Verificados",
    description: "Confira referências, números e sugestões da IA para assegurar que nada foi forjado pelo modelo de linguagem."
  },
  {
    id: "rev-3",
    title: "Vieses, Generalizações e Estereótipos",
    description: "Analise criticamente se as formulações não contêm preconceitos ou visões simplistas sobre o problema e as pessoas afetadas."
  },
  {
    id: "rev-4",
    title: "Agência e Voz Autoral da Equipe",
    description: "Garanta que o artefato final represente o que a equipe realmente pensou, decidiu e aceitou, com suas próprias palavras."
  }
];

/**
 * CHECKLIST DE ÉTICA, PRIVACIDADE E PROTEÇÃO DE DADOS (LGPD / V2.2)
 */
export const AI_ETHICS_CHECKLIST = [
  {
    id: "eth-1",
    title: "Proteção Estrita de Dados Pessoais (Art. 14 da LGPD)",
    description: "Nunca digite nomes completos, documentos, endereços, contatos ou informações íntimas nos prompts de Inteligência Artificial."
  },
  {
    id: "eth-2",
    title: "Privacidade do Mapeamento Individual",
    description: "O diagnóstico de desafios íntimos pertence unicamente ao estudante; não é avaliado, recolhido ou compartilhado sem sua autorização."
  },
  {
    id: "eth-3",
    title: "Delegação Consciente e Soberania Decisória",
    description: "A IA pode sugerir, organizar e comparar, mas a decisão final é humana e inegociável."
  },
  {
    id: "eth-4",
    title: "Responsabilidade Social e Comunitária",
    description: "A equipe é integralmente responsável pelo impacto, ética e comunicação das soluções que desenvolve."
  }
];
