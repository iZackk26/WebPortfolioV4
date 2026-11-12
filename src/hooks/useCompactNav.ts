import { useCallback, useEffect, useRef, useState } from 'react';
import { useScrolledPast } from './useScrolledPast';
import { NAV_TIMING } from '../constants/navbar';

export type NavMode = 'top' | 'closed' | 'open';

/**
 * Estado del navbar:
 * - 'top': zona superior de la página, barra completa
 * - 'closed': compacto, solo el círculo con la foto
 * - 'open': compacto abierto (piezas Spotlight en escritorio, hoja en móvil)
 * En la zona superior `open` solo controla la hoja móvil.
 */
export const useCompactNav = () => {
  const scrolled = useScrolledPast(NAV_TIMING.scrollThresholdPx);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const clearTimer = () => clearTimeout(timer.current);

  const close = useCallback(() => {
    clearTimer();
    setOpen(false);
  }, []);

  const toggle = useCallback(() => {
    clearTimer();
    setOpen((value) => !value);
  }, []);

  // Hover y foco solo abren el compacto: arriba la barra ya lo muestra todo
  const engage = useCallback(() => {
    clearTimer();
    if (scrolled) setOpen(true);
  }, [scrolled]);

  const release = useCallback(() => {
    clearTimer();
    if (scrolled) timer.current = setTimeout(() => setOpen(false), NAV_TIMING.hoverCloseDelayMs);
  }, [scrolled]);

  // Al cruzar el umbral se cierra cualquier interacción abierta
  useEffect(() => close(), [scrolled, close]);

  // Con el menú abierto, desplazarse lo cierra
  useEffect(() => {
    if (!open) return;
    const startY = window.scrollY;
    const onScroll = () => Math.abs(window.scrollY - startY) > NAV_TIMING.closeOnScrollPx && close();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open, close]);

  useEffect(() => clearTimer, []);

  const mode: NavMode = !scrolled ? 'top' : open ? 'open' : 'closed';

  return { mode, open, engage, release, close, toggle };
};
