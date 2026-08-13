import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Eye, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight, 
  FileText, 
  HelpCircle, 
  History, 
  Layers, 
  Save, 
  RotateCcw,
  MessageSquarePlus,
  ShieldAlert,
  Tag,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActivityV2, ArtifactVersion, EpistemologicalStatus, ObservationCategory } from '../../types/workshop';
import { buildContextPack } from '../../utils/contextPackBuilder';
import { PILOT_CHAIN_ACTIVITIES } from '../../data/pilotChain';

interface UniversalActivityProps {
  activity: ActivityV2;
  onNavigateToActivity?: (activityId: string) => void;
}

export const UniversalActivity: React.FC<UniversalActivityProps> = ({
  activity,
  onNavigateToActivity,
}) => {
  const { 
    state, 
    saveArtifactVersion, 
    saveDraftArtifact, 
    addFacilitatorObservation,
    setCurrentPilotActivityId
  } = useApp();

  const [draftContent, setDraftContent] = useState<string>('');
  const [structuredClaimValues, setStructuredClaimValues] = useState<
    Record<string, { value: string; epistemologicalStatus: EpistemologicalStatus }>
  >({});
  const [copiedType, setCopiedType] = useState<'promptContext' | 'promptOnly' | null>(null);
  const [isPromptExpanded, setIsPromptExpanded] = useState<boolean>(false);
  const [showContextModal, setShowContextModal] = useState<boolean>(false);
  const [showObsModal, setShowObsModal] = useState<boolean>(false);
  const [showJourneyEndModal, setShowJourneyEndModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Ref for auto-scrolling to the next section (Reflexão Metacognitiva) upon consolidation
  const nextSectionRef = useRef<HTMLElement>(null);

  // Facilitator Observation Form State
  const [obsCategory, setObsCategory] = useState<ObservationCategory>('METODOLOGIA');
  const [obsWhatHappened, setObsWhatHappened] = useState('');
  const [obsIntensity, setObsIntensity] = useState<'BAIXA' | 'MEDIA' | 'ALTA'>('MEDIA');
  const [obsNeededIntervention, setObsNeededIntervention] = useState(false);
  const [obsInterpretation, setObsInterpretation] = useState('');

  // Built context pack for this activity
  const contextPack = buildContextPack(
    activity.aiPrompt.contextPackConfig,
    state.artifactVersions || [],
    state.projectStateV2 || {}
  );

  // Existing consolidated artifact for this activity if any
  const existingConsolidated = (state.artifactVersions || [])
    .filter((v) => v.activityId === activity.id && v.status === 'CONSOLIDADO')
    .sort((a, b) => b.versionNumber - a.versionNumber)[0];

  // Scroll to top when changing activities
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activity.id]);

  // Initialize draft content and structured claim inputs
  useEffect(() => {
    const savedDraft = state.draftArtifacts?.[activity.id];
    if (savedDraft) {
      setDraftContent(savedDraft);
    } else if (existingConsolidated) {
      setDraftContent(existingConsolidated.content);
    } else {
      setDraftContent('');
    }

    if (activity.stateUpdateConfig?.allowedClaimMappings) {
      const initialMap: Record<string, { value: string; epistemologicalStatus: EpistemologicalStatus }> = {};
      
      activity.stateUpdateConfig.allowedClaimMappings.forEach((mapping) => {
        const existingClaim = state.projectStateV2[mapping.targetField];
        const existingStructured = existingConsolidated?.structuredData?.[mapping.targetField];

        initialMap[mapping.targetField] = {
          value: existingStructured?.value || existingClaim?.value || '',
          epistemologicalStatus: existingStructured?.epistemologicalStatus || existingClaim?.epistemologicalStatus || mapping.defaultEpistemologicalStatus,
        };
      });

      setStructuredClaimValues(initialMap);
    } else {
      setStructuredClaimValues({});
    }
  }, [activity.id, state.draftArtifacts, existingConsolidated, state.projectStateV2]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Full prompt combining template + context pack
  const fullPromptWithContext = `${activity.aiPrompt.templatePrompt}\n\n${contextPack.formattedText}`;

  const handleCopyPromptWithContext = async () => {
    try {
      await navigator.clipboard.writeText(fullPromptWithContext);
      setCopiedType('promptContext');
      showToast('Prompt + Context Pack copiados com sucesso!');
      setTimeout(() => setCopiedType(null), 3000);
    } catch (err) {
      // Fallback modal or notice
      setShowContextModal(true);
      showToast('Selecione e copie o texto no modal abaixo.');
    }
  };

  const handleCopyPromptOnly = async () => {
    try {
      await navigator.clipboard.writeText(activity.aiPrompt.templatePrompt);
      setCopiedType('promptOnly');
      showToast('Apenas o Prompt foi copiado!');
      setTimeout(() => setCopiedType(null), 3000);
    } catch (err) {
      showToast('Erro ao copiar prompt.');
    }
  };

  const handleSaveDraft = () => {
    if (!draftContent.trim()) return;
    saveDraftArtifact(activity.id, draftContent);
    saveArtifactVersion(
      activity.expectedArtifactId,
      `${activity.expectedVersionName} (Rascunho)`,
      draftContent,
      activity.id,
      false, // Draft / EM_CONSTRUCAO
      'Rascunho salvo pela equipe'
    );
    showToast('Rascunho salvo com sucesso!');
  };

  const handleConsolidateCheckpoint = () => {
    if (!draftContent.trim()) {
      showToast('Preencha o resultado antes de consolidar.');
      return;
    }

    saveArtifactVersion(
      activity.expectedArtifactId,
      activity.expectedVersionName,
      draftContent,
      activity.id,
      true, // CONSOLIDADO
      `Consolidado no Checkpoint de Autoria Humana da Atividade ${activity.id}`,
      structuredClaimValues
    );
    saveDraftArtifact(activity.id, draftContent);
    showToast(`🎉 ${activity.expectedVersionName} consolidado com sucesso no Estado do Projeto!`);

    // Automatic smooth scroll downwards starting at the next section (Reflexão Metacognitiva)
    setTimeout(() => {
      nextSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleSaveObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!obsWhatHappened.trim()) return;
    addFacilitatorObservation({
      activityId: activity.id,
      category: obsCategory,
      whatHappened: obsWhatHappened,
      intensity: obsIntensity,
      neededIntervention: obsNeededIntervention,
      interpretation: obsInterpretation || undefined,
    });
    setObsWhatHappened('');
    setObsInterpretation('');
    setShowObsModal(false);
    showToast('Observação do facilitador registrada com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 px-4 sm:px-6">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-16 left-4 right-4 sm:left-auto sm:right-6 max-w-sm z-50 bg-slate-900 text-amber-300 dark:bg-amber-400 dark:text-slate-950 px-4 py-3 rounded-xl shadow-xl border border-amber-500/30 font-medium text-xs sm:text-sm flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400 dark:text-slate-950 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Facilitator Quick Action Bar */}
      {state.userMode === 'facilitador' && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-semibold text-sm">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>MODO FACILITADOR ATIVO • Condução Presencial</span>
          </div>
          <button
            onClick={() => setShowObsModal(true)}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <MessageSquarePlus className="w-4 h-4" />
            + Registrar Observação da Execução
          </button>
        </div>
      )}

      {/* 1. VOCÊ ESTÁ AQUI */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              <span>{activity.youAreHere.encounterTitle}</span>
              <span>•</span>
              <span>{activity.youAreHere.positionInSequence}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {activity.title}
            </h1>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span>⏳ Tempo sugerido:</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{activity.durationMinutes} min</span>
            </div>
          </div>
        </div>

        {/* Pilot Sequence Jump Dropdown */}
        <div className="mt-4 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            Atividades da Cadeia Piloto V2:
          </span>
          <select
            value={activity.id}
            onChange={(e) => {
              setCurrentPilotActivityId(e.target.value);
              if (onNavigateToActivity) onNavigateToActivity(e.target.value);
            }}
            className="text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          >
            {PILOT_CHAIN_ACTIVITIES.map((act) => (
              <option key={act.id} value={act.id}>
                {act.id} — {act.title}
              </option>
            ))}
          </select>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
            <span>Progresso da Cadeia Piloto</span>
            <span>{activity.youAreHere.progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500 rounded-full"
              style={{ width: `${activity.youAreHere.progressPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* 2. POR QUE ISSO IMPORTA & 3. VOCÊ VAI PRECISAR */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 2. POR QUE ISSO IMPORTA */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Por que isso importa?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
            {activity.whyItMatters}
          </p>
        </section>

        {/* 3. VOCÊ VAI PRECISAR */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-500" />
            Você vai precisar
          </h2>
          <div className="space-y-2 text-xs">
            {activity.youWillNeed.required.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">{req}</span>
              </div>
            ))}
            {activity.youWillNeed.optional?.map((opt, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 rounded-lg border border-dashed border-slate-200 dark:border-slate-800">
                <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-500 dark:text-slate-400">(Opcional) {opt}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 4. O QUE FAZER */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">✓</span>
          O que fazer nesta atividade
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {activity.whatToDo.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/60 dark:border-slate-800/80">
              <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm">{idx + 1}.</span>
              <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TRABALHE COM A IA */}
      <section className="bg-gradient-to-br from-amber-500/5 via-slate-900/5 to-slate-900/0 dark:from-amber-500/10 dark:to-slate-900 border-2 border-amber-500/30 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-500/20">
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Passo de Interação com IA
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {activity.aiPrompt.purpose}
            </h3>
          </div>
          <button
            onClick={() => setShowContextModal(true)}
            className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-amber-500/40 hover:border-amber-500 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-xl transition flex items-center gap-1.5 shadow-xs self-start sm:self-auto"
          >
            <Eye className="w-3.5 h-3.5 text-amber-500" />
            Ver contexto incluído ({contextPack.snapshotsIncluded.length + contextPack.artifactsIncluded.length})
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong className="text-slate-900 dark:text-slate-100">Como a IA ajudará:</strong> {activity.aiPrompt.whatAiHelpsDo}
        </p>

        {/* TOP PRIMARY ACTION BUTTONS — Immediate Access without Scrolling */}
        <div className="bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/40 p-3.5 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Copiar Prompt Pronto para Usar na IA:
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              onClick={handleCopyPromptWithContext}
              className="py-2.5 px-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
              title="Copia o prompt completo com todas as variáveis e artefatos de contexto do projeto"
            >
              {copiedType === 'promptContext' ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Prompt + Contexto Copiados!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Prompt + Contexto</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyPromptOnly}
              className="py-2.5 px-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-300 dark:border-slate-700 rounded-xl transition flex items-center justify-center gap-1.5"
              title="Copia somente o modelo de prompt sem o pacote de contexto prévio"
            >
              {copiedType === 'promptOnly' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>Apenas prompt</span>
            </button>
          </div>
        </div>

        {/* Friendly dependency warning if missing required artifact */}
        {contextPack.hasMissingRequiredArtifacts && (() => {
          const getDepInfo = () => {
            const missingId = contextPack.missingArtifactIds[0];
            const producer = PILOT_CHAIN_ACTIVITIES.find(a => a.expectedArtifactId === missingId);
            if (producer) {
              return {
                message: `Antes de realizar ${activity.title}, recomendamos concluir a atividade ${producer.title} (${producer.id}) para gerar o artefato "${missingId}".`,
                targetId: producer.id,
                targetTitle: `${producer.title} (${producer.id})`,
              };
            }
            return {
              message: `O artefato obrigatório "${contextPack.missingArtifactIds.join(', ')}" ainda não foi consolidado.`,
              targetId: null,
              targetTitle: null,
            };
          };

          const depInfo = getDepInfo();

          return (
            <div className="bg-amber-500/10 dark:bg-amber-500/15 border-2 border-amber-500/40 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                    Dependência de Artefato Pendente
                  </h4>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {depInfo.message}
                  </p>
                  <p className="text-2xs text-slate-500 dark:text-slate-400 mt-1">
                    Recomendamos consolidar o artefato de entrada para que a IA receba o Context Pack completo.
                  </p>
                </div>
              </div>
              {depInfo.targetId && (
                <button
                  onClick={() => {
                    setCurrentPilotActivityId(depInfo.targetId!);
                    if (onNavigateToActivity) onNavigateToActivity(depInfo.targetId!);
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
                >
                  <span>Ir para {depInfo.targetTitle}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })()}

        {/* Prompt Preview Box — Expandable / Collapsible */}
        <div className="bg-slate-950 text-slate-200 p-4 rounded-xl text-xs font-mono border border-slate-800 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-amber-400 font-sans font-bold text-2xs uppercase tracking-wider">
              Visualização do Prompt Base
            </span>
            <button
              onClick={() => setIsPromptExpanded(!isPromptExpanded)}
              className="text-2xs font-sans font-semibold text-amber-400 hover:text-amber-300 underline"
            >
              {isPromptExpanded ? 'Recolher texto' : 'Ver prompt completo'}
            </button>
          </div>
          <div className={`transition-all duration-300 overflow-y-auto ${isPromptExpanded ? 'max-h-none' : 'max-h-36'}`}>
            <p className="whitespace-pre-wrap leading-relaxed text-slate-300">
              {activity.aiPrompt.templatePrompt}
            </p>
          </div>
          {!isPromptExpanded && (
            <div className="text-center pt-1 border-t border-slate-900">
              <button
                onClick={() => setIsPromptExpanded(true)}
                className="text-2xs font-sans font-medium text-slate-400 hover:text-amber-400"
              >
                ... clique para expandir o prompt integral ({activity.aiPrompt.templatePrompt.length} caracteres)
              </button>
            </div>
          )}
        </div>

        {/* Secondary Action Buttons at Bottom */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
          <button
            onClick={handleCopyPromptWithContext}
            className="flex-1 py-3 px-4 bg-amber-500/20 hover:bg-amber-500/30 text-amber-800 dark:text-amber-300 font-extrabold text-xs border border-amber-500/40 rounded-xl transition flex items-center justify-center gap-2"
          >
            {copiedType === 'promptContext' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Prompt + Contexto Copiados!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-500" />
                <span>Copiar Prompt + Contexto</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyPromptOnly}
            className="py-3 px-4 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-300 dark:border-slate-700 rounded-xl transition flex items-center justify-center gap-1.5"
          >
            {copiedType === 'promptOnly' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span>Copiar somente prompt</span>
          </button>
        </div>
      </section>

      {/* 6. CONSOLIDE O RESULTADO & 7. CHECKPOINT DE AUTORIA */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" />
              Consolide o Resultado da Equipe
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Registre aqui a versão que representa o que sua equipe decidiu (após revisar a sugestão da IA).
            </p>
          </div>

          {existingConsolidated && (
            <span className="self-start sm:self-auto px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-lg text-2xs font-extrabold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {existingConsolidated.versionName} Consolidado
            </span>
          )}
        </div>

        <textarea
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          placeholder={`Digite ou cole aqui a versão final consolidada do ${activity.expectedVersionName} decidida pela sua equipe...`}
          className="w-full h-56 p-4 text-xs font-mono bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 leading-relaxed resize-y"
        />

        {/* Declarative Claim Mappings / O que levamos desta atividade */}
        {activity.stateUpdateConfig?.allowedClaimMappings && activity.stateUpdateConfig.allowedClaimMappings.length > 0 && (
          <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 rounded-xl p-4 sm:p-5 space-y-4">
            <div>
              <h3 className="text-xs font-extrabold text-amber-800 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                O QUE LEVAMOS DESTA ATIVIDADE?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Registre de forma curta o que esta atividade mudou ou confirmou no projeto. Isso aparecerá em <strong className="text-slate-900 dark:text-slate-100 font-bold">Meu Projeto</strong> e ajudará nas próximas atividades.
              </p>
            </div>

            <div className="space-y-3">
              {activity.stateUpdateConfig.allowedClaimMappings.map((mapping) => {
                const currentVal = structuredClaimValues[mapping.targetField]?.value || '';
                const currentStatus = structuredClaimValues[mapping.targetField]?.epistemologicalStatus || mapping.defaultEpistemologicalStatus;

                const renderFriendlyBadge = (status: EpistemologicalStatus) => {
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
                      return <span className="px-2 py-0.5 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-2xs font-extrabold rounded-md uppercase tracking-wider">{status}</span>;
                  }
                };

                return (
                  <div key={mapping.targetField} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                        {mapping.label}
                      </label>

                      {mapping.allowStatusOverride ? (
                        <div className="flex items-center gap-2">
                          <span className="text-2xs font-semibold text-slate-500 dark:text-slate-400">Como estamos tratando isso?</span>
                          <select
                            value={currentStatus}
                            onChange={(e) => {
                              const newStatus = e.target.value as EpistemologicalStatus;
                              setStructuredClaimValues((prev) => ({
                                ...prev,
                                [mapping.targetField]: {
                                  value: prev[mapping.targetField]?.value || '',
                                  epistemologicalStatus: newStatus,
                                },
                              }));
                            }}
                            className="text-2xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1 font-bold text-amber-600 dark:text-amber-400 focus:ring-1 focus:ring-amber-500"
                          >
                            <option value="DECIDIDO">DECIDIMOS</option>
                            <option value="OBSERVADO">OBSERVAMOS</option>
                            <option value="HIPOTESE">ACHAMOS QUE...</option>
                            <option value="NAO_TESTADO">AINDA NÃO TESTAMOS</option>
                            {currentStatus === 'VALIDADO' && <option value="VALIDADO">VALIDADO</option>}
                          </select>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-2xs text-slate-500 dark:text-slate-400">
                          <span className="font-medium">Registraremos como:</span>
                          {renderFriendlyBadge(currentStatus)}
                        </div>
                      )}
                    </div>

                    <input
                      type="text"
                      value={currentVal}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        setStructuredClaimValues((prev) => ({
                          ...prev,
                          [mapping.targetField]: {
                            value: newVal,
                            epistemologicalStatus: prev[mapping.targetField]?.epistemologicalStatus || mapping.defaultEpistemologicalStatus,
                          },
                        }));
                      }}
                      placeholder={`Escreva em 1 ou 2 frases a síntese de ${mapping.label.toLowerCase()}...`}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleSaveDraft}
            className="w-full sm:w-auto px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            Salvar como Rascunho
          </button>

          {/* 7. CHECKPOINT DE AUTORIA */}
          <div className="w-full sm:w-auto bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 p-3.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 text-center sm:text-left">
              Este resultado representa o que sua equipe decidiu?
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-stretch sm:justify-end">
              <button
                onClick={handleSaveDraft}
                className="flex-1 sm:flex-initial px-3 py-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-bold transition text-center"
              >
                Ainda quero revisar
              </button>
              <button
                onClick={handleConsolidateCheckpoint}
                className="flex-1 sm:flex-initial px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-lg shadow-xs transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Sim, consolidar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. REFLEXÃO CURTA */}
      <section
        ref={nextSectionRef}
        className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-5 shadow-xs"
      >
        <h3 className="text-2xs font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          Reflexão Metacognitiva do Passo
        </h3>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 italic">
          "{activity.metacognitiveReflection}"
        </p>
      </section>

      {/* 9. HANDOFF */}
      <section
        className={`border rounded-2xl p-6 shadow-xs transition-all ${
        existingConsolidated 
          ? 'bg-white dark:bg-slate-900 border-emerald-500/40 dark:border-emerald-500/30' 
          : 'bg-slate-50/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 opacity-90'
      }`}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-amber-500" />
            Handoff — Conexão com a Próxima Atividade
          </h2>
          {!existingConsolidated && (
            <span className="text-2xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
              Pendente de Consolidação
            </span>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80">
            <span className="text-2xs font-extrabold text-slate-400 uppercase block mb-1">Você Produziu</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{activity.handoff.producedArtifactName}</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80">
            <span className="text-2xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase block mb-1">Agora Sabemos</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{activity.handoff.nowWeKnow}</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80">
            <span className="text-2xs font-extrabold text-amber-600 dark:text-amber-400 uppercase block mb-1">Ainda Está em Aberto</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{activity.handoff.stillOpen}</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80">
            <span className="text-2xs font-extrabold text-amber-500 uppercase block mb-1">A Seguir (Próxima Atividade)</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{activity.handoff.nextActivityTitle}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <strong className="text-slate-700 dark:text-slate-300">Vamos usar isto para:</strong> {activity.handoff.nextActivityPurpose}
          </p>

          {/* 10. CONTINUAR */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              if (activity.handoff.nextActivityId === 'END_OF_JOURNEY' || activity.id === 'E4-A03') {
                setShowJourneyEndModal(true);
              } else if (PILOT_CHAIN_ACTIVITIES.some(a => a.id === activity.handoff.nextActivityId)) {
                setCurrentPilotActivityId(activity.handoff.nextActivityId);
                if (onNavigateToActivity) onNavigateToActivity(activity.handoff.nextActivityId);
              } else {
                setShowJourneyEndModal(true);
              }
            }}
            disabled={!existingConsolidated}
            className={`w-full sm:w-auto px-6 py-2.5 font-extrabold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 shrink-0 ${
              existingConsolidated
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 cursor-pointer'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>
              {PILOT_CHAIN_ACTIVITIES.some(a => a.id === activity.handoff.nextActivityId)
                ? `Avançar para ${activity.handoff.nextActivityTitle}`
                : 'Encerramento da Jornada V2'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* CONTEXT PACK TRANSPARENCY MODAL */}
      {showContextModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-500" />
                  Transparência do Context Pack V2
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Veja exatamente quais informações e artefatos consolidados estão sendo enviados para a IA.
                </p>
              </div>
              <button
                onClick={() => setShowContextModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold px-2 py-1"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 text-xs font-mono bg-slate-950 text-slate-200">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-amber-300 font-sans text-xs">
                <strong>Instrução da Metodologia:</strong> A aplicação não envia dados aleatórios. Apenas as afirmações e artefatos declarados pela atividade fazem parte deste pacote.
              </div>

              <textarea
                readOnly
                value={fullPromptWithContext}
                className="w-full h-80 p-3 bg-slate-900 text-slate-300 rounded-xl border border-slate-800 text-2xs leading-relaxed focus:outline-hidden font-mono"
              />
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950 rounded-b-2xl">
              <span className="text-xs text-slate-500">
                Total de caracteres: {fullPromptWithContext.length}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(fullPromptWithContext);
                  showToast('Conteúdo do modal copiado para a área de transferência!');
                  setShowContextModal(false);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs"
              >
                Copiar Texto Completo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FACILITATOR OBSERVATION MODAL */}
      {showObsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleSaveObservation} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <MessageSquarePlus className="w-4 h-4 text-amber-500" />
              Registrar Observação da Execução (Facilitador)
            </h3>

            <div>
              <label className="block text-2xs font-extrabold text-slate-500 uppercase mb-1">
                Atividade
              </label>
              <input
                type="text"
                disabled
                value={`${activity.id} - ${activity.title}`}
                className="w-full p-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-lg text-slate-600 dark:text-slate-400 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-2xs font-extrabold text-slate-500 uppercase mb-1">
                  Categoria
                </label>
                <select
                  value={obsCategory}
                  onChange={(e) => setObsCategory(e.target.value as ObservationCategory)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs rounded-lg font-medium text-slate-800 dark:text-slate-200"
                >
                  <option value="METODOLOGIA">Metodologia</option>
                  <option value="PROMPT">Prompt</option>
                  <option value="CONTEUDO">Conteúdo</option>
                  <option value="UX">UX / Interface</option>
                  <option value="TECNOLOGIA">Tecnologia</option>
                  <option value="FACILITACAO">Facilitação</option>
                </select>
              </div>

              <div>
                <label className="block text-2xs font-extrabold text-slate-500 uppercase mb-1">
                  Intensidade do Problema
                </label>
                <select
                  value={obsIntensity}
                  onChange={(e) => setObsIntensity(e.target.value as 'BAIXA' | 'MEDIA' | 'ALTA')}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs rounded-lg font-medium text-slate-800 dark:text-slate-200"
                >
                  <option value="BAIXA">Baixa</option>
                  <option value="MEDIA">Média</option>
                  <option value="ALTA">Alta</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-2xs font-extrabold text-slate-500 uppercase mb-1">
                O que aconteceu? (Fato observado)
              </label>
              <textarea
                required
                value={obsWhatHappened}
                onChange={(e) => setObsWhatHappened(e.target.value)}
                placeholder="Ex: A maioria dos grupos teve dúvida sobre a diferença entre hipótese e fato no item 3."
                className="w-full h-20 p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs rounded-lg text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-2xs font-extrabold text-slate-500 uppercase mb-1">
                O que achamos que significa? (Interpretação opcional)
              </label>
              <input
                type="text"
                value={obsInterpretation}
                onChange={(e) => setObsInterpretation(e.target.value)}
                placeholder="Ex: Microcopy precisa exemplificar explicitamente o conceito."
                className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs rounded-lg text-slate-800 dark:text-slate-200"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="intervention"
                checked={obsNeededIntervention}
                onChange={(e) => setObsNeededIntervention(e.target.checked)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
              />
              <label htmlFor="intervention" className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Precisou de intervenção direta do facilitador?
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowObsModal(false)}
                className="px-3 py-1.5 text-xs text-slate-500 font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg shadow-xs"
              >
                Salvar Observação
              </button>
            </div>
          </form>
        </div>
      )}

      {/* JOURNEY END MODAL */}
      {showJourneyEndModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-amber-500/10">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Conclusão da Jornada do Workshop V2
                </h3>
                <p className="text-2xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Checklist Humano de Preparação Final & Reflexões sobre o Uso de IA
                </p>
              </div>
              <button
                onClick={() => setShowJourneyEndModal(false)}
                className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs mb-3 uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Checklist Humano de Preparação Final
                </h4>
                <ul className="space-y-2">
                  {[
                    'Sabemos explicar o problema sem ler?',
                    'Sabemos explicar concretamente como a solução funciona?',
                    'Conseguimos dizer o que foi realmente testado?',
                    'Sabemos distinguir resultados de hipóteses?',
                    'Conhecemos os principais aprendizados?',
                    'Sabemos o que ainda não sabemos?',
                    'Conhecemos nossos próximos passos?',
                    'Os slides apoiam nossa fala?',
                    'O pitch cabe no tempo?',
                    'Todos sabem qual papel terão?'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs mb-3 uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  Três Perguntas Finais de Reflexão
                </h4>
                <ol className="list-decimal list-inside space-y-2 font-medium">
                  <li>“Em qual momento a IA mais ajudou sua equipe a pensar melhor?”</li>
                  <li>“Em qual momento vocês perceberam que precisavam discordar, corrigir ou limitar a IA?”</li>
                  <li>“O que você pretende fazer diferente da próxima vez que usar IA para aprender, criar ou tomar uma decisão?”</li>
                </ol>
              </div>

              <p className="text-2xs text-slate-500 dark:text-slate-400 italic text-center">
                Nota Epistemológica: A mensagem de encerramento reconhece a conclusão do itinerário da jornada, e não valida a aprendizagem automaticamente.
              </p>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setShowJourneyEndModal(false)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Concluir e Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
