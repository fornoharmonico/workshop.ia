/**
 * Journey Map View Component V3
 * Visual overview of the 4 Movements and 11 Activities.
 * Allows inspecting any activity without altering canonical active progress.
 */
import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  FileCheck,
  Lock,
  RefreshCw,
} from 'lucide-react';
import { MOVEMENTS_V3 } from '../../domain/v3/journeyRegistry.ts';
import { getActivityOrThrow } from '../../domain/v3/journeyRegistry.ts';
import { getArtifactOrThrow } from '../../domain/v3/artifactRegistry.ts';
import { ActivityId, ActivityStatus } from '../../domain/v3/types.ts';
import { useProject } from '../../state/ProjectContext.tsx';
import { useDraft } from '../../state/DraftContext.tsx';
import { useSession } from '../../state/SessionContext.tsx';
import {
  getActivityStatus,
  getCanonicalCurrentActivity,
  getProgressSummary,
} from '../../services/progressDerived.ts';

export const JourneyMapView: React.FC = () => {
  const { project } = useProject();
  const { drafts } = useDraft();
  const { setViewedActivityId, setActiveTab } = useSession();

  const canonicalId = getCanonicalCurrentActivity(project, drafts);
  const progress = getProgressSummary(project, drafts);

  // Inspector state for viewing activity details in a modal
  const [selectedActId, setSelectedActId] = useState<ActivityId | null>(null);

  const getStatusBadge = (status: ActivityStatus) => {
    switch (status) {
      case 'CONCLUIDA':
        return (
          <span className="flex items-center space-x-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            <span>Concluída</span>
          </span>
        );
      case 'REVALIDACAO_RECOMENDADA':
        return (
          <span className="flex items-center space-x-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-300 border border-amber-500/20">
            <RefreshCw className="w-3 h-3 animate-spin-slow" />
            <span>Revalidar</span>
          </span>
        );
      case 'EM_ANDAMENTO':
        return (
          <span className="flex items-center space-x-1 rounded-md bg-amber-500/20 px-2 py-0.5 text-[11px] font-semibold text-amber-200 border border-amber-500/40">
            <span>Em andamento</span>
          </span>
        );
      case 'BLOQUEADA':
        return (
          <span className="flex items-center space-x-1 rounded-md bg-neutral-800 px-2 py-0.5 text-[11px] font-medium text-neutral-400 border border-neutral-700">
            <Lock className="w-3 h-3 text-neutral-400" />
            <span>Bloqueada</span>
          </span>
        );
      case 'NAO_INICIADA':
        return (
          <span className="flex items-center space-x-1 rounded-md bg-neutral-800/60 px-2 py-0.5 text-[11px] font-medium text-neutral-400">
            <span>Não iniciada</span>
          </span>
        );
    }
  };

  const handleOpenActivity = (actId: ActivityId) => {
    setViewedActivityId(actId);
    setActiveTab('current');
  };

  const selectedActivity = selectedActId ? getActivityOrThrow(selectedActId) : null;
  const selectedArtifact = selectedActivity ? getArtifactOrThrow(selectedActivity.artifactId) : null;
  const selectedStatus = selectedActId ? getActivityStatus(selectedActId, project, drafts) : null;
  const selectedConsolidatedRecord = selectedActivity ? project.artifacts[selectedActivity.artifactId] : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 space-y-8">
      {/* Top Summary Bar */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Mapa Geral da Jornada
            </span>
            <h1 className="text-xl font-bold text-neutral-100">
              11 Atividades Canônicas em 4 Movimentos
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <span className="text-xs text-neutral-400 block">Progresso geral</span>
              <span className="font-mono text-base font-bold text-amber-400">
                {progress.completedCount} / 11 ({progress.percentage}%)
              </span>
            </div>
            {progress.revalidationCount > 0 && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300">
                <span className="font-bold">{progress.revalidationCount}</span> revalidação pendente
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* 4 Movements Grid */}
      <div className="space-y-8">
        {MOVEMENTS_V3.map((mov) => (
          <div key={mov.id} className="space-y-3">
            <div className="flex items-baseline justify-between border-b border-neutral-800/80 pb-2">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-200">
                  {mov.title}
                </h2>
                <p className="text-xs text-neutral-400">{mov.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {mov.activityIds.map((actId) => {
                const act = getActivityOrThrow(actId);
                const status = getActivityStatus(actId, project, drafts);
                const isCanonical = actId === canonicalId;
                const record = project.artifacts[act.artifactId];

                return (
                  <div
                    key={actId}
                    onClick={() => setSelectedActId(actId)}
                    className={`group relative rounded-2xl border p-4 transition-all cursor-pointer flex flex-col justify-between ${
                      isCanonical
                        ? 'border-amber-500/50 bg-neutral-900/90 shadow-md shadow-amber-500/10 ring-1 ring-amber-500/30'
                        : 'border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                            {act.id}
                          </span>
                          <span className="text-[11px] text-neutral-400 font-mono flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-neutral-500" />
                            <span>{act.estimatedMinutes} min</span>
                          </span>
                        </div>
                        {getStatusBadge(status)}
                      </div>

                      <h3 className="text-sm font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                        {act.title}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                        {act.objective}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px]">
                      <span className="font-mono text-neutral-400">
                        Artefato: <strong className="text-neutral-300">{act.artifactId}</strong>
                      </span>
                      <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center space-x-1">
                        <span>Ver detalhes</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Activity Details Inspector Modal */}
      {selectedActivity && selectedArtifact && selectedStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative flex flex-col max-h-[85vh] w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 bg-neutral-950/60">
              <div className="flex items-center space-x-2.5">
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {selectedActivity.id}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-neutral-100">{selectedActivity.title}</h3>
                  <p className="text-[11px] text-neutral-400">
                    Encontro {selectedActivity.meetingRecommended} • {selectedActivity.estimatedMinutes} minutos
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedActId(null)}
                className="rounded-lg p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs text-neutral-300">
              <div>
                <h4 className="font-semibold text-neutral-200 uppercase tracking-wider text-[11px] mb-1">
                  Objetivo Pedagógico
                </h4>
                <p className="leading-relaxed bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                  {selectedActivity.objective}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-200 uppercase tracking-wider text-[11px] mb-1">
                  Decisões Humanas Requeridas
                </h4>
                <ul className="list-disc list-inside space-y-1 bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-neutral-300">
                  {selectedActivity.humanDecisions.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              {selectedConsolidatedRecord && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">
                      Artefato Consolidado ({selectedActivity.artifactId})
                    </h4>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      Status: {selectedConsolidatedRecord.status}
                    </span>
                  </div>
                  <div className="max-h-48 overflow-y-auto bg-neutral-950 p-3 rounded-xl border border-neutral-800 font-mono text-[11px] whitespace-pre-wrap text-neutral-300">
                    {selectedConsolidatedRecord.body}
                  </div>
                </div>
              )}

              {selectedStatus === 'BLOQUEADA' && (
                <div className="rounded-xl border border-rose-800/40 bg-rose-950/30 p-3.5 text-rose-200 space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Esta etapa está bloqueada</span>
                  </div>
                  <p className="text-[11px]">
                    Para executar esta atividade, você precisa concluir primeiro:{' '}
                    <strong>{selectedActivity.requiredContext.join(', ')}</strong>.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="border-t border-neutral-800 px-6 py-4 bg-neutral-950/60 flex items-center justify-between">
              <button
                onClick={() => setSelectedActId(null)}
                className="text-neutral-400 hover:text-neutral-100 text-xs"
              >
                Fechar
              </button>

              <button
                onClick={() => {
                  setSelectedActId(null);
                  handleOpenActivity(selectedActivity.id);
                }}
                className="flex items-center space-x-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2 text-xs transition-colors shadow-sm shadow-amber-500/20"
              >
                <span>
                  {selectedStatus === 'CONCLUIDA'
                    ? 'Revisar / Abrir Etapa'
                    : selectedStatus === 'REVALIDACAO_RECOMENDADA'
                    ? 'Revalidar esta Etapa'
                    : 'Ir para esta Etapa'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
