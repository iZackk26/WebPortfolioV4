import { useTranslation } from 'react-i18next';
import { SYSTEMS } from '../../constants/about';
import { SectionHeading } from './SectionHeading';

/** Donde trabajo: los sistemas operativos en un dock. */
export const AboutSystems = () => {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="about-systems" className="mx-auto flex max-w-[1120px] flex-col items-center gap-3 px-4 pt-28 text-center">
      <SectionHeading id="about-systems" kicker={t('about.systems.kicker')} title={t('about.systems.title')} lede={t('about.systems.lede')} />
      <ul aria-label={t('about.systems.label')} className="project-dock m-0 mt-3.5 list-none">
        {SYSTEMS.map((system, i) =>
          system ? (
            <li key={system.label} className="about-os">
              <img src={system.icon} alt="" />
              {system.label}
            </li>
          ) : (
            <li key={`sep-${i}`} className="about-os-sep" aria-hidden="true" />
          )
        )}
      </ul>
    </section>
  );
};
