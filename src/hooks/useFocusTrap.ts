import { RefObject, useEffect } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Mientras el diálogo está abierto, Tab y Shift+Tab giran dentro de él y Esc lo cierra.
 * Al cerrarse, el foco vuelve a quien lo abrió.
 */
export const useFocusTrap = (
  ref: RefObject<HTMLElement>,
  active: boolean,
  onEscape: () => void,
  returnTo: RefObject<HTMLElement | null>,
) => {
  useEffect(() => {
    const root = ref.current;
    if (!active || !root) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscape();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const back = returnTo.current;
    return () => {
      document.removeEventListener('keydown', onKey);
      back?.focus({ preventScroll: true });
    };
  }, [ref, active, onEscape, returnTo]);
};
