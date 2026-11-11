import { motion, type MotionValue, type Variants } from 'framer-motion';
import { SMOOTH_EASE } from '../../constants/animations';
import { ABOUT_PHOTO, CURRENTLY_LEARNING } from '../../constants/about';

const SLIDE_IN_RIGHT: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: SMOOTH_EASE } },
};

const SIDEBAR_REVEAL_AMOUNT = 0.2;

interface ProfileSidebarProps {
  /** Vertical offset driven by page scroll, for a subtle parallax effect. */
  parallaxY: MotionValue<number>;
}

/** Right column of the About hero: profile photo and the "Currently Learning" card. */
export const ProfileSidebar = ({ parallaxY }: ProfileSidebarProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: SIDEBAR_REVEAL_AMOUNT }}
    variants={SLIDE_IN_RIGHT}
  >
    <motion.div style={{ y: parallaxY }} className="lg:sticky lg:top-24 space-y-6">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))] hover:border-[rgb(var(--color-accent))] shadow-md transition-all duration-300"
      >
        <img src={ABOUT_PHOTO.src} alt={ABOUT_PHOTO.alt} className="w-full h-full object-cover" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-xl p-6"
      >
        <p className="text-sm font-semibold text-[rgb(var(--color-text-secondary))] mb-3">Currently Learning</p>
        <div className="space-y-2">
          {CURRENTLY_LEARNING.map((topic) => (
            <motion.div
              key={topic}
              whileHover={{ x: 5 }}
              className="px-3 py-2 bg-[rgb(var(--color-bg-secondary))] rounded-lg text-sm border border-transparent hover:border-[rgb(var(--color-accent))] transition-all duration-150"
            >
              {topic}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
);
