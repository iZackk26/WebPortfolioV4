export interface DetailTechnology {
  name: string;
  category: string;
}

export interface DetailChallenge {
  title: string;
  description: string;
}

export interface DetailSystemState {
  name: string;
  description: string;
}

export interface DetailProductionFeature {
  /** Name of a lucide icon registered in the production feature icon map. */
  icon: string;
  title: string;
  description: string;
}

/** Root i18n key of a project detail page (e.g. `ifixit_detail`). */
export type DetailNamespace =
  | 'appraisal_detail'
  | 'face_antispoofing_detail'
  | 'ifixit_detail'
  | 'project_detail'
  | 'pura_compra_detail'
  | 'crps_detail';

export interface DetailLogo {
  src: string;
  alt: string;
  className: string;
}
