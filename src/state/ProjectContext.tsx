/**
 * Project Context V3
 * Manages the Canonical Project State, transactional consolidation,
 * direct dependent revalidation propagation, and safe storage writes.
 */
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  ActivityExecutionMode,
  ActivityId,
  CanonicalProjectStateV3,
  ConsolidatedArtifactRecord,
  HumanObservationRecord,
  ParsedEnvelopeResult,
} from '../domain/v3/types.ts';
import { getActivityOrThrow } from '../domain/v3/journeyRegistry.ts';
import { getDirectDependentArtifactIds } from '../services/dependencyGraph.ts';
import {
  createInitialProject,
  loadProjectFromStorage,
  saveProjectToStorage,
  StorageOperationResult,
} from '../services/persistence.ts';

interface ProjectContextValue {
  project: CanonicalProjectStateV3;
  storageError: string | null;
  clearStorageError: () => void;
  consolidateActivity: (
    activityId: ActivityId,
    mode: ActivityExecutionMode,
    parsedResult: ParsedEnvelopeResult,
    humanObservationText?: string
  ) => { success: boolean; error?: string };
  updateProjectMeta: (name: string, teamName: string) => void;
  resetProject: (name?: string, teamName?: string) => void;
  importProjectState: (imported: CanonicalProjectStateV3) => StorageOperationResult;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<CanonicalProjectStateV3>(() => loadProjectFromStorage());
  const [storageError, setStorageError] = useState<string | null>(null);

  // Sync to storage on project state changes
  useEffect(() => {
    const result = saveProjectToStorage(project);
    if (!result.success && result.error) {
      setStorageError(result.error);
    } else {
      setStorageError(null);
    }
  }, [project]);

  const clearStorageError = () => setStorageError(null);

  const updateProjectMeta = (name: string, teamName: string) => {
    setProject((prev) => ({
      ...prev,
      project: {
        ...prev.project,
        name: name.trim() || prev.project.name,
        teamName: teamName.trim() || prev.project.teamName,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const resetProject = (name?: string, teamName?: string) => {
    const fresh = createInitialProject(name, teamName);
    setProject(fresh);
    saveProjectToStorage(fresh);
  };

  const importProjectState = (imported: CanonicalProjectStateV3): StorageOperationResult => {
    setProject(imported);
    return saveProjectToStorage(imported);
  };

  const consolidateActivity = (
    activityId: ActivityId,
    mode: ActivityExecutionMode,
    parsedResult: ParsedEnvelopeResult,
    humanObservationText?: string
  ): { success: boolean; error?: string } => {
    const act = getActivityOrThrow(activityId);
    const targetArtId = act.artifactId;
    const now = new Date().toISOString();

    let newArtifacts = { ...project.artifacts };

    // 1. Determine body and status of the target artifact
    let finalBody = parsedResult.artifactBody;
    let finalStatus: 'VIGENTE' | 'REVALIDACAO_RECOMENDADA' = 'VIGENTE';
    let shouldPropagateToDependents = false;

    if (mode === 'CREATE') {
      finalStatus = 'VIGENTE';
    } else if (mode === 'REVISE') {
      finalStatus = 'VIGENTE';
      shouldPropagateToDependents = true;
    } else if (mode === 'REVALIDATE') {
      const revalStatus = parsedResult.revalidation?.status;
      if (revalStatus === 'SEM_ALTERACAO') {
        // Keep existing body if available, restore status to VIGENTE
        const existing = project.artifacts[targetArtId];
        if (existing) {
          finalBody = existing.body;
        }
        finalStatus = 'VIGENTE';
        shouldPropagateToDependents = false;
      } else {
        // COM_ALTERACAO: replace body, restore status to VIGENTE, propagate 1 level down
        finalStatus = 'VIGENTE';
        shouldPropagateToDependents = true;
      }
    }

    // 2. Prepare Human Observation Record if provided
    let obsRecord: HumanObservationRecord | undefined = undefined;
    const trimmedObs = humanObservationText ? humanObservationText.trim() : '';
    if (trimmedObs.length > 0) {
      obsRecord = {
        id: `obs-${Date.now()}`,
        text: trimmedObs,
        status: 'METABOLIZED', // Metabolized in this consolidation
        createdAt: now,
      };
    }

    // 3. Mark existing pending observations as METABOLIZED
    for (const [artKey, rec] of Object.entries(newArtifacts)) {
      if (rec && rec.humanObservation && rec.humanObservation.status === 'PENDING') {
        newArtifacts[artKey as keyof typeof newArtifacts] = {
          ...rec,
          humanObservation: {
            ...rec.humanObservation,
            status: 'METABOLIZED',
          },
        };
      }
    }

    // 4. Update the consolidated target record
    const newRecord: ConsolidatedArtifactRecord = {
      artifactId: targetArtId,
      body: finalBody,
      embeddedSow: parsedResult.sowBody,
      humanObservation: obsRecord,
      status: finalStatus,
      consolidatedAt: now,
    };

    newArtifacts[targetArtId] = newRecord;

    // 5. If revision or change occurred, mark ONLY direct dependents as REVALIDACAO_RECOMENDADA (1 level strictly)
    if (shouldPropagateToDependents) {
      const directDependentArtifactIds = getDirectDependentArtifactIds(targetArtId);
      for (const depArtId of directDependentArtifactIds) {
        const existingDep = newArtifacts[depArtId];
        if (existingDep) {
          newArtifacts[depArtId] = {
            ...existingDep,
            status: 'REVALIDACAO_RECOMENDADA',
          };
        }
      }
    }

    // 6. Transactional State Candidate
    const nextState: CanonicalProjectStateV3 = {
      ...project,
      currentSow: parsedResult.sowBody,
      artifacts: newArtifacts,
      project: {
        ...project.project,
        updatedAt: now,
      },
    };

    // Test write to storage
    const writeResult = saveProjectToStorage(nextState);
    if (!writeResult.success) {
      return {
        success: false,
        error: writeResult.error || 'Falha ao salvar no armazenamento local do navegador.',
      };
    }

    // Commit state
    setProject(nextState);
    setStorageError(null);
    return { success: true };
  };

  const value = useMemo(
    () => ({
      project,
      storageError,
      clearStorageError,
      consolidateActivity,
      updateProjectMeta,
      resetProject,
      importProjectState,
    }),
    [project, storageError]
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export function useProject(): ProjectContextValue {
  const ctx = useContext(ProjectContext);
  if (!ctx) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return ctx;
}
