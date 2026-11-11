import { PointerEvent, useRef, useState } from 'react';

interface Offset {
  x: number;
  y: number;
}

/** Arrastre libre con pointer events: desplazamiento acumulado, estado y handlers. */
export const useDraggable = (onDragChange?: (dragging: boolean) => void) => {
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ px: number; py: number; ox: number; oy: number } | null>(null);

  const setDrag = (value: boolean) => {
    setDragging(value);
    onDragChange?.(value);
  };

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { px: e.clientX, py: e.clientY, ox: offset.x, oy: offset.y };
    setDrag(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const s = start.current;
    if (!s) return;
    setOffset({ x: s.ox + e.clientX - s.px, y: s.oy + e.clientY - s.py });
  };

  const end = () => {
    if (!start.current) return;
    start.current = null;
    setDrag(false);
  };

  return {
    offset,
    dragging,
    handlers: { onPointerDown, onPointerMove, onPointerUp: end, onPointerCancel: end },
  };
};
