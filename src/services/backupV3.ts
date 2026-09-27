/**
 * Backup V3 Service
 * Atomic export, validation, preview, and import for Schema 3.0.
 * Invariant: Never includes timer, theme, drafts, or custom resources.
 */
import { ARTIFACT_MAP } from '../domain/v3/artifactRegistry.ts';
import {
  ArtifactId,
  BackupV3,
  CanonicalProjectStateV3,
} from '../domain/v3/types.ts';

export function createBackupJson(project: CanonicalProjectStateV3): string {
  const backup: BackupV3 = {
    schemaVersion: '3.0',
    exportedAt: new Date().toISOString(),
    project: { ...project.project },
    currentSow: project.currentSow,
    artifacts: { ...project.artifacts },
  };

  return JSON.stringify(backup, null, 2);
}

export interface BackupValidationResult {
  valid: boolean;
  error?: string;
  preview?: {
    projectName: string;
    teamName: string;
    exportedAt: string;
    artifactCount: number;
    consolidatedArtifacts: ArtifactId[];
  };
  backup?: BackupV3;
}

export function validateBackupJson(jsonString: string): BackupValidationResult {
  try {
    if (!jsonString || typeof jsonString !== 'string') {
      return { valid: false, error: 'Arquivo ou conteúdo JSON vazio.' };
    }

    const data = JSON.parse(jsonString);

    if (data.schemaVersion !== '3.0') {
      return {
        valid: false,
        error: `Versão de schema incompatível: "${data.schemaVersion}". Este webapp aceita somente backups V3 ("3.0").`,
      };
    }

    if (!data.project || typeof data.project !== 'object') {
      return { valid: false, error: 'Campo "project" ausente ou inválido no backup.' };
    }

    if (typeof data.currentSow !== 'string') {
      return { valid: false, error: 'Campo "currentSow" ausente ou inválido no backup.' };
    }

    if (!data.artifacts || typeof data.artifacts !== 'object') {
      return { valid: false, error: 'Campo "artifacts" ausente ou inválido no backup.' };
    }

    // Validate that artifact IDs are recognized canonical IDs
    const consolidatedList: ArtifactId[] = [];
    for (const [key, record] of Object.entries(data.artifacts)) {
      if (!ARTIFACT_MAP.has(key as ArtifactId)) {
        return {
          valid: false,
          error: `Identificador de artefato desconhecido no backup: "${key}".`,
        };
      }
      if (!record || typeof record !== 'object') {
        return { valid: false, error: `Registro do artefato ${key} está corrompido.` };
      }
      consolidatedList.push(key as ArtifactId);
    }

    return {
      valid: true,
      preview: {
        projectName: data.project.name || 'Sem título',
        teamName: data.project.teamName || 'Sem equipe',
        exportedAt: data.exportedAt || 'Data não informada',
        artifactCount: consolidatedList.length,
        consolidatedArtifacts: consolidatedList,
      },
      backup: data as BackupV3,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'JSON corrompido';
    return {
      valid: false,
      error: `Falha ao interpretar o arquivo JSON: ${message}`,
    };
  }
}

export function restoreProjectFromBackup(backup: BackupV3): CanonicalProjectStateV3 {
  return {
    schemaVersion: '3.0',
    project: {
      ...backup.project,
      updatedAt: new Date().toISOString(),
    },
    currentSow: backup.currentSow,
    artifacts: { ...backup.artifacts },
  };
}
