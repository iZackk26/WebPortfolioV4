import { useTranslation } from 'react-i18next';
import { CONSENT_OPEN_EVENT } from '../../constants/consent';
import { useActiveSection } from '../../hooks/useActiveSection';
import type { LegalDocKey } from '../../types/legal';
import { isLegalClause } from '../../utils/legalGuards';
import { toValidList } from '../../utils/translationGuards';
import { AeroButton } from '../ui/AeroButton';
import { Window } from '../ui/Window';
import { LegalBlocks } from './LegalBlocks';

const pad = (n: number) => String(n).padStart(2, '0');

/** Índice en ventana fija y el documento en una ventana de lectura, con cláusulas numeradas */
export const LegalDocument = ({ doc }: { doc: LegalDocKey }) => {
  const { t } = useTranslation();
  const clauses = toValidList(t(`${doc}.clauses`, { returnObjects: true }), isLegalClause);
  const active = useActiveSection(clauses.map((clause) => clause.id));

  return (
    <div className="mx-auto mt-16 grid max-w-[1120px] grid-cols-1 items-start gap-7 px-4 lg:grid-cols-[250px_minmax(0,1fr)]">
      <div className="legal-index">
        <Window title={t(`${doc}.indexLabel`)}>
          <nav aria-label={t(`${doc}.indexLabel`)} className="legal-index-nav">
            {clauses.map((clause, i) => (
              <a key={clause.id} href={`#${clause.id}`} aria-current={active === clause.id ? 'location' : undefined}>
                <span>{pad(i + 1)}</span>
                {clause.title}
              </a>
            ))}
          </nav>
        </Window>
      </div>

      <Window title={t(`${doc}.file`)}>
        <div className="legal-doc">
          {clauses.map((clause, i) => (
            <section key={clause.id} id={clause.id} className="legal-clause" aria-labelledby={`${clause.id}-title`}>
              <span className="legal-num">{pad(i + 1)}</span>
              <h2 id={`${clause.id}-title`}>{clause.title}</h2>
              <LegalBlocks blocks={clause.blocks} />
              {clause.action === 'cookies' && (
                <div>
                  <AeroButton size="sm" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}>
                    {t('consent.prefsTitle')}
                  </AeroButton>
                </div>
              )}
            </section>
          ))}
        </div>
      </Window>
    </div>
  );
};
