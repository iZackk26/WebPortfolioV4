import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { PageTitle } from '../components/ui/PageTitle';
import { CloudExperienceSection } from '../components/certificates/CloudExperienceSection';
import { CertificationsSection } from '../components/certificates/CertificationsSection';
import { OperatingSystemsSection } from '../components/certificates/OperatingSystemsSection';
import { CERTIFICATES_SEO } from '../constants/seo';

export const Certificates = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO {...CERTIFICATES_SEO} />
      <div className="min-h-screen pt-16">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <PageTitle title={t('certificates.title')} />
            <CloudExperienceSection />
            <CertificationsSection />
            <OperatingSystemsSection />
          </div>
        </section>
      </div>
    </>
  );
};
