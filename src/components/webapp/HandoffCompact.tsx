import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { CanonicalHandoff, ActivityId } from '../../types/canonical';

export interface HandoffCompactProps {
  handoff: CanonicalHandoff;
  activityTitle?: string;
  isCompleted?: boolean;
  onAdvance?: (nextActivityId?: ActivityId) => void;
  advanceButtonLabel?: string;
  className?: string;
}

/**
 * Componente canônico compacto de Handoff (Passagem de Bastão V1.4.1):
 * - VOCÊ CONCLUIU (youConcluded)
 * - O QUE MUDOU (whatChanged)
 * - PRODUZIMOS (weProduced) [opcional/omitido se vazio]
 * - AINDA ESTÁ EM ABERTO (stillOpen) [opcional/omitido se vazio]
 * - AGORA (nextStep)
 * 
 * Regra Arquitetural:
 * - Campos sem conteúdo são omitidos sem quebras visuais.
 * - Apresentação densa, limpa e com economia visual.
 */
export const HandoffCompact: React.FC<HandoffCompactProps> = ({
  handoff,
  activityTitle,
  isCompleted = true,
  onAdvance,
  advanceButtonLabel,
  className = '',
}) => {
  const hasStillOpen = handoff.stillOpen && handoff.stillOpen.length > 0;
  const hasProduced = Boolean(handoff.weProduced && handoff.weProduced.trim());
  const hasWhatChanged = Boolean(handoff.whatChanged && handoff.whatChanged.trim());

  return (
    <div className={`border rounded-3xl p-5 sm:p-6 transition-all ${
      isCompleted
        ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
        : 'bg-slate-50/90 dark:bg-slate-950/90 border-slate-200/80 dark:border-slate-800/80'
    } ${className}`}>
      
      {/* Header Compacto */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-2xs font-black flex items-center justify-center">
            ✓
          </span>
          <div>
            <span className="text-2xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              PASSAGEM DE BASTÃO • HANDOFF CANÔNICO
            </span>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              {handoff.youConcluded || activityTitle || 'Atividade Concluída'}
            </h3>
          </div>
        </div>

        {isCompleted ? (
          <span className="text-2xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Concluído</span>
          </span>
        ) : (
          <span className="text-2xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-300 dark:border-amber-700">
            Em Andamento
          </span>
        )}
      </div>

      {/* Grid de Informações Compactas (Campos vazios são omitidos) */}
      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        
        {/* 1. VOCÊ CONCLUIU */}
        <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between">
          <span className="text-2xs font-black text-slate-500 uppercase block mb-1">
            Você Concluiu
          </span>
          <span className="font-extrabold text-slate-900 dark:text-slate-100 text-xs">
            {handoff.youConcluded}
          </span>
        </div>

        {/* 2. O QUE MUDOU */}
        {hasWhatChanged && (
          <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between">
            <span className="text-2xs font-black text-emerald-700 dark:text-emerald-400 uppercase block mb-1">
              O Que Mudou
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs leading-relaxed">
              {handoff.whatChanged}
            </span>
          </div>
        )}

        {/* 3. PRODUZIMOS (Omitido se não gerou artefato/evidência) */}
        {hasProduced && (
          <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between">
            <span className="text-2xs font-black text-blue-700 dark:text-blue-400 uppercase block mb-1">
              Produzimos
            </span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-xs flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>{handoff.weProduced}</span>
            </span>
          </div>
        )}

        {/* 4. AINDA ESTÁ EM ABERTO (Omitido se não houver pendências) */}
        {hasStillOpen && (
          <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between">
            <span className="text-2xs font-black text-amber-700 dark:text-amber-400 uppercase block mb-1">
              Ainda Está em Aberto
            </span>
            <ul className="space-y-1 font-semibold text-slate-800 dark:text-slate-200 text-xs">
              {handoff.stillOpen!.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 5. AGORA / PRÓXIMO PASSO (Sempre presente) */}
        <div className={`bg-amber-500/10 dark:bg-amber-500/5 p-3.5 rounded-2xl border border-amber-500/20 flex flex-col justify-between ${
          !hasProduced || !hasStillOpen ? 'sm:col-span-2' : 'sm:col-span-2'
        }`}>
          <span className="text-2xs font-black text-amber-700 dark:text-amber-400 uppercase block mb-1">
            Agora (Próximo Passo)
          </span>
          <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">
            {handoff.nextStep}
          </span>
        </div>

      </div>

      {/* Ação de Avançar */}
      {onAdvance && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
          <button
            onClick={() => onAdvance(handoff.nextActivityId)}
            className="btn-interactive min-h-[44px] w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md active:shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
          >
            <span>{advanceButtonLabel || 'Ir para o Próximo Passo'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
