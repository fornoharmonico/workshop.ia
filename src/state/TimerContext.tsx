/**
 * Timer Context V3
 * Manages the workshop countdown timer in 3 modes:
 * - Fullscreen
 * - Restored (floating bottom-right widget)
 * - Minimized (compact pill)
 * Strictly ephemeral in-memory state; local adjustments do not mutate canonical journey time.
 */
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { getActivityOrThrow } from '../domain/v3/journeyRegistry.ts';
import { ActivityId } from '../domain/v3/types.ts';

export type TimerDisplayMode = 'closed' | 'fullscreen' | 'restored' | 'minimized';

interface TimerContextValue {
  displayMode: TimerDisplayMode;
  setDisplayMode: (m: TimerDisplayMode) => void;
  targetActivityId: ActivityId;
  setTargetActivityId: (actId: ActivityId) => void;
  secondsRemaining: number;
  isRunning: boolean;
  canonicalMinutes: number;
  sessionAdjustmentMinutes: number;
  togglePlayPause: () => void;
  resetTimer: () => void;
  adjustMinutes: (delta: number) => void;
  openTimer: (activityId?: ActivityId, mode?: TimerDisplayMode) => void;
  closeTimer: () => void;
}

const TimerContext = createContext<TimerContextValue | null>(null);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [displayMode, setDisplayMode] = useState<TimerDisplayMode>('closed');
  const [targetActivityId, setTargetActivityId] = useState<ActivityId>('A01');
  const [sessionAdjustmentMinutes, setSessionAdjustmentMinutes] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  const act = getActivityOrThrow(targetActivityId);
  const canonicalMinutes = act.estimatedMinutes;
  const totalTargetSeconds = Math.max(60, (canonicalMinutes + sessionAdjustmentMinutes) * 60);

  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalTargetSeconds);

  // Update timer whenever target activity changes or adjustment is made, if not running
  useEffect(() => {
    if (!isRunning) {
      setSecondsRemaining(totalTargetSeconds);
    }
  }, [totalTargetSeconds, isRunning]);

  // Interval loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const togglePlayPause = () => {
    if (secondsRemaining === 0) {
      setSecondsRemaining(totalTargetSeconds);
    }
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsRemaining(totalTargetSeconds);
  };

  const adjustMinutes = (delta: number) => {
    setSessionAdjustmentMinutes((prev) => {
      const next = prev + delta;
      if (canonicalMinutes + next < 1) return prev;
      return next;
    });
    setSecondsRemaining((prev) => Math.max(10, prev + delta * 60));
  };

  const openTimer = (actId?: ActivityId, mode: TimerDisplayMode = 'restored') => {
    if (actId && actId !== targetActivityId) {
      setTargetActivityId(actId);
      setSessionAdjustmentMinutes(0);
      setIsRunning(false);
    }
    setDisplayMode(mode);
  };

  const closeTimer = () => {
    setDisplayMode('closed');
  };

  const value = useMemo(
    () => ({
      displayMode,
      setDisplayMode,
      targetActivityId,
      setTargetActivityId,
      secondsRemaining,
      isRunning,
      canonicalMinutes,
      sessionAdjustmentMinutes,
      togglePlayPause,
      resetTimer,
      adjustMinutes,
      openTimer,
      closeTimer,
    }),
    [
      displayMode,
      targetActivityId,
      secondsRemaining,
      isRunning,
      canonicalMinutes,
      sessionAdjustmentMinutes,
    ]
  );

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export function useTimer(): TimerContextValue {
  const ctx = useContext(TimerContext);
  if (!ctx) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return ctx;
}
