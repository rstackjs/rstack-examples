// @ts-check

import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
/** @type {import('@rspack/cli').Configuration} */
export default defineConfig({
  context: import.meta.dirname,
  entry: {
    main: './src/index.js',
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        resourceQuery: /url/,
        type: 'asset',
      },
      {
        test: /complex\.worklet/,
        use: [
          {
            loader: './loader/worklet-loader.js',
          },
        ],
        type: 'asset',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
});
