import { ReactNode } from 'react';

interface WindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

/** Ventana de escritorio retro: barra con semáforos y título centrado. */
export const Window = ({ title, children, className = '' }: WindowProps) => (
  <div className={`win ${className}`}>
    <div className="win-bar" aria-hidden={!title}>
      <i className="win-dot" />
      <i className="win-dot" />
      <i className="win-dot" />
      {title && <span className="win-title">{title}</span>}
    </div>
    {children}
  </div>
);
