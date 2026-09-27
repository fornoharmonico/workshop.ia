/**
 * Progress Derivation Service V3
 * Pure functions deriving activity statuses, progress counts, and canonical current activity.
 * Strict Invariant: Progress is NEVER stored directly as an array or currentId pointer.
 */
import { ACTIVITIES_V3, getActivityOrThrow } from '../domain/v3/journeyRegistry.ts';
import {
  ActivityId,
  ActivityStatus,
  CanonicalProjectStateV3,
  DraftWorkspace,
} from '../domain/v3/types.ts';

/**
 * Derives the operational status of a single activity.
 */
export function getActivityStatus(
  activityId: ActivityId,
  project: CanonicalProjectStateV3,
  drafts?: DraftWorkspace
): ActivityStatus {
  const act = getActivityOrThrow(activityId);
  const existingRecord = project.artifacts[act.artifactId];

  if (existingRecord) {
    if (existingRecord.status === 'REVALIDACAO_RECOMENDADA') {
      return 'REVALIDACAO_RECOMENDADA';
    }
    return 'CONCLUIDA';
  }

  // Check required dependencies
  for (const reqArtId of act.requiredContext) {
    const parentRecord = project.artifacts[reqArtId];
    if (!parentRecord || parentRecord.status !== 'VIGENTE') {
      return 'BLOQUEADA';
    }
  }

  // Check if there is an active draft
  const draft = drafts?.[activityId];
  if (draft && (draft.pastedResult.trim().length > 0 || draft.userObservation.trim().length > 0)) {
    return 'EM_ANDAMENTO';
  }

  return 'NAO_INICIADA';
}

/**
 * Derives the canonical Current Activity.
 * Priority order:
 * 1. Oldest activity in REVALIDACAO_RECOMENDADA.
 * 2. First uncompleted activity whose required inputs are VIGENTE.
 * 3. A11 if all completed.
 */
export function getCanonicalCurrentActivity(
  project: CanonicalProjectStateV3,
  drafts?: DraftWorkspace
): ActivityId {
  // 1. Look for pending revalidation in sequential order
  for (const act of ACTIVITIES_V3) {
    const record = project.artifacts[act.artifactId];
    if (record && record.status === 'REVALIDACAO_RECOMENDADA') {
      return act.id;
    }
  }

  // 2. Look for first activity not completed whose inputs are ready
  for (const act of ACTIVITIES_V3) {
    const record = project.artifacts[act.artifactId];
    if (!record) {
      const status = getActivityStatus(act.id, project, drafts);
      if (status !== 'BLOQUEADA') {
        return act.id;
      }
    }
  }

  // 3. If all are consolidated and valid, return A11 (celebrate/concluded)
  return 'A11';
}

/**
 * Determines whether the entire 11-activity journey is completed.
 */
export function isJourneyCompleted(project: CanonicalProjectStateV3): boolean {
  for (const act of ACTIVITIES_V3) {
    const record = project.artifacts[act.artifactId];
    if (!record || record.status !== 'VIGENTE') {
      return false;
    }
  }
  return true;
}

export interface ProgressSummary {
  completedCount: number;
  revalidationCount: number;
  blockedCount: number;
  notStartedCount: number;
  inProgressCount: number;
  percentage: number;
  isCompleted: boolean;
}

export function getProgressSummary(
  project: CanonicalProjectStateV3,
  drafts?: DraftWorkspace
): ProgressSummary {
  let completedCount = 0;
  let revalidationCount = 0;
  let blockedCount = 0;
  let notStartedCount = 0;
  let inProgressCount = 0;

  for (const act of ACTIVITIES_V3) {
    const status = getActivityStatus(act.id, project, drafts);
    switch (status) {
      case 'CONCLUIDA':
        completedCount++;
        break;
      case 'REVALIDACAO_RECOMENDADA':
        revalidationCount++;
        break;
      case 'BLOQUEADA':
        blockedCount++;
        break;
      case 'EM_ANDAMENTO':
        inProgressCount++;
        break;
      case 'NAO_INICIADA':
        notStartedCount++;
        break;
    }
  }

  const percentage = Math.round((completedCount / ACTIVITIES_V3.length) * 100);
  const isCompleted = completedCount === ACTIVITIES_V3.length && revalidationCount === 0;

  return {
    completedCount,
    revalidationCount,
    blockedCount,
    notStartedCount,
    inProgressCount,
    percentage,
    isCompleted,
  };
}
