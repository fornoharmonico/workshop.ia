import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Copy,
  Eye,
  Save,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Layers,
  FileText,
  Clock,
  HelpCircle,
  ShieldAlert,
  MessageSquarePlus,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Compass,
  CheckCheck,
  Info,
  ArrowDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActivityV2, EpistemologicalStatus, ObservationCategory } from '../../types/workshop';
import { buildContextPack, formatPromptWithSeparation } from '../../utils/contextPackBuilder';
import { PILOT_CHAIN_ACTIVITIES } from '../../data/pilotChain';
import { SolutionCategorySelector } from './SolutionCategorySelector';
import { 
  formatSolutionCategories, 
  getContextualSolutionLabels, 
  isHybridSolution 
} from '../../utils/solutionCategories';
import { PitchTriadEditor } from './PitchTriadEditor';
import { BancaSimuladaWorkflow } from './BancaSimuladaWorkflow';
import { HandoffCompact } from './HandoffCompact';
import { RealWorldTestSupport } from './RealWorldTestSupport';

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
    triggerManualSave,
    addFacilitatorObservation,
    setCurrentPilotActivityId,
    setActiveWebappTab,
    updateProjectData,
    timer,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    addMinutesToTimer,
    setTimerSeconds
  } = useApp();

  const [draftContent, setDraftContent] = useState<string>('');
  const [structuredClaimValues, setStructuredClaimValues] = useState<
    Record<string, { value: string; epistemologicalStatus: EpistemologicalStatus }>
  >({});
  const [copiedType, setCopiedType] = useState<'promptContext' | 'promptOnly' | null>(null);
  const [isPromptExpanded, setIsPromptExpanded] = useState<boolean>(false);
  const [isContextDetailsExpanded, setIsContextDetailsExpanded] = useState<boolean>(false);
  const [showContextModal, setShowContextModal] = useState<boolean>(false);
  const [showObsModal, setShowObsModal] = useState<boolean>(false);
  const [showJourneyEndModal, setShowJourneyEndModal] = useState<boolean>(false);
  const [dismissedZeroAlert, setDismissedZeroAlert] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [srAnnouncement, setSrAnnouncement] = useState<string>('');

  // Section refs for guided automatic scrolling between phases
  const sectionPhase1Ref = useRef<HTMLElement>(null);
  const sectionPhase2Ref = useRef<HTMLElement>(null);
  const sectionPhase3Ref = useRef<HTMLElement>(null);
  const handoffSectionRef = useRef<HTMLElement>(null);
  const consolidationTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Active highlighted target section when auto-scrolling
  const [highlightedSection, setHighlightedSection] = useState<'phase1' | 'phase2' | 'phase3' | 'phase4' | null>(null);

  const scrollToSection = (section: 'phase1' | 'phase2' | 'phase3' | 'phase4', andFocusTextarea = false) => {
    let targetEl: HTMLElement | null = null;
    if (section === 'phase1') targetEl = sectionPhase1Ref.current;
    else if (section === 'phase2') targetEl = sectionPhase2Ref.current;
    else if (section === 'phase3') targetEl = sectionPhase3Ref.current;
    else if (section === 'phase4') targetEl = handoffSectionRef.current;

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHighlightedSection(section);
      setTimeout(() => {
        setHighlightedSection(null);
      }, 2400);

      if (andFocusTextarea) {
        setTimeout(() => {
          consolidationTextareaRef.current?.focus();
        }, 550);
      }
    }
  };

  // Facilitator Observation Form State
  const [obsCategory, setObsCategory] = useState<ObservationCategory>('METODOLOGIA');
  const [obsWhatHappened, setObsWhatHappened] = useState('');
  const [obsIntensity, setObsIntensity] = useState<'BAIXA' | 'MEDIA' | 'ALTA'>('MEDIA');
  const [obsNeededIntervention, setObsNeededIntervention] = useState(false);
  const [obsInterpretation, setObsInterpretation] = useState('');

  // Built context pack for this activity
  const contextPack = buildContextPack(
    activity.aiPrompt?.contextPackConfig,
    state.artifactVersions || [],
    state.projectStateV2 || {}
  );

  const totalContextItems = contextPack.snapshotsIncluded.length + contextPack.artifactsIncluded.length;

  // Existing consolidated artifact for this activity if any
  const existingConsolidated = (state.artifactVersions || [])
    .filter((v) => v.activityId === activity.id && v.status === 'CONSOLIDADO')
    .sort((a, b) => b.versionNumber - a.versionNumber)[0];

  // Whether this activity is considered complete
  const isActivityCompleted = Boolean(existingConsolidated) || (state.completedActivityIds || []).includes(activity.id);

  // Current activity index and sequence pointers
  const currentIndex = PILOT_CHAIN_ACTIVITIES.findIndex((a) => a.id === activity.id);
  const prevActivity = currentIndex > 0 ? PILOT_CHAIN_ACTIVITIES[currentIndex - 1] : null;
  const nextActivity = currentIndex < PILOT_CHAIN_ACTIVITIES.length - 1 ? PILOT_CHAIN_ACTIVITIES[currentIndex + 1] : null;

  // Scroll to top when changing activities
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCopiedType(null);
    setIsPromptExpanded(false);
    setIsContextDetailsExpanded(false);
    setDismissedZeroAlert(false);
  }, [activity.id]);

  // Reset dismissed alert when timer is restarted
  useEffect(() => {
    if (timer.isRunning) {
      setDismissedZeroAlert(false);
    }
  }, [timer.isRunning]);

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
    }
  }, [activity.id, existingConsolidated]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setSrAnnouncement(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Full assembled prompt text (Template + Injected Context Pack)
  const fullPromptWithContext = activity.aiPrompt
    ? formatPromptWithSeparation(
        activity.aiPrompt.templatePrompt,
        contextPack.formattedText || ''
      )
    : '';

  const handleCopyPromptWithContext = async () => {
    if (!fullPromptWithContext) return;
    try {
      await navigator.clipboard.writeText(fullPromptWithContext);
      setCopiedType('promptContext');
      showToast('Prompt Completo (+ Contexto) copiado! Conduzindo para a Fase 3...');
      setTimeout(() => setCopiedType(null), 5000);
      // Discrete automatic smooth scroll to Section 3 / Consolidação to guide the user
      setTimeout(() => {
        scrollToSection('phase3', true);
      }, 450);
    } catch (err) {
      setShowContextModal(true);
      showToast('Selecione e copie o texto no modal abaixo.');
    }
  };

  const handleCopyPromptOnly = async () => {
    if (!activity.aiPrompt) return;
    try {
      await navigator.clipboard.writeText(activity.aiPrompt.templatePrompt);
      setCopiedType('promptOnly');
      showToast('Prompt Base copiado! Conduzindo para a Fase 3...');
      setTimeout(() => setCopiedType(null), 5000);
      setTimeout(() => {
        scrollToSection('phase3', true);
      }, 450);
    } catch (err) {
      showToast('Erro ao copiar prompt.');
    }
  };

  const handleSaveDraft = () => {
    if (!draftContent.trim()) {
      showToast('Digite algum texto antes de salvar o rascunho.');
      return;
    }
    const artifactId = activity.expectedArtifactId || `art-${activity.id}`;
    const versionName = activity.expectedVersionName || activity.title;

    saveDraftArtifact(activity.id, draftContent);
    saveArtifactVersion(
      artifactId,
      `${versionName} (Rascunho)`,
      draftContent,
      activity.id,
      false, // Draft / EM_CONSTRUCAO
      'Rascunho salvo pela equipe'
    );
    triggerManualSave();
    showToast('Rascunho salvo com sucesso!');
  };

  const handleConsolidateCheckpoint = () => {
    const contentToSave = draftContent.trim() || (activity.requiresArtifact === false ? 'Atividade presencial realizada e concluída pela equipe.' : '');
    if (!contentToSave) {
      showToast('Preencha o resultado consolidado da equipe antes de confirmar.');
      return;
    }

    const artifactId = activity.expectedArtifactId || `art-${activity.id}`;
    const versionName = activity.expectedVersionName || activity.title;

    saveArtifactVersion(
      artifactId,
      versionName,
      contentToSave,
      activity.id,
      true, // CONSOLIDADO
      `Consolidado no Checkpoint de Autoria Humana da Atividade ${activity.id}`,
      structuredClaimValues
    );
    if (draftContent.trim()) {
      saveDraftArtifact(activity.id, draftContent);
    }
    triggerManualSave();
    showToast(`🎉 ${versionName} consolidado com sucesso!`);

    // Automatic smooth scroll downwards to Handoff (Phase 4)
    setTimeout(() => {
      scrollToSection('phase4');
    }, 200);
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

  // Participant Timer Controls
  const handleToggleTimer = () => {
    if (timer.isRunning) {
      pauseTimer();
      setSrAnnouncement('Cronômetro pausado.');
    } else {
      if (timer.totalSeconds <= 0) {
        setTimerSeconds((activity.durationMinutes || 20) * 60);
      }
      if (timer.remainingSeconds < timer.initialSeconds && timer.remainingSeconds > 0) {
        resumeTimer();
      } else {
        startTimer();
      }
      setSrAnnouncement(`Cronômetro iniciado para ${activity.durationMinutes} minutos.`);
    }
  };

  const handleResetCurrentTimer = () => {
    resetTimer();
    setTimerSeconds((activity.durationMinutes || 20) * 60);
    setSrAnnouncement('Cronômetro resetado para o tempo sugerido.');
  };

  const formattedTimerDisplay = `${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`;

  const completedCount = (state.completedActivityIds || []).length;
  const totalCount = PILOT_CHAIN_ACTIVITIES.length;
  const dynamicPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 px-4 sm:px-6">
      
      {/* Screen Reader ARIA Live Status Announcement */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {srAnnouncement}
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div 
          role="alert"
          className="fixed top-20 left-4 right-4 sm:left-auto sm:right-6 max-w-md z-50 bg-slate-950 text-amber-300 dark:bg-amber-400 dark:text-slate-950 px-4 py-3 rounded-2xl shadow-2xl border border-amber-500/40 font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-400 dark:text-slate-950 shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Facilitator Quick Action Bar (if active) */}
      {state.userMode === 'facilitador' && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-amber-950 dark:text-amber-200 font-extrabold text-xs sm:text-sm">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
            <span>MODO FACILITADOR ATIVO • Condução Presencial</span>
          </div>
          <button
            onClick={() => setShowObsModal(true)}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
            <span>+ Registrar Observação da Execução</span>
          </button>
        </div>
      )}

      {/* Persistent Non-Blocking Zero-Time Alert Banner */}
      {timer.isFinished && !dismissedZeroAlert && (
        <div 
          role="region"
          aria-label="Aviso de tempo previsto encerrado"
          className="bg-slate-950 text-white border-2 border-rose-500/80 rounded-3xl p-4 sm:p-5 shadow-xl ring-2 ring-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-600 text-white font-black shrink-0 animate-pulse mt-0.5 sm:mt-0">
              <Clock className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xs font-extrabold px-2 py-0.5 rounded-md bg-rose-900/80 text-rose-200 uppercase tracking-wider border border-rose-500/40">
                  Tempo Previsto Encerrado (00:00)
                </span>
                <span className="text-xs text-rose-300 font-bold hidden sm:inline">•</span>
                <span className="text-xs font-bold text-white hidden sm:inline">{activity.title}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                O tempo sugerido de <strong>{activity.durationMinutes} min</strong> terminou. Você pode continuar registrando seu trabalho no seu ritmo ou estender a contagem:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end shrink-0">
            <button
              onClick={() => addMinutesToTimer(2)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-xs"
            >
              +2 min
            </button>
            <button
              onClick={() => addMinutesToTimer(5)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/30 transition cursor-pointer"
            >
              +5 min
            </button>
            {nextActivity && (
              <button
                onClick={() => {
                  setCurrentPilotActivityId(nextActivity.id);
                  if (onNavigateToActivity) onNavigateToActivity(nextActivity.id);
                  resetTimer();
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Próxima</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
            <button
              onClick={() => setDismissedZeroAlert(true)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Dispensar aviso"
              aria-label="Dispensar aviso de tempo encerrado"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Stepper & Navigation Header */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <span className="bg-amber-100 dark:bg-amber-950 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-800">
              {activity.id}
            </span>
            <span>{activity.youAreHere.encounterTitle}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Atividade {currentIndex + 1} de {PILOT_CHAIN_ACTIVITIES.length}</span>
          </div>

          {/* Interactive Participant Activity Timer */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
            <span className="font-mono font-black text-xs text-slate-900 dark:text-slate-100">
              {formattedTimerDisplay}
            </span>
            <button
              onClick={handleToggleTimer}
              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                timer.isRunning
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-amber-500 hover:text-slate-950'
              }`}
              title={timer.isRunning ? 'Pausar cronômetro da atividade' : 'Iniciar cronômetro sugerido'}
              aria-label={timer.isRunning ? 'Pausar cronômetro' : `Iniciar cronômetro (${activity.durationMinutes} minutos)`}
            >
              {timer.isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={handleResetCurrentTimer}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
              title="Resetar tempo sugerido da atividade"
              aria-label="Resetar cronômetro"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
            <span className="text-3xs font-semibold text-slate-500 dark:text-slate-400 pl-1 hidden sm:inline">
              ({activity.durationMinutes} min)
            </span>
          </div>
        </div>

        {/* Conceptual Pipeline Roadmap Indicator (Contexto -> Ação -> Consolidação -> Handoff) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-2xs font-black flex items-center justify-center shrink-0">1</span>
            <div className="truncate">
              <span className="text-[10px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider block">Fase 1</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block">Contexto</span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-2xs font-black flex items-center justify-center shrink-0">2</span>
            <div className="truncate">
              <span className="text-[10px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider block">Fase 2</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block">Ação</span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-2xs font-black flex items-center justify-center shrink-0">3</span>
            <div className="truncate">
              <span className="text-[10px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider block">Fase 3</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block">Consolidação</span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-2xs font-black flex items-center justify-center shrink-0">4</span>
            <div className="truncate">
              <span className="text-[10px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider block">Fase 4</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block">Handoff</span>
            </div>
          </div>
        </div>

        {/* Activity Title (H1) & Responsive Quick Navigation Bar */}
        <div className="space-y-3 pt-1">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-snug break-words">
              {activity.title}
            </h1>
          </div>

          <div className="flex items-center justify-between gap-2 p-1.5 sm:p-2 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <button
              disabled={!prevActivity}
              onClick={() => {
                if (prevActivity) {
                  setCurrentPilotActivityId(prevActivity.id);
                  if (onNavigateToActivity) onNavigateToActivity(prevActivity.id);
                }
              }}
              className={`btn-interactive shrink-0 px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 border shadow-2xs ${
                prevActivity
                  ? 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 cursor-pointer'
                  : 'bg-slate-100/50 dark:bg-slate-800/30 text-slate-400 dark:text-slate-600 border-transparent cursor-not-allowed opacity-40'
              }`}
              title={prevActivity ? `Ir para atividade anterior (${prevActivity.id})` : 'Esta é a primeira atividade'}
              aria-label={prevActivity ? `Ir para atividade anterior ${prevActivity.id}` : 'Nenhuma atividade anterior'}
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="min-w-0 flex-1 flex justify-center px-1">
              <select
                id="activity-quick-nav"
                value={activity.id}
                onChange={(e) => {
                  setCurrentPilotActivityId(e.target.value);
                  if (onNavigateToActivity) onNavigateToActivity(e.target.value);
                }}
                className="w-full max-w-md min-w-0 truncate text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 sm:px-3 py-1.5 font-bold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-2xs cursor-pointer text-ellipsis"
                aria-label="Selecionar atividade"
              >
                {PILOT_CHAIN_ACTIVITIES.map((act, idx) => (
                  <option key={act.id} value={act.id}>
                    {act.id} — {act.title} ({idx + 1}/{PILOT_CHAIN_ACTIVITIES.length})
                  </option>
                ))}
              </select>
            </div>

            <button
              disabled={!nextActivity}
              onClick={() => {
                if (nextActivity) {
                  setCurrentPilotActivityId(nextActivity.id);
                  if (onNavigateToActivity) onNavigateToActivity(nextActivity.id);
                }
              }}
              className={`btn-interactive shrink-0 px-3.5 py-1.5 rounded-xl font-black text-xs transition flex items-center gap-1.5 shadow-xs border ${
                nextActivity
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-600/30 cursor-pointer'
                  : 'bg-slate-100/50 dark:bg-slate-800/30 text-slate-400 dark:text-slate-600 border-transparent cursor-not-allowed opacity-40'
              }`}
              title={nextActivity ? `Ir para próxima atividade (${nextActivity.id})` : 'Esta é a última atividade'}
              aria-label={nextActivity ? `Ir para próxima atividade ${nextActivity.id}` : 'Nenhuma próxima atividade'}
            >
              <span className="hidden sm:inline">Próxima</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-1">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
            <span>Progresso da Turma: <strong className="text-amber-700 dark:text-amber-400 font-extrabold">{completedCount} de {totalCount}</strong> concluídas</span>
            <span className="font-extrabold text-slate-800 dark:text-slate-200">{dynamicPercent}%</span>
          </div>
          <div 
            role="progressbar" 
            aria-valuenow={dynamicPercent} 
            aria-valuemin={0} 
            aria-valuemax={100} 
            aria-label="Progresso da Turma na Jornada"
            className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"
          >
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500 rounded-full"
              style={{ width: `${Math.max(dynamicPercent > 0 ? dynamicPercent : 3, (activity.youAreHere?.progressPercent || 5))}%` }}
            />
          </div>
        </div>

        {/* Microintervenção Pedagógica Contextual V3 */}
        {activity.pedagogicalIntervention && (
          <div className="pt-1">
            <div className="bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 rounded-2xl p-3 sm:px-4 sm:py-2.5 flex items-center gap-2.5 sm:gap-3 shadow-2xs">
              <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shrink-0">
                {activity.pedagogicalIntervention.tag}
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold leading-snug">
                {activity.pedagogicalIntervention.message}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Interactive Step-by-Step Guided Navigation Bar (Mobile-first, touch-friendly) */}
      <nav 
        aria-label="Navegação rápida entre fases da atividade" 
        className="sticky top-28 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-1.5 sm:p-2 rounded-2xl shadow-xs transition-all"
      >
        <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto touch-scroll scrollbar-none py-0.5">
          <button
            type="button"
            onClick={() => scrollToSection('phase1')}
            className={`btn-interactive flex-1 min-h-[44px] px-2.5 sm:px-3 py-2 rounded-xl text-2xs sm:text-xs font-black transition flex items-center justify-center gap-1.5 shrink-0 sm:shrink cursor-pointer touch-manipulation ${
              highlightedSection === 'phase1'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-2xs font-black flex items-center justify-center shrink-0">1</span>
            <span className="whitespace-nowrap">Contexto</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700 text-xs shrink-0 select-none">→</span>

          <button
            type="button"
            onClick={() => scrollToSection('phase2')}
            className={`btn-interactive flex-1 min-h-[44px] px-2.5 sm:px-3 py-2 rounded-xl text-2xs sm:text-xs font-black transition flex items-center justify-center gap-1.5 shrink-0 sm:shrink cursor-pointer touch-manipulation ${
              highlightedSection === 'phase2'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-2xs font-black flex items-center justify-center shrink-0">2</span>
            <span className="whitespace-nowrap">Ação & Prompt</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700 text-xs shrink-0 select-none">→</span>

          <button
            type="button"
            onClick={() => scrollToSection('phase3', true)}
            className={`btn-interactive flex-1 min-h-[44px] px-2.5 sm:px-3 py-2 rounded-xl text-2xs sm:text-xs font-black transition flex items-center justify-center gap-1.5 shrink-0 sm:shrink cursor-pointer touch-manipulation ${
              highlightedSection === 'phase3'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-2xs font-black flex items-center justify-center shrink-0">3</span>
            <span className="whitespace-nowrap">Consolidação</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700 text-xs shrink-0 select-none">→</span>

          <button
            type="button"
            onClick={() => scrollToSection('phase4')}
            className={`btn-interactive flex-1 min-h-[44px] px-2.5 sm:px-3 py-2 rounded-xl text-2xs sm:text-xs font-black transition flex items-center justify-center gap-1.5 shrink-0 sm:shrink cursor-pointer touch-manipulation ${
              highlightedSection === 'phase4'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-2xs font-black flex items-center justify-center shrink-0">4</span>
            <span className="whitespace-nowrap">Próximo Passo</span>
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 1. ONDE ESTOU? | 2. O QUE VOU FAZER? | 3. POR QUE ISSO IMPORTA? | 4. O QUE JÁ TEMOS? */}
      {/* ========================================================================= */}
      <section 
        ref={sectionPhase1Ref}
        id="fase-1-contexto"
        className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5 scroll-mt-32 transition-all duration-300 ${
          highlightedSection === 'phase1' ? 'section-guided-target ring-2 ring-amber-500/60' : ''
        }`}
      >
        
        {/* Phase Header Badge */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">1</span>
            <div>
              <span className="text-2xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                FASE 1: CONTEXTO & INSUMOS
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                Onde estamos, o que faremos e o que já temos
              </h2>
            </div>
          </div>

          <span className="text-2xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {activity.isPresencial 
              ? '👥 Dinâmica Presencial' 
              : activity.id === 'E3-A01' 
                ? '🔬 Mundo Real (Testes em Campo)' 
                : '🤖 Etapa Digital com IA'}
          </span>
        </div>

        {/* 1. Onde estou? & 2. O que vou fazer? & 3. Por que isso importa? */}
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>1. Onde estou?</span>
            </div>
            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
              {activity.youAreHere.encounterTitle} • {activity.youAreHere.positionInSequence}
            </p>
            <p className="text-2xs text-slate-500 dark:text-slate-400">
              Duração estimada: <strong>{activity.durationMinutes} minutos</strong> de trabalho focado.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>2. O que vou fazer?</span>
            </div>
            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
              {activity.title}
            </p>
            <p className="text-2xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {activity.expectedVersionName || 'Consolidação e evolução da etapa'}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>3. Por que isso importa?</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {activity.whyItMatters}
            </p>
          </div>
        </div>

        {/* 4. O que já temos? */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>4. O que já temos? • Insumos e Contexto Acumulado</span>
            </h3>

            {activity.aiPrompt && (
              <button
                onClick={() => setShowContextModal(true)}
                className="self-start sm:self-auto px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 rounded-xl text-2xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {totalContextItems === 0
                    ? 'Ver Context Pack (Passo Inicial)'
                    : `Ver Context Pack (${totalContextItems} insumos vinculados)`}
                </span>
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            {activity.youWillNeed.required.length > 0 ? (
              activity.youWillNeed.required.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-emerald-500/30 dark:border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-2xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase block">Obrigatório</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{req}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 sm:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-2xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase block">Início da Cadeia</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">Nenhum artefato prévio é obrigatório — esta etapa inicia a cadeia investigativa.</span>
                </div>
              </div>
            )}

            {activity.youWillNeed.optional?.map((opt, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-slate-50/60 dark:bg-slate-950/60 p-3 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-2xs font-extrabold text-slate-500 uppercase block">Opcional</span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">{opt}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Problem Map Live Integration Card for Encontro 1 initial steps */}
          {(activity.id === 'E1-A00' || activity.id === 'E1-A01') && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-black px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 uppercase tracking-wider">
                    MAPA DE PROBLEMAS
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {state.projectData?.collectiveChallenge 
                      ? `Desafio Selecionado: "${state.projectData.collectiveChallenge.slice(0, 60)}..."`
                      : 'Nenhum problema do Mapa selecionado ainda'}
                  </span>
                </div>
                <p className="text-2xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {state.projectData?.collectiveChallenge 
                    ? 'O problema selecionado no Mapa está salvo e pode ser usado diretamente como ponto de partida da investigação.'
                    : 'Você pode escolher um dos 24 problemas mapeados no acervo ou cadastrar um novo desafio da sua equipe antes de iniciar o Diagnóstico.'}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveWebappTab('mapa-problemas')}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Explorar Mapa de Problemas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Solution Categories Interactive Configuration in PRD / MVP / Prototipagem */}
          {['E2-A02', 'E2-A03', 'E2-A04'].includes(activity.id) && (
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-950/80 border border-amber-300 dark:border-amber-900/60 space-y-3 mt-2">
              <SolutionCategorySelector
                compact
                selectedCategories={state.projectData?.solutionCategories || []}
                otherText={state.projectData?.solutionOtherCategory || ''}
                onChange={(cats, other) => {
                  updateProjectData({
                    solutionCategories: cats,
                    solutionOtherCategory: other
                  });
                }}
              />
            </div>
          )}

          {/* Evolution V0 -> V1 & Preservation Card in E3-A05 */}
          {activity.id === 'E3-A05' && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-black px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 uppercase tracking-wider">
                    RASTREAMENTO DE EVOLUÇÃO
                  </span>
                  <strong className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Origem das Mudanças: Protótipo V0 → Protótipo V1
                  </strong>
                </div>
                <span className="text-3xs font-extrabold text-slate-500 dark:text-slate-400">
                  Protótipo V0 permanece preservado
                </span>
              </div>

              <p className="text-2xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Toda alteração entre a versão V0 e a V1 deve ser explicitada na <strong>Matriz de Mudanças</strong> com sua respectiva origem formal: <em>evidência de teste</em>, <em>evidência de execução</em>, <em>feedback externo</em>, <em>decisão estratégica</em> ou <em>hipótese de design</em>.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-3xs">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <strong className="text-amber-700 dark:text-amber-400 block font-black">1. Protótipo V0</strong>
                  <span className="text-slate-600 dark:text-slate-400">Linha de base original testada (ou simulada).</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <strong className="text-amber-700 dark:text-amber-400 block font-black">2. Registro de Evolução</strong>
                  <span className="text-slate-600 dark:text-slate-400">O que muda, o que fica e por quê.</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                  <strong className="text-amber-700 dark:text-amber-400 block font-black">3. Protótipo V1</strong>
                  <span className="text-slate-600 dark:text-slate-400">Especificação lapidada pós-aprendizados.</span>
                </div>
              </div>
            </div>
          )}

          {/* Visual Presentation Tools Guidance in E4-A02 */}
          {activity.id === 'E4-A02' && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-black px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 uppercase tracking-wider">
                    FERRAMENTAS DE SLIDES
                  </span>
                  <strong className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Onde criar a apresentação visual da sua equipe:
                  </strong>
                </div>
                <span className="text-3xs text-slate-500">1 ideia visual por slide</span>
              </div>

              <p className="text-2xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Você pode utilizar o gerador de prompts abaixo para produzir a estrutura dos 6 a 8 slides e depois colar diretamente em ferramentas visuais recomendadas:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-2xs">
                <a
                  href="https://slides.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 transition text-center font-bold text-slate-800 dark:text-slate-200 flex flex-col items-center gap-1"
                >
                  <span className="text-xs">📊</span>
                  <span>Google Slides</span>
                </a>
                <a
                  href="https://www.canva.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 transition text-center font-bold text-slate-800 dark:text-slate-200 flex flex-col items-center gap-1"
                >
                  <span className="text-xs">🎨</span>
                  <span>Canva</span>
                </a>
                <a
                  href="https://gamma.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 transition text-center font-bold text-slate-800 dark:text-slate-200 flex flex-col items-center gap-1"
                >
                  <span className="text-xs">⚡</span>
                  <span>Gamma App</span>
                </a>
                <a
                  href="https://miro.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 transition text-center font-bold text-slate-800 dark:text-slate-200 flex flex-col items-center gap-1"
                >
                  <span className="text-xs">🖼️</span>
                  <span>Miro / Figma</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. QUAL É A AÇÃO AGORA? */}
      {/* ========================================================================= */}
      <section 
        ref={sectionPhase2Ref}
        id="fase-2-execucao"
        className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5 scroll-mt-32 transition-all duration-300 ${
          highlightedSection === 'phase2' ? 'section-guided-target ring-2 ring-amber-500/60' : ''
        }`}
      >
        
        {/* Phase Header Badge */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">2</span>
            <div>
              <span className="text-2xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                FASE 2: EXECUÇÃO PRÁTICA
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                5. Qual é a ação agora?
              </h2>
            </div>
          </div>
        </div>

        {/* Roteiro de Ação da Equipe */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-2xs font-black flex items-center justify-center">✓</span>
            <span>Roteiro de Ação da Equipe:</span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-3">
            {activity.whatToDo.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <span className="font-black text-amber-700 dark:text-amber-400 text-sm">{idx + 1}.</span>
                <span className="text-xs text-slate-800 dark:text-slate-200 leading-snug font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real World Test Execution Support in E3-A01 / Field Tests */}
        {activity.id === 'E3-A01' && (
          <div className="pt-2">
            <RealWorldTestSupport
              onSyncEvidenceText={(text) => {
                setDraftContent(text);
              }}
            />
          </div>
        )}

        {/* 5. Qual prompt utilizo? (Seção de Copiloto IA ou Dinâmica Presencial) */}
        {activity.aiPrompt ? (
          <div className="bg-gradient-to-br from-amber-500/5 via-slate-900/5 to-slate-900/0 dark:from-amber-500/10 dark:to-slate-900 border-2 border-amber-500/30 rounded-3xl p-5 sm:p-6 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-500/20">
              <div>
                <span className="text-2xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                  Copiloto de IA • Prompt da Atividade
                </span>
                <h4 className="text-base font-black text-slate-900 dark:text-slate-100">
                  {activity.aiPrompt.purpose}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              <strong className="text-slate-900 dark:text-slate-100 font-extrabold">Como a IA ajudará:</strong> {activity.aiPrompt.whatAiHelpsDo}
            </p>

            {/* Microintervenção de Privacidade V3 */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 text-2xs text-blue-900 dark:text-blue-300">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-600 shrink-0" aria-hidden="true" />
              <span>
                <strong className="font-bold">Privacidade:</strong> Não inclua informações pessoais ou íntimas ao copiar contexto para a IA.
              </span>
            </div>

            {/* Standalone Action Buttons */}
            <div className="bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/40 p-4 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
                <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                  Copiar comando para o ChatGPT / Claude / Gemini:
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {/* Primary Button: Prompt + Context */}
                <button
                  onClick={handleCopyPromptWithContext}
                  className="btn-interactive min-h-[44px] py-2.5 px-4 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md active:shadow-xs transition flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
                  title="Copia o prompt com todas as variáveis e contexto acumulado do projeto e conduz para a Fase 3"
                >
                  {copiedType === 'promptContext' ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950 stroke-[3]" aria-hidden="true" />
                      <span>Prompt + Contexto Copiados!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-950" aria-hidden="true" />
                      <span>Copiar Prompt Completo (+ Contexto)</span>
                    </>
                  )}
                </button>

                {/* Secondary Button: Only Prompt Base */}
                <button
                  onClick={handleCopyPromptOnly}
                  className="btn-interactive min-h-[44px] py-2.5 px-3.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl shadow-2xs hover:shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation"
                  title="Copia somente a estrutura base do prompt"
                >
                  {copiedType === 'promptOnly' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[3]" aria-hidden="true" />
                      <span className="text-emerald-700 dark:text-emerald-300 font-extrabold">Prompt Base Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                      <span>Copiar Apenas Prompt Base</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Instruction Banner after Copy with Auto-scroll Shortcut */}
            {copiedType && (
              <div 
                role="status"
                className="bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 p-3.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-950 dark:text-emerald-100 shadow-xs animate-in fade-in slide-in-from-top-1 duration-200"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="font-extrabold">Prompt copiado para a área de transferência!</strong>
                    <p className="mt-0.5 text-emerald-900 dark:text-emerald-300 text-2xs sm:text-xs">
                      Cole no ChatGPT, Claude ou Gemini com <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded-md border border-emerald-300 dark:border-emerald-700 font-mono text-2xs">Ctrl + V</kbd>. Em seguida, tragam o resultado refinado para a <strong>Fase 3: Consolidação</strong> abaixo.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('phase3', true)}
                  className="btn-interactive shrink-0 min-h-[44px] px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl text-2xs font-extrabold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer touch-manipulation whitespace-nowrap self-stretch sm:self-auto"
                >
                  <span>Ir para Consolidação</span>
                  <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            )}

            {/* Progressive Disclosure: Ver Engenharia do Prompt Expansível */}
            <div className="bg-slate-950 text-slate-200 rounded-2xl text-xs font-mono border border-slate-800 overflow-hidden">
              <button
                onClick={() => setIsPromptExpanded(!isPromptExpanded)}
                aria-expanded={isPromptExpanded}
                aria-controls="prompt-code-body"
                className="w-full p-3.5 flex items-center justify-between bg-slate-900/90 hover:bg-slate-900 text-left transition border-b border-slate-800 cursor-pointer"
              >
                <span className="text-amber-400 font-sans font-extrabold text-2xs uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Ver engenharia completa do prompt ({activity.aiPrompt.templatePrompt.length} caracteres)</span>
                </span>
                <span className="text-amber-400 text-2xs font-sans font-bold flex items-center gap-1">
                  {isPromptExpanded ? (
                    <>
                      <span>Recolher</span>
                      <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      <span>Expandir texto</span>
                      <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                    </>
                  )}
                </span>
              </button>

              {isPromptExpanded && (
                <div id="prompt-code-body" className="p-4 overflow-y-auto max-h-96">
                  <p className="whitespace-pre-wrap leading-relaxed text-slate-300">
                    {activity.aiPrompt.templatePrompt}
                  </p>
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="bg-amber-500/10 dark:bg-amber-500/15 border-2 border-amber-500/30 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-2xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                Dinâmica de Grupo Presencial
              </span>
            </div>
            <h4 className="text-base font-black text-slate-900 dark:text-slate-100">
              Brainstorm e Decisão Coletiva no Espaço Físico
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Esta etapa é conduzida presencialmente no espaço com post-its e discussões em grupo. Não é necessário prompt de IA nesta fase — as decisões da equipe devem ser registradas abaixo e alimentarão as próximas etapas do projeto.
            </p>
          </div>
        )}

      </section>

      {/* ========================================================================= */}
      {/* 6. O QUE VALE REGISTRAR? */}
      {/* ========================================================================= */}
      <section 
        ref={sectionPhase3Ref}
        id="fase-3-consolidacao"
        className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5 scroll-mt-32 transition-all duration-300 ${
          highlightedSection === 'phase3' ? 'section-guided-target ring-2 ring-amber-500/60' : ''
        }`}
      >
        
        {/* Phase Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">3</span>
            <div>
              <span className="text-2xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                FASE 3: REVISÃO & CONSOLIDAÇÃO
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                6. O que vale registrar?
              </h2>
            </div>
          </div>

          {(existingConsolidated || (state.completedActivityIds || []).includes(activity.id)) && (
            <span className="self-start sm:self-auto px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 rounded-xl text-2xs font-black flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>{existingConsolidated?.versionName || activity.expectedVersionName || activity.title} Consolidado</span>
            </span>
          )}
        </div>

        {/* Esteira de Revisão Humana: LER -> QUESTIONAR -> EDITAR -> VALIDAR -> SALVAR */}
        <div className="bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 rounded-2xl p-4 space-y-2">
          <span className="text-2xs font-black text-amber-900 dark:text-amber-200 uppercase tracking-wider block">
            ESTEIRA DE REVISÃO HUMANA:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-2xs">
            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-bold text-slate-800 dark:text-slate-200">
              <span className="block text-amber-600 dark:text-amber-400 font-black">1. LER</span>
              <span className="text-3xs text-slate-500">Leia criticamente a minuta</span>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-bold text-slate-800 dark:text-slate-200">
              <span className="block text-amber-600 dark:text-amber-400 font-black">2. QUESTIONAR</span>
              <span className="text-3xs text-slate-500">Cheque o que faz sentido</span>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-bold text-slate-800 dark:text-slate-200">
              <span className="block text-amber-600 dark:text-amber-400 font-black">3. EDITAR</span>
              <span className="text-3xs text-slate-500">Ajuste o texto com o grupo</span>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-bold text-slate-800 dark:text-slate-200">
              <span className="block text-amber-600 dark:text-amber-400 font-black">4. VALIDAR</span>
              <span className="text-3xs text-slate-500">Confirme coerência</span>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center font-bold text-slate-800 dark:text-slate-200 col-span-2 sm:col-span-1">
              <span className="block text-amber-600 dark:text-amber-400 font-black">5. SALVAR</span>
              <span className="text-3xs text-slate-500">Consolide no projeto</span>
            </div>
          </div>
        </div>

        {/* Artefato esperado */}
        <div className="p-3.5 sm:p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 space-y-1">
          <div className="flex items-center gap-2 text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider">
            <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <span>Artefato / Resultado Esperado:</span>
          </div>
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
            {activity.expectedVersionName || activity.title}
          </p>
          <p className="text-2xs text-slate-600 dark:text-slate-400">
            {activity.requiresArtifact === false
              ? 'Registre aqui as principais anotações ou acordos do grupo para registro no workshop.'
              : 'Registre aqui a versão que representa o que sua equipe decidiu (após revisar criticamente a sugestão da IA).'}
          </p>
        </div>

        {/* Área de Edição da Minuta / Artefato */}
        {activity.id === 'E4-A01' ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100">
                Tríade do Pitch (Estrutura, Fala Integral e Síntese):
              </label>
              <span className="text-2xs text-slate-500 dark:text-slate-400 font-medium">
                Edite as 3 partes separadamente para alimentar a apresentação e o ensaio da banca.
              </span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
              <PitchTriadEditor
                onSyncDraft={(unified) => setDraftContent(unified)}
              />
            </div>
          </div>
        ) : activity.id === 'E4-A03' ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100">
                Banca Simulada & Pitch Revisado V1.4.1:
              </label>
              <span className="text-2xs text-slate-500 dark:text-slate-400 font-medium">
                Simule as 5 perguntas da banca uma por vez, refine a fala e salve a síntese crítica.
              </span>
            </div>
            <BancaSimuladaWorkflow
              onComplete={() => {
                const fullText = `=== PITCH REVISADO ===\n${state.projectData?.v3PitchRevised || ''}\n\n=== SÍNTESE CRÍTICA ===\nPONTOS FORTES:\n${state.projectData?.v3PitchStrongPoints || ''}\n\nPONTOS DE ATENÇÃO:\n${state.projectData?.v3PitchAttentionPoints || ''}\n\nCARTÃO DE BANCA:\n${state.projectData?.v3PitchBancaCard || ''}\n\nO QUE NÃO AFIRMAR AINDA:\n${state.projectData?.v3PitchWhatNotToClaimYet || ''}`;
                setDraftContent(fullText);
              }}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label 
                htmlFor="consolidation-textarea" 
                className="block text-xs font-bold text-slate-900 dark:text-slate-100"
              >
                Conteúdo da Minuta do {activity.expectedVersionName || 'Artefato'}:
              </label>
              <span className="text-2xs text-slate-500 dark:text-slate-400 font-medium">
                🔍 <strong>Revisão:</strong> Confirme se este artefato realmente representa o entendimento da equipe.
              </span>
            </div>
            <textarea
              ref={consolidationTextareaRef}
              id="consolidation-textarea"
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              placeholder={`Digite ou cole aqui a minuta revisada do ${activity.expectedVersionName || activity.title}...`}
              className="w-full h-56 p-4 text-base sm:text-xs font-mono bg-slate-50 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-2xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 caret-amber-500 leading-relaxed resize-y transition-all duration-200"
            />
          </div>
        )}

        {/* Declarative Claim Mappings / O que levamos desta atividade */}
        {activity.stateUpdateConfig?.allowedClaimMappings && activity.stateUpdateConfig.allowedClaimMappings.length > 0 && (
          <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl p-4 sm:p-5 space-y-4">
            <div>
              <h3 className="text-xs font-black text-amber-800 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" />
                <span>O QUE LEVAMOS DESTA ATIVIDADE? (SÍNTESE PARA O PROJETO)</span>
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                Preencha de forma concisa os campos abaixo. Eles atualizarão a aba <strong className="text-slate-900 dark:text-slate-100 font-bold">Meu Projeto</strong> e servirão de base para os próximos passos.
              </p>
            </div>

            <div className="space-y-3">
              {activity.stateUpdateConfig.allowedClaimMappings.map((mapping) => {
                const currentVal = structuredClaimValues[mapping.targetField]?.value || '';
                const currentStatus = structuredClaimValues[mapping.targetField]?.epistemologicalStatus || mapping.defaultEpistemologicalStatus;
                const fieldInputId = `claim-input-${mapping.targetField}`;

                const renderFriendlyBadge = (status: EpistemologicalStatus) => {
                  switch (status) {
                    case 'DECIDIDO':
                      return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-950 dark:bg-emerald-950/90 dark:text-emerald-200 text-2xs font-black rounded-md border border-emerald-300 dark:border-emerald-700 uppercase tracking-wider">DECIDIMOS</span>;
                    case 'OBSERVADO':
                      return <span className="px-2 py-0.5 bg-blue-100 text-blue-950 dark:bg-blue-950/90 dark:text-blue-200 text-2xs font-black rounded-md border border-blue-300 dark:border-blue-700 uppercase tracking-wider">OBSERVAMOS</span>;
                    case 'HIPOTESE':
                      return <span className="px-2 py-0.5 bg-amber-100 text-amber-950 dark:bg-amber-950/90 dark:text-amber-200 text-2xs font-black rounded-md border border-amber-300 dark:border-amber-700 uppercase tracking-wider">ACHAMOS QUE...</span>;
                    case 'NAO_TESTADO':
                      return <span className="px-2 py-0.5 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-2xs font-black rounded-md border border-slate-300 dark:border-slate-700 uppercase tracking-wider">AINDA NÃO TESTAMOS</span>;
                    case 'VALIDADO':
                      return <span className="px-2 py-0.5 bg-purple-100 text-purple-950 dark:bg-purple-950/90 dark:text-purple-200 text-2xs font-black rounded-md border border-purple-300 dark:border-purple-700 uppercase tracking-wider">VALIDADO</span>;
                    default:
                      return <span className="px-2 py-0.5 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-2xs font-black rounded-md uppercase tracking-wider">{status}</span>;
                  }
                };

                return (
                  <div key={mapping.targetField} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label htmlFor={fieldInputId} className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                        {mapping.label}
                      </label>

                      {mapping.allowStatusOverride ? (
                        <div className="flex items-center gap-2">
                          <label htmlFor={`status-${mapping.targetField}`} className="text-2xs font-bold text-slate-600 dark:text-slate-400">
                            Como estamos tratando isso?
                          </label>
                          <select
                            id={`status-${mapping.targetField}`}
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
                            className="text-2xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 font-bold text-amber-700 dark:text-amber-300 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 caret-amber-500"
                          >
                            <option value="DECIDIDO">DECIDIMOS</option>
                            <option value="OBSERVADO">OBSERVAMOS</option>
                            <option value="HIPOTESE">ACHAMOS QUE...</option>
                            <option value="NAO_TESTADO">AINDA NÃO TESTAMOS</option>
                            {currentStatus === 'VALIDADO' && <option value="VALIDADO">VALIDADO</option>}
                          </select>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-2xs text-slate-600 dark:text-slate-400">
                          <span className="font-semibold">Registraremos como:</span>
                          {renderFriendlyBadge(currentStatus)}
                        </div>
                      )}
                    </div>

                    <input
                      id={fieldInputId}
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
                      className="w-full p-2.5 sm:p-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-base sm:text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-4 focus:ring-amber-500/15 focus:border-amber-500 caret-amber-500 transition-all duration-200"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Checkpoint Controls: Draft vs Checkpoint de Autoria */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleSaveDraft}
            className="btn-interactive min-h-[44px] w-full sm:w-auto px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold rounded-xl shadow-2xs hover:shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            <span>Salvar Rascunho</span>
          </button>

          {/* Checkpoint de Autoria Humana */}
          <div className="w-full sm:w-auto bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 p-3 sm:p-3.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 text-center sm:text-left">
              Este resultado representa a decisão da equipe?
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-stretch sm:justify-end">
              <button
                onClick={handleSaveDraft}
                className="btn-interactive min-h-[44px] flex-1 sm:flex-initial px-3 py-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-bold transition text-center cursor-pointer touch-manipulation"
              >
                Ainda revisando
              </button>
              <button
                onClick={handleConsolidateCheckpoint}
                className="btn-interactive min-h-[44px] flex-1 sm:flex-initial px-4 py-2 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 text-xs sm:text-sm font-black rounded-xl shadow-xs hover:shadow-md active:shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation"
              >
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>Sim, consolidar artefato</span>
              </button>
            </div>
          </div>
        </div>

        {/* Metacognitive Reflection Box */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4">
          <h4 className="text-2xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
            <span>Reflexão Metacognitiva da Equipe</span>
          </h4>
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 italic">
            "{activity.metacognitiveReflection}"
          </p>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. QUAL É O PRÓXIMO PASSO? */}
      {/* ========================================================================= */}
      <section
        ref={handoffSectionRef}
        id="fase-4-handoff"
        className={`space-y-4 scroll-mt-32 transition-all duration-300 ${
          highlightedSection === 'phase4' ? 'section-guided-target ring-2 ring-amber-500/60 rounded-3xl p-3' : ''
        }`}
      >
        <div className="flex items-center gap-2 px-1">
          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">4</span>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            7. Qual é o próximo passo?
          </h2>
        </div>
        <HandoffCompact
          handoff={{
            youConcluded: activity.handoff.producedArtifactName || activity.title,
            whatChanged: activity.handoff.nowWeKnow || '',
            weProduced: activity.requiresArtifact === false ? undefined : activity.handoff.producedArtifactName,
            stillOpen: activity.handoff.stillOpen ? [activity.handoff.stillOpen] : undefined,
            nextStep: activity.handoff.nextActivityTitle || 'Próxima atividade da jornada',
            nextActivityId: activity.handoff.nextActivityId as any,
          }}
          activityTitle={activity.title}
          isCompleted={isActivityCompleted}
          onAdvance={() => {
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
          advanceButtonLabel={
            PILOT_CHAIN_ACTIVITIES.some(a => a.id === activity.handoff.nextActivityId)
              ? `Avançar para ${activity.handoff.nextActivityTitle}`
              : 'Encerramento da Jornada'
          }
        />
      </section>

      {/* CONTEXT PACK TRANSPARENCY MODAL */}
      {showContextModal && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="context-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 id="context-modal-title" className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-500" aria-hidden="true" />
                  <span>Transparência do Context Pack V3</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Veja exatamente quais informações e artefatos consolidados estão sendo transmitidos para a IA.
                </p>
              </div>
              <button
                onClick={() => setShowContextModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold px-2 py-1 cursor-pointer"
                aria-label="Fechar modal"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 text-xs font-mono bg-slate-950 text-slate-200">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-amber-300 font-sans text-xs space-y-1">
                <p><strong>Diretriz de Transparência:</strong> A aplicação não envia dados arbitrários. Apenas os artefatos consolidados e afirmações autorizadas fazem parte deste pacote.</p>
                <p className="text-2xs text-blue-300 font-semibold flex items-center gap-1.5 pt-0.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span><strong>Privacidade:</strong> Não inclua informações pessoais ou íntimas ao copiar contexto para a IA.</span>
                </p>
              </div>

              <label htmlFor="modal-prompt-content" className="sr-only">
                Texto Completo do Prompt e Contexto Injetado
              </label>
              <textarea
                id="modal-prompt-content"
                readOnly
                value={fullPromptWithContext}
                className="w-full h-80 p-3 bg-slate-900 text-slate-300 rounded-xl border border-slate-800 text-2xs leading-relaxed focus:outline-none font-mono"
              />
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
              <span className="text-xs text-slate-500">
                Total de caracteres: {fullPromptWithContext.length}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(fullPromptWithContext);
                  showToast('Conteúdo do modal copiado com sucesso!');
                  setShowContextModal(false);
                }}
                className="btn-interactive min-h-[44px] px-4 py-2 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs transition cursor-pointer touch-manipulation"
              >
                Copiar Texto Completo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FACILITATOR OBSERVATION MODAL */}
      {showObsModal && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="obs-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <form onSubmit={handleSaveObservation} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 id="obs-modal-title" className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <MessageSquarePlus className="w-4 h-4 text-amber-500" aria-hidden="true" />
                <span>Registrar Observação da Execução (Facilitador)</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowObsModal(false)}
                className="btn-interactive min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold cursor-pointer touch-manipulation"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <div>
              <label htmlFor="obs-activity-id" className="block text-2xs font-extrabold text-slate-500 uppercase mb-1">
                Atividade
              </label>
              <input
                id="obs-activity-id"
                type="text"
                disabled
                value={`${activity.id} - ${activity.title}`}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl text-slate-600 dark:text-slate-400 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="obs-category" className="block text-2xs font-extrabold text-slate-500 uppercase mb-1">
                  Categoria
                </label>
                <select
                  id="obs-category"
                  value={obsCategory}
                  onChange={(e) => setObsCategory(e.target.value as ObservationCategory)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs rounded-xl font-bold text-slate-800 dark:text-slate-200"
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
                <label htmlFor="obs-intensity" className="block text-2xs font-extrabold text-slate-500 uppercase mb-1">
                  Intensidade do Problema
                </label>
                <select
                  id="obs-intensity"
                  value={obsIntensity}
                  onChange={(e) => setObsIntensity(e.target.value as 'BAIXA' | 'MEDIA' | 'ALTA')}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs rounded-xl font-bold text-slate-800 dark:text-slate-200"
                >
                  <option value="BAIXA">Baixa</option>
                  <option value="MEDIA">Média</option>
                  <option value="ALTA">Alta</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="obs-what-happened" className="block text-2xs font-extrabold text-slate-500 uppercase mb-1">
                O que aconteceu? (Fato observado)
              </label>
              <textarea
                id="obs-what-happened"
                required
                value={obsWhatHappened}
                onChange={(e) => setObsWhatHappened(e.target.value)}
                placeholder="Ex: A maioria dos grupos teve dúvida sobre a diferença entre hipótese e fato no item 3."
                className="w-full h-20 p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs rounded-xl text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label htmlFor="obs-interpretation" className="block text-2xs font-extrabold text-slate-500 uppercase mb-1">
                O que achamos que significa? (Interpretação opcional)
              </label>
              <input
                id="obs-interpretation"
                type="text"
                value={obsInterpretation}
                onChange={(e) => setObsInterpretation(e.target.value)}
                placeholder="Ex: Talvez o exemplo no prompt precise ser mais prático."
                className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs rounded-xl text-slate-800 dark:text-slate-200"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="obsIntervention"
                checked={obsNeededIntervention}
                onChange={(e) => setObsNeededIntervention(e.target.checked)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
              />
              <label htmlFor="obsIntervention" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Exigiu intervenção direta do facilitador
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowObsModal(false)}
                className="btn-interactive min-h-[44px] px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition cursor-pointer touch-manipulation"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-interactive min-h-[44px] px-4 py-2 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 text-xs font-black rounded-xl shadow-xs transition cursor-pointer touch-manipulation"
              >
                Salvar Observação
              </button>
            </div>
          </form>
        </div>
      )}

      {/* JOURNEY COMPLETION MODAL */}
      {showJourneyEndModal && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="journey-end-title"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-3xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
            </div>
            <h3 id="journey-end-title" className="text-lg font-black text-slate-900 dark:text-slate-100">
              Jornada V1.4.1 Concluída com Sucesso!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Sua equipe percorreu todas as etapas da cadeia metodológica de investigação, síntese, prototipação e comunicação com IA no workshop <strong>O FORNO</strong>.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowJourneyEndModal(false);
                  onNavigateToActivity?.('E1-A01');
                }}
                className="btn-interactive min-h-[44px] w-full py-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs transition cursor-pointer touch-manipulation"
              >
                Revisar Artefatos em Meu Projeto
              </button>
              <button
                onClick={() => setShowJourneyEndModal(false)}
                className="btn-interactive min-h-[44px] w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition cursor-pointer touch-manipulation"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
