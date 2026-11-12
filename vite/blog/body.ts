import GithubSlugger from 'github-slugger';
import type { PostHeading } from '../../src/types/blog';

const WORDS_PER_MINUTE = 220;
const FENCE = /^\s*(```|~~~)/;
const HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/;
const ESM_LINE = /^\s*(import|export)\s/;

/** Texto plano de un encabezado markdown, igual al que ve rehype-slug */
const plain = (markdown: string) =>
  markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .trim();

/** Líneas de prosa: sin bloques de código, imports/exports ni etiquetas JSX sueltas */
const proseLines = (body: string) => {
  const lines: string[] = [];
  let inFence = false;
  for (const line of body.split(/\r?\n/)) {
    if (FENCE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (!inFence && !ESM_LINE.test(line)) lines.push(line);
  }
  return lines;
};

/**
 * H2 del documento con el mismo id que les pone rehype-slug. El slugger cuenta todos
 * los niveles en orden (los duplicados reciben -1, -2…), por eso recorre todos.
 */
export const extractHeadings = (body: string): PostHeading[] => {
  const slugger = new GithubSlugger();
  const headings: PostHeading[] = [];
  for (const line of proseLines(body)) {
    const match = HEADING.exec(line);
    if (!match) continue;
    const text = plain(match[2]);
    const id = slugger.slug(text);
    if (match[1].length === 2) headings.push({ id, text });
  }
  return headings;
};

/** Palabras y minutos de lectura (mínimo 1) */
export const readingStats = (body: string) => {
  const prose = proseLines(body)
    .join(' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`|[\]()-]/g, ' ');
  const words = prose.split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)) };
};
