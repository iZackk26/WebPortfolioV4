/** Generador pseudoaleatorio determinista (Park–Miller). Devuelve valores en [0, 1). */
export const createSeededRandom = (seed: number) => {
  let state = seed % 2147483647 || 1;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
};
