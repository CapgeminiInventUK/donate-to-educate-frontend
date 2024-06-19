/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const basePath = resolve(__dirname, 'src');

const testExclusions = [
  'node_modules',
  'src/assets',
  'dist',
  'coverage',
  'src/vite-env.d.ts',
  '__mocks__',
  '.eslintrc.cjs',
  'src/vitest',
  'src/types',
  'src/main.tsx',
];

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins: [
    react(),
    env.mode !== 'test' && eslint(),
    nodePolyfills({
      include: ['buffer'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/vitest/setupTests.ts',
    css: true,
    reporters: ['verbose'],
    exclude: testExclusions,
    coverage: {
      provider: 'v8',
      thresholds: {
        functions: 20,
        branches: 20,
        statements: 20,
        lines: 20,
      },
      exclude: testExclusions,
    },
  },
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
}));
