import { MappedProblem } from '../data/problemsData';

export type UserMode = 'participante' | 'facilitador';

export type ActivityStatus = 'not_started' | 'in_progress' | 'completed';

export type PedagogicalMovementId = 
  | 'investigar' 
  | 'definir_materializar' 
  | 'validar_evoluir' 
  | 'comunicar_refletir';

export type TestExecutionStatus = 
  | 'nao_realizado' 
  | 'parcialmente_realizado' 
  | 'realizado';

export interface Activity {
  id: string;
  title: string;
  durationMinutes: number;
  description: string;
  whatIsIt?: string;
  whyDoIt?: string;
  howToApply?: string[];
  socraticQuestions?: string[];
  facilitatorInstructions?: string;
  checklist?: string[];
  suggestedPromptIds?: string[];
  relatedDocumentStep?: string;
  notes?: string;
}

export interface Encounter {
  id: number;
  title: string;
  subtitle: string;
  objective: string;
  totalDurationMinutes: number;
  activities: Activity[];
  homeworkMission?: string;
  deliverable: string;
}

export interface MethodTool {
  id: string;
  name: string;
  orientingQuestion: string;
  description: string;
  iconName: string;
  category?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  purpose: string;
  usageMoment: string;
  category: 'reflexao' | 'causas' | 'documentacao' | 'prototipo' | 'pitch';
  templateText: string;
  variables: { key: string; label: string; placeholder: string }[];
}

export interface TeamProject {
  id: string;
  name: string;
  members: string[];
  problemStatement: string;
  targetUsers: string;
  solutionConcept: string;
  aiToolsUsed: string[];
  prototypeUrl?: string;
  notes?: string;
  stage: 'diagnostico' | 'briefing' | 'prototipo' | 'pitch';
}

export const SOLUTION_CATEGORY_OPTIONS = [
  'produto físico',
  'produto digital',
  'serviço',
  'processo',
  'campanha',
  'evento',
  'experiência',
  'organização/iniciativa',
  'negócio',
  'material ou conteúdo educativo',
  'metodologia/oficina/atividade',
  'outra',
] as const;

export type SolutionCategory = typeof SOLUTION_CATEGORY_OPTIONS[number];

export interface TeamProjectData {
  teamName: string;
  projectName: string;
  
  // Categorização da Solução (Rodada 5)
  solutionCategories?: string[];
  solutionOtherCategory?: string;

  // Encontro 1
  individualChallengesNote: string;
  collectiveChallenge: string;
  
  // PHD
  phdProblems: string;
  phdHypotheses: string;
  phdDoubts: string;
  phdFacts: string;
  
  // Cinco Porquês
  fiveWhysProblem: string;
  fiveWhysLevels: Array<{
    why: string;
    answer: string;
    type: 'fato' | 'hipotese' | 'opiniao';
    evidence: string;
  }>;
  rootCause: string;
  
  // Golden Circle
  goldenCircleWhy: string;
  goldenCircleHow: string;
  goldenCircleWhat: string;
  
  // Ficha de Solução
  solutionProblemSummary: string;
  solutionTargetAudience: string;
  solutionPurpose: string;
  solutionDescription: string;
  solutionKeyFeatures: string;
  solutionRisks: string;
  solutionSuccessCriteria: string;
  
  // Briefing
  briefingWhatWeAreTryingToDo: string;
  briefingContext: string;
  briefingScope: string;
  
  // PRD
  prdHowItShouldWork: string;
  prdUserFlow: string;
  prdRequirements: string;
  prdConstraints: string;

  // BMC
  bmcValueProposition: string;
  bmcCustomerSegments: string;
  bmcChannels: string;
  bmcCustomerRelationships: string;
  bmcKeyActivities: string;
  bmcKeyResources: string;
  bmcKeyPartners: string;
  bmcCostStructure: string;
  bmcSustainability: string;

  // MVP
  mvpSmallestTestableVersion: string;
  mvpCoreFeatures: string;
  mvpTestHypothesis: string;

  // Protótipo
  prototypeType: string;
  prototypeLinkOrDescription: string;
  prototypeUserFeedback: string;

  // Roadmap
  roadmapNow: string;
  roadmapNext: string;
  roadmapFuture: string;
  bugsAndFixes: string;

  // Pitch
  pitchProblem: string;
  pitchSolution: string;
  pitchAiRole: string;
  pitchLearnings: string;
  pitchCallToAction: string;
  pitchScriptText: string;

  // V3 Official Artifacts & V3.2 Composite Extensions
  v3ProblemDiagnosis?: string;
  v3DiagnosisReviewSummary?: string | DiagnosisReviewSummaryData;
  v3GoldenCircle?: string;
  v3BriefingV0?: string;
  v3BriefingReview?: string;
  v3BriefingV1?: string;
  v3PrdV0?: string;
  v3Mvp?: string;
  v3MvpSummary?: string | MvpSummaryData;
  v3PrototypeV0?: string;
  v3TestPlan?: string;
  v3RawFeedbacks?: string; // Legacy V3 fallback
  v3RawEvidence?: string; // V3.2 canonical
  v3RawEvidenceItems?: RawEvidenceItem[];
  v3FeedbackSynthesis?: string; // Legacy V3 fallback
  v3EvidenceSummary?: string; // V3.2 canonical
  v3EvidenceSynthesisStructured?: EvidenceSynthesisData;
  v3Bmc?: string;
  v3Roadmap?: string;
  v3RoadmapNow?: string;
  v3RoadmapNext?: string;
  v3RoadmapFuture?: string;
  v3RoadmapWontDoNow?: string;
  v3RoadmapThreePriorities?: string;
  v3RoadmapSummary?: string;
  v3RoadmapStructured?: RoadmapStructuredData;
  v3EvolutionRecord?: string; // V3.2 Registro de Evolução V0 -> V1
  v3EvolutionMatrix?: EvolutionRecordItem[];
  v3PrototypeV1?: string;
  v3PrototypeV1Structured?: PrototypeV1Data;
  v3PitchStructure?: string; // V3.2 Estrutura do Pitch
  v3PitchScript?: string; // V3.2 Pitch Integral
  v3PitchSummary?: string; // V3.2 Síntese do Pitch
  v3PitchPresentation?: string; // V3.2 Roteiro Visual da Apresentação
  v3PitchRevised?: string; // V3.2 Pitch Revisado
  v3PitchCriticalSynthesis?: string | PitchCriticalSynthesisData; // V3.2 Síntese Crítica do Pitch
  v3RehearsalStatus?: 'nao_iniciado' | 'em_ensaio' | 'pronto';
  v3RehearsalNotes?: string;

  // Test & Journey Status Tracking (V3.2)
  testExecutionStatus?: TestExecutionStatus;
  testExecutionNotes?: string;
  selectedProblemId?: number;
  pedagogicalMovementId?: PedagogicalMovementId;
}

// ==========================================
// V3.2 STRUCTURED ARTIFACT TYPES
// ==========================================

export interface DiagnosisReviewSummaryData {
  problemSummary: string; // problema — síntese
  factsAndObservations: string; // observações/fatos
  hypotheses: string; // hipóteses
  possibleCauses: string; // possíveis causas/porquês
  criticalDoubts: string; // dúvidas críticas
}

export interface MvpSummaryData {
  mainHypothesis: string; // hipótese principal
  testObjective: string; // objetivo do teste
  includedFeatures: string; // inclui
  excludedFeatures: string; // não inclui
  testMethod: string; // como poderá ser testado
  targetTesters: string; // com quem
  successSignal: string; // sinal de que estamos no caminho certo
  learningGoals: string; // o que precisamos aprender
  mainScopeCut: string; // principal corte de escopo
}

export interface RawEvidenceItem {
  id: string;
  testerProfile: string; // perfil geral
  attemptedAction: string; // o que tentou fazer
  whatHappened: string; // o que aconteceu
  workedWithoutHelp: string | boolean; // funcionou sem ajuda?
  whereHesitated: string; // onde hesitou?
  whereNeededHelp: string; // onde precisou de ajuda?
  quoteOrComment: string; // fala/comentário
  suggestion: string; // sugestão
  otherLearning: string; // outro aprendizado
}

export interface EvidenceSynthesisData {
  testStatus: string; // status do teste
  workedWithoutHelp: string; // o que funcionou sem ajuda
  hesitations: string; // hesitações
  neededHelp: string; // necessidade de ajuda
  patterns: string; // padrões
  isolatedOccurrences: string; // ocorrências isoladas
  feedbacksAndNeeds: string; // feedbacks e necessidades
  bugsAndFailures: string; // bugs/falhas
  strengthenedHypotheses: string; // hipóteses fortalecidas
  weakenedHypotheses: string; // hipóteses enfraquecidas
  inconclusiveHypotheses: string; // hipóteses inconclusivas
  newHypotheses: string; // novas hipóteses
  whatWeStillDontKnow: string; // o que ainda não sabemos
  roundConclusion: string; // conclusão da rodada
}

export interface RoadmapStructuredData {
  now: string; // Agora
  next: string; // Depois
  future: string; // Futuramente
  wontDoNow: string; // Não faremos agora
  threePriorities: string; // três prioridades
  summary: string; // Síntese do Roadmap
}

export type EvolutionOriginType = 
  | 'evidência de teste' 
  | 'evidência de execução' 
  | 'feedback' 
  | 'decisão estratégica' 
  | 'hipótese de design';

export interface EvolutionRecordItem {
  id: string;
  element: string; // elemento
  decision: string; // decisão
  whatChanges: string; // o que muda
  why: string; // por quê
  origin: EvolutionOriginType; // origem
  confidence: string; // confiança
  needsTesting: string | boolean; // precisa testar?
}

export interface PrototypeV1Data {
  prototypeType: string; // tipo/formato
  summary: string; // resumo
  whatChanged: string; // o que mudou
  whatWasKept: string; // o que foi mantido
  justifications: string; // justificativas
  unresolvedIssues: string; // o que ainda não foi resolvido
  openHypotheses: string; // hipóteses ainda abertas
  recommendedNextTest: string; // próximo teste recomendado
}

export interface PitchCriticalSynthesisData {
  strongPoints: string; // pontos fortes
  attentionPoints: string; // pontos de atenção
  bancaCard: string; // Cartão de Banca
  whatNotToClaimYet: string; // o que não devemos afirmar ainda
}

// ==========================================
// V2 INFRASTRUCTURE TYPES
// ==========================================

export type ArtifactStatus = 'EM_CONSTRUCAO' | 'CONSOLIDADO' | 'SUPERADO';

export type EpistemologicalStatus = 
  | 'OBSERVADO' 
  | 'DECIDIDO' 
  | 'HIPOTESE' 
  | 'NAO_TESTADO' 
  | 'VALIDADO';

export interface StructuredClaimValue {
  targetField: keyof ProjectStateV2;
  value: string;
  epistemologicalStatus?: EpistemologicalStatus;
}

export interface ArtifactVersion {
  id: string;
  artifactId: string; // e.g. "briefing", "prd", "mvp", "prototipo"
  versionName: string; // e.g. "Briefing V0", "Briefing V1"
  versionNumber: number; // e.g. 0, 1
  content: string; // full text content for human reading
  structuredData?: Record<string, StructuredClaimValue>; // explicit structured claims for ProjectStateV2
  activityId: string; // e.g. "E1-A05"
  status: ArtifactStatus;
  createdAt: string;
  updatedAt: string;
  inputsUsed?: Record<string, string>;
  replacesVersionId?: string; // id of previous version of SAME artifact superseded
  derivedFromVersionIds?: string[]; // ids of artifact versions derived from
  usedArtifactVersionIds?: string[]; // ids of artifact versions used as input
  checkpointConfirmed: boolean;
  provenanceNote?: string;
}

export interface ProjectClaim {
  value: string;
  epistemologicalStatus: EpistemologicalStatus;
  sourceArtifactVersionId?: string;
  sourceActivityId?: string;
  updatedAt: string;
  replacedValue?: string;
}

export interface ProjectStateV2 {
  problem?: ProjectClaim;
  audience?: ProjectClaim;
  purpose?: ProjectClaim;
  solution?: ProjectClaim;
  centralHypothesis?: ProjectClaim;
  requirements?: ProjectClaim;
  mvp?: ProjectClaim;
  currentPrototype?: ProjectClaim;
  keyObservations?: ProjectClaim;
  openQuestions?: ProjectClaim;
  investigationHypotheses?: ProjectClaim;
  possibleCauses?: ProjectClaim;
  strategicPrinciples?: ProjectClaim;
  methodApproach?: ProjectClaim;
  evidenceSummary?: ProjectClaim;
  sustainabilityModel?: ProjectClaim;
  roadmap?: ProjectClaim;
  pitch?: ProjectClaim;
  diagnosisReviewSummary?: ProjectClaim;
  mvpSummary?: ProjectClaim;
  rawEvidence?: ProjectClaim;
  evolutionRecord?: ProjectClaim;
  pitchStructure?: ProjectClaim;
  pitchSummary?: ProjectClaim;
  pitchRevised?: ProjectClaim;
  pitchCriticalSynthesis?: ProjectClaim;
  additionalClaims?: Record<string, ProjectClaim>;
}

export interface AllowedClaimMapping {
  targetField: keyof ProjectStateV2;
  label: string;
  defaultEpistemologicalStatus: EpistemologicalStatus;
  allowStatusOverride?: boolean;
  description?: string;
}

export interface StateUpdateConfig {
  allowedClaimMappings: AllowedClaimMapping[];
}

export interface ContextPackConfig {
  snapshotFields?: (keyof ProjectStateV2 | string)[];
  requiredArtifacts?: string[]; // e.g. ["briefing"]
  optionalArtifacts?: string[];
  includeHistoricalVersions?: boolean;
  authorityInstructions?: string;
}

export interface ActivityHandoff {
  producedArtifactName: string;
  nowWeKnow: string;
  stillOpen: string;
  nextActivityId: string;
  nextActivityTitle: string;
  nextActivityPurpose: string;
  contextPassedAhead?: string[];
}

export type ActivityType = 'digital' | 'presencial';

export type PedagogicalPrinciple = 
  | 'PRIVACIDADE'
  | 'VERIFICACAO'
  | 'HIPOTESE'
  | 'INCERTEZA'
  | 'AGENCIA'
  | 'DELEGACAO_CONSCIENTE'
  | 'REVISAO'
  | 'EVIDENCIA';

export interface PedagogicalIntervention {
  principle: PedagogicalPrinciple;
  tag: string;
  message: string;
}

export interface ActivityV2 {
  id: string;
  encounterId: number;
  movementId?: PedagogicalMovementId;
  movementTitle?: string;
  title: string;
  durationMinutes: number;
  type?: ActivityType;
  isPresencial?: boolean;
  requiresArtifact?: boolean;
  pedagogicalIntervention?: PedagogicalIntervention;
  youAreHere: {
    encounterTitle: string;
    positionInSequence: string;
    progressPercent: number;
  };
  whyItMatters: string;
  youWillNeed: {
    required: string[];
    optional?: string[];
  };
  whatToDo: string[];
  aiPrompt?: {
    purpose: string;
    whatAiHelpsDo: string;
    templatePrompt: string;
    contextPackConfig: ContextPackConfig;
  };
  expectedArtifactId?: string; // e.g. "briefing", "diagnostico"
  expectedVersionName?: string; // e.g. "Briefing V0", "Diagnóstico do Problema V0"
  stateUpdateConfig?: StateUpdateConfig;
  metacognitiveReflection: string;
  handoff: ActivityHandoff;
}

export type ObservationCategory = 
  | 'PROMPT'
  | 'METODOLOGIA' 
  | 'UX' 
  | 'BUG'
  | 'TEMPO'
  | 'AUTONOMIA'
  | 'FACILITACAO'
  | 'IDEIA'
  | 'CURIOSIDADE'
  | 'OUTRA'
  // Compatibilidade retroativa
  | 'CONTEUDO' 
  | 'TECNOLOGIA' 
  | 'DUVIDA_USUARIO';

export interface FacilitatorObservation {
  id: string;
  activityId: string;
  activityTitle?: string;
  timestamp: string;
  category: ObservationCategory;
  whatHappened: string;
  intensity?: 'BAIXA' | 'MEDIA' | 'ALTA';
  neededIntervention?: boolean;
  interpretation?: string;
}

export interface AppState {
  currentView: 'landing' | 'webapp';
  activeWebappTab: 'jornada' | 'atividade' | 'projeto' | 'recursos' | 'ajuda' | 'facilitador' | 'ementa' | 'mapa' | 'mapa-problemas' | 'encontros' | 'equipes' | 'prompts' | 'exportar' | 'dashboard' | 'materiais' | 'v2-atividade' | 'v2-projeto';
  selectedEncounterId: number;
  selectedProblemId?: number;
  userMode: UserMode;
  completedActivityIds: string[];
  encounterNotes: Record<number, string>;
  teams: TeamProject[];
  timer: {
    isRunning: boolean;
    remainingSeconds: number;
    initialSeconds: number;
    activeActivityTitle: string;
    soundEnabled: boolean;
  };
  isProjectionOpen: boolean;
  activeTheme: 'light' | 'dark';
  activityProgress?: Record<string, ActivityStatus>;
  facilitatorChecklists?: Record<string, boolean>;
  facilitatorNotes?: Record<number, string>;
  projectData?: TeamProjectData;
  customProblems?: MappedProblem[];

  // V2 State Extensions
  version: '2.0';
  artifactVersions: ArtifactVersion[];
  projectStateV2: ProjectStateV2;
  facilitatorObservations: FacilitatorObservation[];
  currentPilotActivityId: string;
  draftArtifacts: Record<string, string>; // activityId -> content currently being edited before checkpoint
}
