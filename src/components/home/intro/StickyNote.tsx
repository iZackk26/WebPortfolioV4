import { useTranslation } from 'react-i18next';
import { INTRO_NOTE_KEYS } from '../../../constants/intro';

interface StickyNoteProps {
  className?: string;
}

/** Nota adhesiva con lo que estás haciendo ahora mismo. */
export const StickyNote = ({ className = '' }: StickyNoteProps) => {
  const { t } = useTranslation();

  return (
    <div className={`sticky-note ${className}`}>
      <p className="sticky-note-title">{t('home.note.title')}</p>
      <ul>
        {INTRO_NOTE_KEYS.map((key) => (
          <li key={key}>{t(`home.note.${key}`)}</li>
        ))}
      </ul>
    </div>
  );
};
