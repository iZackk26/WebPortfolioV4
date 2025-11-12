import { Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.certificates'), href: '/certificates' }
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' }
  ];

  return (
    <footer className="relative bg-[rgb(var(--color-bg-secondary))] border-t border-[rgb(var(--color-border))] mt-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 left-0 text-[200px] font-bold text-[rgb(var(--color-text-primary))] opacity-5 pointer-events-none select-none leading-none"
      >
        ↗
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-3">Isaac Ramírez</h3>
              <p className="text-[rgb(var(--color-text-secondary))] text-sm leading-relaxed max-w-xs">
                {t('home.role')}
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-sm font-semibold mb-4 text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                Navegación
              </h4>
              <nav className="space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="group flex items-center text-sm hover:text-[rgb(var(--color-accent))] transition-colors duration-200"
                  >
                    <span className="mr-2 text-[rgb(var(--color-accent))] opacity-0 group-hover:opacity-100 transition-opacity">↳</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col h-full justify-between"
            >
              <div>
                <h4 className="text-sm font-semibold mb-4 text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                  Conectemos
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-11 h-11 rounded-full border border-[rgb(var(--color-border))] flex items-center justify-center text-[rgb(var(--color-text-secondary))] hover:border-[rgb(var(--color-accent))] hover:text-[rgb(var(--color-accent))] transition-all duration-200"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="mt-8 lg:mt-0">
                <p className="text-xs text-[rgb(var(--color-text-secondary))] flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[rgb(var(--color-accent))] animate-pulse"></span>
                  © {currentYear}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </footer>
  );
};
