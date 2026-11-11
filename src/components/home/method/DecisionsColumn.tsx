import { useTranslation } from 'react-i18next';
import { DECISIONS, DECISION_ICONS } from '../../../constants/method';

/** "Lo decido yo": las decisiones que no delego, en ámbar. */
export const DecisionsColumn = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-w-0 flex-col gap-3.5 p-[20px_22px_22px]">
      <span className="method-badge" data-actor="me">
        {t('method.me')}
      </span>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {DECISIONS.map((key) => (
          <li key={key} className="method-chip">
            <svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: DECISION_ICONS[key] }} />
            {t(`method.decisions.${key}`)}
          </li>
        ))}
      </ul>
      <p className="m-0 text-[15px] text-black/60">{t('method.decisionsNote')}</p>
    </div>
  );
};
