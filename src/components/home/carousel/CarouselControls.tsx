import { useTranslation } from 'react-i18next';
import { AeroButton } from '../../ui/AeroButton';

interface CarouselControlsProps {
  index: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** HUD superior: etiqueta, contador "01 — 04" y flechas. */
export const CarouselControls = ({ index, total, onPrevious, onNext }: CarouselControlsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <span className="carousel-kicker">{t('featured.label')}</span>
        <span className="carousel-counter">
          <b>{pad(index + 1)}</b> — {pad(total)}
        </span>
      </div>
      <div className="flex gap-2.5">
        <AeroButton tone="silver" size="icon" onClick={onPrevious} aria-label={t('featured.previous')}>
          ←
        </AeroButton>
        <AeroButton size="icon" onClick={onNext} aria-label={t('featured.next')}>
          →
        </AeroButton>
      </div>
    </div>
  );
};
