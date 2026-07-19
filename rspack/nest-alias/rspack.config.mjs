// @ts-check
import path from 'node:path';
import { defineConfig } from '@rspack/cli';

export default defineConfig({
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
