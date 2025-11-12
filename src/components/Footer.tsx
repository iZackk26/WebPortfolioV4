import { Github, Linkedin, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' }
  ];

  return (
    <footer className="bg-[rgb(var(--color-bg-secondary))] border-t border-[rgb(var(--color-border))] mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[rgb(var(--color-accent))] flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="text-lg font-bold">Portfolio</span>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-secondary))] hover:bg-[rgb(var(--color-accent))] hover:text-white transition-all duration-150"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <div className="text-center text-[rgb(var(--color-text-secondary))] text-sm">
            <p>© {new Date().getFullYear()} Portfolio. {t('footer.rights')}.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
