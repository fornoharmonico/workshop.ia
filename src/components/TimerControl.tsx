import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Clock, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  X,
  Sparkles
} from 'lucide-react';
import { PILOT_CHAIN_ACTIVITIES } from '../data/pilotChain';

export const TimerControl: React.FC = () => {
  const { 
    state,
    timer, 
    pauseTimer, 
    resumeTimer, 
    resetTimer, 
    addMinutesToTimer, 
    toggleTimerFullscreen,
    setCurrentPilotActivityId,
    setActiveWebappTab
  } = useApp();
  
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [hasBeenActivated, setHasBeenActivated] = useState<boolean>(false);
  const [isZeroAlertDismissed, setIsZeroAlertDismissed] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  // Track if timer has ever been started in this session
  useEffect(() => {
    if (timer.isRunning) {
      setHasBeenActivated(true);
      setIsZeroAlertDismissed(false);
      setIsDismissed(false);
    }
  }, [timer.isRunning]);

  // Reset dismissed state when activity changes
  useEffect(() => {
    setIsZeroAlertDismissed(false);
  }, [state.currentPilotActivityId]);

  // Hide floating footer timer if dismissed or before any timer has been activated
  if (isDismissed || (!hasBeenActivated && !timer.isRunning && !timer.isFinished)) return null;

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timer.totalSeconds > 0 && timer.totalSeconds <= 180; // 3 mins or less
  const isPillMinimized = isMinimized || (!timer.isRunning && !timer.isFinished && isZeroAlertDismissed);

  // Determine current & next activity in chain
  const currentActId = state.currentPilotActivityId || 'E1-A01';
  const currentIndex = PILOT_CHAIN_ACTIVITIES.findIndex((a) => a.id === currentActId);
  const nextActivity = currentIndex >= 0 && currentIndex < PILOT_CHAIN_ACTIVITIES.length - 1 
    ? PILOT_CHAIN_ACTIVITIES[currentIndex + 1] 
    : null;

  const handleAdvanceToNextActivity = () => {
    if (nextActivity) {
      setCurrentPilotActivityId(nextActivity.id);
      setActiveWebappTab('atividade');
      resetTimer();
      setIsZeroAlertDismissed(true);
    }
  };

  if (isPillMinimized) {
    return (
      <div className="fixed bottom-4 right-4 md:right-6 z-50 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
        <div
          onClick={() => setIsMinimized(false)}
          className={`px-3.5 py-2 rounded-2xl border backdrop-blur-md font-mono font-extrabold text-sm flex items-center gap-2.5 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer ${
            timer.isFinished
              ? 'bg-rose-950 text-rose-100 border-rose-500 shadow-rose-950/60 ring-2 ring-rose-500/50 animate-pulse'
              : !timer.isRunning
                ? 'bg-slate-900/95 text-amber-300 border-amber-500/50 shadow-black/50'
                : isLowTime
                  ? 'bg-slate-900/95 text-amber-400 border-amber-500/80 shadow-amber-900/30'
                  : 'bg-slate-900/95 text-white border-slate-700/80 shadow-black/50'
          }`}
          title="Expandir Cronômetro"
        >
          <div className={`p-1 rounded-lg font-bold shrink-0 ${
            timer.isFinished ? 'bg-rose-600 text-white' : !timer.isRunning ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-500 text-slate-950'
          }`}>
            <Clock className="w-3.5 h-3.5" />
          </div>
          <span className="tracking-tight">{formatTime(timer.minutes, timer.seconds)}</span>
          
          {timer.isFinished ? (
            <span className="text-2xs font-extrabold px-1.5 py-0.5 rounded bg-rose-800 text-white uppercase tracking-wider hidden sm:inline">
              Tempo Esgotado
            </span>
          ) : !timer.isRunning ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                resumeTimer();
                setIsMinimized(false);
              }}
              className="p-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all hover:scale-110 active:scale-95 flex items-center justify-center shrink-0 shadow-xs cursor-pointer"
              title="Retomar Contagem Regressiva"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          ) : null}

          {/* Quick +2m button even in pill mode when time is finished */}
          {timer.isFinished && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addMinutesToTimer(2);
              }}
              className="px-2 py-0.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-2xs font-black transition cursor-pointer shadow-xs"
              title="Adicionar 2 minutos"
            >
              +2m
            </button>
          )}

          <ChevronUp className="w-4 h-4 text-amber-400" />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
            className="p-1 text-slate-400 hover:text-white transition-colors ml-1 cursor-pointer"
            title="Fechar barra de cronômetro"
            aria-label="Fechar barra de cronômetro"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:w-[580px] md:w-[660px] z-50 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className={`p-3 sm:p-4 rounded-2xl border backdrop-blur-md transition-all ${
        timer.isFinished 
          ? 'bg-slate-950 text-white border-rose-500 shadow-rose-950/60 ring-2 ring-rose-500/40' 
          : isLowTime 
            ? 'bg-slate-900/95 text-white border-amber-500/80 shadow-amber-900/30' 
            : 'bg-slate-900/95 text-white border-slate-700/80 shadow-black/50'
      }`}>
        
        {/* Main Dock Header Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          
          {/* Activity Name & Icon */}
          <div className="flex items-center gap-2.5 min-w-0 justify-between sm:justify-start">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`p-1.5 sm:p-2 rounded-xl text-white font-bold shrink-0 ${
                timer.isFinished ? 'bg-rose-600 animate-pulse' : isLowTime ? 'bg-amber-500' : 'bg-amber-500 text-slate-950'
              }`}>
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                  timer.isFinished ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {timer.isFinished ? '⚠️ Tempo Encerrado' : 'Em Andamento'}
                </span>
                <h4 className="text-xs font-bold text-white truncate max-w-[150px] sm:max-w-[180px]">
                  {timer.activityTitle || 'Atividade em Andamento'}
                </h4>
              </div>
            </div>

            {/* Mobile Clock Digits Display inline next to title */}
            <div className={`sm:hidden font-mono font-black text-xl tracking-tight ${
              timer.isFinished 
                ? 'text-rose-400 animate-pulse' 
                : isLowTime 
                  ? 'text-amber-400 animate-pulse' 
                  : 'text-white'
            }`}>
              {formatTime(timer.minutes, timer.seconds)}
            </div>
          </div>

          {/* Digital Clock Display & Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
            {/* Desktop Clock Digits */}
            <div className={`hidden sm:block font-mono font-black text-2xl sm:text-3xl tracking-tight ${
              timer.isFinished 
                ? 'text-rose-400 animate-pulse' 
                : isLowTime 
                  ? 'text-amber-400 animate-pulse' 
                  : 'text-white'
            }`}>
              {formatTime(timer.minutes, timer.seconds)}
            </div>

            {/* Controls Toolbar */}
            <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700 w-full sm:w-auto justify-between sm:justify-start">
              {timer.isRunning ? (
                <button
                  onClick={() => {
                    pauseTimer();
                    setIsMinimized(true);
                  }}
                  className="p-2 sm:p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer"
                  title="Pausar Cronômetro"
                  aria-label="Pausar Cronômetro"
                >
                  <Pause className="w-4 h-4 fill-current" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (timer.remainingSeconds === 0) {
                      addMinutesToTimer(2);
                    } else {
                      resumeTimer();
                    }
                    setIsMinimized(false);
                  }}
                  className="p-2 sm:p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors cursor-pointer"
                  title="Iniciar Cronômetro"
                  aria-label="Iniciar Cronômetro"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>
              )}

              <button
                onClick={() => {
                  resetTimer();
                  setIsMinimized(true);
                }}
                className="p-2 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                title="Reiniciar Tempo"
                aria-label="Reiniciar Tempo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="h-4 w-[1px] bg-slate-700 my-auto mx-0.5" />

              {/* Quick minute buttons */}
              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={() => addMinutesToTimer(-1)}
                  className="px-2 py-1 text-[11px] font-extrabold rounded-lg bg-slate-700/60 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 transition-colors cursor-pointer"
                  title="Remover 1 minuto"
                >
                  -1 min
                </button>

                <button
                  onClick={() => addMinutesToTimer(2)}
                  className="px-2 py-1 text-[11px] font-extrabold rounded-lg bg-slate-700/60 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer"
                  title="Adicionar 2 minutos"
                >
                  +2 min
                </button>

                <button
                  onClick={() => addMinutesToTimer(5)}
                  className="px-2 py-1 text-[11px] font-extrabold rounded-lg bg-slate-700/60 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                  title="Adicionar 5 minutos"
                >
                  +5 min
                </button>

                <div className="h-4 w-[1px] bg-slate-700 my-auto mx-0.5" />
              </div>

              {/* Mobile +2m quick button */}
              <button
                onClick={() => addMinutesToTimer(2)}
                className="sm:hidden px-2 py-1 text-2xs font-extrabold rounded-lg bg-slate-700/60 text-amber-300 transition-colors"
                title="Adicionar 2 minutos"
              >
                +2m
              </button>

              <button
                onClick={toggleTimerFullscreen}
                className="p-2 sm:p-1.5 rounded-lg text-amber-400 hover:bg-amber-500/20 transition-colors cursor-pointer"
                title="Modo Projeção em Tela Cheia"
                aria-label="Modo Projeção em Tela Cheia"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMinimized(true)}
                className="p-2 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                title="Minimizar Cronômetro"
                aria-label="Minimizar Cronômetro"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                className="p-2 sm:p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                title="Fechar barra de cronômetro"
                aria-label="Fechar barra de cronômetro"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Persistent, Non-Blocking Zero-Time Notice */}
        {timer.isFinished && (
          <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-rose-950/60 border border-rose-500/40 rounded-xl p-2.5">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
                <span className="text-xs font-medium text-rose-200">
                  Tempo previsto de <strong>{timer.activityTitle}</strong> encerrado. Você pode continuar ou estender:
                </span>
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
                <button
                  onClick={() => addMinutesToTimer(2)}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-2xs font-black rounded-lg transition cursor-pointer"
                >
                  +2 min
                </button>
                <button
                  onClick={() => addMinutesToTimer(5)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 text-2xs font-bold rounded-lg transition cursor-pointer"
                >
                  +5 min
                </button>
                {nextActivity && (
                  <button
                    onClick={handleAdvanceToNextActivity}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-2xs font-extrabold rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Próxima</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsZeroAlertDismissed(true);
                    setIsMinimized(true);
                  }}
                  className="p-1 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
                  title="Dispensar aviso"
                  aria-label="Dispensar aviso"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
