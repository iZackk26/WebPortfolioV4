import { retryImport } from '../../utils/retryImport';

/** La ventana del chat viaja en su propio chunk: se pide al primer hover, foco o apertura. */
export const loadChatWindow = () => retryImport(() => import('./ChatWindow'));
