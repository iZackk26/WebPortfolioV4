import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { AboutHero } from '../components/about/AboutHero';
import { AboutStory } from '../components/about/AboutStory';
import { AboutJourney } from '../components/about/AboutJourney';
import { AboutSystems } from '../components/about/AboutSystems';
import { AboutClose } from '../components/about/AboutClose';
import { ABOUT_KEYWORDS, PERSON_SCHEMA } from '../constants/about';

export const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('about.seo.title')}
        description={t('about.seo.description')}
        keywords={ABOUT_KEYWORDS}
        type="profile"
        ogImage="/about/avatar.jpg"
        structuredData={PERSON_SCHEMA}
      />
      <AboutHero />
      <AboutStory />
      <AboutJourney />
      <AboutSystems />
      <AboutClose />
    </>
  );
};
