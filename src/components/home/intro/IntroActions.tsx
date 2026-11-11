import { useTranslation } from 'react-i18next';
import { CV_LINKS, Language } from '../../../constants/navigation';
import { FEATURED_SECTION_ID } from '../../../constants/intro';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { RetroButton } from '../../ui/RetroButton';

/** "Ver proyectos" baja al carrusel; "Descargar CV" abre el CV en el idioma actual. */
export const IntroActions = () => {
  const { t, i18n } = useTranslation();
  const reducedMotion = usePrefersReducedMotion();
  const lang: Language = i18n.language === 'es' ? 'es' : 'en';

  const scrollToProjects = () => {
    document
      .getElementById(FEATURED_SECTION_ID)
      ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-3">
      <button type="button" onClick={scrollToProjects} className="btn-retro gloss aqua-fill">
        {t('home.viewProjects')} ↓
      </button>
      <RetroButton variant="silver" href={CV_LINKS[lang]}>
        {t('home.downloadCv')}
      </RetroButton>
    </div>
  );
};
