// @ts-check
import path from 'node:path';
import { defineConfig } from '@rspack/cli';

export default defineConfig({
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  entry: {
    main: './src/index.ts',
  },
  resolve: {
    extensions: ['...', '.ts'],
    mainFields: ['source', 'browser', 'module', 'main'],
    tsConfig: {
      references: 'auto',
      configFile: path.resolve(import.meta.dirname, './tsconfig.json'),
    },
  },
});
