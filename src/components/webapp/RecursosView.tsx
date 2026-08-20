import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Download, 
  ShieldCheck, 
  FolderKanban, 
  Terminal, 
  FileText, 
  MapPin, 
  HelpCircle,
  Copy,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PromptSynthesizerTab } from './PromptSynthesizerTab';
import { SyllabusTab } from './SyllabusTab';
import { ProblemMapTab } from './ProblemMapTab';
import { ExportTab } from './ExportTab';

export const RecursosView: React.FC = () => {
  const { setActiveWebappTab } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'prompts' | 'materiais' | 'mapa' | 'exportar' | 'etica'>('prompts');

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
            Consulte a biblioteca de prompts, guia de materiais, mapa de problemas, opções de exportação e diretrizes de ética em IA.
          </p>
        </div>

        {/* Subtab selector */}
        <div 
          role="tablist" 
          aria-label="Abas de Recursos e Ferramentas" 
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 dark:border-slate-800 pt-3"
        >
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
            <span>Ementa & Guia do Método</span>
          </button>

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
            <span>Exportar & Backup</span>
          </button>

          <button
            id="subtab-etica"
            role="tab"
            aria-selected={activeSubTab === 'etica'}
            aria-controls="subtabpanel-etica"
            onClick={() => setActiveSubTab('etica')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
              activeSubTab === 'etica'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Ética & LGPD</span>
          </button>
        </div>
      </div>

      {/* SUBTAB CONTENTS WITH ROLE TABPANEL */}
      {activeSubTab === 'prompts' && (
        <div id="subtabpanel-prompts" role="tabpanel" aria-labelledby="subtab-prompts" className="space-y-4">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-xs text-amber-950 dark:text-amber-200 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-start gap-2 max-w-2xl">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="text-slate-900 dark:text-white font-extrabold">Dica importante:</strong> Durante a execução da jornada na aba <strong>Atividade Atual</strong>, o prompt específico de cada etapa com seu Context Pack é injetado automaticamente! Esta biblioteca serve para consultas diretas ou adaptações livres da equipe.
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

      {activeSubTab === 'mapa' && (
        <div id="subtabpanel-mapa" role="tabpanel" aria-labelledby="subtab-mapa">
          <ProblemMapTab />
        </div>
      )}

      {activeSubTab === 'exportar' && (
        <div id="subtabpanel-exportar" role="tabpanel" aria-labelledby="subtab-exportar">
          <ExportTab />
        </div>
      )}

      {activeSubTab === 'etica' && (
        <div id="subtabpanel-etica" role="tabpanel" aria-labelledby="subtab-etica" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
                Uso Responsável & Seguro da IA
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Diretrizes fundamentais para o trabalho de investigação e prototipação no workshop O FORNO.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
                🔒 1. Proteção de Dados Pessoais
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Nunca insira nomes completos, CPF, telefones, fotos pessoais ou dados confidenciais de colegas e moradores nos prompts. Trate a IA como um ambiente público.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
                ✍️ 2. Autoria & Decisão da Equipe
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                A IA é um copiloto de raciocínio, não a autora do seu projeto. Nenhuma resposta da IA deve entrar no projeto sem a validação crítica da equipe no Checkpoint.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
                🔍 3. Verificação de Alucinações
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Modelos de linguagem podem inventar dados ou dados estatísticos ("alucinações"). Sempre distinga entre fatos observados e suposições da IA.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
                🤝 4. Colaboração Transparente
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Documente de forma transparente quais ferramentas de IA foram utilizadas (por exemplo: ChatGPT, Claude, v0) e para quais finalidades.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
