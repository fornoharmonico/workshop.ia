/**
 * My Project View Component V3
 * Read-only semantic view of the canonical project:
 * - Title & Team
 * - Current SOW (State of Work) reader
 * - Consolidated Artifacts cards
 * - Secondary "Gerenciar Projeto" modal trigger
 */
import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Edit2,
  FileCheck,
  FileText,
  FolderLock,
  Layers,
  RefreshCw,
  Settings,
  Sparkles,
} from 'lucide-react';
import { ACTIVITIES_V3 } from '../../domain/v3/journeyRegistry.ts';
import { getArtifactOrThrow } from '../../domain/v3/artifactRegistry.ts';
import { ActivityId } from '../../domain/v3/types.ts';
import { useProject } from '../../state/ProjectContext.tsx';
import { useSession } from '../../state/SessionContext.tsx';
import { ManageProjectModal } from './ManageProjectModal.tsx';
import { DossierModal } from './DossierModal.tsx';

export const MyProjectView: React.FC = () => {
  const { project, updateProjectMeta } = useProject();
  const { setViewedActivityId, setActiveTab } = useSession();

  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [nameInput, setNameInput] = useState(project.project.name || '');
  const [teamInput, setTeamInput] = useState(project.project.teamName || '');
  const [expandedArtifactId, setExpandedArtifactId] = useState<string | null>(null);

  const handleSaveMeta = (e: React.FormEvent) => {
    e.preventDefault();
    updateProjectMeta(nameInput, teamInput);
    setIsEditingTitle(false);
  };

  const handleReviseActivity = (actId: ActivityId) => {
    setViewedActivityId(actId);
    setActiveTab('current');
  };

  const consolidatedEntries = Object.entries(project.artifacts);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 space-y-8">
      {/* Top Project Header Card */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-800 pb-4">
          {!isEditingTitle ? (
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Visão Geral do Projeto
                </span>
                <button
                  onClick={() => {
                    setNameInput(project.project.name || '');
                    setTeamInput(project.project.teamName || '');
                    setIsEditingTitle(true);
                  }}
                  className="text-neutral-500 hover:text-amber-400 p-0.5"
                  title="Editar nome do projeto e equipe"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-100 mt-0.5">
                {project.project.name || 'Sem título'}
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Equipe: <strong className="text-neutral-200">{project.project.teamName || 'Equipe Alfa'}</strong> • Criado em {new Date(project.project.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSaveMeta} className="flex-1 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Nome do Projeto"
                  className="rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-100"
                />
                <input
                  type="text"
                  value={teamInput}
                  onChange={(e) => setTeamInput(e.target.value)}
                  placeholder="Nome da Equipe"
                  className="rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-100"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="rounded-lg bg-amber-500 px-3 py-1 text-xs font-bold text-neutral-950"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingTitle(false)}
                  className="text-xs text-neutral-400 px-2 py-1"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          {/* Manage Project Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsManageModalOpen(true)}
              className="flex items-center space-x-2 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-4 py-2 text-xs font-semibold text-neutral-200 transition-colors shadow-sm"
            >
              <Settings className="w-4 h-4 text-amber-400" />
              <span>Gerenciar Projeto</span>
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800">
            <span className="text-[11px] text-neutral-500 block">Artefatos Vigentes</span>
            <span className="font-mono text-base font-bold text-emerald-400">
              {consolidatedEntries.length} de 11
            </span>
          </div>
          <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800">
            <span className="text-[11px] text-neutral-500 block">Status do SOW</span>
            <span className="font-mono text-xs font-semibold text-neutral-300">
              Vigente e Ativo
            </span>
          </div>
          <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800 col-span-2 sm:col-span-1">
            <span className="text-[11px] text-neutral-500 block">Modo Operacional</span>
            <span className="text-xs font-medium text-amber-400">
              Local-first / Client-only
            </span>
          </div>
        </div>
      </div>

      {/* STATE OF WORK (SOW) VIGENTE SECTION */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-neutral-100 uppercase tracking-wider">
              State of Work (SOW) Vigente
            </h2>
          </div>
          <span className="text-[11px] text-neutral-500 font-mono">
            Única fonte da verdade operacional
          </span>
        </div>

        <div className="rounded-xl bg-neutral-950 p-4 border border-neutral-800 font-mono text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
          {project.currentSow}
        </div>
      </div>

      {/* CONSOLIDATED ARTIFACTS CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-200 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Artefatos Consolidados ({consolidatedEntries.length}/11)</span>
          </h2>
          <span className="text-xs text-neutral-400">
            Edição semântica ocorre somente via Atividade
          </span>
        </div>

        {consolidatedEntries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/50 p-8 text-center text-xs text-neutral-400 space-y-2">
            <Layers className="w-8 h-8 text-neutral-600 mx-auto" />
            <p className="font-semibold text-neutral-300">Nenhum artefato consolidado ainda.</p>
            <p>
              Execute a atividade <strong>A01 — Ponto de Partida</strong> na aba "Etapa Atual" para gerar seu primeiro artefato.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {ACTIVITIES_V3.map((act) => {
              const record = project.artifacts[act.artifactId];
              if (!record) return null;
              const def = getArtifactOrThrow(act.artifactId);
              const isExpanded = expandedArtifactId === act.artifactId;

              return (
                <div
                  key={act.artifactId}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-lg space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-neutral-800/80 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                        {act.artifactId}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-neutral-100">{act.title}</h3>
                        <p className="text-[11px] text-neutral-400">
                          Consolidado em {new Date(record.consolidatedAt).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {record.status === 'REVALIDACAO_RECOMENDADA' ? (
                        <span className="flex items-center space-x-1 rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300 border border-amber-500/20">
                          <RefreshCw className="w-3 h-3 animate-spin-slow" />
                          <span>Revalidação Pendente</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Vigente</span>
                        </span>
                      )}

                      <button
                        onClick={() => handleReviseActivity(act.id)}
                        className="rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 px-3 py-1 text-xs font-semibold transition-colors flex items-center space-x-1"
                        title="Revisar esta etapa através do fluxo canônico"
                      >
                        <span>Revisar</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Body preview / accordion */}
                  <div>
                    <div
                      className={`font-mono text-xs text-neutral-300 bg-neutral-950 p-4 rounded-xl border border-neutral-800/80 leading-relaxed whitespace-pre-wrap ${
                        isExpanded ? '' : 'max-h-36 overflow-hidden relative'
                      }`}
                    >
                      {record.body}
                      {!isExpanded && (
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
                      )}
                    </div>
                    <button
                      onClick={() =>
                        setExpandedArtifactId(isExpanded ? null : act.artifactId)
                      }
                      className="mt-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      {isExpanded ? 'Recolher documento' : 'Ler documento completo'}
                    </button>
                  </div>

                  {/* Stored Human Observation if present */}
                  {record.humanObservation && (
                    <div className="rounded-xl bg-neutral-950/60 p-3 border border-neutral-800/60 text-xs text-neutral-400">
                      <strong className="text-neutral-300">Observação da equipe:</strong>{' '}
                      "{record.humanObservation.text}"
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      <ManageProjectModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
      />
      <DossierModal />
    </div>
  );
};
