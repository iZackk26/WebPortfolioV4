import { ReactNode, Suspense, useRef } from 'react';
import { useNearViewport } from '../../hooks/useNearViewport';
import { useIdlePrefetch } from '../../hooks/useIdlePrefetch';
import { LAZY_SECTION_MARGIN } from '../../constants/performance';
import { ChunkErrorBoundary } from './ChunkErrorBoundary';

interface LazySectionProps {
  /** Import del chunk; se precarga en reposo para que al llegar ya esté */
  prefetch: () => Promise<unknown>;
  /** Placeholder con la forma y la altura de la sección */
  skeleton: ReactNode;
  /** Componente lazy() de la sección */
  children: ReactNode;
}

/**
 * Sección que no se ve al entrar: muestra su skeleton y se monta cuando el visitante
 * se acerca. Así la carga inicial solo trae lo que está arriba.
 */
export const LazySection = ({ prefetch, skeleton, children }: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const near = useNearViewport(ref, LAZY_SECTION_MARGIN);
  useIdlePrefetch(prefetch);

  if (!near) return <div ref={ref}>{skeleton}</div>;
  return (
    <ChunkErrorBoundary fallback={skeleton}>
      <Suspense fallback={skeleton}>{children}</Suspense>
    </ChunkErrorBoundary>
  );
};
