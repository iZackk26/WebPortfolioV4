import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BarChart3 } from 'lucide-react';
import type { DetailNamespace } from '../../../types/projectDetail';
import { VideoPlayer } from '../../video-player/VideoPlayer';
import { RevealSection } from '../RevealSection';

interface ModelDemoSectionProps {
  namespace: DetailNamespace;
  video: { src: string; poster: string };
}

export const ModelDemoSection = ({ namespace, video }: ModelDemoSectionProps) => {
  const { t } = useTranslation();
  const limitation = (suffix: string) => t(`${namespace}.model_limitations.${suffix}`);

  return (
    <RevealSection>
      <h2 className="text-3xl font-bold mb-8">{t(`${namespace}.model_demo_title`)}</h2>
      <div className="mb-6">
        <VideoPlayer src={video.src} poster={video.poster} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-[rgb(var(--color-card))] border-l-4 border-[rgb(var(--color-accent))] rounded-lg p-6 space-y-4"
      >
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 size={24} className="text-[rgb(var(--color-accent))]" />
          <h3 className="text-xl font-bold">{limitation('title')}</h3>
        </div>

        <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed">{limitation('intro')}</p>

        <div className="space-y-3 pt-2">
          <div>
            <p className="text-sm font-semibold text-[rgb(var(--color-accent))] mb-1">{limitation('dataset_label')}</p>
            <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed">
              {limitation('dataset_text')}{' '}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[rgb(var(--color-accent))]/10 text-[rgb(var(--color-accent))] border border-[rgb(var(--color-accent))]/20">
                {limitation('images_count')}
              </span>
              {', '}
              {limitation('dataset_suffix')}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-[rgb(var(--color-accent))] mb-1">{limitation('potential_label')}</p>
            <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed">{limitation('potential_text')}</p>
          </div>
        </div>
      </motion.div>
    </RevealSection>
  );
};
