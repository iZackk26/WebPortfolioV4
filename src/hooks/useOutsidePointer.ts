import { RefObject, useEffect } from 'react';

/** Llama a `onOutside` cuando, estando activo, se presiona fuera de todos los `refs`. */
export const useOutsidePointer = (
  refs: RefObject<HTMLElement>[],
  active: boolean,
  onOutside: () => void,
) => {
  useEffect(() => {
    if (!active) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!refs.some((ref) => ref.current?.contains(target))) onOutside();
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [refs, active, onOutside]);
};
