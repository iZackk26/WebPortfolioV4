/** Filtro SVG que deforma lo que hay detrás del vidrio (Chromium). Otros navegadores usan el blur de respaldo. */
export const LiquidGlassFilter = () => (
  <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
    <filter id="liquid-glass" x="-10%" y="-30%" width="120%" height="160%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.006 0.04" numOctaves={2} seed={4} result="noise" />
      <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
      <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="22" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
);
