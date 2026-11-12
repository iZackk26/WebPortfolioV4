import { useCallback, useSyncExternalStore } from 'react';

/** Capa de los arrastrables que nunca se han tocado; supera a nodos y barras posicionadas (z-index 1). */
const BASE_LAYER = 2;

/** Orden de apilado compartido por todos los arrastrables del sitio: el último tocado va al final. */
let order: string[] = [];
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getOrder = () => order;

const bringToFront = (id: string) => {
  order = [...order.filter((item) => item !== id), id];
  listeners.forEach((listener) => listener());
};

/**
 * z-index de un arrastrable dentro de la pila global, como ventanas de escritorio.
 * El rango queda acotado por la cantidad de arrastrables, siempre por debajo del navbar (z 50).
 */
export const useDragLayer = (id: string) => {
  const current = useSyncExternalStore(subscribe, getOrder, getOrder);
  const raise = useCallback(() => bringToFront(id), [id]);
  return { zIndex: BASE_LAYER + current.indexOf(id) + 1, raise };
};
