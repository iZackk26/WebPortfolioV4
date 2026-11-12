/** Reintentos de un import dinámico antes de darlo por fallido */
const IMPORT_RETRIES = 2;
const IMPORT_RETRY_BASE_MS = 800;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Reintenta un import dinámico con espera creciente: con red inestable un chunk puede
 * fallar una vez y entrar al segundo intento. Si sigue fallando, lanza el error.
 */
export const retryImport = async <T>(factory: () => Promise<T>, retries = IMPORT_RETRIES, delayMs = IMPORT_RETRY_BASE_MS): Promise<T> => {
  try {
    return await factory();
  } catch (error) {
    if (retries <= 0) throw error;
    await wait(delayMs);
    return retryImport(factory, retries - 1, delayMs * 2);
  }
};
