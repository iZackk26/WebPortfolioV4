#!/usr/bin/env node
/**
 * Valida todos los idiomas de src/i18n/locales contra el de respaldo (en): mismas
 * secciones y claves, mismos largos de arrays, mismos placeholders {{x}} y un meta.json
 * completo. Corre en el build: un idioma a medias no llega a producción.
 * Uso: npm run check:locales
 */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('../src/i18n/locales', import.meta.url));
const DEFAULT_LANGUAGE = 'en';
const META_FIELDS = ['label', 'short', 'order', 'ogLocale', 'cv'];

const read = (lang, file) => JSON.parse(readFileSync(join(ROOT, lang, file), 'utf8'));
const placeholders = (text) => (text.match(/{{\s*\w+\s*}}/g) ?? []).sort().join(',');
const problems = [];

const compare = (base, other, at) => {
  if (Array.isArray(base)) {
    if (!Array.isArray(other) || base.length !== other.length) return problems.push(`${at}: el array no tiene ${base.length} elementos`);
    return base.forEach((item, i) => compare(item, other[i], `${at}[${i}]`));
  }
  if (base && typeof base === 'object') {
    for (const key of Object.keys(base)) {
      if (!other || !(key in other)) problems.push(`${at}.${key}: falta`);
      else compare(base[key], other[key], `${at}.${key}`);
    }
    for (const key of Object.keys(other ?? {})) if (!(key in base)) problems.push(`${at}.${key}: sobra`);
    return;
  }
  if (typeof base === 'string') {
    if (typeof other !== 'string') return problems.push(`${at}: debería ser texto`);
    if (placeholders(base) !== placeholders(other)) problems.push(`${at}: placeholders ${placeholders(base) || '—'} ≠ ${placeholders(other) || '—'}`);
  }
};

const languages = readdirSync(ROOT, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
const sections = readdirSync(join(ROOT, DEFAULT_LANGUAGE)).filter((f) => f.endsWith('.json') && f !== 'meta.json');

for (const lang of languages) {
  const files = new Set(readdirSync(join(ROOT, lang)));
  if (!files.has('meta.json')) problems.push(`${lang}/meta.json: falta`);
  else {
    const meta = read(lang, 'meta.json');
    for (const field of META_FIELDS) if (meta[field] === undefined) problems.push(`${lang}/meta.json: falta "${field}"`);
  }
  if (lang === DEFAULT_LANGUAGE) continue;
  for (const file of sections) {
    if (!files.has(file)) problems.push(`${lang}/${file}: falta el archivo`);
    else compare(read(DEFAULT_LANGUAGE, file), read(lang, file), `${lang}/${file}`);
  }
  for (const file of files) if (file !== 'meta.json' && !sections.includes(file)) problems.push(`${lang}/${file}: no existe en ${DEFAULT_LANGUAGE}`);
}

if (problems.length) {
  console.error(`Idiomas con problemas (${problems.length}):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`Idiomas OK: ${languages.join(', ')} (${sections.length} secciones)`);
