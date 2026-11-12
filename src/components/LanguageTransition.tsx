import { ReactNode, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageTransitionProps {
  children: ReactNode;
}

/**
 * Fundido suave al cambiar de idioma. En la primera carga no anima: el contenido
 * se pinta de inmediato (sin opacidad 0 mientras carga el JS), lo que adelanta el LCP.
 */
export const LanguageTransition = ({ children }: LanguageTransitionProps) => {
  const { i18n } = useTranslation();
  const initial = useRef(i18n.language);
  const changed = useRef(false);
  if (i18n.language !== initial.current) changed.current = true;

  return (
    <div key={i18n.language} className={changed.current ? 'lang-in' : undefined}>
      {children}
    </div>
  );
};
