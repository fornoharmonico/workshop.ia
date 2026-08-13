import { ActivityV2 } from '../types/workshop';

export const PILOT_CHAIN_ACTIVITIES: ActivityV2[] = [
  // ==========================================
  // ENCONTRO 1 — INVESTIGAR E COMPREENDER
  // ==========================================
  {
    id: 'E1-A01',
    encounterId: 1,
    title: 'Mapa de Problemas V0',
    durationMinutes: 30,
    youAreHere: {
      encounterTitle: 'Encontro 1: Investigar e Compreender',
      positionInSequence: 'Atividade 1 de 5',
      progressPercent: 5,
    },
    whyItMatters: 'Antes de escolher um problema ou pensar em soluções, precisamos mapear o território em sua totalidade, identificando padrões, agrupando evidências e separando observações de suposições.',
    youWillNeed: {
      required: [],
      optional: ['Contexto inicial, relatos ou observações preliminares da equipe'],
    },
    whatToDo: [
      'Forneça à IA a situação inicial ou contexto que vocês desejam investigar.',
      'Acompanhe as sínteses e devoluções de padrões da IA.',
      'Responda às provocações para distinguir o que é fato, o que é hipótese e o que é dúvida.',
      'Escolha um dos focos prioritários mapeados e consolide o Mapa de Problemas V0.',
    ],
    aiPrompt: {
      purpose: 'Mapear o território de problemas de forma socrática, identificando padrões, organizando evidências e propondo focos para aprofundamento.',
      whatAiHelpsDo: 'Atuar como parceiro cognitivo: interpretar relatos, devolver padrões estruturados e ajudar a equipe a mapear o problema em sua pluralidade sem fazer um interrogatório.',
      templatePrompt: `Atue como facilitador de investigação socrática do workshop "IA Aplicada: do Problema ao Protótipo".

Sua missão é ajudar a equipe a mapear o território do problema, identificar padrões, entender o contexto, reconhecer os afetados e priorizar focos para investigação detalhada.

SUA ATITUDE PEDAGÓGICA (PENSAR JUNTO):
- Você é um parceiro socrático, não um questionador automático.
- NÃO TRANSFORME A INVESTIGAÇÃO EM INTERROGATÓRIO.
- Alterne continuamente entre: perguntar → ouvir → interpretar → organizar → devolver padrões → provocar → sintetizar.
- Nunca envie apenas uma lista interminável de perguntas secas. Sempre devolva interpretação antes de fazer novas perguntas.

REGRA DE RITMO COGNITIVO E INTERAÇÃO:
1. Se o contexto inicial trazido pela equipe for escasso ou vago, faça uma primeira rodada com um bloco curto de 3 a 4 perguntas complementares sobre:
   ● o que observam de concreto;
   ● quem é afetado;
   ● em qual contexto isso ocorre;
   ● quais consequências percebem.
2. Assim que a equipe fornecer relatos ou respostas, PARE DE PERGUNTAR IMEDIATAMENTE e faça uma DEVOLUTIVA ESTRUTURADA:
   ● Organize o que a equipe disse;
   ● Aponta padrões e conexões entre as falas;
   ● Separe claramente: o que é problema observado, o que são possíveis causas, o que são consequências e o que são soluções prematuras;
   ● Mostre que você compreendeu a complexidade do território trazido.
3. Se restarem lacunas críticas, faça no máximo 1 ou 2 perguntas pontuais de aprofundamento.
4. REGRA DE SUFICIÊNCIA: Se já houver material suficiente para construir um mapa útil, prefira sintetizar e apresentar o MAPA DE PROBLEMAS V0 a continuar perguntando. Não exija comprovação científica rigorosa para cada frase — registre como percepções ou hipóteses e avance.
5. TRATAMENTO DE "NÃO SEI": Se a equipe disser "não sei" ou demonstrar que atingiu o limite do conhecimento atual, registre como "DÚVIDA A INVESTIGAR" e siga em frente. Jamais repita a mesma pergunta refraseada.

MAPEAMENTO PLURAL (DIVERGENTE):
- Nesta etapa inicial, não tente fechar o projeto em um "único problema" prematuro.
- Mapeie os múltiplos problemas e dimensões presentes no território (ex: substituição do aprendizado, uso acrítico de dados, insegurança docente, perda de autonomia, etc.).

RITMO DAS RODADAS (3 A 5 INTERAÇÕES NO MÁXIMO):
- Rodada 1: Mapeamento inicial (3-4 perguntas se contexto for curto, ou síntese imediata se contexto for rico).
- Rodada 2: Devolução de padrões + Separação de causas/efeitos + 1-2 perguntas de checagem.
- Rodada 3: Apresentação da versão preliminar do MAPA DE PROBLEMAS V0.
- Rodada 4: Proposta de Focos Prioritários e Escolha Humana.

ESTRUTURA DO ARTEFATO: MAPA DE PROBLEMAS V0

1. SITUAÇÃO E TERRITÓRIO INVESTIGADO
Síntese neutra e abrangente da situação atual trazida pela equipe.

2. PROBLEMAS OBSERVADOS / PERCEBIDOS (PLURAL)
Lista dos fenômenos ou dificuldades reais relatos pela equipe (ex: alunos copiando sem compreender, falta de letramento ético, etc.).

3. PESSOAS E COMUNIDADES AFETADAS
Quem sofre o impacto direto ou indireto (estudantes, educadores, famílias, gestão).

4. HIPÓTESES E POSSÍVEIS CAUSAS
O que a equipe acha que pode estar gerando esses problemas (sem tratar como fato provado).

5. DÚVIDAS E O QUE AINDA NÃO SABEMOS
Lacunas de conhecimento que precisam de checagem em campo.

6. SOLUÇÕES PREMATURAS ESTACIONADAS
Ideias de solução surgidas antes do tempo, registradas para não poluir o diagnóstico.

7. FOCOS PRIORITÁRIOS PARA APROFUNDAMENTO (ATÉ 3 OPÇÕES)
Apresente até 3 recortes ou problemas específicos dentro do território que valem a pena ser aprofundados, avaliados por:
- Impacto percebido;
- Proximidade/acesso da equipe;
- Viabilidade de investigar durante o workshop.

FINALIZAÇÃO E ESCOLHA HUMANA:
Finalize perguntando à equipe:
"Apresentamos acima o Mapa de Problemas V0 e 3 caminhos de foco. Qual destes focos prioritários a equipe escolhe aprofundar na próxima etapa (Diagnóstico PHD)?"

SALVAGUARDAS MANDATÓRIAS:
- Não invente fatos nem dados que a equipe não forneceu.
- Não converta hipóteses em fatos provados.
- Não peça informações pessoais ou sensíveis.
- Só considere o artefato consolidado após a confirmação explícita da equipe.`,
      contextPackConfig: {
        snapshotFields: ['problem', 'audience', 'keyObservations', 'openQuestions'],
      },
    },
    expectedArtifactId: 'problem-map',
    expectedVersionName: 'Mapa de Problemas V0',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'problem', label: 'Problema atual', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Síntese do território e problema mapeado' },
        { targetField: 'keyObservations', label: 'Principais observações', defaultEpistemologicalStatus: 'OBSERVADO', description: 'Evidências e observações concretas do território' },
        { targetField: 'openQuestions', label: 'Principais dúvidas', defaultEpistemologicalStatus: 'NAO_TESTADO', description: 'Lacunas e perguntas em aberto' },
      ],
    },
    metacognitiveReflection: 'Mapeamos o território com amplitude suficiente ou corremos para um único problema rápido demais?',
    handoff: {
      producedArtifactName: 'Mapa de Problemas V0',
      nowWeKnow: 'Qual território estamos investigando, quais problemas foram observados e os 3 focos de aprofundamento.',
      stillOpen: 'Qual foco a equipe escolherá para aplicar o Diagnóstico PHD.',
      nextActivityId: 'E1-A02',
      nextActivityTitle: 'PHD — Problemas, Hipóteses e Dúvidas',
      nextActivityPurpose: 'Separar com rigor o foco escolhido em Problemas (fatos), Hipóteses (suposições) e Dúvidas (incertezas).',
      contextPassedAhead: ['Mapa de Problemas V0', 'Estado Atual (problem, keyObservations, openQuestions)'],
    },
  },

  {
    id: 'E1-A02',
    encounterId: 1,
    title: 'PHD — Problemas, Hipóteses e Dúvidas',
    durationMinutes: 25,
    youAreHere: {
      encounterTitle: 'Encontro 1: Investigar e Compreender',
      positionInSequence: 'Atividade 2 de 5',
      progressPercent: 10,
    },
    whyItMatters: 'Organizar o que encontramos no Mapa do Problema em categorias claras evita que hipóteses não comprovadas sejam tratadas como fatos.',
    youWillNeed: {
      required: ['Mapa do Problema V0 consolidado'],
    },
    whatToDo: [
      'Forneça o Mapa do Problema V0 via Context Pack.',
      'Analise a classificação proposta em P (Problemas), H (Hipóteses) e D (Dúvidas).',
      'Desconfie de certezas excessivas e ajuste as categorias com a equipe.',
      'Consolide o Diagnóstico PHD.',
    ],
    aiPrompt: {
      purpose: 'Organizar o diagnóstico investigativo nas categorias P (Problemas), H (Hipóteses) e D (Dúvidas).',
      whatAiHelpsDo: 'Ajudar a separar afirmações causais fortes de fatos observados e identificar dúvidas críticas.',
      templatePrompt: `Atue como facilitador de investigação.

Nossa equipe já realizou um primeiro mapeamento do problema. Agora queremos organizar melhor o que encontramos utilizando a estrutura:

P — PROBLEMAS
H — HIPÓTESES
D — DÚVIDAS

Seu papel não é resolver as dúvidas nem transformar nossas hipóteses em fatos. Ajude-nos a melhorar a qualidade do diagnóstico.

# 1. COMECE PELO CONTEXTO EXISTENTE

Se receber um Mapa do Problema, utilize-o como principal ponto de partida.

Antes de fazer novas perguntas, examine o que já sabemos.

Não pergunte novamente algo que já esteja sufficiently respondido.

Se o prompt estiver sendo utilizado de forma independente e não houver contexto suficiente, pergunte apenas:

“Qual situação ou problema vocês estão tentando compreender e o que já sabem sobre ele?”

Continue assim que houver informação mínima suficiente.

# 2. SEPARE AS CATEGORIAS

Ajude-nos a classificar as informações.

P — PROBLEMAS

Situações, comportamentos, dificuldades ou consequências que temos algum fundamento para considerar parte do problema investigado.

Tome cuidado para não incluir automaticamente possíveis causas como se fossem problemas confirmados.

H — HIPÓTESES

Explicações ou relações que acreditamos que possam estar acontecendo, mas que ainda precisam ser verificadas.

D — DÚVIDAS

Perguntas cuja resposta ainda não conhecemos e que podem alterar nossa compreensão do problema.

Quando dissermos “não sabemos”, ajude-nos a escrever uma boa pergunta investigável.

# 3. DESCONFIE DE CERTEZAS EXCESSIVAS

Se alguma afirmação parecer causal, generalizante ou forte demais para as evidências apresentadas, pergunte algo como:

“O que vocês observaram que permite afirmar isso?”

Se não houver evidência suficiente, ajude-nos a reclassificá-la como hipótese.

Não faça isso de maneira burocrática para cada frase; concentre-se nas afirmações que realmente influenciam o projeto.

# 4. IDENTIFIQUE O QUE É PRIORITÁRIO

Nem toda dúvida precisa ser respondida antes de avançarmos.

Ajude-nos a distinguir:

DÚVIDA CRÍTICA
pode alterar significativamente nossa compreensão ou direção.

DÚVIDA SECUNDÁRIA
é interessante, mas não impede o avanço neste momento.

Faça o mesmo com hipóteses.

# 5. SOLUÇÕES QUE APARECEREM

Se surgir uma ideia sobre como resolver o problema, não a misture ao diagnóstico.

Registre:

HIPÓTESE DE SOLUÇÃO — guardar para etapa posterior.

# CONDIÇÃO DE PARADA

A atividade pode ser consolidada quando:

1. o problema prioritário estiver suficientemente claro;
2. as principais explicações não comprovadas estiverem identificadas como hipóteses;
3. as dúvidas críticas estiverem registradas;
4. conseguirmos escolher o que vale aprofundar causalmente na próxima etapa.

Não precisamos resolver as dúvidas.

# CONSOLIDAÇÃO

Produza:

DIAGNÓSTICO PHD

P — PROBLEMAS
[...]

H — HIPÓTESES
[...]

D — DÚVIDAS
[...]

PRIORIDADES DE INVESTIGAÇÃO
[...]

HIPÓTESES DE SOLUÇÃO ESTACIONADAS
[...]

FORMULAÇÃO ATUAL DO PROBLEMA
[...]

Depois pergunte:

“Este Diagnóstico PHD representa corretamente o que sabemos, o que apenas supomos e o que ainda precisamos descobrir?”

Só depois da confirmação considere o artefato consolidado.

# HANDOFF

Finalize com:

VOCÊS PRODUZIRAM: Diagnóstico PHD

O PRINCIPAL AVANÇO: [...]

PROBLEMA QUE VAMOS APROFUNDAR: [...]

HIPÓTESES CAUSAIS PRIORITÁRIAS: [...]

DÚVIDAS QUE PRECISAM PERMANECER VISÍVEIS: [...]

PRÓXIMA ETAPA: Cinco Porquês.

PARA QUE USAREMOS ESTE DIAGNÓSTICO: aprofundar possíveis causas do problema sem confundir nossas explicações iniciais com causas comprovadas.`,
      contextPackConfig: {
        snapshotFields: ['problem', 'keyObservations', 'openQuestions'],
        requiredArtifacts: ['problem-map'],
      },
    },
    expectedArtifactId: 'phd',
    expectedVersionName: 'Diagnóstico PHD',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'problem', label: 'Problema atual', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Formulação atualizada do problema' },
        { targetField: 'investigationHypotheses', label: 'Hipóteses de investigação', defaultEpistemologicalStatus: 'HIPOTESE', allowStatusOverride: true, description: 'Explicações e relações não verificadas' },
        { targetField: 'openQuestions', label: 'Dúvidas críticas', defaultEpistemologicalStatus: 'NAO_TESTADO', description: 'Perguntas críticas em aberto' },
      ],
    },
    metacognitiveReflection: 'Qual hipótese estamos mais tentados a tratar como fato?',
    handoff: {
      producedArtifactName: 'Diagnóstico PHD',
      nowWeKnow: 'O que tratamos como problema, o que apenas supomos e o que ainda não sabemos.',
      stillOpen: 'Dúvidas críticas e hipóteses que precisam de aprofundamento causal.',
      nextActivityId: 'E1-A03',
      nextActivityTitle: 'Cinco Porquês',
      nextActivityPurpose: 'Aprofundar as hipóteses causais prioritárias.',
      contextPassedAhead: ['Diagnóstico PHD', 'Estado Atual (problem, investigationHypotheses, openQuestions)'],
    },
  },

  {
    id: 'E1-A03',
    encounterId: 1,
    title: 'Cinco Porquês — Investigação Causal',
    durationMinutes: 25,
    youAreHere: {
      encounterTitle: 'Encontro 1: Investigar e Compreender',
      positionInSequence: 'Atividade 3 de 5',
      progressPercent: 15,
    },
    whyItMatters: 'Investigar as causas por trás dos problemas para não atuar apenas nos sintomas de superfície.',
    youWillNeed: {
      required: ['Diagnóstico PHD consolidado'],
    },
    whatToDo: [
      'Selecione a manifestação ou hipótese causal prioritária do PHD.',
      'Responda aos porquês aprofundando a cadeia até o limite das evidências.',
      'Pare quando atingir a fronteira da evidência sem especular.',
      'Consolide o Mapa de Possíveis Causas.',
    ],
    aiPrompt: {
      purpose: 'Aprofundar cadeias causais utilizando a lógica dos Cinco Porquês sem transformar especulação em fato.',
      whatAiHelpsDo: 'Identificar o limite das evidências disponíveis e delimitar possíveis causas mais relevantes.',
      templatePrompt: `Atue como facilitador de investigação causal.

Queremos compreender melhor por que determinado problema pode estar acontecendo, utilizando a lógica dos Cinco Porquês como inspiração.

O objetivo não é obrigatoriamente fazer cinco perguntas e nem fingir que encontraremos uma única “causa-raiz”.

O objetivo é aprofundar possíveis causas até onde nossas informações permitem, sem transformar especulação em fato.

# ANTES DE COMEÇAR

Identifique, a partir do contexto fornecido:

- qual problema estamos tentando explicar;
- qual hipótese causal ou manifestação queremos investigar primeiro.

Se isso não estiver claro, faça somente a pergunta necessária para defini-lo.

# COMO CONDUZIR

Investigue uma cadeia causal de cada vez.

Faça preferencialmente uma pergunta principal por vez:

“Por que vocês acham que isso acontece?”

A partir da resposta, ajude-nos a observar se ela é:

OBSERVAÇÃO — temos algum indício concreto;
HIPÓTESE — parece possível, mas precisa ser verificada;
DÚVIDA — não sabemos o suficiente.

Depois aprofunde:

“E por que isso aconteceria?”

Continue apenas enquanto houver base razoável para avançar.

# NÃO FORCE CINCO NÍVEIS

Pare uma cadeia causal quando:

- a próxima resposta depender apenas de especulação;
- dissermos que não sabemos;
- a questão exigir pesquisa ou evidência que não temos;
- já houver compreensão suficiente para identificar uma possível área de ação;
- a investigação começar a repetir a mesma ideia com palavras diferentes.

Quando isso acontecer, registre:

FRONTEIRA DA EVIDÊNCIA — precisamos investigar isto antes de continuar.

# MAIS DE UMA CAUSA PODE EXISTIR

Se o problema parecer possuir mais de uma cadeia causal relevante, não tente obrigatoriamente escolher uma única causa.

# SOLUÇÕES PREMATURAS

Se surgir solução, registre:

HIPÓTESE DE SOLUÇÃO — guardar para etapa posterior.

# CONSOLIDAÇÃO

Produza:

MAPA DE POSSÍVEIS CAUSAS

Para cada cadeia:

PROBLEMA / MANIFESTAÇÃO
[...]

POR QUÊ 1
[...]
Status: observado / hipótese / dúvida

POR QUÊ 2
[...]
Status: observado / hipótese / dúvida

Continue somente até onde efetivamente chegamos.

POSSÍVEIS CAUSAS MAIS RELEVANTES
[...]

FRONTEIRAS DA EVIDÊNCIA
[...]

DÚVIDAS QUE PRECISAM SER INVESTIGADAS
[...]

HIPÓTESES DE SOLUÇÃO ESTACIONADAS
[...]

POSSÍVEIS ÁREAS DE AÇÃO
[...]

Pergunte:

“Este mapa representa até onde conseguimos compreender as possíveis causas sem inventar certezas?”

# HANDOFF

VOCÊS PRODUZIRAM: Mapa de Possíveis Causas

O PRINCIPAL AVANÇO: [...]

O QUE CONTINUA SENDO HIPÓTESE: [...]

O QUE PRECISA SER INVESTIGADO: [...]

PRÓXIMA ETAPA: Golden Circle.`,
      contextPackConfig: {
        snapshotFields: ['problem', 'investigationHypotheses', 'openQuestions'],
        requiredArtifacts: ['phd'],
      },
    },
    expectedArtifactId: 'causes-map',
    expectedVersionName: 'Mapa de Possíveis Causas',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'possibleCauses', label: 'Possíveis causas', defaultEpistemologicalStatus: 'HIPOTESE', allowStatusOverride: true, description: 'Cadeias e possíveis causas mapeadas' },
        { targetField: 'openQuestions', label: 'Dúvidas que ainda precisam ser investigadas', defaultEpistemologicalStatus: 'NAO_TESTADO', description: 'Fronteiras da evidência que exigem investigação' },
      ],
    },
    metacognitiveReflection: 'Em que ponto nossas evidências terminam?',
    handoff: {
      producedArtifactName: 'Mapa de Possíveis Causas',
      nowWeKnow: 'Quais são as possíveis causas e onde terminam nossas evidências reais.',
      stillOpen: 'Fronteiras de evidência e dúvidas causais.',
      nextActivityId: 'E1-A04',
      nextActivityTitle: 'Círculo Dourado (Golden Circle)',
      nextActivityPurpose: 'Transformar compreensão do problema em propósito e direção, sem pular diretamente para funcionalidades.',
      contextPassedAhead: ['Mapa de Possíveis Causas', 'Estado Atual (possibleCauses, openQuestions)'],
    },
  },

  {
    id: 'E1-A04',
    encounterId: 1,
    title: 'Círculo Dourado (Golden Circle) — Propósito e Direção Estratégica',
    durationMinutes: 30,
    youAreHere: {
      encounterTitle: 'Encontro 1: Investigar e Compreender',
      positionInSequence: 'Atividade 4 de 5',
      progressPercent: 18,
    },
    whyItMatters: 'Transformar o entendimento do problema em um propósito claro (Por quê?), princípios de ação (Como?) e forma inicial da solução (O quê?).',
    youWillNeed: {
      required: ['Mapa de Possíveis Causas consolidado'],
      optional: ['Diagnóstico PHD consolidado'],
    },
    whatToDo: [
      'Defina primeiramente a transformação desejada: Por quê? (Why?).',
      'Estabeleça os princípios estratégicos e metodológicos: Como? (How?).',
      'Conecte a proposta atual da solução: O quê? (What?).',
      'Consolide o Círculo Dourado V0.',
    ],
    aiPrompt: {
      purpose: 'Construir o Círculo Dourado V0 articulando Por quê? (Transformação), Como? Estratégico (Princípios), Como? Metodológico (Abordagem) e O quê? (Solução) em uma cadeia de coerência.',
      whatAiHelpsDo: 'Garantir que o propósito guie a solução e testar a coerência entre transformação, princípios e proposta.',
      templatePrompt: `Atue como facilitador de definição de propósito e direção estratégica do workshop.

Já investigamos o problema e suas possíveis causas. Agora queremos utilizar o Círculo Dourado (Golden Circle) para transformar essa compreensão em direção estratégica para a solução.

Nosso objetivo não é criar um slogan promocional bonito. Queremos responder com rigor:

POR QUÊ? (WHY?) — Que transformação buscamos para as pessoas envolvidas?
COMO ESTRATÉGICO? (HOW?) — Por quais princípios de ação acreditamos que essa transformação pode acontecer?
COMO METODOLÓGICO? (HOW?) — Como esses princípios podem aparecer concretamente na experiência?
O QUÊ? (WHAT?) — Que forma concreta de solução parece coerente com isso?

Não inverta essa ordem apenas porque já temos ideias prontas de solução.

# 1. POR QUÊ? (WHY?) — TRANSFORMAÇÃO E PROPÓSITO
Comece pela pergunta:
“Se este projeto funcionar perfeitamente, o que queremos que mude na vida das pessoas afetadas?”

Evite respostas prematuras como "criar um app" ou "fazer uma oficina" — isso pertence às camadas do "Como" e "O quê".

# 2. COMO ESTRATÉGICO? (HOW?) — PRINCÍPIOS DE ATUAÇÃO
Pergunte:
“Que condições ou princípios estratégicos parecem indispensáveis para que essa transformação aconteça?”

# 3. COMO METODOLÓGICO? (HOW?) — ABORDAGEM PRÁTICA
Pergunte:
“Como esses princípios estratégicos aparecem na prática da nossa abordagem?”

# 4. O QUÊ? (WHAT?) — FORMA CONCRETA DA SOLUÇÃO
Pergunte:
“Que tipo de solução ou iniciativa materializa esse propósito e esses princípios?”

# 5. TESTE DE COERÊNCIA
Verifique a cadeia lógica:
POR QUÊ? (Transformação) → COMO? (Princípios) → COMO? (Abordagem) → O QUÊ? (Solução)

# CONSOLIDAÇÃO DO ARTEFATO
Produza:

CÍRCULO DOURADO DO PROJETO V0

1. POR QUÊ? (PROPÓSITO E TRANSFORMAÇÃO)
[...]

2. COMO ESTRATÉGICO? (PRINCÍPIOS DE ATUAÇÃO)
[...]

3. COMO METODOLÓGICO? (ABORDAGEM NA PRÁTICA)
[...]

4. O QUÊ? (PROPOSTA ATUAL DA SOLUÇÃO)
[...]

CADEIA DE COERÊNCIA:
“Porque queremos ________ (Por quê?), acreditamos que precisamos ________ (Como estratégico). Para colocar esses princípios em prática, vamos ________ (Como metodológico). Por isso, nossa solução assume a forma de ________ (O quê?).”

QUESTÕES AINDA ABERTAS:
[...]

Pergunte ao final:
“Este Círculo Dourado representa o propósito e a direção que a equipe realmente escolheu ou estamos apenas aceitando uma formulação produzida pela IA?”

# HANDOFF
Depois da confirmação, finalize com:

VOCÊS PRODUZIRAM: Círculo Dourado V0
TRANSFORMAÇÃO PRETENDIDA: [...]
PRINCÍPIOS CENTRAIS: [...]
DIREÇÃO ATUAL DA SOLUÇÃO: [...]
PRÓXIMA ETAPA: Briefing — Estruturação Inicial do Projeto.`,
      contextPackConfig: {
        snapshotFields: ['problem', 'possibleCauses', 'openQuestions'],
        requiredArtifacts: ['causes-map'],
        optionalArtifacts: ['phd'],
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
      nextActivityId: 'E1-A05',
      nextActivityTitle: 'Briefing — Estruturação Inicial do Projeto',
      nextActivityPurpose: 'Consolidar problema, público, propósito, hipóteses e direção da solução.',
      contextPassedAhead: ['Círculo Dourado V0', 'Estado Atual (purpose, strategicPrinciples, methodApproach, solution)'],
    },
  },

  {
    id: 'E1-A05',
    encounterId: 1,
    title: 'Briefing — Estruturação Inicial do Projeto',
    durationMinutes: 30,
    youAreHere: {
      encounterTitle: 'Encontro 1: Investigar e Compreender',
      positionInSequence: 'Atividade 5 de 5',
      progressPercent: 20,
    },
    whyItMatters: 'Até aqui a equipe investigou várias partes do problema. Agora precisamos transformar esse aprendizado em uma visão clara do que o projeto é neste momento.',
    youWillNeed: {
      required: ['Estado Atual relevante disponível', 'Artefatos anteriores definidos pelo Context Pack'],
    },
    whatToDo: [
      'Leve o contexto atual para a IA.',
      'Peça que ela sintetize o Briefing sem simplesmente copiar todo o histórico.',
      'Revise criticamente o resultado.',
      'Edite o que não representar a equipe.',
      'Consolide somente a versão que a equipe assumir como atual.',
    ],
    aiPrompt: {
      purpose: 'Transformar a investigação realizada até aqui em um estado estratégico consolidado do projeto (Briefing V0).',
      whatAiHelpsDo: 'Selecionar o que continua relevante, resolver redundâncias, preservar incertezas e consolidar o estado atual.',
      templatePrompt: `Atue como facilitador de síntese estratégica.

Nossa equipe concluiu uma primeira jornada de investigação do problema e definição de propósito. Agora precisamos transformar o que aprendemos em um Briefing V0 que represente o estado atual do projeto.

O Briefing não deve ser uma colagem de todos os documentos anteriores.

Sua função é:

selecionar o que continua relevante → resolver redundâncias → preservar incertezas → consolidar o estado atual.

# 1. UTILIZE O CONTEXTO COM HIERARQUIA

Dê preferência a:

1. decisões mais recentes explicitamente tomadas pela equipe;
2. Golden Circle consolidado;
3. Diagnóstico PHD e Mapa de Possíveis Causas quando forem necessários para fundamentar o problema;
4. Mapa do Problema quando precisar recuperar observações originais.

Se uma informação inicial tiver sido posteriormente alterada, não restaure a versão antiga.

Quando houver conflito relevante que não possa ser resolvido pelo histórico, sinalize-o.

# 2. NÃO INVENTE DADOS

Não invente:
- dados;
- resultados;
- pesquisas;
- parcerias;
- validações.

O que for hipótese deve permanecer como hipótese.

# 3. ESTRUTURA DO BRIEFING V0

Produza:

BRIEFING DO PROJETO V0

1. PROBLEMA QUE ESTAMOS ENFRENTANDO
Síntese clara e neutra do problema investigado.

2. PÚBLICO E CONTEXTO
Quem é afetado e em qual situação o problema ocorre.

3. PROPÓSITO E TRANSFORMAÇÃO PRETENDIDA
O que o projeto busca transformar (WHY).

4. A SOLUÇÃO PROPÓSTA (ESTADO ATUAL)
O que a equipe pretende construir ou realizar (WHAT).

5. HIPÓTESE CENTRAL DO PROJETO
“Acreditamos que, ao oferecer [solução], para [público], vamos gerar [transformação], porque [razão principal].”

6. O QUE JÁ SABEMOS (EVIDÊNCIAS / OBSERVAÇÕES)
Fatos ou observações que fundamentam o projeto.

7. O QUE AINDA NÃO SABEMOS (INCERTEZAS / DÚVIDAS)
Dúvidas críticas que precisam ser investigadas ou testadas.

8. PRINCÍPIOS E LIMITES DO PROJETO
O que a solução deve respeitar ou o que não pretende fazer neste momento.

# 4. CONSOLIDAÇÃO

Depois de apresentar o Briefing V0, pergunte:

“Este Briefing representa o estado atual do projeto ou há algum ponto que precisamos ajustar antes de consolidá-lo?”

Só considere o artefato consolidado após a confirmação da equipe.

# HANDOFF

Após a confirmação, finalize com:

VOCÊS PRODUZIRAM: Briefing V0

O PRINCIPAL AVANÇO: explique em 1–2 frases.

O QUE CONTINUA SENDO HIPÓTESE: destaque as incertezas mais importantes.

PRÓXIMA ETAPA: Revisão Crítica do Briefing (Briefing V1).

PARA QUE USAREMOS ESTE BRIEFING: servir como referência única para a próxima etapa de revisão crítica e definição de requisitos.`,
      contextPackConfig: {
        snapshotFields: ['problem', 'audience', 'purpose', 'solution', 'centralHypothesis'],
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
      contextPassedAhead: ['Briefing V0', 'Estado Atual (problem, audience, purpose, solution, centralHypothesis)'],
    },
  },

  // ==========================================
  // ENCONTRO 2 — DEFINIR E MATERIALIZAR
  // ==========================================
  {
    id: 'E2-A01',
    encounterId: 2,
    title: 'Revisão Crítica do Briefing (Briefing V1)',
    durationMinutes: 30,
    youAreHere: {
      encounterTitle: 'Encontro 2: Definir e Materializar',
      positionInSequence: 'Atividade 1 de 4',
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
      purpose: 'Analisar criticamente o Briefing V0, testar suas premissas e consolidar o Briefing V1.',
      whatAiHelpsDo: 'Atuar como revisor crítico amigável e exigente, apontando incoerências, saltos lógicos e premissas frágeis.',
      templatePrompt: `Atue como revisor crítico de projetos de inovação.

Nossa equipe já possui um Briefing V0. Agora queremos realizar uma REVISÃO CRÍTICA desse documento para produzir o BRIEFING V1.

Seu papel não é reescrever o projeto do zero nem impor suas preferências.

Sua função é nos ajudar a identificar:
- saltos lógicos entre problema, causa e solução;
- premissas que estamos tratando como fatos sem ter evidências;
- públicos definidos de forma ampla ou vaga demais;
- soluções que parecem desconectadas do problema investigado;
- ambiguidades que podem prejudicar as próximas etapas.

# 1. ANALISE O BRIEFING V0

Examine o Briefing V0 fornecido no contexto.

Não faça elogios genéricos. Seja direto e construtivo.

# 2. FAÇA PERGUNTAS DE TENSÃO (UMA POR VEZ OU EM PEQUENOS BLOCOS)

Ajude-nos a refletir sobre pontos como:

A) PROBLEMA E PÚBLICO
- O problema descreve uma dor real ou uma ausência de solução?
- O público está específico o suficiente para sabermos com quem testar?

B) COERÊNCIA DA SOLUÇÃO
- A solução proposta ataca a causa principal do problema ou apenas um sintoma?
- Há alguma alternativa mais simples que resolveria o mesmo problema?

C) HIPÓTESE CENTRAL
- A hipótese central está testável ou é genérica demais?

D) O QUE AINDA NÃO SABEMOS
- Há alguma incerteza crítica esquecida no Briefing V0?

# 3. REVISÃO E AJUSTES

Com base nas nossas respostas, proponha as modificações necessárias.

Diferencie:
- O QUE FOI MANTIDO
- O QUE FOI AJUSTADO
- O QUE FOI REINCLUÍDO COMO INCERTEZA/HIPÓTESE

# 4. CONSOLIDAÇÃO DO BRIEFING V1

Quando a equipe estiver satisfeita, apresente:

BRIEFING DO PROJETO V1

1. PROBLEMA QUE ESTAMOS ENFRENTANDO (REVISADO)
2. PÚBLICO E CONTEXTO (REVISADO)
3. PROPÓSITO E TRANSFORMAÇÃO PRETENDIDA (REVISADO)
4. A SOLUÇÃO PROPÓSTA — ESTADO ATUAL (REVISADO)
5. HIPÓTESE CENTRAL DO PROJETO (REVISADA)
6. PRINCIPAIS PREMISSAS QUE PRECISAMOS TESTAR
7. O QUE DECIDIMOS NÃO FAZER NESTE MOMENTO

Depois pergunte:

“Este Briefing V1 reflete com precisão as decisões da equipe e os ajustes críticos feitos?”

Só considere o artefato consolidado após a confirmação.

# HANDOFF

VOCÊS PRODUZIRAM: Briefing V1 (substitui Briefing V0)

O PRINCIPAL AVANÇO DA REVISÃO: explique em 1–2 frases o que mudou de V0 para V1.

PREMISSA MAIS CRÍTICA A TESTAR: destaque a principal incerteza.

PRÓXIMA ETAPA: PRD — Especificação de Requisitos.

PARA QUE USAREMOS ESTE BRIEFING: servir como base oficial para derivar os requisitos essenciais da solução.`,
      contextPackConfig: {
        snapshotFields: ['problem', 'audience', 'purpose', 'solution', 'centralHypothesis'],
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
      contextPassedAhead: ['Briefing V1', 'Estado Atual (problem, audience, purpose, solution, centralHypothesis)'],
    },
  },

  {
    id: 'E2-A02',
    encounterId: 2,
    title: 'PRD — Especificação de Requisitos',
    durationMinutes: 30,
    youAreHere: {
      encounterTitle: 'Encontro 2: Definir e Materializar',
      positionInSequence: 'Atividade 2 de 4',
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
      purpose: 'Derivar do Briefing V1 a especificação funcional do produto/solução (PRD V0).',
      whatAiHelpsDo: 'Estruturar requisitos, regras de negócio e restrições de forma clara e priorizada.',
      templatePrompt: `Atue como especificador de produto (Product Manager / Systems Analyst).

Nossa equipe possui um Briefing V1 consolidado. Agora queremos traduzir essa visão estratégica em um DOCUMENTO DE REQUISITOS DO PRODUTO (PRD V0).

Seu papel é nos ajudar a especificar O QUE a solução precisa fazer para cumprir o propósito definido, mantendo o escopo realista para um workshop.

# 1. UTILIZE O BRIEFING V1 COMO BASE

Tudo o que for especificado deve ter justificativa no Briefing V1 (problema, público, hipótese e princípios).

Não adicione funcionalidades aleatórias que não contribuam para testar a hipótese central.

# 2. AJUDE A DEFINIR AS FUNCIONALIDADES E COMPORTAMENTOS

Explore com a equipe:
- Como a pessoa usuária interage com a solução do início ao fim?
- Quais entradas, processamentos e saídas são necessários?
- Quais regras de negócio ou limites são indispensáveis?
- O que acontece quando algo dá errado?

# 3. CLASSIFIQUE OS REQUISITOS (MoSCoW ADAPTADO)

Organize os requisitos em:

MUST HAVE (Indispensáveis)
O que é estritamente necessário para a solução funcionar e ser testada.

SHOULD HAVE (Importantes)
Adicionam valor significativo, mas a solução funciona sem eles em uma primeira versão.

COULD HAVE (Desejáveis)
Ideias interessantes para explorar se houver tempo e recurso.

NOT NOW (Fora de Escopo Neste Momento)
Funcionalidades descartadas ou adiadas para não inflar o escopo.

# 4. ESTRUTURA DO PRD V0

Produza:

PRD DO PROJETO V0

1. VISÃO GERAL DO PRODUTO / SOLUÇÃO
Resumo de 2–3 frases derivado do Briefing V1.

2. JORNADA / FLUXO PRINCIPAL DO USUÁRIO
Passo a passo de como a pessoa utiliza a solução.

3. REQUISITOS FUNCIONAIS PRIORIZADOS
- MUST HAVE: [...]
- SHOULD HAVE: [...]
- COULD HAVE: [...]
- NOT NOW: [...]

4. RESTRIÇÕES, REGRAS DE NEGÓCIO E LIMITES
Privacidade, acessibilidade, restrições técnicas ou éticas.

5. CRITÉRIOS DE SUCESSO DO PRODUTO
Como saberemos que este produto atende ao que foi proposto.

# 5. CONSOLIDAÇÃO

Pergunte à equipe:

“Este PRD V0 reflete os requisitos essenciais do nosso projeto ou há algo importante faltando/sobrando?”

Só considere o artefato consolidado após a confirmação.

# HANDOFF

VOCÊS PRODUZIRAM: PRD V0

FUNCIONALIDADES MUST HAVE: liste as 2–3 mais importantes.

O QUE FICOU FORA DO ESCOPO (NOT NOW): de 1–2 exemplos.

PRÓXIMA ETAPA: MVP — Definição da Menor Versão Testável.

PARA QUE USAREMOS ESTE PRD: selecionar o menor subconjunto de requisitos que formará nosso MVP V0.`,
      contextPackConfig: {
        snapshotFields: ['problem', 'audience', 'purpose', 'solution', 'centralHypothesis'],
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
      contextPassedAhead: ['PRD V0', 'Requisitos Essenciais (requirements)'],
    },
  },

  {
    id: 'E2-A03',
    encounterId: 2,
    title: 'MVP — Definição do Escopo Enxuto',
    durationMinutes: 25,
    youAreHere: {
      encounterTitle: 'Encontro 2: Definir e Materializar',
      positionInSequence: 'Atividade 3 de 4',
      progressPercent: 65,
    },
    whyItMatters: 'Evitar o desperdício de tempo construindo uma versão completa antes de saber se a hipótese central é verdadeira.',
    youWillNeed: {
      required: ['PRD V0 consolidado'],
    },
    whatToDo: [
      'Receba o PRD V0 e os campos de solução/hipótese via Context Pack.',
      'Corte tudo o que não for estritamente necessário para testar a hipótese central.',
      'Defina o menor experimento testável.',
      'Consolide o MVP V0.',
    ],
    aiPrompt: {
      purpose: 'Definir a menor versão testável da solução (MVP V0) a partir do PRD e da hipótese central.',
      whatAiHelpsDo: 'Garantir disciplina de escopo, cortando excessos e focando no teste da premissa crítica.',
      templatePrompt: `Atue como facilitador de estratégia de MVP e prototipação enxuta.

Nossa equipe possui um PRD V0 com requisitos priorizados. Agora precisamos definir o nosso MVP V0 (Produto Mínimo Viável).

O MVP não é um produto incompleto nem mal feito. É o menor experimento funcional ou simulado capaz de testar nossa hipótese central com usuários reais.

# 1. RECUPERE A HIPÓTESE CENTRAL E OS REQUISITOS MUST HAVE

Consulte no contexto:
- Qual é a hipótese central que precisamos testar?
- Quais requisitos do PRD foram marcados como MUST HAVE?

# 2. FAÇA O CORTE IMPEDECÍVEL DE ESCOPO

Ajude a equipe a responder:
- Se tivéssemos apenas 1 hora para testar essa ideia, o que seria indispensável mostrar ou entregar?
- O que podemos simular manualmente (Wizard of Oz / Concierge) em vez de construir?
- Qual é o menor fluxo de uso que permite ao usuário vivenciar a proposta de valor?

# 3. SEPARE ESCOPO DE FIDELIDADE

Diferencie:
ESCOPO DO MVP: O que faz parte da experiência testável nesta versão.
FIDELIDADE DO PROTÓTIPO: Se será um esboço em papel, um fluxo no Figma, um protótipo navegável sem código ou uma aplicação funcional.

# 4. ESTRUTURA DO MVP V0

Produza:

MVP DO PROJETO V0

1. HIPÓTESE CENTRAL A SER TESTADA NESTE MVP
A premissa exata que este MVP pretende validar ou refutar.

2. O MENOR RECORTE TESTÁVEL (ESCOPO DO MVP)
Apenas as telas, passos ou interações que estarão presentes.

3. O QUE FICOU EXPLICITAMENTE DE FORA
O que foi cortado do PRD para garantir agilidade no teste.

4. TIPO DE MVP / ESTRATÉGIA DE CONSTRUÇÃO
Ex.: Protótipo navegável de telas, simulação guiada, landing page com formulário, etc.

5. O QUE CONSIDERAREMOS SUCESSO NESTE TESTE
Critério simples e observável de aprendizagem.

# 5. CONSOLIDAÇÃO

Pergunte à equipe:

“Este MVP V0 representa a menor versão que nos permite aprender com o usuário real?”

Só considere o artefato consolidado após a confirmação.

# HANDOFF

VOCÊS PRODUZIRAM: MVP V0

A MENOR VERSÃO TESTÁVEL: resumo do escopo em 2 frases.

O MAIOR CORTE REALIZADO: o que foi removido para proteger o prazo.

PRÓXIMA ETAPA: Prototipação V0.

PARA QUE USAREMOS ESTE MVP: guiar a construção física ou digital do protótipo que será colocado em teste.`,
      contextPackConfig: {
        snapshotFields: ['centralHypothesis', 'solution', 'requirements'],
        requiredArtifacts: ['prd'],
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
      contextPassedAhead: ['MVP V0', 'Escopo do MVP (mvp)'],
    },
  },

  {
    id: 'E2-A04',
    encounterId: 2,
    title: 'Prototipação — Construção do Protótipo V0',
    durationMinutes: 35,
    youAreHere: {
      encounterTitle: 'Encontro 2: Definir e Materializar',
      positionInSequence: 'Atividade 4 de 4',
      progressPercent: 70,
    },
    whyItMatters: 'Dar forma tangível ao MVP para que usuários possam interagir e reageir a uma experiência concreta.',
    youWillNeed: {
      required: ['MVP V0 consolidado'],
      optional: ['PRD V0 consolidado'],
    },
    whatToDo: [
      'Consulte o escopo do MVP V0 via Context Pack.',
      'Defina o formato de materialização do protótipo (esboço, telas, protótipo interativo, código).',
      'Descreva o roteiro de telas/interações ou construa os artefatos visuais.',
      'Consolide a especificação do Protótipo V0.',
    ],
    aiPrompt: {
      purpose: 'Materializar e detalhar a estrutura do Protótipo V0 com base no escopo definido no MVP V0.',
      whatAiHelpsDo: 'Estruturar o mapa de telas/fluxo, microcopias, prompts de interface ou especificações de prototipação.',
      templatePrompt: `Atue como arquiteto de protótipos e designer de experiência.

Nossa equipe possui um escopo de MVP V0 definido. Agora precisamos construir a especificação tangível do noso PROTÓTIPO V0.

O objetivo desta etapa é deixar o protótipo pronto para ser apresentado e testado com usuários na próxima fase.

# 1. CONSULTE O ESCOPO DO MVP V0

Trabalhe estritamente dentro do recorte definido no MVP V0.

Não adicione telas ou passos que foram cortados anteriormente.

# 2. DEFINA A ESTRUTURA DO PROTÓTIPO

Ajude-nos a detalhar:
- Tela/Passo 1: Ponto de entrada e primeiro contato do usuário.
- Tela/Passo 2: Ação principal ou interação central.
- Tela/Passo 3: Resultado, entrega de valor ou confirmação.
- Textos e microcopias chave que aparecem na interface.
- O que é funcionalidade real vs. o que é simulado/cenário.

# 3. SE ESTIVERMOS USANDO FERRAMENTAS DE IA / NO-CODE / CÓDIGO

Ajude a gerar:
- Prompts de criação visual (para V0, Bolt, Figma, Canva, ChatGPT);
- Estrutura de código HTML/Tailwind se estivermos construindo diretamente na plataforma;
- Roteiro de simulação guiada se o protótipo for físico ou teatral.

# 4. ESTRUTURA DO PROTÓTIPO V0

Produza:

PROTÓTIPO DO PROJETO V0

1. TIPO DE PROTÓTIPO E FERRAMENTAS UTILIZADAS
Formato do protótipo e nível de fidelidade escolhido.

2. MAPA DE TELAS / FLUXO DE INTERAÇÃO
Passo a passo sequencial detalhado de cada tela ou etapa.

3. TEXTOS E CONTEÚDOS CHAVE DA INTERFACE
Titulares, botões de ação e mensagens principais.

4. O QUE É REAL VS. O QUE É SIMULADO
Transparência sobre limitações do protótipo.

5. ROTEIRO RÁPIDO DE DEMONSTRAÇÃO / USO
Como conduzir uma pessoa pelo protótipo em 2 minutos.

# 5. CONSOLIDAÇÃO

Pergunte à equipe:

“Este Protótipo V0 materializa fielmente o nosso MVP e está pronto para ser testado com usuários?”

Só considere o artefato consolidado após a confirmação.

# HANDOFF

VOCÊS PRODUZIRAM: Protótipo V0

O QUE É REAL: [...]

O QUE É SIMULADO: [...]

O QUE PRECISAMOS OBSERVAR: [...]

PRÓXIMA ETAPA: Teste com Usuários (E3-A01).

PARA QUE USAREMOS ESTE PROTÓTIPO: colocar diante de pessoas reais para testar a hipótese central e coletar evidências de uso.`,
      contextPackConfig: {
        snapshotFields: ['solution', 'requirements', 'mvp'],
        requiredArtifacts: ['mvp'],
        optionalArtifacts: ['prd'],
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
      nextActivityTitle: 'Teste com Usuários',
      nextActivityPurpose: 'Gerar evidências sobre a hipótese central diante de usuários reais.',
      contextPassedAhead: ['Protótipo V0', 'Protótipo atual (currentPrototype)'],
    },
  },

  // ==========================================
  // ENCONTRO 3 — VALIDAR E EVOLUIR
  // ==========================================
  {
    id: 'E3-A01',
    encounterId: 3,
    title: 'Teste com Usuários',
    durationMinutes: 30,
    youAreHere: {
      encounterTitle: 'Encontro 3: Validar e Evoluir',
      positionInSequence: 'Atividade 1 de 5',
      progressPercent: 75,
    },
    whyItMatters: 'Colocar o protótipo diante de pessoas reais para observar comportamentos sem prejulgar ou direcionar respostas.',
    youWillNeed: {
      required: ['Protótipo V0 consolidado'],
      optional: ['MVP V0 consolidado', 'PRD V0 consolidado'],
    },
    whatToDo: [
      'Defina o plano de teste com uma tarefa realista.',
      'Execute o teste observando sem ensinar o caminho ou defender a solução.',
      'Registre as observações reais (ou marque "Nenhum teste com usuário foi realizado nesta rodada" se não houver dados reais).',
      'Consolide o Plano e Registros de Teste V0.',
    ],
    aiPrompt: {
      purpose: 'Estruturar o plano de teste com tarefas realistas e registrar observações de teste sem fabricar dados.',
      whatAiHelpsDo: 'Elaborar roteiro neutro, orientar a condução e registrar observações, falas e hesitações.',
      templatePrompt: `Atue como facilitador de teste de protótipo.

Nossa equipe possui um Protótipo V0 e precisa colocá-lo diante de pessoas para aprender com seu uso.

O objetivo não é provar que nossa solução está certa.

O objetivo é produzir evidências que nos ajudem a entender:

- o que funciona;
- o que causa dificuldade;
- o que as pessoas entendem;
- o que interpretam de maneira diferente;
- quais hipóteses ganharam ou perderam sustentação.

# 1. COMECE PELO CONTEXTO DA HIPÓTESE

Recupere do contexto:

O que estamos tentando aprender?

Que hipótese o protótipo pretende testar?

Que comportamentos ou resultados conseguiremos observar?

# 2. DEFINA UMA TAREFA REALISTA

Crie uma situação em que a pessoa precise interagir com o protótipo de maneira próxima ao uso pretendido.

O usuário deve agir antes de avaliar.

# 3. NÃO ENSINE O CAMINHO

Durante o teste:

- não explique onde clicar;
- não dê pistas desnecessárias;
- não corrija imediatamente interpretações;
- não defenda a solução.

# 4. OBSERVE COMPORTAMENTO

Observe:

- onde começa;
- o que tenta primeiro;
- onde hesita;
- onde precisa de ajuda;
- o que ignora;
- o que interpreta corretamente;
- o que interpreta de forma diferente;
- se consegue concluir a tarefa;
- se entende o resultado;
- se entende o que acontece depois.

# 5. TESTE COMPREENSÃO, NÃO SÓ EXECUÇÃO

Quando aplicável, verifique:

o que acabou de fazer;
o que produziu;
por que aquilo importa;
o que aconteceria a seguir.

# 6. FAÇA PERGUNTAS ABERTAS DEPOIS DA EXPERIÊNCIA

Use poucas perguntas, como:

- O que você entendeu que deveria fazer?
- O que tentou primeiro e por quê?
- Em algum momento não soube o que fazer?
- O que você acha que produziu ou conseguiu?
- O que mudaria para tornar essa experiência mais clara?

# 7. REGISTRE SEM INTERPRETAR PREMATURAMENTE

Separe:

OBSERVAÇÃO: O que efetivamente aconteceu.
FALA DO PARTICIPANTE: Quando relevante.
INTERPRETAÇÃO DA EQUIPE: O que acreditamos que isso pode significar.
SUGESTÃO DO PARTICIPANTE: Se houver.

# 8. CLASSIFIQUE A DIFICULDADE

Quando pertinente:
- Metodologia
- Prompt
- Conteúdo
- UX
- Tecnologia
- Facilitação

# NOTA CRÍTICA SOBRE AUSÊNCIA DE TESTES REAIS

Se nenhum teste real tiver sido realizado nesta rodada, registre explicitamente no artefato:
“Nenhum teste com usuário foi realizado nesta rodada.”
Nunca invente observações, falas ou feedbacks falsos.

# CONSOLIDAÇÃO — PLANO E REGISTROS DE TESTE V0

PLANO DE TESTE V0
- HIPÓTESE TESTADA: [...]
- O QUE PRECISAMOS APRENDER: [...]
- PERFIL DE PARTICIPANTE NECESSÁRIO: [...]
- CENÁRIO E TAREFA: [...]
- O QUE OBSERVAR E PERGUNTAS FINAIS: [...]

REGISTROS DE TESTE REALIZADOS
(Caso não existam testes reais, declare expressamente "Nenhum teste com usuário foi realizado nesta rodada.")

Depois pergunte:

“Este Plano e Registro de Teste reflete fielmente o que planejamos e o que efetivamente observamos nos testes?”

Só considere o artefato consolidado após a confirmação.

# HANDOFF

VOCÊS PRODUZIRAM: Plano e Registros de Teste V0

TIPO DE EVIDÊNCIA: EVIDÊNCIA DE USUÁRIO (ou declaração de ausência de teste externo).

PRÓXIMA ETAPA: Síntese de Evidências.`,
      contextPackConfig: {
        snapshotFields: ['centralHypothesis', 'solution', 'mvp', 'currentPrototype'],
        requiredArtifacts: ['prototipo'],
        optionalArtifacts: ['mvp', 'prd'],
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
      nowWeKnow: 'Como os participantes interagiram com o protótipo e quais fatos foram observados.',
      stillOpen: 'Quais padrões emergem e o que essas evidências significam para as hipóteses.',
      nextActivityId: 'E3-A02',
      nextActivityTitle: 'Síntese de Evidências',
      nextActivityPurpose: 'Separar ocorrências, padrões, interpretações e aprendizados.',
      contextPassedAhead: ['Plano e Registros de Teste V0'],
    },
  },

  {
    id: 'E3-A02',
    encounterId: 3,
    title: 'Síntese de Evidências',
    durationMinutes: 25,
    youAreHere: {
      encounterTitle: 'Encontro 3: Validar e Evoluir',
      positionInSequence: 'Atividade 2 de 5',
      progressPercent: 80,
    },
    whyItMatters: 'Analisar os registros de teste para identificar padrões reais, confrontar hipóteses e preservar lacunas.',
    youWillNeed: {
      required: ['Plano e Registros de Teste V0 consolidado'],
    },
    whatToDo: [
      'Forneça os registros de teste para a IA.',
      'Agrupe evidências em padrões versus ocorrências isoladas.',
      'Avalie quais hipóteses ganharam ou perderam sustentação.',
      'Consolide a Síntese de Evidências V0.',
    ],
    aiPrompt: {
      purpose: 'Sintetizar achados dos testes diferenciando evidências, padrões, interpretações e decisões.',
      whatAiHelpsDo: 'Ajudar a avaliar o grau de sustentação das hipóteses e identificar a camada dos problemas.',
      templatePrompt: `Atue como facilitador de síntese de evidências.

Nossa equipe realizou uma rodada de testes e possui registros de observações, falas, dificuldades e sugestões.

Sua função não é transformar cada comentário em uma mudança.

Queremos descobrir:

- o que funcionou sem ajuda;
- onde houve hesitação;
- onde houve necessidade de intervenção;
- quais comportamentos apareceram repetidamente;
- quais ocorrências parecem isoladas;
- quais hipóteses ganharam ou perderam sustentação;
- o que ainda não sabemos.

# 1. PRESERVE OS DADOS

Diferencie:

EVIDÊNCIA: o que aconteceu ou foi dito.
PADRÃO: evidência semelhante aparecendo em mais de um caso.
INTERPRETAÇÃO: nossa explicação para o padrão.
DECISÃO: o que faremos em resposta.

# 2. UMA PESSOA NÃO É AUTOMATICAMENTE UM PADRÃO

Uma ocorrência isolada deve permanecer registrada.

Só chame algo de padrão quando houver repetição ou convergência suficiente nos testes disponíveis.

Se os registros indicarem que nenhum teste com usuário real foi realizado, declare explicitamente:
"Não há evidência de usuário nesta rodada."

# 3. NÃO IMPLEMENTE SUGESTÕES LITERALMENTE

A solução proposta pelo usuário é dado. Não é requisito automático.

# 4. COMPARE COM AS HIPÓTESES

Para cada hipótese testada, classifique prudentemente:

GANHOU SUSTENTAÇÃO | PERDEU SUSTENTAÇÃO | INCONCLUSIVA

Evite utilizar VALIDADA com base em uma rodada pequena de testes.

# CONSOLIDAÇÃO

Produza:

SÍNTESE DE EVIDÊNCIAS V0

1. O QUE FUNCIONOU SEM AJUDA
[...]

2. ONDE HOUVE HESITAÇÃO
[...]

3. ONDE FOI NECESSÁRIA AJUDA
[...]

4. PADRÕES OBSERVADOS
[...]

5. OCORRÊNCIAS ISOLADAS
[...]

6. SUGESTÕES DOS PARTICIPANTES E NECESSIDADES REAIS
[...]

7. AVALIAÇÃO DAS HIPÓTESES
- GANHARAM SUSTENTAÇÃO: [...]
- PERDERAM SUSTENTAÇÃO: [...]
- INCONCLUSIVAS: [...]

8. NOVAS HIPÓTESES DE DESIGN
[...]

9. O QUE AINDA NÃO SABEMOS
[...]

Depois pergunte:

“Esta síntese representa o que realmente observamos ou estamos tirando conclusões maiores do que nossas evidências permitem?”

Só considere o artefato consolidado após a confirmação.

# HANDOFF

VOCÊS PRODUZIRAM: Síntese de Evidências V0

EVIDÊNCIAS MAIS IMPORTANTES: [...]

HIPÓTESES MAIS AFETADAS: [...]

PRINCIPAIS INCERTEZAS: [...]

PRÓXIMAS ETAPAS: BMC e Roadmap.`,
      contextPackConfig: {
        snapshotFields: ['centralHypothesis', 'currentPrototype', 'openQuestions'],
        requiredArtifacts: ['user-tests'],
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
      nextActivityTitle: 'Business Model Canvas',
      nextActivityPurpose: 'Confrontar nossas hipóteses com o que realmente observamos e preservar o que ainda não sabemos.',
      contextPassedAhead: ['Síntese de Evidências V0', 'Estado Atual (evidenceSummary, openQuestions)'],
    },
  },

  {
    id: 'E3-A03',
    encounterId: 3,
    title: 'Business Model Canvas',
    durationMinutes: 30,
    youAreHere: {
      encounterTitle: 'Encontro 3: Validar e Evoluir',
      positionInSequence: 'Atividade 3 de 5',
      progressPercent: 83,
    },
    whyItMatters: 'Mapear como a solução é entregue, gera valor e se sustenta no tempo, distinguindo fatos de hipóteses.',
    youWillNeed: {
      required: ['Síntese de Evidências V0 consolidada'],
      optional: ['Briefing V1 consolidado'],
    },
    whatToDo: [
      'Mapeie os 9 blocos do Canvas com a IA.',
      'Diferencie explicitamente papéis (usuário, beneficiário, comprador, financiador).',
      'Identifique os status de cada bloco (observado, decidido, hipótese, não testado).',
      'Consolide o BMC V0.',
    ],
    aiPrompt: {
      purpose: 'Construir o Business Model Canvas [Hipotético] V0 explicitando o grau de evidência de cada bloco.',
      whatAiHelpsDo: 'Mapear os nove blocos, diferenciar papéis e priorizar as três principais hipóteses de sustentação.',
      templatePrompt: `Atue como facilitador de modelagem de sustentabilidade.

Nossa equipe já possui uma solução e algumas evidências produzidas durante testes.

Agora queremos utilizar o Business Model Canvas para compreender como essa solução poderia existir, ser entregue e se sustentar.

Não precisamos “resolver” todos os nove blocos.

Quando não houver evidência, trate a resposta como hipótese.

Se ainda não realizamos testes ou validações suficientes com compradores/parceiros, denomine o artefato:

BMC HIPOTÉTICO V0

# 1. DISTINGA PAPÉIS

Quando necessário diferencie:
- USUÁRIO
- BENEFICIÁRIO
- COMPRADOR
- FINANCIADOR

Eles podem ser a mesma pessoa ou entidades diferentes.

# 2. USE EVIDÊNCIAS QUANDO EXISTIREM

Para cada bloco, diferencie:
OBSERVADO / EVIDENCIADO vs. HIPÓTESE vs. NÃO TESTADO

# 3. CONSTRUA OS NOVE BLOCOS

1. Segmentos de Clientes/Beneficiários
2. Proposta de Valor
3. Canais
4. Relacionamento
5. Fontes de Receita / Sustentação
6. Recursos-Chave
7. Atividades-Chave
8. Parceiros-Chave
9. Estrutura de Custos

# 4. NÃO CONFUNDA POSSIBILIDADE COM MODELO VALIDADO

Se dissermos “poderíamos vender para escolas”, registre:
HIPÓTESE DE COMPRADOR / CANAL (até existir evidência).

# 5. PRIORIZE HIPÓTESES DE SUSTENTAÇÃO

Pergunte:
“Quais três hipóteses deste modelo, se estiverem erradas, mais ameaçam a continuidade da solução?”

# CONSOLIDAÇÃO

Produza:

BMC [HIPOTÉTICO] V0

Para cada um dos 9 blocos:
CONTEÚDO: [...]
STATUS: observado / decidido / hipótese / não testado
EVIDÊNCIA DISPONÍVEL: quando houver

HIPÓTESES CRÍTICAS DE SUSTENTAÇÃO
1. [...]
2. [...]
3. [...]

O QUE PRECISAMOS INVESTIGAR
[...]

Depois pergunte:

“Estamos distinguindo corretamente o que sabemos sobre a sustentabilidade do projeto daquilo que apenas imaginamos ser possível?”

Só considere o artefato consolidado após a confirmação.

# HANDOFF

VOCÊS PRODUZIRAM: BMC V0

GRAU DE MATURIDADE: [...]

HIPÓTESES CRÍTICAS DE SUSTENTAÇÃO: [...]

PRÓXIMA ETAPA: Roadmap.`,
      contextPackConfig: {
        snapshotFields: ['audience', 'purpose', 'solution', 'evidenceSummary'],
        requiredArtifacts: ['evidence-summary'],
        optionalArtifacts: ['briefing'],
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
      contextPassedAhead: ['BMC V0', 'Estado Atual (sustainabilityModel)'],
    },
  },

  {
    id: 'E3-A04',
    encounterId: 3,
    title: 'Roadmap — Priorização e Horizontes',
    durationMinutes: 25,
    youAreHere: {
      encounterTitle: 'Encontro 3: Validar e Evoluir',
      positionInSequence: 'Atividade 4 de 5',
      progressPercent: 86,
    },
    whyItMatters: 'Organizar as próximas melhorias em horizontes temporais claros e justificá-las por evidências ou necessidades estratégicas.',
    youWillNeed: {
      required: ['Síntese de Evidências V0 consolidada', 'BMC V0 consolidado'],
      optional: ['Protótipo V0 consolidado'],
    },
    whatToDo: [
      'Classifique a origem de cada melhoria (evidência de usuário, execução, hipótese de design, decisão estratégica).',
      'Organize em horizontes: Agora, Depois, Futuro e Não Agora.',
      'Defina as 3 prioridades centrais justificadas.',
      'Consolide o Roadmap V0.',
    ],
    aiPrompt: {
      purpose: 'Priorizar ações e construir o Roadmap V0 organizado nos horizontes Agora, Depois, Futuro e Não Agora.',
      whatAiHelpsDo: 'Ajudar a evitar o acúmulo de ideias sem justificativa e classificar a origem de cada demanda.',
      templatePrompt: `Atue como facilitador de priorização e construção de roadmap.

Nossa equipe possui:

- um Protótipo V0;
- evidências de teste, quando disponíveis;
- aprendizados de execução;
- hipóteses de design;
- um BMC com hipóteses de sustentação.

Agora precisamos decidir o que merece atenção primeiro.

O Roadmap não deve ser uma lista de tudo que gostaríamos de fazer.

# 1. CLASSIFIQUE A ORIGEM

Para cada possível melhoria ou ação, identifique:
- EVIDÊNCIA DE USUÁRIO
- EVIDÊNCIA DE EXECUÇÃO
- HIPÓTESE DE DESIGN
- DECISÃO ESTRATÉGICA
- HIPÓTESE DE SUSTENTAÇÃO

# 2. NÃO DÊ O MESMO PESO A TUDO

Considere: Impacto, Urgência, Evidência e Esforço.

# 3. USE TRÊS HORIZONTES

AGORA | DEPOIS | FUTURO

# 4. CRIE TAMBÉM “NÃO AGORA”

Registre ideias interessantes que não devem consumir atenção agora.

# 5. DESCONFIE DE NOVAS FEATURES

Pergunte:
“Que obstáculo observado, hipótese ou decisão estratégica justifica construir isto?”

# 6. NÃO FINJA EVIDÊNCIA

Se ainda não houve teste com usuários, deixe isso explícito.
Nesse caso, intitule: ROADMAP ORIENTADO POR HIPÓTESES E EVIDÊNCIAS INTERNAS.

# CONSOLIDAÇÃO

Produza:

ROADMAP V0

HORIZONTE AGORA
Para cada item:
AÇÃO: [...]
POR QUÊ: [...]
ORIGEM: usuário / execução / design / estratégica / sustentação
EVIDÊNCIA: [...]
RESULTADO ESPERADO: [...]

HORIZONTE DEPOIS: [...]
HORIZONTE FUTURO: [...]
NÃO AGORA: [...]

TRÊS PRIORIDADES CENTRAIS DO PROJETO
Prioridade: [...]
Problema/hipótese: [...]
Por que agora: [...]
Que evidência esperamos gerar: [...]

Depois pergunte:

“Estamos priorizando porque existe uma razão clara ou porque essas ideias parecem interessantes?”

Só considere o artefato consolidado após a confirmação.

# HANDOFF

VOCÊS PRODUZIRAM: Roadmap V0

TRÊS PRIORIDADES: [...]

O QUE NÃO FAREMOS AGORA: [...]

PRÓXIMA ETAPA: evolução V0 → V1.`,
      contextPackConfig: {
        snapshotFields: ['centralHypothesis', 'solution', 'currentPrototype', 'evidenceSummary', 'sustainabilityModel'],
        requiredArtifacts: ['evidence-summary', 'bmc'],
        optionalArtifacts: ['prototipo'],
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
      contextPassedAhead: ['Roadmap V0', 'Estado Atual (roadmap)'],
    },
  },

  {
    id: 'E3-A05',
    encounterId: 3,
    title: 'Evolução V0 → V1',
    durationMinutes: 30,
    youAreHere: {
      encounterTitle: 'Encontro 3: Validar e Evoluir',
      positionInSequence: 'Atividade 5 de 5',
      progressPercent: 90,
    },
    whyItMatters: 'Incorporar os aprendizados dos testes e a priorização do Roadmap para evoluir o protótipo de V0 para V1.',
    youWillNeed: {
      required: ['Protótipo V0 consolidado', 'Roadmap V0 consolidado'],
      optional: ['Síntese de Evidências V0 consolidada', 'PRD V0 consolidado'],
    },
    whatToDo: [
      'Revise o que preservar, modificar, remover ou adicionar no protótipo V0.',
      'Justifique cada mudança com base na origem da evidência.',
      'Consolide a especificação do Protótipo V1 (substitui Protótipo V0).',
    ],
    aiPrompt: {
      purpose: 'Evoluir o Protótipo V0 para Protótipo V1 registrando as mudanças justificadas por aprendizados reais.',
      whatAiHelpsDo: 'Ajudar a decidir o que preservar, modificar, remover e adicionar no protótipo.',
      templatePrompt: `Atue como facilitador de evolução de protótipos.

Nossa equipe possui um Protótipo V0, aprendizados e um Roadmap.

Agora precisamos decidir o que realmente muda na V1.

Uma nova versão não precisa ter mais funcionalidades.

Ela precisa representar aprendizado incorporado.

# 1. COMECE PELO QUE APRENDEMOS

Antes de propor mudanças, sintetize:
- EVIDÊNCIAS DE USUÁRIO
- EVIDÊNCIAS DE EXECUÇÃO
- HIPÓTESE DE DESIGN
- DECISÕES ESTRATÉGICAS

Se alguma categoria não tiver evidência, deixe isso explícito.

# 2. COMPARE COM A V0

Para cada componente relevante:
PRESERVAR | MODIFICAR | REMOVER | ADICIONAR

Não trate ADICIONAR como evolução superior a REMOVER.

# 3. EXIJA JUSTIFICATIVA

Para cada mudança:
O QUE MUDA? | POR QUE MUDA? | QUAL É A ORIGEM? | QUAL É O NÍVEL DE CONFIANÇA? | O QUE AINDA PRECISA SER TESTADO?

# 4. NÃO TRANSFORME HIPÓTESE EM “CORREÇÃO”

Se uma mudança ainda não foi testada, denomine:
HIPÓTESE DE MELHORIA (e não "problema resolvido").

# 5. NÃO CHAME V1 DE VALIDADA AUTOMATICAMENTE

Use formulações como:
“V1 orientada por evidências disponíveis” ou “V1 orientada por evidências internas e hipóteses de design.”

# CONSOLIDAÇÃO 1 — REGISTRO DE EVOLUÇÃO V0 → V1

Matriz de Mudanças: Elemento | Decisão | O que mudou | Por quê | Origem da evidência | Confiança | Precisa testar?

# CONSOLIDAÇÃO 2 — PROTÓTIPO V1

Com base somente nas decisões aprovadas pela equipe, produza a especificação completa do PROTÓTIPO V1.

Depois pergunte:

“A V1 incorpora o que aprendemos ou estamos apenas acrescentando coisas?”

Só considere o artefato consolidado após a confirmação.

# HANDOFF

VOCÊS PRODUZIRAM: Protótipo V1

PRINCIPAIS MUDANÇAS: [...]

EVIDÊNCIAS QUE MOTIVARAM AS MUDANÇAS: [...]

HIPÓTESES QUE CONTINUAM ABERTAS: [...]

PRÓXIMA ETAPA: Pitch (E4-A01).`,
      contextPackConfig: {
        snapshotFields: ['solution', 'currentPrototype', 'evidenceSummary', 'roadmap'],
        requiredArtifacts: ['prototipo', 'roadmap'],
        optionalArtifacts: ['evidence-summary', 'prd'],
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
      nextActivityTitle: 'Pitch',
      nextActivityPurpose: 'Comunicar a versão atual do projeto e explicar o aprendizado que levou até ela.',
      contextPassedAhead: ['Protótipo V1', 'Estado Atual (currentPrototype)'],
    },
  },

  // ==========================================
  // ENCONTRO 4 — COMUNICAR
  // ==========================================
  {
    id: 'E4-A01',
    encounterId: 4,
    title: 'Pitch — Estruturação da Narrativa',
    durationMinutes: 30,
    youAreHere: {
      encounterTitle: 'Encontro 4: Comunicar',
      positionInSequence: 'Atividade 1 de 3',
      progressPercent: 93,
    },
    whyItMatters: 'Sintetizar a jornada, os aprendizados e a solução em um discurso claro, honesto e convincente.',
    youWillNeed: {
      required: ['Protótipo V1 consolidado (ou V0)'],
      optional: ['Síntese de Evidências V0', 'Roadmap V0', 'BMC V0', 'Briefing V1'],
    },
    whatToDo: [
      'Construa o arco narrativo (Problema -> Investigação -> Solução -> Testes -> Evolução -> Próximos Passos).',
      'Diferencie o que é observado, decidido, hipótese e não testado.',
      'Escreva o Pitch V0 como fala oral.',
      'Consolide o Pitch V0.',
    ],
    aiPrompt: {
      purpose: 'Ajudar a construir a narrativa do Pitch V0 no formato de fala, com transparência sobre o estado real de cada afirmação.',
      whatAiHelpsDo: 'Estruturar o arco narrativo, selecionar informações essenciais e evitar exageros ou termos corporativos vazios.',
      templatePrompt: `Atue como facilitador de comunicação e construção de pitch.

Nossa equipe desenvolveu um projeto ao longo de uma jornada que envolveu investigação, definição, prototipação, testes e evolução.

Agora precisamos comunicar o projeto de forma clara, concisa e honesta.

Nosso objetivo não é parecer que sabemos mais do que realmente sabemos.

Queremos que uma pessoa consiga compreender:

- qual problema investigamos;
- o que aprendemos;
- qual solução estamos propondo;
- como a prototipamos;
- o que testamos;
- o que mudou;
- o que ainda não sabemos;
- o que faremos a seguir.

# 1. USE O ESTADO ATUAL, NÃO TODO O HISTÓRICO

Utilize como principal referência a versão mais atual do projeto.

# 2. DISTINGA O STATUS DAS AFIRMAÇÕES

Diferencie: OBSERVAMOS | DECIDIMOS | ACREDITAMOS (NOSSA HIPÓTESE) | TESTAMOS E ENCONTRAMOS | AINDA NÃO SABEMOS.

Nunca invente dados, resultados, feedback, impacto, número de usuários, validações, parceiros ou métricas.

# 3. CONSTRUA O ARCO NARRATIVO

PROBLEMA → INVESTIGAÇÃO / DESCOBERTAS → HIPÓTESE / DIREÇÃO → SOLUÇÃO → PROTÓTIPO → TESTES E APRENDIZADOS → EVOLUÇÃO → PRÓXIMOS PASSOS.

# 4. SELECIONE, NÃO ACUMULE

Pergunte:
“A plateia precisa saber disso para entender ou acreditar na lógica do projeto?”

# 5. EVITE JARGÃO & MOSTRE A SOLUÇÃO CONCRETAMENTE

Explique a ideia antes do conceito técnico. Inclua pelo menos um exemplo simples de uso.

# 6. MOSTRE APRENDIZAGEM NO PROTÓTIPO

V0 → o que observamos/aprendemos → o que decidimos mudar → V1.

Se não houver teste externo, diga explicitamente a origem do aprendizado.

# 7. ESTRUTURA DO PITCH V0

Apresente a estrutura e em seguida escreva o texto integral da fala:

ESTRUTURA PROPOSTA DO PITCH
- BLOCO 1: Problema e Oportunidade
- BLOCO 2: Propósito e Solução Proposta
- BLOCO 3: Protótipo e Aprendizados dos Testes
- BLOCO 4: Evolução para V1 e Próximos Passos

TEXTO INTEGRAL DA FALA DO PITCH V0
(Escreva como fala oral humana, pronta para ser lida ou ensaiada).

Depois pergunte:

“Este pitch conta a história do projeto de uma forma que nossa equipe realmente falaria e sem afirmar mais do que conseguimos sustentar?”

Só considere o artefato consolidado após a confirmação.

# HANDOFF

VOCÊS PRODUZIRAM: Pitch V0

IDEIA CENTRAL: [...]

PRINCIPAIS EVIDÊNCIAS UTILIZADAS: [...]

HIPÓTESES QUE PERMANECEM EXPLÍCITAS: [...]

PRÓXIMA ETAPA: Apresentação Visual.`,
      contextPackConfig: {
        snapshotFields: ['problem', 'audience', 'purpose', 'solution', 'centralHypothesis', 'currentPrototype', 'evidenceSummary', 'roadmap'],
        requiredArtifacts: ['prototipo'],
        optionalArtifacts: ['evidence-summary', 'roadmap', 'bmc', 'briefing'],
      },
    },
    expectedArtifactId: 'pitch',
    expectedVersionName: 'Pitch V0',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'pitch', label: 'Pitch atual', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Estrutura e texto da fala do Pitch V0' },
      ],
    },
    metacognitiveReflection: 'Estamos afirmando mais do que conseguimos sustentar?',
    handoff: {
      producedArtifactName: 'Pitch V0',
      nowWeKnow: 'A narrativa central, os principais fatos comunicados e a estrutura da fala.',
      stillOpen: 'Apoio visual nos slides e tempo de fala.',
      nextActivityId: 'E4-A02',
      nextActivityTitle: 'Apresentação Visual',
      nextActivityPurpose: 'Decidir o que os slides precisam tornar mais fácil de ver e compreender.',
      contextPassedAhead: ['Pitch V0', 'Estado Atual (pitch)'],
    },
  },

  {
    id: 'E4-A02',
    encounterId: 4,
    title: 'Apresentação Visual',
    durationMinutes: 25,
    youAreHere: {
      encounterTitle: 'Encontro 4: Comunicar',
      positionInSequence: 'Atividade 2 de 3',
      progressPercent: 96,
    },
    whyItMatters: 'Criar um suporte visual funcional que apoie a fala sem competir com ela nem funcionar como teleprompter.',
    youWillNeed: {
      required: ['Pitch V0 consolidado'],
      optional: ['Protótipo V1 consolidado'],
    },
    whatToDo: [
      'Traduza a fala do Pitch V0 em slides sintéticos (1 ideia por slide).',
      'Defina títulos, textos na tela e sugestões de visuais/diagramas.',
      'Consolide o Roteiro Visual V0.',
    ],
    aiPrompt: {
      purpose: 'Transformar a fala do Pitch V0 em um Roteiro Visual de Slides funcional.',
      whatAiHelpsDo: 'Ajudar a manter uma ideia por slide, sugerir visuais sem sobrecarregar telas e sincronizar slides com a fala.',
      templatePrompt: `Atue como diretor de apresentação visual.

Nossa equipe já possui um pitch.

Sua função agora é transformar a narrativa oral em uma apresentação visual que:

- apoie a fala;
- reduza esforço de compreensão;
- destaque ideias importantes;
- mostre aquilo que é mais fácil compreender visualmente;
- não transforme os slides em teleprompter.

# 1. O PITCH É A FONTE DE VERDADE

Utilize a versão mais recente e aprovada do pitch.

Não introduza dados, resultados, afirmações, etapas, funcionalidades ou evidências não sustentadas.

# 2. UMA IDEIA PRINCIPAL POR SLIDE

Pergunte:
“O que a plateia precisa perceber neste momento?”

# 3. NÃO TRANSCREVA A FALA

Prefira: palavras-chave, frases curtas, diagramas, comparações, processos, protótipos, evidências visuais.

# 4. MOSTRE O PROTÓTIPO E A EVOLUÇÃO

ANTES → APRENDIZADO → DEPOIS.

# 5. RESPEITE O TEMPO

Não crie slides apenas para que todo item do projeto apareça.

# CONSOLIDAÇÃO

Produza:

ROTEIRO VISUAL DA APRESENTAÇÃO V0

Para cada slide:

SLIDE X
FUNÇÃO NARRATIVA: [...]
TÍTULO: [...]
TEXTO NA TELA: [...]
VISUAL SUGERIDO: [...]
O QUE O APRESENTADOR FALA: 1–2 frases.
TRANSIÇÃO PARA O PRÓXIMO SLIDE: [...]

Depois pergunte:

“Se alguém visse estes slides enquanto ouve o pitch, eles facilitariam a compreensão ou competiriam com nossa fala?”

Só considere o artefato consolidado após a confirmação.

# HANDOFF

VOCÊS PRODUZIRAM: Roteiro Visual da Apresentação V0

O QUE OS SLIDES TORNAM MAIS VISÍVEL: [...]

PRINCIPAL RISCO VISUAL: [...]

PRÓXIMA ETAPA: Ensaio e Refinamento do Pitch.`,
      contextPackConfig: {
        snapshotFields: ['solution', 'currentPrototype', 'pitch'],
        requiredArtifacts: ['pitch'],
        optionalArtifacts: ['prototipo'],
      },
    },
    expectedArtifactId: 'presentation',
    expectedVersionName: 'Roteiro Visual V0',
    stateUpdateConfig: {
      allowedClaimMappings: [],
    },
    metacognitiveReflection: 'Os slides ajudam a compreender ou competem com nossa fala?',
    handoff: {
      producedArtifactName: 'Roteiro Visual V0',
      nowWeKnow: 'Quais slides apoiarão a narrativa e o que cada um tornará visível.',
      stillOpen: 'Comportamento da equipe durante perguntas e respostas da banca.',
      nextActivityId: 'E4-A03',
      nextActivityTitle: 'Ensaio e Refinamento do Pitch',
      nextActivityPurpose: 'Testar narrativa, clareza visual e capacidade de responder a perguntas.',
      contextPassedAhead: ['Roteiro Visual V0'],
    },
  },

  {
    id: 'E4-A03',
    encounterId: 4,
    title: 'Ensaio e Refinamento do Pitch',
    durationMinutes: 35,
    youAreHere: {
      encounterTitle: 'Encontro 4: Comunicar',
      positionInSequence: 'Atividade 3 de 3',
      progressPercent: 100,
    },
    whyItMatters: 'Submeter o pitch a uma banca simulada rigorosa para polir a fala, corrigir fragilidades e preparar respostas.',
    youWillNeed: {
      required: ['Pitch V0 consolidado', 'Roteiro Visual V0 consolidado'],
      optional: ['Protótipo V1 consolidado', 'Síntese de Evidências V0'],
    },
    whatToDo: [
      'Submeta o Pitch V0 à avaliação de 5 critérios.',
      'Responda interativamente às 5 perguntas da banca simulada.',
      'Receba os refinamentos das respostas.',
      'Consolide o Pitch Revisado (contendo a fala e a Síntese Crítica do Pitch).',
    ],
    aiPrompt: {
      purpose: 'Atuar como banca simulada, avaliar o pitch em 5 critérios, fazer 5 perguntas críticas e gerar o Pitch Revisado com Síntese Crítica.',
      whatAiHelpsDo: 'Avaliar objetivamente a clareza, simular perguntas desafiadoras e refinar a versão final da fala.',
      templatePrompt: `Atue como treinador de apresentação e simule uma banca interessada, atenta e crítica.

Nosso objetivo é melhorar o pitch sem transformar nossa maneira de falar em algo artificial, decorado ou distante da identidade da equipe.

Preserve nosso vocabulário, personalidade e maneira natural de explicar o projeto sempre que possível.

Ao mesmo tempo, seja rigoroso com:
- afirmações sem evidência;
- exageros;
- excesso de informação;
- conceitos pouco claros;
- respostas defensivas ou vagas.

Nunca invente dados, resultados, testes, feedbacks ou validações.

Diferencie sempre que necessário:
o que observamos | o que decidimos | o que acreditamos | o que testamos | o que ainda não sabemos

# FASE 1 — DIAGNÓSTICO DO PITCH

Analise o pitch usando exatamente estes cinco critérios (Nota 1 a 5 + 1 frase de explicação):
1. Clareza do problema.
2. Clareza da solução.
3. Evidências e aprendizados.
4. Demonstração do protótipo.
5. Clareza dos próximos passos.

Em seguida apresente:
MANTER (até 3 pontos) | CORTAR OU SIMPLIFICAR (até 3 pontos) | PRECISA FICAR MAIS CLARO (até 3 pontos).

# FASE 2 — BANCA SIMULADA

Prepare mentalmente cinco perguntas que uma banca poderia fazer.
Faça uma pergunta por vez. Aguarde a resposta da equipe.

# FASE 3 — REFINAMENTO DE CADA RESPOSTA

Após a resposta da equipe, forneça: O QUE ESTÁ FORTE, PONTO DE ATENÇÃO e RESPOSTA MAIS FORTE.
Em seguida faça a pergunta seguinte, até completar cinco.

# FASE 4 — CONSOLIDAÇÃO OBRIGATÓRIA

Após a quinta pergunta e refinamento, gere automaticamente o resultado consolidado em duas partes:

PARTE 1 — PITCH REVISADO
(Versão integral e refinada do discurso de fala)

PARTE 2 — SÍNTESE CRÍTICA DO PITCH
- PONTOS FORTES / DE DESTAQUE (até 5)
- PONTOS FRACOS / DE ATENÇÃO (até 5)
- RESPOSTAS QUE PRECISAMOS TER NA PONTA DA LÍNGUA (Cartão de Banca)
- O QUE NÃO DEVEMOS AFIRMAR AINDA

Depois pergunte:

“Este pitch revisado e síntese crítica representam a versão definitiva que a equipe apresentará?”

Só considere o artefato consolidado após a confirmação.

# HANDOFF

VOCÊS PRODUZIRAM: Pitch Revisado + Síntese Crítica

PRINCIPAL MELHORIA DA NARRATIVA: [...]

PRINCIPAL PONTO DE ATENÇÃO DURANTE A APRESENTAÇÃO: [...]

PRÓXIMO PASSO: Apresentação Final com tempo real e suporte visual.`,
      contextPackConfig: {
        snapshotFields: ['problem', 'solution', 'currentPrototype', 'evidenceSummary', 'roadmap'],
        requiredArtifacts: ['pitch', 'presentation'],
        optionalArtifacts: ['prototipo', 'evidence-summary'],
      },
    },
    expectedArtifactId: 'pitch',
    expectedVersionName: 'Pitch Revisado',
    stateUpdateConfig: {
      allowedClaimMappings: [
        { targetField: 'pitch', label: 'Pitch atual', defaultEpistemologicalStatus: 'DECIDIDO', description: 'Fala e estrutura final do Pitch Revisado' },
      ],
    },
    metacognitiveReflection: 'Qual pergunta de banca revelou a maior fragilidade da nossa narrativa?',
    handoff: {
      producedArtifactName: 'Pitch Revisado',
      nowWeKnow: 'A versão refinada do pitch e as respostas na ponta da língua para a banca.',
      stillOpen: 'Apresentação humana final diante do público.',
      nextActivityId: 'END_OF_JOURNEY',
      nextActivityTitle: 'Conclusão da Jornada do Workshop',
      nextActivityPurpose: 'Revisar o checklist final da equipe e refletir sobre o uso da IA durante o projeto.',
      contextPassedAhead: ['Pitch Revisado', 'Síntese Crítica do Pitch'],
    },
  },
];

export function getPilotActivityById(id: string): ActivityV2 {
  return PILOT_CHAIN_ACTIVITIES.find((a) => a.id === id) || PILOT_CHAIN_ACTIVITIES[0];
}
