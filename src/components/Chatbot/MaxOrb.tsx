import { MAX_AVATAR } from '../../constants/chat';

interface MaxOrbProps {
  /** sm: 28 px (navbar y mensajes) · md: 30 px (cabecera) · lg: 40 px (burbuja compacta) */
  size?: 'sm' | 'md' | 'lg';
}

/** Max: corgi en pixel art dentro de una esfera Aero con el brillo del vidrio encima. */
export const MaxOrb = ({ size = 'sm' }: MaxOrbProps) => (
  <span className={`max-orb max-orb--${size}`} aria-hidden="true">
    <img src={MAX_AVATAR} alt="" width={64} height={64} decoding="async" draggable={false} />
  </span>
);
