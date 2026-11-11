import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { DetailNamespace } from '../../../types/projectDetail';
import { RevealSection } from '../RevealSection';
import { ImagesCard, SearchCard, StatusCard } from './AutomationFeatureCards';
import { CommentsCard, MobileAppCard, ResponsiveCard } from './AutomationCompactCards';

interface AutomationBentoProps {
  namespace: DetailNamespace;
}

export const AutomationBento = ({ namespace }: AutomationBentoProps) => {
  const { t } = useTranslation();
  const text = (suffix: string) => t(`${namespace}.automation_${suffix}`);

  return (
    <RevealSection className="mb-20">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[rgb(var(--color-text))] via-[rgb(var(--color-accent))] to-[rgb(var(--color-text))] bg-clip-text text-transparent">
            {text('title')}
          </h2>
        </motion.div>
        <p className="text-lg text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto">{text('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-auto">
        <SearchCard title={text('search_title')} description={text('search_desc')} />
        <StatusCard title={text('status_title')} description={text('status_desc')} />
        <ImagesCard title={text('images_title')} description={text('images_desc')} />
        <CommentsCard title={text('comments_title')} description={text('comments_desc')} />
        <MobileAppCard title={text('mobile_title')} description={text('mobile_desc')} />
        <ResponsiveCard title={text('responsive_title')} description={text('responsive_desc')} />
      </div>
    </RevealSection>
  );
};
