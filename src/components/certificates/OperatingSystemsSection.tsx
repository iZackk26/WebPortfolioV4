import { useTranslation } from 'react-i18next';
import { Monitor } from 'lucide-react';
import { LINUX_DISTROS, OTHER_OPERATING_SYSTEMS } from '../../constants/certificates';
import { IconSectionHeading } from '../ui/IconSectionHeading';
import { RevealGroup } from '../ui/RevealGroup';
import { OperatingSystemGroup, type OperatingSystemGroupStyle } from './OperatingSystemGroup';

const SECTION_REVEAL_AMOUNT = 0.2;

const LINUX_GROUP_STYLE: OperatingSystemGroupStyle = {
  gridClassName: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4',
  cardPaddingClassName: 'p-4',
  iconSize: 48,
  staggerDelay: 0.05,
  iconHover: { rotate: 360 },
  iconHoverDuration: 0.6,
  revealDelay: 0,
  className: 'mb-8',
};

const OTHER_OS_GROUP_STYLE: OperatingSystemGroupStyle = {
  gridClassName: 'grid-cols-2 sm:grid-cols-2 gap-6 max-w-md',
  cardPaddingClassName: 'p-6',
  iconSize: 56,
  staggerDelay: 0.1,
  iconHover: { rotate: [0, -10, 10, 0] },
  iconHoverDuration: 0.5,
  revealDelay: 0.2,
};

export const OperatingSystemsSection = () => {
  const { t } = useTranslation();

  return (
    <RevealGroup amount={SECTION_REVEAL_AMOUNT} className="mb-16">
      <IconSectionHeading icon={Monitor} title={t('certificates.osExperience')} />
      <OperatingSystemGroup title="Linux Distributions" systems={LINUX_DISTROS} groupStyle={LINUX_GROUP_STYLE} />
      <OperatingSystemGroup
        title="Other Operating Systems"
        systems={OTHER_OPERATING_SYSTEMS}
        groupStyle={OTHER_OS_GROUP_STYLE}
      />
    </RevealGroup>
  );
};
