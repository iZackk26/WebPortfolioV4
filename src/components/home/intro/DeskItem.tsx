import { CSSProperties, ReactNode } from 'react';
import { useDraggable } from '../../../hooks/useDraggable';

interface DeskItemProps {
  /** Clases con la posición inicial en el escritorio */
  className: string;
  rotate?: number;
  /** Posición extra (top/left/right) además del desplazamiento por arrastre */
  style?: CSSProperties;
  onDragChange: (dragging: boolean) => void;
  children: ReactNode;
}

/** Objeto del escritorio que se puede arrastrar; al tomarlo se endereza y se eleva. */
export const DeskItem = ({ className, rotate = 0, style, onDragChange, children }: DeskItemProps) => {
  const { offset, dragging, handlers } = useDraggable(onDragChange);

  return (
    <div
      className={`desk-item desk-dim ${dragging ? 'is-dragging' : ''} ${className}`}
      style={{ ...style, transform: `translate(${offset.x}px, ${offset.y}px) rotate(${dragging ? 0 : rotate}deg)` }}
      {...handlers}
    >
      {children}
    </div>
  );
};
