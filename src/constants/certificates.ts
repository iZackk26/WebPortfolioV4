import type { CloudProvider, OperatingSystem } from '../types/certificates';

export const CLOUD_PROVIDERS: CloudProvider[] = [
  { name: 'Amazon Web Services', descriptionKey: 'certificates.aws', iconPath: '/icons/aws.svg' },
  { name: 'Google Cloud Platform', descriptionKey: 'certificates.gcp', iconPath: '/icons/gcp.svg' },
  { name: 'Microsoft Azure', descriptionKey: 'certificates.azure', iconPath: '/icons/azure.svg' },
];

export const LINUX_DISTROS: OperatingSystem[] = [
  { name: 'Arch Linux', iconPath: '/icons/archlinux.svg' },
  { name: 'Ubuntu', iconPath: '/icons/ubuntu.svg' },
  { name: 'Fedora', iconPath: '/icons/fedora.svg' },
  { name: 'Kali Linux', iconPath: '/icons/kalilinux.svg' },
  { name: 'Manjaro', iconPath: '/icons/manjaro.svg' },
  { name: 'EndeavourOS', iconPath: '/icons/endeavouros.svg' },
];

export const OTHER_OPERATING_SYSTEMS: OperatingSystem[] = [
  { name: 'macOS', iconPath: '/icons/macos.svg' },
  { name: 'Windows', iconPath: '/icons/windows.svg' },
];
