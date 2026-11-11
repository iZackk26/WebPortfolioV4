import { useTranslation } from 'react-i18next';
import { CV_LINKS, Language } from '../../constants/navigation';
import { CONTACT_EMAIL } from '../../constants/contact';
import { RetroButton } from '../ui/RetroButton';
import { InfoCard } from './InfoCard';

/** "Hola, soy Isaac.": bio corta, CTAs y ficha de datos. */
export const AboutHero = () => {
  const { t, i18n } = useTranslation();
  const lang: Language = i18n.language === 'es' ? 'es' : 'en';

  return (
    <section aria-labelledby="about-title" className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 px-4 pt-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12 lg:pt-16">
      <div className="hero-in">
        <span className="carousel-kicker">{t('about.kicker')}</span>
        <h1 id="about-title" className="m-0 mt-1 text-[clamp(44px,7vw,76px)] font-medium leading-[0.95] tracking-[-0.055em] text-black">
          {t('about.title')}
        </h1>
        <p className="m-0 mt-5 max-w-[50ch] text-lg text-black">{t('about.bio')}</p>
        <p className="m-0 mt-2.5 max-w-[50ch] text-[16.5px] text-black/60">{t('about.bioRoles')}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <RetroButton href={CV_LINKS[lang]}>{t('about.downloadCv')}</RetroButton>
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn-retro gloss silver-fill">
            {t('about.contact')}
          </a>
        </div>
      </div>
      <InfoCard />
    </section>
  );
};
