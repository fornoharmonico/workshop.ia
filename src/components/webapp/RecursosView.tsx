import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Download, 
  FolderKanban, 
  Terminal, 
  FileText, 
  MapPin, 
  HelpCircle,
  Copy,
  ExternalLink,
  Layers,
  ArrowRight,
  Wrench
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PromptSynthesizerTab } from './PromptSynthesizerTab';
import { SyllabusTab } from './SyllabusTab';
import { ProblemMapTab } from './ProblemMapTab';
import { ExportTab } from './ExportTab';
import { ToolboxTab } from './ToolboxTab';

export const RecursosView: React.FC = () => {
  const { appState, setActiveWebappTab } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'exportar' | 'mapa' | 'prompts' | 'materiais' | 'ferramentas'>(() => {
    if (appState.activeWebappTab === 'ferramentas' || appState.activeWebappTab === 'caixa-ferramentas') {
      return 'ferramentas';
    }
    return 'exportar';
  });

  useEffect(() => {
    if (appState.activeWebappTab === 'ferramentas' || appState.activeWebappTab === 'caixa-ferramentas') {
      setActiveSubTab('ferramentas');
    }
  }, [appState.activeWebappTab]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 px-4 sm:px-6">
      
      {/* Header & Subtabs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            Recursos do Participante • Ferramentas & Apoio
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Consulte opções de exportação e backup, mapa de problemas, biblioteca de prompts, ementa do método e caixa de ferramentas de IA.
          </p>
        </div>

        {/* Subtab selector */}
        <div 
          role="tablist" 
          aria-label="Abas de Recursos e Ferramentas" 
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 dark:border-slate-800 pt-3"
        >
          {/* 1. Exportar/Importar Backup */}
          <button
            id="subtab-exportar"
            role="tab"
            aria-selected={activeSubTab === 'exportar'}
            aria-controls="subtabpanel-exportar"
            onClick={() => setActiveSubTab('exportar')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
              activeSubTab === 'exportar'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Exportar/Importar Backup</span>
          </button>

          {/* 2. Mapa de Problemas */}
          <button
            id="subtab-mapa"
            role="tab"
            aria-selected={activeSubTab === 'mapa'}
            aria-controls="subtabpanel-mapa"
            onClick={() => setActiveSubTab('mapa')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
              activeSubTab === 'mapa'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span>Mapa de Problemas</span>
          </button>

          {/* 3. Biblioteca de Prompts */}
          <button
            id="subtab-prompts"
            role="tab"
            aria-selected={activeSubTab === 'prompts'}
            aria-controls="subtabpanel-prompts"
            onClick={() => setActiveSubTab('prompts')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
              activeSubTab === 'prompts'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Terminal className="w-4 h-4" aria-hidden="true" />
            <span>Biblioteca de Prompts</span>
          </button>

          {/* 4. Ementa do Método */}
          <button
            id="subtab-materiais"
            role="tab"
            aria-selected={activeSubTab === 'materiais'}
            aria-controls="subtabpanel-materiais"
            onClick={() => setActiveSubTab('materiais')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
              activeSubTab === 'materiais'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Ementa do Método</span>
          </button>

          {/* 5. Caixa de Ferramentas */}
          <button
            id="subtab-ferramentas"
            role="tab"
            aria-selected={activeSubTab === 'ferramentas'}
            aria-controls="subtabpanel-ferramentas"
            onClick={() => setActiveSubTab('ferramentas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
              activeSubTab === 'ferramentas'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Wrench className="w-4 h-4" aria-hidden="true" />
            <span>Caixa de Ferramentas</span>
          </button>
        </div>
      </div>

      {/* SUBTAB CONTENTS WITH ROLE TABPANEL */}
      {activeSubTab === 'exportar' && (
        <div id="subtabpanel-exportar" role="tabpanel" aria-labelledby="subtab-exportar">
          <ExportTab />
        </div>
      )}

      {activeSubTab === 'mapa' && (
        <div id="subtabpanel-mapa" role="tabpanel" aria-labelledby="subtab-mapa">
          <ProblemMapTab />
        </div>
      )}

      {activeSubTab === 'prompts' && (
        <div id="subtabpanel-prompts" role="tabpanel" aria-labelledby="subtab-prompts" className="space-y-4">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-xs text-amber-950 dark:text-amber-200 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-start gap-2 max-w-2xl">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="text-slate-900 dark:text-white font-extrabold">Dica prática:</strong> Durante a realização da oficina na aba <strong>Etapa Atual</strong>, as orientações de cada momento com o histórico acumulado do seu projeto já são organizadas automaticamente. Esta biblioteca serve para consultas diretas e aprofundamento da equipe.
              </div>
            </div>
            <button
              onClick={() => {
                setActiveWebappTab('jornada');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-2 rounded-xl font-extrabold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 shrink-0 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <span>Ir para 1. Jornada</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
          <PromptSynthesizerTab />
        </div>
      )}

      {activeSubTab === 'materiais' && (
        <div id="subtabpanel-materiais" role="tabpanel" aria-labelledby="subtab-materiais">
          <SyllabusTab />
        </div>
      )}

      {activeSubTab === 'ferramentas' && (
        <div id="subtabpanel-ferramentas" role="tabpanel" aria-labelledby="subtab-ferramentas">
          <ToolboxTab />
        </div>
      )}

    </div>
  );
};
