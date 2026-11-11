import { motion, type TargetAndTransition } from 'framer-motion';

interface ShowcaseVideosProps {
  /** Exactly three looping clips: left, center (overlapping) and right. */
  sources: readonly [string, string, string];
}

interface ShowcaseSlot {
  initial: TargetAndTransition;
  delay: number;
  className: string;
}

const SIDE_VIDEO_CLASS = 'relative w-[28%] md:w-[30%] h-full rounded-lg overflow-hidden shadow-2xl z-10';

const SHOWCASE_SLOTS: readonly [ShowcaseSlot, ShowcaseSlot, ShowcaseSlot] = [
  { initial: { opacity: 0, x: -50 }, delay: 0.2, className: SIDE_VIDEO_CLASS },
  {
    initial: { opacity: 0, y: 30 },
    delay: 0.4,
    className: 'relative w-[35%] md:w-[38%] h-full rounded-lg overflow-hidden shadow-2xl z-20 -mx-4 md:-mx-8',
  },
  { initial: { opacity: 0, x: 50 }, delay: 0.6, className: SIDE_VIDEO_CLASS },
];

/** Three autoplaying, muted clips arranged as an overlapping triptych. */
export const ShowcaseVideos = ({ sources }: ShowcaseVideosProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative flex items-center justify-center gap-4 md:gap-8 h-[300px] md:h-[400px] lg:h-[500px]"
  >
    {SHOWCASE_SLOTS.map((slot, index) => (
      <motion.div
        key={sources[index]}
        initial={slot.initial}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: slot.delay }}
        className={slot.className}
      >
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={sources[index]} type="video/mp4" />
        </video>
      </motion.div>
    ))}
  </motion.div>
);
