/** Medidas y tiempos del navbar pill (deben coincidir con styles/navbar*.css). */
export const NAV_GEOMETRY = {
  /** Diámetro del círculo compacto */
  compactPx: 56,
  /** Ancho del compacto: tu foto + la burbuja de Max (56 + 10 de separación + 56) */
  compactWidthPx: 122,
  /** Padding horizontal del pill completo (6px izquierda + 8px derecha) */
  pillPaddingPx: 14,
  gutterMobilePx: 16,
  gutterDesktopPx: 24,
} as const;

export const NAV_TIMING = {
  /** Scroll a partir del cual el navbar pasa a compacto */
  scrollThresholdPx: 100,
  /** Espera antes de cerrar al sacar el mouse */
  hoverCloseDelayMs: 400,
  /** Compacto → barra: lo que tardan los círculos en fundirse en un pill antes de expandirse */
  mergeMs: 320,
  /** Desplazamiento que cierra el menú abierto */
  closeOnScrollPx: 24,
} as const;

export const DESKTOP_QUERY = '(min-width: 768px)';
