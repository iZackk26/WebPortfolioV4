/** Mapa de píxeles 5×7 de cada letra del wordmark ('#' = tecla) */
export const GLYPHS: Record<string, readonly string[]> = {
  z: ['.....', '.....', '#####', '...#.', '..#..', '.#...', '#####'],
  a: ['.....', '.....', '.###.', '....#', '.####', '#...#', '.####'],
  c: ['.....', '.....', '.####', '#....', '#....', '#....', '.####'],
  k: ['#....', '#....', '#..#.', '#.#..', '##...', '#.#..', '#..#.'],
};

export const WORD = 'zackk';
export const GLYPH_WIDTH = 5;
export const LETTER_GAP = 1;
export const GRID_COLS = WORD.length * (GLYPH_WIDTH + LETTER_GAP) - LETTER_GAP;
export const GRID_ROWS = 7;

export const LEGENDS = ['{', '}', ';', '<', '>', '/', '=', '(', ')', '[', ']', '#', '$', '*', '&', '_'];

/** Ritmo de la ola: retraso por columna y por fila */
export const WAVE_COL_MS = 30;
export const WAVE_ROW_MS = 10;

/** Semilla fija para que el "desorden" de las teclas sea siempre el mismo */
export const WORDMARK_SEED = 7;
