import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Clock, 
  Coffee, 
  Compass, 
  Calendar, 
  Check, 
  ChevronRight, 
  Play, 
  Users, 
  FileText, 
  Award,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PILOT_CHAIN_ACTIVITIES, getPilotActivityById } from '../../data/pilotChain';
import { ENCOUNTERS } from '../../data/syllabus';
import { ActivityV2 } from '../../types/workshop';

interface EncounterBreakInfo {
  encounterId: number;
  breakTitle: string;
  durationMinutes: number;
  afterActivityIndex: number; // In the pilot sequence or syllabus sequence
  description: string;
}

const ENCOUNTER_BREAKS: EncounterBreakInfo[] = [
  {
    encounterId: 1,
    breakTitle: 'Pausa / Lanche Prevista',
    durationMinutes: 15,
    afterActivityIndex: 0, // After E1-A01 in pilot chain, or after Mapeamento Coletivo in full syllabus
    description: 'Intervalo programado da Ementa V3 para descanso, alimentação e convivência antes da etapa prática com IA.'
  },
  {
    encounterId: 2,
    breakTitle: 'Pausa / Lanche Prevista',
    durationMinutes: 15,
    afterActivityIndex: 0, // After E2-A01 (Revisão Crítica do Briefing)
    description: 'Intervalo programado da Ementa V3 para descanso antes da elaboração do PRD e construção do Protótipo V0.'
  },
  {
    encounterId: 3,
    breakTitle: 'Pausa / Lanche Prevista',
    durationMinutes: 15,
    afterActivityIndex: 3, // After E3-A04 (Roadmap de Evolução)
    description: 'Intervalo programado da Ementa V3 para descanso antes do sprint de Prototipação V1.'
  },
  {
    encounterId: 4,
    breakTitle: 'Pausa / Lanche Prevista',
    durationMinutes: 15,
    afterActivityIndex: 1, // After E4-A02 (Apresentação Visual)
    description: 'Intervalo programado da Ementa V3 para descanso antes da banca simulada e ensaio final.'
  }
];

export const JornadaView: React.FC = () => {
  const { 
    state, 
    setCurrentPilotActivityId, 
    setActiveWebappTab,
    toggleActivityCompleted,
    startTimer,
    timer
  } = useApp();

  const [selectedMovementFilter, setSelectedMovementFilter] = useState<string>('all');
  const [selectedTabEncounterId, setSelectedTabEncounterId] = useState<number | 'all'>('all');

  const currentActId = state.currentPilotActivityId || 'E1-A01';
  const currentActivity = getPilotActivityById(currentActId);
  
  const currentIndex = PILOT_CHAIN_ACTIVITIES.findIndex((a) => a.id === currentActId);
  const nextActivity = currentIndex >= 0 && currentIndex < PILOT_CHAIN_ACTIVITIES.length - 1 
    ? PILOT_CHAIN_ACTIVITIES[currentIndex + 1] 
    : null;

  // Determine active encounter from current activity
  const activeEncounterId = currentActivity.encounterId || 1;
  const currentEncounterData = ENCOUNTERS.find((e) => e.id === activeEncounterId) || ENCOUNTERS[0];

  // Activities filtered by selected tab and movement
  const displayedEncounters = (selectedTabEncounterId === 'all' 
    ? ENCOUNTERS 
    : ENCOUNTERS.filter((e) => e.id === selectedTabEncounterId)
  ).filter((enc) => {
    if (selectedMovementFilter === 'all') return true;
    const encActivities = PILOT_CHAIN_ACTIVITIES.filter((a) => a.encounterId === enc.id);
    return encActivities.some((a) => a.movementId === selectedMovementFilter);
  });

  // Stats calculation
  const totalPilotActivities = PILOT_CHAIN_ACTIVITIES.length;
  const completedPilotCount = PILOT_CHAIN_ACTIVITIES.filter((a) => 
    (state.completedActivityIds || []).includes(a.id) || 
    (state.artifactVersions || []).some((v) => v.activityId === a.id && v.status === 'CONSOLIDADO')
  ).length;
  const globalProgressPercent = Math.round((completedPilotCount / totalPilotActivities) * 100);

  // Encounter specific stats
  const getEncounterStats = (encId: number) => {
    const encActivities = PILOT_CHAIN_ACTIVITIES.filter((a) => a.encounterId === encId);
    const encCompleted = encActivities.filter((a) => 
      (state.completedActivityIds || []).includes(a.id) || 
      (state.artifactVersions || []).some((v) => v.activityId === a.id && v.status === 'CONSOLIDADO')
    );
    const completedMinutes = encCompleted.reduce((acc, a) => acc + (a.durationMinutes || 0), 0);
    const totalMinutes = 180; // 3h per encounter in Ementa V3
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

  const handleOpenActivity = (actId: string) => {
    setCurrentPilotActivityId(actId);
    setActiveWebappTab('atividade');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24 px-4 sm:px-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 uppercase tracking-wider">
              Ementa V3 • 12 Horas
            </span>
            <span className="text-xs text-slate-400 font-medium">4 Encontros de 3 Horas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Roadmap da Oficina
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Acompanhe o tempo previsto, o progresso de cada encontro, a próxima atividade e as pausas programadas.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="p-3.5 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-md flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-2xs font-extrabold text-amber-400 uppercase tracking-wider block">Progresso Global</span>
            <span className="text-sm font-black text-white">{completedPilotCount} de {totalPilotActivities} artefatos</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
            {globalProgressPercent}%
          </div>
        </div>
      </div>

      {/* Hero Card: ATIVIDADE ATUAL, TEMPO PREVISTO, PRÓXIMA ATIVIDADE & PAUSA PREVISTA */}
      <section className="bg-white dark:bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
        
        {/* Top Tag & Encounter Progress Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              STATUS ATUAL DA OFICINA
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {currentEncounterData.title}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-slate-500 dark:text-slate-400">
              Progresso do Encontro {activeEncounterId}:
            </span>
            <div className="w-28 sm:w-36 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                style={{ width: `${getEncounterStats(activeEncounterId).percent}%` }}
              />
            </div>
            <span className="font-extrabold text-amber-600 dark:text-amber-400 font-mono">
              {getEncounterStats(activeEncounterId).percent}%
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
                  ATIVIDADE ATUAL
                </span>
                <span className="text-xs font-bold font-mono text-amber-800 dark:text-amber-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Tempo previsto: {currentActivity.durationMinutes} min
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-700 dark:text-amber-400">
                    {currentActivity.id}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                    {currentActivity.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                  {currentActivity.whyItMatters}
                </p>
              </div>

              <div className="text-2xs font-semibold text-slate-500 dark:text-slate-400">
                Artefato esperado: <strong className="text-amber-700 dark:text-amber-300">{currentActivity.expectedVersionName}</strong>
              </div>
            </div>

            <button
              onClick={() => handleOpenActivity(currentActivity.id)}
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>ABRIR NO COPILOTO IA ({currentActivity.durationMinutes} MIN)</span>
            </button>
          </div>

          {/* Box 2: PRÓXIMA ATIVIDADE */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
            {nextActivity ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-2xs font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      A SEGUIR • PRÓXIMA ETAPA
                    </span>
                    <span className="text-xs font-medium font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {nextActivity.durationMinutes} min
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">
                        {nextActivity.id}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {nextActivity.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {nextActivity.whyItMatters}
                    </p>
                  </div>

                  <div className="text-2xs font-medium text-slate-400">
                    Gera: <span className="text-slate-600 dark:text-slate-300">{nextActivity.expectedVersionName}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenActivity(nextActivity.id)}
                  className="w-full py-2.5 px-4 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Ver Próxima Atividade</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <Award className="w-8 h-8 text-amber-500 mb-2" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Você está na etapa final da jornada!</h4>
                <p className="text-xs text-slate-500 mt-1">Conclua o Ensaio do Pitch para finalizar os 4 encontros da Ementa V3.</p>
              </div>
            )}
          </div>

        </div>

      </section>

      {/* 4 Pedagogical Movements & Encounter Selector Tabs */}
      <div className="space-y-3">
        {/* Movements selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-2xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Filtrar por Movimento Pedagógico:
          </span>
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'Todos os 4 Movimentos' },
              { id: 'investigar', label: '1. Investigar' },
              { id: 'definir-materializar', label: '2. Definir & Materializar' },
              { id: 'validar-evoluir', label: '3. Validar & Evoluir' },
              { id: 'comunicar-refletir', label: '4. Comunicar & Refletir' },
            ].map((mov) => (
              <button
                key={mov.id}
                onClick={() => setSelectedMovementFilter(mov.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition whitespace-nowrap cursor-pointer ${
                  selectedMovementFilter === mov.id
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {mov.label}
              </button>
            ))}
          </div>
        </div>

        {/* Encounters selector */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
            <button
              onClick={() => setSelectedTabEncounterId('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition whitespace-nowrap cursor-pointer ${
                selectedTabEncounterId === 'all'
                  ? 'bg-slate-950 text-amber-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Todos os Encontros (1 a 4)
            </button>
            {ENCOUNTERS.map((enc) => (
              <button
                key={enc.id}
                onClick={() => setSelectedTabEncounterId(enc.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition whitespace-nowrap cursor-pointer ${
                  selectedTabEncounterId === enc.id
                    ? 'bg-slate-950 text-amber-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Encontro {enc.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Encounter Roadmaps Timeline */}
      <div className="space-y-10">
        {displayedEncounters.map((encounter) => {
          const stats = getEncounterStats(encounter.id);
          const encounterPilotActs = PILOT_CHAIN_ACTIVITIES.filter((a) => {
            if (a.encounterId !== encounter.id) return false;
            if (selectedMovementFilter === 'all') return true;
            return a.movementId === selectedMovementFilter;
          });
          const breakInfo = ENCOUNTER_BREAKS.find((b) => b.encounterId === encounter.id);

          return (
            <div 
              key={encounter.id} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6"
            >
              
              {/* Encounter Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-2xs font-extrabold px-2.5 py-0.5 rounded-md bg-slate-900 text-amber-400 uppercase tracking-wider">
                      ENCONTRO {encounter.id}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      180 minutos (3 horas)
                    </span>
                    <span className="text-2xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      ☕ Pausa: 15 min incluída
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
                    {encounter.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                    {encounter.subtitle}
                  </p>
                </div>

                {/* Encounter Progress Widget */}
                <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl flex items-center gap-4 shrink-0">
                  <div>
                    <span className="text-2xs font-bold text-slate-400 block">Progresso do Encontro</span>
                    <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                      {stats.completed} de {stats.total} atividades concluídas
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
              {encounter.id === 1 && (selectedMovementFilter === 'all' || selectedMovementFilter === 'investigar') && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xs font-black px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 uppercase tracking-wider">
                        PORTA DE ENTRADA • INVESTIGAR
                      </span>
                      <strong className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        Mapa de Problemas & Escolha do Desafio
                      </strong>
                    </div>
                    <p className="text-2xs text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                      Explore os 24 problemas mapeados, analise perguntas de pesquisa, escalas e categorias para fundamentar o Diagnóstico (E1-A01).
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveWebappTab('mapa-problemas')}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
                  >
                    <span>Abrir Mapa de Problemas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Deliverables Notice */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 text-xs flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-slate-200">Entregáveis Esperados do Encontro {encounter.id}:</strong>{' '}
                  <span className="text-slate-600 dark:text-slate-400">{encounter.deliverable}</span>
                </div>
              </div>

              {/* Activities & Break List */}
              <div className="space-y-3 pt-2">
                {encounterPilotActs.map((act, index) => {
                  const isCurrent = act.id === currentActId;
                  const isCompleted = (state.completedActivityIds || []).includes(act.id) || 
                    (state.artifactVersions || []).some((v) => v.activityId === act.id && v.status === 'CONSOLIDADO');
                  
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
                          
                          {/* Left: Code, Icon, Title & Duration */}
                          <div className="flex items-start gap-3 min-w-0">
                            <button
                              onClick={() => toggleActivityCompleted(act.id)}
                              className={`p-1.5 rounded-xl mt-0.5 shrink-0 transition cursor-pointer ${
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
                                  {act.id}
                                </span>
                                <span className="text-xs font-bold font-mono text-amber-700 dark:text-amber-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {act.durationMinutes} min
                                </span>
                                {isCurrent && (
                                  <span className="text-2xs font-extrabold px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 uppercase">
                                    Em Andamento
                                  </span>
                                )}
                                {isCompleted && (
                                  <span className="text-2xs font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                                    Concluída
                                  </span>
                                )}
                              </div>

                              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                                {act.title}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                {act.whyItMatters}
                              </p>
                            </div>
                          </div>

                          {/* Right: Actions */}
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => startTimer(act.durationMinutes, `${act.id} — ${act.title}`)}
                              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-600 dark:text-slate-300 transition text-xs font-bold flex items-center gap-1 cursor-pointer"
                              title={`Iniciar cronômetro de ${act.durationMinutes} min`}
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Cronometrar</span>
                            </button>

                            <button
                              onClick={() => handleOpenActivity(act.id)}
                              className={`px-3 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
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

                      {/* INJECT BREAK ITEM AT THE EXACT SPOT PER EMENTA V3 */}
                      {breakInfo && breakInfo.afterActivityIndex === index && (
                        <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-dashed border-amber-500/40 space-y-2 animate-in fade-in">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0">
                                <Coffee className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-black text-amber-900 dark:text-amber-200">
                                    ☕ PAUSA / LANCHE PREVISTA
                                  </span>
                                  <span className="text-2xs font-extrabold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono">
                                    15 min
                                  </span>
                                </div>
                                <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-0.5">
                                  {breakInfo.description}
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => handleStartBreakTimer(15, `Pausa / Lanche • Encontro ${encounter.id}`)}
                              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl transition flex items-center gap-2 shadow-xs shrink-0 cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>INICIAR CRONÔMETRO DA PAUSA (15 MIN)</span>
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
