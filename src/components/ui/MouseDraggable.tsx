import { PointerEvent, ReactNode } from 'react';
import { useDraggable } from '../../hooks/useDraggable';

interface MouseDraggableProps {
  rotate: number;
  className?: string;
  children: ReactNode;
}

/** Envoltorio que se arrastra solo con el mouse (no bloquea el scroll táctil); al tomarlo se endereza. */
export const MouseDraggable = ({ rotate, className = '', children }: MouseDraggableProps) => {
  const { offset, dragging, handlers } = useDraggable();

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse') handlers.onPointerDown(e);
  };

  return (
    <div
      className={`select-none lg:cursor-grab ${dragging ? 'relative z-10 lg:cursor-grabbing' : ''} ${className}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px) rotate(${dragging ? 0 : rotate}deg)` }}
      {...handlers}
      onPointerDown={onPointerDown}
    >
      {children}
    </div>
  );
};
