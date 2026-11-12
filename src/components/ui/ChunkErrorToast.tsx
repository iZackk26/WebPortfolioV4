import { useEffect } from 'react';
import { useToast } from '../../hooks/useToast';

/**
 * Avisa una sola vez que una parte no cargó. El toast queda hasta cerrarlo y ofrece
 * recargar, que trae los archivos vigentes (útil tras un deploy nuevo). Si fallan
 * varias secciones, comparten el mismo aviso.
 */
export const ChunkErrorToast = () => {
  const { show } = useToast();

  useEffect(() => {
    show({
      key: 'toast.chunk',
      tone: 'info',
      id: 'chunk-error',
      action: { labelKey: 'toast.chunk.action', onClick: () => window.location.reload() },
    });
  }, [show]);

  return null;
};
