import { useTranslation } from 'react-i18next';

interface CarouselControlsProps {
  index: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}

const pad = (n: number) => String(n).padStart(2, '0');
const ROUND = 'btn-retro gloss !h-11 !w-11 !p-0 text-lg';

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
        <button type="button" onClick={onPrevious} aria-label={t('featured.previous')} className={`${ROUND} silver-fill`}>
          ←
        </button>
        <button type="button" onClick={onNext} aria-label={t('featured.next')} className={`${ROUND} aqua-fill`}>
          →
        </button>
      </div>
    </div>
  );
};
