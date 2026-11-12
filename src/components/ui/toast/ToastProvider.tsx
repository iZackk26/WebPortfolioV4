import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ToastContext } from '../../../context/toastContext';
import { TOAST_LEAVE_MS, TOAST_LIMIT } from '../../../constants/toast';
import type { Toast, ToastInput } from '../../../types/toast';
import { ToastViewport } from './ToastViewport';

/**
 * Estado de los avisos: un id repetido reemplaza al anterior, nunca hay más de
 * TOAST_LIMIT y al cerrarse cada uno anima su salida antes de desaparecer.
 */
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((list) => list.map((toast) => (toast.id === id ? { ...toast, leaving: true } : toast)));
    const timer = setTimeout(() => {
      timers.current.delete(timer);
      setToasts((list) => list.filter((toast) => toast.id !== id || !toast.leaving));
    }, TOAST_LEAVE_MS);
    timers.current.add(timer);
  }, []);

  const show = useCallback(
    (input: ToastInput) => {
      const id = input.id ?? input.key;
      counter.current += 1;
      const next: Toast = { ...input, id, instance: counter.current, leaving: false };
      setToasts((list) => {
        const others = list.filter((toast) => toast.id !== id);
        const live = others.filter((toast) => !toast.leaving);
        // El más viejo sale para dejar lugar
        const overflow = live.length >= TOAST_LIMIT ? live[0].id : null;
        if (overflow) setTimeout(() => dismiss(overflow), 0);
        return [...others, next];
      });
      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
};
