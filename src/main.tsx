import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { i18nReady } from './i18n/config';

const rootElement = document.getElementById('root')!;

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Las páginas del blog llegan prerenderizadas (scripts/blog/prerender.mjs): React se engancha
// a ese HTML sin repintarlo. El resto trae una vista inicial estática que React reemplaza.
// En ambos casos se espera al idioma (el del blog sale de la URL) para no pintar otro primero.
void i18nReady.finally(() => {
  if (rootElement.hasAttribute('data-prerendered')) {
    hydrateRoot(rootElement, app, {
      onRecoverableError: (error) => {
        if (import.meta.env.DEV) console.warn('[hydrate]', error);
      },
    });
    return;
  }
  createRoot(rootElement).render(app);
});
