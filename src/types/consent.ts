/** Categorías que el visitante puede activar; las necesarias no se preguntan. */
export interface ConsentPreferences {
  analytics: boolean;
  marketing: boolean;
}

/** Decisión guardada en el navegador, con versión y fecha para volver a preguntar. */
export interface ConsentRecord extends ConsentPreferences {
  version: number;
  decidedAt: number;
}
