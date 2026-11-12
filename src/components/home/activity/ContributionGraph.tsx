import { CSSProperties, PointerEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityStats, dateOf } from '../../../utils/githubActivity';
import { ContributionWeeks } from './ContributionWeeks';

interface ContributionGraphProps {
  weeks: number[][];
  firstDay: string;
  stats: ActivityStats;
  playing: boolean;
  label: string;
}

interface Tip {
  text: string;
  x: number;
  y: number;
}

/** Mapa semanal tipo GitHub; entra en ola y muestra fecha y número al pasar el mouse. */
export const ContributionGraph = ({ weeks, firstDay, stats, playing, label }: ContributionGraphProps) => {
  const { t, i18n } = useTranslation();
  const [tip, setTip] = useState<Tip | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fmtDate = (d: Date) => d.toLocaleDateString(i18n.language, { day: 'numeric', month: 'short', year: 'numeric' });

  // En pantallas angostas arranca mostrando lo más reciente
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  const onOver = (e: PointerEvent<HTMLDivElement>) => {
    const cell = (e.target as HTMLElement).closest<HTMLElement>('[data-count]');
    if (!cell) return;
    const r = cell.getBoundingClientRect();
    const date = dateOf(firstDay, Number(cell.dataset.week), Number(cell.dataset.day));
    setTip({ text: t('activity.cell', { count: Number(cell.dataset.count), date: fmtDate(date) }), x: r.left + r.width / 2, y: r.top });
  };

  let lastMonth = -1;

  return (
    <div ref={scrollRef} className="overflow-x-auto px-[18px] pb-2 pt-[18px]">
      <div
        role="img"
        aria-label={label}
        className={`activity-graph ${playing ? 'is-playing' : 'is-waiting'}`}
        style={{ ['--weeks' as string]: weeks.length } as CSSProperties}
        onPointerOver={onOver}
        onPointerLeave={() => setTip(null)}
      >
        {weeks.map((_, w) => {
          const month = dateOf(firstDay, w, 0).getMonth();
          const showMonth = month !== lastMonth && w < weeks.length - 2;
          if (showMonth) lastMonth = month;
          return (
            <span key={w} className="activity-month" style={{ gridColumn: w + 1 }} aria-hidden="true">
              {showMonth ? dateOf(firstDay, w, 0).toLocaleDateString(i18n.language, { month: 'short' }) : ''}
            </span>
          );
        })}
        <ContributionWeeks weeks={weeks} thresholds={stats.thresholds} />
      </div>
      {tip && (
        <span role="tooltip" className="activity-tip" style={{ left: tip.x, top: tip.y }}>
          {tip.text}
        </span>
      )}
    </div>
  );
};
