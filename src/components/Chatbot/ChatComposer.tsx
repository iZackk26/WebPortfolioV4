import { FormEvent, forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CHAT_MAX_QUESTION_CHARS } from '../../constants/chat';

interface ChatComposerProps {
  disabled: boolean;
  /** Segundos de espera por el límite; se muestran en el campo */
  cooldown: number;
  onSend: (text: string) => void;
}

/** Campo de pregunta y botón Aero de enviar. */
export const ChatComposer = forwardRef<HTMLInputElement, ChatComposerProps>(({ disabled, cooldown, onSend }, ref) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (disabled || !value.trim()) return;
    onSend(value);
    setValue('');
  };

  return (
    <form className="max-composer" onSubmit={submit}>
      <label htmlFor="max-chat-input" className="sr-only">
        {t('chat.inputLabel')}
      </label>
      <input
        ref={ref}
        id="max-chat-input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        maxLength={CHAT_MAX_QUESTION_CHARS}
        autoComplete="off"
        enterKeyHint="send"
        placeholder={cooldown > 0 ? t('chat.cooldown', { seconds: cooldown }) : t('chat.placeholder')}
      />
      <button type="submit" className="aero max-send" disabled={disabled || !value.trim()} aria-label={t('chat.send')}>
        ↑
      </button>
    </form>
  );
});

ChatComposer.displayName = 'ChatComposer';
