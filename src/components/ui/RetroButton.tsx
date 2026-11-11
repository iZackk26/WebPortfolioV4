import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'aqua' | 'silver';

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type RetroButtonProps = BaseProps & ({ to: string; href?: never } | { href: string; to?: never });

const FILL: Record<Variant, string> = {
  aqua: 'aqua-fill',
  silver: 'silver-fill',
};

/** Botón pill retro con gloss. Usa `to` para rutas internas y `href` para archivos o sitios externos. */
export const RetroButton = ({ variant = 'aqua', children, className = '', ...target }: RetroButtonProps) => {
  const classes = `btn-retro gloss ${FILL[variant]} ${className}`;

  if (target.to !== undefined) {
    return (
      <Link to={target.to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={target.href} className={classes} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};
