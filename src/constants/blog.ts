import type { BlogLocale, PostKind } from '../types/blog';

/** Orden = prioridad: el primero es el idioma primario y va sin prefijo (/blog) */
export const BLOG_LOCALES: readonly BlogLocale[] = ['en', 'es'];
export const BLOG_PRIMARY_LOCALE: BlogLocale = 'en';

/** Segmento base de las rutas del blog */
export const BLOG_SEGMENT = 'blog';

/** Posts de la rejilla por página; la página 1 suma además el destacado */
export const BLOG_PAGE_SIZE = 9;
export const RELATED_POSTS = 3;

/** Origen absoluto: el prerender no tiene window.location */
export const SITE_URL = 'https://izackk.com';

/** Entidad única de la persona: todas las páginas apuntan al mismo @id */
export const PERSON_ID = `${SITE_URL}/#person`;
export const AUTHOR_NAME = 'Isaac Ramírez Rojas';
export const AUTHOR_SHORT_NAME = 'Isaac Ramírez';
export const AUTHOR_URL = `${SITE_URL}/about`;
export const AUTHOR_AVATAR = '/about/avatar-160.webp';

/** Las fechas se muestran siempre en esta zona: el prerender y el navegador coinciden */
export const BLOG_TIME_ZONE = 'America/Costa_Rica';

export const OG_LOCALE: Record<BlogLocale, string> = { en: 'en_US', es: 'es_ES' };
export const DATE_LOCALE: Record<BlogLocale, string> = { en: 'en-US', es: 'es-CR' };

export const POST_KINDS: readonly PostKind[] = ['case-study', 'guide', 'note'];

/** Enlace para compartir en LinkedIn (abre su diálogo con la URL ya puesta) */
export const LINKEDIN_SHARE_URL = 'https://www.linkedin.com/sharing/share-offsite/?url=';

/** Tiempo que se muestra "Copiado" en los botones de copiar */
export const BLOG_COPY_FEEDBACK_MS = 1600;
