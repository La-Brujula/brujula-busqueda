import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@assets': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'src/assets'
      ),
      '@modules': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'src/modules'
      ),
      '@shared': path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'src/shared'
      ),
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
    },
  },
});
