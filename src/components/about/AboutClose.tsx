import { useTranslation } from 'react-i18next';
import { CONTACT_EMAIL } from '../../constants/contact';
import { ContactPhoto } from '../home/contact/ContactPhoto';
import { RetroButton } from '../ui/RetroButton';

/** Cierre: invitación a escribir, sin venderlo como "disponible". */
export const AboutClose = () => {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="about-close" className="mx-auto grid max-w-[860px] grid-cols-1 items-center justify-items-center gap-9 px-4 pt-28 text-center md:grid-cols-[240px_minmax(0,1fr)] md:justify-items-start md:text-left">
      <ContactPhoto className="w-[min(190px,55%)] md:w-[240px]" />
      <div>
        <h2 id="about-close" className="m-0 text-[clamp(28px,4vw,40px)] font-medium leading-[1.05] tracking-[-0.05em] text-black">
          {t('about.close.title')}
        </h2>
        <p className="m-0 mt-2.5 max-w-[44ch] text-[16.5px] text-black/60">{t('about.close.text')}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn-retro gloss aqua-fill">
            {t('about.close.send')}
          </a>
          <RetroButton to="/" variant="silver">
            {t('about.close.projects')}
          </RetroButton>
        </div>
      </div>
    </section>
  );
};
