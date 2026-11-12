import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Tiempo de vida de un aviso con pausa: al pausar guarda lo que falta y al reanudar
 * sigue desde ahí. Con `durationMs` null el aviso no se cierra solo.
 */
export const useToastTimer = (durationMs: number | null, onDone: () => void) => {
  const [paused, setPaused] = useState(false);
  const remaining = useRef(durationMs ?? 0);
  const startedAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const done = useRef(onDone);
  done.current = onDone;

  const start = useCallback(() => {
    if (durationMs === null) return;
    startedAt.current = Date.now();
    timer.current = setTimeout(() => done.current(), remaining.current);
  }, [durationMs]);

  useEffect(() => {
    start();
    return () => clearTimeout(timer.current);
  }, [start]);

  const pause = useCallback(() => {
    if (durationMs === null) return;
    clearTimeout(timer.current);
    remaining.current = Math.max(0, remaining.current - (Date.now() - startedAt.current));
    setPaused(true);
  }, [durationMs]);

  const resume = useCallback(() => {
    if (durationMs === null) return;
    setPaused(false);
    start();
  }, [durationMs, start]);

  return { paused, pause, resume };
};
