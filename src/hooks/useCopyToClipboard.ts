import { useCallback, useEffect, useRef, useState } from 'react';

/** Copia texto al portapapeles y expone `copied` durante `feedbackMs`. */
export const useCopyToClipboard = (feedbackMs: number) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        return false;
      }
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), feedbackMs);
      return true;
    },
    [feedbackMs]
  );

  return { copied, copy };
};
