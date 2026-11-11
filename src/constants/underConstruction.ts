/** Secciones que muestran la página "en construcción" mientras se rediseñan. */
export type WipSection = 'about' | 'projects' | 'certificates';

export type BuildLineTone = 'command' | 'dim' | 'warn' | 'ok';

/** Tono de cada línea de la terminal, en orden; el texto vive en i18n wip.lines.<i> */
export const BUILD_LINE_TONES: BuildLineTone[] = ['command', 'dim', 'dim', 'warn', 'ok'];

/** Progreso que muestra la barra al terminar cada línea */
export const BUILD_PROGRESS = [22, 41, 63, 78, 86];
export const BUILD_START_PROGRESS = 8;

/** Ritmo de la animación */
export const BUILD_TIMING = {
  startDelayMs: 300,
  charMs: 28,
  lineGapMs: 380,
  reviewPauseMs: 1600,
  restartMs: 3200,
  keyPressMs: 140,
  keyHoldMs: 90,
  blinkEveryMs: 3400,
  blinkMs: 140,
} as const;

/** Teclas del teclado: 12 normales + barra espaciadora; la primera va resaltada */
export const KEYBOARD_KEYS = 13;
