import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useChat } from '../../hooks/useChat';
import { MaxOrb } from './MaxOrb';
import { loadChatWindow } from './loadChatWindow';

interface MaxLauncherProps {
  /** pill: navbar arriba (orbe + texto + ⌘K) · bubble: navbar compacto, junto a la foto */
  variant: 'pill' | 'bubble';
  /** Antes de abrir (p. ej. cerrar las burbujas Spotlight) */
  onOpen?: () => void;
}

/** Pieza del navbar que abre a Max; la ventana nace de ella. */
export const MaxLauncher = ({ variant, onOpen }: MaxLauncherProps) => {
  const { t } = useTranslation();
  const { open, toggle } = useChat();
  const anchor = variant === 'pill' ? 'right' : 'left';

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    onOpen?.();
    toggle(event.currentTarget, anchor);
  };

  return (
    <button
      type="button"
      data-max-launcher={anchor}
      onClick={onClick}
      onPointerEnter={loadChatWindow}
      onFocus={loadChatWindow}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls="max-chat"
      aria-label={t('chat.launcherLabel')}
      className={variant === 'pill' ? 'max-launcher silver-fill' : 'max-launcher-bubble nav-piece'}
      data-open={open}
    >
      <MaxOrb size={variant === 'pill' ? 'sm' : 'lg'} />
      {variant === 'pill' ? (
        <>
          <span className="max-launcher-label">{t('chat.launcher')}</span>
          <kbd className="max-launcher-kbd">⌘K</kbd>
        </>
      ) : (
        <span className="max-launcher-tip" aria-hidden="true">
          {t('chat.launcher')}
          <kbd>⌘K</kbd>
        </span>
      )}
    </button>
  );
};
