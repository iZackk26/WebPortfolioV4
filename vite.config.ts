import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { tagManagerHeadSnippet } from './src/utils/tagManagerSnippet';
import { blogIndexPlugin } from './vite/blog/plugin';
import { blogMdxPlugin } from './vite/blog/mdx';

// Consent Mode + Tag Manager como primer script del <head>, como pide Google. Va justo
// después de <meta charset>, que debe quedar dentro de los primeros 1024 bytes
const CHARSET_META = '<meta charset="UTF-8" />';
const tagManagerHead = (): Plugin => ({
  name: 'tag-manager-head',
  transformIndexHtml: (html) => {
    if (!html.includes(CHARSET_META)) throw new Error('index.html necesita <meta charset="UTF-8" />');
    return html.replace(CHARSET_META, `${CHARSET_META}\n    <script>${tagManagerHeadSnippet()}</script>`);
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tagManagerHead(), blogMdxPlugin(), react({ include: /\.(mdx|tsx?|jsx?)$/ }), blogIndexPlugin()],
  build: {
    // Disable CSS code splitting to have one CSS file that can be cached better
    cssCodeSplit: false,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        // framer-motion no va aquí: Rollup lo separa solo en las páginas que lo usan
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) return 'react-vendor';
          if (/node_modules\/(i18next|react-i18next)\//.test(id)) return 'i18n-vendor';
          // Cada idioma en un solo chunk (meta.json queda en el principal: lo usa el botón)
          const locale = /src\/i18n\/locales\/([^/]+)\/(?!meta\.json)[^/]+\.json/.exec(id);
          if (locale) return `locale-${locale[1]}`;
        },
      },
    },
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
