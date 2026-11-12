import { CSSProperties, PointerEvent, ReactNode, useId } from 'react';
import { useDragLayer } from '../../hooks/useDragLayer';
import { useDraggable } from '../../hooks/useDraggable';

interface DraggableProps {
  /** Posición y tamaño; por defecto el elemento es `position: relative` */
  className?: string;
  rotate?: number;
  /** Posición extra (top/left/right) además del desplazamiento por arrastre */
  style?: CSSProperties;
  /** Solo el mouse arrastra, para no bloquear el scroll táctil */
  mouseOnly?: boolean;
  onDragChange?: (dragging: boolean) => void;
  children: ReactNode;
}

/**
 * Único envoltorio arrastrable del sitio. Al tomarlo se endereza y pasa al frente de la
 * pila global, y ahí se queda al soltarlo, como una ventana de escritorio.
 */
export const Draggable = ({ className = '', rotate = 0, style, mouseOnly = false, onDragChange, children }: DraggableProps) => {
  const { offset, dragging, handlers } = useDraggable(onDragChange);
  const { zIndex, raise } = useDragLayer(useId());

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (mouseOnly && e.pointerType !== 'mouse') return;
    raise();
    handlers.onPointerDown(e);
  };

  return (
    <div
      className={`drag-item ${mouseOnly ? 'is-mouse-only' : ''} ${dragging ? 'is-dragging' : ''} ${className}`}
      style={{
        ...style,
        zIndex,
        transform: `translate(${offset.x}px, ${offset.y}px) rotate(${dragging ? 0 : rotate}deg)`,
      }}
      {...handlers}
      onPointerDown={onPointerDown}
    >
      {children}
    </div>
  );
};
