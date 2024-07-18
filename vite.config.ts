import { resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';
import biomePlugin from 'vite-plugin-biome';

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
  'src/config',
];

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer'],
    }),
    tsconfigPaths(),
    biomePlugin(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/vitest/setupTests.ts', 'jsdom-worker'],
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
