import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  Clock, 
  Presentation, 
  MessageSquarePlus, 
  CheckSquare, 
  Users, 
  FileText, 
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Maximize2,
  Tag,
  Trash2,
  Copy,
  Check,
  Filter,
  AlertCircle,
  Bug,
  HelpCircle,
  Lightbulb,
  Cpu,
  Smartphone,
  Layers,
  HeartHandshake,
  ArrowRight,
  Search,
  CheckCircle2,
  Calendar,
  Compass,
  Zap,
  ChevronRight,
  MoreHorizontal,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PILOT_CHAIN_ACTIVITIES, getPilotActivityById } from '../../data/pilotChain';
import { ObservationCategory, FacilitatorObservation } from '../../types/workshop';
import { TeamsTab } from './TeamsTab';
import { FacilitatorProgressRadar } from './FacilitatorProgressRadar';
import { ConfirmModal } from '../ConfirmModal';

interface CategoryOption {
  value: ObservationCategory;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  activeClass: string;
  badgeClass: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { 
    value: 'PROMPT', 
    label: 'Prompt / Biblioteca', 
    shortLabel: 'Prompt',
    icon: <Sparkles className="w-3.5 h-3.5" />,
    activeClass: 'bg-purple-600 text-white border-purple-700 shadow-xs ring-2 ring-purple-300 dark:ring-purple-800',
    badgeClass: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
  },
  { 
    value: 'METODOLOGIA', 
    label: 'Metodologia', 
    shortLabel: 'Metodologia',
    icon: <Layers className="w-3.5 h-3.5" />,
    activeClass: 'bg-indigo-600 text-white border-indigo-700 shadow-xs ring-2 ring-indigo-300 dark:ring-indigo-800',
    badgeClass: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
  },
  { 
    value: 'UX', 
    label: 'Interface / UX', 
    shortLabel: 'UX',
    icon: <Smartphone className="w-3.5 h-3.5" />,
    activeClass: 'bg-teal-600 text-white border-teal-700 shadow-xs ring-2 ring-teal-300 dark:ring-teal-800',
    badgeClass: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800'
  },
  { 
    value: 'BUG', 
    label: 'Bug / Problema Técnico', 
    shortLabel: 'Bug',
    icon: <Bug className="w-3.5 h-3.5" />,
    activeClass: 'bg-rose-600 text-white border-rose-700 shadow-xs ring-2 ring-rose-300 dark:ring-rose-800',
    badgeClass: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
  },
  { 
    value: 'TEMPO', 
    label: 'Tempo / Ritmo', 
    shortLabel: 'Tempo',
    icon: <Clock className="w-3.5 h-3.5" />,
    activeClass: 'bg-amber-600 text-white border-amber-700 shadow-xs ring-2 ring-amber-300 dark:ring-amber-800',
    badgeClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
  },
  { 
    value: 'AUTONOMIA', 
    label: 'Autonomia da Equipe', 
    shortLabel: 'Autonomia',
    icon: <Compass className="w-3.5 h-3.5" />,
    activeClass: 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-300 dark:ring-emerald-800',
    badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
  },
  { 
    value: 'FACILITACAO', 
    label: 'Facilitação', 
    shortLabel: 'Facilitação',
    icon: <HeartHandshake className="w-3.5 h-3.5" />,
    activeClass: 'bg-orange-600 text-white border-orange-700 shadow-xs ring-2 ring-orange-300 dark:ring-orange-800',
    badgeClass: 'bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800'
  },
  { 
    value: 'IDEIA', 
    label: 'Ideia / Insight', 
    shortLabel: 'Ideia',
    icon: <Lightbulb className="w-3.5 h-3.5" />,
    activeClass: 'bg-yellow-500 text-slate-950 border-yellow-600 shadow-xs ring-2 ring-yellow-300 dark:ring-yellow-800',
    badgeClass: 'bg-yellow-50 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800'
  },
  { 
    value: 'CURIOSIDADE', 
    label: 'Curiosidade / Comportamento', 
    shortLabel: 'Curiosidade',
    icon: <HelpCircle className="w-3.5 h-3.5" />,
    activeClass: 'bg-cyan-600 text-white border-cyan-700 shadow-xs ring-2 ring-cyan-300 dark:ring-cyan-800',
    badgeClass: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800'
  },
  { 
    value: 'OUTRA', 
    label: 'Outra Observação', 
    shortLabel: 'Outra',
    icon: <Tag className="w-3.5 h-3.5" />,
    activeClass: 'bg-slate-700 text-white border-slate-800 shadow-xs ring-2 ring-slate-400 dark:ring-slate-700',
    badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
  },
  // Retrocompatibilidade
  { 
    value: 'CONTEUDO', 
    label: 'Conteúdo', 
    shortLabel: 'Conteúdo',
    icon: <FileText className="w-3.5 h-3.5" />,
    activeClass: 'bg-blue-600 text-white border-blue-700 shadow-xs ring-2 ring-blue-300 dark:ring-blue-800',
    badgeClass: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
  },
  { 
    value: 'TECNOLOGIA', 
    label: 'Tecnologia', 
    shortLabel: 'Tecnologia',
    icon: <Cpu className="w-3.5 h-3.5" />,
    activeClass: 'bg-sky-600 text-white border-sky-700 shadow-xs ring-2 ring-sky-300 dark:ring-sky-800',
    badgeClass: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800'
  },
  { 
    value: 'DUVIDA_USUARIO', 
    label: 'Dúvida do Usuário', 
    shortLabel: 'Dúvida',
    icon: <HelpCircle className="w-3.5 h-3.5" />,
    activeClass: 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs ring-2 ring-amber-300 dark:ring-amber-800',
    badgeClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
  }
];

export const FacilitatorView: React.FC = () => {
  const { 
    state, 
    timer, 
    startTimer, 
    pauseTimer, 
    resumeTimer, 
    resetTimer, 
    addMinutesToTimer, 
    toggleTimerFullscreen,
    addFacilitatorObservation,
    deleteFacilitatorObservation,
    toggleActivityCompleted,
    setCurrentPilotActivityId,
    setActiveWebappTab,
    setUserMode
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'radar' | 'conducao' | 'equipes' | 'observacoes'>('radar');
  const [showObsModal, setShowObsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | ObservationCategory>('ALL');
  const [activityFilter, setActivityFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fast inline note state (instant capture in conduction tab)
  const [inlineNoteText, setInlineNoteText] = useState('');
  const [inlineCategory, setInlineCategory] = useState<ObservationCategory>('PROMPT');
  const inlineInputRef = useRef<HTMLInputElement>(null);

  // Form state for full modal
  const [obsCategory, setObsCategory] = useState<ObservationCategory>('PROMPT');
  const [obsIntensity, setObsIntensity] = useState<'BAIXA' | 'MEDIA' | 'ALTA'>('MEDIA');
  const [obsActivityId, setObsActivityId] = useState<string>(state.currentPilotActivityId || 'E1-A01');
  const [obsWhatHappened, setObsWhatHappened] = useState('');
  const [obsToDelete, setObsToDelete] = useState<string | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentActivity = getPilotActivityById(state.currentPilotActivityId || 'E1-A01');

  // Find next activity in sequence
  const currentIdx = PILOT_CHAIN_ACTIVITIES.findIndex((a) => a.id === currentActivity.id);
  const nextActivity = currentIdx < PILOT_CHAIN_ACTIVITIES.length - 1 ? PILOT_CHAIN_ACTIVITIES[currentIdx + 1] : null;
  const prevActivity = currentIdx > 0 ? PILOT_CHAIN_ACTIVITIES[currentIdx - 1] : null;

  // Sync modal default activity when opening
  const handleOpenModal = (forcedActivityId?: string) => {
    setObsActivityId(forcedActivityId || state.currentPilotActivityId || 'E1-A01');
    setObsWhatHappened('');
    setShowObsModal(true);
  };

  useEffect(() => {
    if (showObsModal) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [showObsModal]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Instant inline observation submission (0 extra clicks, < 3s)
  const handleSaveInlineObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineNoteText.trim()) return;

    addFacilitatorObservation({
      activityId: currentActivity.id,
      activityTitle: `${currentActivity.id} — ${currentActivity.title}`,
      category: inlineCategory,
      whatHappened: inlineNoteText.trim(),
      intensity: 'MEDIA',
    });

    setInlineNoteText('');
    showToast(`Observação [${inlineCategory}] registrada!`);
  };

  // Modal observation save
  const handleSaveObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!obsWhatHappened.trim()) return;

    const selectedAct = getPilotActivityById(obsActivityId);

    addFacilitatorObservation({
      activityId: obsActivityId,
      activityTitle: selectedAct ? `${selectedAct.id} — ${selectedAct.title}` : 'Geral',
      category: obsCategory,
      whatHappened: obsWhatHappened.trim(),
      intensity: obsIntensity,
    });

    setObsWhatHappened('');
    setShowObsModal(false);
    showToast('Observação gravada com sucesso!');
  };

  // Direct 1-click Transition: Atividade Atual → Próxima Atividade
  const handleTransitionToNext = () => {
    if (!nextActivity) return;

    // 1. Mark current as completed if not already marked
    if (!state.completedActivityIds.includes(currentActivity.id)) {
      toggleActivityCompleted(currentActivity.id);
    }

    // 2. Advance to next activity
    setCurrentPilotActivityId(nextActivity.id);

    // 3. Start/load timer with next activity duration
    startTimer(nextActivity.durationMinutes, nextActivity.title);

    showToast(`Avançado para ${nextActivity.id}: ${nextActivity.title}`);
  };

  // Direct 1-click Transition to specific activity
  const handleJumpToActivity = (actId: string) => {
    const act = getPilotActivityById(actId);
    if (!act) return;
    setCurrentPilotActivityId(act.id);
    startTimer(act.durationMinutes, act.title);
    showToast(`Atividade selecionada: ${act.id} — ${act.title}`);
  };

  const observations = state.facilitatorObservations || [];

  // Filter observations by search, category, and activity
  const filteredObservations = observations.filter((o) => {
    const matchCategory = categoryFilter === 'ALL' || o.category === categoryFilter;
    const matchActivity = activityFilter === 'ALL' || o.activityId === activityFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchQuery = !query || 
      o.whatHappened.toLowerCase().includes(query) || 
      o.activityId.toLowerCase().includes(query) ||
      (o.activityTitle && o.activityTitle.toLowerCase().includes(query)) ||
      o.category.toLowerCase().includes(query);
    return matchCategory && matchActivity && matchQuery;
  });

  // Calculate estimated finish time
  const getEstimatedFinishTime = (): string => {
    if (timer.remainingSeconds <= 0) return 'Tempo esgotado';
    const now = new Date();
    const finishDate = new Date(now.getTime() + timer.remainingSeconds * 1000);
    return finishDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate timer progress percentage
  const initialSecs = timer.initialSeconds || (currentActivity.durationMinutes * 60);
  const remainingSecs = timer.remainingSeconds;
  const elapsedSecs = Math.max(0, initialSecs - remainingSecs);
  const progressPercent = Math.min(100, Math.max(0, Math.round((elapsedSecs / (initialSecs || 1)) * 100)));

  // Timer alert state
  const isUrgent = remainingSecs > 0 && remainingSecs <= 120; // Last 2 min
  const isWarning = remainingSecs > 120 && remainingSecs <= 300; // Last 5 min
  const isFinished = remainingSecs === 0;

  const handleCopyAllObservations = async () => {
    if (observations.length === 0) return;
    const text = observations
      .map((o, idx) => {
        const cat = CATEGORY_OPTIONS.find((c) => c.value === o.category)?.label || o.category;
        const date = new Date(o.timestamp).toLocaleString('pt-BR');
        return `${idx + 1}. [${cat}] [Atividade: ${o.activityId} — ${o.activityTitle || ''}]\nData/Hora: ${date}\nAnotação: ${o.whatHappened}\n`;
      })
      .join('\n---\n\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
      showToast('Todas as observações foram copiadas!');
    } catch {
      showToast('Erro ao copiar para a área de transferência');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 px-4 sm:px-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-amber-300 border border-amber-500/40 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Facilitator Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white p-6 sm:p-7 rounded-3xl shadow-lg space-y-4 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 text-white border border-white/30 backdrop-blur-xs">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                  Painel de Condução do Facilitador
                </h1>
                <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-slate-950/40 text-amber-200 text-[10px] font-black uppercase tracking-wider border border-amber-400/30">
                  Modo Piloto
                </span>
              </div>
              <p className="text-xs text-amber-100 mt-0.5 max-w-xl">
                Controle o ritmo da oficina, realize transições com 1 clique e capture aprendizados em segundos.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setUserMode('participante');
                setActiveWebappTab('jornada');
              }}
              className="w-full sm:w-auto px-3.5 py-2.5 bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0 border border-white/25"
              title="Sair do painel e voltar ao modo participante"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Voltar ao Modo Participante</span>
            </button>

            <button
              onClick={() => handleOpenModal()}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-950 hover:bg-slate-900 text-amber-300 font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 shrink-0 border border-amber-400/30"
              title="Abrir modal de registro de observação"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-400" />
              <span>Registrar Observação</span>
            </button>
          </div>
        </div>

        {/* Quick Navigator Strip (Régua Rápida de Atividades) */}
        <div className="pt-2 border-t border-white/20">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-extrabold text-amber-100 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              Navegador Rápido de Atividades (Salto Direto com 1 Clique)
            </span>
            <span className="text-[11px] text-amber-100 font-medium">
              Atividade {currentIdx + 1} de {PILOT_CHAIN_ACTIVITIES.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {PILOT_CHAIN_ACTIVITIES.map((act, index) => {
              const isCurrent = act.id === currentActivity.id;
              const isCompleted = state.completedActivityIds.includes(act.id);
              return (
                <button
                  key={act.id}
                  onClick={() => handleJumpToActivity(act.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isCurrent
                      ? 'bg-slate-950 text-amber-300 shadow-md ring-2 ring-amber-300'
                      : isCompleted
                      ? 'bg-white/20 hover:bg-white/30 text-white border border-emerald-400/50'
                      : 'bg-white/10 hover:bg-white/20 text-amber-100'
                  }`}
                  title={`${act.id} — ${act.title} (${act.durationMinutes}m)`}
                >
                  {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-300" />}
                  <span>{act.id}</span>
                  <span className="text-[10px] opacity-75 font-mono">{act.durationMinutes}m</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subtab Navigation for Facilitator */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSubTab('radar')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 shrink-0 cursor-pointer ${
            activeSubTab === 'radar'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Radar de Progressão Assíncrona</span>
        </button>

        <button
          onClick={() => setActiveSubTab('conducao')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 shrink-0 cursor-pointer ${
            activeSubTab === 'conducao'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Presentation className="w-4 h-4" />
          <span>Condução, Cronômetro & Transições</span>
        </button>

        <button
          onClick={() => setActiveSubTab('observacoes')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 shrink-0 cursor-pointer ${
            activeSubTab === 'observacoes'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Anotações & Aprendizados ({observations.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('equipes')}
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 shrink-0 cursor-pointer ${
            activeSubTab === 'equipes'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Gestão de Equipes ({state.teams?.length || 0})</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SUBTAB 0: RADAR DE PROGRESSÃO ASSÍNCRONA DAS EQUIPES      */}
      {/* ========================================================= */}
      {activeSubTab === 'radar' && (
        <FacilitatorProgressRadar onOpenObservationModal={(actId) => handleOpenModal(actId)} />
      )}

      {/* ========================================================= */}
      {/* SUBTAB 1: CONDUÇÃO, CRONÔMETRO E TRANSIÇÕES                */}
      {/* ========================================================= */}
      {activeSubTab === 'conducao' && (
        <div className="space-y-6">

          {/* Quick Inline Note Capture Bar */}
          <form 
            onSubmit={handleSaveInlineObservation}
            className="bg-white dark:bg-slate-900 border border-amber-500/30 rounded-2xl p-3 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0 px-1">
              <MessageSquarePlus className="w-4 h-4" />
              <span>Anotação Rápida:</span>
            </div>

            <div className="flex-1 flex items-center gap-2">
              <select
                value={inlineCategory}
                onChange={(e) => setInlineCategory(e.target.value as ObservationCategory)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 shrink-0"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>{c.shortLabel}</option>
                ))}
              </select>

              <input
                ref={inlineInputRef}
                type="text"
                value={inlineNoteText}
                onChange={(e) => setInlineNoteText(e.target.value)}
                placeholder={`Anotar algo sobre ${currentActivity.id} (Pressione Enter para salvar)...`}
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={!inlineNoteText.trim()}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Salvar Nota</span>
            </button>
          </form>

          {/* Grid Layout: Atividade Atual + Próxima + Cronômetro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left/Main Column: Atividade Atual & Próxima (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* AGORA Section */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4 relative">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-2xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    EM EXECUÇÃO AGORA
                  </span>
                  <span className="text-2xs text-slate-500 dark:text-slate-400 font-bold">
                    {currentActivity.youAreHere.encounterTitle}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-lg border border-amber-300 dark:border-amber-800 font-mono">
                      {currentActivity.id}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
                      {currentActivity.title}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentActivity.whyItMatters}
                  </p>
                </div>

                {/* 3 Status Boxes */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 text-2xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 rounded-xl space-y-0.5">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Duração</span>
                    <span className="text-slate-900 dark:text-slate-100 font-extrabold text-xs">{currentActivity.durationMinutes} min</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 rounded-xl space-y-0.5">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Movimento</span>
                    <span className="text-slate-900 dark:text-slate-100 font-extrabold text-xs truncate block">{currentActivity.movementTitle}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 rounded-xl space-y-0.5">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Artefato Esperado</span>
                    <span className="text-amber-600 dark:text-amber-400 font-extrabold text-xs truncate block">{currentActivity.expectedVersionName || 'Registro de Etapa'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setActiveWebappTab('atividade')}
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-xs"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Abrir Workspace do Participante</span>
                  </button>

                  <button
                    onClick={() => handleOpenModal(currentActivity.id)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Anotar observação para esta atividade"
                  >
                    <MessageSquarePlus className="w-4 h-4 text-amber-500" />
                    <span>Anotar</span>
                  </button>
                </div>
              </div>

              {/* TRANSIÇÃO: PRÓXIMA ATIVIDADE (A SEGUIR) */}
              <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <span className="text-2xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                    PRÓXIMA ATIVIDADE (TRANSIÇÃO DIRETA)
                  </span>
                  {nextActivity && (
                    <span className="text-2xs font-bold text-amber-600 dark:text-amber-400">
                      Duração planejada: {nextActivity.durationMinutes} min
                    </span>
                  )}
                </div>

                {nextActivity ? (
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xs font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                            {nextActivity.id}
                          </span>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                            {nextActivity.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {nextActivity.whyItMatters}
                        </p>
                      </div>
                    </div>

                    {/* Transition Button */}
                    <button
                      onClick={handleTransitionToNext}
                      className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98"
                    >
                      <span>Concluir Atual & Iniciar Próxima ({nextActivity.id})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="py-4 text-center text-xs text-slate-400 space-y-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                    <p className="font-bold text-slate-700 dark:text-slate-300">
                      Você está na última atividade da trilha!
                    </p>
                    <p className="text-2xs">Todas as etapas do piloto foram conduzidas.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: CRONÔMETRO COMPLETO (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-slate-950 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-5 sticky top-24">
                
                {/* Header with Fullscreen trigger */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-2xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    CRONÔMETRO DA OFICINA
                  </span>
                  <button
                    onClick={toggleTimerFullscreen}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
                    title="Modo Projeção em Tela Cheia (Para os Participantes)"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Main Digital Display */}
                <div className="text-center space-y-2 py-1">
                  <div className="flex items-center justify-center gap-2">
                    <div className={`text-5xl sm:text-6xl font-mono font-black tracking-tight ${
                      isFinished 
                        ? 'text-rose-500 animate-pulse' 
                        : isUrgent 
                        ? 'text-rose-400' 
                        : isWarning 
                        ? 'text-amber-400' 
                        : 'text-white'
                    }`}>
                      {String(timer.minutes).padStart(2, '0')}:{String(timer.seconds).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        isFinished ? 'bg-rose-500' : isUrgent ? 'bg-rose-500' : isWarning ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Estimated Finish Time & Activity Name */}
                  <div className="flex items-center justify-between text-2xs px-1 text-slate-400 font-medium">
                    <span>
                      Duração: <strong className="text-white">{currentActivity.durationMinutes}m</strong>
                    </span>
                    <span>
                      Término previsto: <strong className="text-amber-400">{getEstimatedFinishTime()}</strong>
                    </span>
                  </div>
                </div>

                {/* Primary Start / Pause / Reset Controls */}
                <div className="grid grid-cols-2 gap-2">
                  {timer.isRunning ? (
                    <button
                      onClick={pauseTimer}
                      className="py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 shadow-md"
                    >
                      <Pause className="w-4 h-4" /> Pausar
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (timer.remainingSeconds === 0) {
                          startTimer(currentActivity.durationMinutes, currentActivity.title);
                        } else {
                          resumeTimer();
                        }
                      }}
                      className="py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 shadow-md"
                    >
                      <Play className="w-4 h-4 fill-slate-950" /> {timer.remainingSeconds === 0 ? 'Iniciar' : 'Continuar'}
                    </button>
                  )}

                  <button
                    onClick={resetTimer}
                    className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" /> Reiniciar
                  </button>
                </div>

                {/* Quick Add / Subtract Time Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-3xs">
                  <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <span>Ajustes Rápidos de Tempo</span>
                    <button
                      onClick={() => startTimer(currentActivity.durationMinutes, currentActivity.title)}
                      className="text-amber-400 hover:underline cursor-pointer"
                      title="Restaurar duração planejada da ementa"
                    >
                      Padrão ({currentActivity.durationMinutes}m)
                    </button>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5">
                    <button
                      onClick={() => addMinutesToTimer(-1)}
                      className="py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 font-black rounded-lg transition cursor-pointer text-center"
                      title="Reduzir 1 minuto"
                    >
                      -1m
                    </button>
                    <button
                      onClick={() => addMinutesToTimer(1)}
                      className="py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-black rounded-lg transition cursor-pointer text-center"
                      title="Adicionar 1 minuto"
                    >
                      +1m
                    </button>
                    <button
                      onClick={() => addMinutesToTimer(2)}
                      className="py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-black rounded-lg transition cursor-pointer text-center"
                      title="Adicionar 2 minutos"
                    >
                      +2m
                    </button>
                    <button
                      onClick={() => addMinutesToTimer(5)}
                      className="py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-black rounded-lg transition cursor-pointer text-center"
                      title="Adicionar 5 minutos"
                    >
                      +5m
                    </button>
                    <button
                      onClick={() => addMinutesToTimer(10)}
                      className="py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-black rounded-lg transition cursor-pointer text-center"
                      title="Adicionar 10 minutos"
                    >
                      +10m
                    </button>
                  </div>
                </div>

                {/* Projection Mode Action */}
                <div className="pt-2">
                  <button
                    onClick={toggleTimerFullscreen}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Presentation className="w-4 h-4 text-amber-400" />
                    <span>Abrir Tela de Projeção</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 2: ANOTAÇÕES, APRENDIZADOS & FILTROS (RODADA 8)     */}
      {/* ========================================================= */}
      {activeSubTab === 'observacoes' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-amber-500" />
                Anotações e Aprendizados do Piloto ({observations.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Consulte, filtre por categoria e copie o diário de bordo com as percepções de campo.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {observations.length > 0 && (
                <button
                  onClick={handleCopyAllObservations}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  title="Copiar todas as observações registradas para a área de transferência"
                >
                  {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAll ? 'Copiado!' : 'Copiar Todas'}</span>
                </button>
              )}

              <button
                onClick={() => handleOpenModal()}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Observação</span>
              </button>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              
              {/* Text Search input */}
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar palavras-chave nas observações..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Activity filter dropdown */}
              <select
                value={activityFilter}
                onChange={(e) => setActivityFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shrink-0"
              >
                <option value="ALL">Todas as Atividades ({observations.length})</option>
                {PILOT_CHAIN_ACTIVITIES.map((a) => {
                  const cnt = observations.filter((o) => o.activityId === a.id).length;
                  return (
                    <option key={a.id} value={a.id}>
                      {a.id} — {a.title} ({cnt})
                    </option>
                  );
                })}
              </select>

            </div>

            {/* Category Filter Chips (10 Categorias canônicas) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-2xs">
              <span className="text-slate-400 font-bold mr-1 shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Categorias:
              </span>
              <button
                onClick={() => setCategoryFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg font-extrabold transition shrink-0 cursor-pointer ${
                  categoryFilter === 'ALL'
                    ? 'bg-slate-950 text-amber-400'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Todas ({observations.length})
              </button>
              {CATEGORY_OPTIONS.map((cat) => {
                const count = observations.filter((o) => o.category === cat.value).length;
                if (count === 0 && categoryFilter !== cat.value) return null;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setCategoryFilter(cat.value)}
                    className={`px-2.5 py-1 rounded-lg font-extrabold transition shrink-0 cursor-pointer flex items-center gap-1 ${
                      categoryFilter === cat.value
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.shortLabel} ({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Observations List */}
          {filteredObservations.length === 0 ? (
            <div className="py-12 text-center space-y-3 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              <MessageSquarePlus className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {observations.length === 0 
                  ? 'Nenhuma anotação registrada ainda. Use o campo rápido acima ou o botão "Nova Observação" para documentar aprendizados de campo em poucos segundos.' 
                  : 'Nenhuma anotação corresponde aos filtros selecionados.'}
              </p>
              {observations.length === 0 && (
                <button
                  onClick={() => handleOpenModal()}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black transition cursor-pointer"
                >
                  + Registrar Primeira Observação
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredObservations.map((obs) => {
                const catInfo = CATEGORY_OPTIONS.find((c) => c.value === obs.category) || {
                  label: obs.category,
                  icon: <Tag className="w-3.5 h-3.5" />,
                  badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                };

                return (
                  <div 
                    key={obs.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/70 hover:border-slate-300 dark:hover:border-slate-700 transition space-y-2 shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-850 pb-2">
                      <div className="flex items-center gap-2">
                        {/* Category Badge */}
                        <span className={`px-2.5 py-0.5 rounded-md text-2xs font-extrabold border flex items-center gap-1 ${catInfo.badgeClass}`}>
                          {catInfo.icon}
                          <span>{catInfo.label}</span>
                        </span>

                        {/* Activity Badge */}
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-bold">
                          {obs.activityId}
                        </span>

                        {obs.activityTitle && (
                          <span className="text-2xs text-slate-400 font-medium hidden sm:inline truncate max-w-xs">
                            {obs.activityTitle}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-3xs font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(obs.timestamp).toLocaleDateString('pt-BR')} às {new Date(obs.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <button
                          onClick={() => setObsToDelete(obs.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                          title="Excluir esta observação"
                          aria-label="Excluir observação"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                      {obs.whatHappened}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 3: GESTÃO DE EQUIPES                                */}
      {/* ========================================================= */}
      {activeSubTab === 'equipes' && (
        <TeamsTab />
      )}

      {/* ULTRA-FAST REGISTRAR OBSERVAÇÃO MODAL / DRAWER */}
      {showObsModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowObsModal(false);
          }}
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 max-w-lg w-full space-y-4 shadow-2xl animate-in slide-in-from-bottom-4 duration-200 max-h-[92vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  <MessageSquarePlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-slate-100">
                    Registrar Observação
                  </h3>
                  <span className="text-2xs text-slate-400">Captura rápida para o facilitador (3 a 5 segundos)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowObsModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveObservation} className="space-y-4 text-xs">
              
              {/* 1. Atividade Associada (Automática por padrão) */}
              <div className="space-y-1">
                <label className="block text-2xs font-extrabold uppercase text-slate-500 dark:text-slate-400">
                  Atividade Associada
                </label>
                <select
                  value={obsActivityId}
                  onChange={(e) => setObsActivityId(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="GERAL">Geral (Sem atividade específica)</option>
                  {PILOT_CHAIN_ACTIVITIES.map((act) => (
                    <option key={act.id} value={act.id}>
                      {act.id} — {act.title} ({act.youAreHere.encounterTitle})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Categoria (1 toque com 10 categorias canônicas) */}
              <div className="space-y-1.5">
                <label className="block text-2xs font-extrabold uppercase text-slate-500 dark:text-slate-400">
                  Categoria (1 toque)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {CATEGORY_OPTIONS.slice(0, 10).map((cat) => {
                    const isSelected = obsCategory === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setObsCategory(cat.value)}
                        className={`p-2 rounded-xl text-2xs font-extrabold border transition flex items-center justify-start gap-1.5 cursor-pointer min-h-[38px] ${
                          isSelected
                            ? cat.activeClass
                            : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <span className="shrink-0">{cat.icon}</span>
                        <span className="truncate">{cat.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Descrição Curta */}
              <div className="space-y-1">
                <label className="block text-2xs font-extrabold uppercase text-slate-500 dark:text-slate-400">
                  O que aconteceu?
                </label>
                <textarea
                  ref={inputRef}
                  value={obsWhatHappened}
                  onChange={(e) => setObsWhatHappened(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      handleSaveObservation(e);
                    }
                  }}
                  placeholder="Ex: Grupo teve dúvida na formulação do propósito e direção; precisamos dar mais 2 minutos..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 font-medium text-slate-900 dark:text-slate-100 min-h-[85px] max-h-[160px] text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-slate-400"
                  required
                />
                <span className="text-[10px] text-slate-400">Pressione Ctrl+Enter para salvar rapidamente.</span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowObsModal(false)}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold cursor-pointer hover:bg-slate-200 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!obsWhatHappened.trim()}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 rounded-xl font-black cursor-pointer shadow-xs active:scale-95 transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Salvar Observação</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Confirm Observation Deletion Modal */}
      <ConfirmModal
        isOpen={Boolean(obsToDelete)}
        title="Excluir Observação"
        message="Tem certeza que deseja excluir permanentemente esta observação do facilitador?"
        confirmLabel="Excluir Observação"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={() => {
          if (obsToDelete) {
            deleteFacilitatorObservation(obsToDelete);
            setObsToDelete(null);
            setToastMessage('Observação excluída com sucesso.');
            setTimeout(() => setToastMessage(null), 3000);
          }
        }}
        onCancel={() => setObsToDelete(null)}
      />

    </div>
  );
};
