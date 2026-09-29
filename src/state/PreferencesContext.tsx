/**
 * Preferences Context V3
 * Stores user preferences, theme, custom toolbox items, and custom problems outside of project backup.
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProblemItem, ToolItem } from '../domain/v3/types.ts';
import {
  loadCustomProblems,
  loadCustomTools,
  loadPreferences,
  saveCustomProblems,
  saveCustomTools,
  savePreferences,
  UserPreferences,
} from '../services/persistence.ts';

interface PreferencesContextValue {
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (v: boolean) => void;
  provisionalProblemPrompt?: string;
  setProvisionalProblemPrompt: (prompt?: string) => void;
  customTools: ToolItem[];
  addCustomTool: (tool: Omit<ToolItem, 'id' | 'isCustom'>) => void;
  removeCustomTool: (id: string) => void;
  customProblems: ProblemItem[];
  addCustomProblem: (problem: Omit<ProblemItem, 'id' | 'isCustom'>) => void;
  removeCustomProblem: (id: string) => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prefs, setPrefs] = useState<UserPreferences>(() => loadPreferences());
  const [customTools, setCustomTools] = useState<ToolItem[]>(() => loadCustomTools());
  const [customProblems, setCustomProblems] = useState<ProblemItem[]>(() => loadCustomProblems());

  useEffect(() => {
    savePreferences(prefs);
    const root = document.documentElement;
    if (prefs.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, [prefs]);

  useEffect(() => {
    saveCustomTools(customTools);
  }, [customTools]);

  useEffect(() => {
    saveCustomProblems(customProblems);
  }, [customProblems]);

  const setTheme = (theme: 'dark' | 'light') => {
    setPrefs((prev) => ({ ...prev, theme }));
  };

  const setHasSeenOnboarding = (hasSeenOnboarding: boolean) => {
    setPrefs((prev) => ({ ...prev, hasSeenOnboarding }));
  };

  const setProvisionalProblemPrompt = (provisionalProblemPrompt?: string) => {
    setPrefs((prev) => ({ ...prev, provisionalProblemPrompt }));
  };

  const addCustomTool = (tool: Omit<ToolItem, 'id' | 'isCustom'>) => {
    const newTool: ToolItem = {
      ...tool,
      id: `custom-tool-${Date.now()}`,
      isCustom: true,
    };
    setCustomTools((prev) => [newTool, ...prev]);
  };

  const removeCustomTool = (id: string) => {
    setCustomTools((prev) => prev.filter((t) => t.id !== id));
  };

  const addCustomProblem = (prob: Omit<ProblemItem, 'id' | 'isCustom'>) => {
    const newProblem: ProblemItem = {
      ...prob,
      id: `custom-prob-${Date.now()}`,
      isCustom: true,
    };
    setCustomProblems((prev) => [newProblem, ...prev]);
  };

  const removeCustomProblem = (id: string) => {
    setCustomProblems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PreferencesContext.Provider
      value={{
        theme: prefs.theme,
        setTheme,
        hasSeenOnboarding: prefs.hasSeenOnboarding,
        setHasSeenOnboarding,
        provisionalProblemPrompt: prefs.provisionalProblemPrompt,
        setProvisionalProblemPrompt,
        customTools,
        addCustomTool,
        removeCustomTool,
        customProblems,
        addCustomProblem,
        removeCustomProblem,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return ctx;
}
