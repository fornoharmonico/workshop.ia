import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, RotateCcw, Maximize2, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const TimerControl: React.FC = () => {
  const { timer, pauseTimer, resumeTimer, resetTimer, addMinutesToTimer, toggleTimerFullscreen } = useApp();
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [hasBeenActivated, setHasBeenActivated] = useState<boolean>(false);

  // Track if timer has ever been started in this session
  React.useEffect(() => {
    if (timer.isRunning) {
      setHasBeenActivated(true);
    }
  }, [timer.isRunning]);

  // Hide floating footer timer ONLY before any timer has been activated
  if (!hasBeenActivated && !timer.isRunning && !timer.isFinished) return null;

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timer.totalSeconds > 0 && timer.totalSeconds <= 180; // 3 mins or less
  const isPillMinimized = isMinimized || (!timer.isRunning && !timer.isFinished);

  if (isPillMinimized) {
    return (
      <div className="fixed bottom-4 right-4 md:right-6 z-50 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
        <div
          onClick={() => setIsMinimized(false)}
          className={`px-3.5 py-2 rounded-2xl border backdrop-blur-md font-mono font-extrabold text-sm flex items-center gap-2.5 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer ${
            timer.isFinished
              ? 'bg-rose-900/95 text-white border-rose-500 animate-pulse shadow-rose-900/40'
              : !timer.isRunning
                ? 'bg-slate-900/95 text-amber-300 border-amber-500/50 shadow-black/50'
                : isLowTime
                  ? 'bg-slate-900/95 text-amber-400 border-amber-500/80 shadow-amber-900/30'
                  : 'bg-slate-900/95 text-white border-slate-700/80 shadow-black/50'
          }`}
          title="Expandir Cronômetro"
        >
          <div className={`p-1 rounded-lg font-bold shrink-0 ${!timer.isRunning ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-500 text-slate-950'}`}>
            <Clock className="w-3.5 h-3.5" />
          </div>
          <span className="tracking-tight">{formatTime(timer.minutes, timer.seconds)}</span>
          {!timer.isRunning && (
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
          )}
          <ChevronUp className="w-4 h-4 text-amber-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:w-[580px] md:w-[660px] z-50 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className={`p-3 sm:p-4 rounded-2xl border backdrop-blur-md transition-all ${
        timer.isFinished 
          ? 'bg-rose-900/95 text-white border-rose-500 animate-pulse shadow-rose-900/40' 
          : isLowTime 
            ? 'bg-slate-900/95 text-white border-amber-500/80 shadow-amber-900/30' 
            : 'bg-slate-900/95 text-white border-slate-700/80 shadow-black/50'
      }`}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          
          {/* Activity Name & Icon */}
          <div className="flex items-center gap-2.5 min-w-0 justify-between sm:justify-start">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`p-1.5 sm:p-2 rounded-xl text-white font-bold shrink-0 ${
                timer.isFinished ? 'bg-rose-600' : isLowTime ? 'bg-amber-500' : 'bg-amber-500 text-slate-950'
              }`}>
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">
                  Em Andamento
                </span>
                <h4 className="text-xs font-bold text-white truncate max-w-[150px] sm:max-w-[180px]">
                  {timer.activityTitle || 'Atividade em Andamento'}
                </h4>
              </div>
            </div>

            {/* Mobile Clock Digits Display inline next to title */}
            <div className={`sm:hidden font-mono font-black text-xl tracking-tight ${
              timer.isFinished 
                ? 'text-rose-400' 
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
                ? 'text-rose-400' 
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
                    resumeTimer();
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

              {/* Quick minute buttons — hidden on tiny mobile, visible from sm */}
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
            </div>
          </div>

        </div>

        {timer.isFinished && (
          <div className="mt-2 text-xs font-semibold text-rose-300 flex items-center justify-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            <span>Tempo encerrado para esta atividade! Conclua o registro ou adicione mais minutos.</span>
          </div>
        )}
      </div>
    </div>
  );
};
