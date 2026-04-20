import path from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginSvelte } from '@rsbuild/plugin-svelte';

export default defineConfig({
  plugins: [pluginSvelte()],
  source: {
    entry: {
      index: './src/index.ts',
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
