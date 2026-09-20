/**
 * BIBLIOTECA OFICIAL DE PROMPTS — FORNOLOGIA V2.2 CANÔNICA
 * 
 * Re-exporta a fonte canônica dos 12 Prompts Oficiais (P01 a P12),
 * garantindo a correspondência biunívoca A↔P↔AF e eliminando qualquer
 * prompt legado concorrente.
 */

import { CANONICAL_PROMPTS_V2, CANONICAL_PROMPT_LIST_V2, getCanonicalPromptById } from './canonicalPrompts';
import { CanonicalPromptDefinitionV2 } from '../types/canonicalV2';

export interface OfficialPromptV3 {
  id: string;
  number: number;
  numberFormatted: string;
  title: string;
  encounterId: 1 | 2 | 3 | 4;
  encounterTitle: string;
  movement: string;
  category: string;
  recommendedTools: string;
  inputPrincipal: string;
  outputArtifact: string;
  promptText: string;
  globalVarsUsed: string[];
  artifactsUsed: string[];
  shortDescription: string;
  requiredInputs?: string[];
  optionalInputs?: string[];
  outputsList?: string[];
  handoffInfo?: {
    produced: string;
    nextStep: string;
  };
}

const ENCOUNTER_TITLES: Record<number, string> = {
  1: 'Encontro 1 — INVESTIGAR E DIRECIONAR',
  2: 'Encontro 2 — DEFINIR E MATERIALIZAR',
  3: 'Encontro 3 — VALIDAR E EVOLUIR',
  4: 'Encontro 4 — COMUNICAR E CELEBRAR',
};

const ENCOUNTER_MOVEMENTS: Record<number, string> = {
  1: 'INVESTIGAR E DIRECIONAR',
  2: 'DEFINIR E MATERIALIZAR',
  3: 'VALIDAR E EVOLUIR',
  4: 'COMUNICAR E CELEBRAR',
};

function getEncounterForPromptOrder(order: number): 1 | 2 | 3 | 4 {
  if (order <= 4) return 1;
  if (order <= 8) return 2;
  if (order <= 11) return 3;
  return 4;
}

export function buildOfficialPromptFromCanonical(p: CanonicalPromptDefinitionV2): OfficialPromptV3 {
  const numStr = p.order.toString().padStart(2, '0');
  const encId = getEncounterForPromptOrder(p.order);
  return {
    id: `prompt-${numStr}`,
    number: p.order,
    numberFormatted: numStr,
    title: p.title,
    encounterId: encId,
    encounterTitle: ENCOUNTER_TITLES[encId] || `Encontro ${encId}`,
    movement: ENCOUNTER_MOVEMENTS[encId] || '',
    category: p.macroMovement,
    recommendedTools: 'Google AI Studio / Gemini',
    inputPrincipal: p.variableKeys.join(', '),
    outputArtifact: p.outputArtifactId,
    promptText: p.templatePrompt,
    globalVarsUsed: p.variableKeys,
    artifactsUsed: [p.outputArtifactId],
    shortDescription: p.shortDescription,
    requiredInputs: p.variableKeys,
    optionalInputs: [],
    outputsList: [p.outputArtifactId],
    handoffInfo: {
      produced: p.outputArtifactId,
      nextStep: p.validationQuestion,
    },
  };
}

export const OFFICIAL_PROMPTS_BY_CANONICAL_ID: Record<string, OfficialPromptV3> = {
  P01: buildOfficialPromptFromCanonical(CANONICAL_PROMPTS_V2.P01),
  P02: buildOfficialPromptFromCanonical(CANONICAL_PROMPTS_V2.P02),
  P03: buildOfficialPromptFromCanonical(CANONICAL_PROMPTS_V2.P03),
  P04: buildOfficialPromptFromCanonical(CANONICAL_PROMPTS_V2.P04),
  P05: buildOfficialPromptFromCanonical(CANONICAL_PROMPTS_V2.P05),
  P06: buildOfficialPromptFromCanonical(CANONICAL_PROMPTS_V2.P06),
  P07: buildOfficialPromptFromCanonical(CANONICAL_PROMPTS_V2.P07),
  P08: buildOfficialPromptFromCanonical(CANONICAL_PROMPTS_V2.P08),
  P09: buildOfficialPromptFromCanonical(CANONICAL_PROMPTS_V2.P09),
  P10: buildOfficialPromptFromCanonical(CANONICAL_PROMPTS_V2.P10),
  P11: buildOfficialPromptFromCanonical(CANONICAL_PROMPTS_V2.P11),
  P12: buildOfficialPromptFromCanonical(CANONICAL_PROMPTS_V2.P12),
};

export const OFFICIAL_PROMPTS_V3: OfficialPromptV3[] = Object.values(OFFICIAL_PROMPTS_BY_CANONICAL_ID);

export function getOfficialPromptByCanonicalId(id: string): OfficialPromptV3 {
  const prompt = OFFICIAL_PROMPTS_BY_CANONICAL_ID[id];
  if (!prompt) {
    throw new Error(`[Fornologia V2.2] Prompt oficial não encontrado para ID canônico: ${id}`);
  }
  return prompt;
}

export type OfficialPrompt = CanonicalPromptDefinitionV2;
export type CanonicalPrompt = CanonicalPromptDefinitionV2;
export const CANONICAL_PROMPTS = CANONICAL_PROMPTS_V2;
export const CANONICAL_PROMPTS_LIST = CANONICAL_PROMPT_LIST_V2;
export const OFFICIAL_PROMPTS = CANONICAL_PROMPT_LIST_V2;
export { CANONICAL_PROMPTS_V2, CANONICAL_PROMPT_LIST_V2, getCanonicalPromptById };
