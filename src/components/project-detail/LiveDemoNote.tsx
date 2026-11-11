import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface LiveDemoNoteProps {
  href: string;
}

const LIVE_DEMO_TEXT_KEY = 'pura_compra_detail.live_demo_text';
const LIVE_DEMO_TEXT_FALLBACK = 'Want to see it in action? Visit the';

export const LiveDemoNote = ({ href }: LiveDemoNoteProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-center space-x-2 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-lg p-4">
        <span className="text-xl">🚀</span>
        <p className="text-sm text-[rgb(var(--color-text-secondary))]">
          {t(LIVE_DEMO_TEXT_KEY, { defaultValue: LIVE_DEMO_TEXT_FALLBACK })}{' '}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgb(var(--color-accent))] hover:underline font-semibold"
          >
            live demo
          </a>
        </p>
      </div>
    </motion.div>
  );
};
