import { useEffect, useState } from 'react';

/**
 * Turns a flag on every `intervalMs` and back off after `activeMs`.
 * Both timers are cleared on unmount.
 */
export const usePeriodicFlag = (intervalMs: number, activeMs: number) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let deactivateTimeout: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      setIsActive(true);
      deactivateTimeout = setTimeout(() => setIsActive(false), activeMs);
    }, intervalMs);

    return () => {
      clearInterval(interval);
      clearTimeout(deactivateTimeout);
    };
  }, [intervalMs, activeMs]);

  return isActive;
};
