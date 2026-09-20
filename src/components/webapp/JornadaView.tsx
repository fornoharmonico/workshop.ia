import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Coffee, 
  Compass, 
  Calendar, 
  Check, 
  ChevronRight, 
  Play, 
  FileText, 
  Award,
  AlertCircle,
  HelpCircle,
  FlaskConical,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SYLLABUS_V2, SyllabusEncounterV2 } from '../../data/syllabusV2';
import { 
  CANONICAL_ACTIVITIES_V2, 
  CANONICAL_ACTIVITY_LIST_V2, 
  getCanonicalActivityById,
  getNextActivityById
} from '../../data/canonicalJourney';
import { getArtifactDefinitionById } from '../../data/canonicalArtifacts';
import { populateArtifactStoreFromLegacy } from '../../utils/artifactStore';
import { ActivityId } from '../../types/canonicalV2';

interface EncounterBreakInfo {
  encounterId: number;
  breakTitle: string;
  durationMinutes: number;
  afterActivityId: ActivityId;
  description: string;
}

const ENCOUNTER_BREAKS_V2: EncounterBreakInfo[] = [
  {
    encounterId: 1,
    breakTitle: 'Pausa Programada / Lanche',
    durationMinutes: 15,
    afterActivityId: 'A02',
    description: 'Intervalo para descanso e convivência após o diagnóstico e antes do mapeamento de recursos.'
  },
  {
    encounterId: 2,
    breakTitle: 'Pausa Programada / Lanche',
    durationMinutes: 15,
    afterActivityId: 'A06',
    description: 'Intervalo antes da especificação funcional (PRD) e materialização do MVP.'
  },
  {
    encounterId: 3,
    breakTitle: 'Pausa Programada / Lanche',
    durationMinutes: 15,
    afterActivityId: 'A09',
    description: 'Intervalo programado imediatamente após a volta dos testes de campo no mundo real.'
  },
  {
    encounterId: 4,
    breakTitle: 'Pausa Programada / Lanche',
    durationMinutes: 15,
    afterActivityId: 'A12',
    description: 'Intervalo de alinhamento antes da simulação com banca e celebração final da turma.'
  }
];

export const JornadaView: React.FC = () => {
  const { 
    state, 
    setCurrentPilotActivityId, 
    setActiveWebappTab, 
    toggleActivityCompleted, 
    startTimer,
    openOnboardingModal 
  } = useApp();

  const [selectedTabEncounterId, setSelectedTabEncounterId] = useState<number | 'all'>('all');

  // Resolve current active activity in canonical V2
  const rawActId = state.currentPilotActivityId || 'A01';
  const legacyToCanonicalMap: Record<string, ActivityId> = {
    'E1-A01': 'A01',
    'E1-A02': 'A03',
    'E2-A01': 'A05',
    'E2-A02': 'A06',
    'E2-A03': 'A07',
    'E2-A04': 'A08',
    'E3-A01': 'A09',
    'E3-A02': 'A10',
    'E3-A03': 'A11',
    'E3-A04': 'A12',
    'E3-A05': 'A07',
    'E4-A01': 'A12',
    'E4-A02': 'A12',
    'E4-A03': 'A12',
    'E4-A04': 'A12',
  };

  const currentActId: ActivityId = (
    rawActId in CANONICAL_ACTIVITIES_V2 
      ? (rawActId as ActivityId) 
      : (legacyToCanonicalMap[rawActId] || 'A01')
  );

  const currentActivity = CANONICAL_ACTIVITIES_V2[currentActId] || CANONICAL_ACTIVITIES_V2.A01;
  const nextActivity = getNextActivityById(currentActivity.id);

  // Determine active encounter in V2.2 (A01-A04: 1, A05-A08: 2, A09-A11: 3, A12: 4)
  const getEncounterForActivity = (actId: ActivityId): number => {
    const num = parseInt(actId.replace('A', ''), 10);
    if (num <= 4) return 1;
    if (num <= 8) return 2;
    if (num <= 11) return 3;
    return 4;
  };

  const activeEncounterNum = getEncounterForActivity(currentActivity.id);
  const currentEncounterData = SYLLABUS_V2.find((e) => e.number === activeEncounterNum) || SYLLABUS_V2.find((e) => e.number === 1)!;

  // Encounters to display
  const displayedEncounters = selectedTabEncounterId === 'all' 
    ? SYLLABUS_V2 
    : SYLLABUS_V2.filter((e) => e.number === selectedTabEncounterId);

  // Global store for artifact inspection
  const canonicalStore = populateArtifactStoreFromLegacy(
    state.projectData,
    state.projectStateV1_4_1?.artifacts
  );

  // Global Progress strictly over canonical 12 activities
  const totalActivities = CANONICAL_ACTIVITY_LIST_V2.length; // 12
  const completedCount = CANONICAL_ACTIVITY_LIST_V2.filter((a) => {
    const isExplicitlyCompleted = (state.completedActivityIds || []).includes(a.id);
    const hasArtifactContent = a.outputArtifactId && Boolean(canonicalStore[a.outputArtifactId]?.content && canonicalStore[a.outputArtifactId]!.content.trim().length > 10);
    return isExplicitlyCompleted || hasArtifactContent;
  }).length;
  const globalProgressPercent = Math.round((completedCount / totalActivities) * 100);

  // Encounter stats
  const getEncounterStats = (encNum: number) => {
    const encActivities = CANONICAL_ACTIVITY_LIST_V2.filter(
      (a) => getEncounterForActivity(a.id) === encNum
    );
    const encCompleted = encActivities.filter((a) => {
      const isExplicitlyCompleted = (state.completedActivityIds || []).includes(a.id);
      const hasArtifactContent = a.outputArtifactId && Boolean(canonicalStore[a.outputArtifactId]?.content && canonicalStore[a.outputArtifactId]!.content.trim().length > 10);
      return isExplicitlyCompleted || hasArtifactContent;
    });
    const completedMinutes = encCompleted.reduce((acc, a) => acc + (a.estimatedMinutes || 0), 0);
    const totalMinutes = 180;
    const percent = encActivities.length > 0 ? Math.round((encCompleted.length / encActivities.length) * 100) : 0;
    return {
      total: encActivities.length,
      completed: encCompleted.length,
      completedMinutes,
      totalMinutes,
      percent
    };
  };

  const handleStartBreakTimer = (breakMins: number = 15, title: string = 'Pausa / Lanche') => {
    startTimer(breakMins, title);
  };

  const handleOpenActivity = (actId: ActivityId) => {
    setCurrentPilotActivityId(actId);
    setActiveWebappTab('atividade');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-28 px-4 sm:px-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 uppercase tracking-wider font-mono">
              JORNADA DA OFICINA
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">4 Encontros • 12 Etapas Práticas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Jornada do Participante
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Acompanhe o progresso de cada encontro, a sua etapa atual e a próxima atividade da oficina.
          </p>
        </div>

        {/* Global Progress Pill & Onboarding Button */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
          <button
            onClick={openOnboardingModal}
            className="px-3.5 py-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            title="Abrir guia de introdução à Fornologia"
          >
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Guia de Início</span>
          </button>

          <div className="p-3.5 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-md flex items-center gap-3">
            <div className="text-right">
              <span className="text-2xs font-extrabold text-amber-400 uppercase tracking-wider block">Progresso Global</span>
              <span className="text-sm font-black text-white">{completedCount} de {totalActivities} etapas</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
              {globalProgressPercent}%
            </div>
          </div>
        </div>
      </div>

      {/* Hero Card: ATIVIDADE ATUAL, TEMPO PREVISTO, PRÓXIMA ATIVIDADE & PAUSA PREVISTA */}
      <section className="bg-white dark:bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
        
        {/* Top Tag & Encounter Progress Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              ETAPA ATUAL
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {currentEncounterData.title}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-slate-500 dark:text-slate-400">
              Progresso do Encontro {activeEncounterNum}:
            </span>
            <div className="w-28 sm:w-36 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                style={{ width: `${getEncounterStats(activeEncounterNum).percent}%` }}
              />
            </div>
            <span className="font-extrabold text-amber-600 dark:text-amber-400 font-mono">
              {getEncounterStats(activeEncounterNum).percent}%
            </span>
          </div>
        </div>

        {/* 2-Column Focus: Atividade Atual vs Próxima Atividade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Box 1: ATIVIDADE ATUAL */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xs font-black px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 uppercase tracking-wider">
                  ONDE ESTAMOS AGORA
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-700 dark:text-amber-400">
                    Etapa {currentActivity.order}:
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                    {currentActivity.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                  {currentActivity.whyWeDoThis}
                </p>
              </div>

              {currentActivity.outputArtifactId && getArtifactDefinitionById(currentActivity.outputArtifactId) && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-amber-500/20 text-xs font-bold text-amber-900 dark:text-amber-300">
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span>Registro: {getArtifactDefinitionById(currentActivity.outputArtifactId)?.title.replace(/^AF\d+\s*[—–-]\s*/i, '')}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-amber-500/20">
              <button
                onClick={() => handleOpenActivity(currentActivity.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-xs cursor-pointer min-h-[44px]"
              >
                <span>Entrar nesta etapa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Box 2: PRÓXIMA ATIVIDADE */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xs font-extrabold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  A SEGUIR
                </span>
              </div>

              {nextActivity ? (
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-500">
                      {nextActivity.order}ª etapa:
                    </span>
                    <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200">
                      {nextActivity.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {nextActivity.whyWeDoThis}
                  </p>
                </div>
              ) : (
                <div className="py-4 text-center">
                  <Award className="w-8 h-8 text-amber-500 mx-auto mb-1" />
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    Você está na última etapa da oficina! Parabéns!
                  </p>
                </div>
              )}
            </div>

            {nextActivity && (
              <button
                onClick={() => handleOpenActivity(nextActivity.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span>Ver próxima etapa</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Filter Tabs for Encounters */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setSelectedTabEncounterId('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition whitespace-nowrap cursor-pointer min-h-[44px] ${
              selectedTabEncounterId === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Todos os 4 Encontros (12 etapas)
          </button>
          {[
            { id: 1, label: 'Encontro 1 • Investigar & Direcionar' },
            { id: 2, label: 'Encontro 2 • Definir & Materializar' },
            { id: 3, label: 'Encontro 3 • Validar & Evoluir' },
            { id: 4, label: 'Encontro 4 • Comunicar & Celebrar' },
          ].map((enc) => (
            <button
              key={enc.id}
              type="button"
              onClick={() => setSelectedTabEncounterId(enc.id as 1 | 2 | 3 | 4)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition whitespace-nowrap cursor-pointer min-h-[44px] ${
                selectedTabEncounterId === enc.id
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {enc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Encounter Roadmaps Timeline */}
      <div className="space-y-10">
        {displayedEncounters.map((encounter) => {
          const stats = getEncounterStats(encounter.number);
          const encounterActs = CANONICAL_ACTIVITY_LIST_V2.filter(
            (a) => getEncounterForActivity(a.id) === encounter.number
          );
          const breakInfo = ENCOUNTER_BREAKS_V2.find((b) => b.encounterId === encounter.number);

          return (
            <div 
              key={encounter.number} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6"
            >
              {/* Encounter Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-2xs font-extrabold px-2.5 py-0.5 rounded-md bg-slate-900 text-amber-400 uppercase tracking-wider">
                      ENCONTRO {encounter.number}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
                    {encounter.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                    {encounter.theme}
                  </p>
                </div>

                {/* Encounter Progress Widget */}
                <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl flex items-center gap-4 shrink-0">
                  <div>
                    <span className="text-2xs font-bold text-slate-400 block">Progresso do Encontro</span>
                    <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                      {stats.completed} de {stats.total} etapas concluídas
                    </span>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono">
                      {stats.percent}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Problem Map Banner in Encounter 1 (Movement: Investigar) */}
              {encounter.number === 1 && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xs font-black px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 uppercase tracking-wider">
                        PONTO DE PARTIDA
                      </span>
                      <strong className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        Mapa de Problemas & Escolha do Desafio do Grupo
                      </strong>
                    </div>
                    <p className="text-2xs text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                      A escolha do problema é 100% humana. Explore os problemas mapeados para fundamentar a escolha e o diagnóstico com observações concretas da sua realidade.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveWebappTab('mapa-problemas')}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-2 shrink-0 cursor-pointer shadow-xs min-h-[44px]"
                  >
                    <span>Abrir Mapa de Problemas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Main Deliverables of Encounter */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 text-xs flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-slate-200">Entregáveis Principais do Encontro {encounter.number}:</strong>{' '}
                  <span className="text-slate-600 dark:text-slate-400">
                    {encounter.mainDeliverables.map(d => d.replace(/^AF\d+\s*[—–-]\s*/i, '')).join(' • ')}
                  </span>
                </div>
              </div>

              {/* Activities & Break List */}
              <div className="space-y-3 pt-2">
                {encounterActs.map((act) => {
                  const isCurrent = act.id === currentActId;
                  const isCompleted = (state.completedActivityIds || []).includes(act.id) || 
                    (act.outputArtifactId && Boolean(canonicalStore[act.outputArtifactId]?.content && canonicalStore[act.outputArtifactId]!.content.trim().length > 10));
                  const isBreakAfter = breakInfo && breakInfo.afterActivityId === act.id;

                  return (
                    <React.Fragment key={act.id}>
                      <div className={`p-4 rounded-2xl border transition-all ${
                        isCurrent 
                          ? 'bg-amber-500/10 border-amber-500 shadow-sm ring-1 ring-amber-500/50' 
                          : isCompleted 
                            ? 'bg-emerald-500/5 border-emerald-500/30' 
                            : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          
                          {/* Left: Check, Code, Title, Tags */}
                          <div className="flex items-start gap-3 min-w-0">
                            <button
                              onClick={() => toggleActivityCompleted(act.id)}
                              className={`p-2 rounded-xl mt-0.5 shrink-0 transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
                                isCompleted
                                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                  : isCurrent
                                    ? 'bg-amber-500 text-slate-950'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 hover:text-slate-600'
                              }`}
                              title={isCompleted ? 'Desmarcar como concluída' : 'Marcar como concluída'}
                            >
                              {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <Circle className="w-4 h-4" />}
                            </button>

                            <div className="space-y-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-2xs font-extrabold px-2 py-0.5 rounded-md ${
                                  isCurrent
                                    ? 'bg-amber-500 text-slate-950 font-black'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                }`}>
                                  Etapa {act.order}
                                </span>

                                {isCurrent && (
                                  <span className="text-2xs font-extrabold px-2 py-0.5 rounded bg-amber-500 text-slate-950 uppercase">
                                    Em Andamento
                                  </span>
                                )}
                                {isCompleted && (
                                  <span className="text-2xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                                    Concluída
                                  </span>
                                )}
                              </div>

                              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                                {act.title}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                {act.whyWeDoThis}
                              </p>
                            </div>
                          </div>

                          {/* Right: Actions */}
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => handleOpenActivity(act.id)}
                              className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer min-h-[44px] ${
                                isCurrent
                                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs'
                                  : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-950'
                              }`}
                            >
                              <span>{isCurrent ? 'Continuar' : 'Abrir'}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                        </div>
                      </div>

                      {/* Break Item Insertion */}
                      {isBreakAfter && breakInfo && (
                        <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-dashed border-amber-500/40 space-y-2 animate-in fade-in">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0">
                                <Coffee className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-black text-amber-900 dark:text-amber-200">
                                    ☕ {breakInfo.breakTitle}
                                  </span>
                                </div>
                                <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-0.5">
                                  {breakInfo.description}
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => handleStartBreakTimer(breakInfo.durationMinutes, `Pausa / Lanche • Encontro ${encounter.number}`)}
                              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl transition flex items-center gap-2 shadow-xs shrink-0 cursor-pointer min-h-[44px]"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>INICIAR PAUSA / INTERVALO</span>
                            </button>
                          </div>
                        </div>
                      )}

                    </React.Fragment>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
