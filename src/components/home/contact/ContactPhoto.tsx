import { useTranslation } from 'react-i18next';
import { CONTACT_PHOTO } from '../../../constants/contact';
import { Draggable } from '../../ui/Draggable';
import { Window } from '../../ui/Window';
import { ProgressiveImage } from '../../ui/ProgressiveImage';

interface ContactPhotoProps {
  /** Ancho de la foto según dónde se use */
  className?: string;
}

/** Selfie en una ventana inclinada; se usa en el contacto de la Home y en el About. */
export const ContactPhoto = ({ className = 'w-[min(190px,55%)] lg:w-[300px]' }: ContactPhotoProps) => {
  const { t } = useTranslation();

  return (
    <Draggable mouseOnly rotate={CONTACT_PHOTO.rotateDeg} className={className}>
      <figure className="m-0">
        <Window title={CONTACT_PHOTO.fileName}>
          <ProgressiveImage
            src={CONTACT_PHOTO.src}
            srcSet={CONTACT_PHOTO.srcSet}
            lowSrc={CONTACT_PHOTO.lowSrc}
            placeholder={CONTACT_PHOTO.placeholder}
            sizes={CONTACT_PHOTO.sizes}
            width={700}
            height={933}
            alt={t('contact.photoAlt')}
            draggable={false}
            loading="lazy"
            decoding="async"
            className="pointer-events-none block aspect-square w-full object-cover object-[center_60%] md:aspect-[3/4] md:object-center"
          />
        </Window>
      </figure>
    </Draggable>
  );
};
