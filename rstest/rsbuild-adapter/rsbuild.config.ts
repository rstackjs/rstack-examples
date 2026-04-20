import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
    },
    define: {
      __APP_VERSION__: JSON.stringify('2.0.0'),
      __PLATFORM__: JSON.stringify('web'),
      'process.env.APP_NAME': JSON.stringify('my-app'),
    },
  },
  resolve: {
    alias: {
      '@': './src',
      '@utils': './src/utils',
    },
  },
});
