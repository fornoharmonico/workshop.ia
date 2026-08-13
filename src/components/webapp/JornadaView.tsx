import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Play, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Layers, 
  Compass,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PILOT_CHAIN_ACTIVITIES } from '../../data/pilotChain';
import { ActivityV2 } from '../../types/workshop';

export const JornadaView: React.FC = () => {
  const { state, setCurrentPilotActivityId, setActiveWebappTab } = useApp();

  const completedSet = new Set(state.completedActivityIds || []);
  const currentActivityId = state.currentPilotActivityId || 'E1-A01';

  // Group activities by Encontro ID (1, 2, 3, 4)
  const encountersMap: Record<number, { title: string; subtitle: string; activities: ActivityV2[] }> = {
    1: {
      title: 'ENCONTRO 1 — INVESTIGAR E COMPREENDER',
      subtitle: 'Compreensão aprofundada da situação, causas e propósito da iniciativa.',
      activities: [],
    },
    2: {
      title: 'ENCONTRO 2 — DEFINIR E MATERIALIZAR',
      subtitle: 'Estruturação de requisitos, menor versão testável e primeiro protótipo.',
      activities: [],
    },
    3: {
      title: 'ENCONTRO 3 — VALIDAR E EVOLUIR',
      subtitle: 'Coleta de evidências reais, modelo de sustentação e evolução do protótipo.',
      activities: [],
    },
    4: {
      title: 'ENCONTRO 4 — COMUNICAR E APRESENTAR',
      subtitle: 'Síntese da jornada, roteiro de pitch, suporte visual e ensaio presencial.',
      activities: [],
    },
  };

  PILOT_CHAIN_ACTIVITIES.forEach((act) => {
    if (encountersMap[act.encounterId]) {
      encountersMap[act.encounterId].activities.push(act);
    }
  });

  const totalActivities = PILOT_CHAIN_ACTIVITIES.length;
  const completedCount = PILOT_CHAIN_ACTIVITIES.filter((act) => completedSet.has(act.id)).length;
  const progressPercent = Math.round((completedCount / totalActivities) * 100);

  const currentActivityObj = PILOT_CHAIN_ACTIVITIES.find((a) => a.id === currentActivityId) || PILOT_CHAIN_ACTIVITIES[0];

  const handleStartOrContinueActivity = (activityId: string) => {
    setCurrentPilotActivityId(activityId);
    setActiveWebappTab('atividade');
  };

  const getActivityStatus = (activityId: string) => {
    if (completedSet.has(activityId)) {
      return {
        label: 'CONCLUÍDA',
        bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
      };
    }

    const hasDraft = (state.artifactVersions || []).some(
      (v) => v.activityId === activityId && (v.status === 'EM_CONSTRUCAO' || v.status === 'CONSOLIDADO')
    );

    if (activityId === currentActivityId || hasDraft) {
      return {
        label: 'EM ANDAMENTO',
        bg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800',
        icon: <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
      };
    }

    return {
      label: 'NÃO INICIADA',
      bg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
      icon: <Layers className="w-3.5 h-3.5 text-slate-400" />,
    };
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 px-4 sm:px-6">
      
      {/* Welcome Banner / Main CTA */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-amber-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              <Compass className="w-4 h-4" />
              <span>Jornada Completa O FORNO IA • 17 Atividades</span>
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Progresso Geral: <strong className="text-amber-400 font-extrabold">{completedCount} de {totalActivities}</strong> ({progressPercent}%)
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Acompanhe sua Jornada de Inovação
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Percorra do diagnóstico do problema ao protótipo e pitch. Cada atividade é guiada por um copiloto de IA com checkpoints de decisão humana.
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5 max-w-xl">
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
              <div 
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${Math.max(5, progressPercent)}%` }}
              />
            </div>
          </div>

          {/* Current Activity Highlight Banner */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-2xs font-black text-amber-300 uppercase tracking-wider block">
                PRÓXIMO PASSO / ATIVIDADE RECOMENDADA
              </span>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>{currentActivityObj.id} — {currentActivityObj.title}</span>
              </h2>
              <p className="text-xs text-slate-300 line-clamp-1">
                {currentActivityObj.whyItMatters}
              </p>
            </div>

            <button
              onClick={() => handleStartOrContinueActivity(currentActivityObj.id)}
              className="shrink-0 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-lg flex items-center gap-2 group cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{completedSet.has(currentActivityObj.id) ? 'REVISAR ATIVIDADE' : 'CONTINUAR ATIVIDADE'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ENCOUNTERS LIST (1 TO 4) */}
      <div className="space-y-8">
        {[1, 2, 3, 4].map((encounterNum) => {
          const enc = encountersMap[encounterNum];
          if (!enc) return null;

          const encCompletedCount = enc.activities.filter((a) => completedSet.has(a.id)).length;

          return (
            <div 
              key={encounterNum}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-5"
            >
              {/* Encounter Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-black flex items-center justify-center border border-amber-500/30">
                      {encounterNum}
                    </span>
                    {enc.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {enc.subtitle}
                  </p>
                </div>

                <div className="text-2xs font-extrabold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full self-start sm:self-auto">
                  {encCompletedCount} de {enc.activities.length} concluídas
                </div>
              </div>

              {/* Activities List - 1 card per row for maximum clarity and no word truncation */}
              <div className="grid grid-cols-1 gap-3.5">
                {enc.activities.map((act) => {
                  const status = getActivityStatus(act.id);
                  const isCurrent = act.id === currentActivityId;

                  return (
                    <div
                      key={act.id}
                      onClick={() => handleStartOrContinueActivity(act.id)}
                      className={`group border rounded-2xl p-4.5 sm:p-5 transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 relative ${
                        isCurrent
                          ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-500/60 ring-2 ring-amber-500/20 shadow-md'
                          : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:border-amber-500/40 hover:bg-white dark:hover:bg-slate-900'
                      }`}
                    >
                      <div className="space-y-2 flex-1 min-w-0">
                        {/* Top row: Code + Title + Status Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-2xs font-black text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-800 shrink-0">
                              {act.id}
                            </span>
                            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                              {act.title}
                            </h3>
                          </div>

                          <span className={`text-3xs font-extrabold px-2.5 py-1 rounded-md border flex items-center gap-1 shrink-0 ${status.bg}`}>
                            {status.icon}
                            {status.label}
                          </span>
                        </div>

                        {/* Why it matters */}
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {act.whyItMatters}
                        </p>

                        {/* Produced Artifact Info - Refined font size, full text without truncation */}
                        <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 font-medium">
                            <FileText className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>Produz:</span>
                            <strong className="text-slate-800 dark:text-slate-200 font-bold">
                              {act.expectedVersionName}
                            </strong>
                          </span>

                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 font-semibold text-slate-600 dark:text-slate-300">
                            ⏱️ {act.durationMinutes} min
                          </span>
                        </div>
                      </div>

                      {/* CTA Arrow / Action button */}
                      <div className="shrink-0 flex items-center justify-end md:self-center border-t md:border-t-0 md:border-l border-slate-200/60 dark:border-slate-800/80 pt-3 md:pt-0 md:pl-4">
                        <button className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-700 dark:text-slate-200 font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer">
                          <span>{status.label === 'CONCLUÍDA' ? 'Ver Atividade' : 'Abrir Atividade'}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-950 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      </div>
                    </div>
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
