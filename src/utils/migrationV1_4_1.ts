import { 
  AppState, 
  TeamProjectData, 
  CanonicalProjectState, 
  CanonicalEvidenceRecord, 
  ActivityId,
  ArtifactFamilyId,
  CANONICAL_VERSIONS
} from '../types/workshop';
import { CANONICAL_ARTIFACT_FAMILIES } from '../data/canonicalRegistry';

/**
 * Maps legacy pilot activity IDs (e.g. 'E1-A01') to canonical activity IDs ('A01' - 'A12')
 */
export const LEGACY_TO_CANONICAL_ACTIVITY_MAP: Record<string, ActivityId> = {
  // Encontro 1
  'E1-A01': 'A02', // Diagnóstico
  'E1-A02': 'A04', // Propósito e Direção
  'E1-A03': 'A04', // Fechamento E1
  // Encontro 2
  'E2-A01': 'A05', // Briefing V0
  'E2-A02': 'A06', // Revisão Briefing V1
  'E2-A03': 'A07', // PRD
  'E2-A04': 'A07', // MVP
  'E2-A05': 'A08', // Protótipo V0
  'E2-A06': 'A09', // Plano de Teste
  'E2-A07': 'A09', // Missão de Teste
  // Encontro 3
  'E3-A01': 'A09', // Execução Testes
  'E3-A02': 'A09', // Síntese Evidências
  'E3-A03': 'A10', // Modelo de Sustentabilidade
  'E3-A04': 'A11', // Roadmap
  'E3-A05': 'A08', // Evolução Protótipo V1
  'E3-A06': 'A09', // Próximo Teste
  // Encontro 4
  'E4-A01': 'A12', // Roteiro Pitch
  'E4-A02': 'A12', // Apresentação Pitch
  'E4-A03': 'A12', // Ensaio / Banca
  'E4-A04': 'A12', // Pitch Real
  'E4-A05': 'A12', // Celebração
};

export const CANONICAL_TO_LEGACY_ACTIVITY_MAP: Record<ActivityId, string> = {
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

/**
 * Normalizes an activity ID into a canonical ActivityId ('A01'...'A12')
 */
export function normalizeToCanonicalActivityId(rawId?: string): ActivityId {
  if (!rawId) return 'A01';
  const clean = rawId.trim().toUpperCase();
  if (/^A(0[1-9]|1[0-2])$/.test(clean)) {
    return clean as ActivityId;
  }
  if (LEGACY_TO_CANONICAL_ACTIVITY_MAP[clean]) {
    return LEGACY_TO_CANONICAL_ACTIVITY_MAP[clean];
  }
  return 'A01';
}

/**
 * Builds a default, clean CanonicalProjectState.
 */
export function createDefaultCanonicalProjectState(): CanonicalProjectState {
  const initialProgress: Record<ActivityId, 'not_started' | 'in_progress' | 'completed'> = {
    A01: 'not_started', A02: 'not_started', A03: 'not_started', A04: 'not_started', A05: 'not_started',
    A06: 'not_started', A07: 'not_started', A08: 'not_started', A09: 'not_started', A10: 'not_started',
    A11: 'not_started', A12: 'not_started',
  };

  return {
    version: '1.4.1',
    teamName: '',
    projectName: '',
    currentActivityId: 'A01',
    problemSelected: '',
    targetAudience: '',
    purpose: '',
    testStatus: 'nao_realizado',
    hasExternalEvidence: false,
    prototypeVersion: 'nenhum',
    nextAction: '',
    ideaBank: [],
    activityProgress: initialProgress,
    artifacts: {
      AF01: { content: '', status: 'draft', updatedAt: '' },
      AF02: { content: '', status: 'draft', updatedAt: '' },
      AF03: { content: '', status: 'draft', updatedAt: '' },
      AF04: { v0Content: '', v1Content: '', activeVersion: 'V0', status: 'draft', updatedAt: '' },
      AF05: { content: '', status: 'draft', updatedAt: '' },
      AF06: { content: '', status: 'draft', updatedAt: '' },
      AF07: { content: '', status: 'draft', updatedAt: '' },
      AF08: { v0Content: '', v1Content: '', activeVersion: 'V0', status: 'draft', updatedAt: '' },
      AF09: { content: '', status: 'draft', updatedAt: '' },
      AF10: { content: '', status: 'draft', updatedAt: '' },
      AF11: { content: '', status: 'draft', updatedAt: '' },
      AF12: { content: '', status: 'draft', updatedAt: '' },
      AF13: { content: '', status: 'draft', updatedAt: '' },
      AF14: { content: '', status: 'draft', updatedAt: '' },
    },
    evidences: [],
    transientOutputs: {},
  };
}

/**
 * Extracts and maps legacy project data and artifact versions into the CanonicalProjectState V1.4.1
 */
export function buildCanonicalProjectStateFromLegacy(
  projectData?: Partial<TeamProjectData>,
  rawState?: any
): CanonicalProjectState {
  const base = createDefaultCanonicalProjectState();
  const p = projectData || {};

  // 1. Estados Globais
  base.projectName = (p.projectName || rawState?.projectName || '').trim();
  base.teamName = (p.teamName || rawState?.teamName || '').trim();
  base.problemSelected = (
    p.collectiveChallenge ||
    (p as any).problemStatement ||
    rawState?.projectStateV2?.problem?.value ||
    ''
  ).trim();
  base.targetAudience = (
    p.solutionTargetAudience ||
    (p as any).targetUsers ||
    rawState?.projectStateV2?.audience?.value ||
    ''
  ).trim();
  base.purpose = (
    p.solutionPurpose ||
    p.goldenCircleWhy ||
    rawState?.projectStateV2?.purpose?.value ||
    ''
  ).trim();
  base.currentActivityId = normalizeToCanonicalActivityId(
    rawState?.currentPilotActivityId || rawState?.currentActivityId
  );

  // 2. Status de Teste e Evidências
  if (p.v3RawEvidence || (p.v3RawEvidenceItems && p.v3RawEvidenceItems.length > 0)) {
    base.hasExternalEvidence = true;
    base.testStatus = 'realizado';
  } else if (p.prototypeUserFeedback && p.prototypeUserFeedback.trim().length > 0) {
    base.hasExternalEvidence = true;
    base.testStatus = 'realizado';
  }

  if (p.v3PrototypeV1 || p.v3PrototypeV1Structured) {
    base.prototypeVersion = 'V1';
  } else if (p.v3PrototypeV0 || p.prototypeLinkOrDescription) {
    base.prototypeVersion = 'V0';
  }

  // 3. Mapeamento das 14 Famílias Canônicas de Artefatos
  const now = new Date().toISOString();

  // AF01 - Diagnóstico
  const diagContent = (p.v3ProblemDiagnosis || p.solutionProblemSummary || p.phdProblems || '').trim();
  if (diagContent) {
    base.artifacts.AF01 = { content: diagContent, status: 'validated', updatedAt: now };
  }

  // AF02 - Mapa de Recursos (4 Dimensões)
  const mapa4dContent = (p.v3Mapa4d || '').trim();
  if (mapa4dContent) {
    base.artifacts.AF02 = { content: mapa4dContent, status: 'validated', updatedAt: now };
  }

  // AF03 - Propósito e Direção
  const gcContent = (
    p.v3GoldenCircle ||
    (p.goldenCircleWhy ? `POR QUÊ:\n${p.goldenCircleWhy}\n\nCOMO:\n${p.goldenCircleHow}\n\nO QUÊ:\n${p.goldenCircleWhat}` : '')
  ).trim();
  if (gcContent) {
    base.artifacts.AF03 = { content: gcContent, status: 'validated', updatedAt: now };
  }

  // AF04 - Briefing (V0 e V1)
  const briefingV0 = (p.v3BriefingV0 || p.briefingWhatWeAreTryingToDo || '').trim();
  const briefingV1 = (p.v3BriefingV1 || p.briefingScope || '').trim();
  if (briefingV0 || briefingV1) {
    base.artifacts.AF04 = {
      v0Content: briefingV0,
      v1Content: briefingV1,
      activeVersion: briefingV1 ? 'V1' : 'V0',
      status: 'validated',
      updatedAt: now,
    };
  }

  // AF05 - PRD
  const prdContent = (p.v3PrdV0 || p.prdHowItShouldWork || '').trim();
  if (prdContent) {
    base.artifacts.AF05 = { content: prdContent, status: 'validated', updatedAt: now };
  }

  // AF06 - MVP
  const mvpContent = (p.v3Mvp || p.mvpSmallestTestableVersion || '').trim();
  if (mvpContent) {
    base.artifacts.AF06 = { content: mvpContent, status: 'validated', updatedAt: now };
  }

  // AF07 - Plano de Realização
  const tevepContent = (p.v3MapaTevep || '').trim();
  if (tevepContent) {
    base.artifacts.AF07 = { content: tevepContent, status: 'validated', updatedAt: now };
  }

  // AF08 - Protótipo (V0 e V1)
  const protoV0 = (p.v3PrototypeV0 || p.prototypeLinkOrDescription || '').trim();
  const protoV1 = (p.v3PrototypeV1 || '').trim();
  if (protoV0 || protoV1) {
    base.artifacts.AF08 = {
      v0Content: protoV0,
      v1Content: protoV1,
      activeVersion: protoV1 ? 'V1' : 'V0',
      status: 'validated',
      updatedAt: now,
    };
  }

  // AF09 - Plano de Teste
  const testPlan = (p.v3TestPlan || '').trim();
  if (testPlan) {
    base.artifacts.AF09 = { content: testPlan, status: 'validated', updatedAt: now };
  }

  // AF10 - Síntese de Evidências
  const evidenceSynthesis = (p.v3EvidenceSummary || p.v3FeedbackSynthesis || p.prototypeUserFeedback || '').trim();
  if (evidenceSynthesis) {
    base.artifacts.AF10 = { content: evidenceSynthesis, status: 'validated', updatedAt: now };
  }

  // AF11 - Modelo de Sustentabilidade (BMC)
  const bmcContent = (p.v3Bmc || p.bmcValueProposition || '').trim();
  if (bmcContent) {
    base.artifacts.AF11 = { content: bmcContent, status: 'validated', updatedAt: now };
  }

  // AF12 - Roadmap
  const roadmapContent = (p.v3Roadmap || p.roadmapNow || '').trim();
  if (roadmapContent) {
    base.artifacts.AF12 = { content: roadmapContent, status: 'validated', updatedAt: now };
  }

  // AF13 - Roteiro do Pitch
  const pitchScript = (p.v3PitchScript || p.pitchScriptText || '').trim();
  if (pitchScript) {
    base.artifacts.AF13 = { content: pitchScript, status: 'validated', updatedAt: now };
  }

  // AF14 - Apresentação do Pitch
  const pitchPres = (p.v3PitchPresentation || '').trim();
  if (pitchPres) {
    base.artifacts.AF14 = { content: pitchPres, status: 'validated', updatedAt: now };
  }

  // 4. Mapeamento de Evidências Reais Estruturadas
  if (Array.isArray(p.v3RawEvidenceItems) && p.v3RawEvidenceItems.length > 0) {
    base.evidences = p.v3RawEvidenceItems.map((item, idx) => ({
      id: item.id || `ev-${idx}-${Date.now()}`,
      activityId: 'A09' as ActivityId,
      createdAt: now,
      testerProfile: item.testerProfile || 'Participante do teste',
      attemptedAction: item.attemptedAction || '',
      whatHappened: item.whatHappened || '',
      observation: item.whereHesitated || item.whereNeededHelp || '',
      quote: item.quoteOrComment,
      suggestion: item.suggestion,
      teamInterpretation: item.otherLearning || '',
      classification: 'solucao',
      isSimulation: false,
    }));
  }

  // 5. Outputs Transitórios (não artefatos perenes)
  if (p.v3BriefingReview) {
    base.transientOutputs['briefingReview'] = p.v3BriefingReview;
  }
  if (p.v3PitchCriticalSynthesis) {
    base.transientOutputs['pitchCriticalSynthesis'] = typeof p.v3PitchCriticalSynthesis === 'string' 
      ? p.v3PitchCriticalSynthesis 
      : JSON.stringify(p.v3PitchCriticalSynthesis);
  }
  if (p.v3RehearsalNotes) {
    base.transientOutputs['rehearsalNotes'] = p.v3RehearsalNotes;
  }

  return base;
}

/**
 * Synchronizes a CanonicalProjectState into legacy TeamProjectData for 100% backward compatibility
 */
export function syncCanonicalToLegacyProjectData(
  canonical: CanonicalProjectState,
  currentLegacyData: TeamProjectData
): TeamProjectData {
  const result: TeamProjectData = {
    ...currentLegacyData,
    projectName: canonical.projectName || currentLegacyData.projectName,
    teamName: canonical.teamName || currentLegacyData.teamName,
    collectiveChallenge: canonical.problemSelected || currentLegacyData.collectiveChallenge,
    solutionProblemSummary: canonical.problemSelected || currentLegacyData.solutionProblemSummary,
    solutionTargetAudience: canonical.targetAudience || currentLegacyData.solutionTargetAudience,
    solutionPurpose: canonical.purpose || currentLegacyData.solutionPurpose,
    
    // 14 Famílias
    v3ProblemDiagnosis: canonical.artifacts.AF01?.content || currentLegacyData.v3ProblemDiagnosis,
    v3Mapa4d: canonical.artifacts.AF02?.content || currentLegacyData.v3Mapa4d,
    v3GoldenCircle: canonical.artifacts.AF03?.content || currentLegacyData.v3GoldenCircle,
    v3BriefingV0: canonical.artifacts.AF04?.v0Content || currentLegacyData.v3BriefingV0,
    v3BriefingV1: canonical.artifacts.AF04?.v1Content || currentLegacyData.v3BriefingV1,
    v3PrdV0: canonical.artifacts.AF05?.content || currentLegacyData.v3PrdV0,
    v3Mvp: canonical.artifacts.AF06?.content || currentLegacyData.v3Mvp,
    v3MapaTevep: canonical.artifacts.AF07?.content || currentLegacyData.v3MapaTevep,
    v3PrototypeV0: canonical.artifacts.AF08?.v0Content || currentLegacyData.v3PrototypeV0,
    v3PrototypeV1: canonical.artifacts.AF08?.v1Content || currentLegacyData.v3PrototypeV1,
    v3TestPlan: canonical.artifacts.AF09?.content || currentLegacyData.v3TestPlan,
    v3EvidenceSummary: canonical.artifacts.AF10?.content || currentLegacyData.v3EvidenceSummary,
    v3Bmc: canonical.artifacts.AF11?.content || currentLegacyData.v3Bmc,
    v3Roadmap: canonical.artifacts.AF12?.content || currentLegacyData.v3Roadmap,
    v3PitchScript: canonical.artifacts.AF13?.content || currentLegacyData.v3PitchScript,
    v3PitchPresentation: canonical.artifacts.AF14?.content || currentLegacyData.v3PitchPresentation,
  };

  return result;
}

/**
 * Universal State Normalizer: Takes any raw/legacy state and normalizes it to V1.4.1.
 * Preserves all existing properties, prevents data loss, initializes new structures safely.
 */
export function migrateStateToV1_4_1(rawState: any): AppState {
  if (!rawState || typeof rawState !== 'object') {
    const defaultCanonical = createDefaultCanonicalProjectState();
    return {
      currentView: 'landing',
      activeWebappTab: 'jornada',
      selectedEncounterId: 1,
      userMode: 'participante',
      completedActivityIds: [],
      encounterNotes: {},
      teams: [],
      timer: {
        isRunning: false,
        remainingSeconds: 1200,
        initialSeconds: 1200,
        activeActivityTitle: 'Atividade Geral',
        soundEnabled: true,
      },
      isProjectionOpen: false,
      activeTheme: 'light',
      version: '2.0',
      artifactVersions: [],
      projectStateV2: {},
      facilitatorObservations: [],
      currentPilotActivityId: 'E1-A01',
      draftArtifacts: {},
      projectStateV1_4_1: defaultCanonical,
    };
  }

  // Preserve existing canonical state if already present, or synthesize from legacy projectData
  const canonicalState: CanonicalProjectState = rawState.projectStateV1_4_1
    ? {
        ...createDefaultCanonicalProjectState(),
        ...rawState.projectStateV1_4_1,
        version: '1.4.1',
        artifacts: {
          ...createDefaultCanonicalProjectState().artifacts,
          ...(rawState.projectStateV1_4_1.artifacts || {}),
        },
        evidences: Array.isArray(rawState.projectStateV1_4_1.evidences)
          ? rawState.projectStateV1_4_1.evidences
          : [],
        transientOutputs: rawState.projectStateV1_4_1.transientOutputs || {},
      }
    : buildCanonicalProjectStateFromLegacy(rawState.projectData, rawState);

  // Synchronize legacy projectData with canonical state
  const updatedProjectData = syncCanonicalToLegacyProjectData(
    canonicalState,
    rawState.projectData || {}
  );

  return {
    ...rawState,
    version: '2.0', // Maintain string compatibility for legacy checks while embedding V1.4.1
    projectData: updatedProjectData,
    completedActivityIds: Array.isArray(rawState.completedActivityIds) ? rawState.completedActivityIds : [],
    activityProgress: rawState.activityProgress || {},
    encounterNotes: rawState.encounterNotes || {},
    facilitatorNotes: rawState.facilitatorNotes || {},
    facilitatorChecklists: rawState.facilitatorChecklists || {},
    teams: Array.isArray(rawState.teams) ? rawState.teams : [],
    artifactVersions: Array.isArray(rawState.artifactVersions) ? rawState.artifactVersions : [],
    projectStateV2: rawState.projectStateV2 || {},
    facilitatorObservations: Array.isArray(rawState.facilitatorObservations) ? rawState.facilitatorObservations : [],
    currentPilotActivityId: rawState.currentPilotActivityId || 'E1-A01',
    draftArtifacts: rawState.draftArtifacts || {},
    projectStateV1_4_1: canonicalState,
  };
}

/**
 * Diagnostic Verification Helper for Data Model & Migrations
 */
export function verifyStateMigrationIntegrity(): {
  freshProjectTest: boolean;
  legacyProjectTest: boolean;
  backupRoundtripTest: boolean;
  versionedArtifactsTest: boolean;
  evidencesTest: boolean;
} {
  // Test 1: Fresh default project
  const fresh = migrateStateToV1_4_1(null);
  const freshOk = !!(
    fresh.projectStateV1_4_1 &&
    fresh.projectStateV1_4_1.version === '1.4.1' &&
    fresh.projectStateV1_4_1.currentActivityId === 'A01' &&
    fresh.projectStateV1_4_1.artifacts.AF01 !== undefined
  );

  // Test 2: Legacy project data migration
  const legacyInput = {
    version: '1.0',
    projectData: {
      teamName: 'Equipe Teste',
      projectName: 'Projeto Verde',
      collectiveChallenge: 'Descarte de plástico no bairro',
      goldenCircleWhy: 'Criar um futuro sem resíduos',
      briefingWhatWeAreTryingToDo: 'Aplicativo de reciclagem',
      briefingScope: 'Briefing V1 revisado',
      prototypeLinkOrDescription: 'Protótipo V0 tela',
      v3PrototypeV1: 'Protótipo V1 tela ajustada',
      v3RawEvidenceItems: [
        {
          id: 'test-1',
          testerProfile: 'Aluno 15 anos',
          attemptedAction: 'Fez login e clicou no mapa',
          whatHappened: 'Encontrou o ponto de coleta',
          quoteOrComment: 'Foi muito fácil',
          suggestion: 'Adicionar pontos de óleo',
        }
      ]
    },
    currentPilotActivityId: 'E2-A01'
  };

  const migrated = migrateStateToV1_4_1(legacyInput);
  const legacyOk = !!(
    migrated.projectStateV1_4_1?.teamName === 'Equipe Teste' &&
    migrated.projectStateV1_4_1?.problemSelected === 'Descarte de plástico no bairro' &&
    migrated.projectStateV1_4_1?.artifacts.AF04?.v0Content === 'Aplicativo de reciclagem' &&
    migrated.projectStateV1_4_1?.artifacts.AF04?.v1Content === 'Briefing V1 revisado' &&
    migrated.projectStateV1_4_1?.artifacts.AF04?.activeVersion === 'V1' &&
    migrated.projectStateV1_4_1?.artifacts.AF08?.v0Content === 'Protótipo V0 tela' &&
    migrated.projectStateV1_4_1?.artifacts.AF08?.v1Content === 'Protótipo V1 tela ajustada' &&
    migrated.projectStateV1_4_1?.artifacts.AF08?.activeVersion === 'V1' &&
    migrated.projectStateV1_4_1?.evidences.length === 1 &&
    migrated.projectStateV1_4_1?.hasExternalEvidence === true
  );

  // Test 3: Versioned artifacts test (Briefing V0/V1 and Protótipo V0/V1)
  const versionedOk = (
    migrated.projectStateV1_4_1?.artifacts.AF04?.v0Content !== undefined &&
    migrated.projectStateV1_4_1?.artifacts.AF04?.v1Content !== undefined &&
    migrated.projectStateV1_4_1?.artifacts.AF08?.v0Content !== undefined &&
    migrated.projectStateV1_4_1?.artifacts.AF08?.v1Content !== undefined
  );

  // Test 4: Evidence integrity
  const evidencesOk = (
    migrated.projectStateV1_4_1?.evidences[0]?.testerProfile === 'Aluno 15 anos' &&
    migrated.projectStateV1_4_1?.evidences[0]?.attemptedAction === 'Fez login e clicou no mapa'
  );

  // Test 5: Backup roundtrip JSON test
  const jsonExport = JSON.stringify(migrated);
  const reimported = migrateStateToV1_4_1(JSON.parse(jsonExport));
  const backupOk = !!(
    reimported.projectStateV1_4_1?.teamName === 'Equipe Teste' &&
    reimported.projectStateV1_4_1?.artifacts.AF04?.v1Content === 'Briefing V1 revisado' &&
    reimported.projectStateV1_4_1?.artifacts.AF08?.v1Content === 'Protótipo V1 tela ajustada'
  );

  return {
    freshProjectTest: freshOk,
    legacyProjectTest: legacyOk,
    backupRoundtripTest: backupOk,
    versionedArtifactsTest: versionedOk,
    evidencesTest: evidencesOk
  };
}
