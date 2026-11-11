export interface CloudProvider {
  name: string;
  /** i18n key with the experience summary for this provider. */
  descriptionKey: string;
  iconPath: string;
}

export interface OperatingSystem {
  name: string;
  iconPath: string;
}

export interface Certification {
  name: string;
  description: string;
  url: string;
}

export interface CertificationProvider {
  provider: string;
  iconPath: string;
  certs: Certification[];
}
