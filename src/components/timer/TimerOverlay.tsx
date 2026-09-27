/**
 * Timer Overlay Component V3
 * Master Dossier V3 - RF21 & Anexo 08:
 * 3 operational modes:
 * - Fullscreen (immersive)
 * - Restored (floating bottom-right widget)
 * - Minimized (compact pill)
 */
import React from 'react';
import {
  Clock,
  Maximize2,
  Minimize2,
  Minus,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Volume2,
  X,
} from 'lucide-react';
import { useTimer } from '../../state/TimerContext.tsx';
import { getActivityOrThrow } from '../../domain/v3/journeyRegistry.ts';

export const TimerOverlay: React.FC = () => {
  const {
    displayMode,
    setDisplayMode,
    targetActivityId,
    secondsRemaining,
    isRunning,
    canonicalMinutes,
    sessionAdjustmentMinutes,
    togglePlayPause,
    resetTimer,
    adjustMinutes,
    closeTimer,
  } = useTimer();

  if (displayMode === 'closed') return null;

  const activity = getActivityOrThrow(targetActivityId);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // 1. Minimized Mode (Compact Pill)
  if (displayMode === 'minimized') {
    return (
      <div className="fixed bottom-4 right-4 z-40 flex items-center space-x-2 rounded-full border border-neutral-700 bg-neutral-900/95 px-3 py-1.5 shadow-2xl backdrop-blur-md">
        <span className="font-mono text-xs font-bold text-amber-400">
          {formatTime(secondsRemaining)}
        </span>
        <button
          onClick={togglePlayPause}
          className="text-neutral-300 hover:text-amber-400 p-0.5"
          title={isRunning ? 'Pausar' : 'Iniciar'}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={() => setDisplayMode('restored')}
          className="text-neutral-400 hover:text-neutral-100 p-0.5"
          title="Expandir para janela"
        >
          <Maximize2 className="w-3 h-3" />
        </button>
      </div>
    );
  }

  // 2. Restored Mode (Floating widget bottom-right)
  if (displayMode === 'restored') {
    return (
      <div className="fixed bottom-4 right-4 z-40 w-72 rounded-2xl border border-neutral-800 bg-neutral-900/95 p-4 shadow-2xl backdrop-blur-md space-y-3 animate-in slide-in-from-bottom-3 duration-200">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <div className="flex items-center space-x-1.5 text-xs text-neutral-300 truncate">
            <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-1 rounded text-[10px]">
              {activity.id}
            </span>
            <span className="truncate font-semibold">{activity.title}</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setDisplayMode('fullscreen')}
              className="text-neutral-400 hover:text-neutral-100 p-1"
              title="Tela cheia"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDisplayMode('minimized')}
              className="text-neutral-400 hover:text-neutral-100 p-1"
              title="Minimizar"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={closeTimer}
              className="text-neutral-400 hover:text-neutral-100 p-1"
              title="Fechar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Big Time Display */}
        <div className="text-center py-1">
          <div
            className={`font-mono text-3xl font-black tracking-tight ${
              secondsRemaining <= 60
                ? 'text-rose-400 animate-pulse'
                : isRunning
                ? 'text-amber-400'
                : 'text-neutral-200'
            }`}
          >
            {formatTime(secondsRemaining)}
          </div>
          <span className="text-[10px] text-neutral-500 font-mono">
            Previsto: {canonicalMinutes} min {sessionAdjustmentMinutes !== 0 && `(${sessionAdjustmentMinutes > 0 ? '+' : ''}${sessionAdjustmentMinutes}m sessão)`}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-2 pt-1">
          <button
            onClick={() => adjustMinutes(-1)}
            className="rounded-lg bg-neutral-800 p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700"
            title="Diminuir 1 minuto nesta sessão"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={togglePlayPause}
            className={`flex items-center space-x-1 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-md ${
              isRunning
                ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400 shadow-amber-500/20'
                : 'bg-emerald-500 text-neutral-950 hover:bg-emerald-400 shadow-emerald-500/20'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pausar' : 'Iniciar'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="rounded-lg bg-neutral-800 p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700"
            title="Resetar tempo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => adjustMinutes(1)}
            className="rounded-lg bg-neutral-800 p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700"
            title="Adicionar 1 minuto nesta sessão"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // 3. Fullscreen Mode
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-neutral-950 p-6 sm:p-12 text-neutral-100 animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-mono text-sm font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-xl border border-amber-400/20">
            {activity.id}
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold">{activity.title}</h2>
            <p className="text-xs text-neutral-400">{activity.objective}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setDisplayMode('restored')}
            className="flex items-center space-x-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
            <span>Restaurar</span>
          </button>
          <button
            onClick={closeTimer}
            className="rounded-xl border border-neutral-800 bg-neutral-900 p-2 text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Huge Time Countdown Center */}
      <div className="my-auto text-center space-y-4">
        <div
          className={`font-mono text-7xl sm:text-9xl md:text-[13rem] font-black tracking-tight select-none ${
            secondsRemaining <= 60
              ? 'text-rose-400 animate-pulse'
              : isRunning
              ? 'text-amber-400'
              : 'text-neutral-300'
          }`}
        >
          {formatTime(secondsRemaining)}
        </div>

        <p className="text-sm font-mono text-neutral-500">
          Tempo canônico previsto: {canonicalMinutes} minutos •{' '}
          {sessionAdjustmentMinutes !== 0 && (
            <span className="text-amber-400">
              Ajuste desta sessão: {sessionAdjustmentMinutes > 0 ? '+' : ''}{sessionAdjustmentMinutes} min (não altera a ementa)
            </span>
          )}
        </p>
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => adjustMinutes(-5)}
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-mono font-semibold text-neutral-300 hover:bg-neutral-800"
          >
            -5 min
          </button>
          <button
            onClick={() => adjustMinutes(-1)}
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-mono font-semibold text-neutral-300 hover:bg-neutral-800"
          >
            -1 min
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlayPause}
            className={`flex items-center space-x-3 rounded-2xl px-8 py-4 text-base font-bold transition-all shadow-xl ${
              isRunning
                ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400 shadow-amber-500/20'
                : 'bg-emerald-500 text-neutral-950 hover:bg-emerald-400 shadow-emerald-500/20'
            }`}
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            <span>{isRunning ? 'Pausar Sessão' : 'Iniciar Contagem'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
            title="Reiniciar tempo"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => adjustMinutes(1)}
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-mono font-semibold text-neutral-300 hover:bg-neutral-800"
          >
            +1 min
          </button>
          <button
            onClick={() => adjustMinutes(5)}
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-mono font-semibold text-neutral-300 hover:bg-neutral-800"
          >
            +5 min
          </button>
        </div>
      </div>
    </div>
  );
};
