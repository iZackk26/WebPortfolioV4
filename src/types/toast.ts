export type ToastTone = 'success' | 'warning' | 'error' | 'info';

export interface ToastAction {
  /** Clave de i18n del texto del botón */
  labelKey: string;
  onClick: () => void;
}

export interface ToastInput {
  /**
   * Clave de i18n con `title` y `message` (toast.copied → toast.copied.title / .message).
   * Se traduce al pintarse: si cambia el idioma, el aviso cambia también.
   */
  key: string;
  tone: ToastTone;
  /** Valores del mensaje ({{email}}, {{seconds}}…) */
  values?: Record<string, string | number>;
  /** Cuenta atrás en segundos: el mensaje recibe {{seconds}} actualizado cada segundo */
  countdown?: number;
  action?: ToastAction;
  /** null: queda hasta que se cierre. Sin valor, el del tono. */
  durationMs?: number | null;
  /** Un aviso con el mismo id reemplaza al anterior en vez de duplicarse (por defecto, `key`) */
  id?: string;
}

export interface Toast extends ToastInput {
  id: string;
  /** Cambia en cada aviso nuevo: reinicia el tiempo aunque el id se repita */
  instance: number;
  leaving: boolean;
}
