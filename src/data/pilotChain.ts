import { ActivityV2 } from '../types/workshop';
import { OFFICIAL_PROMPTS_V3, OFFICIAL_PROMPTS_BY_CANONICAL_ID } from './officialPrompts';

export const PILOT_CHAIN_ACTIVITIES: ActivityV2[] = [
  // ==========================================
  // MOVIMENTO 1: INVESTIGAR (ENCONTRO 1)
  // ==========================================
  {
    id: 'E1-A00',
    encounterId: 1,
    movementId: 'investigar',
    movementTitle: '1. Investigar',
    title: 'Mapeamento Coletivo de Problemas & Escolha no Mapa',
    durationMinutes: 20,
    type: 'presencial',
    isPresencial: true,
    requiresArtifact: false,
    pedagogicalIntervention: {
      principle: 'INCERTEZA',
      tag: 'INCERTEZA & TERRITÓRIO',
      message: 'Não sabemos também é um resultado útil. Dúvidas genuínas apontam exatamente o que a equipe deve investigar.'
    },
    youAreHere: {
      encounterTitle: '1. Investigar • Encontro 1',
      positionInSequence: 'Atividade Inicial: Brainstorm & Escolha no Mapa',
      progressPercent: 5,
    },
    whyItMatters: 'Antes de iniciar a investigação estruturada com a IA, a equipe realiza um brainstorm coletivo no mundo real, consulta o Mapa de Problemas da oficina e escolhe conscientemente o território inicial de trabalho.',
    youWillNeed: {
      required: [],
      optional: ['Mapa de Problemas da oficina', 'Post-its ou anotações livres da equipe'],
    },
    whatToDo: [
      'Façam uma rodada aberta de escuta e chuva de ideias sobre os problemas observados na escola, comunidade ou cotidiano.',
      'Consultem o Mapa de Problemas integrado para se inspirar ou registrem um novo problema desafiador da equipe.',
      'Escolham coletivamente o foco de problema prioritário que a equipe deseja investigar a fundo.',
      'Transfiram o problema escolhido diretamente para o Diagnóstico do Problema para iniciar a jornada digital.',
    ],
    metacognitiveReflection: 'O problema que escolhemos afeta pessoas reais e desperta o interesse genuíno da equipe em investigar?',
    handoff: {
      producedArtifactName: 'Foco de Problema Escolhido no Mapa',
      nowWeKnow: 'Qual problema do território a equipe decidiu investigar coletivamente.',
      stillOpen: 'A formulação precisa do problema, a separação entre fatos e hipóteses e suas causas profundas.',
      nextActivityId: 'E1-A01',
      nextActivityTitle: 'Diagnóstico do Problema',
      nextActivityPurpose: 'Enquadrar o problema, separar rigorosamente fatos, hipóteses e dúvidas e aprofundar possíveis causas.',
      contextPassedAhead: ['Foco de problema escolhido pela equipe'],
    },
  },

  {
    id: 'E1-A01',
    encounterId: 1,
    movementId: 'investigar',
    movementTitle: '1. Investigar',
    title: 'Diagnóstico do Problema',
    durationMinutes: 35,
    type: 'digital',
    pedagogicalIntervention: {
      principle: 'HIPOTESE',
      tag: 'HIPÓTESE & INCERTEZA',
      message: 'Uma explicação plausível ainda pode ser apenas uma hipótese. "Não sabemos" também é um resultado útil que vira algo para investigar.'
    },
    youAreHere: {
      encounterTitle: '1. Investigar • Encontro 1',
      positionInSequence: 'Atividade 1 de 3 (Digital)',
      progressPercent: 10,
    },
    whyItMatters: 'Unifica o enquadramento do problema, a separação rigorosa em fatos observados, hipóteses causais e dúvidas a checar, e a investigação causal em uma única unidade cognitiva consistente.',
    youWillNeed: {
      required: [],
      optional: ['Problema selecionado no Mapa de Problemas ou no Mapeamento Coletivo'],
    },
    whatToDo: [
      'Apresente à IA o problema ou situação inicial que a equipe escolheu investigar no Mapa de Problemas.',
      'Classifique os elementos trazidos em fatos observados, hipóteses causais e dúvidas a checar.',
      'Investigue as possíveis causas até o limite das evidências reais sem aceitar suposições como fatos.',
      'Estacione soluções prematuras e consolide o Diagnóstico do Problema V0.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P01.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P01.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P01.promptText,
      contextPackConfig: {
        snapshotFields: ['problem', 'audience', 'keyObservations', 'openQuestions'],
      },
    },
    expectedArtifactId: 'diagnostico',
    expectedVersionName: 'Diagnóstico do Problema V0',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'problem', label: 'Problema investigado', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Síntese clara e neutra do problema diagnosticado' },
        { targetField: 'keyObservations', label: 'Principais observações e fatos (P)', defaultEpistemologicalStatus: 'OBSERVADO', description: 'Evidências e fenômenos concretos observados' },
        { targetField: 'investigationHypotheses', label: 'Hipóteses de investigação (H)', defaultEpistemologicalStatus: 'HIPOTESE', allowStatusOverride: true, description: 'Suposições e explicações causais' },
        { targetField: 'possibleCauses', label: 'Possíveis causas identificadas (Porquês)', defaultEpistemologicalStatus: 'HIPOTESE', allowStatusOverride: true, description: 'Causas mapeadas durante a investigação' },
        { targetField: 'openQuestions', label: 'Dúvidas críticas em aberto (D)', defaultEpistemologicalStatus: 'NAO_TESTADO', description: 'Perguntas e incertezas que precisam de checagem' },
      ],
    },
    metacognitiveReflection: 'Estamos distinguindo com clareza o que realmente observamos daquilo que apenas supomos ou ainda não sabemos?',
    handoff: {
      producedArtifactName: 'Diagnóstico do Problema V0',
      nowWeKnow: 'A formulação do problema, as observações concretas, hipóteses causais e dúvidas críticas.',
      stillOpen: 'O propósito transformador do projeto e a direção estratégica da solução.',
      nextActivityId: 'E1-A02',
      nextActivityTitle: 'Propósito e Direção',
      nextActivityPurpose: 'Transformar a compreensão do problema em propósito (Por quê?), princípios (Como?) e direção da solução (O quê?).',
      contextPassedAhead: ['Diagnóstico do Problema V0'],
    },
  },

  {
    id: 'E1-A02',
    encounterId: 1,
    movementId: 'investigar',
    movementTitle: '1. Investigar',
    title: 'Propósito e Direção',
    durationMinutes: 20,
    type: 'digital',
    pedagogicalIntervention: {
      principle: 'AGENCIA',
      tag: 'AGÊNCIA DA EQUIPE',
      message: 'A IA pode sugerir conexões e sintetizar o propósito. A decisão sobre o sentido do projeto continua sendo da equipe.'
    },
    youAreHere: {
      encounterTitle: '1. Investigar • Encontro 1',
      positionInSequence: 'Atividade 2 de 3 (Digital)',
      progressPercent: 20,
    },
    whyItMatters: 'Com o diagnóstico do problema estabelecido, definir primeiro o propósito (Por quê?) e os princípios de ação (Como?) garante que a solução (O quê?) responda à causa real e não a um impulso tecnológico.',
    youWillNeed: {
      required: ['Diagnóstico do Problema V0 consolidado'],
      optional: ['Banco de Ideias ({BANCO_DE_IDEIAS})'],
    },
    whatToDo: [
      'Defina primeiramente a transformação desejada: Por quê? (Why?).',
      'Estabeleça os princípios estratégicos e metodológicos: Como? (How?).',
      'Conecte a proposta atual da solução: O quê? (What?).',
      'Consolide o Círculo Dourado V0.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P02.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P02.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P02.promptText,
      contextPackConfig: {
        requiredArtifacts: ['diagnostico'],
      },
    },
    expectedArtifactId: 'golden-circle',
    expectedVersionName: 'Círculo Dourado V0',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'purpose', label: 'Propósito (Por quê? / Why)', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Transformação pretendida pelo projeto' },
        { targetField: 'strategicPrinciples', label: 'Princípios estratégicos (Como? / How)', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Princípios e condições de atuação' },
        { targetField: 'methodApproach', label: 'Abordagem metodológica', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Como a abordagem se materializa na prática' },
        { targetField: 'solution', label: 'Solução atual (O quê? / What)', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Forma da solução proposta' },
      ],
    },
    metacognitiveReflection: 'Nossa solução serve ao propósito ou estamos adaptando o propósito à primeira solução que imaginamos?',
    handoff: {
      producedArtifactName: 'Círculo Dourado V0',
      nowWeKnow: 'O propósito (Por quê?), princípios (Como?) e a proposta de solução (O quê?).',
      stillOpen: 'Incertezas estratégicas e detalhes do Briefing.',
      nextActivityId: 'E1-A03',
      nextActivityTitle: 'Briefing — Estruturação Inicial do Projeto',
      nextActivityPurpose: 'Consolidar problema, público, propósito, hipóteses e direção da solução.',
      contextPassedAhead: ['Diagnóstico do Problema V0', 'Círculo Dourado V0'],
    },
  },

  {
    id: 'E1-A03',
    encounterId: 1,
    movementId: 'definir_materializar',
    movementTitle: '2. Definir e Materializar',
    title: 'Briefing — Estruturação Inicial do Projeto (Briefing V0)',
    durationMinutes: 30,
    type: 'digital',
    pedagogicalIntervention: {
      principle: 'REVISAO',
      tag: 'REVISÃO DE ESCOPO',
      message: 'Antes de avançar, confirme se este briefing realmente representa o entendimento e o alinhamento da equipe.'
    },
    youAreHere: {
      encounterTitle: '2. Definir e Materializar • Encontro 1',
      positionInSequence: 'Atividade 3 de 3 (Digital)',
      progressPercent: 30,
    },
    whyItMatters: 'Até aqui a equipe investigou várias partes do problema. Agora precisamos transformar esse aprendizado em uma visão clara do que o projeto é neste momento.',
    youWillNeed: {
      required: ['Diagnóstico do Problema V0 consolidado', 'Círculo Dourado V0 consolidado'],
    },
    whatToDo: [
      'Leve o contexto de Diagnóstico e Círculo Dourado para a IA.',
      'Peça que ela sintetize o Briefing sem simplesmente copiar todo o histórico.',
      'Revise criticamente o resultado.',
      'Edite o que não representar a equipe.',
      'Consolide somente a versão que a equipe assumir como atual.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P03.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P03.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P03.promptText,
      contextPackConfig: {
        requiredArtifacts: ['diagnostico', 'golden-circle'],
      },
    },
    expectedArtifactId: 'briefing',
    expectedVersionName: 'Briefing V0',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'problem', label: 'Problema atual', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Síntese clara e neutra do problema investigado' },
        { targetField: 'audience', label: 'Público e contexto', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Atores afetados e contexto de atuação' },
        { targetField: 'purpose', label: 'Propósito e transformação', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Transformação pretendida pelo projeto (WHY)' },
        { targetField: 'solution', label: 'Solução proposta', defaultEpistemologicalStatus: 'DECIDIDO', description: 'O que a equipe pretende construir ou realizar' },
        { targetField: 'centralHypothesis', label: 'Hipótese central', defaultEpistemologicalStatus: 'HIPOTESE', allowStatusOverride: true, description: 'Articulação da hipótese central do projeto' },
      ],
    },
    metacognitiveReflection: 'Este Briefing representa a nossa decisão real ou apenas a sugestão da IA?',
    handoff: {
      producedArtifactName: 'Briefing V0',
      nowWeKnow: 'O estado atual do problema, público, propósito, solução e hipótese central.',
      stillOpen: 'Incertezas estratégicas e pontos a serem revisados criticamente.',
      nextActivityId: 'E2-A01',
      nextActivityTitle: 'Revisão Crítica do Briefing (Briefing V1)',
      nextActivityPurpose: 'Testar e refinar a consistência das premissas do Briefing antes da especificação de requisitos.',
      contextPassedAhead: ['Briefing V0'],
    },
  },

  // ==========================================
  // MOVIMENTO 2: DEFINIR E MATERIALIZAR (ENCONTRO 2)
  // ==========================================
  {
    id: 'E2-A01',
    encounterId: 2,
    movementId: 'definir_materializar',
    movementTitle: '2. Definir e Materializar',
    title: 'Revisão Crítica do Briefing (Briefing V1)',
    durationMinutes: 20,
    pedagogicalIntervention: {
      principle: 'REVISAO',
      tag: 'REVISÃO CRÍTICA',
      message: 'Antes de avançar para a especificação, confirme se este artefato realmente representa o entendimento consolidado da equipe.'
    },
    youAreHere: {
      encounterTitle: '2. Definir e Materializar • Encontro 2',
      positionInSequence: 'Atividade 1 de 5',
      progressPercent: 35,
    },
    whyItMatters: 'Antes de especificar requisitos e construir protótipos, precisamos submeter o Briefing V0 a um teste de consistência para identificar premissas frágeis.',
    youWillNeed: {
      required: ['Briefing V0 consolidado'],
    },
    whatToDo: [
      'Forneça o Briefing V0 via Context Pack.',
      'Analise os questionamentos da IA sobre coerência, público, premissas não testadas e viabilidade.',
      'Decida quais ajustes fazer no Briefing.',
      'Consolide o Briefing V1 (que substitui a versão V0).',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P04.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P04.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P04.promptText,
      contextPackConfig: {
        requiredArtifacts: ['briefing'],
      },
    },
    expectedArtifactId: 'briefing',
    expectedVersionName: 'Briefing V1',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'problem', label: 'Problema atual (revisado)', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Problema ajustado após revisão crítica' },
        { targetField: 'audience', label: 'Público e contexto (revisado)', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Público delimitado e verificado' },
        { targetField: 'purpose', label: 'Propósito (revisado)', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Transformação pretendida refinada' },
        { targetField: 'solution', label: 'Solução proposta (revisada)', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Conceito da solução ajustado' },
        { targetField: 'centralHypothesis', label: 'Hipótese central (revisada)', defaultEpistemologicalStatus: 'HIPOTESE', allowStatusOverride: true, description: 'Hipótese refinada para teste' },
      ],
    },
    metacognitiveReflection: 'Quais certezas frágeis do Briefing V0 foram corrigidas nesta revisão?',
    handoff: {
      producedArtifactName: 'Briefing V1',
      nowWeKnow: 'O estado refinado do problema, público, solução e hipótese testável.',
      stillOpen: 'Especificações técnicas e funcionais que serão detalhadas no PRD.',
      nextActivityId: 'E2-A02',
      nextActivityTitle: 'PRD — Especificação de Requisitos',
      nextActivityPurpose: 'Traduzir a solução definida no Briefing V1 em requisitos claros.',
      contextPassedAhead: ['Briefing V1'],
    },
  },

  {
    id: 'E2-A02',
    encounterId: 2,
    movementId: 'definir_materializar',
    movementTitle: '2. Definir e Materializar',
    title: 'PRD — Especificação de Requisitos',
    durationMinutes: 25,
    pedagogicalIntervention: {
      principle: 'DELEGACAO_CONSCIENTE',
      tag: 'DELEGAÇÃO CONSCIENTE',
      message: 'Se você não souber decidir, pode pedir ajuda à IA — mas entenda o que está delegando e o risco de uma resposta errada.'
    },
    youAreHere: {
      encounterTitle: '2. Definir e Materializar • Encontro 2',
      positionInSequence: 'Atividade 2 de 5',
      progressPercent: 50,
    },
    whyItMatters: 'Traduzir a ideia da solução em uma lista concreta do que a solução deve fazer e ter para funcionar.',
    youWillNeed: {
      required: ['Briefing V1 consolidado'],
    },
    whatToDo: [
      'Utilize o Briefing V1 como entrada obrigatória via Context Pack.',
      'Defina as funcionalidades e comportamentos da solução.',
      'Classifique os requisitos nas categorias Must, Should, Could e Not Now.',
      'Consolide o PRD V0.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P05.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P05.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P05.promptText,
      contextPackConfig: {
        requiredArtifacts: ['briefing'],
      },
    },
    expectedArtifactId: 'prd',
    expectedVersionName: 'PRD V0',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'requirements', label: 'Requisitos essenciais (PRD)', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Requisitos e funcionalidades prioritárias do produto' },
      ],
    },
    metacognitiveReflection: 'Estamos especificando o que é necessário para testar a hipótese ou o que achamos legal de construir?',
    handoff: {
      producedArtifactName: 'PRD V0',
      nowWeKnow: 'O fluxo de uso e os requisitos funcionais priorizados (Must/Should/Could/Not Now).',
      stillOpen: 'Qual recorte exato formará o MVP testável.',
      nextActivityId: 'E2-A03',
      nextActivityTitle: 'MVP — Definição do Escopo Enxuto',
      nextActivityPurpose: 'Recortar do PRD a menor versão capaz de testar a hipótese central.',
      contextPassedAhead: ['Briefing V1', 'PRD V0'],
    },
  },

  {
    id: 'E2-A03',
    encounterId: 2,
    movementId: 'definir_materializar',
    movementTitle: '2. Definir e Materializar',
    title: 'MVP — Definição do Escopo Enxuto',
    durationMinutes: 15,
    pedagogicalIntervention: {
      principle: 'AGENCIA',
      tag: 'AGÊNCIA',
      message: 'A IA pode sugerir cortes ou priorizações. A decisão do que entra no MVP continua sendo da equipe.'
    },
    youAreHere: {
      encounterTitle: '2. Definir e Materializar • Encontro 2',
      positionInSequence: 'Atividade 3 de 5',
      progressPercent: 65,
    },
    whyItMatters: 'Evitar o desperdício de tempo construindo uma versão completa antes de saber se a hipótese central é verdadeira.',
    youWillNeed: {
      required: ['Briefing V1 consolidado', 'PRD V0 consolidado'],
    },
    whatToDo: [
      'Receba o Briefing V1 e o PRD V0 via Context Pack.',
      'Corte tudo o que não for estritamente necessário para testar a hipótese central.',
      'Defina o menor experimento testável.',
      'Consolide o MVP V0.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P06.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P06.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P06.promptText,
      contextPackConfig: {
        requiredArtifacts: ['briefing', 'prd'],
      },
    },
    expectedArtifactId: 'mvp',
    expectedVersionName: 'MVP V0',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'mvp', label: 'Escopo do MVP', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Menor versão testável e estratégia de corte de escopo' },
      ],
    },
    metacognitiveReflection: 'Se tirarmos mais uma funcionalidade, ainda conseguimos testar a hipótese?',
    handoff: {
      producedArtifactName: 'MVP V0',
      nowWeKnow: 'O escopo enxuto indispensável para o teste e os critérios de sucesso do experimento.',
      stillOpen: 'Como construir e materializar concretamente o protótipo V0.',
      nextActivityId: 'E2-A04',
      nextActivityTitle: 'Prototipação — Construção do Protótipo V0',
      nextActivityPurpose: 'Especificar e construir o protótipo V0 seguindo o escopo do MVP.',
      contextPassedAhead: ['MVP V0', 'PRD V0'],
    },
  },

  {
    id: 'E2-A04',
    encounterId: 2,
    movementId: 'definir_materializar',
    movementTitle: '2. Definir e Materializar',
    title: 'Prototipação — Construção do Protótipo V0',
    durationMinutes: 45,
    pedagogicalIntervention: {
      principle: 'DELEGACAO_CONSCIENTE',
      tag: 'DELEGAÇÃO CONSCIENTE',
      message: 'Use a IA para acelerar telas ou código, mas pilote o processo e verifique cada comportamento gerado.'
    },
    youAreHere: {
      encounterTitle: '2. Definir e Materializar • Encontro 2',
      positionInSequence: 'Atividade 4 de 5',
      progressPercent: 70,
    },
    whyItMatters: 'Dar forma tangível ao MVP para que usuários possam interagir e reagir a uma experiência concreta.',
    youWillNeed: {
      required: ['MVP V0 consolidado', 'PRD V0 consolidado'],
    },
    whatToDo: [
      'Consulte o escopo do MVP V0 e o PRD V0 via Context Pack.',
      'Defina o formato de materialização do protótipo (esboço, telas, protótipo interativo, código).',
      'Descreva o roteiro de telas/interações ou construa os artefatos visuais.',
      'Consolide a especificação do Protótipo V0.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P07.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P07.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P07.promptText,
      contextPackConfig: {
        requiredArtifacts: ['mvp', 'prd'],
      },
    },
    expectedArtifactId: 'prototipo',
    expectedVersionName: 'Protótipo V0',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'currentPrototype', label: 'Protótipo atual', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Versão atual do protótipo e seu nível/forma de materialização' },
      ],
    },
    metacognitiveReflection: 'O que precisamos descobrir com esta versão?',
    handoff: {
      producedArtifactName: 'Protótipo V0',
      nowWeKnow: 'Qual versão será colocada diante de pessoas para gerar aprendizagem.',
      stillOpen: 'Se a hipótese se sustenta quando pessoas reais interagem com o protótipo.',
      nextActivityId: 'E3-A01',
      nextActivityTitle: 'Planejamento do Teste e Coleta de Evidências',
      nextActivityPurpose: 'Estruturar o plano de teste com tarefas realistas e registrar observações de teste sem fabricar dados.',
      contextPassedAhead: ['MVP V0', 'Protótipo V0'],
    },
  },

  // ==========================================
  // MOVIMENTO 3: VALIDAR E EVOLUIR (ENCONTRO 3)
  // ==========================================
  {
    id: 'E3-A01',
    encounterId: 3,
    movementId: 'validar_evoluir',
    movementTitle: '3. Validar e Evoluir',
    title: 'Planejamento do Teste e Coleta de Evidências',
    durationMinutes: 15,
    pedagogicalIntervention: {
      principle: 'EVIDENCIA',
      tag: 'EVIDÊNCIA REAL & STATUS DE TESTE',
      message: 'Se uma informação for importante para sua decisão, verifique-a com evidências reais do teste. Se o teste não pôde ser realizado, registre explicitamente como hipótese não testada.'
    },
    youAreHere: {
      encounterTitle: '3. Validar e Evoluir • Encontro 3',
      positionInSequence: 'Atividade 1 de 5',
      progressPercent: 75,
    },
    whyItMatters: 'Colocar o protótipo diante de pessoas reais para observar comportamentos sem prejulgar ou direcionar respostas, ou declarar com transparência o status não realizado.',
    youWillNeed: {
      required: ['MVP V0 consolidado', 'Protótipo V0 consolidado'],
    },
    whatToDo: [
      'Defina o plano de teste com uma tarefa realista para os participantes.',
      'Execute o teste observando sem ensinar o caminho ou defender a solução.',
      'Declare o status real do teste (Realizado, Parcialmente Realizado ou Não Realizado).',
      'Registre as evidências brutas observadas (ou mantenha o status Não Testado sem fabricar dados fictícios).',
      'Consolide o Plano e Registros de Teste V0.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P08.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P08.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P08.promptText,
      contextPackConfig: {
        requiredArtifacts: ['mvp', 'prototipo'],
      },
    },
    expectedArtifactId: 'user-tests',
    expectedVersionName: 'Plano e Registros de Teste V0',
    stateUpdateConfig: {
      allowedClaimMappings: [],
    },
    metacognitiveReflection: 'Estamos observando o que aconteceu ou já tentando explicar por que aconteceu?',
    handoff: {
      producedArtifactName: 'Plano e Registros de Teste',
      nowWeKnow: 'Como os participantes interagiram com o protótipo e quais fatos foram observados (ou o status não realizado da rodada).',
      stillOpen: 'Quais padrões emergem e o que essas evidências significam para as hipóteses.',
      nextActivityId: 'E3-A02',
      nextActivityTitle: 'Síntese de Evidências',
      nextActivityPurpose: 'Separar ocorrências, padrões, interpretações e aprendizados.',
      contextPassedAhead: ['Protótipo V0', 'Plano e Registros de Teste V0'],
    },
  },

  {
    id: 'E3-A02',
    encounterId: 3,
    movementId: 'validar_evoluir',
    movementTitle: '3. Validar e Evoluir',
    title: 'Síntese de Evidências',
    durationMinutes: 20,
    pedagogicalIntervention: {
      principle: 'VERIFICACAO',
      tag: 'VERIFICAÇÃO & FATOS',
      message: 'Separe o que foi observado na prática do que é interpretação. Se não houve teste, as hipóteses permanecem abertas.'
    },
    youAreHere: {
      encounterTitle: '3. Validar e Evoluir • Encontro 3',
      positionInSequence: 'Atividade 2 de 5',
      progressPercent: 80,
    },
    whyItMatters: 'Analisar os registros de teste para identificar padrões reais, confrontar hipóteses e preservar lacunas com rigor metodológico.',
    youWillNeed: {
      required: ['Protótipo V0 consolidado', 'Plano e Registros de Teste V0 consolidado'],
    },
    whatToDo: [
      'Forneça os registros de teste para a IA.',
      'Agrupe evidências em padrões versus ocorrências isoladas.',
      'Avalie quais hipóteses ganharam ou perderam sustentação (ou registre hipóteses inconclusivas caso não haja dados de teste).',
      'Consolide a Síntese de Evidências V0.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P09.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P09.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P09.promptText,
      contextPackConfig: {
        requiredArtifacts: ['prototipo', 'user-tests'],
      },
    },
    expectedArtifactId: 'evidence-summary',
    expectedVersionName: 'Síntese de Evidências V0',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'evidenceSummary', label: 'Evidências disponíveis', defaultEpistemologicalStatus: 'OBSERVADO', allowStatusOverride: true, description: 'Síntese do estado atual das evidências observadas' },
        { targetField: 'openQuestions', label: 'O que ainda não sabemos', defaultEpistemologicalStatus: 'NAO_TESTADO', description: 'Incertezas e dúvidas que permanecem' },
      ],
    },
    metacognitiveReflection: 'Isso é uma ocorrência isolada ou realmente um padrão?',
    handoff: {
      producedArtifactName: 'Síntese de Evidências V0',
      nowWeKnow: 'Quais padrões surgiram nos testes e quais hipóteses ganharam/perderam sustentação.',
      stillOpen: 'Dúvidas que permanecem e implicações para o modelo de sustentabilidade e roadmap.',
      nextActivityId: 'E3-A03',
      nextActivityTitle: 'Modelo de Sustentabilidade',
      nextActivityPurpose: 'Confrontar nossas hipóteses com o que realmente observamos e preservar o que ainda não sabemos.',
      contextPassedAhead: ['Síntese de Evidências V0'],
    },
  },

  {
    id: 'E3-A03',
    encounterId: 3,
    movementId: 'validar_evoluir',
    movementTitle: '3. Validar e Evoluir',
    title: 'Modelo de Sustentabilidade',
    durationMinutes: 25,
    pedagogicalIntervention: {
      principle: 'HIPOTESE',
      tag: 'HIPÓTESE DE MODELO',
      message: 'Cada bloco de sustentabilidade e canal é uma hipótese a ser testada, não uma certeza garantida.'
    },
    youAreHere: {
      encounterTitle: '3. Validar e Evoluir • Encontro 3',
      positionInSequence: 'Atividade 3 de 5',
      progressPercent: 83,
    },
    whyItMatters: 'Mapear como a solução é entregue, gera valor e se sustenta no tempo, distinguindo fatos de hipóteses.',
    youWillNeed: {
      required: ['Briefing V1 consolidado', 'MVP V0 consolidado'],
      optional: ['Síntese de Evidências V0 consolidada'],
    },
    whatToDo: [
      'Mapeie os 9 blocos do Canvas com a IA.',
      'Diferencie explicitamente papéis (usuário, beneficiário, comprador, financiador).',
      'Identifique os status de cada bloco (observado, decidido, hipótese, não testado).',
      'Consolide o BMC V0.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P10.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P10.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P10.promptText,
      contextPackConfig: {
        requiredArtifacts: ['briefing', 'mvp'],
        optionalArtifacts: ['evidence-summary'],
      },
    },
    expectedArtifactId: 'bmc',
    expectedVersionName: 'BMC V0',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'sustainabilityModel', label: 'Modelo atual de sustentação', defaultEpistemologicalStatus: 'HIPOTESE', allowStatusOverride: true, description: 'Resumo das hipóteses e estrutura de sustentabilidade do projeto' },
      ],
    },
    metacognitiveReflection: 'O que sabemos sobre a sustentabilidade e o que estamos apenas imaginando?',
    handoff: {
      producedArtifactName: 'BMC V0',
      nowWeKnow: 'O modelo de sustentação e suas 3 hipóteses críticas.',
      stillOpen: 'Blocos não testados do Canvas.',
      nextActivityId: 'E3-A04',
      nextActivityTitle: 'Roadmap',
      nextActivityPurpose: 'Considerar também as hipóteses necessárias para a solução continuar existindo e chegar às pessoas.',
      contextPassedAhead: ['BMC V0'],
    },
  },

  {
    id: 'E3-A04',
    encounterId: 3,
    movementId: 'validar_evoluir',
    movementTitle: '3. Validar e Evoluir',
    title: 'Roadmap — Priorização e Horizontes',
    durationMinutes: 20,
    pedagogicalIntervention: {
      principle: 'AGENCIA',
      tag: 'AGÊNCIA & PRIORIDADE',
      message: 'A IA pode sugerir sequências de entrega, mas a prioridade estratégica pertence à equipe.'
    },
    youAreHere: {
      encounterTitle: '3. Validar e Evoluir • Encontro 3',
      positionInSequence: 'Atividade 4 de 5',
      progressPercent: 86,
    },
    whyItMatters: 'Organizar as próximas melhorias em horizontes temporais claros e justificá-las por evidências ou necessidades estratégicas.',
    youWillNeed: {
      required: ['MVP V0 consolidado', 'Protótipo V0 consolidado', 'BMC V0 consolidado'],
      optional: ['Síntese de Evidências V0 consolidada'],
    },
    whatToDo: [
      'Classifique a origem de cada melhoria (evidência de usuário, execução, hipótese de design, decisão estratégica).',
      'Organize em horizontes: Agora, Depois, Futuro e Não Agora.',
      'Defina as 3 prioridades centrais justificadas.',
      'Consolide o Roadmap V0.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P11.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P11.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P11.promptText,
      contextPackConfig: {
        requiredArtifacts: ['mvp', 'prototipo', 'bmc'],
        optionalArtifacts: ['evidence-summary'],
      },
    },
    expectedArtifactId: 'roadmap',
    expectedVersionName: 'Roadmap V0',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'roadmap', label: 'Prioridades atuais', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Resumo dos horizontes e 3 prioridades centrais do projeto' },
      ],
    },
    metacognitiveReflection: 'Estamos priorizando porque temos uma razão clara ou porque a ideia parece interessante?',
    handoff: {
      producedArtifactName: 'Roadmap V0',
      nowWeKnow: 'As três prioridades do horizonte "Agora" e o que explicitamente não faremos agora.',
      stillOpen: 'Ações dos horizontes Depois e Futuro.',
      nextActivityId: 'E3-A05',
      nextActivityTitle: 'Evolução V0 → V1',
      nextActivityPurpose: 'Escolher exatamente quais aprendizados serão incorporados na próxima versão.',
      contextPassedAhead: ['Roadmap V0'],
    },
  },

  {
    id: 'E3-A05',
    encounterId: 3,
    movementId: 'validar_evoluir',
    movementTitle: '3. Validar e Evoluir',
    title: 'Evolução do Protótipo: V0 → V1',
    durationMinutes: 70,
    pedagogicalIntervention: {
      principle: 'VERIFICACAO',
      tag: 'VERIFICAÇÃO PRÁTICA',
      message: 'Se uma alteração técnica for aplicada pela IA, teste-a em funcionamento antes de consolidar.'
    },
    youAreHere: {
      encounterTitle: '3. Validar e Evoluir • Encontro 3',
      positionInSequence: 'Atividade 5 de 5',
      progressPercent: 90,
    },
    whyItMatters: 'Incorporar os aprendizados dos testes e a priorização do Roadmap para evoluir o protótipo de V0 para V1.',
    youWillNeed: {
      required: ['MVP V0 consolidado', 'Protótipo V0 consolidado', 'Roadmap V0 consolidado'],
      optional: ['Síntese de Evidências V0 consolidada'],
    },
    whatToDo: [
      'Revise o que preservar, modificar, remover ou adicionar no protótipo V0.',
      'Justifique cada mudança com base na origem da evidência ou decisão estratégica.',
      'Consolide o Registro de Evolução V0 → V1 e a especificação do Protótipo V1.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P12.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P12.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P12.promptText,
      contextPackConfig: {
        requiredArtifacts: ['mvp', 'prototipo', 'roadmap'],
        optionalArtifacts: ['evidence-summary'],
      },
    },
    expectedArtifactId: 'prototipo',
    expectedVersionName: 'Protótipo V1',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'currentPrototype', label: 'Protótipo atual', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Versão e especificações do Protótipo V1 evoluído' },
      ],
    },
    metacognitiveReflection: 'A V1 incorpora aprendizado ou estamos apenas acrescentando coisas?',
    handoff: {
      producedArtifactName: 'Protótipo V1',
      nowWeKnow: 'Quais mudanças foram incorporadas na versão V1 e suas justificativas.',
      stillOpen: 'Hipóteses de melhoria que ainda precisam ser testadas na V1.',
      nextActivityId: 'E4-A01',
      nextActivityTitle: 'Construção do Pitch',
      nextActivityPurpose: 'Comunicar a versão atual do projeto e explicar o aprendizado que levou até ela.',
      contextPassedAhead: ['Protótipo V1', 'Roadmap V0'],
    },
  },

  // ==========================================
  // MOVIMENTO 4: COMUNICAR E REFLETIR (ENCONTRO 4)
  // ==========================================
  {
    id: 'E4-A01',
    encounterId: 4,
    movementId: 'comunicar_refletir',
    movementTitle: '4. Comunicar e Refletir',
    title: 'Construção do Pitch',
    durationMinutes: 30,
    pedagogicalIntervention: {
      principle: 'AGENCIA',
      tag: 'AGÊNCIA NA NARRATIVA',
      message: 'A IA ajuda a estruturar a narrativa, mas a voz autêntica e a história da jornada são da sua equipe.'
    },
    youAreHere: {
      encounterTitle: '4. Comunicar e Refletir • Encontro 4',
      positionInSequence: 'Atividade 1 de 3',
      progressPercent: 93,
    },
    whyItMatters: 'Sintetizar a jornada, os aprendizados e a solução em um discurso claro, honesto e convincente.',
    youWillNeed: {
      required: ['Briefing V1 consolidado', 'MVP V0 consolidado', 'Protótipo V1 consolidado', 'Roadmap V0 consolidado'],
      optional: ['Síntese de Evidências V0 consolidada', 'BMC V0 consolidado'],
    },
    whatToDo: [
      'Construa a estrutura narrativa em 4 ou 5 blocos.',
      'Escreva o Pitch Integral em primeira pessoa, mantendo a voz autêntica da equipe.',
      'Produza a Síntese do Pitch em parágrafo único.',
      'Consolide as três entregas em blocos isolados.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P12.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P12.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P12.promptText,
      contextPackConfig: {
        requiredArtifacts: ['briefing', 'mvp', 'prototipo', 'roadmap'],
        optionalArtifacts: ['evidence-summary', 'bmc'],
      },
    },
    expectedArtifactId: 'pitch',
    expectedVersionName: 'Estrutura + Pitch Integral + Síntese',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'pitch', label: 'Pitch atual', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Estrutura e texto da fala do Pitch' },
      ],
    },
    metacognitiveReflection: 'Estamos afirmando mais do que conseguimos sustentar?',
    handoff: {
      producedArtifactName: 'Estrutura + Pitch Integral + Síntese',
      nowWeKnow: 'A narrativa central, os principais fatos comunicados e a estrutura da fala.',
      stillOpen: 'Apoio visual nos slides e tempo de fala.',
      nextActivityId: 'E4-A02',
      nextActivityTitle: 'Roteiro Visual da Apresentação',
      nextActivityPurpose: 'Decidir o que os slides precisam tornar mais fácil de ver e compreender.',
      contextPassedAhead: ['Estrutura + Pitch Integral + Síntese'],
    },
  },

  {
    id: 'E4-A02',
    encounterId: 4,
    movementId: 'comunicar_refletir',
    movementTitle: '4. Comunicar e Refletir',
    title: 'Roteiro Visual da Apresentação',
    durationMinutes: 30,
    pedagogicalIntervention: {
      principle: 'REVISAO',
      tag: 'REVISÃO DE CLAREZA',
      message: 'Antes de avançar, confirme se cada slide comunica com clareza a mensagem essencial sem ruído visual.'
    },
    youAreHere: {
      encounterTitle: '4. Comunicar e Refletir • Encontro 4',
      positionInSequence: 'Atividade 2 de 3',
      progressPercent: 96,
    },
    whyItMatters: 'Criar um suporte visual funcional que apoie a fala sem competir com ela nem funcionar como teleprompter.',
    youWillNeed: {
      required: ['Pitch Integral consolidado', 'Estrutura do Pitch consolidada'],
      optional: ['Protótipo V1 consolidado'],
    },
    whatToDo: [
      'Traduza o pitch em um roteiro visual de suporte (6 a 8 slides, 1 ideia por slide).',
      'Defina títulos, textos na tela e sugestões de visuais/diagramas.',
      'Consolide o Roteiro Visual da Apresentação.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P12.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P12.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P12.promptText,
      contextPackConfig: {
        requiredArtifacts: ['pitch'],
        optionalArtifacts: ['prototipo'],
      },
    },
    expectedArtifactId: 'presentation',
    expectedVersionName: 'Roteiro Visual da Apresentação',
    stateUpdateConfig: {
      allowedClaimMappings: [],
    },
    metacognitiveReflection: 'Os slides ajudam a compreender ou competem com nossa fala?',
    handoff: {
      producedArtifactName: 'Roteiro Visual da Apresentação',
      nowWeKnow: 'Quais slides apoiarão a narrativa e o que cada um tornará visível.',
      stillOpen: 'Comportamento da equipe durante perguntas e respostas da banca.',
      nextActivityId: 'E4-A03',
      nextActivityTitle: 'Ensaio e Refinamento do Pitch',
      nextActivityPurpose: 'Testar narrativa, clareza visual e capacidade de responder a perguntas.',
      contextPassedAhead: ['Roteiro Visual da Apresentação'],
    },
  },

  {
    id: 'E4-A03',
    encounterId: 4,
    movementId: 'comunicar_refletir',
    movementTitle: '4. Comunicar e Refletir',
    title: 'Ensaio e Refinamento do Pitch',
    durationMinutes: 30,
    pedagogicalIntervention: {
      principle: 'VERIFICACAO',
      tag: 'VERIFICAÇÃO & IMPACTO',
      message: 'Verifique se os dados e o problema apresentados no pitch refletem fielmente as evidências descobertas na oficina.'
    },
    youAreHere: {
      encounterTitle: '4. Comunicar e Refletir • Encontro 4',
      positionInSequence: 'Atividade 3 de 3',
      progressPercent: 100,
    },
    whyItMatters: 'Submeter o pitch a uma banca simulada rigorosa para polir a fala, corrigir fragilidades e preparar respostas.',
    youWillNeed: {
      required: ['Pitch Integral consolidado', 'Síntese do Pitch consolidada'],
      optional: ['Roteiro Visual da Apresentação consolidado'],
    },
    whatToDo: [
      'Submeta o Pitch à avaliação diagnóstica em 5 critérios.',
      'Responda interativamente às 5 perguntas da banca simulada (uma por vez).',
      'Receba os refinamentos de cada resposta.',
      'Consolide o Pitch Revisado e a Síntese Crítica com Cartão de Banca.',
    ],
    aiPrompt: {
      purpose: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P12.title,
      whatAiHelpsDo: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P12.shortDescription,
      templatePrompt: OFFICIAL_PROMPTS_BY_CANONICAL_ID.P12.promptText,
      contextPackConfig: {
        requiredArtifacts: ['pitch'],
        optionalArtifacts: ['presentation'],
      },
    },
    expectedArtifactId: 'pitch',
    expectedVersionName: 'Pitch Revisado + Síntese Crítica',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'pitch', label: 'Pitch atual', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Fala e estrutura final do Pitch Revisado' },
      ],
    },
    metacognitiveReflection: 'Qual pergunta de banca revelou a maior fragilidade da nossa narrativa?',
    handoff: {
      producedArtifactName: 'Pitch Revisado + Síntese Crítica',
      nowWeKnow: 'A versão refinada do pitch e as respostas na ponta da língua para a banca.',
      stillOpen: 'Apresentação humana final diante do público.',
      nextActivityId: 'END_OF_JOURNEY',
      nextActivityTitle: 'Conclusão da Jornada do Workshop',
      nextActivityPurpose: 'Revisar o checklist final da equipe e refletir sobre o uso da IA durante o projeto.',
      contextPassedAhead: ['Pitch Revisado + Síntese Crítica'],
    },
  },
];

const CANONICAL_TO_PILOT_MAP: Record<string, string> = {
  'A01': 'E1-A00',
  'A02': 'E1-A01',
  'A03': 'E1-A01',
  'A04': 'E1-A02',
  'A05': 'E2-A01',
  'A06': 'E2-A02',
  'A07': 'E2-A03',
  'A08': 'E2-A05',
  'A09': 'E3-A01',
  'A10': 'E3-A03',
  'A11': 'E3-A04',
  'A12': 'E4-A01',
};

export function getPilotActivityById(id: string): ActivityV2 {
  const defaultActivity = PILOT_CHAIN_ACTIVITIES.find((a) => a.id === 'E1-A00') || PILOT_CHAIN_ACTIVITIES[0];
  if (!id) return defaultActivity;
  const normalized = id.trim().toUpperCase();
  const direct = PILOT_CHAIN_ACTIVITIES.find((a) => a.id.toUpperCase() === normalized);
  if (direct) return direct;
  const matchNoHyphen = PILOT_CHAIN_ACTIVITIES.find(
    (a) => a.id.replace(/-/g, '').toUpperCase() === normalized.replace(/-/g, '')
  );
  if (matchNoHyphen) return matchNoHyphen;
  if (CANONICAL_TO_PILOT_MAP[normalized]) {
    const canonicalTarget = CANONICAL_TO_PILOT_MAP[normalized];
    const canonicalMatch = PILOT_CHAIN_ACTIVITIES.find((a) => a.id.toUpperCase() === canonicalTarget);
    if (canonicalMatch) return canonicalMatch;
  }
  return defaultActivity;
}
