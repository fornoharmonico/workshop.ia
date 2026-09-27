/**
 * Session Context V3
 * Manages UI navigation tabs, ephemeral viewed activity inspection,
 * toasts, modal states, and prototyping fake authentication.
 */
import React, { createContext, useContext, useState, useMemo } from 'react';
import { ActivityId } from '../domain/v3/types.ts';
import { checkFakeAuth, setFakeAuth } from '../services/persistence.ts';

export type MainNavTab = 'landing' | 'current' | 'journey' | 'project' | 'resources';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface SessionContextValue {
  isAuthenticated: boolean;
  userName?: string;
  login: (name?: string) => void;
  logout: () => void;

  activeTab: MainNavTab;
  setActiveTab: (tab: MainNavTab) => void;

  viewedActivityId: ActivityId | null;
  setViewedActivityId: (actId: ActivityId | null) => void;

  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isOnboardingModalOpen: boolean;
  setIsOnboardingModalOpen: (open: boolean) => void;
  isHelpModalOpen: boolean;
  setIsHelpModalOpen: (open: boolean) => void;
  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;
  isBackupModalOpen: boolean;
  setIsBackupModalOpen: (open: boolean) => void;
  isRecoveryModalOpen: boolean;
  setIsRecoveryModalOpen: (open: boolean) => void;
  isDossierModalOpen: boolean;
  setIsDossierModalOpen: (open: boolean) => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialAuth = checkFakeAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth.isAuthenticated);
  const [userName, setUserName] = useState<string | undefined>(initialAuth.user);

  // If authenticated, default to 'current' operational view; otherwise 'landing'
  const [activeTab, setActiveTab] = useState<MainNavTab>(
    initialAuth.isAuthenticated ? 'current' : 'landing'
  );

  const [viewedActivityId, setViewedActivityId] = useState<ActivityId | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);

  const login = (name?: string) => {
    setFakeAuth(true, name);
    setIsAuthenticated(true);
    setUserName(name);
    setIsAuthModalOpen(false);
    setActiveTab('current');
    addToast('Acesso de prototipação liberado.', 'success');
  };

  const logout = () => {
    setFakeAuth(false);
    setIsAuthenticated(false);
    setUserName(undefined);
    setActiveTab('landing');
    addToast('Sessão de prototipação encerrada.', 'info');
  };

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      userName,
      login,
      logout,
      activeTab,
      setActiveTab,
      viewedActivityId,
      setViewedActivityId,
      toasts,
      addToast,
      removeToast,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isOnboardingModalOpen,
      setIsOnboardingModalOpen,
      isHelpModalOpen,
      setIsHelpModalOpen,
      isContactModalOpen,
      setIsContactModalOpen,
      isBackupModalOpen,
      setIsBackupModalOpen,
      isRecoveryModalOpen,
      setIsRecoveryModalOpen,
      isDossierModalOpen,
      setIsDossierModalOpen,
    }),
    [
      isAuthenticated,
      userName,
      activeTab,
      viewedActivityId,
      toasts,
      isAuthModalOpen,
      isOnboardingModalOpen,
      isHelpModalOpen,
      isContactModalOpen,
      isBackupModalOpen,
      isRecoveryModalOpen,
      isDossierModalOpen,
    ]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return ctx;
}
