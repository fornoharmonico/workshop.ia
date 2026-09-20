import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  ActivityStatus, 
  AppState, 
  ArtifactVersion, 
  EpistemologicalStatus, 
  FacilitatorObservation, 
  ProjectClaim, 
  ProjectStateV2, 
  StructuredClaimValue,
  TeamProject, 
  TeamProjectData, 
  UserMode,
  CanonicalProjectState,
  CanonicalEvidenceRecord,
  ArtifactFamilyId,
  ActivityId
} from '../types/workshop';
import { 
  migrateStateToV1_4_1, 
  buildCanonicalProjectStateFromLegacy,
  syncCanonicalToLegacyProjectData,
  createDefaultCanonicalProjectState,
  verifyStateMigrationIntegrity
} from '../utils/migrationV1_4_1';
import { getPilotActivityById } from '../data/pilotChain';

const STORAGE_KEY = 'oforno_ia_workshop_app_v1';
const BACKUP_KEY = 'oforno_ia_workshop_app_v1_backup';
const PRE_RESET_KEY = 'oforno_ia_workshop_app_v1_pre_reset_snapshot';
const FAKE_AUTH_STORAGE_KEY = 'oforno_webapp_fake_auth';

/**
 * Safely writes data to localStorage with exception and quota handling.
 */
function safeSaveToLocalStorage(key: string, data: any): boolean {
  try {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
    return true;
  } catch (e: any) {
    if (e?.name === 'QuotaExceededError' || e?.code === 22 || e?.code === 1014) {
      console.warn(`[LocalStorage] Quota exceeded for key "${key}". Work saved in memory.`);
    } else {
      console.error(`[LocalStorage] Error saving key "${key}":`, e);
    }
    return false;
  }
}

/**
 * Normalizes and validates state, populating default structures for V1.4.1.
 */
function hydrateAndNormalizeState(rawState: any): AppState {
  const migrated = migrateStateToV1_4_1(rawState);
  return {
    ...migrated,
    version: '2.0',
    projectData: { ...INITIAL_PROJECT_DATA, ...(migrated.projectData || {}) },
    completedActivityIds: Array.isArray(migrated.completedActivityIds) ? migrated.completedActivityIds : [],
    activityProgress: migrated.activityProgress || {},
    encounterNotes: migrated.encounterNotes || {},
    facilitatorNotes: migrated.facilitatorNotes || {},
    facilitatorChecklists: migrated.facilitatorChecklists || {},
    teams: Array.isArray(migrated.teams) && migrated.teams.length > 0 ? migrated.teams : INITIAL_TEAMS,
    artifactVersions: Array.isArray(migrated.artifactVersions) ? migrated.artifactVersions : [],
    projectStateV2: migrated.projectStateV2 || {},
    facilitatorObservations: Array.isArray(migrated.facilitatorObservations) ? migrated.facilitatorObservations : [],
    currentPilotActivityId: migrated.currentPilotActivityId || 'E1-A01',
    draftArtifacts: migrated.draftArtifacts || {},
    customProblems: Array.isArray(migrated.customProblems) ? migrated.customProblems : [],
    customTools: Array.isArray(migrated.customTools) ? migrated.customTools : [],
    projectStateV1_4_1: migrated.projectStateV1_4_1 || createDefaultCanonicalProjectState(),
  };
}

/**
 * Returns clean default initial state.
 */
function getInitialDefaultState(): AppState {
  return hydrateAndNormalizeState({
    currentView: 'landing',
    activeWebappTab: 'jornada',
    selectedEncounterId: 1,
    userMode: 'participante',
    completedActivityIds: [],
    encounterNotes: {},
    teams: INITIAL_TEAMS,
    timer: {
      isRunning: false,
      remainingSeconds: 1200,
      initialSeconds: 1200,
      activeActivityTitle: 'Atividade Geral',
      soundEnabled: true
    },
    isProjectionOpen: false,
    activeTheme: 'light',
    activityProgress: {},
    facilitatorChecklists: {},
    facilitatorNotes: {},
    projectData: INITIAL_PROJECT_DATA,
    artifactVersions: [],
    projectStateV2: {},
    facilitatorObservations: [],
    currentPilotActivityId: 'E1-A01',
    draftArtifacts: {}
  });
}

/**
 * Multi-layer state loader with automatic shadow backup and disaster recovery.
 */
function loadPersistedState(): AppState {
  const tryLoadFromKey = (keyName: string): AppState | null => {
    try {
      const saved = localStorage.getItem(keyName);
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== 'object') return null;
      return hydrateAndNormalizeState(parsed);
    } catch (e) {
      console.warn(`[LocalStorage] Error parsing "${keyName}":`, e);
      return null;
    }
  };

  // 1. Try primary storage key
  const primaryState = tryLoadFromKey(STORAGE_KEY);
  if (primaryState) {
    safeSaveToLocalStorage(BACKUP_KEY, primaryState);
    return primaryState;
  }

  // 2. Recovery from shadow backup key
  console.warn('[LocalStorage] Primary key missing or corrupt. Attempting recovery from shadow backup...');
  const backupState = tryLoadFromKey(BACKUP_KEY);
  if (backupState) {
    console.info('[LocalStorage] Successfully recovered state from shadow backup!');
    safeSaveToLocalStorage(STORAGE_KEY, backupState);
    return backupState;
  }

  // 3. Recovery from pre-reset safety snapshot
  const preResetState = tryLoadFromKey(PRE_RESET_KEY);
  if (preResetState) {
    console.info('[LocalStorage] Recovered state from pre-reset snapshot!');
    safeSaveToLocalStorage(STORAGE_KEY, preResetState);
    safeSaveToLocalStorage(BACKUP_KEY, preResetState);
    return preResetState;
  }

  // 4. Fresh default state
  const defaultState = getInitialDefaultState();
  safeSaveToLocalStorage(STORAGE_KEY, defaultState);
  safeSaveToLocalStorage(BACKUP_KEY, defaultState);
  return defaultState;
}

const INITIAL_TEAMS: TeamProject[] = [
  {
    id: 'team-1',
    name: 'Equipe 1 — Alfa (Descarte Consciente)',
    members: ['Participante 1', 'Participante 2', 'Participante 3'],
    problemStatement: 'Acúmulo de lixo eletrônico sem destinação adequada na escola e no bairro.',
    targetUsers: 'Estudantes, professores e moradores do entorno escolar.',
    solutionConcept: 'Assistente e mapa interativo guiado por IA para coleta e triagem de e-waste.',
    aiToolsUsed: ['ChatGPT', 'v0.dev'],
    prototypeUrl: 'https://v0.dev',
    stage: 'prototipo'
  },
  {
    id: 'team-2',
    name: 'Equipe 2 — Beta (Estudo Guiado)',
    members: ['Participante 1', 'Participante 2', 'Participante 3'],
    problemStatement: 'Dificuldade de organização de rotina de estudos para o ENEM entre jovens.',
    targetUsers: 'Estudantes do 3º ano do Ensino Médio.',
    solutionConcept: 'Gerador de planos de estudos personalizados com revisões espaçadas por IA.',
    aiToolsUsed: ['Claude', 'Bolt.new'],
    prototypeUrl: 'https://bolt.new',
    stage: 'briefing'
  },
  {
    id: 'team-3',
    name: 'Equipe 3 — Gama (Alimentação Saudável)',
    members: ['Participante 1', 'Participante 2', 'Participante 3'],
    problemStatement: 'Falta de opções saudáveis e acessíveis na cantina e no entorno escolar.',
    targetUsers: 'Comunidade escolar e cantineiros.',
    solutionConcept: 'Guia nutricional interativo e cardápio colaborativo.',
    aiToolsUsed: ['ChatGPT'],
    prototypeUrl: '',
    stage: 'diagnostico'
  },
  {
    id: 'team-4',
    name: 'Equipe 4 — Delta (Mobilidade Segura)',
    members: ['Participante 1', 'Participante 2', 'Participante 3'],
    problemStatement: 'Insegurança e falta de iluminação no trajeto dos estudantes até a escola.',
    targetUsers: 'Alunos do período noturno e pedestres.',
    solutionConcept: 'Mapeamento colaborativo de rotas seguras e alertas com IA.',
    aiToolsUsed: ['ChatGPT'],
    prototypeUrl: '',
    stage: 'diagnostico'
  }
];

const INITIAL_PROJECT_DATA: TeamProjectData = {
  teamName: '',
  projectName: '',
  individualChallengesNote: '',
  collectiveChallenge: '',
  phdProblems: '',
  phdHypotheses: '',
  phdDoubts: '',
  phdFacts: '',
  fiveWhysProblem: '',
  fiveWhysLevels: [
    { why: 'Por que o problema ocorre?', answer: '', type: 'hipotese', evidence: '' },
    { why: 'Por que isso acontece?', answer: '', type: 'hipotese', evidence: '' },
    { why: 'Por que a causa anterior ocorre?', answer: '', type: 'hipotese', evidence: '' },
    { why: 'Por que essa situação persiste?', answer: '', type: 'hipotese', evidence: '' },
    { why: 'Qual é a causa estrutural de fundo?', answer: '', type: 'hipotese', evidence: '' }
  ],
  rootCause: '',
  goldenCircleWhy: '',
  goldenCircleHow: '',
  goldenCircleWhat: '',
  solutionProblemSummary: '',
  solutionTargetAudience: '',
  solutionPurpose: '',
  solutionDescription: '',
  solutionKeyFeatures: '',
  solutionRisks: '',
  solutionSuccessCriteria: '',
  briefingWhatWeAreTryingToDo: '',
  briefingContext: '',
  briefingScope: '',
  prdHowItShouldWork: '',
  prdUserFlow: '',
  prdRequirements: '',
  prdConstraints: '',
  bmcValueProposition: '',
  bmcCustomerSegments: '',
  bmcChannels: '',
  bmcCustomerRelationships: '',
  bmcKeyActivities: '',
  bmcKeyResources: '',
  bmcKeyPartners: '',
  bmcCostStructure: '',
  bmcSustainability: '',
  mvpSmallestTestableVersion: '',
  mvpCoreFeatures: '',
  mvpTestHypothesis: '',
  prototypeType: 'Protótipo Visual / Esqueletos de Tela',
  prototypeLinkOrDescription: '',
  prototypeUserFeedback: '',
  roadmapNow: '',
  roadmapNext: '',
  roadmapFuture: '',
  bugsAndFixes: '',
  pitchProblem: '',
  pitchSolution: '',
  pitchAiRole: '',
  pitchLearnings: '',
  pitchCallToAction: '',
  pitchScriptText: '',
  v3ChosenProblem: '',
  v3ProblemDiagnosis: '',
  v3MapaRecursos: '',
  v3Proposito: '',
  v3BriefingV0: '',
  v3BriefingReview: '',
  v3BriefingV1: '',
  v3PrdV0: '',
  v3Mvp: '',
  v3EvidenceSummary: '',
  v3Sustentabilidade: '',
  v3Roadmap: '',
  v3PitchScript: '',
  v3Mapa4d: '',
  v3GoldenCircle: '',
  v3MapaTevep: '',
  v3PrototypeV0: '',
  v3TestPlan: '',
  v3RawFeedbacks: '',
  v3RawEvidence: '',
  v3RawEvidenceItems: [],
  v3FeedbackSynthesis: '',
  v3Bmc: '',
  v3PrototypeV1: '',
  v3PitchPresentation: '',
  v3PitchStructure: '',
  v3PitchSummary: '',
  v3PitchRevised: '',
  v3EvolutionRecord: '',
  v3RoadmapNow: '',
  v3RoadmapNext: '',
  v3RoadmapFuture: '',
  v3RoadmapWontDoNow: '',
  v3RoadmapThreePriorities: '',
  v3RoadmapSummary: '',
  testExecutionNotes: '',
  v3RehearsalStatus: 'nao_iniciado',
  v3RehearsalNotes: '',
  selectedProblemId: undefined
};

export interface TimerState {
  minutes: number;
  seconds: number;
  totalSeconds: number;
  remainingSeconds: number;
  initialSeconds: number;
  isRunning: boolean;
  activityTitle: string;
  activeActivityTitle: string;
  isFullscreen: boolean;
  isFinished: boolean;
  soundEnabled: boolean;
}

interface AppContextType {
  state: AppState;
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  timer: TimerState;
  lastSavedTime: string | null;
  lastManualSaveTime: string | null;
  saveStatus: 'saved' | 'saving' | 'pending' | 'just_saved';
  hasUnsavedChanges: boolean;
  showUnsavedPrompt: boolean;
  showDeviceNotice: boolean;
  setShowDeviceNotice: (show: boolean) => void;
  triggerManualSave: () => boolean;
  dismissUnsavedPrompt: () => void;
  
  // Navigation & Views
  setCurrentView: (view: 'landing' | 'webapp') => void;
  setActiveWebappTab: (tab: AppState['activeWebappTab']) => void;
  setSelectedEncounterId: (id: number) => void;
  setUserMode: (mode: UserMode) => void;
  toggleTheme: () => void;
  
  // Fake Authentication (Prototype Mode: admin / segredo)
  isWebappAuthenticated: boolean;
  loginWebapp: (user: string, pass: string) => boolean;
  logoutWebapp: () => void;
  
  // Activity Status & Checklists
  toggleActivityCompleted: (activityId: string) => void;
  updateEncounterNote: (encounterId: number, note: string) => void;
  setActivityStatus: (activityId: string, status: ActivityStatus) => void;
  toggleFacilitatorChecklist: (checklistItemId: string) => void;
  setFacilitatorNotes: (encounterId: number, notes: string) => void;
  
  // Teams
  updateTeam: (teamId: string, updates: Partial<TeamProject>) => void;
  addTeam: () => void;
  removeTeam: (teamId: string) => void;

  // Team Project Editing
  updateProjectData: (fields: Partial<TeamProjectData>) => void;
  resetProjectData: () => void;
  
  // Timer Controls
  startTimer: (durationMinutes?: number, title?: string) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  addMinutesToTimer: (mins: number) => void;
  setTimerSeconds: (seconds: number, title?: string) => void;
  toggleTimerFullscreen: () => void;
  setProjectionOpen: (isOpen: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  
  // Export Helpers
  exportProjectMarkdown: () => string;
  copyProjectToClipboard: () => Promise<boolean>;

  // V2 Methods
  saveArtifactVersion: (
    artifactId: string,
    versionName: string,
    content: string,
    activityId: string,
    checkpointConfirmed: boolean,
    provenanceNote?: string,
    structuredClaims?: Record<string, { value: string; epistemologicalStatus?: EpistemologicalStatus }>
  ) => ArtifactVersion;
  updateProjectClaim: (
    field: keyof ProjectStateV2,
    value: string,
    epistemologicalStatus: EpistemologicalStatus
  ) => void;
  addFacilitatorObservation: (
    observation: Omit<FacilitatorObservation, 'id' | 'timestamp'>
  ) => void;
  deleteFacilitatorObservation: (id: string) => void;
  saveDraftArtifact: (activityId: string, content: string) => void;
  setCurrentPilotActivityId: (activityId: string) => void;

  // V1.4.1 Canonical Methods
  canonicalProjectState: CanonicalProjectState;
  updateCanonicalArtifact: (
    familyId: ArtifactFamilyId,
    content: string,
    status?: 'draft' | 'validated',
    version?: 'V0' | 'V1'
  ) => void;
  addEvidenceRecord: (
    evidence: Omit<CanonicalEvidenceRecord, 'id' | 'createdAt'>
  ) => void;
  deleteEvidenceRecord: (id: string) => void;
  updateCanonicalProjectState: (
    updates: Partial<CanonicalProjectState>
  ) => void;
  exportCanonicalBackupJson: () => string;
  importBackupJson: (jsonString: string) => boolean;

  // Brand Preview Modal
  brandModal: {
    isOpen: boolean;
    imageUrl: string;
    title: string;
    subtitle?: string;
    ctaUrl?: string;
    ctaLabel?: string;
  };
  openBrandModal: (data: {
    imageUrl: string;
    title: string;
    subtitle?: string;
    ctaUrl?: string;
    ctaLabel?: string;
  }) => void;
  closeBrandModal: () => void;

  // Privacy & LGPD Modal
  isPrivacyModalOpen: boolean;
  openPrivacyModal: () => void;
  closePrivacyModal: () => void;

  // Onboarding & Welcome Modal
  isOnboardingModalOpen: boolean;
  openOnboardingModal: () => void;
  closeOnboardingModal: () => void;

  // Local-First Hardening & Emergency Recovery
  restoreSafetyBackup: () => boolean;
  hasSafetyBackup: boolean;

  // Requisitos Obrigatórios de Identificação do Projeto (Salvar & Exportar)
  isProjectIdentified: boolean;
  isProjectIdentModalOpen: boolean;
  projectIdentActionTitle: string;
  projectIdentSuccessCallback?: () => void;
  openProjectIdentModal: (actionTitle?: string, onSuccess?: () => void) => void;
  closeProjectIdentModal: () => void;
  ensureProjectIdentification: (onSuccess: () => void, actionTitle?: string) => boolean;
  confirmProjectIdentification: (projectName: string, teamName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Parses window.location.hash to extract the active view, webapp tab, activity ID and user mode.
 */
export function parseRouteFromLocation(): {
  view: 'landing' | 'webapp';
  tab?: AppState['activeWebappTab'];
  activityId?: string;
  userMode?: UserMode;
} {
  if (typeof window === 'undefined') return { view: 'landing' };

  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  const lowerHash = hash.toLowerCase();

  // Facilitator
  if (lowerHash === 'facilitador' || lowerHash.startsWith('facilitador/')) {
    return { view: 'webapp', tab: 'facilitador', userMode: 'facilitador' };
  }

  // Activities (e.g. atividade/e1-a01, atividade/E2-A03)
  if (lowerHash.startsWith('atividade') || lowerHash.startsWith('v2-atividade')) {
    const parts = hash.split('/');
    const actIdRaw = parts[1];
    const actId = actIdRaw ? actIdRaw.toUpperCase() : undefined;
    return { view: 'webapp', tab: 'atividade', activityId: actId, userMode: 'participante' };
  }

  // Jornada
  if (lowerHash === 'jornada' || lowerHash === 'dashboard') {
    return { view: 'webapp', tab: 'jornada', userMode: 'participante' };
  }

  // Projeto
  if (lowerHash === 'projeto' || lowerHash === 'v2-projeto') {
    return { view: 'webapp', tab: 'projeto', userMode: 'participante' };
  }

  // Recursos and shortcuts
  if (
    lowerHash === 'recursos' ||
    lowerHash.startsWith('recursos/') ||
    lowerHash === 'prompts' ||
    lowerHash === 'ementa' ||
    lowerHash === 'mapa' ||
    lowerHash === 'mapa-problemas' ||
    lowerHash === 'exportar' ||
    lowerHash === 'materiais'
  ) {
    return { view: 'webapp', tab: 'recursos', userMode: 'participante' };
  }

  // Ajuda
  if (lowerHash === 'ajuda') {
    return { view: 'webapp', tab: 'ajuda', userMode: 'participante' };
  }

  // Webapp root fallback
  if (lowerHash === 'webapp') {
    return { view: 'webapp', tab: 'jornada', userMode: 'participante' };
  }

  // Landing page anchor hashes or empty
  return { view: 'landing' };
}

/**
 * Updates URL hash to reflect current view, tab, and activity without full page reloads.
 */
export function syncRouteToLocation(
  view: 'landing' | 'webapp',
  tab: AppState['activeWebappTab'],
  activityId?: string,
  userMode?: UserMode
) {
  if (typeof window === 'undefined') return;

  if (view === 'landing') {
    if (window.location.hash.startsWith('#/')) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    return;
  }

  let targetHash = '#/jornada';
  if (userMode === 'facilitador' || tab === 'facilitador') {
    targetHash = '#/facilitador';
  } else if (tab === 'atividade' || tab === 'v2-atividade') {
    targetHash = `#/atividade/${(activityId || 'E1-A01').toUpperCase()}`;
  } else if (tab === 'projeto' || tab === 'v2-projeto') {
    targetHash = '#/projeto';
  } else if (tab === 'recursos' || tab === 'prompts' || tab === 'ementa' || tab === 'mapa' || tab === 'exportar') {
    targetHash = '#/recursos';
  } else if (tab === 'ajuda') {
    targetHash = '#/ajuda';
  }

  if (window.location.hash !== targetHash) {
    window.history.pushState(null, '', targetHash);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const loaded = loadPersistedState();
    const parsed = parseRouteFromLocation();
    return {
      ...loaded,
      currentView: parsed.view,
      activeWebappTab: parsed.tab || loaded.activeWebappTab || 'jornada',
      currentPilotActivityId: parsed.activityId || loaded.currentPilotActivityId || 'E1-A01',
      userMode: parsed.userMode || loaded.userMode || 'participante',
    };
  });

  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [lastManualSaveTime, setLastManualSaveTime] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'pending' | 'just_saved'>('saved');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [showUnsavedPrompt, setShowUnsavedPrompt] = useState<boolean>(false);
  const [showDeviceNotice, setShowDeviceNotice] = useState<boolean>(false);
  const isInitialMount = React.useRef(true);
  const unsavedTimerRef = React.useRef<any>(null);

  // Fake Authentication State (Prototype mode: admin / segredo)
  const [isWebappAuthenticated, setIsWebappAuthenticated] = useState<boolean>(() => {
    try {
      const sessionAuth = sessionStorage.getItem(FAKE_AUTH_STORAGE_KEY);
      if (sessionAuth === 'true') return true;
      const localAuth = localStorage.getItem(FAKE_AUTH_STORAGE_KEY);
      return localAuth === 'true';
    } catch {
      return false;
    }
  });

  const loginWebapp = (user: string, pass: string): boolean => {
    const normalizedPass = pass.trim();
    // O login pode ser "admin" ou qualquer outro nome/identificação inserido pelo usuário
    if (normalizedPass === 'segredo') {
      setIsWebappAuthenticated(true);
      try {
        sessionStorage.setItem(FAKE_AUTH_STORAGE_KEY, 'true');
        localStorage.setItem(FAKE_AUTH_STORAGE_KEY, 'true');
        if (user.trim()) {
          localStorage.setItem('oforno_webapp_fake_user', user.trim());
        }
      } catch (e) {
        console.warn('[FakeAuth] Storage write error:', e);
      }
      return true;
    }
    return false;
  };

  const logoutWebapp = () => {
    setIsWebappAuthenticated(false);
    try {
      sessionStorage.removeItem(FAKE_AUTH_STORAGE_KEY);
      localStorage.removeItem(FAKE_AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('[FakeAuth] Storage clear error:', e);
    }
  };

  // Mandatory Project Identification state for saving and exporting
  const isProjectIdentified = Boolean(
    (state.projectData?.projectName || '').trim() &&
    (state.projectData?.teamName || '').trim()
  );

  const [projectIdentModal, setProjectIdentModal] = useState<{
    isOpen: boolean;
    actionTitle: string;
    onSuccess?: () => void;
  }>({
    isOpen: false,
    actionTitle: 'salvar ou exportar o projeto',
  });

  const openProjectIdentModal = (actionTitle = 'salvar ou exportar o projeto', onSuccess?: () => void) => {
    setProjectIdentModal({
      isOpen: true,
      actionTitle,
      onSuccess,
    });
  };

  const closeProjectIdentModal = () => {
    setProjectIdentModal((prev) => ({ ...prev, isOpen: false }));
  };

  const confirmProjectIdentification = (projectName: string, teamName: string) => {
    const trimmedProject = projectName.trim();
    const trimmedTeam = teamName.trim();
    updateProjectData({
      projectName: trimmedProject,
      teamName: trimmedTeam,
    });
    const pendingSuccess = projectIdentModal.onSuccess;
    setProjectIdentModal({ isOpen: false, actionTitle: 'salvar ou exportar o projeto' });
    if (pendingSuccess) {
      setTimeout(() => {
        pendingSuccess();
      }, 60);
    }
  };

  const ensureProjectIdentification = (onSuccess: () => void, actionTitle = 'salvar ou exportar o projeto'): boolean => {
    const pName = (state.projectData?.projectName || '').trim();
    const tName = (state.projectData?.teamName || '').trim();
    if (pName && tName) {
      onSuccess();
      return true;
    }
    openProjectIdentModal(actionTitle, onSuccess);
    return false;
  };

  // Trigger manual save
  const triggerManualSave = (force = false): boolean => {
    try {
      const pName = (state.projectData?.projectName || '').trim();
      const tName = (state.projectData?.teamName || '').trim();
      if (!force && (!pName || !tName)) {
        openProjectIdentModal('salvar as alterações do projeto', () => {
          triggerManualSave(true);
        });
        return false;
      }

      setSaveStatus('saving');
      safeSaveToLocalStorage(STORAGE_KEY, state);
      safeSaveToLocalStorage(BACKUP_KEY, state);
      safeSaveToLocalStorage(PRE_RESET_KEY, state);
      const now = new Date();
      const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSavedTime(timeStr);
      setLastManualSaveTime(timeStr);
      setHasUnsavedChanges(false);
      setShowUnsavedPrompt(false);
      setShowDeviceNotice(true);
      setSaveStatus('just_saved');
      
      if (unsavedTimerRef.current) {
        clearTimeout(unsavedTimerRef.current);
        unsavedTimerRef.current = null;
      }

      setTimeout(() => {
        setSaveStatus('saved');
      }, 2500);
      return true;
    } catch (e) {
      console.error('[ManualSave] Error triggering manual save:', e);
      setSaveStatus('saved');
      return false;
    }
  };

  const dismissUnsavedPrompt = () => {
    setShowUnsavedPrompt(false);
  };

  // Brand Preview Modal State
  const [brandModal, setBrandModal] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
    subtitle?: string;
    ctaUrl?: string;
    ctaLabel?: string;
  }>({
    isOpen: false,
    imageUrl: '',
    title: '',
  });

  const openBrandModal = (data: {
    imageUrl: string;
    title: string;
    subtitle?: string;
    ctaUrl?: string;
    ctaLabel?: string;
  }) => {
    setBrandModal({
      isOpen: true,
      imageUrl: data.imageUrl,
      title: data.title,
      subtitle: data.subtitle,
      ctaUrl: data.ctaUrl,
      ctaLabel: data.ctaLabel,
    });
  };

  const closeBrandModal = () => {
    setBrandModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Privacy Modal State
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const openPrivacyModal = () => setIsPrivacyModalOpen(true);
  const closePrivacyModal = () => setIsPrivacyModalOpen(false);

  // Onboarding Modal State
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const openOnboardingModal = () => setIsOnboardingModalOpen(true);
  const closeOnboardingModal = () => setIsOnboardingModalOpen(false);

  // Check if onboarding should open automatically on entering webapp
  useEffect(() => {
    if (state.currentView === 'webapp') {
      const seen = localStorage.getItem('oforno_onboarding_seen');
      if (seen !== 'true') {
        setIsOnboardingModalOpen(true);
      }
    }
  }, [state.currentView]);

  // Timer internal state
  const [timerInternal, setTimerInternal] = useState(() => {
    const currentAct = getPilotActivityById(state.currentPilotActivityId || 'E1-A01');
    const defaultSecs = (currentAct?.durationMinutes || 30) * 60;
    return {
      remainingSeconds: state.timer?.remainingSeconds ?? defaultSecs,
      initialSeconds: state.timer?.initialSeconds ?? defaultSecs,
      isRunning: state.timer?.isRunning || false,
      activityTitle: state.timer?.activeActivityTitle || currentAct?.title || 'Atividade Geral',
      isFullscreen: state.isProjectionOpen || false,
      soundEnabled: state.timer?.soundEnabled ?? true
    };
  });

  // Automatically synchronize timer duration with current activity when changed
  useEffect(() => {
    const act = getPilotActivityById(state.currentPilotActivityId || 'E1-A01');
    if (act && !timerInternal.isRunning) {
      const secs = (act.durationMinutes || 30) * 60;
      setTimerInternal((prev) => ({
        ...prev,
        initialSeconds: secs,
        remainingSeconds: secs,
        activityTitle: act.title,
      }));
    }
  }, [state.currentPilotActivityId]);

  // URL Route Synchronization on popstate & hashchange (Browser Back / Forward / Direct Link support)
  useEffect(() => {
    const handleHashSync = () => {
      const parsed = parseRouteFromLocation();
      setState((prev) => {
        const next = { ...prev };
        next.currentView = parsed.view;
        if (parsed.tab) next.activeWebappTab = parsed.tab;
        if (parsed.activityId) next.currentPilotActivityId = parsed.activityId;
        if (parsed.userMode) next.userMode = parsed.userMode;
        return next;
      });
    };

    window.addEventListener('hashchange', handleHashSync);
    window.addEventListener('popstate', handleHashSync);
    return () => {
      window.removeEventListener('hashchange', handleHashSync);
      window.removeEventListener('popstate', handleHashSync);
    };
  }, []);

  // Save to LocalStorage (Primary + Shadow Backup Copy)
  useEffect(() => {
    safeSaveToLocalStorage(STORAGE_KEY, state);
    safeSaveToLocalStorage(BACKUP_KEY, state);
    const now = new Date();
    setLastSavedTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Mark as having unsaved manual changes
    setHasUnsavedChanges(true);

    // After 5 minutes (300,000ms) of active editing without manual save, show gentle non-intrusive prompt
    if (!unsavedTimerRef.current) {
      unsavedTimerRef.current = setTimeout(() => {
        setShowUnsavedPrompt(true);
      }, 300000);
    }
  }, [state]);

  // Multi-tab real-time state synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed && typeof parsed === 'object') {
            setState(hydrateAndNormalizeState(parsed));
          }
        } catch (err) {
          console.warn('[LocalStorage] Storage event parse error:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Dark mode HTML class
  useEffect(() => {
    if (state.activeTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.activeTheme]);

  // Timer countdown ticker with Web Audio chime when reaching 0
  useEffect(() => {
    let interval: any = null;
    if (timerInternal.isRunning && timerInternal.remainingSeconds > 0) {
      interval = setInterval(() => {
        setTimerInternal((prev) => {
          if (prev.remainingSeconds <= 1) {
            // Play gentle audio chime if sound is enabled
            if (prev.soundEnabled) {
              try {
                const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
                if (AudioCtx) {
                  const ctx = new AudioCtx();
                  const now = ctx.currentTime;
                  const osc1 = ctx.createOscillator();
                  const gain1 = ctx.createGain();
                  osc1.type = 'sine';
                  osc1.frequency.setValueAtTime(587.33, now); // D5
                  osc1.frequency.exponentialRampToValueAtTime(880, now + 0.3); // A5
                  gain1.gain.setValueAtTime(0.12, now);
                  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
                  osc1.connect(gain1);
                  gain1.connect(ctx.destination);
                  osc1.start(now);
                  osc1.stop(now + 0.8);
                }
              } catch (e) {
                // Audio autoplay constraint fallback
              }
            }

            return {
              ...prev,
              remainingSeconds: 0,
              isRunning: false
            };
          }
          return {
            ...prev,
            remainingSeconds: prev.remainingSeconds - 1
          };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerInternal.isRunning, timerInternal.remainingSeconds]);

  // Keep state.timer in sync with timerInternal
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isProjectionOpen: timerInternal.isFullscreen,
      timer: {
        isRunning: timerInternal.isRunning,
        remainingSeconds: timerInternal.remainingSeconds,
        initialSeconds: timerInternal.initialSeconds,
        activeActivityTitle: timerInternal.activityTitle,
        soundEnabled: timerInternal.soundEnabled
      }
    }));
  }, [timerInternal]);

  // Navigation & Views
  const setCurrentView = (view: 'landing' | 'webapp') => {
    setState((prev) => {
      syncRouteToLocation(view, prev.activeWebappTab, prev.currentPilotActivityId, prev.userMode);
      return { ...prev, currentView: view };
    });
  };

  const setActiveWebappTab = (tab: AppState['activeWebappTab']) => {
    setState((prev) => {
      syncRouteToLocation('webapp', tab, prev.currentPilotActivityId, prev.userMode);
      return { ...prev, currentView: 'webapp', activeWebappTab: tab };
    });
  };

  const setSelectedEncounterId = (id: number) => {
    setState((prev) => ({ ...prev, selectedEncounterId: id }));
  };

  const setUserMode = (mode: UserMode) => {
    setState((prev) => {
      syncRouteToLocation(prev.currentView, prev.activeWebappTab, prev.currentPilotActivityId, mode);
      return { ...prev, userMode: mode };
    });
  };

  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      activeTheme: prev.activeTheme === 'light' ? 'dark' : 'light'
    }));
  };

  // Activity & Notes
  const toggleActivityCompleted = (activityId: string) => {
    setState((prev) => {
      const exists = prev.completedActivityIds.includes(activityId);
      return {
        ...prev,
        completedActivityIds: exists
          ? prev.completedActivityIds.filter((id) => id !== activityId)
          : [...prev.completedActivityIds, activityId]
      };
    });
  };

  const updateEncounterNote = (encounterId: number, note: string) => {
    setState((prev) => ({
      ...prev,
      encounterNotes: {
        ...prev.encounterNotes,
        [encounterId]: note
      }
    }));
  };

  const setActivityStatus = (activityId: string, status: ActivityStatus) => {
    setState((prev) => ({
      ...prev,
      activityProgress: {
        ...(prev.activityProgress || {}),
        [activityId]: status
      }
    }));
  };

  const toggleFacilitatorChecklist = (checklistItemId: string) => {
    setState((prev) => ({
      ...prev,
      facilitatorChecklists: {
        ...(prev.facilitatorChecklists || {}),
        [checklistItemId]: !prev.facilitatorChecklists?.[checklistItemId]
      }
    }));
  };

  const setFacilitatorNotes = (encounterId: number, notes: string) => {
    setState((prev) => ({
      ...prev,
      facilitatorNotes: {
        ...(prev.facilitatorNotes || {}),
        [encounterId]: notes
      }
    }));
  };

  // Teams
  const updateTeam = (teamId: string, updates: Partial<TeamProject>) => {
    setState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => (t.id === teamId ? { ...t, ...updates } : t))
    }));
  };

  const addTeam = () => {
    setState((prev) => {
      if (prev.teams.length >= 4) return prev;
      const nextNum = prev.teams.length + 1;
      const newTeam: TeamProject = {
        id: `team-${Date.now()}`,
        name: `Equipe ${nextNum}`,
        members: ['Participante 1'],
        problemStatement: '',
        targetUsers: '',
        solutionConcept: '',
        aiToolsUsed: ['ChatGPT'],
        stage: 'diagnostico'
      };
      return { ...prev, teams: [...prev.teams, newTeam] };
    });
  };

  const removeTeam = (teamId: string) => {
    setState((prev) => ({
      ...prev,
      teams: prev.teams.filter((t) => t.id !== teamId)
    }));
  };

  // Project Data
  const updateProjectData = (fields: Partial<TeamProjectData>) => {
    setState((prev) => {
      const mergedProjectData = {
        ...INITIAL_PROJECT_DATA,
        ...(prev.projectData || {}),
        ...fields,
      };
      // Synchronize into Canonical Project State
      const updatedCanonical = buildCanonicalProjectStateFromLegacy(mergedProjectData, prev);
      return {
        ...prev,
        projectData: mergedProjectData,
        projectStateV1_4_1: updatedCanonical,
      };
    });
  };

  // Canonical V1.4.1 State Handlers
  const updateCanonicalArtifact = (
    familyId: ArtifactFamilyId,
    content: string,
    status: 'draft' | 'validated' = 'validated',
    version: 'V0' | 'V1' = 'V0'
  ) => {
    setState((prev) => {
      const currentCanonical = prev.projectStateV1_4_1 || createDefaultCanonicalProjectState();
      const now = new Date().toISOString();
      const updatedArtifacts = { ...currentCanonical.artifacts };

      if (familyId === 'AF04') {
        const prevAf04 = updatedArtifacts.AF04 || { activeVersion: 'V0', status: 'draft', updatedAt: now };
        updatedArtifacts.AF04 = {
          ...prevAf04,
          v0Content: version === 'V0' ? content : prevAf04.v0Content,
          v1Content: version === 'V1' ? content : prevAf04.v1Content,
          activeVersion: version,
          status,
          updatedAt: now,
        };
      } else if (familyId === 'AF08') {
        const prevAf08 = updatedArtifacts.AF08 || { activeVersion: 'V0', status: 'draft', updatedAt: now };
        updatedArtifacts.AF08 = {
          ...prevAf08,
          v0Content: version === 'V0' ? content : prevAf08.v0Content,
          v1Content: version === 'V1' ? content : prevAf08.v1Content,
          activeVersion: version,
          status,
          updatedAt: now,
        };
      } else {
        updatedArtifacts[familyId] = {
          content,
          status,
          updatedAt: now,
        };
      }

      const updatedCanonical: CanonicalProjectState = {
        ...currentCanonical,
        artifacts: updatedArtifacts,
      };

      const updatedLegacy = syncCanonicalToLegacyProjectData(
        updatedCanonical,
        prev.projectData || INITIAL_PROJECT_DATA
      );

      return {
        ...prev,
        projectStateV1_4_1: updatedCanonical,
        projectData: updatedLegacy,
      };
    });
  };

  const addEvidenceRecord = (
    evidence: Omit<CanonicalEvidenceRecord, 'id' | 'createdAt'>
  ) => {
    setState((prev) => {
      const currentCanonical = prev.projectStateV1_4_1 || createDefaultCanonicalProjectState();
      const now = new Date().toISOString();
      const newRecord: CanonicalEvidenceRecord = {
        ...evidence,
        id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: now,
      };
      const updatedEvidences = [...currentCanonical.evidences, newRecord];
      const updatedCanonical: CanonicalProjectState = {
        ...currentCanonical,
        evidences: updatedEvidences,
        hasExternalEvidence: true,
        testStatus: 'realizado',
      };

      return {
        ...prev,
        projectStateV1_4_1: updatedCanonical,
      };
    });
  };

  const deleteEvidenceRecord = (id: string) => {
    setState((prev) => {
      const currentCanonical = prev.projectStateV1_4_1 || createDefaultCanonicalProjectState();
      const updatedEvidences = currentCanonical.evidences.filter((e) => e.id !== id);
      const updatedCanonical: CanonicalProjectState = {
        ...currentCanonical,
        evidences: updatedEvidences,
        hasExternalEvidence: updatedEvidences.length > 0,
        testStatus: updatedEvidences.length > 0 ? 'realizado' : 'nao_realizado',
      };

      return {
        ...prev,
        projectStateV1_4_1: updatedCanonical,
      };
    });
  };

  const updateCanonicalProjectState = (updates: Partial<CanonicalProjectState>) => {
    setState((prev) => {
      const currentCanonical = prev.projectStateV1_4_1 || createDefaultCanonicalProjectState();
      const updatedCanonical: CanonicalProjectState = {
        ...currentCanonical,
        ...updates,
      };
      const updatedLegacy = syncCanonicalToLegacyProjectData(
        updatedCanonical,
        prev.projectData || INITIAL_PROJECT_DATA
      );

      return {
        ...prev,
        projectStateV1_4_1: updatedCanonical,
        projectData: updatedLegacy,
      };
    });
  };

  const exportCanonicalBackupJson = (): string => {
    return JSON.stringify(state, null, 2);
  };

  const importBackupJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      const normalized = hydrateAndNormalizeState(parsed);
      setState(normalized);
      safeSaveToLocalStorage(STORAGE_KEY, normalized);
      safeSaveToLocalStorage(BACKUP_KEY, normalized);
      return true;
    } catch (e) {
      console.error('[Backup Import] Error importing JSON backup:', e);
      return false;
    }
  };

  const [hasSafetyBackup, setHasSafetyBackup] = useState<boolean>(() => {
    try {
      return !!(localStorage.getItem(PRE_RESET_KEY) || localStorage.getItem(BACKUP_KEY));
    } catch {
      return false;
    }
  });

  const restoreSafetyBackup = (): boolean => {
    try {
      const raw = localStorage.getItem(PRE_RESET_KEY) || localStorage.getItem(BACKUP_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const restored = hydrateAndNormalizeState(parsed);
        setState(restored);
        safeSaveToLocalStorage(STORAGE_KEY, restored);
        safeSaveToLocalStorage(BACKUP_KEY, restored);
        setHasSafetyBackup(true);
        return true;
      }
    } catch (e) {
      console.error('[LocalStorage] Error restoring safety backup:', e);
    }
    return false;
  };

  const resetProjectData = () => {
    // 1. Create a pre-reset safety snapshot before wiping
    safeSaveToLocalStorage(PRE_RESET_KEY, state);
    setHasSafetyBackup(true);

    // 2. Build clean canonical project state (clears all canonical artifacts, test status, evidences, etc.)
    const cleanCanonical = createDefaultCanonicalProjectState();

    // 3. Build reset state ensuring all artifacts, document mestre, and project claims are cleared
    const resetState: AppState = {
      ...state,
      projectData: { ...INITIAL_PROJECT_DATA },
      projectStateV1_4_1: cleanCanonical,
      activityProgress: {},
      facilitatorChecklists: {},
      completedActivityIds: [],
      encounterNotes: {},
      facilitatorNotes: {},
      artifactVersions: [],
      projectStateV2: {},
      facilitatorObservations: [],
      currentPilotActivityId: 'E1-A01',
      draftArtifacts: {},
      customProblems: [],
      selectedProblemId: undefined,
    };

    setState(resetState);
    setHasUnsavedChanges(false);
    setSaveStatus('saved');
    safeSaveToLocalStorage(STORAGE_KEY, resetState);
    safeSaveToLocalStorage(BACKUP_KEY, resetState);
  };

  // Timer methods
  const startTimer = (durationMinutes?: number, title?: string) => {
    const currentAct = getPilotActivityById(state.currentPilotActivityId || 'E1-A01');
    const mins = durationMinutes && durationMinutes > 0 ? durationMinutes : (currentAct?.durationMinutes || 30);
    const totalSecs = mins * 60;
    setTimerInternal((prev) => ({
      ...prev,
      remainingSeconds: totalSecs,
      initialSeconds: totalSecs,
      isRunning: true,
      activityTitle: title || currentAct?.title || prev.activityTitle
    }));
  };

  const pauseTimer = () => {
    setTimerInternal((prev) => ({ ...prev, isRunning: false }));
  };

  const resumeTimer = () => {
    if (timerInternal.remainingSeconds > 0) {
      setTimerInternal((prev) => ({ ...prev, isRunning: true }));
    }
  };

  const resetTimer = () => {
    setTimerInternal((prev) => ({
      ...prev,
      remainingSeconds: prev.initialSeconds,
      isRunning: false
    }));
  };

  const addMinutesToTimer = (mins: number) => {
    setTimerInternal((prev) => {
      const addedSecs = mins * 60;
      const newTotal = Math.max(0, prev.remainingSeconds + addedSecs);
      return {
        ...prev,
        remainingSeconds: newTotal,
        // Auto-resume timer if adding positive time when timer was at zero or finished
        isRunning: newTotal > 0 ? (prev.remainingSeconds === 0 ? true : prev.isRunning) : false
      };
    });
  };

  const setTimerSeconds = (seconds: number, title?: string) => {
    const validSecs = Math.max(1, seconds);
    setTimerInternal((prev) => ({
      ...prev,
      remainingSeconds: validSecs,
      initialSeconds: validSecs,
      isRunning: true,
      activityTitle: title || prev.activityTitle
    }));
  };

  const toggleTimerFullscreen = () => {
    setTimerInternal((prev) => ({ ...prev, isFullscreen: !prev.isFullscreen }));
  };

  const setProjectionOpen = (isOpen: boolean) => {
    setTimerInternal((prev) => ({ ...prev, isFullscreen: isOpen }));
  };

  const setSoundEnabled = (enabled: boolean) => {
    setTimerInternal((prev) => ({ ...prev, soundEnabled: enabled }));
  };

  // Export Helpers
  const exportProjectMarkdown = (): string => {
    const p = state.projectData || INITIAL_PROJECT_DATA;
    return `# PROJETO: ${p.projectName || 'Sem Nome'}
**Equipe:** ${p.teamName || 'Não informada'}
**Data de Exportação:** ${new Date().toLocaleDateString('pt-BR')}
**Workshop:** IA Aplicada: do Problema ao Protótipo (O Forno)

---

## 1. DESAFIO COLETIVO E PROPÓSITO
- **Desafio Selecionado:** ${p.collectiveChallenge || 'Pendente'}
- **Propósito (Por Quê):** ${p.goldenCircleWhy || 'Pendente'}
- **Critérios e Valores (Como):** ${p.goldenCircleHow || 'Pendente'}
- **Iniciativa (O Quê):** ${p.goldenCircleWhat || 'Pendente'}

---

## 2. INVESTIGAÇÃO CAUSAL (FATOS E HIPÓTESES)
- **Problemas:** ${p.phdProblems || 'Pendente'}
- **Hipóteses:** ${p.phdHypotheses || 'Pendente'}
- **Dúvidas a Checar:** ${p.phdDoubts || 'Pendente'}
- **Causa Prioritária:** ${p.rootCause || 'Pendente'}

---

## 3. BRIEFING DA SOLUÇÃO
- **O que estamos tentando fazer:** ${p.briefingWhatWeAreTryingToDo || 'Pendente'}
- **Contexto e Motivação:** ${p.briefingContext || 'Pendente'}
- **Escopo do Workshop:** ${p.briefingScope || 'Pendente'}

---

## 4. PRD (DOCUMENTO DE REQUISITOS DO PRODUTO)
- **Funcionamento Geral:** ${p.prdHowItShouldWork || 'Pendente'}
- **Jornada do Usuário:** ${p.prdUserFlow || 'Pendente'}
- **Requisitos Essenciais:** ${p.prdRequirements || 'Pendente'}
- **Limites e Regras de Privacidade:** ${p.prdConstraints || 'Pendente'}

---

## 5. BUSINESS MODEL CANVAS (BMC SOCIAL/ESCOLA)
- **Proposta de Valor:** ${p.bmcValueProposition || 'Pendente'}
- **Público Beneficiário:** ${p.bmcCustomerSegments || 'Pendente'}
- **Canais e Acesso:** ${p.bmcChannels || 'Pendente'}
- **Parcerias Estratégicas:** ${p.bmcKeyPartners || 'Pendente'}
- **Recursos Necessários:** ${p.bmcKeyResources || 'Pendente'}
- **Sustentabilidade do Projeto:** ${p.bmcSustainability || 'Pendente'}

---

## 6. MVP & PROTÓTIPO (V0 / V1)
- **Menor Versão Testável (MVP):** ${p.mvpSmallestTestableVersion || 'Pendente'}
- **Hipótese de Teste:** ${p.mvpTestHypothesis || 'Pendente'}
- **Tipo de Protótipo:** ${p.prototypeType || 'Pendente'}
- **Descrição / Link do Protótipo:** ${p.prototypeLinkOrDescription || 'Pendente'}
- **Feedbacks do Teste de Usuários:** ${p.prototypeUserFeedback || 'Pendente'}

---

## 7. ROADMAP DE EVOLUÇÃO
- **AGORA (Prioridades no Workshop):** ${p.roadmapNow || 'Pendente'}
- **DEPOIS (Próximas Semanas):** ${p.roadmapNext || 'Pendente'}
- **FUTURAMENTE (Longo Prazo):** ${p.roadmapFuture || 'Pendente'}

---

## 8. ROTEIRO DE PITCH (3 MINUTOS)
${p.pitchScriptText || 'Pendente'}
`;
  };

  const copyProjectToClipboard = async (): Promise<boolean> => {
    try {
      const text = exportProjectMarkdown();
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      console.error('Failed to copy project markdown', e);
      return false;
    }
  };

  // V2 Methods Implementation
  const saveArtifactVersion = (
    artifactId: string,
    versionName: string,
    content: string,
    activityId: string,
    checkpointConfirmed: boolean,
    provenanceNote?: string,
    structuredClaims?: Record<string, { value: string; epistemologicalStatus?: EpistemologicalStatus }>
  ): ArtifactVersion => {
    const now = new Date().toISOString();
    const activity = getPilotActivityById(activityId);

    let createdVer: ArtifactVersion = {
      id: `art-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      artifactId,
      versionName,
      versionNumber: 0,
      content,
      activityId,
      status: checkpointConfirmed ? 'CONSOLIDADO' : 'EM_CONSTRUCAO',
      createdAt: now,
      updatedAt: now,
      checkpointConfirmed,
      provenanceNote,
    };

    setState((prev) => {
      const existingForArtifact = (prev.artifactVersions || []).filter(
        (v) => v.artifactId === artifactId
      );
      createdVer.versionNumber = existingForArtifact.length;

      // Supersede previous versions of the SAME logical artifact ONLY when checkpoint is confirmed
      const updatedVersions = (prev.artifactVersions || []).map((v) => {
        if (v.artifactId === artifactId && checkpointConfirmed && v.status !== 'SUPERADO') {
          return { ...v, status: 'SUPERADO' as const };
        }
        return v;
      });

      // Track replacesVersionId and derivedFromVersionIds
      const previousConsolidated = existingForArtifact.find((v) => v.status === 'CONSOLIDADO');
      if (previousConsolidated && checkpointConfirmed) {
        createdVer.replacesVersionId = previousConsolidated.id;
        createdVer.derivedFromVersionIds = [previousConsolidated.id];
      }

      // Track usedArtifactVersionIds (other artifacts used as input by this activity)
      const requiredInputs = activity?.aiPrompt?.contextPackConfig?.requiredArtifacts || [];
      const usedIds: string[] = [];
      requiredInputs.forEach((reqId) => {
        const latest = (prev.artifactVersions || []).find(
          (v) => v.artifactId === reqId && v.status === 'CONSOLIDADO'
        );
        if (latest) usedIds.push(latest.id);
      });
      if (usedIds.length > 0) {
        createdVer.usedArtifactVersionIds = usedIds;
      }

      let updatedProjectState = { ...prev.projectStateV2 };
      const savedStructuredData: Record<string, StructuredClaimValue> = {};

      // STRICT RULE: Only checkpointConfirmed === true allows updating ProjectStateV2
      // AND only fields declared in activity.stateUpdateConfig.allowedClaimMappings can be updated!
      if (checkpointConfirmed && activity?.stateUpdateConfig?.allowedClaimMappings) {
        const allowedMappings = activity.stateUpdateConfig.allowedClaimMappings;

        for (const mapping of allowedMappings) {
          const fieldKey = mapping.targetField;
          const userSubmitted = structuredClaims?.[fieldKey];

          if (userSubmitted && userSubmitted.value && userSubmitted.value.trim() !== '') {
            const finalStatus = userSubmitted.epistemologicalStatus || mapping.defaultEpistemologicalStatus;
            
            const claimValue: ProjectClaim = {
              value: userSubmitted.value.trim(),
              epistemologicalStatus: finalStatus,
              sourceArtifactVersionId: createdVer.id,
              sourceActivityId: activityId,
              updatedAt: now,
              replacedValue: prev.projectStateV2[fieldKey]?.value,
            };

            updatedProjectState[fieldKey] = claimValue;

            savedStructuredData[fieldKey] = {
              targetField: fieldKey,
              value: userSubmitted.value.trim(),
              epistemologicalStatus: finalStatus,
            };
          }
        }
      }

      if (Object.keys(savedStructuredData).length > 0) {
        createdVer.structuredData = savedStructuredData;
      }

      return {
        ...prev,
        artifactVersions: [...updatedVersions, createdVer],
        projectStateV2: updatedProjectState,
        completedActivityIds: checkpointConfirmed && !prev.completedActivityIds.includes(activityId)
          ? [...prev.completedActivityIds, activityId]
          : prev.completedActivityIds,
      };
    });

    return createdVer;
  };

  const updateProjectClaim = (
    field: keyof ProjectStateV2,
    value: string,
    epistemologicalStatus: EpistemologicalStatus
  ) => {
    const now = new Date().toISOString();
    setState((prev) => ({
      ...prev,
      projectStateV2: {
        ...prev.projectStateV2,
        [field]: {
          value,
          epistemologicalStatus,
          updatedAt: now,
          replacedValue: prev.projectStateV2[field]?.value,
        },
      },
    }));
  };

  const addFacilitatorObservation = (
    obs: Omit<FacilitatorObservation, 'id' | 'timestamp'>
  ) => {
    const now = new Date().toISOString();
    const newObs: FacilitatorObservation = {
      ...obs,
      id: `obs-${Date.now()}`,
      timestamp: now,
    };
    setState((prev) => ({
      ...prev,
      facilitatorObservations: [...(prev.facilitatorObservations || []), newObs],
    }));
  };

  const deleteFacilitatorObservation = (id: string) => {
    setState((prev) => ({
      ...prev,
      facilitatorObservations: (prev.facilitatorObservations || []).filter((o) => o.id !== id),
    }));
  };

  const saveDraftArtifact = (activityId: string, content: string) => {
    setState((prev) => ({
      ...prev,
      draftArtifacts: {
        ...(prev.draftArtifacts || {}),
        [activityId]: content,
      },
    }));
  };

  const setCurrentPilotActivityId = (activityId: string) => {
    const act = getPilotActivityById(activityId);
    setState((prev) => {
      syncRouteToLocation(prev.currentView, prev.activeWebappTab, activityId, prev.userMode);
      return { ...prev, currentPilotActivityId: activityId };
    });
    if (act && !timerInternal.isRunning) {
      const defaultSecs = (act.durationMinutes || 30) * 60;
      setTimerInternal((prev) => ({
        ...prev,
        remainingSeconds: defaultSecs,
        initialSeconds: defaultSecs,
        activityTitle: act.title
      }));
    }
  };

  // Constructed timer object to fulfill all component calls
  const timerContext: TimerState = {
    minutes: Math.floor(timerInternal.remainingSeconds / 60),
    seconds: timerInternal.remainingSeconds % 60,
    totalSeconds: timerInternal.remainingSeconds,
    remainingSeconds: timerInternal.remainingSeconds,
    initialSeconds: timerInternal.initialSeconds,
    isRunning: timerInternal.isRunning,
    activityTitle: timerInternal.activityTitle,
    activeActivityTitle: timerInternal.activityTitle,
    isFullscreen: timerInternal.isFullscreen,
    isFinished: timerInternal.remainingSeconds === 0,
    soundEnabled: timerInternal.soundEnabled
  };

  return (
    <AppContext.Provider
      value={{
        state,
        appState: state,
        setAppState: setState,
        timer: timerContext,
        lastSavedTime,
        lastManualSaveTime,
        saveStatus,
        hasUnsavedChanges,
        showUnsavedPrompt,
        showDeviceNotice,
        setShowDeviceNotice,
        triggerManualSave,
        dismissUnsavedPrompt,
        setCurrentView,
        setActiveWebappTab,
        setSelectedEncounterId,
        setUserMode,
        toggleTheme,
        isWebappAuthenticated,
        loginWebapp,
        logoutWebapp,
        toggleActivityCompleted,
        updateEncounterNote,
        setActivityStatus,
        toggleFacilitatorChecklist,
        setFacilitatorNotes,
        updateTeam,
        addTeam,
        removeTeam,
        updateProjectData,
        resetProjectData,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        addMinutesToTimer,
        setTimerSeconds,
        toggleTimerFullscreen,
        setProjectionOpen,
        setSoundEnabled,
        exportProjectMarkdown,
        copyProjectToClipboard,
        saveArtifactVersion,
        updateProjectClaim,
        addFacilitatorObservation,
        deleteFacilitatorObservation,
        saveDraftArtifact,
        setCurrentPilotActivityId,
        canonicalProjectState: state.projectStateV1_4_1 || createDefaultCanonicalProjectState(),
        updateCanonicalArtifact,
        addEvidenceRecord,
        deleteEvidenceRecord,
        updateCanonicalProjectState,
        exportCanonicalBackupJson,
        importBackupJson,
        brandModal,
        openBrandModal,
        closeBrandModal,
        isPrivacyModalOpen,
        openPrivacyModal,
        closePrivacyModal,
        isOnboardingModalOpen,
        openOnboardingModal,
        closeOnboardingModal,
        restoreSafetyBackup,
        hasSafetyBackup,
        isProjectIdentified,
        isProjectIdentModalOpen: projectIdentModal.isOpen,
        projectIdentActionTitle: projectIdentModal.actionTitle,
        projectIdentSuccessCallback: projectIdentModal.onSuccess,
        openProjectIdentModal,
        closeProjectIdentModal,
        ensureProjectIdentification,
        confirmProjectIdentification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
