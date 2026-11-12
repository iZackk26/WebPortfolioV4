import { CSSProperties, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TOAST_DURATION_MS, TOAST_ICON } from '../../../constants/toast';
import type { Toast } from '../../../types/toast';
import { useToastTimer } from '../../../hooks/useToastTimer';

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

/** Circunferencia del anillo de tiempo (r = 17) */
const RING = 2 * Math.PI * 17;

/**
 * Cápsula de vidrio: gema Aero del tono, anillo que marca el tiempo (se pausa con el
 * mouse o el foco), título, mensaje, acción opcional y cerrar.
 */
export const ToastItem = ({ toast, onDismiss }: ToastItemProps) => {
  const { t } = useTranslation();
  const duration = toast.durationMs === undefined ? (toast.action ? null : TOAST_DURATION_MS[toast.tone]) : toast.durationMs;
  const { paused, pause, resume } = useToastTimer(duration, () => onDismiss(toast.id));
  const [seconds, setSeconds] = useState(toast.countdown ?? 0);

  // Cuenta atrás del mensaje (p. ej. el límite del chat)
  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const values = { ...toast.values, ...(toast.countdown ? { seconds } : {}) };
  const urgent = toast.tone === 'error' || Boolean(toast.action);

  return (
    <div
      className="toast"
      data-tone={toast.tone}
      data-leaving={toast.leaving}
      data-paused={paused}
      role={urgent ? 'alert' : 'status'}
      onPointerEnter={pause}
      onPointerLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <span className="toast-ring" aria-hidden="true">
        {duration !== null && (
          <svg viewBox="0 0 38 38">
            <circle className="toast-track" cx="19" cy="19" r="17" />
            <circle className="toast-progress" cx="19" cy="19" r="17" style={{ '--ring': RING, animationDuration: `${duration}ms` } as CSSProperties} />
          </svg>
        )}
        <span className="toast-gem">{TOAST_ICON[toast.tone]}</span>
      </span>
      <div className="toast-text">
        <b>{t(`${toast.key}.title`, values)}</b>
        <span>{t(`${toast.key}.message`, values)}</span>
      </div>
      {toast.action && (
        <button type="button" className="aero toast-action" onClick={toast.action.onClick}>
          {t(toast.action.labelKey)}
        </button>
      )}
      <button type="button" className="toast-close" onClick={() => onDismiss(toast.id)} aria-label={t('toast.close')}>
        ×
      </button>
    </div>
  );
};
