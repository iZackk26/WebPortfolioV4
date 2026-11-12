import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChatContext } from '../../context/chatContext';
import type { ChatAnchor } from '../../types/chat';

/** El primer lanzador visible (el del navbar arriba o el del compacto) responde a ⌘K. */
const visibleLauncher = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[data-max-launcher]')).find((el) => el.getClientRects().length > 0);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const [anchor, setAnchor] = useState<ChatAnchor>('right');
  const launcherRef = useRef<HTMLElement | null>(null);

  const toggle = useCallback((launcher: HTMLElement, side: ChatAnchor) => {
    launcherRef.current = launcher;
    setAnchor(side);
    setRequested(true);
    setOpen((value) => !value);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // ⌘K / Ctrl K abre o cierra desde cualquier parte del sitio
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return;
      const launcher = visibleLauncher();
      if (!launcher) return;
      event.preventDefault();
      toggle(launcher, launcher.dataset.maxLauncher === 'left' ? 'left' : 'right');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle]);

  const value = useMemo(() => ({ open, requested, anchor, launcherRef, toggle, close }), [open, requested, anchor, toggle, close]);
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
