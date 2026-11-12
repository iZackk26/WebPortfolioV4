import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DESK_ICONS, NOTE_ROTATION_DEG, PHOTO_ROTATION_DEG } from '../../../constants/intro';
import { Draggable } from '../../ui/Draggable';
import { DeskPhoto } from './DeskPhoto';
import { StickyNote } from './StickyNote';
import { DeskIconTile } from './DeskIconTile';
import { IntroActions } from './IntroActions';
import { INTRO_MOBILE_SPOTS } from '../../../constants/mobileScatter';

/**
 * Intro tipo escritorio. En lg+ la foto, la nota y los íconos flotan y se arrastran;
 * en pantallas angostas bajan apilados debajo de los botones.
 */
export const HomeIntro = () => {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);
  const onDragChange = useCallback((dragging: boolean) => setFocused(dragging), []);

  return (
    <section
      className={`desk-scope relative mx-auto flex max-w-[1400px] flex-col items-center justify-center px-4 pb-14 pt-10 text-center lg:min-h-[560px] lg:pb-20 lg:pt-16 ${focused ? 'is-focus' : ''}`}
    >
      <div className="hidden lg:block">
        <Draggable className="desk-item desk-dim left-[4%] top-[150px]" rotate={PHOTO_ROTATION_DEG} onDragChange={onDragChange}>
          <DeskPhoto variant="desk" />
        </Draggable>
        <Draggable className="desk-item desk-dim right-[4%] top-[176px] w-[224px]" rotate={NOTE_ROTATION_DEG} onDragChange={onDragChange}>
          <StickyNote />
        </Draggable>
        {DESK_ICONS.map((icon) => (
          <Draggable key={icon.id} className={`desk-item desk-dim ${icon.position}`} onDragChange={onDragChange}>
            <DeskIconTile icon={icon} />
          </Draggable>
        ))}
      </div>

      <div className="desk-dim relative flex flex-col items-center gap-3">
        <h1 className="hero-in m-0 text-[clamp(46px,8vw,84px)] font-medium leading-[0.95] tracking-[-0.055em] text-black">
          {t('home.name')}
        </h1>
        <p className="hero-in m-0 text-balance text-lg text-black [--delay:90ms] md:text-[19px]">{t('home.role')}</p>
        <div className="hero-in [--delay:180ms]">
          <IntroActions />
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col items-center gap-3.5 lg:hidden">
        {/* Foto al centro y los íconos sueltos alrededor, como en el escritorio */}
        <div className="desk-icon-compact relative h-[230px] w-full max-w-[400px]">
          <div className="absolute left-1/2 top-[22px] -translate-x-1/2 -rotate-3">
            <DeskPhoto variant="compact" />
          </div>
          {INTRO_MOBILE_SPOTS.map(({ id, position, rotate }) => {
            const icon = DESK_ICONS.find((item) => item.id === id);
            return icon && (
              <div key={id} className={`absolute ${position}`} style={{ rotate: `${rotate}deg` }}>
                <DeskIconTile icon={icon} />
              </div>
            );
          })}
        </div>
        <StickyNote className="w-[min(290px,100%)] rotate-[1.5deg]" />
      </div>

      <p className="desk-dim absolute bottom-6 left-1/2 m-0 hidden -translate-x-1/2 font-mono text-xs text-black/40 lg:block">
        {t('home.dragHint')}
      </p>
    </section>
  );
};
