/** Proyectos principales del carrusel de la Home, en orden de aparición. */
export type FeaturedKind = 'main' | 'private' | 'research';
export type FeaturedRole = 'developer' | 'owner' | 'techLead';

export type FeaturedMedia =
  | { type: 'screen'; src: string; /** contain: muestra la imagen completa (gráficas) */ fit?: 'cover' | 'contain' }
  | { type: 'phones'; front: string; back: string };

export interface FeaturedProject {
  /** Clave en i18n: featured.items.<id> */
  id: string;
  /** Nombre de archivo de la barra de la ventana */
  fileName: string;
  kind: FeaturedKind;
  role?: FeaturedRole;
  media: FeaturedMedia;
  stack: string[];
  siteUrl?: string;
  caseRoute?: string;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'visioneFlow',
    fileName: 'visione-flow.app',
    kind: 'main',
    role: 'developer',
    media: { type: 'screen', src: '/featured/visione-flow.jpg' },
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Prisma', 'Redis', 'Pinecone'],
    siteUrl: 'https://flow.visione-edge.com',
  },
  {
    id: 'theGrowthPath',
    fileName: 'the-growth-path.app',
    kind: 'main',
    role: 'owner',
    media: { type: 'screen', src: '/featured/the-growth-path.jpg' },
    stack: ['Next.js 16', 'React 19', 'Supabase', 'Zod', 'Tailwind 4'],
    siteUrl: 'https://thegrowth-path.com',
  },
  {
    id: 'fieldAppraisals',
    fileName: 'avaluos.ipa',
    kind: 'private',
    media: { type: 'phones', front: '/featured/avaluos-inicio.jpg', back: '/featured/avaluos-referencias.jpg' },
    stack: ['Angular 20', 'Capacitor 8', 'Formly', 'SQLite', 'TypeScript'],
  },
  {
    id: 'agrovoltaic',
    fileName: 'agrovoltaic.py',
    kind: 'research',
    role: 'techLead',
    media: { type: 'screen', src: '/featured/agrovoltaic.jpg' },
    stack: ['Python', 'pandas', 'pvlib', 'FastAPI', 'Supabase', 'Next.js'],
  },

];

/** Ids de PROJECTS que ya aparecen en el carrusel y por eso no van en el dock */
export const FEATURED_PROJECT_IDS = new Set<string>();

export const CAROUSEL_AUTOPLAY_MS = 6000;
