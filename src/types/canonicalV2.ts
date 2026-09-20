/**
 * CANONICAL TYPES V2.2 — WORKSHOP INTELIGÊNCIA ARTIFICIAL APLICADA
 *
 * Contrato arquitetural V2.2:
 * 12 MOVIMENTOS COGNITIVOS CANÔNICOS (A01-A12)
 * 12 PROMPTS OFICIAIS (P01-P12)
 * 12 ENTREGAS / ARTEFATOS CANÔNICOS (AF01-AF12)
 *
 * Os 4 macroagrupamentos atuam estritamente como divisões pedagógicas/editoriais dos 4 encontros.
 * Proibição absoluta de indexação posicional de arrays.
 */

export type ActivityId =
  | 'A01' | 'A02' | 'A03' | 'A04' | 'A05' | 'A06'
  | 'A07' | 'A08' | 'A09' | 'A10' | 'A11' | 'A12';

export type PromptId =
  | 'P01' | 'P02' | 'P03' | 'P04' | 'P05' | 'P06'
  | 'P07' | 'P08' | 'P09' | 'P10' | 'P11' | 'P12';

export type ArtifactId =
  | 'AF01' | 'AF02' | 'AF03' | 'AF04' | 'AF05' | 'AF06'
  | 'AF07' | 'AF08' | 'AF09' | 'AF10' | 'AF11' | 'AF12';

export type DependencyLevel = 'required_input' | 'recommended_context';

export type ArtifactKind = 'document' | 'prototype' | 'evidence' | 'presentation';

export type ArtifactOrigin = 'ai_supported' | 'human' | 'world_real';

export type ArtifactAuthority = 'draft' | 'authoritative' | 'raw_evidence';

export type MacroMovement =
  | 'investigar_direcionar'
  | 'definir_materializar'
  | 'validar_evoluir'
  | 'comunicar_celebrar';

export interface ActivityDependency {
  artifactId: ArtifactId;
  level: DependencyLevel;
  description?: string;
}

export interface CanonicalActivityV2 {
  id: ActivityId;
  order: number;
  title: string;
  shortTitle: string;
  macroMovement: MacroMovement;
  recommendedEncounter: 1 | 2 | 3 | 4; // Recomendação pedagógica flexível, sem vínculo ontológico
  estimatedMinutes: number;
  objective: string;
  whyWeDoThis: string;
  instructions: string[];
  dependencies: ActivityDependency[];
  manualInputs?: string[];
  promptId?: PromptId;
  outputArtifactId?: ArtifactId;
  completionCriteria: string[];
  nextActivityId?: ActivityId;
  isHumanOnly?: boolean; // A09, A16, A17, A18
}

export interface CanonicalArtifactDefinitionV2 {
  id: ArtifactId;
  title: string;
  shortName: string;
  kind: ArtifactKind;
  origin: ArtifactOrigin;
  authority: ArtifactAuthority;
  producedByActivityId: ActivityId;
  macroMovement: MacroMovement;
  description: string;
  replacesArtifactId?: ArtifactId; // Ex: AF05 substitui AF04 como autoritativo; AF14 substitui AF13
}

export interface CanonicalPromptDefinitionV2 {
  id: PromptId;
  order: number;
  title: string;
  shortDescription: string;
  activityId: ActivityId;
  outputArtifactId: ArtifactId;
  macroMovement: MacroMovement;
  templatePrompt: string;
  variableKeys: string[];
  validationQuestion: string;
}

export interface ArtifactStateV2 {
  id: ArtifactId;
  content: string;
  status: 'empty' | 'draft' | 'validated';
  updatedAt?: string;
  origin: ArtifactOrigin;
  notes?: string;
}

export interface ProjectContextV2 {
  teamName: string;
  problemSummary: string;
  targetAudience: string;
  territory: string;
  selectedCause: string;
  additionalNotes?: string;
}

export interface ProjectStateV2 {
  schemaVersion: 2;
  projectId: string;
  projectName: string;
  currentActivityId: ActivityId;
  projectContext: ProjectContextV2;
  artifacts: Partial<Record<ArtifactId, ArtifactStateV2>>;
  activityStatus: Partial<Record<ActivityId, 'not_started' | 'in_progress' | 'completed'>>;
  historyNotes?: Array<{ timestamp: string; note: string }>;
}
