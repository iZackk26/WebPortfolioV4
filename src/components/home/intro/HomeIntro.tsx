import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DESK_ICONS, NOTE_ROTATION_DEG, PHOTO_ROTATION_DEG } from '../../../constants/intro';
import { DeskItem } from './DeskItem';
import { DeskPhoto } from './DeskPhoto';
import { StickyNote } from './StickyNote';
import { DeskIconTile } from './DeskIconTile';
import { IntroActions } from './IntroActions';

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
        <DeskItem className="left-[4%] top-[150px]" rotate={PHOTO_ROTATION_DEG} onDragChange={onDragChange}>
          <DeskPhoto variant="desk" />
        </DeskItem>
        <DeskItem className="right-[4%] top-[176px] w-[224px]" rotate={NOTE_ROTATION_DEG} onDragChange={onDragChange}>
          <StickyNote />
        </DeskItem>
        {DESK_ICONS.map((icon) => (
          <DeskItem key={icon.id} className={icon.position} onDragChange={onDragChange}>
            <DeskIconTile icon={icon} />
          </DeskItem>
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

      <div className="mt-6 flex flex-col items-center gap-3.5 lg:hidden">
        <div className="-rotate-3">
          <DeskPhoto variant="compact" />
        </div>
        <div className="desk-icon-row flex flex-nowrap justify-center gap-1">
          {DESK_ICONS.map((icon) => (
            <DeskIconTile key={icon.id} icon={icon} />
          ))}
        </div>
        <StickyNote className="w-[min(290px,100%)] rotate-[1.5deg]" />
      </div>

      <p className="desk-dim absolute bottom-6 left-1/2 m-0 hidden -translate-x-1/2 font-mono text-xs text-black/40 lg:block">
        {t('home.dragHint')}
      </p>
    </section>
  );
};
