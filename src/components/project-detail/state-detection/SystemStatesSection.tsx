import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Box, CheckCircle, Layers, ShoppingCart } from 'lucide-react';
import { useTranslatedList } from '../../../hooks/useTranslatedList';
import type { DetailNamespace } from '../../../types/projectDetail';
import { isSystemState } from '../../../utils/translationGuards';
import { RevealSection } from '../RevealSection';

/** Icon for each state, matched by position with `<namespace>.states`. */
const STATE_ICONS = [Box, ShoppingCart, Layers, CheckCircle] as const;
const STATE_STAGGER_DELAY = 0.1;

interface SystemStatesSectionProps {
  namespace: DetailNamespace;
}

export const SystemStatesSection = ({ namespace }: SystemStatesSectionProps) => {
  const { t } = useTranslation();
  const states = useTranslatedList(`${namespace}.states`, isSystemState);

  return (
    <RevealSection className="mb-20">
      <h2 className="text-3xl font-bold mb-6">{t(`${namespace}.system_states_title`)}</h2>

      <div className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-xl p-6 mb-8">
        <p className="text-[rgb(var(--color-text-secondary))] leading-relaxed">{t(`${namespace}.system_states_intro`)}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {states.map((state, index) => {
          const StateIcon = STATE_ICONS[index];
          return (
            <motion.div
              key={state.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * STATE_STAGGER_DELAY }}
              whileHover={{ scale: 1.02 }}
              className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-lg p-5 hover:border-[rgb(var(--color-accent))] transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {StateIcon && <StateIcon size={28} className="text-[rgb(var(--color-accent))]" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{state.name}</h3>
                  <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed">{state.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-[rgb(var(--color-accent))]/10 to-transparent border-l-4 border-[rgb(var(--color-accent))] rounded-lg p-6"
      >
        <p className="text-[rgb(var(--color-text-secondary))] leading-relaxed">{t(`${namespace}.process_explanation`)}</p>
      </motion.div>
    </RevealSection>
  );
};
