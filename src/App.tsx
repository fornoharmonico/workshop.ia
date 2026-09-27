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

      <main className="flex-1 pb-16">
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'current' && <CurrentActivityView />}
        {activeTab === 'journey' && <JourneyMapView />}
        {activeTab === 'project' && <MyProjectView />}
        {activeTab === 'resources' && <ResourcesView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 py-8 px-4 sm:px-6 text-center text-xs text-neutral-500 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <span>Fornologia V3</span>
          <span>•</span>
          <span>Inteligência Artificial Aplicada: do Problema ao Protótipo</span>
          <span>•</span>
          <span className="text-amber-400 font-medium">Classificação 13+</span>
        </div>
        <p className="text-[11px] text-neutral-600 max-w-xl mx-auto">
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
