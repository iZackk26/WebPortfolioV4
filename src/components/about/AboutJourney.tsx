import { useTranslation } from 'react-i18next';
import { JOURNEY } from '../../constants/about';
import { StackScatter } from '../home/stack/StackScatter';
import { StackRow } from '../home/stack/StackRow';
import { SectionHeading } from './SectionHeading';
import { JourneyWindow } from './JourneyWindow';

/** Mi recorrido: cada etapa como una ventana abierta del escritorio, con logos del stack alrededor. */
export const AboutJourney = () => {
  const { t } = useTranslation();

  return (
    <StackScatter groups={['journey']}>
      <section aria-labelledby="about-journey" className="mx-auto flex max-w-[1120px] flex-col items-center gap-3 px-4 pt-28 text-center">
        <SectionHeading id="about-journey" kicker={t('about.journey.kicker')} title={t('about.journey.title')} lede={t('about.journey.lede')} />
        <ol className="journey-desk m-0 mt-3.5 list-none p-0">
          {JOURNEY.map((item, index) => (
            <JourneyWindow key={item.key} item={item} index={index} />
          ))}
        </ol>
      </section>
      <StackRow groups={['journey']} />
    </StackScatter>
  );
};
