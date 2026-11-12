import { lazy } from 'react';
import { SEO } from '../components/SEO';
import { HomeIntro } from '../components/home/intro/HomeIntro';
import { ProjectCarousel } from '../components/home/carousel/ProjectCarousel';
import { SecondaryDock } from '../components/home/SecondaryDock';
import { LazySection } from '../components/ui/LazySection';
import { SectionSkeleton } from '../components/ui/SectionSkeleton';
import { useIdlePrefetch } from '../hooks/useIdlePrefetch';
import { FEATURED_SCREENS } from '../constants/featuredProjects';
import { CONTACT_PHOTO } from '../constants/contact';
import { isSlowConnection, prefetchImages } from '../utils/connection';
import { retryImport } from '../utils/retryImport';

// Lo que no se ve al entrar viaja en chunks aparte y se monta al acercarse
const loadWork = () => retryImport(() => import('../components/home/HomeWork'));
const loadContact = () => retryImport(() => import('../components/home/HomeContact'));
const HomeWork = lazy(() => loadWork().then((m) => ({ default: m.HomeWork })));
const HomeContact = lazy(() => loadContact().then((m) => ({ default: m.HomeContact })));

/** Con buena red, en reposo, deja en caché las imágenes de lo que aún no se ve */
const prefetchHdImages = async () => {
  if (!isSlowConnection()) prefetchImages([...FEATURED_SCREENS, CONTACT_PHOTO]);
};

export const Home = () => {
  useIdlePrefetch(prefetchHdImages);

  return (
    <>
      <SEO
        title="Isaac Ramírez | Computer Engineering Student & Full-Stack Developer"
        description="Isaac Ramírez - Computer Engineering student specializing in automation, digital transformation, and innovative software solutions. Expert in Full-Stack Development, AI/ML, Cloud Computing, React, TypeScript, and Python. Advanced English (B2/C1)."
        keywords="Isaac Ramírez, software developer, computer engineering, full-stack developer, react developer, typescript, python, ai ml, machine learning, cloud computing, aws, automation, digital transformation, web development, portfolio"
      />
      <HomeIntro />
      <ProjectCarousel />
      <SecondaryDock />
      <LazySection prefetch={loadWork} skeleton={<SectionSkeleton size="work" windows={2} />}>
        <HomeWork />
      </LazySection>
      <LazySection prefetch={loadContact} skeleton={<SectionSkeleton size="contact" />}>
        <HomeContact />
      </LazySection>
    </>
  );
};
