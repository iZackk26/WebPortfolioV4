import { motion } from 'framer-motion';
import { CheckCircle, ExternalLink } from 'lucide-react';
import type { CertificationProvider } from '../../types/certificates';
import { IconImage } from './IconImage';

interface CertificationProviderCardProps {
  provider: CertificationProvider;
  index: number;
}

const PROVIDER_ICON_SIZE = 56;
const PROVIDER_STAGGER_DELAY = 0.1;
const CERT_STAGGER_DELAY = 0.05;

const formatCertificationCount = (count: number) =>
  `${count} ${count === 1 ? 'certificación' : 'certificaciones'}`;

export const CertificationProviderCard = ({ provider, index }: CertificationProviderCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: index * PROVIDER_STAGGER_DELAY }}
    className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl p-8 hover:border-[rgb(var(--color-accent))] transition-colors duration-300"
  >
    <div className="flex items-center gap-4 mb-6">
      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
        <IconImage src={provider.iconPath} alt={provider.provider} size={PROVIDER_ICON_SIZE} />
      </motion.div>
      <div>
        <h3 className="text-2xl font-bold">{provider.provider}</h3>
        <p className="text-sm text-[rgb(var(--color-text-secondary))]">
          {formatCertificationCount(provider.certs.length)}
        </p>
      </div>
    </div>

    <div className="space-y-3">
      {provider.certs.map((certificate, certIndex) => (
        <motion.a
          key={certificate.name}
          href={certificate.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: certIndex * CERT_STAGGER_DELAY }}
          whileHover={{ x: 8, scale: 1.01 }}
          className="flex items-start gap-3 p-4 bg-[rgb(var(--color-bg-secondary))] rounded-xl border border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-accent))]/50 transition-all duration-200 group"
        >
          <CheckCircle size={20} className="text-[rgb(var(--color-accent))] flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-sm">{certificate.name}</h4>
              <ExternalLink
                size={14}
                className="text-[rgb(var(--color-text-secondary))] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              />
            </div>
            <p className="text-xs text-[rgb(var(--color-text-secondary))] leading-relaxed">{certificate.description}</p>
          </div>
        </motion.a>
      ))}
    </div>
  </motion.div>
);
