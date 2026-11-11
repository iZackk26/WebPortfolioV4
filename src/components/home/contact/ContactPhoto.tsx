import { PointerEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { CONTACT_PHOTO } from '../../../constants/contact';
import { useDraggable } from '../../../hooks/useDraggable';
import { Window } from '../../ui/Window';

/** Selfie en una ventana inclinada junto al formulario; solo el mouse la arrastra, para no bloquear el scroll táctil. */
export const ContactPhoto = () => {
  const { t } = useTranslation();
  const { offset, dragging, handlers } = useDraggable();

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse') handlers.onPointerDown(e);
  };

  return (
    <figure
      className={`m-0 w-[min(190px,55%)] select-none lg:w-[300px] lg:cursor-grab ${dragging ? 'relative z-10 lg:cursor-grabbing' : ''}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px) rotate(${dragging ? 0 : CONTACT_PHOTO.rotateDeg}deg)` }}
      {...handlers}
      onPointerDown={onPointerDown}
    >
      <Window title={CONTACT_PHOTO.fileName}>
        <img
          src={CONTACT_PHOTO.src}
          alt={t('contact.photoAlt')}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="pointer-events-none block aspect-square w-full object-cover object-[center_60%] lg:aspect-[3/4] lg:object-center"
        />
      </Window>
    </figure>
  );
};
