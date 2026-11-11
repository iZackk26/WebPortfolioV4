import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { GROWTH_PATH_INTEGRATIONS, JourneyItem } from '../../constants/about';
import { Window } from '../ui/Window';

interface JourneyWindowProps {
  item: JourneyItem;
  index: number;
}

const ENTER_DELAY_MS = 120;

/** Una etapa del recorrido como ventana del escritorio. */
export const JourneyWindow = ({ item, index }: JourneyWindowProps) => {
  const { t } = useTranslation();
  const key = `about.journey.items.${item.key}`;
  const [x, y, rotate] = item.desk;
  const style = { '--x': `${x}px`, '--y': `${y}px`, '--r': `${rotate}deg`, '--d': `${index * ENTER_DELAY_MS}ms`, zIndex: index + 1 } as CSSProperties;

  return (
    <li className={`journey-window ${item.current ? '' : 'is-done'}`} style={style}>
      <Window title={t(`${key}.title`)}>
        <div className="flex flex-col gap-1.5 p-[14px_16px_16px] text-left">
          <div className="flex items-center gap-2.5">
            {typeof item.logo === 'string' ? (
              <img src={item.logo} alt="" className="journey-logo" />
            ) : (
              <span className="journey-logo" aria-hidden="true">{item.logo.text}</span>
            )}
            <div>
              <h3 className="m-0 text-base font-medium text-black">{t(`${key}.title`)}</h3>
              <p className="m-0 font-mono text-[11.5px] text-black/40">
                {t(`${key}.period`)}
                {!item.current && ` · ${t('about.journey.finished')}`}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="method-badge" data-actor="me">{t(`${key}.role`)}</span>
            {item.key === 'growthPath' && <span className="method-badge" data-actor="ai">{t('about.journey.ownProject')}</span>}
          </div>
          <p className="m-0 text-sm text-black/60">{t(`${key}.text`)}</p>
          {item.key === 'growthPath' && (
            <ul className="m-0 mt-1 flex list-none flex-wrap gap-2 p-0">
              {GROWTH_PATH_INTEGRATIONS.map((integration) => (
                <li key={integration.label} className="journey-chip">
                  <img src={integration.icon} alt="" />
                  {integration.label}
                </li>
              ))}
              <li className="journey-chip">✦ {t('about.journey.aiImport')}</li>
            </ul>
          )}
        </div>
      </Window>
    </li>
  );
};
