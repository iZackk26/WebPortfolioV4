import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { i18nReady } from './i18n/config';
import { bootConsent } from './utils/consent';

// Consent Mode en "denied" antes que nada; GTM solo carga si ya había permiso guardado
bootConsent();

const rootElement = document.getElementById('root')!;

// #root trae una vista inicial estática (index.html) que React reemplaza al montar.
// Se espera al idioma del visitante para no pintar primero en inglés y luego cambiar.
void i18nReady.finally(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
