// @ts-check

import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
/** @type {import('@rspack/cli').Configuration} */
export default defineConfig({
  context: import.meta.dirname,
  entry: {
    main: './src/index.js',
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new rspack.SwcJsMinimizerRspackPlugin({
      extractComments: true,
    }),
  ],
});
