import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS_ROUTE } from '../../constants/projectDetails';
import type { DetailLogo, DetailNamespace } from '../../types/projectDetail';

interface DetailHeaderProps {
  namespace: DetailNamespace;
  logo?: DetailLogo;
}

/** Back link, category badge, title (optionally with a logo) and lead paragraph. */
export const DetailHeader = ({ namespace, logo }: DetailHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-gradient-to-b from-transparent to-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate(PROJECTS_ROUTE)}
          className="inline-flex items-center space-x-2 text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-accent))] transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={20} />
          <span>{t(`${namespace}.back`)}</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-block px-3 py-1 bg-[rgb(var(--color-accent))] text-white text-sm font-semibold rounded-full mb-4">
            {t(`${namespace}.category`)}
          </div>
          <h1 className={`text-5xl sm:text-6xl font-bold mb-6${logo ? ' flex items-center gap-4' : ''}`}>
            {logo && <img src={logo.src} alt={logo.alt} className={logo.className} />}
            {t(`${namespace}.title`)}
          </h1>
          <p className="text-xl text-[rgb(var(--color-text-secondary))] leading-relaxed max-w-4xl">
            {t(`${namespace}.description`)}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
