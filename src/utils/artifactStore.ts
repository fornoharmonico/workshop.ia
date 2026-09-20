/**
 * ARTIFACT STORE & VERSION AUTHORITY — V2.2
 * Workshop Inteligência Artificial Aplicada: do Problema ao Protótipo
 *
 * Contrato arquitetural W1:
 * - Single Source of Truth para o armazenamento dos 12 Artefatos Canônicos (AF01 a AF12).
 * - Gestão explícita de Autoridade de Versões (ex: AF06 Briefing V1 substitui AF05 Briefing V0 como autoritativo).
 * - Eliminação total de indexação posicional de arrays.
 * - Desacoplamento de estrutura física de encontros.
 */

import {
  ArtifactId,
  ArtifactStateV2,
  ArtifactOrigin,
  ArtifactAuthority,
  ProjectStateV2,
  ProjectContextV2,
  ActivityId
} from '../types/canonicalV2';
import { CANONICAL_ARTIFACTS_V2, CANONICAL_ARTIFACT_LIST_V2, getArtifactDefinitionById } from '../data/canonicalArtifacts';

export type ArtifactStoreV2 = Record<ArtifactId, ArtifactStateV2>;

/**
 * Cria o repositório de artefatos com todas as 12 chaves canônicas inicializadas.
 * Proíbe chaves nulas ou indexação posicional.
 */
export function createDefaultArtifactStoreV2(): ArtifactStoreV2 {
  const store = {} as ArtifactStoreV2;

  CANONICAL_ARTIFACT_LIST_V2.forEach((def) => {
    store[def.id] = {
      id: def.id,
      content: '',
      status: 'empty',
      origin: def.origin,
      updatedAt: undefined,
      notes: undefined
    };
  });

  return store;
}

/**
 * Obtém o estado de um artefato pelo seu ID canônico estrito.
 */
export function getArtifactState(store: ArtifactStoreV2 | undefined, artifactId: ArtifactId | string): ArtifactStateV2 {
  const safeId = (artifactId as ArtifactId) || 'AF01';
  if (store && store[safeId]) {
    return store[safeId];
  }
  const def = getArtifactDefinitionById(safeId);
  return {
    id: safeId,
    content: '',
    status: 'empty',
    origin: def.origin
  };
}

/**
 * Verifica se um artefato possui conteúdo substancial preenchido (> 10 caracteres).
 */
export function hasArtifactContent(store: ArtifactStoreV2 | undefined, artifactId: ArtifactId | string): boolean {
  const art = getArtifactState(store, artifactId);
  return Boolean(art.content && art.content.trim().length > 10);
}

/**
 * Atualiza o conteúdo e metadados de um artefato de forma imutável.
 */
export function updateArtifactState(
  store: ArtifactStoreV2,
  artifactId: ArtifactId,
  content: string,
  status: 'draft' | 'validated' = 'draft',
  notes?: string
): ArtifactStoreV2 {
  const def = getArtifactDefinitionById(artifactId);
  const now = new Date().toISOString();

  return {
    ...store,
    [artifactId]: {
      id: artifactId,
      content,
      status,
      origin: def.origin,
      updatedAt: now,
      notes: notes !== undefined ? notes : store[artifactId]?.notes
    }
  };
}

/**
 * RESOLUÇÃO DE AUTORIDADE DE VERSÕES:
 * - AF05 (Briefing V0) é versão de trabalho inicial (draft).
 * - AF06 (Briefing V1) é a versão autoritativa auditada e pactuada (replacesArtifactId: AF05).
 * - Quando AF06 possui conteúdo validado ou preenchido, ele é a fonte autoritativa de Briefing.
 */
export interface EffectiveBriefing {
  content: string;
  authoritativeArtifactId: 'AF06' | 'AF05';
  versionLabel: 'V1 (Revisado & Autoritativo)' | 'V0 (Minuta Inicial)' | 'Pendente';
  isAuthoritative: boolean;
  hasDraftV0: boolean;
  hasAuditedV1: boolean;
  draftContent?: string;
  auditedContent?: string;
}

export function resolveEffectiveBriefing(store: ArtifactStoreV2 | undefined): EffectiveBriefing {
  const af05 = getArtifactState(store, 'AF05');
  const af06 = getArtifactState(store, 'AF06');

  const hasV0 = Boolean(af05.content && af05.content.trim().length > 10);
  const hasV1 = Boolean(af06.content && af06.content.trim().length > 10);

  if (hasV1) {
    return {
      content: af06.content,
      authoritativeArtifactId: 'AF06',
      versionLabel: 'V1 (Revisado & Autoritativo)',
      isAuthoritative: true,
      hasDraftV0: hasV0,
      hasAuditedV1: true,
      draftContent: af05.content,
      auditedContent: af06.content
    };
  }

  if (hasV0) {
    return {
      content: af05.content,
      authoritativeArtifactId: 'AF05',
      versionLabel: 'V0 (Minuta Inicial)',
      isAuthoritative: false,
      hasDraftV0: true,
      hasAuditedV1: false,
      draftContent: af05.content,
      auditedContent: undefined
    };
  }

  return {
    content: '',
    authoritativeArtifactId: 'AF06',
    versionLabel: 'Pendente',
    isAuthoritative: false,
    hasDraftV0: false,
    hasAuditedV1: false
  };
}

/**
 * Retorna o artefato autoritativo com base nas regras de versionamento canônico.
 */
export function getAuthoritativeArtifact(
  store: ArtifactStoreV2 | undefined,
  targetId: ArtifactId
): { artifactId: ArtifactId; content: string; authority: ArtifactAuthority; isAuthoritative: boolean } {
  const def = getArtifactDefinitionById(targetId);

  // Se o alvo for o briefing V0, checa se já existe o V1 autoritativo
  if (targetId === 'AF05') {
    const briefing = resolveEffectiveBriefing(store);
    return {
      artifactId: briefing.authoritativeArtifactId,
      content: briefing.content,
      authority: briefing.isAuthoritative ? 'authoritative' : 'draft',
      isAuthoritative: briefing.isAuthoritative
    };
  }

  const state = getArtifactState(store, targetId);
  return {
    artifactId: targetId,
    content: state.content,
    authority: def.authority,
    isAuthoritative: def.authority === 'authoritative' && Boolean(state.content && state.content.trim().length > 10)
  };
}

/**
 * Resolve todos os artefatos autoritativos de uma só vez para visualização e exportação.
 * Suporta passagem direta de ArtifactStoreV2 ou de (legacyData, projectState/artifacts).
 */
export function resolveAllAuthoritativeArtifacts(
  legacyOrStore?: any,
  rawArtifactsOrState?: any
): Record<ArtifactId, { content: string; status: 'empty' | 'draft' | 'validated'; authority: ArtifactAuthority }> {
  let store: ArtifactStoreV2;
  if (legacyOrStore && 'AF01' in legacyOrStore && 'AF12' in legacyOrStore) {
    store = legacyOrStore as ArtifactStoreV2;
  } else {
    store = populateArtifactStoreFromLegacy(legacyOrStore, rawArtifactsOrState?.artifacts || rawArtifactsOrState);
  }

  const result = {} as Record<ArtifactId, { content: string; status: 'empty' | 'draft' | 'validated'; authority: ArtifactAuthority }>;
  CANONICAL_ARTIFACT_LIST_V2.forEach((def) => {
    const auth = getAuthoritativeArtifact(store, def.id);
    const state = getArtifactState(store, auth.artifactId);
    result[def.id] = {
      content: auth.content,
      status: state.status,
      authority: auth.authority
    };
  });
  return result;
}

/**
 * Sincroniza dados legados de formulários com o store canônico V2.2 bidirecionalmente.
 */
export function populateArtifactStoreFromLegacy(
  legacyData: any,
  rawArtifacts?: any
): ArtifactStoreV2 {
  const store = createDefaultArtifactStoreV2();
  const d = legacyData || {};
  const ra = rawArtifacts || {};

  // AF01: Mapear e escolher o problema
  store.AF01.content = ra.AF01?.content || d.v3ChosenProblem || d.collectiveChallenge || d.solutionProblemSummary || '';
  store.AF01.status = ra.AF01?.status || (store.AF01.content ? 'validated' : 'empty');

  // AF02: Diagnosticar o problema
  store.AF02.content = ra.AF02?.content || d.v3ProblemDiagnosis || d.phdProblems || '';
  store.AF02.status = ra.AF02?.status || (store.AF02.content ? 'validated' : 'empty');

  // AF03: Mapear recursos
  store.AF03.content = ra.AF03?.content || d.v3MapaRecursos || d.v3Mapa4d || '';
  store.AF03.status = ra.AF03?.status || (store.AF03.content ? 'validated' : 'empty');

  // AF04: Definir propósito e direção
  store.AF04.content = ra.AF04?.content || d.v3Proposito || (d.goldenCircleWhy ? `POR QUÊ: ${d.goldenCircleWhy}\nCOMO: ${d.goldenCircleHow}\nO QUÊ: ${d.goldenCircleWhat}` : '') || d.v3GoldenCircle || '';
  store.AF04.status = ra.AF04?.status || (store.AF04.content ? 'validated' : 'empty');

  // AF05: Briefing V0 (Minuta)
  store.AF05.content = ra.AF05?.content || ra.AF04?.v0Content || d.v3BriefingV0 || d.briefingWhatWeAreTryingToDo || '';
  store.AF05.status = ra.AF05?.status || (store.AF05.content ? 'validated' : 'empty');

  // AF06: Briefing V1 (Autoritativo)
  store.AF06.content = ra.AF06?.content || ra.AF04?.v1Content || d.v3BriefingV1 || '';
  store.AF06.status = ra.AF06?.status || (store.AF06.content ? 'validated' : 'empty');

  // AF07: Especificação de Funcionamento / PRD
  store.AF07.content = ra.AF07?.content || ra.AF05?.content || d.v3PrdV0 || d.prdHowItShouldWork || d.prdRequirements || '';
  store.AF07.status = ra.AF07?.status || (store.AF07.content ? 'validated' : 'empty');

  // AF08: Recorte do MVP + Protótipo V0
  store.AF08.content = ra.AF08?.content || ra.AF06?.content || ra.AF08?.v0Content || d.v3Mvp || d.prototypeLinkOrDescription || d.v3PrototypeV0 || '';
  store.AF08.status = ra.AF08?.status || (store.AF08.content ? 'validated' : 'empty');

  // AF09: Testes, Evidências e Evolução V0->V1
  store.AF09.content = ra.AF09?.content || ra.AF09?.content || ra.AF10?.content || d.v3TestPlan || d.v3EvidenceSummary || d.v3RawFeedbacks || d.v3FeedbackSynthesis || '';
  store.AF09.status = ra.AF09?.status || (store.AF09.content ? 'validated' : 'empty');

  // AF10: Modelo de Sustentabilidade
  store.AF10.content = ra.AF10?.content || ra.AF11?.content || d.v3Sustentabilidade || d.v3Bmc || d.bmcValueProposition || '';
  store.AF10.status = ra.AF10?.status || (store.AF10.content ? 'validated' : 'empty');

  // AF11: Roadmap e Linha do Tempo em 7 Etapas
  store.AF11.content = ra.AF11?.content || ra.AF12?.content || d.v3Roadmap || (d.roadmapNow ? `AGORA: ${d.roadmapNow}\nDEPOIS: ${d.roadmapNext}\nFUTURO: ${d.roadmapFuture}` : '') || '';
  store.AF11.status = ra.AF11?.status || (store.AF11.content ? 'validated' : 'empty');

  // AF12: Pitch V1 + Kit de Comunicação Final
  store.AF12.content = ra.AF12?.content || ra.AF13?.content || ra.AF14?.content || d.v3PitchScript || d.pitchScriptText || d.v3PitchPresentation || '';
  store.AF12.status = ra.AF12?.status || (store.AF12.content ? 'validated' : 'empty');

  return store;
}

/**
 * Constrói a instância de ProjectStateV2 a partir do store de artefatos.
 */
export function buildProjectStateV2FromStore(
  store: ArtifactStoreV2,
  projectId: string,
  projectName: string,
  currentActivityId: ActivityId,
  context: ProjectContextV2,
  activityStatus?: Partial<Record<ActivityId, 'not_started' | 'in_progress' | 'completed'>>
): ProjectStateV2 {
  return {
    schemaVersion: 2,
    projectId,
    projectName,
    currentActivityId,
    projectContext: context,
    artifacts: store,
    activityStatus: activityStatus || {}
  };
}
