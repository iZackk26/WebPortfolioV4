/** Contenido del escritorio de la intro de la Home. */
export const INTRO_PHOTO = {
  src: '/desk/isaac.jpg',
  fileName: 'isaac.jpg',
} as const;

/** Líneas de la nota adhesiva, en orden: claves de home.note.<clave> */
export const INTRO_NOTE_KEYS = ['visioneFlow', 'growthPath', 'studies'] as const;

export type DeskIconSize = 'square' | 'wide' | 'tall';

export interface DeskIcon {
  id: string;
  src: string;
  /** Caption de archivo bajo el ícono */
  fileName: string;
  /** Nombre de la herramienta, para el title */
  label: string;
  size: DeskIconSize;
  /** Posición en el escritorio (lg+), relativa a la intro */
  position: string;
}

export const DESK_ICONS: DeskIcon[] = [
  { id: 'python', src: '/desk/python.png', fileName: 'main.py', label: 'Python', size: 'square', position: 'left-[17%] top-[36px]' },
  { id: 'spotify', src: '/desk/spotify.png', fileName: 'spotify', label: 'Spotify', size: 'square', position: 'left-[33%] top-[28px]' },
  { id: 'aws', src: '/desk/aws.png', fileName: 'aws', label: 'AWS', size: 'wide', position: 'right-[19%] top-[52px]' },
  { id: 'rust', src: '/desk/rust-ferris.png', fileName: 'lib.rs', label: 'Rust', size: 'wide', position: 'left-[25%] top-[408px]' },
  { id: 'claude', src: '/desk/claude.png', fileName: 'claude', label: 'Claude', size: 'tall', position: 'right-[25%] top-[404px]' },
];

/** Giro de reposo de la foto y la nota; al arrastrarlas se enderezan */
export const PHOTO_ROTATION_DEG = -4;
export const NOTE_ROTATION_DEG = 3;

/** Id de la sección del carrusel, destino del botón "Ver proyectos" */
export const FEATURED_SECTION_ID = 'featured';
