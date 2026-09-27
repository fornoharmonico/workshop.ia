/**
 * Persistence Service V3
 * Manages localStorage reading, writing, and atomic updates.
 * Robust error handling for QuotaExceededError and private browsing restrictions.
 */
import { DEFAULT_INITIAL_SOW } from '../domain/v3/sowRegistry.ts';
import {
  CanonicalProjectStateV3,
  DraftWorkspace,
  ProblemItem,
  ToolItem,
} from '../domain/v3/types.ts';

export const STORAGE_KEYS = {
  PROJECT: 'fornologia_v3_project',
  DRAFTS: 'fornologia_v3_drafts',
  PREFERENCES: 'fornologia_v3_preferences',
  CUSTOM_TOOLS: 'fornologia_v3_custom_tools',
  CUSTOM_PROBLEMS: 'fornologia_v3_custom_problems',
  FAKE_AUTH: 'oforno_webapp_fake_auth',
  FAKE_USER: 'oforno_webapp_fake_user',
} as const;

export interface StorageOperationResult {
  success: boolean;
  error?: string;
  isQuotaExceeded?: boolean;
}

export function createInitialProject(
  name = 'Meu Projeto Inovador',
  teamName = 'Equipe Alfa',
  participantLabel = 'Participante'
): CanonicalProjectStateV3 {
  const now = new Date().toISOString();
  return {
    schemaVersion: '3.0',
    project: {
      name,
      teamName,
      participantLabel,
      createdAt: now,
      updatedAt: now,
    },
    currentSow: DEFAULT_INITIAL_SOW,
    artifacts: {},
  };
}

export function loadProjectFromStorage(): CanonicalProjectStateV3 {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECT);
    if (!raw) {
      const initial = createInitialProject();
      saveProjectToStorage(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (parsed.schemaVersion !== '3.0') {
      console.warn('[Persistence] Incompatible schema version in storage. Initializing greenfield V3.');
      const initial = createInitialProject();
      saveProjectToStorage(initial);
      return initial;
    }
    return parsed as CanonicalProjectStateV3;
  } catch (err) {
    console.error('[Persistence] Error loading project from localStorage:', err);
    return createInitialProject();
  }
}

export function saveProjectToStorage(project: CanonicalProjectStateV3): StorageOperationResult {
  try {
    const updated = {
      ...project,
      project: {
        ...project.project,
        updatedAt: new Date().toISOString(),
      },
    };
    const serialized = JSON.stringify(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECT, serialized);
    return { success: true };
  } catch (err: unknown) {
    console.error('[Persistence] Failed to write project to storage:', err);
    const isQuota =
      err instanceof DOMException &&
      (err.code === 22 ||
        err.code === 1014 ||
        err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED');

    return {
      success: false,
      isQuotaExceeded: isQuota,
      error: isQuota
        ? 'Armazenamento local do navegador esgotado. Exporte um Backup imediatamente para não perder dados.'
        : 'Erro ao persistir dados localmente no navegador.',
    };
  }
}

export function loadDraftsFromStorage(): DraftWorkspace {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRAFTS);
    if (!raw) return {};
    return JSON.parse(raw) as DraftWorkspace;
  } catch (err) {
    console.error('[Persistence] Error loading drafts:', err);
    return {};
  }
}

export function saveDraftsToStorage(drafts: DraftWorkspace): StorageOperationResult {
  try {
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
    return { success: true };
  } catch (err) {
    console.error('[Persistence] Error saving drafts:', err);
    return { success: false, error: 'Falha ao salvar rascunho automaticamente.' };
  }
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  hasSeenOnboarding: boolean;
  provisionalProblemPrompt?: string;
}

export function loadPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!raw) {
      return { theme: 'dark', hasSeenOnboarding: false };
    }
    return JSON.parse(raw);
  } catch {
    return { theme: 'dark', hasSeenOnboarding: false };
  }
}

export function savePreferences(prefs: UserPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
  } catch (err) {
    console.error('[Persistence] Error saving preferences:', err);
  }
}

export function loadCustomTools(): ToolItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_TOOLS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomTools(tools: ToolItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_TOOLS, JSON.stringify(tools));
  } catch (err) {
    console.error('[Persistence] Error saving custom tools:', err);
  }
}

export function loadCustomProblems(): ProblemItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_PROBLEMS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomProblems(problems: ProblemItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PROBLEMS, JSON.stringify(problems));
  } catch (err) {
    console.error('[Persistence] Error saving custom problems:', err);
  }
}

export function checkFakeAuth(): { isAuthenticated: boolean; user?: string } {
  try {
    const sessionAuth = sessionStorage.getItem(STORAGE_KEYS.FAKE_AUTH);
    const localAuth = localStorage.getItem(STORAGE_KEYS.FAKE_AUTH);
    const user =
      sessionStorage.getItem(STORAGE_KEYS.FAKE_USER) ||
      localStorage.getItem(STORAGE_KEYS.FAKE_USER) ||
      undefined;

    return {
      isAuthenticated: sessionAuth === 'true' || localAuth === 'true',
      user,
    };
  } catch {
    return { isAuthenticated: false };
  }
}

export function setFakeAuth(isAuthenticated: boolean, userName?: string): void {
  try {
    if (isAuthenticated) {
      sessionStorage.setItem(STORAGE_KEYS.FAKE_AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.FAKE_AUTH, 'true');
      if (userName) {
        sessionStorage.setItem(STORAGE_KEYS.FAKE_USER, userName);
        localStorage.setItem(STORAGE_KEYS.FAKE_USER, userName);
      }
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.FAKE_AUTH);
      localStorage.removeItem(STORAGE_KEYS.FAKE_AUTH);
      sessionStorage.removeItem(STORAGE_KEYS.FAKE_USER);
      localStorage.removeItem(STORAGE_KEYS.FAKE_USER);
    }
  } catch (err) {
    console.error('[Persistence] Error setting fake auth:', err);
  }
}
