import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CHAT_MOTION } from '../constants/chat';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** Margen del recorte final para no cortar la sombra de la ventana */
const SPREAD = 60;
const RADIUS = 16;

/** Recorte con la forma del lanzador, relativo a la ventana */
const fromLauncher = (launcher: HTMLElement, panel: HTMLElement) => {
  const l = launcher.getBoundingClientRect();
  const p = panel.getBoundingClientRect();
  return `inset(${l.top - p.top}px ${p.right - l.right}px ${p.bottom - l.bottom}px ${l.left - p.left}px round ${l.height / 2}px)`;
};
const FULL = `inset(-${SPREAD}px round ${RADIUS + SPREAD}px)`;

/**
 * La ventana se revela desde el lanzador y se recoge hacia él (clip-path: no deforma
 * el contenido). Devuelve si está visible y si el contenido ya puede mostrarse.
 */
export const useChatMorph = (panelRef: RefObject<HTMLElement>, launcherRef: RefObject<HTMLElement | null>, open: boolean) => {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(open);
  const [settled, setSettled] = useState(open);
  const first = useRef(true);

  useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const launcher = launcherRef.current;
    if (first.current) {
      first.current = false;
      if (!open) return;
    }
    if (!panel || !visible) return;
    panel.getAnimations().forEach((animation) => animation.cancel());

    if (reduced || !launcher) {
      setSettled(open);
      if (!open) setVisible(false);
      return;
    }

    if (open) {
      setSettled(false);
      panel.animate([{ clipPath: fromLauncher(launcher, panel), transform: 'translateY(-4px)' }, { clipPath: FULL, transform: 'none' }], {
        duration: CHAT_MOTION.openMs,
        easing: CHAT_MOTION.glide,
      });
      const timer = setTimeout(() => setSettled(true), CHAT_MOTION.openMs * CHAT_MOTION.contentAt);
      return () => clearTimeout(timer);
    }

    setSettled(false);
    const animation = panel.animate([{ clipPath: FULL, opacity: 1 }, { clipPath: fromLauncher(launcher, panel), opacity: 0.4 }], {
      duration: CHAT_MOTION.closeMs,
      delay: CHAT_MOTION.closeDelayMs,
      easing: CHAT_MOTION.accelerate,
      fill: 'forwards',
    });
    animation.finished.then(() => setVisible(false)).catch(() => undefined);
  }, [open, visible, reduced, panelRef, launcherRef]);

  return { visible, settled };
};
