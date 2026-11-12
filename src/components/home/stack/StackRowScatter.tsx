import { useTranslation } from 'react-i18next';
import { STACK_ICONS } from '../../../constants/stackIcons';
import { ScatterSpot } from '../../../constants/mobileScatter';
import { StackIconTile } from './StackIconTile';

interface StackRowScatterProps {
  spots: ScatterSpot[];
  /** Alto y márgenes del contenedor */
  className?: string;
}

/** Logos sueltos en pantallas donde no flotan a los costados (bajo xl). */
export const StackRowScatter = ({ spots, className = '' }: StackRowScatterProps) => {
  const { t } = useTranslation();

  return (
    <ul aria-label={t('home.stackLabel')} className={`relative m-0 mx-auto w-full max-w-[380px] list-none p-0 sm:max-w-[560px] xl:hidden ${className}`}>
      {spots.map(({ id, position, rotate }) => {
        const icon = STACK_ICONS.find((item) => item.id === id);
        if (!icon) return null;
        return (
          <li key={id} className={`absolute ${position}`} style={{ rotate: `${rotate}deg` }}>
            <StackIconTile icon={icon} />
          </li>
        );
      })}
    </ul>
  );
};
