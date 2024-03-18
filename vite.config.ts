import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/': '/src/',
      '@/pages': '/src/pages/',
      '@/components': '/src/components/',
      '@/utils': '/src/utils/',
      '@/hooks': '/src/hooks/',
    },
  }
});
