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
  targetAudience: "jovens e estudantes de 13 a 17 anos (com consentimento parental)",
  capacity: "até 20 estudantes, organizados em até quatro equipes",
  
  objective: "Capacitar os jovens a reconhecer, investigar, planejar, prototipar, testar e comunicar soluções para problemas pessoais, estudantis, profissionais, escolares ou comunitários, utilizando boas práticas e ferramentas de Inteligência Artificial Generativa de maneira criativa, crítica, ética, consciente e responsável.\n\nAo longo da jornada, os participantes deverão aprender não apenas a utilizar ferramentas de IA, mas principalmente a utilizá-las como parceiras cognitivas: recursos capazes de ajudar a perguntar, investigar, organizar, comparar, criar, revisar e ampliar o pensamento, preservando a agência humana e a responsabilidade pelas decisões tomadas.",
  
  justificationText: `A Inteligência Artificial Generativa está se tornando parte da vida cotidiana de jovens e adultos. Na escola, em projetos ou no trabalho, ela já é utilizada para organizar informações, produzir textos, criar imagens e vídeos, planejar atividades, simular conversas, comparar possibilidades e apoiar a solução de problemas. O simples acesso a essas ferramentas, entretanto, não garante uma utilização consciente ou produtiva. Uma resposta bem escrita pode conter informações falsas. Uma recomendação aparentemente segura pode ignorar o contexto do usuário. Uma produção visual pode reproduzir estereótipos. Um estudante pode utilizar a IA para ampliar seu pensamento ou apenas para evitar o esforço de pensar. Por isso, a formação dos jovens não deve se limitar a ensinar comandos ou apresentar ferramentas. É necessário desenvolver a capacidade de:
● formular boas perguntas;
● fornecer contexto relevante;
● compreender problemas antes de buscar respostas;
● distinguir observações, hipóteses e dúvidas;
● desconfiar de respostas excessivamente simples;
● reconhecer quando uma informação precisa ser verificada;
● revisar e corrigir outputs;
● reconhecer os limites do próprio conhecimento e do conhecimento da IA;
● proteger dados pessoais e informações sensíveis;
● compreender o que está sendo delegado à tecnologia;
● assumir responsabilidade pelas decisões tomadas;
● utilizar a IA para ampliar, e não substituir, a própria capacidade de pensar;
● utilizar a tecnologia para criar valor para si e para outras pessoas.`,

  cognitivePartnerText: `A proposta deste workshop é apresentar a IA como uma parceira cognitiva, isto é, como um recurso que pode ajudar o estudante a planejar seu futuro, organizar seu presente, validar ideias, enxergar outras perspectivas, investigar possibilidades, revisar produções e construir soluções. A proposta também busca criar condições para que os estudantes não sejam apenas consumidores de tecnologia, mas usuários críticos, criadores responsáveis e participantes ativos das transformações sociais e profissionais. Vamos conduzir os participantes por uma jornada que vai desde o diagnóstico de desafios individuais e coletivos até a prototipação e comunicação de uma solução, fazendo uso consciente e ético da IA, cientes de seus potenciais e limitações.`,

  methodologyOverview: `Este workshop é uma introdução prática e crítica à Inteligência Artificial Generativa por meio da Aprendizagem Baseada em Problemas. A metodologia é guiada pelo princípio de que 'antes de construir uma solução, precisamos compreender suficientemente o problema'. A IA atua como parceira cognitiva em quatro grandes movimentos: Investigar, Definir e Materializar, Validar e Evoluir, e Comunicar. Nem toda atividade precisa de IA — momentos presenciais de discussão em equipe, observação e desenho são valorizados. As decisões humanas permanecem centrais em cada etapa, com base no Pacto de Revisão e Verificação e no princípio de Delegação Consciente. O fluxo pedagógico segue a estrutura Ensino → Exemplo → Experiência, assegurando protagonismo e prática autônoma dos participantes.`,

  expectedResults: [
    "Fazer uso consciente da Inteligência Artificial Generativa;",
    "Compreender a IA como ferramenta e parceira cognitiva, e não como autoridade absoluta;",
    "Conhecer e aplicar boas práticas de engenharia de prompt;",
    "Fornecer contexto relevante para melhorar uma interação com IA;",
    "Reconhecer situações em que não deve compartilhar dados pessoais ou informações sensíveis;",
    "Analisar, duvidar, questionar e checar respostas produzidas pela IA;",
    "Revisar, corrigir, aceitar ou rejeitar criticamente outputs;",
    "Compreender que respostas plausíveis podem conter erros, vieses ou informações inventadas;",
    "Reconhecer conscientemente quando pode confiar, quando deve verificar e quando precisa procurar outra fonte;",
    "Reconhecer situações em que pode pedir apoio à IA para tomar decisões e compreender os riscos dessa delegação;",
    "Assumir responsabilidade pelas decisões realizadas com apoio da tecnologia;",
    "Identificar problemas e desafios presentes em diferentes escalas da realidade;",
    "Distinguir observações, hipóteses e dúvidas;",
    "Investigar possíveis causas sem confundir hipótese com fato;",
    "Reconhecer quando uma investigação precisa de informações externas antes de continuar;",
    "Compreender quando é necessário investigar melhor um problema antes de propor uma solução;",
    "Utilizar PHD e Cinco Porquês como técnicas integradas de diagnóstico;",
    "Compreender o Golden Circle como ponte entre problema, propósito e direção de solução;",
    "Compreender a função de um Briefing, de um PRD, de um MVP, de um BMC e de um roadmap;",
    "Transformar uma investigação em uma proposta estruturada de solução;",
    "Priorizar funcionalidades e distinguir o essencial do desejável;",
    "Construir um MVP e um protótipo testável;",
    "Coletar, organizar e analisar feedback;",
    "Modificar uma solução com base em evidências produzidas por testes;",
    "Trabalhar em equipe com colaboração ativa;",
    "Comunicar um projeto de maneira clara em formato de pitch;",
    "Utilizar a Inteligência Artificial Generativa de maneira criativa, crítica, ética, consciente e responsável."
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
      "Diagnóstico do Problema (contexto, observações, hipóteses, dúvidas, causas-raiz e lacunas)",
      "Golden Circle (Por quê? Como? O quê?)"
    ]
  },
  {
    encounterId: 2,
    title: "Encontro 2 — DEFINIR E MATERIALIZAR",
    deliverables: [
      "Briefing V0",
      "Briefing V1 revisado",
      "PRD V0",
      "Definição do MVP",
      "Protótipo V0 testável"
    ]
  },
  {
    encounterId: 3,
    title: "Encontro 3 — VALIDAR E EVOLUIR",
    deliverables: [
      "Síntese dos feedbacks coletados",
      "Business Model Canvas (BMC)",
      "Roadmap de evolução",
      "Protótipo V1 aprimorado"
    ]
  },
  {
    encounterId: 4,
    title: "Encontro 4 — COMUNICAR",
    deliverables: [
      "Roteiro do pitch",
      "Apresentação visual",
      "Pitch final (3 minutos)"
    ]
  }
];

export const METHOD_TOOLS: MethodTool[] = [
  {
    id: "diagnostico",
    name: "Diagnóstico do Problema (PHD + 5 Porquês)",
    orientingQuestion: "O que está acontecendo e por quê?",
    description: "Integra enquadramento do problema, separação de fatos, hipóteses e dúvidas (PHD) e aprofundamento de causas-raiz (Cinco Porquês).",
    iconName: "Search"
  },
  {
    id: "ideias",
    name: "Banco de Ideias de Solução",
    orientingQuestion: "Quais soluções podem nascer desse diagnóstico?",
    description: "Espaço para registrar ideias que surgem durante a investigação sem desviar o foco da compreensão do problema.",
    iconName: "Zap"
  },
  {
    id: "golden-circle",
    name: "Golden Circle (Ponte Problema → Solução)",
    orientingQuestion: "Por quê? Como? O quê?",
    description: "Define o propósito essencial do projeto e a direção da solução antes de detalhar o produto final.",
    iconName: "Target"
  },
  {
    id: "briefing",
    name: "Briefing",
    orientingQuestion: "Qual é a síntese da nossa proposta de solução?",
    description: "Consolida a passagem da investigação para a solução, passando por revisão crítica de pares e IA.",
    iconName: "FileText"
  },
  {
    id: "prd",
    name: "PRD (Requisitos de Produto)",
    orientingQuestion: "Como a solução deverá funcionar?",
    description: "Especifica o funcionamento, priorizando funções essenciais (must have) e acessórias (nice to have).",
    iconName: "Cpu"
  },
  {
    id: "mvp",
    name: "MVP (Produto Mínimo Viável)",
    orientingQuestion: "Qual é a menor versão que podemos testar?",
    description: "Define a menor versão da solução que permite testar se a proposta principal funciona com usuários reais.",
    iconName: "LayoutGrid"
  },
  {
    id: "bmc",
    name: "BMC (Modelo de Sustentabilidade)",
    orientingQuestion: "Como garantimos viabilidade e continuidade?",
    description: "Mapeia segmentos atendidos, recursos necessários, parcerias comunitárias e sustentabilidade da proposta.",
    iconName: "BrainCircuit"
  },
  {
    id: "roadmap",
    name: "Roadmap de Evolução",
    orientingQuestion: "O que faremos agora, depois e futuramente?",
    description: "Planeja prioridades em 3 horizontes: ajustes imediatos para a V1, pós-workshop e longo prazo.",
    iconName: "MapPin"
  },
  {
    id: "pitch",
    name: "Roteiro e Apresentação de Pitch",
    orientingQuestion: "Como comunicar nossa trajetória com clareza?",
    description: "Estrutura o roteiro, suportes visuais e ensaios cronometrados para defender o projeto em 3 minutos.",
    iconName: "Presentation"
  }
];

export const ENCOUNTERS: Encounter[] = [
  {
    id: 1,
    title: "Encontro 1 — INVESTIGAR",
    subtitle: "Mapeamento de problemas, diagnóstico de causas-raiz e definição do propósito",
    objective: "Conhecer os participantes, alinhar expectativas, compreender como eles já utilizam a IA, estimular a observação de desafios individuais e coletivos, escolher um problema relevante, aprender a investigá-lo distinguindo observações, hipóteses e dúvidas, aprofundar suas possíveis causas e definir a direção inicial da solução por meio do Golden Circle.",
    totalDurationMinutes: 180,
    deliverable: "Diagnóstico do Problema (contexto, observações, hipóteses, dúvidas, causas-raiz e lacunas) e Golden Circle (Por quê? Como? O quê?).",
    homeworkMission: "Missão entre encontros: observar o problema escolhido no cotidiano e realizar escuta empática com 2 a 3 pessoas afetadas para testar as hipóteses da equipe.",
    activities: [
      {
        id: "e1-a1",
        title: "Abertura, Acolhimento e Rapport",
        durationMinutes: 15,
        description: "Acolhimento da turma, alinhamento inicial e acordos de convivência e aprendizado.",
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
          "Abertura e acolhimento realizados",
          "Acordos de convivência estabelecidos"
        ]
      },
      {
        id: "e1-a2",
        title: "Apresentação dos Participantes e Diagnóstico de IA",
        durationMinutes: 25,
        description: "Diagnóstico inicial sobre como os participantes já utilizam e percebem a Inteligência Artificial.",
        whatIsIt: "Mapeamento da familiaridade prévia da turma com ferramentas generativas e percepções de uso.",
        whyDoIt: "Calibrar o nível de aprofundamento e desmistificar o papel da IA desde o início.",
        howToApply: [
          "Compartilhe suas experiências prévias com IA (estudos, lazer, criação).",
          "Reflita sobre os limites do conhecimento próprio vs. da IA."
        ],
        socraticQuestions: [
          "Quando você usa IA hoje, você costuma aceitar a primeira resposta ou costuma questionar?",
          "Quais cuidados devemos ter ao confiar em respostas geradas por IA?"
        ],
        facilitatorInstructions: "Conduza a rodada de apresentações estimulando sinceridade sobre o uso atual de IA.",
        checklist: [
          "Apresentação de todos os participantes",
          "Diagnóstico de familiaridade com IA concluído"
        ]
      },
      {
        id: "e1-a3",
        title: "Apresentação da Jornada e Princípios de Uso Consciente",
        durationMinutes: 20,
        description: "Apresentação da jornada metodológica, IA como parceira cognitiva, pacto de revisão e delegação consciente.",
        whatIsIt: "Apresentação conceitual do funcionamento da IA Generativa, seus limites, alucinações, vieses e o uso ético como parceira cognitiva.",
        whyDoIt: "Evitar o uso ingênuo ou preguiçoso da tecnologia, enfatizando que a IA auxilia, mas não substitui o pensamento crítico.",
        howToApply: [
          "Compreenda a IA como Parceira Cognitiva (perguntar, investigar, organizar, comparar, criar, revisar e ampliar).",
          "Conheça as regras de ouro: não compartilhar dados sensíveis, duvidar de respostas fáceis, checar fatos e assumir responsabilidade."
        ],
        socraticQuestions: [
          "Qual é a diferença entre usar a IA para pensar com você vs. usar a IA para pensar por você?",
          "Por que uma resposta bem escrita pela IA não é necessariamente verdadeira?"
        ],
        facilitatorInstructions: "Apresente exemplos práticos de alucinações e vieses da IA. Destaque enfaticamente a regra de proteção de dados pessoais (LGPD Art. 14).",
        checklist: [
          "Princípios de uso consciente e parceira cognitiva apresentados",
          "Regras de proteção de dados e privacidade reforçadas"
        ],
        suggestedPromptIds: ["p-reflexao-socratica", "p-verificacao-fatos"]
      },
      {
        id: "e1-a4",
        title: "Mapeamento Íntimo dos Desafios",
        durationMinutes: 10,
        description: "Exercício individual de reflexão estritamente privado (não recolhido, não avaliado e sem envio para servidores).",
        whatIsIt: "Exercício individual de reflexão sobre incômodos e desafios que o estudante vivencia diariamente.",
        whyDoIt: "Conectar o aprendizado com a vida real dos participantes, exercitando a auto-observação com privacidade total.",
        howToApply: [
          "Escreva para si mesmo no seu caderno ou no mapa privado do navegador.",
          "Mapeie desafios pessoais de forma livre, íntima e honesta."
        ],
        socraticQuestions: [
          "Quais pequenas frustrações diárias consomem sua energia ou tempo sem que você perceba?",
          "O que você gostaria que funcionasse melhor na sua rotina estudantil ou pessoal?"
        ],
        facilitatorInstructions: "Reforce enfaticamente: O mapeamento dos desafios individuais é estritamente íntimo e privado. Não será recolhido nem avaliado.",
        checklist: [
          "Garantia explícita de privacidade reforçada",
          "Mapeamento individual íntimo realizado"
        ]
      },
      {
        id: "e1-a5",
        title: "Mapeamento Coletivo e Escolha do Problema",
        durationMinutes: 30,
        description: "Movimento de zoom social: indivíduo → família → quarteirão → bairro → escola/comunidade e escolha do desafio da equipe.",
        whatIsIt: "Levantamento em equipe de problemas compartilhados na escola ou na comunidade com escolha coletiva consciente.",
        whyDoIt: "Transitar da reflexão individual para o engajamento comunitário e formação das equipes de trabalho.",
        howToApply: [
          "Reúna-se em equipe (organizados em até quatro equipes de até 5 pessoas).",
          "Explore problemas em diferentes escalas da realidade.",
          "Escolha democraticamente o problema que a equipe deseja investigar."
        ],
        socraticQuestions: [
          "Quais problemas afetam não apenas você, mas seus colegas, escola ou vizinhança?",
          "Quem são as pessoas reais que sofrem diretamente com esse desafio?"
        ],
        facilitatorInstructions: "Ajude na formação de até quatro equipes. Estimule a escolha de desafios reais e comunitários.",
        checklist: [
          "Até 4 equipes formadas",
          "Problema de trabalho escolhido pela equipe"
        ],
        relatedDocumentStep: "desafioColetivo"
      },
      {
        id: "e1-a6",
        title: "Pausa / Lanche",
        durationMinutes: 15,
        description: "Intervalo para descanso, alimentação e convivência entre participantes.",
        whatIsIt: "Momento de descompressão e troca informal entre os estudantes e o facilitador.",
        whyDoIt: "Garantir a energia e o foco para a etapa de diagnóstico aprofundado.",
        howToApply: ["Aproveite para conversar com colegas e recarregar a atenção."],
        socraticQuestions: ["Como a pausa ajuda a clarear nossas ideias sobre o problema?"],
        facilitatorInstructions: "Garanta o cumprimento exato do tempo de 15 minutos para retornar ao trabalho.",
        checklist: ["Pausa para lanche realizada"]
      },
      {
        id: "e1-a7",
        title: "Diagnóstico do Problema (PHD + Cinco Porquês)",
        durationMinutes: 35,
        description: "Integração do enquadramento, exercício PHD (Problemas, Hipóteses, Dúvidas) e técnica dos Cinco Porquês com apoio socrático da IA.",
        whatIsIt: "Análise profunda para diferenciar fatos observados, hipóteses e dúvidas, descendo até a causa-raiz com apoio da IA.",
        whyDoIt: "Evitar tentar resolver o problema errado ou atuar apenas nos sintomas superficiais.",
        howToApply: [
          "Preencha o quadro de Diagnóstico integrando contexto, fatos, hipóteses e dúvidas (PHD).",
          "Aplique os Cinco Porquês para investigar as causas estruturais.",
          "Registre no Banco de Ideias qualquer solução que surgir espontaneamente, voltando imediatamente ao problema."
        ],
        socraticQuestions: [
          "Isso que identificamos é um fato comprovado ou uma hipótese que achamos provável?",
          "Se resolvermos essa causa, o problema diminui ou apenas muda de lugar?"
        ],
        facilitatorInstructions: "Oriente as equipes a separarem o que é Fato do que é Hipótese ou Dúvida a checar.",
        checklist: [
          "Quadro PHD preenchido",
          "Aprofundamento de causas-raiz (Cinco Porquês) realizado",
          "Diagnóstico consolidado da equipe"
        ],
        suggestedPromptIds: ["p-phd", "p-cinco-porques"],
        relatedDocumentStep: "phd"
      },
      {
        id: "e1-a8",
        title: "Golden Circle (Propósito & Direção)",
        durationMinutes: 20,
        description: "Ponte entre problema e solução: definição do Por Quê? Como? O Quê?",
        whatIsIt: "Ferramenta de alinhamento de propósito começando pela motivação fundamental.",
        whyDoIt: "Unir a equipe em torno do Por Quê antes de definir O Quê construir.",
        howToApply: [
          "Defina o POR QUÊ: Por que esse problema precisa ser resolvido?",
          "Defina o COMO: Quais valores e princípios guiarão nossa atuação?",
          "Defina o O QUÊ: Qual é a direção inicial da solução?"
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
        id: "e1-a9",
        title: "Consolidação, Compartilhamento e Missão",
        durationMinutes: 10,
        description: "Fechamento do encontro, compartilhamento dos propósitos e orientação para a missão de escuta em campo.",
        whatIsIt: "Consolidação dos aprendizados do dia e preparação para escuta empática com pessoas reais.",
        whyDoIt: "Testar hipóteses do diagnóstico com pessoas reais fora da sala de aula antes do Encontro 2.",
        howToApply: [
          "Compartilhe o propósito da equipe em 1 minuto.",
          "Converse informalmente com 2 a 3 pessoas afetadas até o próximo encontro."
        ],
        socraticQuestions: ["O que queremos confirmar ao conversar com quem vivencia esse problema?"],
        facilitatorInstructions: "Oriente que não é um formulário rígido, mas uma conversa acolhedora de escuta.",
        checklist: [
          "Compartilhamento dos propósitos concluído",
          "Missão entre encontros combinada"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Encontro 2 — DEFINIR E MATERIALIZAR",
    subtitle: "Construção do Briefing, PRD, definição do MVP e início do Protótipo",
    objective: "Transformar a investigação realizada no primeiro encontro em uma proposta concreta de solução. Por meio da construção e revisão do Briefing, da elaboração de um PRD simplificado, da definição do MVP e da criação do Protótipo, os participantes organizarão o projeto, definirão o que a solução precisa fazer, priorizarão o essencial e materializarão uma primeira versão testável.",
    totalDurationMinutes: 180,
    deliverable: "Briefing, PRD, MVP e Protótipo",
    homeworkMission: "Missão entre encontros: realizar testes práticos do Protótipo com familiares, amigos e potenciais usuários, coletando percepções e dúvidas reais.",
    activities: [
      {
        id: "e2-a1",
        title: "Retrospectiva Compartilhada",
        durationMinutes: 15,
        description: "Abertura com partilha das observações de campo e aprendizados mais marcantes da missão entre encontros.",
        whatIsIt: "Abertura com partilha do aprendizado do Encontro 1 e relatos da escuta em campo.",
        whyDoIt: "Reconectar os participantes com o diagnóstico e enriquecer o projeto com dados reais da comunidade.",
        howToApply: ["Compartilhe em 1 minuto uma observação marcante da missão de escuta."],
        socraticQuestions: ["O que vocês ouviram das pessoas que alterou ou confirmou sua visão inicial?"],
        facilitatorInstructions: "Acolha as percepções trazidas da comunidade e conecte com a escrita do Briefing.",
        checklist: ["Retrospectiva compartilhada realizada"]
      },
      {
        id: "e2-a2",
        title: "Recapitulação Operacional e Demonstração",
        durationMinutes: 10,
        description: "Revisão dos conceitos de Briefing, PRD e MVP com demonstração mínima de apoio da IA.",
        whatIsIt: "Alinhamento operacional antes da escrita dos documentos técnicos do projeto.",
        whyDoIt: "Garantir clareza sobre o papel da IA como parceira de estruturação e escrita.",
        howToApply: ["Revise as ferramentas do app e tire dúvidas residuais."],
        socraticQuestions: ["Como o Briefing nos ajuda a não perder o foco do problema investigado?"],
        facilitatorInstructions: "Faça uma demonstração rápida e prática da ferramenta.",
        checklist: ["Recapitulação operacional concluída"]
      },
      {
        id: "e2-a3",
        title: "Construção do Briefing V0",
        durationMinutes: 30,
        description: "Elaboração do Briefing V0: síntese do problema, público afetado, causas-raiz, propósito e proposta de solução.",
        whatIsIt: "Construção do Briefing V0 estruturando o problema, contexto, causas-raiz e proposta de solução.",
        whyDoIt: "Ancorar o projeto em uma descrição clara e fundamentada da intenção da equipe.",
        howToApply: [
          "Preencha os campos do Briefing V0 na Área do Projeto.",
          "Defina o problema, público, causas-raiz e proposta de solução."
        ],
        socraticQuestions: ["Se alguém lesse nosso Briefing agora, entenderia exatamente POR QUÊ a solução existe?"],
        facilitatorInstructions: "Acompanhe as equipes garantindo objetividade na escrita.",
        checklist: ["Briefing V0 elaborado pela equipe"],
        suggestedPromptIds: ["p-briefing"],
        relatedDocumentStep: "briefing"
      },
      {
        id: "e2-a4",
        title: "Revisão Crítica e Briefing V1",
        durationMinutes: 20,
        description: "Revisão do Briefing: revisão por pares, revisão crítica com IA e consolidação do Briefing V1.",
        whatIsIt: "Processo estruturado para lapidar a clareza, coerência e qualidade do Briefing.",
        whyDoIt: "Exercitar a checagem crítica, escuta de pares e o uso da IA para revisão de documentos.",
        howToApply: [
          "Troque o Briefing com outra equipe para revisão por pares.",
          "Submeta ao prompt de revisão da IA para checar ambiguidades e lacunas.",
          "Consolide o Briefing V1 da equipe."
        ],
        socraticQuestions: [
          "A crítica do outro grupo fez sentido? O que a IA apontou que nós não tínhamos notado?"
        ],
        facilitatorInstructions: "Oriente as etapas de revisão de forma ágil e colaborativa.",
        checklist: [
          "Revisão por pares concluída",
          "Revisão com IA concluída",
          "Briefing V1 consolidado"
        ],
        suggestedPromptIds: ["p-verificacao-fatos"]
      },
      {
        id: "e2-a5",
        title: "Pausa / Lanche",
        durationMinutes: 15,
        description: "Intervalo para descanso e recarregamento de energia.",
        whatIsIt: "Intervalo para lanche e descanso da turma.",
        whyDoIt: "Manter a energia e o foco intelectual para a fase de especificação do PRD e prototipagem.",
        howToApply: ["Aproveite o lanche para descansar."],
        socraticQuestions: ["Como a pausa nos ajuda a olhar nosso texto com distanciamento crítico?"],
        facilitatorInstructions: "Mantenha o tempo rigoroso de 15 minutos.",
        checklist: ["Pausa para o lanche realizada"]
      },
      {
        id: "e2-a6",
        title: "Do Briefing ao PRD (Requisitos de Produto)",
        durationMinutes: 25,
        description: "Especificação de funcionamento da solução: separação de requisitos essenciais (must have) e desejáveis (nice to have).",
        whatIsIt: "Elaboração do PRD V0 especificando o funcionamento e separando requisitos.",
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
        title: "Do PRD ao MVP (Produto Mínimo Viável)",
        durationMinutes: 15,
        description: "Definição do escopo do MVP: a menor versão da solução que permite testar a proposta com usuários reais.",
        whatIsIt: "Definição do escopo enxuto do MVP para teste imediato.",
        whyDoIt: "Focar em validar o núcleo de valor sem perder tempo em detalhes secundários.",
        howToApply: [
          "Responda: Qual é a menor versão que podemos testar?",
          "Defina os critérios de validação do teste."
        ],
        socraticQuestions: ["O que é o mínimo absoluto necessário para validar se as pessoas querem essa solução?"],
        facilitatorInstructions: "Estimule o descarte de detalhes secundários para o protótipo inicial.",
        checklist: ["Definição do MVP registrada"],
        suggestedPromptIds: ["p-mvp"],
        relatedDocumentStep: "mvp"
      },
      {
        id: "e2-a8",
        title: "Sprint de Construção do Protótipo V0",
        durationMinutes: 45,
        description: "Construção prática da versão V0 do protótipo (digital no-code, papel, chatbot, telas, roteiro ou fluxo funcional).",
        whatIsIt: "Mão na massa: construção da versão V0 do protótipo com apoio da IA.",
        whyDoIt: "Tornar a solução tangível e pronta para ser mostrada a usuários reais.",
        howToApply: [
          "Use ferramentas no-code, IA ou materiais visuais para construir o Protótipo V0.",
          "Garanta que o protótipo permita demonstrar o valor principal em poucos minutos."
        ],
        socraticQuestions: ["O protótipo permite que um usuário experimente a ideia sem precisarmos explicar tudo?"],
        facilitatorInstructions: "Circule pelas mesas dando suporte prático de criação e uso de ferramentas.",
        checklist: ["Protótipo V0 construído e testável"],
        suggestedPromptIds: ["p-mvp"],
        relatedDocumentStep: "prototype"
      },
      {
        id: "e2-a9",
        title: "Missão entre Encontros: Testar e Colher Feedbacks",
        durationMinutes: 5,
        description: "Orientações para aplicação de testes do Protótipo V0 com familiares, amigos e pessoas do público-alvo.",
        whatIsIt: "Instruções para realizar testes do Protótipo V0 com familiares, amigos e usuários reais.",
        whyDoIt: "Coletar dados reais de uso para alimentar o ciclo de aprimoramento do Encontro 3.",
        howToApply: [
          "Mostre o Protótipo V0 para 2 a 3 pessoas.",
          "Anote dúvidas, confusões e sugestões sem defender o produto."
        ],
        socraticQuestions: ["Por que ouvir onde o usuário se confundiu é mais valioso do que ouvir apenas elogios?"],
        facilitatorInstructions: "Encoraje os alunos a prestarem atenção no comportamento real do usuário ao testar.",
        checklist: [
          "Missão de testes e feedbacks explicitada",
          "Alinhamento para o Encontro 3 concluído"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Encontro 3 — VALIDAR E EVOLUIR",
    subtitle: "Análise de feedbacks, Modelo de Sustentabilidade (BMC), Roadmap e Protótipo V1",
    objective: "Testar criticamente a primeira versão da solução, compreender os feedbacks recebidos, analisar aspectos necessários para sua continuidade e sustentabilidade, planejar sua evolução e desenvolver uma versão aprimorada do protótipo.",
    totalDurationMinutes: 180,
    deliverable: "Síntese dos feedbacks coletados; Business Model Canvas (BMC); Roadmap de evolução; Protótipo V1 aprimorado.",
    homeworkMission: "Missão entre encontros: refletir sobre a trajetória completa do projeto e reunir evidências, imagens e telas para a criação do Pitch no Encontro 4.",
    activities: [
      {
        id: "e3-a1",
        title: "Retrospectiva Compartilhada",
        durationMinutes: 15,
        description: "Abertura com partilha das experiências de testes e primeiras impressões da missão em campo.",
        whatIsIt: "Abertura com destaques do processo de testes do Protótipo V0.",
        whyDoIt: "Reconectar a turma com as evidências empíricas de uso da solução.",
        howToApply: ["Partilhe a reação mais surpreendente de quem testou seu protótipo."],
        socraticQuestions: ["O que mudou na percepção da equipe após ver alguém usando o protótipo?"],
        facilitatorInstructions: "Acolha a turma e prepare o terreno para a análise de dados e BMC.",
        checklist: ["Retrospectiva compartilhada concluída"]
      },
      {
        id: "e3-a2",
        title: "Síntese dos Testes e Feedbacks",
        durationMinutes: 20,
        description: "Organização estruturada dos feedbacks: o que funcionou bem, pontos de confusão, bugs críticos e sugestões futuras.",
        whatIsIt: "Compartilhamento e categorização dos resultados dos testes com usuários reais.",
        whyDoIt: "Basear as decisões de evolução em evidências concretas de uso real.",
        howToApply: [
          "Organize os feedbacks em: Funcionou Bem, Pontos de Confusão, Erros/Bugs e Sugestões.",
          "Use a IA para ajudar a identificar padrões nas respostas."
        ],
        socraticQuestions: ["O que os testes mostraram que a equipe não tinha previsto?"],
        facilitatorInstructions: "Ajude as equipes a acolherem o feedback com maturidade e sem atitude defensiva.",
        checklist: ["Síntese de feedbacks estruturada"],
        suggestedPromptIds: ["p-analise-feedback"],
        relatedDocumentStep: "feedback"
      },
      {
        id: "e3-a3",
        title: "Business Model Canvas (BMC - Sustentabilidade)",
        durationMinutes: 25,
        description: "Mapeamento do modelo de sustentabilidade: proposta de valor, segmentos, parcerias comunitárias, recursos e viabilidade.",
        whatIsIt: "Elaboração do BMC mapeando viabilidade, parcerias, recursos e sustentabilidade comunitária.",
        whyDoIt: "Avaliar e ampliar as condições de viabilidade e permanência da solução.",
        howToApply: [
          "Mapeie os segmentos atendidos, recursos necessários e parcerias-chave.",
          "Defina o modelo de sustentabilidade da proposta."
        ],
        socraticQuestions: ["Quem são os parceiros na comunidade ou escola que podem ajudar esse projeto a continuar existindo?"],
        facilitatorInstructions: "Explique que sustentabilidade envolve parcerias, apoio comunitário e recursos locais.",
        checklist: ["BMC preenchido na Área do Projeto"],
        suggestedPromptIds: ["p-bmc"],
        relatedDocumentStep: "bmc"
      },
      {
        id: "e3-a4",
        title: "Roadmap de Evolução",
        durationMinutes: 20,
        description: "Planejamento dos próximos passos em 3 horizontes: Agora (ajustes da V1), Depois (pós-workshop) e Futuramente (longo prazo).",
        whatIsIt: "Elaboração do Roadmap priorizando tarefas em Agora, Depois e Futuramente.",
        whyDoIt: "Aprender a priorizar o que ajustar imediatamente vs. o que fica para etapas futuras.",
        howToApply: [
          "Classifique as tarefas: Agora (durante a oficina), Depois e Futuramente.",
          "Defina as correções e melhorias essenciais para a versão V1."
        ],
        socraticQuestions: ["O que é prioritário ajustar antes de demonstrar o protótipo no Pitch?"],
        facilitatorInstructions: "Reforce que a coluna 'Agora' deve conter apenas o que dá para executar na sprint de hoje.",
        checklist: ["Roadmap de evolução planejado"],
        suggestedPromptIds: ["p-roadmap"],
        relatedDocumentStep: "roadmap"
      },
      {
        id: "e3-a5",
        title: "Pausa / Lanche",
        durationMinutes: 15,
        description: "Pausa para descanso e alimentação.",
        whatIsIt: "Pausa para descanso e alimentação dos jovens.",
        whyDoIt: "Renovar a concentração para a sprint intensiva de aprimoramento do protótipo.",
        howToApply: ["Descanse e troque ideias com outras equipes."],
        socraticQuestions: ["Como o repouso estimula novas conexões para resolver problemas?"],
        facilitatorInstructions: "Garanta o retorno no horário.",
        checklist: ["Pausa para o lanche realizada"]
      },
      {
        id: "e3-a6",
        title: "Sprint de Aprimoramento — Protótipo V1",
        durationMinutes: 70,
        description: "Desenvolvimento da versão aprimorada V1 com base nos feedbacks coletados, no BMC e no roadmap.",
        whatIsIt: "Sessão intensiva de refinamento do protótipo corrigindo erros e elevando o acabamento.",
        whyDoIt: "Entregar uma versão V1 aprimorada e pronta para demonstração pública no Pitch.",
        howToApply: [
          "Aplique os ajustes definidos na coluna 'Agora' do Roadmap.",
          "Utilize a IA para aprimorar textos, fluxos, interfaces e elementos visuais."
        ],
        socraticQuestions: ["Como a versão V1 está mais intuitiva e robusta do que a versão V0?"],
        facilitatorInstructions: "Passe nas bancadas apoiando a execução das melhorias prioritárias.",
        checklist: ["Protótipo V1 aprimorado com sucesso"],
        relatedDocumentStep: "prototype"
      },
      {
        id: "e3-a7",
        title: "Compartilhamento e Perguntas",
        durationMinutes: 10,
        description: "Espaço aberto para partilha rápida dos avanços do Protótipo V1 e esclarecimento de dúvidas.",
        whatIsIt: "Espaço para esclarecer dúvidas sobre os protótipos, BMC e Roadmap.",
        whyDoIt: "Garantir que todas as equipes consolidem sua versão V1 sem impedimentos.",
        howToApply: ["Tire dúvidas pontuais com o facilitador."],
        socraticQuestions: ["O que ainda precisa de atenção no nosso protótipo V1?"],
        facilitatorInstructions: "Apoie as equipes com dúvidas pendentes.",
        checklist: ["Dúvidas esclarecidas"]
      },
      {
        id: "e3-a8",
        title: "Missão e Alinhamento Final",
        durationMinutes: 5,
        description: "Preparação para o encontro final de comunicação, roteiro de pitch e celebração.",
        whatIsIt: "Instruções de preparação para a escrita do Pitch no Encontro 4.",
        whyDoIt: "Preparar o espírito da equipe para a comunicação final do projeto.",
        howToApply: ["Reflita sobre a história do projeto desde a investigação inicial."],
        socraticQuestions: ["Como resumir a nossa jornada em uma narrativa clara e envolvente?"],
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
    objective: "Aprender a organizar e comunicar a trajetória do projeto, apresentando com clareza o problema, a investigação, a solução, o papel da IA, os resultados dos testes, as mudanças realizadas e os próximos passos.",
    totalDurationMinutes: 180,
    deliverable: "Roteiro do pitch; Apresentação visual; Pitch final (3 minutos).",
    homeworkMission: "Celebração do encerramento e continuidade da aplicação consciente e ética da IA na vida estudantil, profissional e comunitária.",
    activities: [
      {
        id: "e4-a1",
        title: "Retrospectiva Compartilhada",
        durationMinutes: 15,
        description: "Abertura do dia final, celebração da jornada percorrida e sorteio da ordem dos pitches.",
        whatIsIt: "Abertura do dia final recapitulando a evolução desde a investigação até o Protótipo V1.",
        whyDoIt: "Criar o clima de celebração e prontidão para a comunicação dos projetos.",
        howToApply: ["Partilhe o sentimento de chegar ao encontro de apresentações."],
        socraticQuestions: ["Qual foi a maior transformação do projeto do Encontro 1 até agora?"],
        facilitatorInstructions: "Acolha a turma e estabeleça o sorteio das apresentações.",
        checklist: ["Retrospectiva compartilhada concluída"]
      },
      {
        id: "e4-a2",
        title: "Criação do Roteiro do Pitch",
        durationMinutes: 30,
        description: "Estruturação da fala de 3 minutos: problema, diagnóstico, solução, papel da IA, testes, mudanças e próximos passos.",
        whatIsIt: "Elaboração da fala do Pitch estruturando a narrativa com apoio da ferramenta.",
        whyDoIt: "Comunicar com clareza o problema, solução, papel da IA e resultados dentro do tempo.",
        howToApply: [
          "Preencha a estrutura do Roteiro de Pitch no aplicativo.",
          "Verifique a clareza e a duração estimada da fala (~3 minutos)."
        ],
        socraticQuestions: ["Como prender a atenção do público nos primeiros 20 segundos de apresentação?"],
        facilitatorInstructions: "Supervisione a clareza da narrativa e o limite de tempo.",
        checklist: ["Roteiro do pitch finalizado"],
        suggestedPromptIds: ["p-pitch"],
        relatedDocumentStep: "pitch"
      },
      {
        id: "e4-a3",
        title: "Criação da Apresentação do Pitch",
        durationMinutes: 30,
        description: "Montagem dos suportes visuais: telas do Protótipo V1, síntese do problema e próximos passos.",
        whatIsIt: "Montagem dos suportes visuais de apoio para a fala.",
        whyDoIt: "Oferecer suporte visual impactante para quem assiste ao Pitch.",
        howToApply: [
          "Selecione telas ou links do Protótipo V1 para demonstrar.",
          "Mantenha os slides limpos e focados na solução real."
        ],
        socraticQuestions: ["Os suportes visuais ajudam a demonstrar o valor do projeto sem poluição visual?"],
        facilitatorInstructions: "Incentive poucos slides e foco na demonstração real.",
        checklist: ["Apresentação do pitch montada"]
      },
      {
        id: "e4-a4",
        title: "Pausa / Lanche",
        durationMinutes: 15,
        description: "Intervalo para descanso e concentração antes dos ensaios cronometrados.",
        whatIsIt: "Intervalo para lanche e concentração das equipes antes dos ensaios.",
        whyDoIt: "Aliviar o nervosismo e recarregar energias para os ensaios.",
        howToApply: ["Aproveite para relaxar e beber água."],
        socraticQuestions: ["Como a respiração ajuda a controlar a ansiedade antes da fala pública?"],
        facilitatorInstructions: "Retorne pontualmente em 15 minutos.",
        checklist: ["Pausa para o lanche realizada"]
      },
      {
        id: "e4-a5",
        title: "Ensaios e Revisão Crítica do Pitch",
        durationMinutes: 30,
        description: "Simulações cronometradas de 3 minutos com feedback entre pares e refinamento da oratória.",
        whatIsIt: "Ensaio geral das equipes com marcação rigorosa de tempo e dicas de oratória.",
        whyDoIt: "Garantir fluidez, boa postura e respeito ao tempo estipulado.",
        howToApply: [
          "Ensaie o pitch utilizando o cronômetro do app.",
          "Ajuste a divisão de falas entre os integrantes da equipe."
        ],
        socraticQuestions: ["A fala coube confortavelmente nos 3 minutos sem precisar correr?"],
        facilitatorInstructions: "Use o cronômetro oficial do app para marcar o ensaio de cada equipe.",
        checklist: ["Ensaios com cronômetro realizados"]
      },
      {
        id: "e4-a6",
        title: "Apresentação dos Pitches",
        durationMinutes: 30,
        description: "Apresentação oficial de cada equipe (3 min de pitch + 3 min de comentários/perguntas).",
        whatIsIt: "Apresentação oficial dos projetos desenvolvidos ao longo das 12 horas.",
        whyDoIt: "Desenvolver oratória, autoconfiança e valorizar a conquista de cada equipe.",
        howToApply: [
          "Apresente o Pitch da equipe com clareza e entusiasmo.",
          "Demonstre o protótipo V1 e receba os aplausos e feedbacks."
        ],
        socraticQuestions: ["Como demonstrar o orgulho da jornada percorrida pela equipe?"],
        facilitatorInstructions: "Medie as apresentações, mantendo o tempo rigoroso e celebrando cada entrega.",
        checklist: ["Apresentações dos pitches de todas as equipes realizadas"]
      },
      {
        id: "e4-a7",
        title: "Retrospectiva Final, Depoimentos e Celebração",
        durationMinutes: 30,
        description: "Rodada de reflexão final, depoimentos dos estudantes, foto oficial da turma e celebração.",
        whatIsIt: "Fechamento festivo da jornada do workshop com depoimentos, registro fotográfico e celebração.",
        whyDoIt: "Consolidar a experiência, celebrar as conquistas e encerrar o workshop com impacto duradouro.",
        howToApply: [
          "Partilhe um depoimento sobre o seu aprendizado e uso consciente da IA.",
          "Participe da foto oficial da turma e comemore!"
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
    templateText: `Atue como um questionador socrático experiente e acolhedor para jovens de 13 a 17 anos. 
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
    answer: "O workshop é destinado a jovens e estudantes de 13 a 17 anos."
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
