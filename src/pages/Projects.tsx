import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { PageTitle } from '../components/ui/PageTitle';
import { FeaturedProjectsSection } from '../components/projects/FeaturedProjectsSection';
import { ProjectGridSectionView } from '../components/projects/ProjectGridSectionView';
import { PROJECT_GRID_SECTIONS } from '../constants/projectSections';
import { PROJECTS_SEO } from '../constants/seo';

export const Projects = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO {...PROJECTS_SEO} />
      <div className="min-h-screen pt-16">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <PageTitle title={t('projects.title')} />
            <FeaturedProjectsSection />
          </div>
        </section>

        <section className="relative py-20 -mt-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/25" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            {PROJECT_GRID_SECTIONS.map((section) => (
              <ProjectGridSectionView key={section.category} section={section} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
