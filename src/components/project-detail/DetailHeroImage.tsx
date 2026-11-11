import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DetailHeroImageProps {
  src: string;
  alt: string;
}

export const DetailHeroImage = ({ src, alt }: DetailHeroImageProps) => (
  <div className="aspect-video max-w-4xl mx-auto bg-[rgb(var(--color-card))] border-2 border-[rgb(var(--color-border))] rounded-2xl overflow-hidden">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

interface DetailMediaRevealProps {
  children: ReactNode;
}

/** Fades the media band in shortly after the header animation. */
export const DetailMediaReveal = ({ children }: DetailMediaRevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="space-y-4"
  >
    {children}
  </motion.div>
);
