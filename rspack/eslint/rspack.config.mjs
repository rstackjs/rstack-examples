// @ts-check
import { defineConfig } from '@rspack/cli';
import EslintPlugin from 'eslint-rspack-plugin';

export default defineConfig({
  context: import.meta.dirname,
  entry: {
    main: './src/index.js',
  },
  plugins: [new EslintPlugin()],
});
