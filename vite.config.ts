import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
