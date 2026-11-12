import { useEffect, useState } from 'react';
import { NAV_TIMING } from '../constants/navbar';
import type { NavMode } from './useCompactNav';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Compacto → barra en dos tiempos: primero los círculos se funden en un pill (fase
 * `merging`, el navbar sigue mostrándose compacto) y después la barra se expande.
 * El estado se ajusta durante el render para que la geometría nunca vea un 'top' intermedio.
 */
export const useMergePhase = (mode: NavMode) => {
  const [prev, setPrev] = useState(mode);
  const [merging, setMerging] = useState(false);

  if (mode !== prev) {
    setPrev(mode);
    setMerging(mode === 'top' && prev !== 'top' && !prefersReducedMotion());
  }

  useEffect(() => {
    if (!merging) return;
    const timer = setTimeout(() => setMerging(false), NAV_TIMING.mergeMs);
    return () => clearTimeout(timer);
  }, [merging]);

  const shown: NavMode = merging ? 'closed' : mode;
  return { shown, merging };
};
