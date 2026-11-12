import { lazy, type LazyExoticComponent } from 'react';
import type { MDXContent } from 'mdx/types';
import type { BlogLocale } from '../types/blog';

type BodyModule = { default: MDXContent };

/** Cada post es su propio chunk: solo se descarga el que se está leyendo */
const loaders = import.meta.glob<BodyModule>('/content/blog/*/*.mdx');

const keyOf = (slug: string, locale: BlogLocale) => `/content/blog/${slug}/${locale}.mdx`;

/** Carga el cuerpo MDX de un post; falla si ese idioma no existe */
export const loadPostBody = (slug: string, locale: BlogLocale) => {
  const load = loaders[keyOf(slug, locale)];
  if (!load) return Promise.reject(new Error(`No existe el post ${slug} (${locale})`));
  return load();
};

const components = new Map<string, LazyExoticComponent<MDXContent>>();

/** Componente lazy del cuerpo, uno por post e idioma (estable entre renders) */
export const postBodyComponent = (slug: string, locale: BlogLocale) => {
  const key = keyOf(slug, locale);
  let component = components.get(key);
  if (!component) {
    component = lazy(() => loadPostBody(slug, locale));
    components.set(key, component);
  }
  return component;
};
