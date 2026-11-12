import { LQIP_SELFIE } from './imagePlaceholders';

/** Datos del cierre de contacto de la Home. */
export const CONTACT_EMAIL = 'izackk26@gmail.com';

/**
 * Enlace a la página de reservas (Calendly, Cal.com, Google Calendar…).
 * Mientras esté vacío, el botón "Agendar una call" no se muestra.
 */
export const BOOKING_URL = '';

export const MESSAGE_MAX_LENGTH = 2000;

/** Tiempo que se muestra la confirmación de "correo copiado" */
export const COPY_FEEDBACK_MS = 1800;

/** Foto que acompaña al formulario; se arrastra con el mouse en escritorio */
export const CONTACT_PHOTO = {
  src: '/contact/selfie-700.webp',
  srcSet: '/contact/selfie-400.webp 400w, /contact/selfie-700.webp 700w',
  sizes: '(min-width: 1024px) 300px, 55vw',
  lowSrc: '/contact/selfie-400.webp',
  placeholder: LQIP_SELFIE,
  fileName: 'selfie.jpg',
  rotateDeg: -3.5,
} as const;
