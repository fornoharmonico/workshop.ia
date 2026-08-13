import React from 'react';
import { useApp } from '../../context/AppContext';
import { JornadaView } from './JornadaView';
import { UniversalActivity } from './UniversalActivity';
import { ProjectStateView } from './ProjectStateView';
import { RecursosView } from './RecursosView';
import { AjudaView } from './AjudaView';
import { FacilitatorView } from './FacilitatorView';
import { getPilotActivityById } from '../../data/pilotChain';
import {
  Compass,
  Play,
  Layers,
  BookOpen,
  HelpCircle,
  ShieldAlert,
  User,
  Presentation
} from 'lucide-react';

export const WebappLayout: React.FC = () => {
  const { appState, setActiveWebappTab, setCurrentPilotActivityId, setUserMode } = useApp();
  const currentTab = appState.activeWebappTab;
  const isFacilitatorMode = appState.userMode === 'facilitador';

  const currentPilotActivity = getPilotActivityById(appState.currentPilotActivityId || 'E1-A01');

  // Helper to determine active state for 5 main tabs
  const isJornadaActive = currentTab === 'jornada' || currentTab === 'dashboard';
  const isAtividadeActive = currentTab === 'atividade' || currentTab === 'v2-atividade';
  const isProjetoActive = currentTab === 'projeto' || currentTab === 'v2-projeto';
  const isRecursosActive = 
    currentTab === 'recursos' || 
    currentTab === 'prompts' || 
    currentTab === 'ementa' || 
    currentTab === 'mapa' || 
    currentTab === 'mapa-problemas' || 
    currentTab === 'exportar' || 
    currentTab === 'materiais';
  const isAjudaActive = currentTab === 'ajuda';
  const isFacilitadorActive = currentTab === 'facilitador';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Top Main Navigation Bar for Webapp (5 Participant Tabs + Facilitator Badge) */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5 overflow-x-auto gap-4 scrollbar-none">

            {/* 5 Participant Main Tabs */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              
              {/* 1. JORNADA */}
              <button
                onClick={() => setActiveWebappTab('jornada')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border ${
                  isJornadaActive
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Compass className="w-4 h-4 text-amber-700 dark:text-amber-300" />
                <span>1. JORNADA</span>
              </button>

              {/* 2. ATIVIDADE ATUAL */}
              <button
                onClick={() => setActiveWebappTab('atividade')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border ${
                  isAtividadeActive
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                    : 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20 hover:bg-amber-500/20'
                }`}
              >
                <Play className="w-4 h-4 fill-amber-500 text-amber-500 dark:text-amber-300" />
                <span>2. ATIVIDADE ATUAL</span>
              </button>

              {/* 3. MEU PROJETO */}
              <button
                onClick={() => setActiveWebappTab('projeto')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border ${
                  isProjetoActive
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>3. MEU PROJETO</span>
              </button>

              {/* 4. RECURSOS */}
              <button
                onClick={() => setActiveWebappTab('recursos')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 border ${
                  isRecursosActive
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>4. RECURSOS</span>
              </button>

              {/* 5. AJUDA */}
              <button
                onClick={() => setActiveWebappTab('ajuda')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 border ${
                  isAjudaActive
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>5. AJUDA</span>
              </button>

            </div>

            {/* Separated Facilitator Mode Entry */}
            <div className="shrink-0 flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4">
              <button
                onClick={() => {
                  if (!isFacilitatorMode) setUserMode('facilitador');
                  setActiveWebappTab('facilitador');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  isFacilitatorMode || isFacilitadorActive
                    ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                    : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                }`}
                title="Acessar o painel exclusivo de facilitação e condução do professor"
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>MODO FACILITADOR</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Tab View Rendering */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* 1. JORNADA */}
        {isJornadaActive && <JornadaView />}

        {/* 2. ATIVIDADE ATUAL */}
        {isAtividadeActive && (
          <UniversalActivity 
            activity={currentPilotActivity} 
            onNavigateToActivity={(id) => setCurrentPilotActivityId(id)}
          />
        )}

        {/* 3. MEU PROJETO */}
        {isProjetoActive && <ProjectStateView />}

        {/* 4. RECURSOS */}
        {isRecursosActive && <RecursosView />}

        {/* 5. AJUDA */}
        {isAjudaActive && <AjudaView />}

        {/* MODO FACILITADOR */}
        {(isFacilitadorActive || (isFacilitatorMode && currentTab === 'facilitador')) && (
          <FacilitatorView />
        )}

      </main>

    </div>
  );
};
