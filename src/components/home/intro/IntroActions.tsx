import { useTranslation } from 'react-i18next';
import { useLocaleMeta } from '../../../hooks/useLocaleMeta';
import { FEATURED_SECTION_ID } from '../../../constants/intro';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { AeroButton } from '../../ui/AeroButton';

/** "Ver proyectos" baja al carrusel; "Descargar CV" abre el CV en el idioma actual. */
export const IntroActions = () => {
  const { t } = useTranslation();
  const reducedMotion = usePrefersReducedMotion();
  const { cv } = useLocaleMeta();

  const scrollToProjects = () => {
    document
      .getElementById(FEATURED_SECTION_ID)
      ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-3">
      <AeroButton onClick={scrollToProjects}>{t('home.viewProjects')} ↓</AeroButton>
      <AeroButton tone="silver" href={cv}>
        {t('home.downloadCv')}
      </AeroButton>
    </div>
  );
};
