import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TimerControl } from './components/TimerControl';
import { ProjectionModal } from './components/ProjectionModal';
import { BrandPreviewModal } from './components/BrandPreviewModal';
import { LandingPage } from './components/landing/LandingPage';
import { WebappLayout } from './components/webapp/WebappLayout';

const MainAppContent: React.FC = () => {
  const { appState } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar />
      
      <div className="flex-1">
        {appState.currentView === 'landing' ? (
          <LandingPage />
        ) : (
          <WebappLayout />
        )}
      </div>

      <Footer />
      <TimerControl />
      <ProjectionModal />
      <BrandPreviewModal />
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
