import { useTranslation } from 'react-i18next';
import { AeroButton } from './AeroButton';

/** Aviso de sección que no cargó; recargar trae los archivos vigentes. */
export const ChunkErrorNotice = () => {
  const { t } = useTranslation();

  return (
    <div role="alert" className="skel-error">
      <p className="m-0 text-[15px] text-black/70">{t('common.loadError')}</p>
      <AeroButton size="sm" onClick={() => window.location.reload()}>
        {t('common.retry')}
      </AeroButton>
    </div>
  );
};
