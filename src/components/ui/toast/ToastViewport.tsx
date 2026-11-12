import { useTranslation } from 'react-i18next';
import type { Toast } from '../../../types/toast';
import { ToastItem } from './ToastItem';

interface ToastViewportProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

/** Zona de avisos: abajo al centro; en móvil con el chat abierto pasa arriba (toast.css). */
export const ToastViewport = ({ toasts, onDismiss }: ToastViewportProps) => {
  const { t } = useTranslation();

  return (
    <section className="toast-region" aria-label={t('toast.region')}>
      {toasts.map((toast) => (
        <ToastItem key={`${toast.id}-${toast.instance}`} toast={toast} onDismiss={onDismiss} />
      ))}
    </section>
  );
};
