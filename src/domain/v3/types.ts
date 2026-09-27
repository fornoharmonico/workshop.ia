/**
 * Fornologia V3 - Canonical Domain Types
 * Strict implementation of Master Dossier V3 specifications.
 */

export type ActivityId =
  | 'A01'
  | 'A02'
  | 'A03'
  | 'A04'
  | 'A05'
  | 'A06'
  | 'A07'
  | 'A08'
  | 'A09'
  | 'A10'
  | 'A11';

export type PromptId =
  | 'P00'
  | 'P01'
  | 'P02'
  | 'P03'
  | 'P04'
  | 'P05'
  | 'P06'
  | 'P07'
  | 'P08'
  | 'P09'
  | 'P10'
  | 'P11';

export type ArtifactId =
  | 'AF01'
  | 'AF02'
  | 'AF03'
  | 'AF04'
  | 'AF05'
  | 'AF06'
  | 'AF07'
  | 'AF08'
  | 'AF09'
  | 'AF10'
  | 'AF11';

export type MovementId =
  | 'INVESTIGAR_E_DIRECIONAR'
  | 'DEFINIR_E_MATERIALIZAR'
  | 'TESTAR_APRENDER_E_PLANEJAR'
  | 'COMUNICAR_E_CELEBRAR';

export interface MovementDefinition {
  id: MovementId;
  title: string;
  subtitle: string;
  order: number;
  meetingNumber: number;
  activityIds: ActivityId[];
}

export type ArtifactKind = 'document' | 'prototype' | 'presentation';

export interface ArtifactDefinition {
  id: ArtifactId;
  activityId: ActivityId;
  title: string;
  kind: ArtifactKind;
  functionDescription: string;
  requiredSections: string[];
  markdownTemplate: string;
}

export interface ActivityDefinition {
  id: ActivityId;
  order: number;
  title: string;
  movementId: MovementId;
  meetingRecommended: number;
  estimatedMinutes: number;
  promptId: PromptId;
  artifactId: ArtifactId;
  objective: string;
  requiredContext: ArtifactId[];
  optionalContext: ArtifactId[];
  humanDecisions: string[];
  stopCriteria: string[];
  completionCriteria: string[];
}

export interface PromptDefinition {
  id: PromptId;
  activityId?: ActivityId;
  outputArtifactId?: ArtifactId;
  title: string;
  objective: string;
  instructions: string;
  operationalBody: string;
  handoffFinal: string;
}

export type ArtifactStatus = 'VIGENTE' | 'REVALIDACAO_RECOMENDADA';

export type HumanObservationStatus = 'PENDING' | 'METABOLIZED';

export interface HumanObservationRecord {
  id: string;
  text: string;
  status: HumanObservationStatus;
  createdAt: string;
}

export interface ConsolidatedArtifactRecord {
  artifactId: ArtifactId;
  body: string;
  embeddedSow: string; // SOW emitted alongside this artifact; non-operational after being superseded
  humanObservation?: HumanObservationRecord;
  status: ArtifactStatus;
  consolidatedAt: string;
}

export interface CanonicalProjectStateV3 {
  schemaVersion: '3.0';
  project: {
    name?: string;
    teamName?: string;
    participantLabel?: string;
    createdAt: string;
    updatedAt: string;
  };
  currentSow: string; // The single operational source of truth for the SOW
  artifacts: Partial<Record<ArtifactId, ConsolidatedArtifactRecord>>;
}

export interface DraftRecord {
  pastedResult: string;
  userObservation: string;
  updatedAt: string;
}

export type DraftWorkspace = Partial<Record<ActivityId, DraftRecord>>;

export type ActivityExecutionMode = 'CREATE' | 'REVISE' | 'REVALIDATE';

export type ActivityStatus =
  | 'CONCLUIDA'
  | 'REVALIDACAO_RECOMENDADA'
  | 'EM_ANDAMENTO'
  | 'NAO_INICIADA'
  | 'BLOQUEADA';

export type RevalidationResultStatus = 'SEM_ALTERACAO' | 'COM_ALTERACAO';

export interface RevalidationParsedBlock {
  status: RevalidationResultStatus;
  reason: string;
}

export interface ParsedEnvelopeResult {
  artifactId: ArtifactId;
  artifactBody: string;
  sowBody: string;
  revalidation?: RevalidationParsedBlock;
}

export interface BackupV3 {
  schemaVersion: '3.0';
  exportedAt: string;
  project: CanonicalProjectStateV3['project'];
  currentSow: CanonicalProjectStateV3['currentSow'];
  artifacts: CanonicalProjectStateV3['artifacts'];
}

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: 'Grátis' | 'Freemium' | 'Paga' | 'A verificar';
  openness:
    | 'Open source'
    | 'Open weights'
    | 'Source-available'
    | 'Híbrida'
    | 'Proprietária'
    | 'A verificar';
  url: string;
  source: string;
  isCustom?: boolean;
}

export interface ProblemItem {
  id: string;
  title: string;
  question: string;
  description: string;
  category: string;
  scale: string;
  isCustom?: boolean;
}
