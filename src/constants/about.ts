/** Contenido estructural de la página About V5 (los textos viven en i18n about.*). */
export const ABOUT_AVATAR = '/about/avatar-160.webp';

export type JourneyKey = 'tec' | 'vadi' | 'visione' | 'growthPath';

export interface JourneyItem {
  key: JourneyKey;
  /** Logo o, si no hay, texto corto */
  logo: string | { text: string };
  current: boolean;
  /** Posición en el escritorio (lg+): x, y en px y giro */
  desk: [number, number, number];
}

export const JOURNEY: JourneyItem[] = [
  { key: 'tec', logo: { text: 'TEC' }, current: true, desk: [0, 0, -2] },
  { key: 'vadi', logo: '/about/vadi.png', current: false, desk: [440, 20, 1.5] },
  { key: 'visione', logo: '/about/visione.png', current: true, desk: [30, 250, 1] },
  { key: 'growthPath', logo: '/about/gp.png', current: true, desk: [450, 270, -1.5] },
];

export const GROWTH_PATH_INTEGRATIONS = [
  { label: 'Whoop', icon: '/about/whoop.png' },
  { label: 'Withings', icon: '/about/withings.svg' },
] as const;

/** null separa Linux del resto en el dock */
export const SYSTEMS: ({ label: string; icon: string } | null)[] = [
  { label: 'Arch', icon: '/icons/archlinux.svg' },
  { label: 'Ubuntu', icon: '/icons/ubuntu.svg' },
  { label: 'Fedora', icon: '/icons/fedora.svg' },
  null,
  { label: 'macOS', icon: '/icons/macos.svg' },
  { label: 'Windows', icon: '/icons/windows.svg' },
];

export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Isaac Ramírez Rojas',
  alternateName: 'izackk',
  url: 'https://izackk.com/about',
  image: 'https://izackk.com/about/avatar.jpg',
  jobTitle: 'Full-stack developer',
  worksFor: { '@type': 'Organization', name: 'Visione Edge' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Instituto Tecnológico de Costa Rica' },
  address: { '@type': 'PostalAddress', addressCountry: 'CR' },
  knowsAbout: ['Full-stack development', 'AI agents', 'Process automation', 'System design'],
  sameAs: ['https://www.linkedin.com/in/izack/', 'https://github.com/iZackk26'],
} as const;

export const ABOUT_KEYWORDS =
  'Isaac Ramírez Rojas, izackk, desarrollador full-stack Costa Rica, full-stack developer Costa Rica, agentes de IA, AI agents, automatización, Visione Edge, The Growth Path';
