/**
 * Prompt Library Tab Component V3
 * Read-only reference for Prompt Zero (IARA Core) and Prompts P01..P11.
 * Invariant: Does not offer isolated "pure prompt" execution; execution happens via Etapa Atual.
 */
import React, { useState } from 'react';
import { BookOpen, Check, FileCode, Info, Lock } from 'lucide-react';
import { PROMPTS_V3 } from '../../domain/v3/promptRegistry.ts';
import { getArtifactOrThrow } from '../../domain/v3/artifactRegistry.ts';
import { getActivityOrThrow } from '../../domain/v3/journeyRegistry.ts';

export const PromptLibraryTab: React.FC = () => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>('P00');

  const selectedPrompt = PROMPTS_V3.find((p) => p.id === selectedPromptId) || PROMPTS_V3[0];
  const associatedActivity = selectedPrompt.activityId
    ? getActivityOrThrow(selectedPrompt.activityId)
    : null;
  const associatedArtifact = selectedPrompt.outputArtifactId
    ? getArtifactOrThrow(selectedPrompt.outputArtifactId)
    : null;

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-2">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
          <BookOpen className="w-4 h-4" />
          <span>Biblioteca Canônica de Prompts (Read-Only)</span>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed">
          Esta biblioteca é uma referência transparente do comportamento esperado da IARA e dos contratos metodológicos. <strong>A execução nunca acontece isolada:</strong> o webapp constrói o Context Pack completo e contextualizado com seu SOW vigente na aba <em>Etapa Atual</em>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Prompt Selector List */}
        <div className="space-y-1.5 md:col-span-1">
          {PROMPTS_V3.map((p) => {
            const isSelected = p.id === selectedPromptId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPromptId(p.id)}
                className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs transition-all ${
                  isSelected
                    ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold shadow-sm'
                    : 'bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800/80 text-neutral-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                    {p.id}
                  </span>
                  <span className="truncate">{p.title.split('—')[1] || p.title}</span>
                </div>
                {p.id === 'P00' && (
                  <span className="text-[10px] rounded bg-amber-400/20 px-1 text-amber-300">
                    Core
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Prompt Details */}
        <div className="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 space-y-5 shadow-xl">
          <div className="border-b border-neutral-800 pb-4">
            <div className="flex items-center space-x-2 text-xs mb-1">
              <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                {selectedPrompt.id}
              </span>
              {associatedActivity && (
                <span className="text-neutral-400">
                  Atividade: {associatedActivity.id} • Artefato: {associatedArtifact?.id}
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-neutral-100">{selectedPrompt.title}</h2>
            <p className="text-xs text-neutral-400 mt-1">{selectedPrompt.objective}</p>
          </div>

          {/* Operational Body */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-2">
              Instruções Operacionais da IARA
            </h3>
            <div className="rounded-xl bg-neutral-950 p-4 border border-neutral-800 font-mono text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
              {selectedPrompt.operationalBody}
            </div>
          </div>

          {/* Output Schema if applicable */}
          {associatedArtifact && (
            <div>
              <h3 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-2">
                Schema Canônico de Retorno ({associatedArtifact.id})
              </h3>
              <div className="rounded-xl bg-neutral-950 p-4 border border-neutral-800 font-mono text-[11px] text-emerald-300/90 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                {associatedArtifact.markdownTemplate}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
