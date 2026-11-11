import { useTranslation } from 'react-i18next';
import { INTRO_PHOTO } from '../../../constants/intro';
import { Window } from '../../ui/Window';

interface DeskPhotoProps {
  /** desk: 3:4 con caption, en el escritorio; compact: cuadrada, en móvil */
  variant: 'desk' | 'compact';
}

/** Foto dentro de una ventana retro. */
export const DeskPhoto = ({ variant }: DeskPhotoProps) => {
  const { t } = useTranslation();
  const isDesk = variant === 'desk';

  return (
    <figure className={`m-0 ${isDesk ? 'w-[168px]' : 'w-[132px]'}`}>
      <Window>
        <img
          src={INTRO_PHOTO.src}
          alt={t('home.photoAlt')}
          draggable={false}
          decoding="async"
          className={`block w-full object-cover ${isDesk ? 'aspect-[3/4]' : 'aspect-square object-[center_72%]'}`}
        />
      </Window>
      {isDesk && <figcaption className="win-caption">{INTRO_PHOTO.fileName}</figcaption>}
    </figure>
  );
};
