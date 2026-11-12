import { ReactNode } from 'react';

interface WindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  /** Si se pasa, el semáforo rojo es un botón real que cierra la ventana */
  onClose?: () => void;
  /** Nombre accesible del botón de cerrar (obligatorio en la práctica si hay onClose) */
  closeLabel?: string;
}

/** Ventana de escritorio retro: barra con semáforos y título centrado. */
export const Window = ({ title, children, className = '', onClose, closeLabel }: WindowProps) => (
  <div className={`win ${className}`}>
    <div className="win-bar" aria-hidden={!title && !onClose}>
      {onClose ? (
        <button type="button" className="win-dot win-dot--close" onClick={onClose} aria-label={closeLabel} title={closeLabel} />
      ) : (
        <i className="win-dot" />
      )}
      <i className="win-dot" />
      <i className="win-dot" />
      {title && <span className="win-title">{title}</span>}
    </div>
    {children}
  </div>
);
