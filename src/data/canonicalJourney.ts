/**
 * CANONICAL JOURNEY V2.2 — FONTE ÚNICA DE VERDADE
 *
 * Contrato Canônico V2.2:
 * 12 Atividades Canônicas (A01 a A12)
 * 12 Prompts Canônicos (P01 a P12)
 * 12 Artefatos Canônicos (AF01 a AF12)
 * Relação Canônica Biunívoca e Estrita: A ↔ P ↔ AF
 * 
 * A01 ↔ P01 ↔ AF01 — Mapear e escolher o problema → Mapa de Problemas + Problema Escolhido
 * A02 ↔ P02 ↔ AF02 — Diagnosticar o problema → Diagnóstico do Problema
 * A03 ↔ P03 ↔ AF03 — Mapear recursos disponíveis e necessários → Mapa de Recursos
 * A04 ↔ P04 ↔ AF04 — Definir propósito e direção → Propósito e Direção
 * A05 ↔ P05 ↔ AF05 — Construir Briefing V0 → Briefing V0
 * A06 ↔ P06 ↔ AF06 — Revisar criticamente → Briefing V1
 * A07 ↔ P07 ↔ AF07 — Definir como a solução precisa funcionar → Especificação de Funcionamento / PRD
 * A08 ↔ P08 ↔ AF08 — Projetar e materializar o MVP → MVP + Protótipo V0
 * A09 ↔ P09 ↔ AF09 — Testar, aprender e definir evolução V0→V1 → Testes, Aprendizados e Plano de Evolução
 * A10 ↔ P10 ↔ AF10 — Modelar sustentabilidade → Modelo de Sustentabilidade
 * A11 ↔ P11 ↔ AF11 — Planejar evolução → Roadmap + Linha do Tempo em 7 Etapas
 * A12 ↔ P12 ↔ AF12 — Comunicação final → Pitch V1 + Roteiro Visual + Roteiro de Ensaio/Simulação
 *
 * Resolução por IDs explícitos. Sem genealogias externas legadas.
 */

import { CanonicalActivityV2, ActivityId } from '../types/canonicalV2';

export const CANONICAL_ACTIVITIES_V2: Record<ActivityId, CanonicalActivityV2> = {
  // =========================================================================
  // MOVIMENTO 1: INVESTIGAR E DIRECIONAR (ENCONTRO 1) — A01 a A04
  // =========================================================================

  A01: {
    id: 'A01',
    order: 1,
    title: 'Ponto de Partida: Sonho + Problema',
    shortTitle: 'Ponto de Partida',
    macroMovement: 'investigar_direcionar',
    recommendedEncounter: 1,
    estimatedMinutes: 40,
    objective: 'Reconhecer o que move a equipe a partir de um problema vivido, de um sonho compartilhado ou de uma exploração aberta, formulando a tensão inicial do projeto.',
    whyWeDoThis: 'O projeto nasce do que move a equipe: uma realidade que incomoda ou um futuro desejado. Antes de qualquer solução, a equipe precisa assumir a titularidade de uma tensão autêntica que realmente valha a pena enfrentar.',
    instructions: [
      'Identifiquem o ponto de partida da equipe: um problema/incômodo vivido, um sonho/realidade desejada ou uma exploração aberta.',
      'Utilizem o Prompt P01 na IA facilitadora para investigar a distância entre a realidade atual e a desejada.',
      'Definam as pessoas envolvidas, a escala do contexto e a motivação humana da equipe.',
      'Consolidem o Artefato AF01 — Ponto de Partida: Sonho + Problema.'
    ],
    dependencies: [],
    manualInputs: ['Incômodos ou sonhos observados', 'Critérios de relevância da equipe'],
    promptId: 'P01',
    outputArtifactId: 'AF01',
    completionCriteria: [
      'Tensão inicial expressa com clareza entre realidade atual e desejada.',
      'Ponto de partida formalizado com justificativa humana soberana da equipe (AF01).'
    ],
    nextActivityId: 'A02'
  },

  A02: {
    id: 'A02',
    order: 2,
    title: 'Diagnosticar a Tensão de Projeto',
    shortTitle: 'Diagnóstico da Tensão',
    macroMovement: 'investigar_direcionar',
    recommendedEncounter: 1,
    estimatedMinutes: 35,
    objective: 'Investigar a distância entre a realidade atual e a desejada, separando rigorosamente observações, hipóteses e dúvidas, com critério de parada causal.',
    whyWeDoThis: 'Soluções precipitadas costumam combater apenas sintomas superficiais. O diagnóstico rigoroso investiga a anatomia real da situação antes de desenhar qualquer proposta.',
    instructions: [
      'Recuperem o Ponto de Partida consolidado no Artefato AF01.',
      'Copiem o Prompt P02 com o contexto do AF01 integrado pelo webapp.',
      'Respondam às perguntas progressivas separando observações verificadas, hipóteses a checar e dúvidas cruciais.',
      'Explorem as causas possíveis em camadas com critério de parada analítico.',
      'Consolidem o Artefato AF02 — Diagnóstico da Tensão de Projeto.'
    ],
    dependencies: [
      { artifactId: 'AF01', level: 'required_input', description: 'Ponto de partida (Sonho + Problema) consolidado para diagnóstico.' }
    ],
    manualInputs: ['Observações de campo', 'Hipóteses iniciais'],
    promptId: 'P02',
    outputArtifactId: 'AF02',
    completionCriteria: [
      'Observações, hipóteses e dúvidas nitidamente separadas sem confusão epistemológica.',
      'Artefato AF02 salvo e consolidado pela equipe.'
    ],
    nextActivityId: 'A03'
  },

  A03: {
    id: 'A03',
    order: 3,
    title: 'Mapear Recursos Disponíveis e Necessários',
    shortTitle: 'Mapa de Recursos',
    macroMovement: 'investigar_direcionar',
    recommendedEncounter: 1,
    estimatedMinutes: 30,
    objective: 'Reconhecer recursos disponíveis e mobilizáveis nas dimensões de saberes locais, conexões humanas, infraestrutura/espaços e viabilização econômica/não monetária.',
    whyWeDoThis: 'Projetos reais ganham tração quando descobrem a abundância existente ao seu redor, em vez de ficarem paralisados pela carência de verba ou patrocínio externo.',
    instructions: [
      'Revisem o problema e diagnóstico (AF01 e AF02).',
      'Copiem o Prompt P03 com o contexto acumulado.',
      'Mapeiem com a IA: saberes e talentos da equipe/comunidade, redes de confiança, espaços físicos e arranjos não monetários.',
      'Diferenciem claramente o que já está na mão, o que pode ser ativado e as lacunas críticas.',
      'Salvem o Artefato AF03 — Mapa de Recursos.'
    ],
    dependencies: [
      { artifactId: 'AF01', level: 'required_input', description: 'Problema escolhido de referência.' },
      { artifactId: 'AF02', level: 'recommended_context', description: 'Diagnóstico causal do problema.' }
    ],
    manualInputs: ['Contatos, parcerias potenciais e espaços disponíveis'],
    promptId: 'P03',
    outputArtifactId: 'AF03',
    completionCriteria: [
      'Recursos mapeados nas dimensões de saberes, redes, espaços e viabilidade.',
      'Artefato AF03 consolidado com foco em potenciais locais concretos.'
    ],
    nextActivityId: 'A04'
  },

  A04: {
    id: 'A04',
    order: 4,
    title: 'Definir Propósito e Direção',
    shortTitle: 'Propósito e Direção',
    macroMovement: 'investigar_direcionar',
    recommendedEncounter: 1,
    estimatedMinutes: 30,
    objective: 'Pactuar a transformação pretendida, os princípios inegociáveis de conduta e a direção de solução que a equipe quer construir.',
    whyWeDoThis: 'Ter clareza sobre por que o projeto existe e quais princípios éticos orientam suas escolhas impede desvios de rota e escolhas oportunistas durante a materialização.',
    instructions: [
      'Revisem o diagnóstico (AF02) e o mapa de recursos (AF03).',
      'Copiem o Prompt P04 e respondam às indagações reflexivas.',
      'Definam com clareza a transformação pretendida (por que agir), os princípios de ação (como agir) e a direção da solução (o que construir).',
      'Validem se a direção entusiasma a equipe e responde ao problema autêntico.',
      'Salvem o Artefato AF04 — Propósito e Direção.'
    ],
    dependencies: [
      { artifactId: 'AF01', level: 'required_input', description: 'Problema de referência.' },
      { artifactId: 'AF02', level: 'recommended_context', description: 'Diagnóstico do problema.' },
      { artifactId: 'AF03', level: 'recommended_context', description: 'Mapa de recursos disponíveis.' }
    ],
    manualInputs: ['Princípios éticos da equipe'],
    promptId: 'P04',
    outputArtifactId: 'AF04',
    completionCriteria: [
      'Transformação pretendida e princípios inegociáveis formalizados.',
      'Artefato AF04 aprovado por consenso na equipe.'
    ],
    nextActivityId: 'A05'
  },

  // =========================================================================
  // MOVIMENTO 2: DEFINIR E MATERIALIZAR (ENCONTRO 2) — A05 a A08
  // =========================================================================

  A05: {
    id: 'A05',
    order: 5,
    title: 'Construir Briefing V0',
    shortTitle: 'Briefing V0',
    macroMovement: 'definir_materializar',
    recommendedEncounter: 2,
    estimatedMinutes: 25,
    objective: 'Amarrar investigação, recursos mapeados e direção estratégica em uma primeira minuta estruturada e completa do projeto.',
    whyWeDoThis: 'O Briefing V0 reúne todas as peças descobertas em um documento unificado, permitindo enxergar a integridade do projeto antes de submetê-lo a testes críticos.',
    instructions: [
      'Certifiquem-se de ter os artefatos AF01, AF02, AF03 e AF04 acessíveis.',
      'Copiem o Prompt P05 com o pacote de contexto integrado.',
      'Permitam que a IA estruture as 13 seções do briefing sem inventar fatos ou fechar decisões não pactuadas.',
      'Revisem se a narrativa faz sentido e reflete o que o grupo viveu.',
      'Salvem o Artefato AF05 — Briefing V0.'
    ],
    dependencies: [
      { artifactId: 'AF01', level: 'required_input', description: 'Problema escolhido.' },
      { artifactId: 'AF02', level: 'required_input', description: 'Diagnóstico do problema.' },
      { artifactId: 'AF03', level: 'required_input', description: 'Mapa de recursos.' },
      { artifactId: 'AF04', level: 'required_input', description: 'Propósito e direção.' }
    ],
    manualInputs: [],
    promptId: 'P05',
    outputArtifactId: 'AF05',
    completionCriteria: [
      'Minuta estruturada AF05 consolidada cobrindo problema, recursos, público e direção.'
    ],
    nextActivityId: 'A06'
  },

  A06: {
    id: 'A06',
    order: 6,
    title: 'Revisar Criticamente (Briefing V1)',
    shortTitle: 'Revisão Crítica',
    macroMovement: 'definir_materializar',
    recommendedEncounter: 2,
    estimatedMinutes: 30,
    objective: 'Submeter o Briefing V0 a um crivo rigoroso da IA, debater pontos cegos e consolidar soberanamente a versão autoritativa Briefing V1.',
    whyWeDoThis: 'A IA atua como interlocutora crítica implacável, apontando incoerências e riscos antes que a equipe invista esforço na materialização do protótipo.',
    instructions: [
      'Insiram o Briefing V0 (AF05) no contexto.',
      'Copiem o Prompt P06, configurando a IA para auditoria crítica sem reescrever o texto de imediato.',
      'Examinem as fragilidades, incoerências e alternativas apontadas pela IA.',
      'A equipe delibera de forma soberana: o que aceitar, o que rejeitar e o que refinar.',
      'Salvem o Artefato AF06 — Briefing V1 (versão autoritativa).'
    ],
    dependencies: [
      { artifactId: 'AF05', level: 'required_input', description: 'Briefing V0 para revisão crítica.' }
    ],
    manualInputs: ['Deliberação humana soberana sobre as críticas'],
    promptId: 'P06',
    outputArtifactId: 'AF06',
    completionCriteria: [
      'Decisões humanas explícitas registradas sobre as provocações da IA.',
      'Artefato AF06 consolidado como documento autoritativo do projeto.'
    ],
    nextActivityId: 'A07'
  },

  A07: {
    id: 'A07',
    order: 7,
    title: 'Definir Como a Solução Precisa Funcionar (Especificação / PRD)',
    shortTitle: 'Especificação / PRD',
    macroMovement: 'definir_materializar',
    recommendedEncounter: 2,
    estimatedMinutes: 35,
    objective: 'Especificar detalhadamente a jornada do usuário, o que deve acontecer em cada etapa, os requisitos essenciais imediatos versus desejáveis futuros e os critérios de qualidade.',
    whyWeDoThis: 'Especificar o funcionamento antes da forma física impede que a equipe se encante prematuramente com detalhes estéticos de telas ou embalagens antes de saber a utilidade real da entrega.',
    instructions: [
      'Usem o Briefing V1 (AF06) como fundamento.',
      'Copiem o Prompt P07 com as diretrizes de especificação funcional.',
      'Definam o fluxo da experiência do usuário do início ao desfecho.',
      'Diferenciem com clareza o que é essencial para funcionar agora vs. o que é expansão para depois.',
      'Salvem o Artefato AF07 — Especificação de Funcionamento / PRD.'
    ],
    dependencies: [
      { artifactId: 'AF06', level: 'required_input', description: 'Briefing V1 autoritativo.' }
    ],
    manualInputs: ['Restrições práticas de tempo e materiais'],
    promptId: 'P07',
    outputArtifactId: 'AF07',
    completionCriteria: [
      'Jornada do usuário especificada passo a passo.',
      'Requisitos essenciais delimitados no Artefato AF07.'
    ],
    nextActivityId: 'A08'
  },

  A08: {
    id: 'A08',
    order: 8,
    title: 'Projetar e Materializar o MVP (MVP + Protótipo V0)',
    shortTitle: 'MVP + Protótipo V0',
    macroMovement: 'definir_materializar',
    recommendedEncounter: 2,
    estimatedMinutes: 45,
    objective: 'Definir a hipótese central do MVP, escolher o formato adequado de prototipagem e estruturar o Plano de Realização completo para tangibilizar o Protótipo V0.',
    whyWeDoThis: 'O MVP não é uma versão ruim da ideia, mas o menor experimento concreto capaz de testar a hipótese de valor mais arriscada da equipe no mundo real.',
    instructions: [
      'Conectem o Briefing V1 (AF06) e a Especificação de Funcionamento (AF07).',
      'Copiem o Prompt P08 para projetar o MVP e o Plano de Realização.',
      'Definam a hipótese central: o que exatamente precisa ser comprovado?',
      'Escolham o formato (digital, encenação, físico, manual) e materializem o Protótipo V0.',
      'Consolidem o Plano de Realização com responsáveis, materiais e cronograma de teste.',
      'Salvem o Artefato AF08 — MVP + Protótipo V0.'
    ],
    dependencies: [
      { artifactId: 'AF06', level: 'required_input', description: 'Briefing V1.' },
      { artifactId: 'AF07', level: 'required_input', description: 'Especificação funcional da solução.' }
    ],
    manualInputs: ['Materiais físicos, ferramentas digitais ou recursos de encenação'],
    promptId: 'P08',
    outputArtifactId: 'AF08',
    completionCriteria: [
      'Hipótese central do MVP formulada com clareza.',
      'Protótipo V0 materializado e Plano de Realização registrado no Artefato AF08.'
    ],
    nextActivityId: 'A09'
  },

  // =========================================================================
  // MOVIMENTO 3: VALIDAR E EVOLUIR (ENCONTRO 3) — A09 a A11
  // =========================================================================

  A09: {
    id: 'A09',
    order: 9,
    title: 'Testar, Aprender e Definir Evolução V0→V1',
    shortTitle: 'Testes e Evolução V0→V1',
    macroMovement: 'validar_evoluir',
    recommendedEncounter: 3,
    estimatedMinutes: 50,
    objective: 'Planejar a condução neutra do teste, coletar evidências honestas no mundo real com usuários, analisar criticamente os dados e pactuar a evolução para o Protótipo V1.',
    whyWeDoThis: 'Testes de campo confrontam as suposições da equipe com o mundo real. O valor pedagógico reside em acolher o feedback desconfortável para evoluir a solução com base em fatos.',
    instructions: [
      'Planejem o teste com roteiro neutro e conduzam o experimento com pessoas reais.',
      'Registrem o que realmente aconteceu: falas literais, travamentos, surpresas e reações genuínas.',
      'Copiem o Prompt P09 alimentando a IA com as evidências brutas coletadas.',
      'Diferenciem dados fatuais de interpretações subjetivas.',
      'Definam a evolução V0→V1: o que manter, o que ajustar, o que descartar e o que acrescentar.',
      'Salvem o Artefato AF09 — Testes, Aprendizados e Plano de Evolução V0→V1.'
    ],
    dependencies: [
      { artifactId: 'AF08', level: 'required_input', description: 'MVP e Protótipo V0 testado em campo.' }
    ],
    manualInputs: ['Evidências reais e falas observadas durante os testes'],
    promptId: 'P09',
    outputArtifactId: 'AF09',
    completionCriteria: [
      'Evidências brutas registradas sem maquiagem ou indução.',
      'Plano de evolução V0→V1 formalizado no Artefato AF09.'
    ],
    nextActivityId: 'A10'
  },

  A10: {
    id: 'A10',
    order: 10,
    title: 'Modelar Sustentabilidade',
    shortTitle: 'Sustentabilidade',
    macroMovement: 'validar_evoluir',
    recommendedEncounter: 3,
    estimatedMinutes: 35,
    objective: 'Estruturar os 9 componentes autorais de sustentabilidade da solução, considerando valor gerado, recursos necessários, parcerias duradouras e viabilidade econômica plural.',
    whyWeDoThis: 'Uma ideia só causa impacto se conseguir permanecer viva e funcionando no território após o entusiasmo inicial da oficina.',
    instructions: [
      'Revisem o Briefing V1 (AF06), a entrega testada (AF08) e os aprendizados de campo (AF09).',
      'Copiem o Prompt P10 com o contexto acumulado.',
      'Respondam às provocações sobre os 9 componentes autorais de sustentabilidade: público beneficiado, proposta de valor, canais, relacionamento, recursos-chave, atividades, parcerias, custos e receitas plurais.',
      'Evitem presumir dependência exclusiva de patrocínios pontuais.',
      'Salvem o Artefato AF10 — Modelo de Sustentabilidade.'
    ],
    dependencies: [
      { artifactId: 'AF06', level: 'recommended_context', description: 'Briefing V1.' },
      { artifactId: 'AF08', level: 'recommended_context', description: 'MVP e Protótipo.' },
      { artifactId: 'AF09', level: 'required_input', description: 'Aprendizados validados no teste de campo.' }
    ],
    manualInputs: ['Estimativas de recursos para manter a solução'],
    promptId: 'P10',
    outputArtifactId: 'AF10',
    completionCriteria: [
      'Modelo de sustentabilidade estruturado com fontes de viabilidade realistas (AF10).'
    ],
    nextActivityId: 'A11'
  },

  A11: {
    id: 'A11',
    order: 11,
    title: 'Planejar Evolução (Roadmap + Linha do Tempo em 7 Etapas)',
    shortTitle: 'Roadmap + Linha do Tempo',
    macroMovement: 'validar_evoluir',
    recommendedEncounter: 3,
    estimatedMinutes: 35,
    objective: 'Organizar a continuidade da solução em 4 horizontes de prioridade e coordenar a linha do tempo em 7 etapas práticas de execução pós-oficina.',
    whyWeDoThis: 'Diferenciar o que é urgente do que é horizonte futuro evita sobrecarga da equipe e dá clareza sobre quem faz o quê no dia seguinte ao encerramento.',
    instructions: [
      'Cruzem os aprendizados do teste (AF09) e a sustentabilidade (AF10).',
      'Copiem o Prompt P11 para apoiar a organização do roadmap.',
      'Distribuam as ações nos 4 horizontes: Agora, Depois, Futuramente e O que NÃO faremos agora.',
      'Estruturem as 7 etapas coordenadas com prazos e responsáveis definidos.',
      'Salvem o Artefato AF11 — Roadmap + Linha do Tempo em 7 Etapas.'
    ],
    dependencies: [
      { artifactId: 'AF06', level: 'recommended_context', description: 'Briefing V1.' },
      { artifactId: 'AF09', level: 'required_input', description: 'Aprendizados do teste.' },
      { artifactId: 'AF10', level: 'required_input', description: 'Modelo de sustentabilidade.' }
    ],
    manualInputs: ['Compromissos e disponibilidade da equipe'],
    promptId: 'P11',
    outputArtifactId: 'AF11',
    completionCriteria: [
      'Prioridades divididas nos 4 horizontes.',
      'Linha do tempo em 7 etapas documentada no Artefato AF11.'
    ],
    nextActivityId: 'A12'
  },

  // =========================================================================
  // MOVIMENTO 4: COMUNICAR E CELEBRAR (ENCONTRO 4) — A12
  // =========================================================================

  A12: {
    id: 'A12',
    order: 12,
    title: 'Comunicação Final (Pitch V1 + Roteiro Visual + Roteiro de Ensaio/Simulação)',
    shortTitle: 'Kit de Comunicação Final',
    macroMovement: 'comunicar_celebrar',
    recommendedEncounter: 4,
    estimatedMinutes: 90,
    objective: 'Elaborar a narrativa oral de 3 minutos fiel à jornada, estruturar o roteiro visual de apoio em até 6 telas e simular a banca examinadora com ensaio presencial.',
    whyWeDoThis: 'Apresentar com clareza e honestidade celebra a travessia da equipe e atrai parceiros, comunicando tanto as conquistas quanto os aprendizados e limites do projeto.',
    instructions: [
      'Alimentem o Prompt P12 com o contexto integral do projeto (AF01 a AF11).',
      'Estruturem o Pitch Oral de 3 minutos em primeira pessoa, mantendo a voz autêntica da equipe.',
      'Elaborem o roteiro visual de apoio (até 6 slides enxutos sem poluição de texto).',
      'Simulem a banca examinadora respondendo às perguntas difíceis preparadas pela IA.',
      'Realizem o ensaio cronometrado de 3 minutos alternando as falas dos integrantes.',
      'Apresentem para a turma, celebrem a trajetória e salvem o Artefato AF12 — Kit de Comunicação Final.'
    ],
    dependencies: [
      { artifactId: 'AF01', level: 'recommended_context', description: 'Origem do problema.' },
      { artifactId: 'AF02', level: 'recommended_context', description: 'Diagnóstico.' },
      { artifactId: 'AF06', level: 'required_input', description: 'Briefing V1 autoritativo.' },
      { artifactId: 'AF08', level: 'required_input', description: 'MVP e Protótipo demonstrável.' },
      { artifactId: 'AF09', level: 'required_input', description: 'Evidências do teste no mundo real.' },
      { artifactId: 'AF10', level: 'recommended_context', description: 'Sustentabilidade.' },
      { artifactId: 'AF11', level: 'recommended_context', description: 'Roadmap de evolução.' }
    ],
    manualInputs: ['Divisão de fala entre os membros da equipe', 'Protótipo para demonstração ao vivo'],
    promptId: 'P12',
    outputArtifactId: 'AF12',
    completionCriteria: [
      'Pitch oral de 3 minutos memorizado e ensaiado.',
      'Roteiro visual e preparação para banca consolidados no Artefato AF12.'
    ]
  }
};

export const CANONICAL_ACTIVITY_LIST_V2: CanonicalActivityV2[] = [
  CANONICAL_ACTIVITIES_V2.A01,
  CANONICAL_ACTIVITIES_V2.A02,
  CANONICAL_ACTIVITIES_V2.A03,
  CANONICAL_ACTIVITIES_V2.A04,
  CANONICAL_ACTIVITIES_V2.A05,
  CANONICAL_ACTIVITIES_V2.A06,
  CANONICAL_ACTIVITIES_V2.A07,
  CANONICAL_ACTIVITIES_V2.A08,
  CANONICAL_ACTIVITIES_V2.A09,
  CANONICAL_ACTIVITIES_V2.A10,
  CANONICAL_ACTIVITIES_V2.A11,
  CANONICAL_ACTIVITIES_V2.A12,
];

export function getCanonicalActivityById(id: ActivityId | string): CanonicalActivityV2 {
  if (!id) return CANONICAL_ACTIVITIES_V2.A01;
  const activity = CANONICAL_ACTIVITIES_V2[id as ActivityId];
  if (activity) return activity;
  return CANONICAL_ACTIVITIES_V2.A01;
}

export function getNextActivityById(id: ActivityId | string): CanonicalActivityV2 | null {
  const current = getCanonicalActivityById(id);
  if (current.nextActivityId && CANONICAL_ACTIVITIES_V2[current.nextActivityId]) {
    return CANONICAL_ACTIVITIES_V2[current.nextActivityId];
  }
  return null;
}

export function getPreviousActivityById(id: ActivityId | string): CanonicalActivityV2 | null {
  const currentId = id as ActivityId;
  const prev = CANONICAL_ACTIVITY_LIST_V2.find((a) => a.nextActivityId === currentId);
  return prev || null;
}
