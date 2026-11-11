import { CSSProperties, useMemo } from 'react';
import {
  GLYPHS, WORD, GLYPH_WIDTH, LETTER_GAP, GRID_COLS, GRID_ROWS,
  LEGENDS, WAVE_COL_MS, WAVE_ROW_MS, WORDMARK_SEED,
} from '../../constants/wordmark';
import { createSeededRandom } from '../../utils/seededRandom';

interface Key {
  id: string;
  legend: string;
  style: CSSProperties;
}

/** Convierte el mapa de píxeles en teclas con posición, leve desorden y retraso de la ola. */
const buildKeys = (): Key[] => {
  const rnd = createSeededRandom(WORDMARK_SEED);
  const jitter = (range: number) => ((rnd() - 0.5) * range).toFixed(1);
  const keys: Key[] = [];

  [...WORD].forEach((char, letterIndex) => {
    GLYPHS[char].forEach((row, r) => {
      [...row].forEach((cell, c) => {
        if (cell !== '#') return;
        const col = letterIndex * (GLYPH_WIDTH + LETTER_GAP) + c;
        keys.push({
          id: `${letterIndex}-${r}-${c}`,
          legend: LEGENDS[Math.floor(rnd() * LEGENDS.length)],
          style: {
            left: `${(col / GRID_COLS) * 100}%`,
            top: `${(r / GRID_ROWS) * 100}%`,
            ['--jx' as string]: `${jitter(3)}px`,
            ['--jy' as string]: `${jitter(3)}px`,
            ['--jr' as string]: `${jitter(5)}deg`,
            ['--wave' as string]: `${col * WAVE_COL_MS + r * WAVE_ROW_MS}ms`,
          },
        });
      });
    });
  });

  return keys;
};

interface WordmarkProps {
  playing: boolean;
}

export const Wordmark = ({ playing }: WordmarkProps) => {
  const keys = useMemo(buildKeys, []);

  return (
    <div role="img" aria-label={WORD} className={`wordmark ${playing ? 'is-playing' : 'is-waiting'}`}>
      {keys.map((key) => (
        <span key={key.id} className="keycap" data-legend={key.legend} style={key.style} aria-hidden="true" />
      ))}
    </div>
  );
};
