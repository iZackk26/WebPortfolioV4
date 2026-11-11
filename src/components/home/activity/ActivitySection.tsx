import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import activity from '../../../data/githubActivity.json';
import { useInViewOnce } from '../../../hooks/useInViewOnce';
import { computeActivityStats, dateOf } from '../../../utils/githubActivity';
import { Window } from '../../ui/Window';
import { ActivityStats } from './ActivityStats';
import { ContributionGraph } from './ContributionGraph';

const LEGEND_LEVELS = [0, 1, 2, 3, 4] as const;

/** "Un commit a la vez": constancia real en GitHub, entre los proyectos y el contacto. */
export const ActivitySection = () => {
  const { t, i18n } = useTranslation();
  const { ref, inView } = useInViewOnce<HTMLElement>(0.3);
  const stats = useMemo(() => computeActivityStats(activity.weeks), []);
  const fmtDate = (d: Date) => d.toLocaleDateString(i18n.language, { day: 'numeric', month: 'short', year: 'numeric' });
  const peakDate = fmtDate(dateOf(activity.firstDay, stats.peak.week, stats.peak.day));

  return (
    <section
      ref={ref}
      aria-labelledby="activity-title"
      className="mx-auto flex max-w-[1120px] flex-col items-center gap-3.5 px-4 pt-24 text-center md:pt-28"
    >
      <span className="carousel-kicker">{t('activity.kicker')}</span>
      <h2 id="activity-title" className="m-0 text-balance text-[clamp(32px,5vw,52px)] font-medium leading-none tracking-[-0.05em] text-black">
        {t('activity.title')}
      </h2>
      <p className="m-0 max-w-[52ch] text-balance text-[17px] text-black/60">{t('activity.lede')}</p>

      <div className="mt-4 w-full max-w-[980px] text-left">
        <Window title="activity.log">
          <ActivityStats total={activity.total} activeDays={stats.activeDays} longestStreak={stats.longestStreak} peak={stats.peak.count} />
          <ContributionGraph
            weeks={activity.weeks}
            firstDay={activity.firstDay}
            stats={stats}
            playing={inView}
            label={t('activity.graphLabel', { total: activity.total.toLocaleString(i18n.language), days: stats.activeDays })}
          />
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-[18px] pb-4 pt-2.5 font-mono text-xs text-black/40">
            <span className="activity-peak">{t('activity.peak', { count: stats.peak.count, date: peakDate })}</span>
            <span className="inline-flex items-center gap-[3px]" aria-hidden="true">
              {t('activity.less')}
              {LEGEND_LEVELS.map((level) => (
                <span key={level} className="activity-cell activity-legend-cell" data-level={level} />
              ))}
              {t('activity.more')}
            </span>
          </div>
        </Window>
      </div>
      <p className="m-0 font-mono text-[11px] text-black/35">{t('activity.updated', { date: fmtDate(new Date(activity.fetchedAt)) })}</p>
    </section>
  );
};
