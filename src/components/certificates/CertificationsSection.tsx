import { Award } from 'lucide-react';
import { CERTIFICATION_PROVIDERS } from '../../constants/certifications';
import { IconSectionHeading } from '../ui/IconSectionHeading';
import { RevealGroup } from '../ui/RevealGroup';
import { CertificationProviderCard } from './CertificationProviderCard';

const SECTION_REVEAL_AMOUNT = 0.2;

export const CertificationsSection = () => (
  <RevealGroup amount={SECTION_REVEAL_AMOUNT} className="mb-20">
    <IconSectionHeading icon={Award} title="Certificaciones Profesionales" />
    <div className="space-y-12">
      {CERTIFICATION_PROVIDERS.map((provider, index) => (
        <CertificationProviderCard key={provider.provider} provider={provider} index={index} />
      ))}
    </div>
  </RevealGroup>
);
