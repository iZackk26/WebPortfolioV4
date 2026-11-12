export interface NavItem {
  path: string;
  labelKey: string;
  /** El link del blog va a la versión del idioma actual y se oculta mientras no haya posts */
  blog?: true;
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/projects', labelKey: 'nav.projects' },
  { path: '/blog', labelKey: 'nav.blog', blog: true },
  { path: '/certificates', labelKey: 'nav.certificates' },
];

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/izack/' },
  { label: 'GitHub', href: 'https://github.com/iZackk26' },
  { label: 'Instagram', href: 'https://www.instagram.com/izackk_r/' },
] as const;

export const GITHUB_URL = SOCIAL_LINKS[1].href;

/** CVs publicados (el footer lista ambos); cada idioma elige el suyo en su meta.json */
export const CV_LINKS = {
  es: '/cv-es.pdf',
  en: '/cv-en.pdf',
} as const;

export const AVATAR = {
  webp: '/icon.webp',
  fallback: '/icon.jpeg',
} as const;

export const LANGUAGE_STORAGE_KEY = 'language';
