import type { ToastTone } from '../types/toast';

/** Tiempo en pantalla por tono; los avisos con acción quedan hasta que se cierren */
export const TOAST_DURATION_MS: Record<ToastTone, number> = {
  success: 4000,
  info: 4000,
  warning: 6000,
  error: 6000,
};

/** Avisos visibles a la vez: al llegar otro sale el más viejo */
export const TOAST_LIMIT = 3;

/** Duración de la animación de salida (toast.css) */
export const TOAST_LEAVE_MS = 260;

/** Ícono de la gema por tono */
export const TOAST_ICON: Record<ToastTone, string> = {
  success: '✓',
  warning: '!',
  error: '×',
  info: '↻',
};
