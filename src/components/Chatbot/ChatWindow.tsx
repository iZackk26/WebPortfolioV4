import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useChat } from '../../hooks/useChat';
import { useChatbot } from '../../hooks/useChatbot';
import { useChatMorph } from '../../hooks/useChatMorph';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { ChatCaption } from './ChatCaption';
import { ChatMessages } from './ChatMessages';
import { ChatComposer } from './ChatComposer';

/**
 * Ventana de Max: marco Aero Glass de vidrio líquido con semáforos de Mac. Nace del
 * lanzador del navbar y se recoge hacia él; Esc, el semáforo rojo o tocar afuera la cierran.
 */
export const ChatWindow = () => {
  const { t } = useTranslation();
  const { open, anchor, launcherRef, close } = useChat();
  const chat = useChatbot();
  const panelRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { visible, settled } = useChatMorph(panelRef, launcherRef, open);

  useFocusTrap(panelRef, open, close, launcherRef);

  // El campo queda listo para escribir cuando el contenido termina de entrar
  useEffect(() => {
    if (open && settled) inputRef.current?.focus({ preventScroll: true });
  }, [open, settled]);

  // En móvil la ventana ocupa la pantalla: el fondo no se desplaza mientras está abierta
  useEffect(() => {
    document.documentElement.classList.toggle('max-chat-open', open);
    return () => document.documentElement.classList.remove('max-chat-open');
  }, [open]);

  return (
    <>
      <div className="max-scrim" data-open={open} onClick={close} aria-hidden="true" />
      <section
        ref={panelRef}
        id="max-chat"
        role="dialog"
        aria-modal="true"
        aria-labelledby="max-chat-title"
        className="max-chat"
        data-anchor={anchor}
        data-settled={settled}
        hidden={!visible}
      >
        <ChatCaption onClose={close} />
        <div className="max-chat-client">
          <ChatMessages messages={chat.messages} sending={chat.sending} cooldown={chat.cooldown} onAsk={chat.send} />
          <ChatComposer ref={inputRef} disabled={chat.sending || chat.cooldown > 0} cooldown={chat.cooldown} onSend={chat.send} />
          <p className="max-chat-foot">{t('chat.footer')}</p>
        </div>
      </section>
    </>
  );
};
