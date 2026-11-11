import type { Variants } from 'framer-motion';

/** Soft ease-out curve shared by most reveal animations. */
export const SMOOTH_EASE = [0.25, 0.4, 0.25, 1] as const;

/** Ease with a slight overshoot, used for "pop" scale-ins. */
export const OVERSHOOT_EASE = [0.34, 1.56, 0.64, 1] as const;

interface FadeInUpOptions {
  offsetY: number;
  staggerDelay: number;
}

/**
 * Builds a fade-in-up variant set whose delay grows with the `custom` index
 * passed to the motion element.
 */
export const createFadeInUp = ({ offsetY, staggerDelay }: FadeInUpOptions): Variants => ({
  hidden: { opacity: 0, y: offsetY },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: custom * staggerDelay, ease: SMOOTH_EASE },
  }),
});

/** Fade-in-up used by page titles and section headings on Projects and Certificates. */
export const PAGE_FADE_IN_UP = createFadeInUp({ offsetY: 40, staggerDelay: 0.15 });
