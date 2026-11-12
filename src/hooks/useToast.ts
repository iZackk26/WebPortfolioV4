import { useContext } from 'react';
import { ToastContext } from '../context/toastContext';

/** Avisos del sitio (toasts de vidrio). Nunca alert(): todo pasa por aquí. */
export const useToast = () => {
  const value = useContext(ToastContext);
  if (!value) throw new Error('useToast debe usarse dentro de <ToastProvider>');
  return value;
};
