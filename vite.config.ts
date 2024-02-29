import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), TanStackRouterVite()],
    base: env.BASE_URL,
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
  };
});
