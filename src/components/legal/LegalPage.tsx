import { useTranslation } from 'react-i18next';
import type { LegalDocKey } from '../../types/legal';
import { SEO } from '../SEO';
import { LegalDocument } from './LegalDocument';
import { LegalHero } from './LegalHero';

/** Página legal completa (privacidad o términos): mismo armado, distinto contenido */
export const LegalPage = ({ doc }: { doc: LegalDocKey }) => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={t(`${doc}.seo.title`)} description={t(`${doc}.seo.description`)} />
      <LegalHero doc={doc} />
      <LegalDocument doc={doc} />
    </>
  );
};
