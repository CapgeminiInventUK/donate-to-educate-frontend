import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import { resolve } from 'path';

const basePath = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '@': basePath,
      '@components': resolve(basePath, 'components'),
      '@assets': resolve(basePath, 'assets'),
      '@pages': resolve(basePath, 'pages'),
      '@utils': resolve(basePath, 'utils'),
      '@hooks': resolve(basePath, 'hooks'),
    },
  },
});
