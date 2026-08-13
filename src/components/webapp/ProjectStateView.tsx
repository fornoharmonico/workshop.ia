import React, { useState } from 'react';
import { 
  CheckCircle2, 
  History, 
  FileText, 
  HelpCircle, 
  AlertCircle, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ArtifactVersion, EpistemologicalStatus, ProjectClaim } from '../../types/workshop';

export const ProjectStateView: React.FC = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'estado' | 'historico'>('estado');
  const [expandedVersionId, setExpandedVersionId] = useState<string | null>(null);

  const projectState = state.projectStateV2 || {};
  const artifactVersions = state.artifactVersions || [];

  const getEpistemologicalBadge = (status?: EpistemologicalStatus) => {
    switch (status) {
      case 'DECIDIDO':
        return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 text-2xs font-extrabold rounded-md uppercase tracking-wider">DECIDIMOS</span>;
      case 'OBSERVADO':
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 text-2xs font-extrabold rounded-md uppercase tracking-wider">OBSERVAMOS</span>;
      case 'HIPOTESE':
        return <span className="px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 text-2xs font-extrabold rounded-md uppercase tracking-wider">ACHAMOS QUE...</span>;
      case 'NAO_TESTADO':
        return <span className="px-2 py-0.5 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-2xs font-extrabold rounded-md uppercase tracking-wider">AINDA NÃO TESTAMOS</span>;
      case 'VALIDADO':
        return <span className="px-2 py-0.5 bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 text-2xs font-extrabold rounded-md uppercase tracking-wider">VALIDADO</span>;
      default:
        return <span className="px-2 py-0.5 bg-slate-100 text-slate-600 dark:bg-slate-800 text-2xs font-bold rounded-md">REGISTRADO</span>;
    }
  };

  const getArtifactStatusBadge = (status: ArtifactVersion['status']) => {
    switch (status) {
      case 'CONSOLIDADO':
        return <span className="px-2.5 py-1 bg-emerald-500 text-slate-950 text-2xs font-black rounded-lg flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> ATUAL (CONSOLIDADO)</span>;
      case 'EM_CONSTRUCAO':
        return <span className="px-2.5 py-1 bg-amber-500/20 text-amber-700 dark:text-amber-300 text-2xs font-bold rounded-lg border border-amber-500/30">RASCUNHO EM CONSTRUÇÃO</span>;
      case 'SUPERADO':
        return <span className="px-2.5 py-1 bg-slate-200 dark:bg-slate-800 text-slate-500 text-2xs font-medium rounded-lg line-through">VERSÃO ANTERIOR</span>;
    }
  };

  const claimsList: { key: string; label: string; claim?: ProjectClaim }[] = [
    { key: 'problem', label: 'Problema Investigado', claim: projectState.problem },
    { key: 'keyObservations', label: 'Principais Observações', claim: projectState.keyObservations },
    { key: 'openQuestions', label: 'Dúvidas em Aberto / Críticas', claim: projectState.openQuestions },
    { key: 'investigationHypotheses', label: 'Hipóteses de Investigação', claim: projectState.investigationHypotheses },
    { key: 'possibleCauses', label: 'Possíveis Causas (5 Porquês)', claim: projectState.possibleCauses },
    { key: 'audience', label: 'Público-Alvo / Usuários', claim: projectState.audience },
    { key: 'purpose', label: 'Propósito (Golden Circle WHY)', claim: projectState.purpose },
    { key: 'strategicPrinciples', label: 'Princípios Estratégicos (HOW)', claim: projectState.strategicPrinciples },
    { key: 'methodApproach', label: 'Abordagem Metodológica', claim: projectState.methodApproach },
    { key: 'solution', label: 'Solução Definida (WHAT)', claim: projectState.solution },
    { key: 'requirements', label: 'Requisitos Essenciais (PRD)', claim: projectState.requirements },
    { key: 'mvp', label: 'Escopo do MVP', claim: projectState.mvp },
    { key: 'currentPrototype', label: 'Protótipo Atual', claim: projectState.currentPrototype },
    { key: 'evidenceSummary', label: 'Síntese de Evidências', claim: projectState.evidenceSummary },
    { key: 'sustainabilityModel', label: 'Modelo de Sustentação (BMC)', claim: projectState.sustainabilityModel },
    { key: 'roadmap', label: 'Roadmap & Prioridades', claim: projectState.roadmap },
    { key: 'pitch', label: 'Pitch Atual', claim: projectState.pitch },
  ];

  const activeClaims = claimsList.filter((item) => item.claim && item.claim.value && item.claim.value.trim() !== '');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 px-4 sm:px-6">
      {/* Sub-header Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            Meu Projeto V2 — Estado Atual & Memória
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Acompanhe o que o projeto é agora e como as decisões evoluíram.
          </p>
        </div>

        <div className="flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab('estado')}
            className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'estado'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Nosso Projeto Agora
          </button>
          <button
            onClick={() => setActiveTab('historico')}
            className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'historico'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Como Chegamos Até Aqui ({artifactVersions.length})
          </button>
        </div>
      </div>

      {/* TAB 1: NOSSO PROJETO AGORA */}
      {activeTab === 'estado' && (
        <div className="space-y-4">
          {activeClaims.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto opacity-70" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                O Estado Atual ainda está vazio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                À medida que a equipe realiza os checkpoints de autoria nas atividades, as decisões consolidadas aparecerão automaticamente aqui.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {activeClaims.map(({ key, label, claim }) => (
                <div
                  key={key}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-2 relative overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-2xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      {label}
                    </span>
                    <div className="flex items-center gap-2">
                      {getEpistemologicalBadge(claim?.epistemologicalStatus)}
                    </div>
                  </div>

                  <p className="text-xs text-slate-800 dark:text-slate-200 font-mono leading-relaxed whitespace-pre-wrap">
                    {claim?.value}
                  </p>

                  <div className="flex items-center justify-between text-3xs text-slate-400 pt-1 border-t border-slate-100/60 dark:border-slate-800/60">
                    <span>
                      {claim?.sourceActivityId ? `Origem: Atividade ${claim.sourceActivityId}` : 'Origem: Cadastro do Projeto'}
                    </span>
                    <span>
                      Atualizado em: {claim?.updatedAt ? new Date(claim.updatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Recente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: COMO CHEGAMOS ATÉ AQUI (HISTÓRICO DE ARTEFATOS E VERSÕES) */}
      {activeTab === 'historico' && (
        <div className="space-y-4">
          {artifactVersions.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <History className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Nenhuma versão de artefato registrada
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Os artefatos produzidos em cada atividade do workshop ficarão armazenados aqui com todo o seu histórico.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {artifactVersions
                .slice()
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((ver) => {
                  const isExpanded = expandedVersionId === ver.id;
                  return (
                    <div
                      key={ver.id}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-2 transition"
                    >
                      <div
                        onClick={() => setExpandedVersionId(isExpanded ? null : ver.id)}
                        className="flex items-center justify-between cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                {ver.versionName}
                              </span>
                              <span className="text-2xs font-semibold text-slate-500">
                                (Atividade {ver.activityId})
                              </span>
                            </div>
                            <span className="text-3xs text-slate-400">
                              Criado em: {new Date(ver.createdAt).toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {getArtifactStatusBadge(ver.status)}
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                          {ver.provenanceNote && (
                            <p className="text-2xs italic text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-900">
                              ℹ️ {ver.provenanceNote}
                            </p>
                          )}

                          {ver.replacesVersionId && (
                            <div className="text-3xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 p-2 rounded-lg flex items-center gap-1.5">
                              <span>🔄</span>
                              <span>
                                <strong className="text-slate-700 dark:text-slate-300">Substitui versão anterior:</strong> {ver.replacesVersionId}
                              </span>
                            </div>
                          )}

                          {ver.usedArtifactVersionIds && ver.usedArtifactVersionIds.length > 0 && (
                            <div className="text-3xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 p-2 rounded-lg flex items-center gap-1.5">
                              <span>🔗</span>
                              <span>
                                <strong className="text-slate-700 dark:text-slate-300">Insumos de entrada utilizados:</strong> {ver.usedArtifactVersionIds.join(', ')}
                              </span>
                            </div>
                          )}

                          <div className="p-3 bg-slate-950 text-slate-200 rounded-xl text-xs font-mono leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
                            {ver.content}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
