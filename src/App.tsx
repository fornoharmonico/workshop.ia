import React, { Suspense, lazy } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { FakeLoginScreen } from './components/auth/FakeLoginScreen';
import { Loader2 } from 'lucide-react';

// Code-splitting: Lazy load heavy webapp workspace and secondary overlays
const WebappLayout = lazy(() => import('./components/webapp/WebappLayout').then(m => ({ default: m.WebappLayout })));
const TimerControl = lazy(() => import('./components/TimerControl').then(m => ({ default: m.TimerControl })));
const ProjectionModal = lazy(() => import('./components/ProjectionModal').then(m => ({ default: m.ProjectionModal })));
const BrandPreviewModal = lazy(() => import('./components/BrandPreviewModal').then(m => ({ default: m.BrandPreviewModal })));
const PrivacyModal = lazy(() => import('./components/PrivacyModal').then(m => ({ default: m.PrivacyModal })));
const OnboardingModal = lazy(() => import('./components/OnboardingModal').then(m => ({ default: m.OnboardingModal })));
const ProjectIdentificationModal = lazy(() => import('./components/ProjectIdentificationModal').then(m => ({ default: m.ProjectIdentificationModal })));

const WebappLoadingFallback: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 py-20 px-4 text-center">
    <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-800 animate-pulse">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
    <div className="space-y-1">
      <p className="text-base font-black text-slate-900 dark:text-white">
        Carregando Ambiente da Turma...
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
        Inicializando ferramentas de prototipagem e atividades práticas da Fornologia.
      </p>
    </div>
  </div>
);

const MainAppContent: React.FC = () => {
  const { appState, isWebappAuthenticated } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar />
      
      <main id="main-content" className="flex-1">
        {appState.currentView === 'landing' ? (
          <LandingPage />
        ) : !isWebappAuthenticated ? (
          <FakeLoginScreen />
        ) : (
          <Suspense fallback={<WebappLoadingFallback />}>
            <WebappLayout />
          </Suspense>
        )}
      </main>

      {appState.currentView === 'landing' && <Footer />}

      {isWebappAuthenticated && (
        <Suspense fallback={null}>
          <TimerControl />
          <ProjectionModal />
          <BrandPreviewModal />
          <PrivacyModal />
          <OnboardingModal />
          <ProjectIdentificationModal />
        </Suspense>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

