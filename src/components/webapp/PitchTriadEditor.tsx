import React, { useState } from 'react';
import { 
  FileText, 
  Mic, 
  Sparkles, 
  Copy, 
  Check, 
  Sliders, 
  Edit3,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PitchTriadEditor: React.FC<{
  onSyncDraft?: (unifiedContent: string) => void;
}> = ({ onSyncDraft }) => {
  const { state, updateProjectData } = useApp();
  const projectData = (state.projectData || {}) as Record<string, any>;

  const [activeTab, setActiveTab] = useState<'estrutura' | 'integral' | 'sintese'>('estrutura');
  const [copiedPart, setCopiedPart] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedPart(key);
    setTimeout(() => setCopiedPart(null), 2000);
  };

  const handleFieldChange = (field: string, val: string) => {
    updateProjectData({ [field]: val });

    if (onSyncDraft) {
      const fullText = `=== ESTRUTURA DO PITCH ===\n${field === 'v3PitchStructure' ? val : (projectData.v3PitchStructure || '')}\n\n=== PITCH INTEGRAL ===\n${field === 'v3PitchScript' ? val : (projectData.v3PitchScript || '')}\n\n=== SÍNTESE DO PITCH ===\n${field === 'v3PitchSummary' ? val : (projectData.v3PitchSummary || '')}`;
      onSyncDraft(fullText);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('estrutura')}
            className={`min-h-[44px] flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center justify-center gap-1.5 touch-manipulation ${
              activeTab === 'estrutura'
                ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1. Estrutura</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('integral')}
            className={`min-h-[44px] flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center justify-center gap-1.5 touch-manipulation ${
              activeTab === 'integral'
                ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>2. Fala Integral</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sintese')}
            className={`min-h-[44px] flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center justify-center gap-1.5 touch-manipulation ${
              activeTab === 'sintese'
                ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>3. Síntese</span>
          </button>
        </div>

        <div className="text-2xs font-extrabold text-slate-500 hidden sm:inline">
          Tríade do Pitch V1.4.1
        </div>
      </div>

      {/* TAB 1: ESTRUTURA DO PITCH */}
      {activeTab === 'estrutura' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
              <Layers className="w-4 h-4" />
              <span>ESTRUTURA DA NARRATIVA EM BLOCOS</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('estrutura', projectData.v3PitchStructure || '')}
              disabled={!projectData.v3PitchStructure}
              className="px-2.5 py-1 text-2xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer disabled:opacity-40"
            >
              {copiedPart === 'estrutura' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedPart === 'estrutura' ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>

          <p className="text-2xs text-slate-500 dark:text-slate-400">
            Arco narrativo em 4 ou 5 blocos claros (Problema/Gancho, Solução, Protótipo e Testes, Evolução V1 e Próximos Passos).
          </p>

          <textarea
            rows={6}
            value={projectData.v3PitchStructure || ''}
            onChange={(e) => handleFieldChange('v3PitchStructure', e.target.value)}
            placeholder={`BLOCO 1: Gancho & Problema Real (30s)\nBLOCO 2: Propósito & Conceito da Solução (45s)\nBLOCO 3: Protótipo e O Que Aprendemos nos Testes (60s)\nBLOCO 4: Evolução para V1 & Próximos Passos (45s)`}
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 leading-relaxed"
          />
        </div>
      )}

      {/* TAB 2: PITCH INTEGRAL */}
      {activeTab === 'integral' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
              <Mic className="w-4 h-4" />
              <span>TEXTO INTEGRAL DA FALA ORAL</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('integral', projectData.v3PitchScript || '')}
              disabled={!projectData.v3PitchScript}
              className="px-2.5 py-1 text-2xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer disabled:opacity-40"
            >
              {copiedPart === 'integral' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedPart === 'integral' ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>

          <p className="text-2xs text-slate-500 dark:text-slate-400">
            Escrito em primeira pessoa ("Nós percebemos...", "Quando testamos..."), com tom humano e ritmo de conversa.
          </p>

          <textarea
            rows={10}
            value={projectData.v3PitchScript || ''}
            onChange={(e) => handleFieldChange('v3PitchScript', e.target.value)}
            placeholder="Escreva a fala oral completa exatamente como a equipe irá apresentar no dia..."
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 leading-relaxed"
          />
        </div>
      )}

      {/* TAB 3: SÍNTESE DO PITCH */}
      {activeTab === 'sintese' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400">
              <FileText className="w-4 h-4" />
              <span>SÍNTESE DO PITCH (PARÁGRAFO ÚNICO)</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('sintese', projectData.v3PitchSummary || '')}
              disabled={!projectData.v3PitchSummary}
              className="px-2.5 py-1 text-2xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer disabled:opacity-40"
            >
              {copiedPart === 'sintese' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedPart === 'sintese' ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>

          <p className="text-2xs text-slate-500 dark:text-slate-400">
            Resumo executivo em 3 a 5 linhas conectando dor, proposta de valor, aprendizado dos testes e próximo passo.
          </p>

          <textarea
            rows={4}
            value={projectData.v3PitchSummary || ''}
            onChange={(e) => handleFieldChange('v3PitchSummary', e.target.value)}
            placeholder="Escreva a síntese em parágrafo único do pitch da equipe..."
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 leading-relaxed"
          />
        </div>
      )}
    </div>
  );
};
