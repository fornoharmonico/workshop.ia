/**
 * Canonical Journey Registry V3
 * Exact 11 Activities across 4 Movements.
 */
import { ActivityDefinition, ActivityId, MovementDefinition, MovementId } from './types.ts';

export const MOVEMENTS_V3: MovementDefinition[] = [
  {
    id: 'INVESTIGAR_E_DIRECIONAR',
    title: 'Investigar e Direcionar',
    subtitle: 'Encontro 1 (180 min) — Entender o problema antes de pensar na solução',
    order: 1,
    meetingNumber: 1,
    activityIds: ['A01', 'A02', 'A03', 'A04'],
  },
  {
    id: 'DEFINIR_E_MATERIALIZAR',
    title: 'Definir e Materializar',
    subtitle: 'Encontro 2 (180 min) — Transformar a investigação em Briefing, PRD e Protótipo V0',
    order: 2,
    meetingNumber: 2,
    activityIds: ['A05', 'A06', 'A07'],
  },
  {
    id: 'TESTAR_APRENDER_E_PLANEJAR',
    title: 'Testar, Aprender e Planejar',
    subtitle: 'Encontro 3 (180 min) — Confrontar com a realidade, planejar sustentabilidade e evolução',
    order: 3,
    meetingNumber: 3,
    activityIds: ['A08', 'A09', 'A10'],
  },
  {
    id: 'COMUNICAR_E_CELEBRAR',
    title: 'Comunicar e Celebrar',
    subtitle: 'Encontro 4 (180 min) — Contar a história real, demonstrar e reconhecer aprendizados',
    order: 4,
    meetingNumber: 4,
    activityIds: ['A11'],
  },
];

export const ACTIVITIES_V3: ActivityDefinition[] = [
  {
    id: 'A01',
    order: 1,
    title: 'Ponto de Partida: Sonho + Problema',
    movementId: 'INVESTIGAR_E_DIRECIONAR',
    meetingRecommended: 1,
    estimatedMinutes: 40,
    promptId: 'P01',
    artifactId: 'AF01',
    objective: 'Reconhecer o que move a equipe e formular a tensão inicial entre realidade atual e realidade desejada.',
    requiredContext: [],
    optionalContext: [],
    humanDecisions: [
      'Escolher o ponto de partida que realmente mobiliza a equipe',
      'Confirmar o problema/tensão e a realidade desejada',
    ],
    stopCriteria: [
      'A equipe formulou uma tensão clara e autêntica',
      'Contexto e pessoas afetadas estão claros o suficiente para diagnosticar',
    ],
    completionCriteria: [
      'AF01 representa fielmente o ponto de partida',
      'A equipe confirmou explicitamente a consolidação',
    ],
  },
  {
    id: 'A02',
    order: 2,
    title: 'Diagnosticar a Tensão de Projeto',
    movementId: 'INVESTIGAR_E_DIRECIONAR',
    meetingRecommended: 1,
    estimatedMinutes: 35,
    promptId: 'P02',
    artifactId: 'AF02',
    objective: 'Investigar a situação, separar observações, hipóteses e lacunas e aprofundar causas com critério de parada.',
    requiredContext: ['AF01'],
    optionalContext: [],
    humanDecisions: [
      'Confirmar o que é observação, hipótese ou dúvida quando houver ambiguidade',
      'Decidir quando a profundidade do diagnóstico já é útil',
    ],
    stopCriteria: [
      'Repetição ou circularidade',
      'Especulação crescente',
      'Sucessivos "não sei"',
      'Necessidade de investigação externa',
      'Ausência de novo ganho informacional',
    ],
    completionCriteria: [
      'Observações, hipóteses e lacunas estão separadas',
      'Causas possíveis foram exploradas sem serem promovidas a fato',
      'AF02 foi validado',
    ],
  },
  {
    id: 'A03',
    order: 3,
    title: 'Mapear Recursos Disponíveis e Necessários',
    movementId: 'INVESTIGAR_E_DIRECIONAR',
    meetingRecommended: 1,
    estimatedMinutes: 30,
    promptId: 'P03',
    artifactId: 'AF03',
    objective: 'Reconhecer recursos, forças e lacunas nas dimensões cultural, social, ambiental e financeira.',
    requiredContext: ['AF02'],
    optionalContext: ['AF01'],
    humanDecisions: [
      'Confirmar recursos que realmente existem ou podem ser mobilizados',
      'Assumir lacunas sem inventar recursos',
    ],
    stopCriteria: [
      'As quatro dimensões foram cobertas na profundidade necessária',
      'Perguntas adicionais só repetiriam conteúdo já conhecido',
    ],
    completionCriteria: [
      'Temos/Precisamos/Podemos mobilizar/Precisamos investigar estão claros nas quatro dimensões',
      'AF03 foi validado',
    ],
  },
  {
    id: 'A04',
    order: 4,
    title: 'Definir Propósito e Direção',
    movementId: 'INVESTIGAR_E_DIRECIONAR',
    meetingRecommended: 1,
    estimatedMinutes: 30,
    promptId: 'P04',
    artifactId: 'AF04',
    objective: 'Pactuar a transformação pretendida, princípios inegociáveis e uma direção de solução.',
    requiredContext: ['AF02', 'AF03'],
    optionalContext: ['AF01'],
    humanDecisions: [
      'Escolher a transformação pretendida',
      'Definir princípios inegociáveis',
      'Escolher a direção da solução',
    ],
    stopCriteria: [
      'Transformação, princípios e direção já estão claros e coerentes com o diagnóstico',
    ],
    completionCriteria: [
      'Direção não foi escolhida silenciosamente pela IA',
      'AF04 foi validado',
    ],
  },
  {
    id: 'A05',
    order: 5,
    title: 'Construir e Revisar o Briefing',
    movementId: 'DEFINIR_E_MATERIALIZAR',
    meetingRecommended: 2,
    estimatedMinutes: 55,
    promptId: 'P05',
    artifactId: 'AF05',
    objective: 'Consolidar toda a investigação em um Briefing completo, passando por um V0 intermediário, aprovação da estrutura e revisão crítica antes da versão final.',
    requiredContext: ['AF01', 'AF02', 'AF03', 'AF04'],
    optionalContext: [],
    humanDecisions: [
      'Aprovar ou modificar o Briefing V0 antes da revisão',
      'Aceitar, rejeitar ou adaptar críticas',
      'Aprovar o Briefing final',
    ],
    stopCriteria: [
      'V0 já sintetiza com fidelidade o contexto',
      'Revisão crítica cobriu incoerências, lacunas e hipóteses relevantes',
      'Briefing final está completo o suficiente para orientar especificação',
    ],
    completionCriteria: [
      'V0 intermediário foi explicitamente apresentado como esboço não-canônico',
      'Equipe aprovou a estrutura antes da revisão',
      'AF05 final é completo, fiel e validado',
    ],
  },
  {
    id: 'A06',
    order: 6,
    title: 'Definir Como a Solução Precisa Funcionar',
    movementId: 'DEFINIR_E_MATERIALIZAR',
    meetingRecommended: 2,
    estimatedMinutes: 35,
    promptId: 'P06',
    artifactId: 'AF06',
    objective: 'Especificar a experiência, requisitos essenciais, desejáveis, restrições e critérios de qualidade da solução.',
    requiredContext: ['AF05'],
    optionalContext: [],
    humanDecisions: [
      'Definir o que é essencial agora e o que pode ficar para depois',
      'Confirmar restrições e critérios de qualidade',
    ],
    stopCriteria: [
      'Fluxo/experiência e requisitos estão claros o suficiente para recortar um MVP',
    ],
    completionCriteria: [
      'Must-have e desejáveis estão separados',
      'AF06 foi validado',
    ],
  },
  {
    id: 'A07',
    order: 7,
    title: 'Projetar e Materializar o MVP',
    movementId: 'DEFINIR_E_MATERIALIZAR',
    meetingRecommended: 2,
    estimatedMinutes: 45,
    promptId: 'P07',
    artifactId: 'AF07',
    objective: 'Definir a hipótese central, recortar o MVP, planejar a realização e materializar um Protótipo V0 testável.',
    requiredContext: ['AF05', 'AF06'],
    optionalContext: [],
    humanDecisions: [
      'Escolher a hipótese principal a testar',
      'Escolher o formato do protótipo',
      'Assumir responsabilidades e restrições do plano de realização',
    ],
    stopCriteria: [
      'Existe uma versão mínima concreta e testável',
      'Plano de realização tem quando/o quê/onde/quem e riscos mínimos',
    ],
    completionCriteria: [
      'Protótipo V0 ou instruções concretas para materializá-lo existem',
      'AF07 foi validado',
    ],
  },
  {
    id: 'A08',
    order: 8,
    title: 'Testar, Aprender e Definir Evolução V0→V1',
    movementId: 'TESTAR_APRENDER_E_PLANEJAR',
    meetingRecommended: 3,
    estimatedMinutes: 50,
    promptId: 'P08',
    artifactId: 'AF08',
    objective: 'Analisar evidências reais quando existirem, declarar ausência de evidência quando não existirem e decidir a evolução do protótipo.',
    requiredContext: ['AF07'],
    optionalContext: ['AF05', 'AF06'],
    humanDecisions: [
      'Declarar honestamente se houve teste real',
      'Decidir o que manter/corrigir/descartar/acrescentar',
    ],
    stopCriteria: [
      'Evidências disponíveis foram analisadas sem inventar validação',
      'Na ausência de evidência, limites foram explicitados e o plano didático está claro',
    ],
    completionCriteria: [
      'Status epistemológico do teste está explícito',
      'AF08 foi validado',
    ],
  },
  {
    id: 'A09',
    order: 9,
    title: 'Modelar Sustentabilidade',
    movementId: 'TESTAR_APRENDER_E_PLANEJAR',
    meetingRecommended: 3,
    estimatedMinutes: 35,
    promptId: 'P09',
    artifactId: 'AF09',
    objective: 'Pensar continuidade, valor, recursos, parcerias, custos e formas plurais de sustentação da solução.',
    requiredContext: ['AF08'],
    optionalContext: ['AF05', 'AF07'],
    humanDecisions: [
      'Escolher formas de continuidade compatíveis com o projeto',
      'Confirmar hipóteses de sustentabilidade',
    ],
    stopCriteria: [
      'Os nove componentes estão suficientemente claros para planejamento',
    ],
    completionCriteria: [
      'Sustentabilidade não foi reduzida obrigatoriamente a receita comercial',
      'AF09 foi validado',
    ],
  },
  {
    id: 'A10',
    order: 10,
    title: 'Planejar Evolução',
    movementId: 'TESTAR_APRENDER_E_PLANEJAR',
    meetingRecommended: 3,
    estimatedMinutes: 35,
    promptId: 'P10',
    artifactId: 'AF10',
    objective: 'Organizar prioridades em horizontes e desdobrar os próximos passos em sete etapas coordenadas.',
    requiredContext: ['AF08', 'AF09'],
    optionalContext: ['AF05'],
    humanDecisions: [
      'Priorizar o que fazer agora/depois/futuramente',
      'Definir o que deliberadamente não será feito agora',
      'Assumir responsáveis e prazos',
    ],
    stopCriteria: [
      'Prioridades e sete etapas estão claras e executáveis',
    ],
    completionCriteria: [
      'Roadmap e linha do tempo estão coerentes com aprendizados e sustentabilidade',
      'AF10 foi validado',
    ],
  },
  {
    id: 'A11',
    order: 11,
    title: 'Comunicar e Celebrar',
    movementId: 'COMUNICAR_E_CELEBRAR',
    meetingRecommended: 4,
    estimatedMinutes: 90,
    promptId: 'P11',
    artifactId: 'AF11',
    objective: 'Construir uma narrativa final honesta, material visual enxuto, ensaio e preparação para apresentação pública.',
    requiredContext: ['AF05', 'AF07', 'AF08', 'AF09', 'AF10'],
    optionalContext: ['AF06'],
    humanDecisions: [
      'Escolher narrativa, divisão de fala e tom',
      'Decidir o que demonstrar',
      'Aprovar afirmações sobre evidência e resultados',
    ],
    stopCriteria: [
      'Pitch cabe em 3 minutos',
      'Roteiro visual tem no máximo 6 telas e pouco texto',
      'Equipe está preparada para perguntas difíceis',
    ],
    completionCriteria: [
      'Nenhuma certeza ou resultado foi inventado',
      'AF11 foi validado',
    ],
  },
];

export const ACTIVITY_MAP = new Map<ActivityId, ActivityDefinition>(
  ACTIVITIES_V3.map((a) => [a.id, a])
);

export function getActivityOrThrow(id: ActivityId): ActivityDefinition {
  const act = ACTIVITY_MAP.get(id);
  if (!act) {
    throw new Error(`[JourneyRegistry] Invalid Activity ID lookup: "${id}". Expected valid A01..A11.`);
  }
  return act;
}

export function getMovementById(id: MovementId): MovementDefinition {
  const movement = MOVEMENTS_V3.find((m) => m.id === id);
  if (!movement) {
    throw new Error(`[JourneyRegistry] Invalid Movement ID lookup: "${id}".`);
  }
  return movement;
}
