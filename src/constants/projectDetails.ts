import type { DetailLogo } from '../types/projectDetail';

export const PROJECTS_ROUTE = '/projects';

export const APPRAISAL_DETAIL = {
  namespace: 'appraisal_detail',
  heroImage: '/app-design02.webp',
  privacyNoteKey: 'projects.items.appraisal.privacyNote',
} as const;

export const FACE_ANTI_SPOOFING_DETAIL = {
  namespace: 'face_antispoofing_detail',
  heroImage: '/face-Spoofing.jpeg',
} as const;

const IFIXIT_LOGO: DetailLogo = {
  src: '/ifixit/ifixit-logo.png',
  alt: 'iFixIt Logo',
  className: 'w-12 h-12 sm:w-16 sm:h-16 object-contain',
};

export const IFIXIT_DETAIL = {
  namespace: 'ifixit_detail',
  heroImage: '/ifixit/iFix-Preview.png',
  liveDemoUrl: 'https://i-fix-it.vercel.app/',
  logo: IFIXIT_LOGO,
} as const;

const PURA_COMPRA_LOGO: DetailLogo = {
  src: '/puracompra.png',
  alt: 'Pura Compra Logo',
  className: 'h-12 sm:h-16 w-auto object-contain',
};

export const PURA_COMPRA_DETAIL = {
  namespace: 'pura_compra_detail',
  heroImage: '/puraCompra/PC-Products.png',
  liveDemoUrl: 'https://pura-compra.vercel.app/',
  logo: PURA_COMPRA_LOGO,
} as const;

export const STATE_DETECTION_DETAIL = {
  namespace: 'project_detail',
  showcaseVideos: ['/vids/Detection01.mp4', '/vids/Detection02.mp4', '/vids/Detection03.mp4'],
  demoVideo: { src: '/vids/Comp-Models.mp4', poster: '/detection-preview.webp' },
} as const;

export const VECTOR_DB_DETAIL = {
  namespace: 'crps_detail',
  heroImage: '/Embedding.png',
  demoVideo: { src: '/vids/Demostration-CRPS.mp4', poster: '/Embedding.png' },
} as const;
