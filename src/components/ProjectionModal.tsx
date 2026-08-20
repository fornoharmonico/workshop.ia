import React from 'react';
import { useApp } from '../context/AppContext';
import { ENCOUNTERS } from '../data/syllabus';
import { getPilotActivityById } from '../data/pilotChain';
import { X, Play, Pause, RotateCcw, Clock, Flame, CheckCircle2 } from 'lucide-react';

export const ProjectionModal: React.FC = () => {
  const { state, timer, pauseTimer, resumeTimer, resetTimer, addMinutesToTimer, toggleTimerFullscreen } = useApp();

  if (!timer.isFullscreen) return null;

  // Resolve active activity from pilot chain or syllabus
  const pilotActivity = getPilotActivityById(state.currentPilotActivityId || 'E1-A01');
  const currentEncounter = ENCOUNTERS.find((e) => e.id === state.selectedEncounterId) || ENCOUNTERS[0];
  const syllabusActivity = currentEncounter.activities.find((a) => a.title === timer.activityTitle) || currentEncounter.activities[0];

  const title = pilotActivity?.title || syllabusActivity.title;
  const activityCode = pilotActivity?.id || '';
  const durationMins = pilotActivity?.durationMinutes || syllabusActivity.durationMinutes || 30;
  const guidance = pilotActivity?.pedagogicalIntervention?.message || syllabusActivity.socraticQuestions?.[0] || syllabusActivity.whatIsIt;
  const steps = pilotActivity?.whatToDo || syllabusActivity.howToApply || [];
  const deliverable = pilotActivity?.expectedVersionName || currentEncounter.deliverable;
  const encounterTitle = pilotActivity?.youAreHere?.encounterTitle || currentEncounter.title;

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-y-auto antialiased">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 sm:pb-6">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-amber-500/20">
            <Flame className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider border border-amber-500/30 truncate">
                PROJEÇÃO DA TURMA • {encounterTitle}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 hidden sm:inline">O FORNO IA</span>
            </div>
            <h1 className="text-base sm:text-xl lg:text-2xl font-black text-white tracking-tight mt-0.5 truncate">
              {activityCode ? `${activityCode} — ${title}` : title}
            </h1>
          </div>
        </div>

        <button
          onClick={toggleTimerFullscreen}
          className="p-2.5 sm:p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-2 font-semibold text-xs sm:text-sm border border-slate-700 shrink-0 min-h-[44px] cursor-pointer"
          title="Sair do Modo Projeção"
        >
          <X className="w-5 h-5" />
          <span className="hidden sm:inline">Sair da Projeção</span>
        </button>
      </div>

      {/* Main Center Content */}
      <div className="my-auto py-8 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Big Question & Instructions */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-sm font-bold text-amber-400 uppercase tracking-widest block mb-2">
              ATIVIDADE ATUAL ({durationMins} MIN)
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {title}
            </h2>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            {guidance && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Orientação Pedagógica Central
                </p>
                <p className="text-lg sm:text-xl font-bold text-amber-300 leading-snug">
                  "{guidance}"
                </p>
              </div>
            )}

            {steps.length > 0 && (
              <div className="border-t border-slate-800 pt-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  O que fazer agora
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-slate-200">
                  {steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {deliverable && (
            <div className="flex items-center gap-3 text-sm text-slate-400 bg-slate-900/50 p-3 rounded-2xl border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong>Entrega Esperada:</strong> {deliverable}
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Giant Timer */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center bg-slate-900/90 border-2 border-amber-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" /> tempo restante
          </span>

          <div className={`font-mono font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter my-4 ${
            timer.isFinished ? 'text-rose-500 animate-pulse' : timer.totalSeconds <= 180 ? 'text-amber-400' : 'text-white'
          }`}>
            {formatTime(timer.minutes, timer.seconds)}
          </div>

          {/* Quick Timer Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {timer.isRunning ? (
              <button
                onClick={pauseTimer}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Pause className="w-5 h-5" /> Pausar
              </button>
            ) : (
              <button
                onClick={resumeTimer}
                className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Play className="w-5 h-5" /> Iniciar
              </button>
            )}

            <button
              onClick={() => addMinutesToTimer(-1)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-rose-400 font-extrabold text-xs border border-slate-700 transition-colors cursor-pointer"
              title="Remover 1 minuto"
            >
              -1 min
            </button>

            <button
              onClick={() => addMinutesToTimer(2)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-extrabold text-xs border border-slate-700 transition-colors cursor-pointer"
              title="Adicionar 2 minutos"
            >
              +2 min
            </button>

            <button
              onClick={() => addMinutesToTimer(5)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-extrabold text-xs border border-slate-700 transition-colors cursor-pointer"
              title="Adicionar 5 minutos"
            >
              +5 min
            </button>

            <button
              onClick={resetTimer}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title="Reiniciar tempo"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Footer info */}
      <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-xs text-slate-500">
        <span>Modo de Projeção O Forno — Inteligência Artificial Aplicada</span>
        <span>Aperte 'ESC' ou clique em Sair da Projeção para retornar</span>
      </div>

    </div>
  );
};
