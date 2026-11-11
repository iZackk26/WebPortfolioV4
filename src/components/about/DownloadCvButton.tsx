import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { CV_DOWNLOAD_FILE_NAMES } from '../../constants/about';
import { CV_LINKS, type Language } from '../../constants/navigation';
import { usePeriodicFlag } from '../../hooks/usePeriodicFlag';
import { downloadFile } from '../../utils/downloadFile';
import { TronTrail } from './TronTrail';

const TRAIL_INTERVAL_MS = 4000;
const TRAIL_VISIBLE_MS = 3000;

export const DownloadCvButton = () => {
  const { t, i18n } = useTranslation();
  const showTrail = usePeriodicFlag(TRAIL_INTERVAL_MS, TRAIL_VISIBLE_MS);

  const handleDownload = () => {
    const language: Language = i18n.language === 'es' ? 'es' : 'en';
    downloadFile(CV_LINKS[language], CV_DOWNLOAD_FILE_NAMES[language]);
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDownload}
      className="relative inline-flex items-center space-x-2 px-6 py-3 bg-[rgb(var(--color-accent))] text-white rounded-xl font-semibold hover:bg-[rgb(var(--color-accent-hover))] transition-all duration-200 shadow-lg shadow-[rgb(var(--color-accent))]/20"
      style={{ overflow: 'visible' }}
    >
      <Download size={20} />
      <span>{t('about.downloadCV')}</span>
      {showTrail && <TronTrail />}
    </motion.button>
  );
};
