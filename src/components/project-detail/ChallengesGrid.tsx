import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';
import { useTranslatedList } from '../../hooks/useTranslatedList';
import type { DetailNamespace } from '../../types/projectDetail';
import { isChallenge } from '../../utils/translationGuards';
import { RevealSection } from './RevealSection';

interface ChallengesGridProps {
  namespace: DetailNamespace;
  /** Icon for each challenge, matched by position with `<namespace>.challenges`. */
  icons: readonly LucideIcon[];
}

const CHALLENGE_STAGGER_DELAY = 0.1;

export const ChallengesGrid = ({ namespace, icons }: ChallengesGridProps) => {
  const { t } = useTranslation();
  const challenges = useTranslatedList(`${namespace}.challenges`, isChallenge);

  return (
    <RevealSection className="mb-20">
      <h2 className="text-3xl font-bold mb-8">{t(`${namespace}.challenges_title`)}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {challenges.map((challenge, index) => {
          const ChallengeIcon = icons[index];
          return (
            <motion.div
              key={challenge.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * CHALLENGE_STAGGER_DELAY }}
              whileHover={{ y: -8 }}
              className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-xl p-6 hover:border-[rgb(var(--color-accent))] transition-all duration-300"
            >
              {ChallengeIcon && <ChallengeIcon size={40} className="text-[rgb(var(--color-accent))] mb-4" />}
              <h3 className="text-xl font-bold mb-3">{challenge.title}</h3>
              <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed">
                {challenge.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </RevealSection>
  );
};
