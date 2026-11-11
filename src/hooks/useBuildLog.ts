import { useEffect, useState } from 'react';
import { BUILD_LINE_TONES, BUILD_PROGRESS, BUILD_START_PROGRESS, BUILD_TIMING } from '../constants/underConstruction';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface BuildLogState {
  /** Texto visible de cada línea (puede ir a medio escribir) */
  visible: string[];
  progress: number;
  typing: boolean;
  finished: boolean;
}

/**
 * Escribe las líneas de la terminal letra por letra, sube el progreso,
 * pausa en la línea de revisión y vuelve a empezar. Con reduced motion muestra todo de una.
 */
export const useBuildLog = (lines: string[]) => {
  const reducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState<BuildLogState>({ visible: [], progress: BUILD_START_PROGRESS, typing: false, finished: false });
  const linesKey = lines.join('\n');

  useEffect(() => {
    const all = linesKey.split('\n');
    if (reducedMotion) {
      setState({ visible: all, progress: BUILD_PROGRESS[BUILD_PROGRESS.length - 1], typing: false, finished: true });
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    const run = () => {
      setState({ visible: [], progress: BUILD_START_PROGRESS, typing: true, finished: false });
      let t = BUILD_TIMING.startDelayMs;

      all.forEach((text, i) => {
        [...text].forEach((_, j) =>
          at(t + j * BUILD_TIMING.charMs, () =>
            setState((s) => ({ ...s, typing: true, visible: [...all.slice(0, i), text.slice(0, j + 1)] }))
          )
        );
        t += text.length * BUILD_TIMING.charMs;
        const isReview = BUILD_LINE_TONES[i] === 'warn';
        at(t, () => setState((s) => ({ ...s, progress: BUILD_PROGRESS[i], typing: !isReview })));
        t += isReview ? BUILD_TIMING.reviewPauseMs : BUILD_TIMING.lineGapMs;
      });

      at(t, () => setState((s) => ({ ...s, typing: false, finished: true })));
      at(t + BUILD_TIMING.restartMs, run);
    };

    run();
    return () => timers.forEach(clearTimeout);
  }, [linesKey, reducedMotion]);

  return state;
};
