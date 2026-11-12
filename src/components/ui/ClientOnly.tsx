import type { ReactNode } from 'react';
import { useIsClient } from '../../hooks/useIsClient';

/**
 * Pinta su contenido solo en el navegador (nunca en el prerender ni durante la
 * hidratación). Va aislado para que el cambio no vuelva a renderizar el resto de la app.
 */
export const ClientOnly = ({ children }: { children: ReactNode }) => (useIsClient() ? <>{children}</> : null);
