import { MappedProblem } from '../data/problemsData';

export type UserMode = 'participante' | 'facilitador';

export type ActivityStatus = 'not_started' | 'in_progress' | 'completed';

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

export interface TeamProjectData {
  teamName: string;
  projectName: string;
  
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

export interface ActivityV2 {
  id: string;
  encounterId: number;
  title: string;
  durationMinutes: number;
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
  aiPrompt: {
    purpose: string;
    whatAiHelpsDo: string;
    templatePrompt: string;
    contextPackConfig: ContextPackConfig;
  };
  expectedArtifactId: string; // e.g. "briefing"
  expectedVersionName: string; // e.g. "Briefing V0"
  stateUpdateConfig?: StateUpdateConfig;
  metacognitiveReflection: string;
  handoff: ActivityHandoff;
}

export type ObservationCategory = 
  | 'METODOLOGIA' 
  | 'PROMPT' 
  | 'CONTEUDO' 
  | 'UX' 
  | 'TECNOLOGIA' 
  | 'FACILITACAO';

export interface FacilitatorObservation {
  id: string;
  activityId: string;
  timestamp: string;
  category: ObservationCategory;
  whatHappened: string;
  intensity: 'BAIXA' | 'MEDIA' | 'ALTA';
  neededIntervention: boolean;
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
