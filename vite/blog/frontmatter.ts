import { parse } from 'yaml';
import { POST_KINDS } from '../../src/constants/blog';
import type { PostKind } from '../../src/types/blog';

/** Frontmatter ya validado de un archivo .mdx */
export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  kind: PostKind;
  tags: string[];
  cover: string;
  coverAlt: string;
  takeaways: string[];
  featured: boolean;
  draft: boolean;
}

const BLOCK = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const DESCRIPTION_MAX = 160;
const TAKEAWAYS_MAX = 5;
const TAG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(Z|[+-]\d{2}:\d{2})$/;
/** Sin hora explícita: mediodía de Costa Rica, para que la fecha no cambie de día con la zona */
const DEFAULT_TIME = 'T12:00:00-06:00';

/** Separa el frontmatter del cuerpo del documento */
export const splitFrontmatter = (source: string) => {
  const match = BLOCK.exec(source);
  return match ? { raw: match[1], body: source.slice(match[0].length) } : { raw: '', body: source };
};

const fail = (file: string, message: string): never => {
  throw new Error(`[blog] ${file}: ${message}`);
};

const text = (data: Record<string, unknown>, key: string, file: string) => {
  const value = data[key];
  if (typeof value !== 'string' || !value.trim()) fail(file, `"${key}" es obligatorio y debe ser texto`);
  return (value as string).trim();
};

const isoDate = (value: unknown, key: string, file: string) => {
  const raw = value instanceof Date ? value.toISOString() : String(value ?? '');
  if (DATE_ONLY.test(raw)) return `${raw}${DEFAULT_TIME}`;
  if (!DATE_TIME.test(raw)) fail(file, `"${key}" debe ser AAAA-MM-DD o ISO 8601 con zona horaria`);
  return raw;
};

const list = (value: unknown, key: string, file: string) => {
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string' && item.trim())) {
    fail(file, `"${key}" debe ser una lista de textos`);
  }
  return (value as string[]).map((item) => item.trim());
};

/** Lee y valida el frontmatter; cualquier error corta el build con el archivo y el campo */
export const parseFrontmatter = (raw: string, file: string): Frontmatter => {
  const data = (parse(raw) ?? {}) as Record<string, unknown>;
  const description = text(data, 'description', file);
  if (description.length > DESCRIPTION_MAX) fail(file, `"description" pasa de ${DESCRIPTION_MAX} caracteres`);

  const kind = data.kind as PostKind;
  if (!POST_KINDS.includes(kind)) fail(file, `"kind" debe ser uno de: ${POST_KINDS.join(', ')}`);

  const tags = list(data.tags, 'tags', file);
  const badTag = tags.find((tag) => !TAG.test(tag));
  if (badTag) fail(file, `el tag "${badTag}" debe ir en kebab-case`);

  const takeaways = list(data.takeaways, 'takeaways', file);
  if (!takeaways.length || takeaways.length > TAKEAWAYS_MAX) fail(file, `"takeaways" lleva de 1 a ${TAKEAWAYS_MAX} puntos`);

  const cover = text(data, 'cover', file);
  if (!cover.startsWith('./')) fail(file, '"cover" debe ser una ruta relativa a la carpeta del post (./cover.webp)');

  return {
    title: text(data, 'title', file),
    description,
    date: isoDate(data.date, 'date', file),
    updated: data.updated === undefined ? undefined : isoDate(data.updated, 'updated', file),
    kind,
    tags,
    cover,
    coverAlt: text(data, 'coverAlt', file),
    takeaways,
    featured: data.featured === true,
    draft: data.draft === true,
  };
};
