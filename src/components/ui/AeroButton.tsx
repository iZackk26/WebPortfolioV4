import { Link } from 'react-router-dom';
import type { AeroButtonProps, AeroSize, AeroTone } from '../../types/aeroButton';

const TONE: Record<AeroTone, string> = {
  aqua: '',
  silver: 'aero--silver',
};

const SIZE: Record<AeroSize, string> = {
  sm: 'aero-btn--sm',
  md: 'aero-btn--md',
  icon: 'aero-btn--icon',
};

/** mailto abre el cliente de correo; lo demás (CV, sitios) en pestaña nueva */
const opensNewTab = (href: string) => !href.startsWith('mailto:');

/**
 * Botón único del sitio: material Aero (Windows 7) con vidrio, igual al link activo
 * del navbar. Solo cambian el tono y el tamaño. `to` → ruta interna, `href` → enlace,
 * sin ninguno → <button>.
 */
export const AeroButton = (props: AeroButtonProps) => {
  const { tone = 'aqua', size = 'md', className = '', children } = props;
  const classes = `aero aero-btn ${TONE[tone]} ${SIZE[size]} ${className}`;
  const label = props['aria-label'];

  if (props.to !== undefined) {
    return (
      <Link to={props.to} className={classes} aria-label={label}>
        {children}
      </Link>
    );
  }

  if (props.href !== undefined) {
    const newTab = opensNewTab(props.href);
    return (
      <a
        href={props.href}
        className={classes}
        aria-label={label}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
      aria-label={label}
    >
      {children}
    </button>
  );
};
