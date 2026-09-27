/**
 * Dependency Graph Service V3
 * Derives direct upstream and downstream dependency relations between activities.
 * Enforces strictly 1-level propagation for REVALIDACAO_RECOMENDADA.
 */
import { ACTIVITIES_V3, getActivityOrThrow } from '../domain/v3/journeyRegistry.ts';
import { ActivityId, ArtifactId } from '../domain/v3/types.ts';

/**
 * Returns the list of ArtifactIds that this activity requires as input.
 */
export function getRequiredArtifactsForActivity(activityId: ActivityId): ArtifactId[] {
  const act = getActivityOrThrow(activityId);
  return act.requiredContext;
}

/**
 * Returns direct downstream activities that have this artifact as requiredContext.
 */
export function getDirectDependentActivitiesForArtifact(artifactId: ArtifactId): ActivityId[] {
  const dependents: ActivityId[] = [];
  for (const act of ACTIVITIES_V3) {
    if (act.requiredContext.includes(artifactId)) {
      dependents.push(act.id);
    }
  }
  return dependents;
}

/**
 * Returns direct downstream artifact IDs produced by direct dependent activities.
 */
export function getDirectDependentArtifactIds(targetArtifactId: ArtifactId): ArtifactId[] {
  const directActivities = getDirectDependentActivitiesForArtifact(targetArtifactId);
  return directActivities.map((actId) => getActivityOrThrow(actId).artifactId);
}
