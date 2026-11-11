import { useEffect, useState } from 'react';
import { BUILD_TIMING, KEYBOARD_KEYS } from '../../constants/underConstruction';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface ClawdTypingProps {
  typing: boolean;
}

const SPACEBAR_INDEX = KEYBOARD_KEYS - 1;

/** El Claude pixel del escritorio, detrás de un teclado retro, tecleando mientras se construye. */
export const ClawdTyping = ({ typing }: ClawdTypingProps) => {
  const reducedMotion = usePrefersReducedMotion();
  const [pressed, setPressed] = useState<number | null>(null);
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (!typing || reducedMotion) return;
    const timer = setInterval(() => {
      setPressed(Math.floor(Math.random() * KEYBOARD_KEYS));
      setTimeout(() => setPressed(null), BUILD_TIMING.keyHoldMs);
    }, BUILD_TIMING.keyPressMs);
    return () => clearInterval(timer);
  }, [typing, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), BUILD_TIMING.blinkMs);
    }, BUILD_TIMING.blinkEveryMs);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div className="wip-stage" aria-hidden="true">
      <svg className={`wip-clawd ${typing ? '' : 'is-idle'} ${blinking ? 'is-blinking' : ''}`} viewBox="-1.5 -1.5 29 23">
        <defs>
          <filter id="wip-sticker" x="-10%" y="-10%" width="120%" height="120%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="0.9" result="dilated" />
            <feFlood floodColor="#fff" />
            <feComposite in2="dilated" operator="in" result="outline" />
            <feMerge>
              <feMergeNode in="outline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="wip-body" filter="url(#wip-sticker)">
          <rect x="3" y="0" width="20" height="14" />
          <g className="wip-arm-l"><rect x="0" y="5" width="3" height="4" /></g>
          <g className="wip-arm-r"><rect x="23" y="5" width="3" height="4" /></g>
          <rect x="5" y="14" width="2" height="5" />
          <rect x="9" y="14" width="2" height="5" />
          <rect x="15" y="14" width="2" height="5" />
          <rect x="19" y="14" width="2" height="5" />
          <g className="wip-eyes-open">
            <path d="M7 5.3l2.2 1.2L7 7.7" />
            <path d="M19 5.3l-2.2 1.2L19 7.7" />
          </g>
          <g className="wip-eyes-blink">
            <path d="M6.8 6.5h2.4" />
            <path d="M16.8 6.5h2.4" />
          </g>
        </g>
      </svg>
      <div className="wip-keyboard">
        {Array.from({ length: KEYBOARD_KEYS }, (_, i) => (
          <span
            key={i}
            className="wip-key"
            data-pressed={pressed === i}
            data-accent={i === 0}
            data-wide={i === SPACEBAR_INDEX}
          />
        ))}
      </div>
    </div>
  );
};
