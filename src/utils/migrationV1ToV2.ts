import { AppState } from '../types/workshop';

/**
 * Initializes or normalizes the application state for V2.
 * V1 test data is not migrated into V2 project claims or artifacts to ensure
 * a clean, deterministic V2 state without text inference.
 */
export function migrateStateToV2(rawState: any): AppState {
  if (rawState && rawState.version === '2.0') {
    return {
      ...rawState,
      version: '2.0',
      artifactVersions: Array.isArray(rawState.artifactVersions) ? rawState.artifactVersions : [],
      projectStateV2: rawState.projectStateV2 || {},
      facilitatorObservations: Array.isArray(rawState.facilitatorObservations) ? rawState.facilitatorObservations : [],
      currentPilotActivityId: rawState.currentPilotActivityId || 'E1-A01',
      draftArtifacts: rawState.draftArtifacts || {},
    };
  }

  // Fallback for legacy state: preserve non-project app state, initialize clean V2 project state
  return {
    ...rawState,
    version: '2.0',
    artifactVersions: [],
    projectStateV2: {},
    facilitatorObservations: [],
    currentPilotActivityId: 'E1-A01',
    draftArtifacts: {},
  };
}
