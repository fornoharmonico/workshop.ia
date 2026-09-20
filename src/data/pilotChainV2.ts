/**
 * PILOT CHAIN V2 — ADAPTADOR OFICIAL REATIVO
 * 
 * Este arquivo deriva 100% da Fonte Única de Verdade (canonicalJourney / canonicalPrompts / canonicalArtifacts).
 * NÃO HÁ QUALQUER ACESSO POR ÍNDICE DE ARRAY.
 */

import { CANONICAL_ACTIVITY_LIST_V2, getCanonicalActivityById } from './canonicalJourney';
import { getCanonicalPromptById } from './canonicalPrompts';
import { getArtifactDefinitionById } from './canonicalArtifacts';
import { CanonicalActivityV2, ActivityId } from '../types/canonicalV2';

export interface PilotActivityV2 extends CanonicalActivityV2 {
  promptDetails?: {
    title: string;
    whatAiHelpsDo: string;
    templatePrompt: string;
    validationQuestion: string;
  };
  artifactDetails?: {
    title: string;
    kind: string;
    origin: string;
    authority: string;
  };
}

export const PILOT_CHAIN_V2: PilotActivityV2[] = CANONICAL_ACTIVITY_LIST_V2.map(act => {
  const prompt = act.promptId ? getCanonicalPromptById(act.promptId) : undefined;
  const artifact = act.outputArtifactId ? getArtifactDefinitionById(act.outputArtifactId) : undefined;

  return {
    ...act,
    promptDetails: prompt ? {
      title: prompt.title,
      whatAiHelpsDo: prompt.shortDescription,
      templatePrompt: prompt.templatePrompt,
      validationQuestion: prompt.validationQuestion
    } : undefined,
    artifactDetails: artifact ? {
      title: artifact.title,
      kind: artifact.kind,
      origin: artifact.origin,
      authority: artifact.authority
    } : undefined
  };
});

export function getPilotActivityV2ById(id: ActivityId): PilotActivityV2 {
  const found = PILOT_CHAIN_V2.find(a => a.id === id);
  if (!found) {
    throw new Error(`[PilotChain V2] Atividade não encontrada para ID: ${id}`);
  }
  return found;
}
