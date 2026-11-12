import { createContext } from 'react';
import type { ToastInput } from '../types/toast';

export interface ToastContextValue {
  /** Muestra un aviso y devuelve su id */
  show: (toast: ToastInput) => string;
  dismiss: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
