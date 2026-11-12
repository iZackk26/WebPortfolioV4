/** Datos de un idioma: viven en locales/<idioma>/meta.json, junto a sus traducciones. */
export interface LocaleMeta {
  /** Nombre en su propio idioma ("Español", "한국어") */
  label: string;
  /** Código corto del botón del navbar ("ES", "KO") */
  short: string;
  /** Posición en el ciclo del botón de idioma */
  order: number;
  /** Valor de og:locale para redes sociales ("es_ES") */
  ogLocale: string;
  /** CV que descarga el sitio en este idioma */
  cv: string;
  /** Corte de líneas del texto: keep-all evita partir palabras en coreano */
  wordBreak?: 'normal' | 'keep-all';
}

export type LocaleSections = Record<string, Record<string, unknown>>;
