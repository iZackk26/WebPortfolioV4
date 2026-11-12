/** Idiomas en los que existe el blog (el primero es el primario, sin prefijo en la URL) */
export type BlogLocale = 'en' | 'es';

/** Tipo de artículo: define el kicker y el tono del post */
export type PostKind = 'case-study' | 'guide' | 'note';

export interface PostHeading {
  /** id que rehype-slug le pone al H2 (mismo algoritmo: github-slugger) */
  id: string;
  text: string;
}

/** Metadatos de un post en un idioma; los genera el plugin de Vite desde el frontmatter */
export interface PostMeta {
  slug: string;
  locale: BlogLocale;
  title: string;
  description: string;
  /** ISO 8601 con zona horaria */
  date: string;
  updated?: string;
  kind: PostKind;
  tags: string[];
  /** URL final de la portada (Vite le pone hash) */
  cover: string;
  coverAlt: string;
  takeaways: string[];
  featured: boolean;
  words: number;
  minutes: number;
  headings: PostHeading[];
}

/** Post tal como se lista en un idioma: si no tiene traducción, se muestra la del primario */
export interface BlogListItem extends PostMeta {
  /** true cuando el post se lista en un idioma que no tiene su traducción */
  fallback: boolean;
}

export interface BlogPage {
  page: number;
  totalPages: number;
  totalPosts: number;
  featured?: BlogListItem;
  items: BlogListItem[];
}

/** Qué ruta del blog es una URL */
export type BlogRoute =
  | { kind: 'index'; locale: BlogLocale; page: number }
  | { kind: 'post'; locale: BlogLocale; slug: string };

export interface HeadAlternate {
  hrefLang: string;
  href: string;
}

/** Todo el <head> de una página del blog; lo usan el prerender y el cliente */
export interface HeadData {
  lang: BlogLocale;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType: 'website' | 'article';
  ogLocale: string;
  image: string;
  imageAlt: string;
  alternates: HeadAlternate[];
  feed: { title: string; href: string };
  jsonLd: Record<string, unknown>;
  article?: { published: string; modified: string; tags: string[] };
}
