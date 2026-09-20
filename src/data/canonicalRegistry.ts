/**
 * REGISTRO CANÔNICO DA FORNOLOGIA — V2.2
 * Workshop Inteligência Artificial Aplicada: do Problema ao Protótipo
 *
 * SINGLE SOURCE OF TRUTH & REGISTRIES
 *
 * Exporta e unifica:
 * - 12 Atividades Canônicas (A01 a A12)
 * - 12 Prompts Canônicos (P01 a P12)
 * - 12 Artefatos Canônicos (AF01 a AF12)
 * - 4 Macro Movimentos Pedagógicos
 * - Motor de Dependências e Soft Gates (Zero Hard Gates)
 * - Repositório de Artefatos e Autoridade de Versões
 * - Construtor de Context Pack
 */

import {
  ActivityId,
  PromptId,
  ArtifactId,
  MacroMovement,
  CanonicalActivityV2,
  CanonicalArtifactDefinitionV2,
  CanonicalPromptDefinitionV2
} from '../types/canonicalV2';

import {
  CANONICAL_ACTIVITIES_V2,
  CANONICAL_ACTIVITY_LIST_V2,
  getCanonicalActivityById
} from './canonicalJourney';

import {
  CANONICAL_ARTIFACTS_V2,
  CANONICAL_ARTIFACT_LIST_V2,
  getArtifactDefinitionById
} from './canonicalArtifacts';

import {
  CANONICAL_PROMPTS_V2,
  CANONICAL_PROMPT_LIST_V2,
  getCanonicalPromptById
} from './canonicalPrompts';

// ========================================================
// 1. MACRO MOVIMENTOS PEDAGÓGICOS (V2.2)
// ========================================================

export interface MacroMovementInfo {
  id: MacroMovement;
  order: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  recommendedEncounter: 1 | 2 | 3 | 4;
  activityIds: ActivityId[];
  artifactIds: ArtifactId[];
  description: string;
  badgeColor: string;
}

export const MACRO_MOVEMENTS: Record<MacroMovement, MacroMovementInfo> = {
  investigar_direcionar: {
    id: 'investigar_direcionar',
    order: 1,
    title: 'Investigar e Direcionar',
    subtitle: 'Problema, Diagnóstico, Recursos e Propósito',
    recommendedEncounter: 1,
    activityIds: ['A01', 'A02', 'A03', 'A04'],
    artifactIds: ['AF01', 'AF02', 'AF03', 'AF04'],
    description: 'Mapear e escolher conscientemente um problema real, investigá-lo com profundidade, mapear recursos do ecossistema e firmar o propósito e a direção estratégica.',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
  },
  definir_materializar: {
    id: 'definir_materializar',
    order: 2,
    title: 'Definir e Materializar',
    subtitle: 'Briefing, Especificação, MVP e Protótipo V0',
    recommendedEncounter: 2,
    activityIds: ['A05', 'A06', 'A07', 'A08'],
    artifactIds: ['AF05', 'AF06', 'AF07', 'AF08'],
    description: 'Transformar a investigação em Briefing V0, auditá-lo para a versão autoritativa Briefing V1, redigir a especificação funcional (PRD) e construir o Protótipo V0 com plano prático de realização.',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800'
  },
  validar_evoluir: {
    id: 'validar_evoluir',
    order: 3,
    title: 'Validar e Evoluir',
    subtitle: 'Testes de Campo, Sustentabilidade e Roadmap',
    recommendedEncounter: 3,
    activityIds: ['A09', 'A10', 'A11'],
    artifactIds: ['AF09', 'AF10', 'AF11'],
    description: 'Testar a solução no mundo real com usuários autênticos, sintetizar aprendizados, modelar a sustentabilidade autoral e planejar a evolução em 4 horizontes e linha do tempo de 7 etapas.',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300 dark:border-blue-800'
  },
  comunicar_celebrar: {
    id: 'comunicar_celebrar',
    order: 4,
    title: 'Comunicar e Celebrar',
    subtitle: 'Kit de Comunicação, Pitch V1 e Celebração',
    recommendedEncounter: 4,
    activityIds: ['A12'],
    artifactIds: ['AF12'],
    description: 'Consolidar o kit de comunicação final com pitch oral de 3 minutos, roteiro visual de apoio em 6 telas, simulação de banca examinadora e celebração coletiva da jornada.',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300 dark:border-purple-800'
  }
};

// ========================================================
// 2. HELPERS DE LOOKUP NÃO-POSICIONAIS ESTRITOS
// ========================================================

export function getCanonicalActivity(id: ActivityId | string): CanonicalActivityV2 {
  return getCanonicalActivityById(id);
}

export function getCanonicalPrompt(id: PromptId | string): CanonicalPromptDefinitionV2 {
  return getCanonicalPromptById(id);
}

export function getCanonicalArtifact(id: ArtifactId | string): CanonicalArtifactDefinitionV2 {
  return getArtifactDefinitionById(id);
}

export function isCanonicalActivityId(id: string): id is ActivityId {
  return id in CANONICAL_ACTIVITIES_V2;
}

export function isCanonicalPromptId(id: string): id is PromptId {
  return id in CANONICAL_PROMPTS_V2;
}

export function isCanonicalArtifactId(id: string): id is ArtifactId {
  return id in CANONICAL_ARTIFACTS_V2;
}

// ========================================================
// 3. COMPATIBILIDADE RETROATIVA (LEGACY MAPPINGS)
// ========================================================

export const CANONICAL_ARTIFACT_FAMILIES: Record<string, any> = {
  AF01: { id: 'AF01', name: 'Diagnóstico do Problema', shortName: 'Diagnóstico', exportableToMasterDoc: true },
  AF02: { id: 'AF02', name: 'Mapeamento de Recursos', shortName: 'Recursos', exportableToMasterDoc: true },
  AF03: { id: 'AF03', name: 'Propósito e Direção', shortName: 'Propósito', exportableToMasterDoc: true },
  AF04: { id: 'AF04', name: 'Briefing do Projeto', shortName: 'Briefing', hasVersions: true, exportableToMasterDoc: true },
  AF05: { id: 'AF05', name: 'Especificação de Funcionamento (PRD)', shortName: 'PRD', exportableToMasterDoc: true },
  AF06: { id: 'AF06', name: 'Recorte do MVP', shortName: 'MVP', exportableToMasterDoc: true },
  AF07: { id: 'AF07', name: 'Planejamento de Realização', shortName: 'Plano', exportableToMasterDoc: true },
  AF08: { id: 'AF08', name: 'Protótipo V0', shortName: 'Protótipo', hasVersions: true, exportableToMasterDoc: true },
  AF09: { id: 'AF09', name: 'Testes e Evidências', shortName: 'Testes', exportableToMasterDoc: true },
  AF10: { id: 'AF10', name: 'Síntese de Evidências', shortName: 'Evidências', exportableToMasterDoc: true },
  AF11: { id: 'AF11', name: 'Modelo de Sustentabilidade', shortName: 'Sustentabilidade', exportableToMasterDoc: true },
  AF12: { id: 'AF12', name: 'Roadmap de Evolução', shortName: 'Roadmap', exportableToMasterDoc: true },
  AF13: { id: 'AF13', name: 'Pitch V1', shortName: 'Pitch', exportableToMasterDoc: true },
  AF14: { id: 'AF14', name: 'Roteiro Visual', shortName: 'Visual', exportableToMasterDoc: true },
};

export const CONDUCTION_MECHANISMS = {
  HUMANA: { type: 'HUMANA', label: 'Humana' },
  IA_HUMANA: { type: 'IA_HUMANA', label: 'IA + Humana' },
  SISTEMA: { type: 'SISTEMA', label: 'Sistema' },
  MUNDO_REAL: { type: 'MUNDO_REAL', label: 'Mundo Real' }
};

// ========================================================
// 4. RE-EXPORTS UNIFICADOS (SINGLE SOURCE OF TRUTH)
// ========================================================

export {
  CANONICAL_ACTIVITIES_V2,
  CANONICAL_ACTIVITY_LIST_V2,
  getCanonicalActivityById
} from './canonicalJourney';

export {
  CANONICAL_ARTIFACTS_V2,
  CANONICAL_ARTIFACT_LIST_V2,
  getArtifactDefinitionById
} from './canonicalArtifacts';

export {
  CANONICAL_PROMPTS_V2,
  CANONICAL_PROMPT_LIST_V2,
  getCanonicalPromptById
} from './canonicalPrompts';

export {
  createDefaultArtifactStoreV2,
  getArtifactState,
  hasArtifactContent,
  updateArtifactState,
  resolveEffectiveBriefing,
  getAuthoritativeArtifact,
  populateArtifactStoreFromLegacy,
  buildProjectStateV2FromStore
} from '../utils/artifactStore';

export {
  evaluateActivityDependencies,
  getDownstreamActivitiesForArtifact,
  validateCanonicalDependencyGraph
} from '../utils/dependencyGraph';

export {
  buildContextPackV2
} from '../utils/contextPackBuilderV2';
