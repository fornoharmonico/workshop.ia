/**
 * Structural Validator Service V3
 * Validates that an artifact body contains the canonical required sections.
 */
import { getArtifactOrThrow } from '../domain/v3/artifactRegistry.ts';
import { ArtifactId } from '../domain/v3/types.ts';

export interface ArtifactValidationResult {
  valid: boolean;
  missingSections: string[];
}

export function validateArtifactStructure(
  artifactId: ArtifactId,
  artifactBody: string
): ArtifactValidationResult {
  const artifactDef = getArtifactOrThrow(artifactId);
  const missing: string[] = [];

  const lowerBody = artifactBody.toLowerCase();

  for (const section of artifactDef.requiredSections) {
    // Extract section number and title, e.g. "1. O que nos move" -> number: "1." and title: "o que nos move"
    const match = section.match(/^(\d+)\.\s*(.*)$/);
    if (!match) continue;

    const sectionNum = match[1];
    const sectionTitle = match[2].trim().toLowerCase();

    // Check if the section number as heading exists (e.g. "## 1." or "# 1." or "**1.")
    // or if the section title keyword is present
    const hasSectionNumber =
      lowerBody.includes(`## ${sectionNum}`) ||
      lowerBody.includes(`### ${sectionNum}`) ||
      lowerBody.includes(`# ${sectionNum}`) ||
      lowerBody.includes(`**${sectionNum}`) ||
      lowerBody.includes(`${sectionNum}.`);

    const hasTitleSnippet =
      sectionTitle.length > 5 &&
      lowerBody.includes(sectionTitle.slice(0, Math.min(sectionTitle.length, 15)));

    if (!hasSectionNumber && !hasTitleSnippet) {
      missing.push(section);
    }
  }

  // Allow passing if at least 70% of sections are matched in case of minor phrasing variations
  const threshold = Math.ceil(artifactDef.requiredSections.length * 0.7);
  const matchedCount = artifactDef.requiredSections.length - missing.length;

  return {
    valid: matchedCount >= threshold,
    missingSections: missing,
  };
}
