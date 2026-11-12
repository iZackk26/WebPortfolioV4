/**
 * Posiciones "a mano" de los íconos en pantallas angostas (bajo lg/xl), donde no flotan
 * a los costados: sueltos y girados para que el escritorio se sienta natural y no una fila.
 */
export interface ScatterSpot {
  /** id del ícono (DESK_ICONS o STACK_ICONS) */
  id: string;
  /** Clases de posición absoluta dentro de su contenedor */
  position: string;
  rotate: number;
}

/** Alrededor de la foto de la intro */
export const INTRO_MOBILE_SPOTS: ScatterSpot[] = [
  { id: 'python', position: 'left-[4%] top-[2px]', rotate: -8 },
  { id: 'claude', position: 'left-[14%] top-[86px]', rotate: 6 },
  { id: 'rust', position: 'left-0 top-[162px]', rotate: 5 },
  { id: 'spotify', position: 'right-[8%] top-[14px]', rotate: 7 },
  { id: 'aws', position: 'right-0 top-[124px]', rotate: -4 },
];

/** Encima del título de la actividad, dentro de su espacio superior */
export const STACK_MOBILE_TOP: ScatterSpot[] = [
  { id: 'typescript', position: 'left-[9%] top-[2px]', rotate: -8 },
  { id: 'react', position: 'right-[11%] top-[14px]', rotate: 7 },
];

/** Debajo de la actividad, antes del método */
export const STACK_MOBILE_BOTTOM: ScatterSpot[] = [
  { id: 'node', position: 'left-[8%] top-[8px]', rotate: -4 },
  { id: 'postgres', position: 'right-[9%] top-0', rotate: 5 },
  { id: 'tailwind', position: 'left-[36%] top-[96px]', rotate: 3 },
];
