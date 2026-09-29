/**
 * App Root Component V3
 * Greenfield Fornologia V3 Implementation
 * Workshop Inteligência Artificial Aplicada: do Problema ao Protótipo
 */
import React, { useEffect } from 'react';
import { ProjectProvider } from './state/ProjectContext.tsx';
import { DraftProvider } from './state/DraftContext.tsx';
import { PreferencesProvider, usePreferences } from './state/PreferencesContext.tsx';
import { SessionProvider, useSession } from './state/SessionContext.tsx';
import { TimerProvider } from './state/TimerContext.tsx';

import { Header } from './components/common/Header.tsx';
import { ToastContainer, StorageAlert } from './components/common/ToastContainer.tsx';
import { LandingPage } from './components/landing/LandingPage.tsx';
import { CurrentActivityView } from './components/activity/CurrentActivityView.tsx';
import { JourneyMapView } from './components/journey/JourneyMapView.tsx';
import { MyProjectView } from './components/project/MyProjectView.tsx';
import { ResourcesView } from './components/resources/ResourcesView.tsx';

import { FakeLoginModal } from './components/auth/FakeLoginModal.tsx';
import { OnboardingModal } from './components/onboarding/OnboardingModal.tsx';
import { HelpModal } from './components/help/HelpModal.tsx';
import { InstitutionalContactModal } from './components/landing/InstitutionalContactModal.tsx';
import { TimerOverlay } from './components/timer/TimerOverlay.tsx';

const MainContent: React.FC = () => {
  const { activeTab, isAuthenticated, setIsOnboardingModalOpen } = useSession();
  const { hasSeenOnboarding } = usePreferences();

  // If user is authenticated and hasn't seen onboarding, prompt onboarding once
  useEffect(() => {
    if (isAuthenticated && !hasSeenOnboarding) {
      setIsOnboardingModalOpen(true);
    }
  }, [isAuthenticated, hasSeenOnboarding, setIsOnboardingModalOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-amber-500/20 selection:text-amber-200">
      <StorageAlert />
      <Header />

      <main className="flex-1 pb-24 md:pb-16">
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'current' && <CurrentActivityView />}
        {activeTab === 'journey' && <JourneyMapView />}
        {activeTab === 'project' && <MyProjectView />}
        {activeTab === 'resources' && <ResourcesView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 py-8 px-4 sm:px-6 text-center text-xs text-neutral-500 space-y-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center space-x-2">
            <img
              src="https://i.postimg.cc/RhpFKdKb/LOGO-FORNO-branco-sem-fundo.png"
              alt="Logo d'O Forno"
              width={36}
              height={36}
              loading="lazy"
              decoding="async"
              className="hidden dark:block h-8 w-8 object-contain"
            />
            <img
              src="https://i.postimg.cc/htL0bQZ5/LOGO-FORNO-FUNDO-BRANCO.png"
              alt="Logo d'O Forno"
              width={36}
              height={36}
              loading="lazy"
              decoding="async"
              className="block dark:hidden h-8 w-8 object-contain rounded-lg"
            />
            <span className="font-bold text-neutral-200 text-sm tracking-tight">
              O Forno
            </span>
          </div>
          <p className="text-[11px] text-neutral-400">
            Escola de Planejamento e Gestão de Projetos
          </p>
        </div>

        <p className="text-[11px] text-neutral-500 max-w-xl mx-auto leading-relaxed">
          Ambiente autônomo local-first sem backend ou segredos de API. Os artefatos e o State of Work permanecem exclusivamente neste navegador.
        </p>
      </footer>

      {/* Global Modals & Overlays */}
      <FakeLoginModal />
      <OnboardingModal />
      <HelpModal />
      <InstitutionalContactModal />
      <TimerOverlay />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <PreferencesProvider>
      <ProjectProvider>
        <DraftProvider>
          <SessionProvider>
            <TimerProvider>
              <MainContent />
            </TimerProvider>
          </SessionProvider>
        </DraftProvider>
      </ProjectProvider>
    </PreferencesProvider>
  );
}
