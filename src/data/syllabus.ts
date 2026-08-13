import { Encounter, FAQItem, MethodTool, PromptTemplate } from '../types/workshop';

export const WORKSHOP_METADATA = {
  title: "Workshop Inteligência Artificial Aplicada",
  subtitle: "do Problema ao Protótipo",
  headlineDescription: "Desenvolvimento de soluções para desafios pessoais, estudantis, profissionais, escolares e comunitários",
  format: "workshop prático e imersivo",
  modality: "presencial ou híbrido",
  totalDuration: "12 horas",
  encountersCount: 4,
  encounterDuration: "três horas por encontro",
  targetAudience: "jovens e estudantes de 12 a 17 anos",
  capacity: "até 20 estudantes, organizados em até quatro equipes",
  
  objective: "Capacitar os jovens a reconhecer, investigar, planejar e prototipar soluções para problemas pessoais, estudantis, profissionais, escolares ou comunitários, utilizando boas práticas e ferramentas de Inteligência Artificial Generativa de maneira criativa, crítica, ética, consciente e responsável.",
  
  justificationText: `A Inteligência Artificial Generativa está se tornando parte da vida cotidiana de jovens e adultos. Na escola ou no trabalho, ela já é utilizada para organizar informações, produzir textos, criar imagens e vídeos, planejar atividades, simular conversas, comparar possibilidades e apoiar a solução de problemas. O simples acesso a essas ferramentas, entretanto, não garante uma utilização consciente ou produtiva. Uma resposta bem escrita pode conter informações falsas. Uma recomendação aparentemente segura pode ignorar o contexto do usuário. Uma produção visual pode reproduzir estereótipos. Um estudante pode utilizar a IA para ampliar seu pensamento ou apenas para evitar o esforço de pensar. Por isso, a formação dos jovens não deve se limitar a ensinar comandos ou apresentar ferramentas. É necessário desenvolver a capacidade de:
● formular boas perguntas;
● compreender problemas antes de buscar respostas;
● desconfiar de respostas excessivamente simples;
● verificar informações;
● proteger dados pessoais;
● assumir responsabilidade pelas decisões tomadas;
● utilizar a tecnologia para criar valor para si e para outras pessoas.`,

  cognitivePartnerText: `A proposta deste workshop é apresentar a IA como uma parceira cognitiva, isto é, como um recurso que pode ajudar o estudante a planejar seu futuro, organizar seu presente, validar ideias, enxergar outras perspectivas, investigar possibilidades, revisar produções e construir soluções. A proposta também busca criar condições para que os estudantes não sejam apenas consumidores de tecnologia, mas usuários críticos, criadores responsáveis e participantes ativos das transformações sociais e profissionais. Vamos conduzir os participantes por uma jornada que vai desde o diagnóstico de desafios individuais e coletivos até a prototipação de uma solução, fazendo uso consciente e ético da IA, cientes de seus potenciais e limitações.`,

  methodologyOverview: `Este workshop é uma introdução prática e crítica à Inteligência Artificial Generativa. Por meio da Aprendizagem Baseada em Problemas, visa provocar a reflexão sobre o uso consciente da IA na vida pessoal, nos estudos, no trabalho e na vida comunitária. Usaremos a IA como parceira de reflexão e questionadora socrática. Conduziremos os participantes a fazer um mapeamento íntimo de seus desafios individuais. O mapeamento dos desafios individuais será realizado de forma privada e não será recolhido ou avaliado e os participantes não serão obrigados a compartilhar o conteúdo desse mapeamento íntimo. Em seguida, provocaremos a reflexão e o mapeamento dos desafios coletivos da escola, do bairro e da comunidade. Investigaremos suas possíveis causas-raiz. As boas práticas de elaboração de prompts, verificação de informações, proteção de dados, identificação de erros e vieses serão trabalhadas transversalmente ao longo dos quatro encontros, sempre aplicadas às tarefas concretas do projeto. Criaremos, com apoio da IA, os documentos que servirão de base para o desenvolvimento dos projetos e soluções: Briefing, Documento de Requisitos de Produto - PRD, especificação de um Produto Mínimo Viável - MVP e a construção de um protótipo. Após a criação do Protótipo V0, realizaremos testes iniciais com usuários — familiares, amigos e pessoas com perfil semelhante ao público da solução. A partir dos feedbacks coletados, os participantes analisarão criticamente suas propostas, construirão um Business Model Canvas (BMC), planejarão os próximos passos por meio de um roadmap e desenvolverão uma versão aprimorada do protótipo. Finalizaremos a oficina com a apresentação dos projetos em formato de pitch.`,

  expectedResults: [
    "fazer uso consciente da Inteligência Artificial Generativa;",
    "conhecer algumas das boas práticas de engenharia de prompt;",
    "reconhecer situações em que não deve compartilhar seus dados;",
    "analisar, duvidar, questionar e checar as respostas da IA;",
    "revisar e corrigir documentos produzidos pela IA;",
    "identificar problemas, investigar possíveis causas e prototipar soluções;",
    "distinguir observações, hipóteses e dúvidas durante a investigação de um problema;",
    "reconhecer quando é necessário compreender e investigar melhor um problema antes de propor uma solução;",
    "compreender a função de um briefing, de um PRD, de um BMC e de um MVP;",
    "construir um protótipo testável; coletar e organizar feedback;",
    "trabalhar em equipe e apresentar um projeto de maneira clara;",
    "aplicar princípios básicos para planejar, organizar, avaliar e ampliar a viabilidade de projetos;",
    "utilizar a Inteligência Artificial Generativa de maneira criativa, crítica, ética, consciente e responsável."
  ],

  facilitator: {
    name: "Pedro Lago",
    role: "Fundador d'O Forno & Facilitador do Workshop",
    bio: "Pedro Lago é fundador d'O Forno, escola de planejamento e gestão cultural. Graduado em Comunicação Social na Universidade Federal de São João del-Rei. Possui formação avançada em gestão de projetos com o método TEvEP/HomoSapiens e é membro da Academia Lendária desde 2024, onde iniciou seus estudos sobre a Inteligência Artificial e começou a desenvolver seus primeiros agentes, fluxos e sistemas apoiados por IA generativa. Poeta, músico, compositor e gestor cultural com mais de uma década de atuação, já idealizou, viabilizou e realizou dezenas de projetos artísticos, culturais e comunitários com a ajuda da Fornologia: a metodologia de planejamento e gestão de projetos que criou para ajudar pessoas, empresas e organizações a 'tirar seus projetos d'O Forno'. Para saber mais sobre O Forno, acesse: https://ofornoapp.netlify.app/",
    fornoUrl: "https://ofornoapp.netlify.app/",
    email: "emaildopedrolago@gmail.com",
    phone: "32 99834-4329",
    whatsappUrl: "https://wa.me/5532998344329"
  }
};

export const EXPECTED_DELIVERABLES = [
  {
    encounterId: 1,
    title: "Encontro 1 — INVESTIGAR",
    deliverables: [
      "mapa de problemas",
      "Diagnóstico PHD: problemas, hipóteses e dúvidas",
      "Aprofundamento do Diagnóstico: Os Cinco Porquês",
      "Golden Circle: Por que? Como? O que?"
    ]
  },
  {
    encounterId: 2,
    title: "Encontro 2 — DEFINIR E MATERIALIZAR",
    deliverables: [
      "Briefing V0",
      "PRD V0",
      "definição do MVP",
      "Protótipo V0"
    ]
  },
  {
    encounterId: 3,
    title: "Encontro 3 — VALIDAR E EVOLUIR",
    deliverables: [
      "síntese dos feedbacks coletados",
      "BMC",
      "Roadmap",
      "Protótipo V1"
    ]
  },
  {
    encounterId: 4,
    title: "Encontro 4 — COMUNICAR",
    deliverables: [
      "roteiro do pitch",
      "apresentação",
      "pitch final"
    ]
  }
];

export const METHOD_TOOLS: MethodTool[] = [
  {
    id: "phd",
    name: "Exercício PHD",
    orientingQuestion: "Quais são os Problemas, Hipóteses e Dúvidas?",
    description: "Separa de forma crítica o que é problema real, o que achamos que é (hipóteses) e o que precisamos pesquisar (dúvidas).",
    iconName: "BrainCircuit"
  },
  {
    id: "5whys",
    name: "Cinco Porquês",
    orientingQuestion: "Qual é a causa-raiz profunda deste problema?",
    description: "Investiga sucessivamente os motivos de um problema até encontrar a verdadeira causa que precisa ser resolvida.",
    iconName: "Search"
  },
  {
    id: "golden-circle",
    name: "Golden Circle",
    orientingQuestion: "Por que? Como? O que?",
    description: "Define o propósito essencial do projeto antes de pensar em como fazer e no produto final.",
    iconName: "Target"
  },
  {
    id: "briefing",
    name: "Briefing V0",
    orientingQuestion: "Qual problema estamos tentando solucionar?",
    description: "Descreve o problema, contexto, causas-raiz, público e aponta para a possível proposta de solução.",
    iconName: "FileText"
  },
  {
    id: "prd",
    name: "PRD V0 (Req. de Produto)",
    orientingQuestion: "Como a solução deverá funcionar?",
    description: "Especifica o que a solução precisa fazer, funções essenciais (must have) e acessórias (nice to have).",
    iconName: "Cpu"
  },
  {
    id: "mvp",
    name: "MVP (Mínimo Viável)",
    orientingQuestion: "Qual é a menor versão que podemos testar?",
    description: "Define a menor versão da solução que permite testar se a ideia principal funciona.",
    iconName: "Zap"
  },
  {
    id: "bmc",
    name: "BMC (Business Model Canvas)",
    orientingQuestion: "Como garantimos viabilidade e sustentabilidade?",
    description: "Mapeia segmentos atendidos, recursos necessários, parcerias e sustentabilidade da proposta.",
    iconName: "LayoutGrid"
  },
  {
    id: "roadmap",
    name: "Roadmap de Evolução",
    orientingQuestion: "O que faremos primeiro, depois e futuramente?",
    description: "Planeja os próximos passos, correção de bugs, melhorias e criação/simplificação de funcionalidades.",
    iconName: "MapPin"
  },
  {
    id: "pitch",
    name: "Pitch de Apresentação",
    orientingQuestion: "Como comunicar nossa trajetória com clareza?",
    description: "Estrutura o roteiro, apresentação e ensaios do pitch final sobre o problema, solução, uso de IA e testes.",
    iconName: "Presentation"
  }
];

export const ENCOUNTERS: Encounter[] = [
  {
    id: 1,
    title: "Encontro 1 — INVESTIGAR",
    subtitle: "Mapeamento de desafios, diagnóstico de causas-raiz e definição do propósito",
    objective: "Conhecer os participantes, alinhar expectativas, compreender como eles já utilizam a IA, promover um mapeamento dos desafios individuais e coletivos, aprender a definir e diagnosticar o problema (hipóteses e dúvidas) e investigar suas possíveis causas-raiz. Definir o propósito dos projetos/equipes e aprender como transformar os resultados dessa investigação do problema em um briefing da solução.",
    totalDurationMinutes: 180,
    deliverable: "Mapa de problemas; Diagnóstico PHD (problemas, hipóteses e dúvidas); Aprofundamento do Diagnóstico (Os Cinco Porquês); Golden Circle (Por que? Como? O que?).",
    homeworkMission: "Missão de casa e Alinhamento sobre o próximo encontro: observar o problema escolhido na comunidade/escola e conversar informalmente com pessoas afetadas.",
    activities: [
      {
        id: "e1-a1",
        title: "Apresentação e Acordos",
        durationMinutes: 30,
        description: "Apresentação do facilitador e participantes, acordos e alinhamento de expectativas.",
        whatIsIt: "Momento de recepção, quebra-gelo e definição de combinados de convivência e aprendizado.",
        whyDoIt: "Criar um ambiente seguro, colaborativo e com expectativas claras para os 4 encontros.",
        howToApply: [
          "Apresente-se com nome e uma expectativa para a oficina.",
          "Defina os acordos do grupo (escuta ativa, respeito, sigilo das vivências individuais)."
        ],
        socraticQuestions: [
          "O que torna um ambiente de aprendizado seguro para tentarmos coisas novas?",
          "Quais atitudes da nossa parte vão garantir que todos participem ativamente?"
        ],
        facilitatorInstructions: "Acolha a turma de forma calorosa. Projete os combinados e garanta que todos compreendam o ritmo de trabalho do workshop.",
        checklist: [
          "Apresentação do facilitador e participantes concluída",
          "Acordos e alinhamento de expectativas definidos"
        ]
      },
      {
        id: "e1-a2",
        title: "Introdução à IA Generativa e Boas Práticas",
        durationMinutes: 20,
        description: "Introdução à IA generativa e boas práticas.",
        whatIsIt: "Apresentação conceitual do funcionamento da IA Generativa, seus limites, alucinações, vieses e o uso ético como parceira cognitiva.",
        whyDoIt: "Evitar o uso ingênuo ou preguiçoso da tecnologia, enfatizando que a IA auxilia, mas não substitui o pensamento crítico.",
        howToApply: [
          "Entenda o conceito de 'Parceira Cognitiva'.",
          "Conheça as regras de ouro: não compartilhar dados sensíveis, duvidar de respostas fáceis e checar fatos."
        ],
        socraticQuestions: [
          "Qual é a diferença entre usar a IA para pensar com você vs. usar a IA para pensar por você?",
          "Por que uma resposta bem escrita pela IA não é necessariamente verdadeira?"
        ],
        facilitatorInstructions: "Apresente exemplos práticos de alucinações e vieses da IA. Destaque enfaticamente a regra de proteção de dados pessoais.",
        checklist: [
          "Introdução à IA generativa realizada",
          "Boas práticas e proteção de dados reforçados"
        ],
        suggestedPromptIds: ["p-reflexao-socratica", "p-verificacao-fatos"]
      },
      {
        id: "e1-a3",
        title: "Mapeamento dos Desafios Individuais",
        durationMinutes: 10,
        description: "Mapeamento íntimo de desafios individuais (estritamente privado).",
        whatIsIt: "Exercício individual de reflexão sobre incômodos e desafios que o estudante vivencia diariamente.",
        whyDoIt: "Conectar o aprendizado com a vida real dos participantes, exercitando a auto-observação.",
        howToApply: [
          "Escreva para si mesmo no mapa privado da ferramenta.",
          "Mapeie desafios individuais de forma livre e honesta."
        ],
        socraticQuestions: [
          "Quais pequenas frustrações diárias consomem sua energia ou tempo sem que você perceba?",
          "O que você gostaria que funcionasse melhor na sua rotina estudantil ou pessoal?"
        ],
        facilitatorInstructions: "Reforce enfaticamente: O mapeamento dos desafios individuais será realizado de forma privada e não será recolhido ou avaliado.",
        checklist: [
          "Garantia explícita de privacidade reforçada",
          "Mapeamento individual concluído de forma privada"
        ]
      },
      {
        id: "e1-a4",
        title: "Mapeamento dos Desafios Coletivos",
        durationMinutes: 30,
        description: "Mapeamento dos desafios coletivos da escola, do bairro e da comunidade.",
        whatIsIt: "Levantamento em equipe de problemas compartilhados na escola ou na comunidade.",
        whyDoIt: "Transitar da reflexão individual para o engajamento comunitário e formação das equipes.",
        howToApply: [
          "Reúna-se em equipe (organizados em até quatro equipes de até 5 pessoas).",
          "Liste e organize os desafios coletivos da escola, do bairro e da comunidade."
        ],
        socraticQuestions: [
          "Quais problemas afetam não apenas você, mas seus colegas, escola ou vizinhança?",
          "Quem são as pessoas reais que sofrem diretamente com esse desafio?"
        ],
        facilitatorInstructions: "Ajude na formação de até quatro equipes. Incentive a escolha de desafios coletivos relevantes.",
        checklist: [
          "Até 4 equipes organizadas",
          "Mapeamento de problemas coletivos concluído"
        ],
        relatedDocumentStep: "desafioColetivo"
      },
      {
        id: "e1-a5",
        title: "Pausa / Lanche",
        durationMinutes: 15,
        description: "Intervalo para descanso e convivência entre participantes.",
        whatIsIt: "Momento de descompressão e troca informal entre os estudantes e o facilitador.",
        whyDoIt: "Garantir a energia e o foco para a etapa de diagnóstico aprofundado.",
        howToApply: ["Aproveite para conversar com colegas e recarregar a atenção."],
        socraticQuestions: ["Como a pausa ajuda a clarear nossas ideias sobre o problema?"],
        facilitatorInstructions: "Garanta o cumprimento exato do tempo de 15 minutos para retornar ao trabalho.",
        checklist: ["Pausa para lanche realizada"]
      },
      {
        id: "e1-a6",
        title: "Diagnóstico PHD e Cinco Porquês",
        durationMinutes: 20,
        description: "Diagnóstico dos problemas escolhidos pelas equipes: reflexão sobre causas-raiz por meio do exercício PHD - Problemas, Hipóteses e Dúvidas - e da técnica dos Cinco Porquês.",
        whatIsIt: "Análise profunda para diferenciar problemas reais, hipóteses e dúvidas, descendo até a causa-raiz.",
        whyDoIt: "Evitar tentar resolver o problema errado ou atuar apenas nos sintomas superficiais.",
        howToApply: [
          "Preencha o quadro PHD (Problemas, Hipóteses e Dúvidas).",
          "Aplique a técnica dos Cinco Porquês para investigar as causas-raiz."
        ],
        socraticQuestions: [
          "Isso que identificamos é a causa real do problema ou apenas um sintoma visível?",
          "Se resolvermos esse 'porquê', o problema desaparece ou apenas muda de forma?"
        ],
        facilitatorInstructions: "Oriente as equipes a separarem o que é Fato do que é Hipótese ou Dúvida a checar.",
        checklist: [
          "Diagnóstico PHD preenchido",
          "Exercício dos Cinco Porquês aplicado"
        ],
        suggestedPromptIds: ["p-phd", "p-cinco-porques"],
        relatedDocumentStep: "phd"
      },
      {
        id: "e1-a7",
        title: "Definição do Propósito: Golden Circle",
        durationMinutes: 20,
        description: "Definição do propósito dos projetos/equipes: O Golden Circle: Por que? Como? O que?",
        whatIsIt: "Ferramenta de alinhamento de propósito começando pela motivação fundamental.",
        whyDoIt: "Unir a equipe em torno do Por Quê antes de definir O Quê construir.",
        howToApply: [
          "Defina o POR QUÊ: Por que esse problema precisa ser resolvido?",
          "Defina o COMO: Quais valores e princípios guiarão nossa atuação?",
          "Defina o O QUÊ: Qual é a ideia inicial de solução?"
        ],
        socraticQuestions: [
          "Por que essa causa importa verdadeiramente para a nossa equipe e comunidade?",
          "O que muda na vida das pessoas quando esse problema for atacado?"
        ],
        facilitatorInstructions: "Mantenha o foco rigorosamente no POR QUÊ antes de avançar para a solução.",
        checklist: [
          "Golden Circle preenchido (Por que? Como? O que?)"
        ],
        suggestedPromptIds: ["p-golden-circle"],
        relatedDocumentStep: "goldenCircle"
      },
      {
        id: "e1-a8",
        title: "Da Investigação ao Briefing",
        durationMinutes: 15,
        description: "Introdução ao conceito de briefing.",
        whatIsIt: "Orientação sobre como sintetizar as descobertas da investigação em um documento de Briefing.",
        whyDoIt: "Conectar a etapa de investigação com a formalização da proposta no Encontro 2.",
        howToApply: [
          "Compreenda a função do Briefing como mapa da solução.",
          "Organize as notas da investigação para iniciar a redação do Briefing."
        ],
        socraticQuestions: [
          "Como explicar de forma simples e direta qual problema queremos resolver?"
        ],
        facilitatorInstructions: "Apresente o conceito de briefing de forma leve e prática.",
        checklist: [
          "Conceito de briefing apresentado"
        ],
        suggestedPromptIds: ["p-briefing"],
        relatedDocumentStep: "briefing"
      },
      {
        id: "e1-a9",
        title: "Perguntas e Respostas",
        durationMinutes: 10,
        description: "Momento de esclarecimento de dúvidas e fixação dos conceitos do dia.",
        whatIsIt: "Espaço aberto para resolver dúvidas sobre a metodologia, ferramentas e papéis.",
        whyDoIt: "Consolidar o aprendizado e garantir alinhamento total de todas as equipes.",
        howToApply: ["Compartilhe dúvidas sobre o diagnóstico ou o Golden Circle."],
        socraticQuestions: ["Qual foi o principal aprendizado do nosso primeiro encontro?"],
        facilitatorInstructions: "Responda pontualmente às dúvidas e elogie as investigações realizadas.",
        checklist: ["Perguntas e respostas concluídas"]
      },
      {
        id: "e1-a10",
        title: "Missão de Casa e Alinhamento",
        durationMinutes: 10,
        description: "Missão de casa e Alinhamento sobre o próximo encontro.",
        whatIsIt: "Orientação para escuta informal e observação do problema na comunidade até o Encontro 2.",
        whyDoIt: "Testar hipóteses com pessoas reais fora do ambiente escolar.",
        howToApply: [
          "Observe o problema na escola ou comunidade.",
          "Converse informalmente com 2 a 3 pessoas afetadas e registre percepções."
        ],
        socraticQuestions: ["O que queremos confirmar ao conversar com pessoas que vivem esse problema?"],
        facilitatorInstructions: "Oriente que não é um questionário rígido, mas uma conversa empática.",
        checklist: [
          "Missão de casa explicitada",
          "Alinhamento sobre o próximo encontro concluído"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Encontro 2 — DEFINIR E MATERIALIZAR",
    subtitle: "Construção do Briefing, PRD, definição do MVP e início do Protótipo V0",
    objective: "Transformar a investigação realizada no primeiro encontro em uma proposta concreta de solução. Por meio da construção prática de um Briefing que descreve o problema e aponta para a possível proposta de solução, de um PRD simplificado (que explica o que a solução precisa fazer), da definição do MVP (a menor versão da solução que permite testar se a ideia principal funciona) os participantes organizarão o problema, definirão o que sua solução precisa fazer, priorizarão suas funcionalidades essenciais e darão início à construção do Protótipo V0, utilizando IA como parceira de investigação, estruturação e criação.",
    totalDurationMinutes: 180,
    deliverable: "Briefing V0; PRD V0; definição do MVP; Protótipo V0.",
    homeworkMission: "Missão de casa e Alinhamento sobre o próximo encontro: colher feedbacks colhendo percepções de familiares, amigos e potenciais usuários com a versão V0.",
    activities: [
      {
        id: "e2-a1",
        title: "Recapitulação do 1º Encontro",
        durationMinutes: 15,
        description: "Rodada de recapitulação do que mais marcou no primeiro encontro.",
        whatIsIt: "Abertura com partilha do aprendizado mais marcante do Encontro 1 e relatos da missão de casa.",
        whyDoIt: "Reconectar os participantes com o diagnóstico e enriquecer os dados com a escuta de campo.",
        howToApply: ["Compartilhe em 1 minuto uma observação da missão de casa."],
        socraticQuestions: ["O que vocês ouviram das pessoas que alterou ou confirmou sua visão inicial?"],
        facilitatorInstructions: "Acolha as percepções trazidas da comunidade e conecte com o início do Briefing.",
        checklist: ["Rodada de recapitulação do 1º encontro realizada"]
      },
      {
        id: "e2-a2",
        title: "Recapitulação dos Conceitos e Ferramentas",
        durationMinutes: 15,
        description: "Rodada de recapitulação dos conceitos e ferramentas apresentados.",
        whatIsIt: "Revisão rápida dos conceitos: PHD, 5 Porquês, Golden Circle e o papel da IA como parceira.",
        whyDoIt: "Garantir base firme antes de escrever os documentos técnicos do projeto.",
        howToApply: ["Revise as ferramentas do app e tire dúvidas residuais."],
        socraticQuestions: ["Como o Golden Circle vai nos ajudar a guiar a proposta de solução?"],
        facilitatorInstructions: "Faça uma rápida passagem pelos quadros salvos da equipe.",
        checklist: ["Recapitulação dos conceitos e ferramentas concluída"]
      },
      {
        id: "e2-a3",
        title: "Elaborando o Briefing - POR QUÊ?",
        durationMinutes: 30,
        description: "Elaborando o Briefing - POR QUÊ? (Qual problema estamos tentando solucionar? Por que ele existe? Quais suas possíveis causas-raiz? Para quem é essa solução? Problema, Contexto, Hipóteses, Dúvidas, causas-raiz, Proposta de Solução (Golden Circle), Resultados esperados).",
        whatIsIt: "Construção do Briefing V0 estruturando o problema, contexto, causas-raiz e proposta de solução.",
        whyDoIt: "Ancorar o projeto em uma descrição clara e fundamentada da intenção da equipe.",
        howToApply: [
          "Preencha os campos do Briefing V0 na Área do Projeto.",
          "Defina o problema, público, causas-raiz e resultados esperados."
        ],
        socraticQuestions: ["Se alguém lesse nosso Briefing agora, entenderia exatamente POR QUÊ a solução existe?"],
        facilitatorInstructions: "Acompanhe as equipes garantindo objetividade na escrita.",
        checklist: ["Briefing V0 elaborado pela equipe"],
        suggestedPromptIds: ["p-briefing"],
        relatedDocumentStep: "briefing"
      },
      {
        id: "e2-a4",
        title: "Pausa para o Lanche",
        durationMinutes: 15,
        description: "Pausa para o lanche.",
        whatIsIt: "Intervalo para lanche e descanso da turma.",
        whyDoIt: "Manter a energia e o foco intelectual para a fase de revisão e PRD.",
        howToApply: ["Aproveite o lanche para descansar."],
        socraticQuestions: ["Como a pausa nos ajuda a olhar nosso texto de fora?"],
        facilitatorInstructions: "Mantenha o tempo rigoroso de 15 minutos.",
        checklist: ["Pausa para o lanche realizada"]
      },
      {
        id: "e2-a5",
        title: "Revisando o Briefing",
        durationMinutes: 30,
        description: "Revisando o Briefing: revisão por pares (10 min), revisão com apoio da IA (10 min), revisão final da equipe (10 min).",
        whatIsIt: "Processo em 3 etapas para lapidar a clareza, coerência e qualidade do Briefing V0.",
        whyDoIt: "Exercitar a checagem crítica, escuta de pares e o uso da IA para revisão de documentos.",
        howToApply: [
          "Troque o Briefing com outra equipe para revisão por pares (10 min).",
          "Submeta ao prompt de revisão da IA para checar ambiguidades (10 min).",
          "Consolide a versão final da equipe (10 min)."
        ],
        socraticQuestions: [
          "A crítica do outro grupo fez sentido? O que a IA apontou que nós não tínhamos notado?"
        ],
        facilitatorInstructions: "Cronometre os 3 blocos de 10 minutos (Pares -> IA -> Equipe).",
        checklist: [
          "Revisão por pares concluída (10 min)",
          "Revisão com apoio da IA concluída (10 min)",
          "Revisão final da equipe concluída (10 min)"
        ],
        suggestedPromptIds: ["p-verificacao-fatos"]
      },
      {
        id: "e2-a6",
        title: "Do Briefing ao PRD (Documento de Requisitos de Produto) COMO?",
        durationMinutes: 30,
        description: "Do Briefing ao PRD (Documento de Requisitos de Produto) COMO? (Como a solução deverá funcionar? Quais são as funções essenciais (must have)? O que seria legal ter, mas não é essencial (nice to have)?).",
        whatIsIt: "Elaboração do PRD V0 especificando o funcionamento, requisitos essenciais e nice-to-have.",
        whyDoIt: "Especificar o funcionamento prático da solução antes da prototipação.",
        howToApply: [
          "Responda: Como a solução deverá funcionar?",
          "Separe as funções em Must Have (essenciais) e Nice to Have (acessórias)."
        ],
        socraticQuestions: ["Sem qual funcionalidade a nossa solução simplesmente NÃO FUNCIONA?"],
        facilitatorInstructions: "Ajude as equipes a classificarem rigorosamente o que é indispensável.",
        checklist: ["PRD V0 construído na Área do Projeto"],
        suggestedPromptIds: ["p-prd"],
        relatedDocumentStep: "prd"
      },
      {
        id: "e2-a7",
        title: "Do PRD ao MVP (Produto Mínimo Viável) O QUE?",
        durationMinutes: 15,
        description: "Do PRD ao MVP (Produto Mínimo Viável) O QUE? (Qual é a menor versão que podemos testar? Como saberemos se está funcionando?).",
        whatIsIt: "Definição do escopo enxuto do MVP para teste imediato.",
        whyDoIt: "Focus on testing the core value without wasting time on secondary details.",
        howToApply: [
          "Responda: Qual é a menor versão que podemos testar?",
          "Defina como saberemos se a solução está funcionando no teste."
        ],
        socraticQuestions: ["O que é o mínimo absoluto necessário para validar se as pessoas querem essa solução?"],
        facilitatorInstructions: "Estimule o descarte de detalhes secundários para o protótipo inicial.",
        checklist: ["Definição do MVP registrada"],
        suggestedPromptIds: ["p-mvp"],
        relatedDocumentStep: "mvp"
      },
      {
        id: "e2-a8",
        title: "Do MVP ao Protótipo: dar início à construção do protótipo V0",
        durationMinutes: 25,
        description: "Do MVP ao Protótipo: dar início à construção do protótipo V0 utilizando IA como parceira de investigação, estruturação e criação.",
        whatIsIt: "Mão na massa: construção física, digital ou em papel da versão V0 do protótipo.",
        whyDoIt: "Tornar a solução tangível e pronta para ser mostrada a usuários reais.",
        howToApply: [
          "Use ferramentas no-code, IA ou materiais visuais para construir o Protótipo V0.",
          "Garanta que o protótipo permita demonstrar o valor principal."
        ],
        socraticQuestions: ["O protótipo permite que um usuário experimente a ideia em 2 minutos?"],
        facilitatorInstructions: "Circule pelas mesas dando suporte prático de criação e uso de ferramentas.",
        checklist: ["Construção do Protótipo V0 iniciada"],
        suggestedPromptIds: ["p-prototipo"],
        relatedDocumentStep: "prototype"
      },
      {
        id: "e2-a9",
        title: "Alinhamento e Missão de Casa: colher feedbacks",
        durationMinutes: 5,
        description: "Alinhamento sobre o próximo encontro e Missão de casa: colher feedbacks.",
        whatIsIt: "Instruções para realizar testes do Protótipo V0 com familiares, amigos e usuários reais.",
        whyDoIt: "Coletar dados reais de uso para alimentar o ciclo de aprimoramento do Encontro 3.",
        howToApply: [
          "Mostre o Protótipo V0 para pelo menos 2 a 3 pessoas.",
          "Anote dúvidas, críticas e sugestões sem defender o produto."
        ],
        socraticQuestions: ["Por que ouvir onde o usuário se confundiu é mais valioso do que ouvir elogios?"],
        facilitatorInstructions: "Encoraje os alunos a prestarem atenção no comportamento real do usuário ao testar.",
        checklist: [
          "Missão de casa de colher feedbacks explicitada",
          "Alinhamento para o Encontro 3 concluído"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Encontro 3 — VALIDAR E EVOLUIR",
    subtitle: "Análise de feedbacks, Modelo de Sustentabilidade (BMC), Roadmap e Protótipo V1",
    objective: "Testar criticamente a primeira versão da solução, compreender os feedbacks recebidos, analisar as condições necessárias para sua viabilidade e sustentabilidade, planejar sua evolução por meio de um roadmap e desenvolver uma versão aprimorada do protótipo.",
    totalDurationMinutes: 180,
    deliverable: "Síntese dos feedbacks coletados; BMC; Roadmap; Protótipo V1.",
    homeworkMission: "Missão de casa e Alinhamento sobre o próximo encontro: refletir sobre a história do projeto e preparar os suportes para o Pitch.",
    activities: [
      {
        id: "e3-a1",
        title: "Recapitulação do 2º Encontro",
        durationMinutes: 15,
        description: "Rodada de recapitulação do que mais marcou os participantes no segundo encontro.",
        whatIsIt: "Abertura com destaques do processo de criação do Briefing, PRD, MVP e Protótipo V0.",
        whyDoIt: "Reconectar a turma com a evolução dos seus projetos.",
        howToApply: ["Partilhe o momento mais marcante do Encontro 2."],
        socraticQuestions: ["O que mudou na percepção da equipe quando vocês passaram do papel para a criação do protótipo?"],
        facilitatorInstructions: "Acolha a turma e prepare o terreno para os testes e BMC.",
        checklist: ["Recapitulação do 2º encontro concluída"]
      },
      {
        id: "e3-a2",
        title: "Percepções sobre o Protótipo e Feedbacks Coletados",
        durationMinutes: 15,
        description: "Rodada de percepções sobre o protótipo criado e os feedbacks coletados.",
        whatIsIt: "Compartilhamento dos resultados dos testes do Protótipo V0 com usuários reais.",
        whyDoIt: "Basear as decisões do projeto em evidências de uso real.",
        howToApply: [
          "Liste as percepções, elogios, dúvidas e críticas recebidas dos usuários.",
          "Organize os pontos no aplicativo."
        ],
        socraticQuestions: ["O que os testes mostraram que a equipe não tinha previsto?"],
        facilitatorInstructions: "Ajude as equipes a acolherem o feedback sem atitude defensiva.",
        checklist: ["Análise de feedbacks coletados concluída"],
        suggestedPromptIds: ["p-analise-feedback"],
        relatedDocumentStep: "feedback"
      },
      {
        id: "e3-a3",
        title: "Criação do BMC (Business Model Canvas)",
        durationMinutes: 30,
        description: "Criação de um BMC Business Model Canvas: Modelo de Sustentabilidade da Solução (Mapear os segmentos atendidos, recursos necessários, parcerias e sustentabilidade da proposta).",
        whatIsIt: "Elaboração do BMC mapeando viabilidade, parcerias, recursos e sustentabilidade comunitária.",
        whyDoIt: "Avaliar e ampliar as condições de viabilidade e permanência da solução.",
        howToApply: [
          "Mapeie os segmentos atendidos, recursos necessários e parcerias-chave.",
          "Defina o modelo de sustentabilidade da proposta."
        ],
        socraticQuestions: ["Quem são os parceiros na comunidade que garantem que esse projeto continue existindo?"],
        facilitatorInstructions: "Explique que sustentabilidade envolve parcerias, apoio comunitário e recursos locais.",
        checklist: ["BMC preenchido na Área do Projeto"],
        suggestedPromptIds: ["p-bmc"],
        relatedDocumentStep: "bmc"
      },
      {
        id: "e3-a4",
        title: "Pausa / Lanche",
        durationMinutes: 15,
        description: "Pausa/Lanche (15 min).",
        whatIsIt: "Pausa para descanso e alimentação dos jovens.",
        whyDoIt: "Renovar a concentração para a elaboração do Roadmap e aprimoramento do protótipo.",
        howToApply: ["Descanse e troque ideias com outras equipes."],
        socraticQuestions: ["Como o repouso estimula novas soluções para os problemas encontrados?"],
        facilitatorInstructions: "Garanta o retorno no horário.",
        checklist: ["Pausa para o lanche realizada"]
      },
      {
        id: "e3-a5",
        title: "Planejamento dos Próximos Passos (Roadmap)",
        durationMinutes: 30,
        description: "Planejamento dos próximos passos (roadmap): O que faremos primeiro, depois e futuramente? Correção dos bugs detectados, implementação de melhorias necessárias, simplificação ou criação de novas funcionalidades.",
        whatIsIt: "Elaboração do Roadmap priorizando tarefas em Agora, Depois e Futuramente.",
        whyDoIt: "Aprender a priorizar o que ajustar hoje vs. o que fica para o futuro.",
        howToApply: [
          "Classifique as tarefas: O que faremos primeiro (Agora), depois (pós-workshop) e futuramente?",
          "Defina as correções de bugs e melhorias essenciais para o Protótipo V1."
        ],
        socraticQuestions: ["O que é prioritário ajustar antes de apresentar o Pitch final?"],
        facilitatorInstructions: "Reforce que a coluna 'Agora' deve conter apenas o que dá para fazer no bloco a seguir.",
        checklist: ["Roadmap de evolução planejado"],
        suggestedPromptIds: ["p-roadmap"],
        relatedDocumentStep: "roadmap"
      },
      {
        id: "e3-a6",
        title: "Aprimoramento do Protótipo (V1)",
        durationMinutes: 60,
        description: "Aprimoramento do protótipo - 60 min (Desenvolvimento da versão aprimorada V1 com base nos feedbacks e no roadmap).",
        whatIsIt: "Sessão intensiva de refinamento do protótipo corrigindo erros e elevando o acabamento.",
        whyDoIt: "Entregar uma versão V1 aprimorada e pronta para demonstração pública no Pitch.",
        howToApply: [
          "Aplique os ajustes definidos na coluna 'Agora' do Roadmap.",
          "Utilize a IA para ajustar textos, interfaces, fluxos e elementos visuais."
        ],
        socraticQuestions: ["Como a versão V1 está mais simples e funcional do que a versão V0?"],
        facilitatorInstructions: "Passe nas bancadas apoiando a execução das melhorias prioritárias.",
        checklist: ["Protótipo V1 aprimorado com sucesso"],
        relatedDocumentStep: "prototype"
      },
      {
        id: "e3-a7",
        title: "Perguntas e Respostas",
        durationMinutes: 10,
        description: "Perguntas e Respostas - 10 min.",
        whatIsIt: "Espaço para esclarecer dúvidas sobre os protótipos, BMC e Roadmap.",
        whyDoIt: "Garantir que nenhuma equipe fique travada ao final da sessão.",
        howToApply: ["Tire dúvidas pontuais."],
        socraticQuestions: ["O que ainda precisa de atenção no nosso protótipo V1?"],
        facilitatorInstructions: "Apoie as equipes com dúvidas pendentes.",
        checklist: ["Dúvidas esclarecidas"]
      },
      {
        id: "e3-a8",
        title: "Missão de Casa e Alinhamento",
        durationMinutes: 5,
        description: "Missão de casa e Alinhamento sobre o próximo encontro 5 min.",
        whatIsIt: "Instruções de preparação para a escrita do Pitch de 3 minutos no Encontro 4.",
        whyDoIt: "Preparar o espírito da equipe para a comunicação final do projeto.",
        howToApply: ["Reflita sobre a história do projeto desde a investigação do problema."],
        socraticQuestions: ["Como resumir a nossa jornada de 12 horas em uma história inspiradora?"],
        facilitatorInstructions: "Inspire os estudantes para o encontro final de comunicação e celebração.",
        checklist: [
          "Alinhamento para o Encontro 4 concluído"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Encontro 4 — COMUNICAR",
    subtitle: "Organização da trajetória, roteiro, ensaios e apresentação do Pitch final",
    objective: "Aprender a organizar e comunicar a trajetória do projeto, apresentando com clareza o problema, a solução, o uso da IA, os resultados dos testes e os próximos passos.",
    totalDurationMinutes: 180,
    deliverable: "Roteiro do pitch; Apresentação; Pitch final.",
    homeworkMission: "Celebração do encerramento e continuidade do uso ético da IA na vida e na comunidade.",
    activities: [
      {
        id: "e4-a1",
        title: "Recapitulação do 3º Encontro",
        durationMinutes: 15,
        description: "Rodada de recapitulação do que mais marcou os participantes no terceiro encontro.",
        whatIsIt: "Abertura do dia final recapitulando a evolução desde a investigação até o Protótipo V1.",
        whyDoIt: "Criar o clima de celebração e prontidão para a comunicação dos projetos.",
        howToApply: ["Partilhe o sentimento de chegar ao encontro de apresentações."],
        socraticQuestions: ["Qual foi a maior transformação do projeto do Encontro 1 até agora?"],
        facilitatorInstructions: "Acolha a turma e estabeleça o sorteio das apresentações.",
        checklist: ["Recapitulação do 3º encontro concluída"]
      },
      {
        id: "e4-a2",
        title: "Criação do Roteiro do Pitch",
        durationMinutes: 30,
        description: "Criação do roteiro do pitch (Organizar a fala apresentando o problema, a solução, o uso da IA, os testes e os próximos passos).",
        whatIsIt: "Elaboração da fala do Pitch estruturando a narrativa com apoio da ferramenta.",
        whyDoIt: "Comunicar com clareza o problema, solução, papel da IA e resultados dentro do tempo.",
        howToApply: [
          "Preencha a estrutura do Roteiro de Pitch no aplicativo.",
          "Verifique a clareza e a duração estimada da fala."
        ],
        socraticQuestions: ["Como chamar a atenção do público nos primeiros 15 segundos de apresentação?"],
        facilitatorInstructions: "Supervisione a clareza da narrativa e o limite de tempo.",
        checklist: ["Roteiro do pitch finalizado"],
        suggestedPromptIds: ["p-pitch"],
        relatedDocumentStep: "pitch"
      },
      {
        id: "e4-a3",
        title: "Criação da Apresentação do Pitch",
        durationMinutes: 30,
        description: "Criação da apresentação do pitch (Preparar os suportes visuais, slides ou telas do protótipo).",
        whatIsIt: "Montagem dos suportes visuais de apoio para a fala.",
        whyDoIt: "Oferecer suporte visual impactante para quem assiste ao Pitch.",
        howToApply: [
          "Selecione telas ou imagens do Protótipo V1 para projetar.",
          "Mantenha o visual limpo e focado no produto."
        ],
        socraticQuestions: ["Os slides ajudam a demonstrar o valor do projeto sem poluição visual?"],
        facilitatorInstructions: "Incentive poucos slides e foco na demonstração real.",
        checklist: ["Apresentação do pitch montada"]
      },
      {
        id: "e4-a4",
        title: "Pausa / Lanche",
        durationMinutes: 15,
        description: "Pausa/Lanche (15 min).",
        whatIsIt: "Intervalo para lanche e concentração das equipes antes dos ensaios.",
        whyDoIt: "Aliviar o nervosismo e recarregar energias para os ensaios.",
        howToApply: ["Aproveite para relaxar e beber água."],
        socraticQuestions: ["Como a respiração ajuda a controlar a ansiedade antes da fala?"],
        facilitatorInstructions: "Retorne pontualmente em 15 minutos.",
        checklist: ["Pausa para o lanche realizada"]
      },
      {
        id: "e4-a5",
        title: "Ensaios para Apresentação do Pitch",
        durationMinutes: 30,
        description: "Ensaios para apresentação do pitch (Simulações com cronômetro para ajustar tempo e oratória).",
        whatIsIt: "Ensaio geral das equipes com marcação rigorosa de tempo e dicas de oratória.",
        whyDoIt: "Garantir fluidez, boa postura e respeito ao tempo estipulado.",
        howToApply: [
          "Ensaie o pitch utilizando o cronômetro do app.",
          "Ajuste as falas entre os integrantes da equipe."
        ],
        socraticQuestions: ["A fala coube confortavelmente no tempo sem precisar correr?"],
        facilitatorInstructions: "Use o cronômetro oficial do app para marcar o ensaio de cada equipe.",
        checklist: ["Ensaios com cronômetro realizados"]
      },
      {
        id: "e4-a6",
        title: "Apresentação do Pitch",
        durationMinutes: 30,
        description: "Apresentação do pitch (Apresentações oficiais das equipes para a turma e convidados).",
        whatIsIt: "Apresentação oficial dos projetos desenvolvidos ao longo das 12 horas.",
        whyDoIt: "Desenvolver oratória, autoconfiança e valorizar a conquista de cada equipe.",
        howToApply: [
          "Apresente o Pitch da equipe com clareza e entusiasmo.",
          "Demonstre o protótipo V1 e receba os aplausos."
        ],
        socraticQuestions: ["Como demonstrar o orgulho do trabalho coletivo realizado?"],
        facilitatorInstructions: "Medie as apresentações, mantendo o tempo e celebrando cada entrega com entusiasmo.",
        checklist: ["Apresentações dos pitches de todas as equipes realizadas"]
      },
      {
        id: "e4-a7",
        title: "Rodada de Depoimentos, Foto da Turma e Celebração Final",
        durationMinutes: 30,
        description: "Rodada de depoimentos dos participantes, foto da turma, celebração final - 30 min.",
        whatIsIt: "Fechamento festivo da jornada do workshop com depoimentos, registro fotográfico e celebração.",
        whyDoIt: "Consolidar a experiência, celebrar as conquistas e encerrar o workshop com impacto positivo.",
        howToApply: [
          "Partilhe um depoimento sobre o seu aprendizado e uso responsável da IA.",
          "Participe da foto oficial da turma."
        ],
        socraticQuestions: ["Quem era você em relação à tecnologia antes deste workshop e quem é você agora?"],
        facilitatorInstructions: "Conduza a rodada de depoimentos com afeto, faça a foto oficial da turma e celebre a conclusão!",
        checklist: [
          "Rodada de depoimentos concluída",
          "Foto da turma realizada",
          "Celebração e encerramento do workshop concluídos com sucesso!"
        ]
      }
    ]
  }
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "p-reflexao-socratica",
    title: "Questionador Socrático de Problemas",
    purpose: "Provocar reflexão crítica sobre uma ideia sem dar respostas prontas",
    usageMoment: "Encontro 1 — INVESTIGAR",
    category: "reflexao",
    templateText: `Atue como um questionador socrático experiente e acolhedor para jovens de 12 a 17 anos. 
Nosso grupo identificou o seguinte desafio: "{{DESAFIO}}".

Sua missão:
1. Faça 3 perguntas instigantes que nos ajudem a questionar nossas suposições sobre esse problema.
2. Não nos dê respostas diretas nem soluções prontas.
3. Ajude-nos a diferenciar o que é FATO (comprovado) do que é APENAS HIPÓTESE ou OPINIÃO.
4. Lembre-nos de verificar a veracidade das informações e proteger nossos dados pessoais.
Mantenha a linguagem direta, jovem, respeitosa e em português do Brasil.`,
    variables: [
      { key: "DESAFIO", label: "Desafio ou Problema Identificado", placeholder: "Ex: Falta de interesse na biblioteca da escola" }
    ]
  },
  {
    id: "p-verificacao-fatos",
    title: "Verificador de Vieses e Alucinações",
    purpose: "Analisar criticamente uma afirmação ou texto produzido pela IA",
    usageMoment: "Todos os Encontros - Checagem crítica",
    category: "reflexao",
    templateText: `Examine o seguinte texto/afirmação gerado sobre o projeto "{{NOME_PROJETO}}":
"{{TEXTO_A_VERIFICAR}}"

Analise este conteúdo de forma crítica sob 4 aspectos:
1. INFORMAÇÕES A VERIFICAR: Quais afirmações contêm dados que precisam ser checados em fontes confiáveis?
2. POSSÍVEIS VIESES: O texto pressupõe algum estereótipo ou simplificação excessiva da realidade?
3. PONTOS CEGOS: O que este texto ignora sobre o contexto das pessoas reais afetadas?
4. RISCOS DE PRIVACIDADE: O texto menciona algum dado pessoal sensível que deva ser removido?

Apresente em marcadores curtos e claros em português do Brasil.`,
    variables: [
      { key: "NOME_PROJETO", label: "Nome do Projeto", placeholder: "Ex: ConectaBairro" },
      { key: "TEXTO_A_VERIFICAR", label: "Texto a ser analisado", placeholder: "Cole aqui o texto fornecido pela IA para revisão" }
    ]
  },
  {
    id: "p-phd",
    title: "Assistente de Mapeamento PHD (Problemas, Hipóteses, Dúvidas)",
    purpose: "Organizar percepções sobre um problema coletivo na estrutura PHD",
    usageMoment: "Encontro 1 — INVESTIGAR",
    category: "causas",
    templateText: `Ajude nossa equipe de estudantes a organizar o mapa PHD para o desafio comunitário/escolar: "{{DESAFIO}}".

Com base na nossa descrição inicial: "{{DESCRICAO_INICIAL}}"

Estruture em 3 listas curtas:
1. PROBLEMAS (O que sabemos que de fato dói ou incomoda as pessoas):
2. HIPÓTESES (O que ACHAMOS que pode estar causando isso, mas ainda não provamos):
3. DÚVIDAS (O que precisamos pesquisar ou perguntar a pessoas reais para ter certeza):

Atenção: Não invente dados fictícios ou estatísticas não fornecidas. Use linguagem simples e direta.`,
    variables: [
      { key: "DESAFIO", label: "Desafio Coletivo", placeholder: "Ex: Descarte incorreto de lixo no entorno da escola" },
      { key: "DESCRICAO_INICIAL", label: "Descrição inicial da equipe", placeholder: "Descreva o que a equipe observou no dia a dia" }
    ]
  },
  {
    id: "p-cinco-porques",
    title: "Analisador da Causa-Raiz (Cinco Porquês)",
    purpose: "Guiar o aprofundamento investigativo até a causa-raiz de um problema",
    usageMoment: "Encontro 1 — INVESTIGAR",
    category: "causas",
    templateText: `Siga a técnica dos 5 Porquês para investigar a causa-raiz do seguinte problema escolar/comunitário:
Problema de Partida: "{{PROBLEMA_INICIAL}}"

Gere uma sequência de 5 perguntas encadeadas ('Por quê isso acontece?'), onde cada pergunta investiga a resposta anterior.
Para cada nível, indique se a causa sugerida é um FATO conhecido ou uma HIPÓTESE a investigar.

Ao final, destaque qual parece ser a CAUSA-RAIZ PRIORITÁRIA para atuarmos com nosso projeto.`,
    variables: [
      { key: "PROBLEMA_INICIAL", label: "Problema de Partida", placeholder: "Ex: Estudantes do 1º ano se sentem isolados no intervalo" }
    ]
  },
  {
    id: "p-golden-circle",
    title: "Estruturador de Propósito (Golden Circle)",
    purpose: "Ajudar a definir o Por que? Como? O que? do projeto",
    usageMoment: "Encontro 1 — INVESTIGAR",
    category: "causas",
    templateText: `Sintonize o projeto da nossa equipe no método Golden Circle (Comece pelo Por Quê).
Desafio da equipe: "{{DESAFIO}}"
Intenção da equipe: "{{INTENCAO}}"

Ajude-nos a redigir em poucas frases marcantes:
1. POR QUÊ (Propósito Essencial): Por que a causa deste projeto importa profundamente para a comunidade?
2. COMO (Valores e Método): De que maneira ética, humana e colaborativa vamos agir?
3. O QUÊ (Entregável/Solução): Qual é a manifestação concreta da nossa ideia?`,
    variables: [
      { key: "DESAFIO", label: "Desafio", placeholder: "Ex: Dificuldade de aprendizado em matemática" },
      { key: "INTENCAO", label: "Intenção da Equipe", placeholder: "Ex: Queremos criar um grupo de apoio entre estudantes usando tutoria ativa" }
    ]
  },
  {
    id: "p-briefing",
    title: "Gerador de Briefing V0",
    purpose: "Sintetizar a visão do projeto descrevendo o problema e a solução",
    usageMoment: "Encontro 2 — DEFINIR E MATERIALIZAR",
    category: "documentacao",
    templateText: `Atue como um gestor de projetos educacionais d'O Forno.
Com base nos dados da equipe:
- Nome do Projeto: "{{NOME_PROJETO}}"
- Problema Investigado: "{{PROBLEMA}}"
- Causas-Raiz: "{{CAUSAS_RAIZ}}"
- Propósito (Por Quê): "{{PURPOSE}}"
- Público Impactado: "{{PUBLICO}}"

Elabore um BRIEFING V0 sintético contendo:
1. O QUE ESTAMOS TENTANDO FAZER: Resumo direto da proposta.
2. CONTEXTO E POR QUÊ ELE EXISTE: Diagnóstico e causas-raiz identificadas.
3. PÚBLICO DE INTERESSE: Para quem é essa solução.
4. PROPOSTA DE SOLUÇÃO (Golden Circle): Por que? Como? O que?
5. RESULTADOS ESPERADOS: O que esperamos alcançar.

Garanta um tom inspirador, profissional, realista e objetivo.`,
    variables: [
      { key: "NOME_PROJETO", label: "Nome do Projeto", placeholder: "Ex: EcoCiclo Escolar" },
      { key: "PROBLEMA", label: "Problema Principal", placeholder: "Descrição do problema" },
      { key: "CAUSAS_RAIZ", label: "Causas-Raiz (Cinco Porquês)", placeholder: "Causas investigadas" },
      { key: "PURPOSE", label: "Propósito (Por Quê)", placeholder: "Por que isso importa" },
      { key: "PUBLICO", label: "Público Impactado", placeholder: "Estudantes, vizinhos, professores..." }
    ]
  },
  {
    id: "p-prd",
    title: "Gerador de PRD V0 (Requisitos de Produto)",
    purpose: "Especificar o funcionamento da solução: Como a solução deverá funcionar?",
    usageMoment: "Encontro 2 — DEFINIR E MATERIALIZAR",
    category: "documentacao",
    templateText: `Crie a especificação inicial do PRD V0 (Documento de Requisitos de Produto) para o projeto comunitário/estudantil:
Projeto: "{{NOME_PROJETO}}"
Objetivo: "{{OBJETIVO}}"
Público: "{{PUBLICO}}"

Estruture em formato de tópicos diretos:
1. VISÃO GERAL DE FUNCIONAMENTO (Como a solução deverá funcionar para o usuário?)
2. FUNÇÕES ESSENCIAIS - MUST HAVE (O que a solução TEM que fazer rigorosamente)
3. FUNÇÕES ACESSÓRIAS - NICE TO HAVE (O que seria legal ter, mas não é essencial nesta versão)
4. JORNADA DO USUÁRIO PASSO A PASSO (Etapas do primeiro contato ao uso diário)
5. REGRAS DE PRIVACIDADE E SEGURANÇA (Como proteger dados dos participantes)`,
    variables: [
      { key: "NOME_PROJETO", label: "Nome do Projeto", placeholder: "Ex: Horta Comunitária Inteligente" },
      { key: "OBJETIVO", label: "Objetivo Principal", placeholder: "Objetivo do produto" },
      { key: "PUBLICO", label: "Público Alvo", placeholder: "Usuários da solução" }
    ]
  },
  {
    id: "p-mvp",
    title: "Definidor de Produto Mínimo Viável (MVP)",
    purpose: "Recortar o protótipo: Qual é a menor versão que podemos testar?",
    usageMoment: "Encontro 2 — DEFINIR E MATERIALIZAR",
    category: "prototipo",
    templateText: `Atue como um mentor de inovação enxuta.
A equipe formulou o projeto "{{NOME_PROJETO}}" com as seguintes ideias do PRD:
"{{IDEIAS_COMPLETAS}}"

Responda à pergunta: Qual é a menor versão que podemos testar neste workshop?
1. NÚCLEO INVIOLÁVEL DO MVP (A menor versão que permite testar se a ideia principal funciona):
2. O QUE FICARÁ DE FORA DO TESTE V0 (Funcionalidades a adiar para o futuro):
3. CRITÉRIOS DE SUCESSO (Como saberemos se a ideia principal funcionou no teste?):
4. FORMATO DO PROTÓTIPO V0 (Físico, digital no-code, guia estruturado, telas ou simulação):`,
    variables: [
      { key: "NOME_PROJETO", label: "Nome do Projeto", placeholder: "Ex: App de Doação de Libros Escalares" },
      { key: "IDEIAS_COMPLETAS", label: "Ideias completas do PRD", placeholder: "Liste os requisitos do PRD" }
    ]
  },
  {
    id: "p-bmc",
    title: "Gerador de Business Model Canvas (BMC - Modelo de Sustentabilidade)",
    purpose: "Mapear sustentabilidade: Para quem, com quais recursos e como isso se sustenta?",
    usageMoment: "Encontro 3 — VALIDAR E EVOLUIR",
    category: "documentacao",
    templateText: `Elabore a estrutura do Business Model Canvas (BMC) focado em sustentabilidade comunitária e viabilidade do projeto:
Projeto: "{{NOME_PROJETO}}"
Proposta de Valor: "{{PROPOSTA_VALOR}}"

Preencha os blocos para mapear a sustentabilidade da proposta:
1. Proposta de Valor (Benefício real entregue)
2. Segmentos Atendidos (Para quem estamos criando valor?)
3. Canais de Acesso e Divulgação (Como chega às pessoas?)
4. Relacionamento e Acolhimento (Como mantemos o engajamento?)
5. Recursos Necessários (Ferramentas, locais ou materiais essenciais)
6. Parcerias Estratégicas (Quem na escola ou comunidade pode apoiar?)
7. Atividades-Chave (Ações indispensáveis para funcionar)
8. Custos e Necessidades Básicas (Recursos exigidos)
9. Sustentabilidade da Proposta (Como o projeto se mantém e expande seu impacto?)`,
    variables: [
      { key: "NOME_PROJETO", label: "Nome do Projeto", placeholder: "Ex: Guia de Estudos Colaborativo" },
      { key: "PROPOSTA_VALOR", label: "Proposta de Valor", placeholder: "O valor gerado pela solução" }
    ]
  },
  {
    id: "p-analise-feedback",
    title: "Sintetizador e Analisador de Feedbacks",
    purpose: "Transformar opiniões dos usuários em decisões de produto",
    usageMoment: "Encontro 3 — VALIDAR E EVOLUIR",
    category: "prototipo",
    templateText: `Sintetize os feedbacks coletados nos testes do protótipo V0 do projeto "{{NOME_PROJETO}}".

Anotações brutas dos testes com usuários reais:
"{{FEEDBACKS_BRUTOS}}"

Organize em 4 categorias de ação para o aprimoramento V1:
1. O QUE FUNCIONOU BEM (Manter e valorizar):
2. PONTOS DE CONFUSÃO (Ajustar clareza ou instrução):
3. BUGS OU ERROS CRÍTICOS (Corrigir na coluna 'Agora' do Roadmap):
4. SUGESTÕES PARA O FUTURO (Guardar nas colunas 'Depois' ou 'Futuramente'):`,
    variables: [
      { key: "NOME_PROJETO", label: "Nome do Projeto", placeholder: "Ex: Rede de Apoio Estudantil" },
      { key: "FEEDBACKS_BRUTOS", label: "Anotações dos testes", placeholder: "Cole aqui as opiniões e comentários dos usuários" }
    ]
  },
  {
    id: "p-roadmap",
    title: "Gerador de Roadmap de Evolução",
    purpose: "Organizar tarefas em Agora, Depois e Futuramente",
    usageMoment: "Encontro 3 — VALIDAR E EVOLUIR",
    category: "prototipo",
    templateText: `Crie um Roadmap claro para a evolução do projeto "{{NOME_PROJETO}}" respondendo: O que faremos primeiro, depois e futuramente?

Necessidades e feedbacks identificados: "{{MELHORIAS_DESEJADAS}}"

Estruture em 3 colunas prioritárias:
1. AGORA (Ajustes indispensáveis para o protótipo V1 no Encontro 3):
2. DEPOIS (Melhorias necessárias para as próximas semanas pós-workshop):
3. FUTURAMENTE (Simplificação ou criação de novas funcionalidades de longo prazo):`,
    variables: [
      { key: "NOME_PROJETO", label: "Nome do Projeto", placeholder: "Ex: ReciclaEscola" },
      { key: "MELHORIAS_DESEJADAS", label: "Melhorias e correções desejadas", placeholder: "Liste as correções e melhorias identificadas" }
    ]
  },
  {
    id: "p-pitch",
    title: "Construtor de Roteiro de Pitch",
    purpose: "Estruturar a apresentação do Pitch final",
    usageMoment: "Encontro 4 — COMUNICAR",
    category: "pitch",
    templateText: `Escreva o Roteiro do Pitch para a equipe do projeto "{{NOME_PROJETO}}".

Informações da trajetória:
- Problema e Diagnóstico: "{{PROBLEMA}}"
- Solução e Protótipo (V1): "{{SOLUCAO}}"
- Uso da IA como Parceira Cognitiva: "{{PAPEL_IA}}"
- Resultados dos Testes: "{{TESTES}}"
- Próximos Passos (Roadmap): "{{PROXIMO_PASSO}}"

Estruture o roteiro com clareza em 5 blocos:
1. O PROBLEMA E O DIAGNÓSTICO (O desafio real investigado)
2. A SOLUÇÃO E O PROTÓTIPO V1 (Como funciona e o valor gerado)
3. O USO DA IA E BOAS PRÁTICAS (Como a IA ajudou como parceira de reflexão)
4. RESULTADOS DOS TESTES (O que aprendemos com os usuários)
5. PRÓXIMOS PASSOS E ENCERRAMENTO (O roadmap e mensagem final)

Mantenha a contagem de palavras ajustada para uma apresentação clara e pausada (~350 palavras).`,
    variables: [
      { key: "NOME_PROJETO", label: "Nome do Projeto", placeholder: "Ex: ConectaJovem" },
      { key: "PROBLEMA", label: "Problema e Diagnóstico", placeholder: "Breve descrição do problema" },
      { key: "SOLUCAO", label: "Solução e Protótipo", placeholder: "O que a equipe construiu" },
      { key: "PAPEL_IA", label: "Papel da IA", placeholder: "Como a IA auxiliou na jornada" },
      { key: "TESTES", label: "Resultado dos Testes", placeholder: "Principais aprendizados dos testes" },
      { key: "PROXIMO_PASSO", label: "Próximos Passos", placeholder: "Roadmap e futuro do projeto" }
    ]
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Para quem é o workshop?",
    answer: "O workshop é destinado a jovens e estudantes de 12 a 17 anos."
  },
  {
    question: "É preciso saber programar para participar?",
    answer: "Não! O foco do workshop é a introdução prática e crítica à IA Generativa, formulação de boas perguntas, investigação de problemas e prototipação acessível com apoio da IA."
  },
  {
    question: "Quantos encontros e qual é a carga horária total?",
    answer: "São 12 horas totais, distribuídas em quatro encontros de três horas (presencial ou híbrido)."
  },
  {
    question: "Quantos participantes e como são organizados?",
    answer: "A oficina acolhe até 20 estudantes, organizados em até quatro equipes."
  },
  {
    question: "O workshop ensina apenas a usar ferramentas de IA?",
    answer: "Não. A formação não se limita a ensinar comandos. Desenvolvemos o pensamento crítico: formular boas perguntas, compreender problemas antes de buscar respostas, desconfiar de respostas simples, verificar informações, proteger dados pessoais e assumir responsabilidade pelas decisões."
  },
  {
    question: "Como é tratado o mapeamento individual de desafios?",
    answer: "O mapeamento dos desafios individuais é realizado de forma privada e não será recolhido ou avaliado, e os participantes não serão obrigados a compartilhar seu conteúdo."
  },
  {
    question: "Quais são os documentos produzidos ao longo dos 4 encontros?",
    answer: "As equipes produzem com apoio da IA: Briefing V0, PRD V0, definição do MVP, Protótipo V0, Business Model Canvas (BMC), Roadmap de evolução, Protótipo V1 e Roteiro de Pitch."
  },
  {
    question: "Quem é o facilitador do workshop?",
    answer: "Pedro Lago, fundador d'O Forno, gestor cultural, especialista no método TEvEP/HomoSapiens e criador da Fornologia."
  }
];
