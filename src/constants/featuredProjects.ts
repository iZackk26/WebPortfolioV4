import * as LQIP from './imagePlaceholders';

/** Proyectos principales del carrusel de la Home, en orden de aparición. */
export type FeaturedKind = 'main' | 'private' | 'research';
export type FeaturedRole = 'developer' | 'owner' | 'techLead';

export type FeaturedMedia =
  | {
      type: 'screen';
      src: string;
      /** Variantes 640/1080 px para que el navegador elija según el ancho */
      srcSet?: string;
      /** Versión 640 px para red lenta */
      lowSrc?: string;
      /** Miniatura incrustada (LQIP) */
      placeholder?: string;
      /** contain: muestra la imagen completa (gráficas) */
      fit?: 'cover' | 'contain';
    }
  | { type: 'phones'; front: string; back: string; frontPlaceholder?: string; backPlaceholder?: string };

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

/** Captura de pantalla con sus variantes por ancho, la liviana y su miniatura */
const screen = (name: string, placeholder: string) => ({
  type: 'screen' as const,
  src: `/featured/${name}-1080.webp`,
  srcSet: `/featured/${name}-640.webp 640w, /featured/${name}-1080.webp 1080w`,
  lowSrc: `/featured/${name}-640.webp`,
  placeholder,
});

/** Ancho de la captura en el carrusel; lo usan la <img> y la precarga */
export const SCREEN_SIZES = '(min-width: 1024px) 520px, 88vw';

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'visioneFlow',
    fileName: 'visione-flow.app',
    kind: 'main',
    role: 'developer',
    media: screen('visione-flow', LQIP.LQIP_VISIONE_FLOW),
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Prisma', 'Redis', 'Pinecone'],
    siteUrl: 'https://flow.visione-edge.com',
  },
  {
    id: 'theGrowthPath',
    fileName: 'the-growth-path.app',
    kind: 'main',
    role: 'owner',
    media: screen('the-growth-path', LQIP.LQIP_GROWTH_PATH),
    stack: ['Next.js 16', 'React 19', 'Supabase', 'Zod', 'Tailwind 4'],
    siteUrl: 'https://thegrowth-path.com',
  },
  {
    id: 'fieldAppraisals',
    fileName: 'avaluos.ipa',
    kind: 'private',
    media: { type: 'phones', front: '/featured/avaluos-inicio-320.webp', back: '/featured/avaluos-referencias-320.webp', frontPlaceholder: LQIP.LQIP_AVALUOS_INICIO, backPlaceholder: LQIP.LQIP_AVALUOS_REFERENCIAS },
    stack: ['Angular 20', 'Capacitor 8', 'Formly', 'SQLite', 'TypeScript'],
  },
  {
    id: 'agrovoltaic',
    fileName: 'agrovoltaic.py',
    kind: 'research',
    role: 'techLead',
    media: screen('agrovoltaic', LQIP.LQIP_AGROVOLTAIC),
    stack: ['Python', 'pandas', 'pvlib', 'FastAPI', 'Supabase', 'Next.js'],
  },

];

/** Ids de PROJECTS que ya aparecen en el carrusel y por eso no van en el dock */
export const FEATURED_PROJECT_IDS = new Set<string>();

export const CAROUSEL_AUTOPLAY_MS = 6000;

/** Capturas a precachear en reposo cuando la red es buena */
export const FEATURED_SCREENS = FEATURED_PROJECTS.flatMap(({ media }) =>
  media.type === 'screen' ? [{ src: media.src, srcSet: media.srcSet, sizes: SCREEN_SIZES }] : [],
);
