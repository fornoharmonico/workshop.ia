import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JornadaView } from './JornadaView';
import { UniversalActivity } from './UniversalActivity';
import { UniversalActivityV2 } from './UniversalActivityV2';
import { ProjectStateView } from './ProjectStateView';
import { RecursosView } from './RecursosView';
import { AjudaView } from './AjudaView';
import { FacilitatorView } from './FacilitatorView';
import { getPilotActivityById } from '../../data/pilotChain';
import { downloadFile, buildExportFileName } from '../../utils/exportMasterDocument';
import { ActivityId } from '../../types/canonicalV2';
import { CANONICAL_ACTIVITIES_V2 } from '../../data/canonicalJourney';
import {
  Compass,
  Play,
  Layers,
  BookOpen,
  ShieldAlert,
  ShieldCheck,
  Download,
  CheckCircle2,
  Info,
  X,
  Save,
  Sparkles,
  Check,
  Presentation
} from 'lucide-react';

export const WebappLayout: React.FC = () => {
  const { 
    appState, 
    setActiveWebappTab, 
    setCurrentPilotActivityId, 
    setUserMode, 
    lastSavedTime,
    saveStatus,
    hasUnsavedChanges,
    showUnsavedPrompt,
    triggerManualSave,
    dismissUnsavedPrompt,
    showDeviceNotice,
    setShowDeviceNotice,
    ensureProjectIdentification
  } = useApp();
  const currentTab = appState.activeWebappTab;
  const isFacilitatorMode = appState.userMode === 'facilitador';
  const mainContentRef = useRef<HTMLElement>(null);
  const [backupExported, setBackupExported] = useState(false);

  // Automatically show the device storage & backup notice whenever progress is saved
  useEffect(() => {
    if (saveStatus === 'just_saved') {
      setShowDeviceNotice(true);
    }
  }, [saveStatus, setShowDeviceNotice]);

  const handleExportBackup = () => {
    ensureProjectIdentification(() => {
      const filename = buildExportFileName(
        'backup',
        appState.projectData?.projectName,
        appState.projectData?.teamName,
        'json'
      );
      const jsonStr = JSON.stringify(appState, null, 2);
      downloadFile(filename, jsonStr, 'application/json');
      setBackupExported(true);
      setTimeout(() => {
        setBackupExported(false);
      }, 3500);
    }, 'exportar o backup do projeto');
  };

  // Canonical Activity Resolution for V2
  const rawActId = appState.currentPilotActivityId || 'A01';
  const legacyToCanonicalMap: Record<string, ActivityId> = {
    'E1-A01': 'A01',
    'E1-A02': 'A03',
    'E2-A01': 'A05',
    'E2-A02': 'A06',
    'E2-A03': 'A07',
    'E2-A04': 'A08',
    'E3-A01': 'A09',
    'E3-A02': 'A10',
    'E3-A03': 'A11',
    'E3-A04': 'A12',
    'E3-A05': 'A07',
    'E4-A01': 'A12',
    'E4-A02': 'A12',
    'E4-A03': 'A12',
    'E4-A04': 'A12',
  };
  const canonicalActivityId: ActivityId = (
    rawActId in CANONICAL_ACTIVITIES_V2 
      ? (rawActId as ActivityId) 
      : (legacyToCanonicalMap[rawActId] || 'A01')
  );

  const currentPilotActivity = getPilotActivityById(rawActId.startsWith('E') ? rawActId : 'E1-A01');

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
    currentTab === 'materiais' ||
    currentTab === 'ferramentas' ||
    currentTab === 'caixa-ferramentas';
  const isAjudaActive = currentTab === 'ajuda';
  const isFacilitadorActive = currentTab === 'facilitador';

  // Manage focus when switching tabs for screen readers & keyboard navigation
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.focus();
    }
  }, [currentTab]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Skip to Main Content Link for Keyboard & Screen Reader Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-amber-500 focus:text-slate-950 focus:font-black focus:text-xs focus:rounded-xl focus:shadow-2xl focus:ring-4 focus:ring-amber-300 transition"
      >
        Pular para o conteúdo principal
      </a>

      {/* Top Main Navigation Bar with ARIA Tabs for Webapp */}
      <nav 
        aria-label="Navegação Principal do Workshop" 
        className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30 transition-colors shadow-xs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            role="tablist" 
            aria-label="Seções do Workshop" 
            className="flex items-center justify-between py-2.5 overflow-x-auto gap-4 scrollbar-none"
          >

            {/* 5 Participant Main Tabs */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              
              {/* 1. JORNADA */}
              <button
                id="tab-jornada"
                role="tab"
                aria-selected={isJornadaActive}
                aria-controls="tabpanel-jornada"
                tabIndex={isJornadaActive ? 0 : -1}
                onClick={() => setActiveWebappTab('jornada')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border cursor-pointer ${
                  isJornadaActive
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Compass className="w-4 h-4 text-amber-950 dark:text-amber-300" aria-hidden="true" />
                <span>1. JORNADA</span>
              </button>

              {/* 2. ETAPA ATUAL */}
              <button
                id="tab-atividade"
                role="tab"
                aria-selected={isAtividadeActive}
                aria-controls="tabpanel-atividade"
                tabIndex={isAtividadeActive ? 0 : -1}
                onClick={() => setActiveWebappTab('atividade')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border cursor-pointer ${
                  isAtividadeActive
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                    : 'bg-amber-500/10 text-amber-950 dark:text-amber-200 border-amber-500/30 hover:bg-amber-500/20'
                }`}
              >
                <Play className="w-4 h-4 fill-amber-600 text-amber-600 dark:text-amber-300" aria-hidden="true" />
                <span>2. ETAPA ATUAL</span>
              </button>

              {/* 3. MEU PROJETO */}
              <button
                id="tab-projeto"
                role="tab"
                aria-selected={isProjetoActive}
                aria-controls="tabpanel-projeto"
                tabIndex={isProjetoActive ? 0 : -1}
                onClick={() => setActiveWebappTab('projeto')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border cursor-pointer ${
                  isProjetoActive
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Layers className="w-4 h-4 text-amber-700 dark:text-amber-400" aria-hidden="true" />
                <span>3. MEU PROJETO</span>
              </button>

              {/* 4. RECURSOS */}
              <button
                id="tab-recursos"
                role="tab"
                aria-selected={isRecursosActive}
                aria-controls="tabpanel-recursos"
                tabIndex={isRecursosActive ? 0 : -1}
                onClick={() => setActiveWebappTab('recursos')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 border cursor-pointer ${
                  isRecursosActive
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>4. RECURSOS</span>
              </button>

              {/* 5. FACILITADOR (Apenas quando modo facilitador estiver ativo) */}
              {isFacilitatorMode && (
                <button
                  id="tab-facilitador"
                  role="tab"
                  aria-selected={isFacilitadorActive}
                  aria-controls="tabpanel-facilitador"
                  tabIndex={isFacilitadorActive ? 0 : -1}
                  onClick={() => setActiveWebappTab('facilitador')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border cursor-pointer ${
                    isFacilitadorActive
                      ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                      : 'bg-amber-500/10 text-amber-950 dark:text-amber-200 border-amber-500/30 hover:bg-amber-500/20'
                  }`}
                >
                  <Presentation className="w-4 h-4 text-amber-700 dark:text-amber-300" aria-hidden="true" />
                  <span>5. FACILITADOR</span>
                </button>
              )}

            </div>

            {/* Persistence & Facilitator Mode Header Right Zone */}
            <div className="shrink-0 flex items-center gap-3">
              {/* Discrete Save Status Pill with Manual Save Button */}
              <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-2xs font-semibold text-slate-600 dark:text-slate-300">
                <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                  saveStatus === 'just_saved'
                    ? 'bg-emerald-500 ring-2 ring-emerald-400/50'
                    : hasUnsavedChanges
                    ? 'bg-amber-500 animate-pulse ring-2 ring-amber-400/30'
                    : 'bg-emerald-500'
                }`} />

                <span className="hidden lg:inline">
                  {saveStatus === 'just_saved' ? (
                    <strong className="text-emerald-700 dark:text-emerald-300 font-bold">Salvo com sucesso!</strong>
                  ) : hasUnsavedChanges ? (
                    <span className="text-amber-800 dark:text-amber-300 font-bold">Alterações pendentes</span>
                  ) : (
                    <span>Salvo neste aparelho {lastSavedTime ? `às ${lastSavedTime}` : 'automaticamente'}</span>
                  )}
                </span>

                {/* Discrete Manual Save Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    ensureProjectIdentification(() => {
                      triggerManualSave();
                      setShowDeviceNotice(true);
                    }, 'salvar o projeto');
                  }}
                  className={`px-2 py-0.5 rounded-lg text-2xs font-black transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                    saveStatus === 'just_saved'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                      : hasUnsavedChanges
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs border border-amber-600'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                  }`}
                  title="Salvar progresso manualmente neste navegador"
                  aria-label="Salvar progresso manualmente"
                >
                  {saveStatus === 'just_saved' ? (
                    <Check className="w-3 h-3 text-emerald-700 dark:text-emerald-300" />
                  ) : (
                    <Save className="w-3 h-3 text-current" />
                  )}
                  <span>{saveStatus === 'just_saved' ? 'Salvo!' : 'Salvar'}</span>
                </button>

                <button
                  onClick={() => setShowDeviceNotice(true)}
                  className="text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 ml-0.5 inline-flex items-center"
                  title="Saiba como funciona o salvamento e backup entre computadores"
                  aria-label="Informações de salvamento"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Discrete Non-Intrusive Prompt (after important edits or ~5 minutes without manual save) */}
        {showUnsavedPrompt && (
          <div className="bg-amber-500/10 dark:bg-amber-500/15 border-t border-b border-amber-500/30 px-4 py-2 transition-all">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
                <span className="font-extrabold text-amber-900 dark:text-amber-200">
                  Fez alterações importantes? Salve seu progresso.
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => triggerManualSave()}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-2xs rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3 h-3" />
                  <span>Salvar agora</span>
                </button>
                <button
                  type="button"
                  onClick={() => dismissUnsavedPrompt()}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition cursor-pointer"
                  title="Dispensar aviso"
                  aria-label="Dispensar aviso"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Informative Modal / Banner explaining Local Storage vs Backup across devices */}
        {showDeviceNotice && (
          <div className="bg-slate-900 text-white border-t border-slate-800 px-4 py-3 sm:px-6 shadow-md transition-all">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-extrabold text-amber-300">Como funciona o salvamento do seu progresso:</strong>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">
                    Todo o trabalho da sua equipe fica <strong>automaticamente gravado neste computador ou celular</strong>. Se fechar ou recarregar a página, tudo continua aqui. Para continuar em <strong>outro computador</strong> no próximo encontro, basta clicar em <strong>Exportar backup</strong> abaixo ou acessar <strong>4. Recursos → Exportar & Backup</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-2xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Exportar arquivo de backup completo (.json)"
                >
                  {backupExported ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                  ) : (
                    <Download className="w-3.5 h-3.5 text-slate-950" />
                  )}
                  <span>{backupExported ? 'Backup exportado!' : 'Exportar backup'}</span>
                </button>

                <button
                  onClick={() => setShowDeviceNotice(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  title="Fechar aviso"
                  aria-label="Fechar aviso"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Tab View Rendering with Skip Link target and tabpanel roles */}
      <main 
        id="main-content" 
        ref={mainContentRef}
        tabIndex={-1} 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 outline-none focus:outline-none"
      >
        
        {/* 1. JORNADA */}
        {isJornadaActive && (
          <div id="tabpanel-jornada" role="tabpanel" aria-labelledby="tab-jornada">
            <JornadaView />
          </div>
        )}

        {/* 2. ATIVIDADE ATUAL */}
        {isAtividadeActive && (
          <div id="tabpanel-atividade" role="tabpanel" aria-labelledby="tab-atividade">
            <UniversalActivityV2 
              activityId={canonicalActivityId} 
              onNavigateToActivity={(id) => setCurrentPilotActivityId(id)}
            />
          </div>
        )}

        {/* 3. MEU PROJETO */}
        {isProjetoActive && (
          <div id="tabpanel-projeto" role="tabpanel" aria-labelledby="tab-projeto">
            <ProjectStateView />
          </div>
        )}

        {/* 4. RECURSOS */}
        {isRecursosActive && (
          <div id="tabpanel-recursos" role="tabpanel" aria-labelledby="tab-recursos">
            <RecursosView />
          </div>
        )}

        {/* 5. AJUDA */}
        {isAjudaActive && (
          <div id="tabpanel-ajuda" role="tabpanel" aria-labelledby="tab-ajuda">
            <AjudaView />
          </div>
        )}

        {/* MODO FACILITADOR */}
        {(isFacilitadorActive || (isFacilitatorMode && currentTab === 'facilitador')) && (
          <div id="tabpanel-facilitador" role="tabpanel" aria-label="Painel de Condução do Facilitador">
            <FacilitatorView />
          </div>
        )}

      </main>

    </div>
  );
};
