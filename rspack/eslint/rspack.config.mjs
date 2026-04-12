// @ts-check

import { defineConfig } from '@rspack/cli';
import EslintPlugin from 'eslint-rspack-plugin';
/** @type {import('@rspack/cli').Configuration} */
export default defineConfig({
  context: import.meta.dirname,
  entry: {
    main: './src/index.js',
  },
  plugins: [new EslintPlugin()],
});
