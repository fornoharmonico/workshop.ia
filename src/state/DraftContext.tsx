/**
 * Draft Context V3
 * Manages autosaved non-canonical work-in-progress drafts.
 * Invariant: Drafts never enter Context Packs of other activities or BackupV3.
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityId, DraftRecord, DraftWorkspace } from '../domain/v3/types.ts';
import { loadDraftsFromStorage, saveDraftsToStorage } from '../services/persistence.ts';

interface DraftContextValue {
  drafts: DraftWorkspace;
  getDraft: (activityId: ActivityId) => DraftRecord;
  updateDraft: (activityId: ActivityId, pastedResult: string, userObservation?: string) => void;
  clearDraft: (activityId: ActivityId) => void;
  clearAllDrafts: () => void;
  isAutosaving: boolean;
}

const DraftContext = createContext<DraftContextValue | null>(null);

export const DraftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [drafts, setDrafts] = useState<DraftWorkspace>(() => loadDraftsFromStorage());
  const [isAutosaving, setIsAutosaving] = useState(false);

  useEffect(() => {
    setIsAutosaving(true);
    const timer = setTimeout(() => {
      saveDraftsToStorage(drafts);
      setIsAutosaving(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [drafts]);

  const getDraft = (activityId: ActivityId): DraftRecord => {
    return (
      drafts[activityId] || {
        pastedResult: '',
        userObservation: '',
        updatedAt: new Date().toISOString(),
      }
    );
  };

  const updateDraft = (activityId: ActivityId, pastedResult: string, userObservation = '') => {
    setDrafts((prev) => ({
      ...prev,
      [activityId]: {
        pastedResult,
        userObservation,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const clearDraft = (activityId: ActivityId) => {
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[activityId];
      saveDraftsToStorage(next);
      return next;
    });
  };

  const clearAllDrafts = () => {
    setDrafts({});
    saveDraftsToStorage({});
  };

  return (
    <DraftContext.Provider
      value={{
        drafts,
        getDraft,
        updateDraft,
        clearDraft,
        clearAllDrafts,
        isAutosaving,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};

export function useDraft(): DraftContextValue {
  const ctx = useContext(DraftContext);
  if (!ctx) {
    throw new Error('useDraft must be used within a DraftProvider');
  }
  return ctx;
}
