import { useTranslation } from 'react-i18next';
import { Cloud, Monitor, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { AWSIcon, GCPIcon, AzureIcon } from '../components/icons/CloudIcons';
import {
  ArchLinuxIcon,
  UbuntuIcon,
  FedoraIcon,
  KaliLinuxIcon,
  ManjaroIcon,
  EndeavourOSIcon,
  AppleIcon,
  WindowsIcon
} from '../components/icons/OSIcons';

export const Certificates = () => {
  const { t } = useTranslation();

  const cloudProviders = [
    {
      name: 'Amazon Web Services',
      description: t('certificates.aws'),
      icon: AWSIcon,
      color: '#FF9900'
    },
    {
      name: 'Google Cloud Platform',
      description: t('certificates.gcp'),
      icon: GCPIcon,
      color: '#4285F4'
    },
    {
      name: 'Microsoft Azure',
      description: t('certificates.azure'),
      icon: AzureIcon,
      color: '#0078D4'
    }
  ];

  const linuxDistros = [
    { name: 'Arch Linux', icon: ArchLinuxIcon, color: '#1793D1' },
    { name: 'Ubuntu', icon: UbuntuIcon, color: '#E95420' },
    { name: 'Fedora', icon: FedoraIcon, color: '#294172' },
    { name: 'Kali Linux', icon: KaliLinuxIcon, color: '#367BF0' },
    { name: 'Manjaro', icon: ManjaroIcon, color: '#35BF5C' },
    { name: 'EndeavourOS', icon: EndeavourOSIcon, color: '#7F7FFF' }
  ];

  const otherOS = [
    { name: 'macOS', icon: AppleIcon },
    { name: 'Windows', icon: WindowsIcon, color: '#00ADEF' }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.15,
        ease: [0.25, 0.4, 0.25, 1]
      }
    })
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-16"
          >
            <motion.h1
              variants={fadeInUp}
              custom={0}
              className="text-5xl sm:text-6xl font-bold mb-4"
            >
              {t('certificates.title')}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-1 bg-[rgb(var(--color-accent))] rounded-full origin-left"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-20"
          >
            <motion.div
              variants={fadeInUp}
              custom={1}
              className="flex items-center space-x-3 mb-8"
            >
              <Cloud size={28} className="text-[rgb(var(--color-accent))]" />
              <h2 className="text-3xl font-bold">{t('certificates.cloudExperience')}</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {cloudProviders.map((provider, index) => (
                <motion.div
                  key={provider.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl p-8 hover:border-[rgb(var(--color-accent))] transition-all duration-300"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    className="mb-6 flex items-center justify-center h-20"
                  >
                    <provider.icon size={72} />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-4">{provider.name}</h3>
                  <p className="text-[rgb(var(--color-text-secondary))] leading-relaxed mb-6">
                    {provider.description}
                  </p>

                  <div className="flex items-center space-x-2 text-[rgb(var(--color-accent))]">
                    <CheckCircle size={18} />
                    <span className="text-sm font-semibold">Experienced</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16"
          >
            <motion.div
              variants={fadeInUp}
              custom={0}
              className="flex items-center space-x-3 mb-8"
            >
              <Monitor size={28} className="text-[rgb(var(--color-accent))]" />
              <h2 className="text-3xl font-bold">{t('certificates.osExperience')}</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold mb-4 text-[rgb(var(--color-text-secondary))]">
                Linux Distributions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {linuxDistros.map((distro, index) => (
                  <motion.div
                    key={distro.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-xl p-4 hover:border-[rgb(var(--color-accent))] transition-all duration-300 flex flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="mb-3"
                    >
                      <distro.icon size={48} />
                    </motion.div>
                    <span className="text-sm font-semibold text-[rgb(var(--color-text-secondary))]">
                      {distro.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4 text-[rgb(var(--color-text-secondary))]">
                Other Operating Systems
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 max-w-md">
                {otherOS.map((os, index) => (
                  <motion.div
                    key={os.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-xl p-6 hover:border-[rgb(var(--color-accent))] transition-all duration-300 flex flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="mb-3"
                    >
                      <os.icon size={56} />
                    </motion.div>
                    <span className="text-sm font-semibold text-[rgb(var(--color-text-secondary))]">
                      {os.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
