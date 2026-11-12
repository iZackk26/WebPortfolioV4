import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n/config';

const rootElement = document.getElementById('root')!;

// #root trae una vista inicial estática (index.html) que React reemplaza al montar
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
