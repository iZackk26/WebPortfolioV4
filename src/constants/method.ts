/** Contenido del bloque "IA sí. Vibe-coding no." */
export type MethodActor = 'me' | 'ai';

/** Trazos SVG (viewBox 24×24, solo contorno) de las etiquetas de "lo decido yo" */
export const DECISION_ICONS = {
  architecture: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
  systemDesign:
    '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7.5l2.8 8.2M16 7.5l-2.8 8.2M8.5 6h7"/>',
  interface: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 8h18M8 21h8"/>',
  algorithms: '<path d="M8 6l-5 6 5 6M16 6l5 6-5 6M14 4l-4 16"/>',
} as const;

export type DecisionKey = keyof typeof DECISION_ICONS;

export const DECISIONS: DecisionKey[] = ['architecture', 'systemDesign', 'interface', 'algorithms'];

/** Herramientas como teclas; la primera va resaltada */
export const AI_TOOLS = ['Claude Code', 'MCPs', 'skills', 'plan mode', '/compact', 'remote-control', 'goal'] as const;

export interface MethodStep {
  /** Clave en method.steps.<key> */
  key: 'define' | 'orchestrate' | 'review' | 'ship';
  actor: MethodActor;
}

export const METHOD_STEPS: MethodStep[] = [
  { key: 'define', actor: 'me' },
  { key: 'orchestrate', actor: 'ai' },
  { key: 'review', actor: 'me' },
  { key: 'ship', actor: 'me' },
];

/** Ritmo de la línea de tiempo: tiempo por paso y pausa al terminar antes de repetir */
export const STEP_INTERVAL_MS = 2200;
export const STEP_HOLD_MS = 3200;
