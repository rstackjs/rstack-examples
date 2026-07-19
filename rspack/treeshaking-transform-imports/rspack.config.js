// @ts-check
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
/** @type {import('@rspack/core').Configuration} */

export default defineConfig({
  context: import.meta.dirname,
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'css',
      },
    ],
  },
  plugins: [new rspack.HtmlRspackPlugin()],
  optimization: {
    minimize: false,
    moduleIds: 'named',
    providedExports: true,
    sideEffects: true,
  },
});
