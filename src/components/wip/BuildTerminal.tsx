import { useTranslation } from 'react-i18next';
import { BUILD_LINE_TONES } from '../../constants/underConstruction';

interface BuildTerminalProps {
  visible: string[];
  progress: number;
  finished: boolean;
}

/** Log de la "compilación" de la sección con barra de progreso. */
export const BuildTerminal = ({ visible, progress, finished }: BuildTerminalProps) => {
  const { t } = useTranslation();

  return (
    <div className="wip-terminal">
      <div aria-live="off">
        {visible.map((text, i) => (
          <div key={i} className="wip-line" data-tone={BUILD_LINE_TONES[i]}>
            {text}
          </div>
        ))}
        {finished && (
          <div className="wip-line">
            <span className="wip-caret" />
          </div>
        )}
      </div>
      <div className="mt-auto pt-3.5">
        <div className="mb-1.5 flex justify-between font-mono text-xs text-black/40">
          <span>{t('wip.progress')}</span>
          <span className="tabular-nums">{progress}%</span>
        </div>
        <div
          className="wip-track"
          role="progressbar"
          aria-label={t('wip.progress')}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className="wip-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};
