import { useTranslation } from 'react-i18next';
import { Cloud, Monitor, CheckCircle, Award, ExternalLink } from 'lucide-react';
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
import { SnowflakeIcon, DatabricksIcon, OracleIcon } from '../components/icons/CertificationIcons';

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

  const certifications = [
    {
      provider: 'Snowflake',
      icon: SnowflakeIcon,
      color: '#29B5E8',
      certs: [
        {
          name: 'Data Engineering Workshop',
          description: 'Fundamentos de ingeniería de datos en Snowflake',
          url: 'https://learn.snowflake.com/en/certifications/data-engineering/'
        },
        {
          name: 'Data Science Workshop',
          description: 'Flujos de ciencia de datos aplicados',
          url: 'https://learn.snowflake.com/en/certifications/data-science/'
        },
        {
          name: 'Collaboration & Cost Estimation',
          description: 'Colaboración y optimización de costos',
          url: 'https://learn.snowflake.com/en/certifications/'
        },
        {
          name: 'Data Application Builders',
          description: 'Creación de aplicaciones basadas en datos',
          url: 'https://learn.snowflake.com/en/certifications/'
        },
        {
          name: 'Data Warehousing Workshop',
          description: 'Mejores prácticas de análisis y almacenamiento',
          url: 'https://learn.snowflake.com/en/certifications/data-warehousing/'
        }
      ]
    },
    {
      provider: 'Databricks',
      icon: DatabricksIcon,
      color: '#FF3621',
      certs: [
        {
          name: 'Academy Accreditation – Fundamentals',
          description: 'Procesamiento de datos, Delta Lake y analítica colaborativa (vigente hasta Ago 2026)',
          url: 'https://www.databricks.com/learn/certification'
        }
      ]
    },
    {
      provider: 'Oracle',
      icon: OracleIcon,
      color: '#F80000',
      certs: [
        {
          name: 'Primavera Cloud Schedule Management',
          description: 'Planificación de proyectos, gestión de riesgos y cronogramas',
          url: 'https://education.oracle.com/oracle-primavera-cloud'
        }
      ]
    },
    {
      provider: 'Amazon Web Services',
      icon: AWSIcon,
      color: '#FF9900',
      certs: [
        {
          name: 'AWS Cloud Practitioner Essentials',
          description: 'Servicios principales de AWS, arquitectura y seguridad',
          url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/'
        },
        {
          name: 'Introduction to Generative AI',
          description: 'Fundamentos de IA generativa',
          url: 'https://aws.amazon.com/training/'
        },
        {
          name: 'Job Roles in the Cloud',
          description: 'Perfiles profesionales en la nube y habilidades prácticas',
          url: 'https://aws.amazon.com/training/'
        },
        {
          name: 'Machine Learning Foundations',
          description: 'Principios introductorios de ML en AWS',
          url: 'https://aws.amazon.com/training/'
        }
      ]
    }
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
            className="mb-20"
          >
            <motion.div
              variants={fadeInUp}
              custom={0}
              className="flex items-center space-x-3 mb-8"
            >
              <Award size={28} className="text-[rgb(var(--color-accent))]" />
              <h2 className="text-3xl font-bold">Certificaciones Profesionales</h2>
            </motion.div>

            <div className="space-y-12">
              {certifications.map((cert, providerIndex) => (
                <motion.div
                  key={cert.provider}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: providerIndex * 0.1 }}
                  className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl p-8 hover:border-[rgb(var(--color-accent))] transition-colors duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <cert.icon size={56} />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold">{cert.provider}</h3>
                      <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                        {cert.certs.length} {cert.certs.length === 1 ? 'certificación' : 'certificaciones'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {cert.certs.map((certificate, certIndex) => (
                      <motion.a
                        key={certificate.name}
                        href={certificate.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: certIndex * 0.05 }}
                        whileHover={{ x: 8, scale: 1.01 }}
                        className="flex items-start gap-3 p-4 bg-[rgb(var(--color-bg-secondary))] rounded-xl border border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-accent))]/50 transition-all duration-200 group"
                      >
                        <CheckCircle
                          size={20}
                          className="text-[rgb(var(--color-accent))] flex-shrink-0 mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm">{certificate.name}</h4>
                            <ExternalLink
                              size={14}
                              className="text-[rgb(var(--color-text-secondary))] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            />
                          </div>
                          <p className="text-xs text-[rgb(var(--color-text-secondary))] leading-relaxed">
                            {certificate.description}
                          </p>
                        </div>
                      </motion.a>
                    ))}
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
