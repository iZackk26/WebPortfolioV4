import { CSSProperties, memo } from 'react';
import { ActivityStats, levelFor } from '../../../utils/githubActivity';

interface ContributionWeeksProps {
  weeks: number[][];
  thresholds: ActivityStats['thresholds'];
}

/** Retraso entre semanas de la ola de entrada */
const WEEK_DELAY_MS = 14;

/**
 * Columnas de semanas del mapa. La ola anima cada semana (~53 capas) y no cada día
 * (~371), que saturaba la GPU al aparecer. memo: el tooltip no vuelve a renderizarlas.
 */
export const ContributionWeeks = memo(({ weeks, thresholds }: ContributionWeeksProps) => (
  <>
    {weeks.map((week, w) => (
      <span
        key={w}
        className="activity-week"
        style={{ gridColumn: w + 1, ['--d' as string]: `${w * WEEK_DELAY_MS}ms` } as CSSProperties}
      >
        {week.map((count, d) => (
          <span
            key={d}
            className="activity-cell"
            data-level={levelFor(count, thresholds)}
            data-count={count}
            data-week={w}
            data-day={d}
          />
        ))}
      </span>
    ))}
  </>
));

ContributionWeeks.displayName = 'ContributionWeeks';
