import { motion } from 'framer-motion';

interface TrailLayer {
  strokeWidth: number;
  opacity: number;
  blurPx?: number;
}

/** Stacked strokes from a wide faint glow to a sharp core, producing a neon light trail. */
const TRAIL_LAYERS: TrailLayer[] = [
  { strokeWidth: 8, opacity: 0.15, blurPx: 12 },
  { strokeWidth: 5, opacity: 0.3, blurPx: 6 },
  { strokeWidth: 3, opacity: 0.6, blurPx: 3 },
  { strokeWidth: 2, opacity: 0.95 },
];

const TRAIL_GRADIENT_ID = 'trailGradient';
const TRAIL_DURATION_SECONDS = 3.5;
const TRAIL_DASH_LENGTH = 80;
const TRAIL_DASH_GAP = 1000;
const TRAIL_OUTSET_PX = 15;

/** Light streak that runs once around its positioned parent's border. */
export const TronTrail = () => (
  <svg
    className="absolute pointer-events-none"
    style={{
      left: `-${TRAIL_OUTSET_PX}px`,
      top: `-${TRAIL_OUTSET_PX}px`,
      width: `calc(100% + ${TRAIL_OUTSET_PX * 2}px)`,
      height: `calc(100% + ${TRAIL_OUTSET_PX * 2}px)`,
      overflow: 'visible',
    }}
  >
    <defs>
      <linearGradient id={TRAIL_GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
        <stop offset="50%" stopColor="rgba(255, 255, 255, 0.9)" />
        <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
      </linearGradient>
    </defs>
    {TRAIL_LAYERS.map((layer) => (
      <motion.rect
        key={layer.strokeWidth}
        x={TRAIL_OUTSET_PX}
        y={TRAIL_OUTSET_PX}
        width={`calc(100% - ${TRAIL_OUTSET_PX * 2}px)`}
        height={`calc(100% - ${TRAIL_OUTSET_PX * 2}px)`}
        rx="12"
        ry="12"
        fill="none"
        stroke={`url(#${TRAIL_GRADIENT_ID})`}
        strokeWidth={layer.strokeWidth}
        strokeDasharray={`${TRAIL_DASH_LENGTH} ${TRAIL_DASH_GAP}`}
        opacity={layer.opacity}
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -(TRAIL_DASH_LENGTH + TRAIL_DASH_GAP) }}
        transition={{ duration: TRAIL_DURATION_SECONDS, ease: 'linear' }}
        style={layer.blurPx ? { filter: `blur(${layer.blurPx}px)` } : undefined}
      />
    ))}
  </svg>
);
