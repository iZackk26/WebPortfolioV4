import type { ReactNode } from 'react';

/** Variaciones de color del material Aero; el efecto es el mismo en todas. */
export type AeroTone = 'aqua' | 'silver';

/** sm: acciones dentro de tarjetas y formularios · md: CTA principal · icon: circular */
export type AeroSize = 'sm' | 'md' | 'icon';

interface AeroBase {
  tone?: AeroTone;
  size?: AeroSize;
  className?: string;
  'aria-label'?: string;
  children: ReactNode;
}

/** Ruta interna (react-router) */
interface AeroLink extends AeroBase {
  to: string;
  href?: never;
}

/** Archivo, sitio externo o mailto */
interface AeroAnchor extends AeroBase {
  href: string;
  to?: never;
}

/** Acción en la página o envío de formulario */
interface AeroAction extends AeroBase {
  to?: never;
  href?: never;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

export type AeroButtonProps = AeroLink | AeroAnchor | AeroAction;
