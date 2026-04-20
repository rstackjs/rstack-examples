import path from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginPreact } from '@rsbuild/plugin-preact';

export default defineConfig({
  plugins: [pluginPreact()],
  source: {
    entry: {
      index: './src/index.tsx',
    },
    define: {
      __APP_VERSION__: JSON.stringify('1.0.0'),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
});
