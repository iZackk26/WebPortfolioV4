import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AVATAR } from '../../constants/navigation';
import { BurgerIcon } from './BurgerIcon';

interface AvatarButtonProps {
  open: boolean;
  onClick: () => void;
}

/** Foto (+ ≡ en móvil): único contenido visible del compacto y botón que lo abre. */
export const AvatarButton = forwardRef<HTMLButtonElement, AvatarButtonProps>(({ open, onClick }, ref) => {
  const { t } = useTranslation();

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="nav-links nav-sheet"
      aria-label={open ? t('nav.close_menu') : t('nav.open_menu')}
      className="nav-avatar nav-piece flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-0.5 pr-2.5 md:pr-0.5"
    >
      <picture>
        <source srcSet={AVATAR.webp} type="image/webp" />
        <img
          src={AVATAR.fallback}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover shadow-[0_0_0_1.5px_rgba(255,255,255,0.95),0_0_0_2.5px_rgba(0,0,0,0.35)]"
        />
      </picture>
      <BurgerIcon />
      <span className="nav-close-badge" aria-hidden="true">×</span>
    </button>
  );
});

AvatarButton.displayName = 'AvatarButton';
