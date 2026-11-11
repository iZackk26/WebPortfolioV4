import { useCallback, useEffect, useRef, useState } from 'react';
import { useScrolledPast } from './useScrolledPast';

const SCROLL_THRESHOLD_PX = 100;
const COLLAPSE_DELAY_MS = 700;
const SHEET_CLOSE_SCROLL_PX = 24;

/**
 * Estado del navbar pill:
 * - arriba de la página: expandido
 * - tras el umbral de scroll: compacto (foto + ≡), se expande con hover, foco o tap
 * - `sheetOpen`: hoja de links en pantallas angostas
 */
export const useCompactNav = () => {
  const scrolled = useScrolledPast(SCROLL_THRESHOLD_PX);
  const [engaged, setEngaged] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const clearTimer = () => clearTimeout(timer.current);

  const engage = useCallback(() => {
    clearTimer();
    setEngaged(true);
  }, []);

  const release = useCallback(() => {
    clearTimer();
    timer.current = setTimeout(() => setEngaged(false), COLLAPSE_DELAY_MS);
  }, []);

  const close = useCallback(() => {
    clearTimer();
    setEngaged(false);
    setSheetOpen(false);
  }, []);

  const expanded = !scrolled || engaged;

  const toggleFromAvatar = useCallback(() => {
    if (!expanded) {
      engage();
      setSheetOpen(true);
    } else if (scrolled) {
      close();
    } else {
      setSheetOpen((open) => !open);
    }
  }, [expanded, scrolled, engage, close]);

  // Al cruzar el umbral de scroll se cierra cualquier interacción abierta
  useEffect(() => close(), [scrolled, close]);

  // Con la hoja abierta, desplazarse la cierra (como el menú móvil anterior)
  useEffect(() => {
    if (!sheetOpen) return;
    const startY = window.scrollY;
    const onScroll = () => Math.abs(window.scrollY - startY) > SHEET_CLOSE_SCROLL_PX && close();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sheetOpen, close]);
  useEffect(() => clearTimer, []);

  return {
    expanded,
    sheetOpen: expanded && sheetOpen,
    engage,
    release,
    close,
    toggleFromAvatar,
  };
};
