import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      id: 'esm',
      format: 'esm',
      syntax: 'es2021',
      dts: true,
    },
    {
      id: 'cjs',
      format: 'cjs',
      syntax: 'es2021',
    },
  ],
  source: {
    entry: {
      index: './src/index.ts',
      utils: './src/utils.ts',
    },
    // Define compile-time constants
    define: {
      __VERSION__: JSON.stringify('1.0.0'),
      __DEV__: JSON.stringify(true),
      'process.env.LIB_NAME': JSON.stringify('rstest-rslib-adapter'),
    },
  },
  resolve: {
    // Alias configuration
    alias: {
      '@': './src',
      '@utils': './src/utils.ts',
    },
  },
});
