import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { INTERESTS } from '../../constants/about';

const MARQUEE_SPEED = 40;

export const InterestsMarquee = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.8 }}
    className="mb-20"
  >
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <h2 className="text-3xl font-bold mb-2">Areas of Interest</h2>
      <p className="text-[rgb(var(--color-text-secondary))]">What drives my passion for technology</p>
    </motion.div>

    <Marquee gradient={false} speed={MARQUEE_SPEED} className="py-4">
      {INTERESTS.map((interest) => (
        <motion.div
          key={interest.text}
          whileHover={{ scale: 1.1, y: -5 }}
          className="mx-6 flex items-center space-x-3 px-6 py-3 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-xl hover:border-[rgb(var(--color-accent))] transition-colors duration-150"
        >
          <interest.icon size={20} className="text-[rgb(var(--color-accent))]" />
          <span className="text-sm font-medium whitespace-nowrap">{interest.text}</span>
        </motion.div>
      ))}
    </Marquee>
  </motion.div>
);
