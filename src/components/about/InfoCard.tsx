import { useTranslation } from 'react-i18next';
import { ABOUT_AVATAR } from '../../constants/about';
import { isString, toValidList } from '../../utils/translationGuards';
import { MouseDraggable } from '../ui/MouseDraggable';
import { Window } from '../ui/Window';

const FACTS = ['role', 'project', 'studies', 'location', 'languages'] as const;

/** Ficha tipo "Obtener información" de macOS con los datos clave. */
export const InfoCard = () => {
  const { t } = useTranslation();
  const focus = toValidList(t('about.info.focusValues', { returnObjects: true }), isString);

  return (
    <MouseDraggable rotate={1.5} className="w-full max-w-[400px] justify-self-center">
      <Window title={t('about.info.window')}>
        <div className="flex items-center gap-3.5 border-b border-black/10 p-[16px_18px]">
          <img src={ABOUT_AVATAR} alt="" width={64} height={64} draggable={false} className="h-16 w-16 rounded-[14px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.12)]" />
          <div>
            <p className="m-0 text-[17px] font-medium text-black">Isaac Ramírez</p>
            <p className="m-0 font-mono text-xs text-black/40">izackk · v5</p>
          </div>
        </div>
        <dl className="m-0 grid grid-cols-[96px_1fr] gap-x-3 gap-y-2 p-[10px_18px_16px] text-left text-sm">
          {FACTS.map((fact) => (
            <div key={fact} className="contents">
              <dt className="text-right font-mono text-[12.5px] leading-[1.7] text-black/40">{t(`about.info.${fact}`)}</dt>
              <dd className="m-0 text-black">{t(`about.info.${fact}Value`)}</dd>
            </div>
          ))}
          <dt className="text-right font-mono text-[12.5px] leading-[1.7] text-black/40">{t('about.info.focus')}</dt>
          <dd className="m-0 flex flex-wrap gap-1.5">
            {focus.map((item) => (
              <span key={item} className="method-badge" data-actor="me">
                {item}
              </span>
            ))}
          </dd>
        </dl>
      </Window>
    </MouseDraggable>
  );
};
