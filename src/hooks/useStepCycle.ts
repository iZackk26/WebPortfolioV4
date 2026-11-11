import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Recorre los pasos 0..count-1 en bucle mientras `running` sea true.
 * Con reduced motion devuelve `count` (todos completos) y no anima.
 */
export const useStepCycle = (count: number, running: boolean, intervalMs: number, holdMs: number) => {
  const reducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!running || reducedMotion) return;
    const isLast = step >= count - 1;
    const timer = setTimeout(() => setStep(isLast ? 0 : step + 1), isLast ? holdMs : intervalMs);
    return () => clearTimeout(timer);
  }, [step, count, running, reducedMotion, intervalMs, holdMs]);

  return reducedMotion ? count : step;
};
