import { Component, ReactNode } from 'react';
import { ChunkErrorToast } from './ChunkErrorToast';

interface ChunkErrorBoundaryProps {
  children: ReactNode;
  /** Lo que queda de fondo detrás del aviso (p. ej. el skeleton de la sección) */
  fallback?: ReactNode;
}

interface ChunkErrorBoundaryState {
  failed: boolean;
}

/**
 * Si una parte diferida no llega (red caída o deploy nuevo con otros nombres de archivo),
 * deja su skeleton quieto y avisa con un toast que ofrece recargar, en lugar de dejar
 * la página en blanco.
 */
export class ChunkErrorBoundary extends Component<ChunkErrorBoundaryProps, ChunkErrorBoundaryState> {
  state: ChunkErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ChunkErrorBoundaryState {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="skel-failed">
        {this.props.fallback}
        <ChunkErrorToast />
      </div>
    );
  }
}
