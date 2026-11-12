import { createContext, RefObject } from 'react';
import type { ChatAnchor } from '../types/chat';

export interface ChatContextValue {
  open: boolean;
  /** Ya se abrió alguna vez: desde ahí la ventana queda montada para animar el cierre */
  requested: boolean;
  anchor: ChatAnchor;
  /** Lanzador que abrió el chat: de él nace la ventana y a él vuelve el foco */
  launcherRef: RefObject<HTMLElement | null>;
  toggle: (launcher: HTMLElement, anchor: ChatAnchor) => void;
  close: () => void;
}

export const ChatContext = createContext<ChatContextValue | null>(null);
