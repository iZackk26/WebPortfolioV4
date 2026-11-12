import { useTranslation } from 'react-i18next';
import { MaxOrb } from './MaxOrb';

interface ChatCaptionProps {
  onClose: () => void;
}

/** Cabecera: semáforos de Mac (rojo cierra, amarillo minimiza) y, debajo, Max. */
export const ChatCaption = ({ onClose }: ChatCaptionProps) => {
  const { t } = useTranslation();

  return (
    <header className="max-chat-caption">
      <div className="max-lights">
        <button type="button" className="is-close" onClick={onClose} aria-label={t('chat.close')}>
          ×
        </button>
        <button type="button" className="is-min" onClick={onClose} aria-label={t('chat.minimize')}>
          −
        </button>
        <span className="is-zoom" aria-hidden="true">
          +
        </span>
      </div>
      <div className="max-chat-id">
        <MaxOrb size="md" />
        <div>
          <h2 id="max-chat-title">Max</h2>
          <p>{t('chat.subtitle')}</p>
        </div>
      </div>
    </header>
  );
};
