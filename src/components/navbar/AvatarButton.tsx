import { useTranslation } from 'react-i18next';
import { AVATAR } from '../../constants/navigation';

interface AvatarButtonProps {
  expanded: boolean;
  menuOpen: boolean;
  onClick: () => void;
}

/** Foto + ≡: el único contenido visible del pill compacto. */
export const AvatarButton = ({ expanded, menuOpen, onClick }: AvatarButtonProps) => {
  const { t } = useTranslation();
  const isOpen = expanded && menuOpen;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="nav-sheet"
      aria-label={isOpen ? t('nav.close_menu') : t('nav.open_menu')}
      className="flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-0.5 pr-2.5"
    >
      <picture>
        <source srcSet={AVATAR.webp} type="image/webp" />
        <img
          src={AVATAR.fallback}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover shadow-[0_0_0_1.5px_rgba(255,255,255,0.9),0_0_0_2.5px_rgba(0,0,0,0.35)]"
        />
      </picture>
      <span className="nav-burger" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </button>
  );
};
