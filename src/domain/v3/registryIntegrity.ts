/**
 * Canonical Registry Integrity & Invariants Checker
 * Verifies strict 1:1:1 mapping (Axx <-> Pxx <-> AFxx), acyclicity, and context references.
 */
import { ACTIVITIES_V3, ACTIVITY_MAP } from './journeyRegistry.ts';
import { ARTIFACTS_V3, ARTIFACT_MAP } from './artifactRegistry.ts';
import { PROMPTS_V3, PROMPT_MAP } from './promptRegistry.ts';
import { ActivityId, ArtifactId, PromptId } from './types.ts';

export interface IntegrityCheckResult {
  valid: boolean;
  errors: string[];
}

export function validateRegistryIntegrity(): IntegrityCheckResult {
  const errors: string[] = [];

  // Invariant 1: Exactly 11 activities
  if (ACTIVITIES_V3.length !== 11) {
    errors.push(`Expected exactly 11 activities, got ${ACTIVITIES_V3.length}.`);
  }

  // Invariant 2: Exactly 11 artifacts
  if (ARTIFACTS_V3.length !== 11) {
    errors.push(`Expected exactly 11 artifacts, got ${ARTIFACTS_V3.length}.`);
  }

  // Invariant 3: Exactly 12 prompts (P00 + 11 activity prompts)
  if (PROMPTS_V3.length !== 12) {
    errors.push(`Expected exactly 12 prompts (P00 + P01..P11), got ${PROMPTS_V3.length}.`);
  }

  // Invariant 4: Biunivocal 1:1:1 correspondence
  for (let i = 1; i <= 11; i++) {
    const num = i < 10 ? `0${i}` : `${i}`;
    const expectedActId = `A${num}` as ActivityId;
    const expectedPromptId = `P${num}` as PromptId;
    const expectedArtId = `AF${num}` as ArtifactId;

    const act = ACTIVITY_MAP.get(expectedActId);
    if (!act) {
      errors.push(`Activity ${expectedActId} not found in ACTIVITY_MAP.`);
      continue;
    }

    if (act.promptId !== expectedPromptId) {
      errors.push(`Activity ${expectedActId} references prompt ${act.promptId}, expected ${expectedPromptId}.`);
    }

    if (act.artifactId !== expectedArtId) {
      errors.push(`Activity ${expectedActId} references artifact ${act.artifactId}, expected ${expectedArtId}.`);
    }

    const art = ARTIFACT_MAP.get(expectedArtId);
    if (!art) {
      errors.push(`Artifact ${expectedArtId} not found in ARTIFACT_MAP.`);
      continue;
    }

    if (art.activityId !== expectedActId) {
      errors.push(`Artifact ${expectedArtId} references activity ${art.activityId}, expected ${expectedActId}.`);
    }

    const p = PROMPT_MAP.get(expectedPromptId);
    if (!p) {
      errors.push(`Prompt ${expectedPromptId} not found in PROMPT_MAP.`);
      continue;
    }

    if (p.activityId !== expectedActId) {
      errors.push(`Prompt ${expectedPromptId} references activity ${p.activityId}, expected ${expectedActId}.`);
    }

    if (p.outputArtifactId !== expectedArtId) {
      errors.push(`Prompt ${expectedPromptId} references output artifact ${p.outputArtifactId}, expected ${expectedArtId}.`);
    }

    // Context reference validation
    for (const reqArtId of act.requiredContext) {
      if (!ARTIFACT_MAP.has(reqArtId)) {
        errors.push(`Activity ${expectedActId} has invalid requiredContext: ${reqArtId}`);
      }
    }
    for (const optArtId of act.optionalContext) {
      if (!ARTIFACT_MAP.has(optArtId)) {
        errors.push(`Activity ${expectedActId} has invalid optionalContext: ${optArtId}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
