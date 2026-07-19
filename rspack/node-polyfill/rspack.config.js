// @ts-check
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

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
  context: import.meta.dirname,
  entry: {
    main: './src/index.js',
  },
  plugins: [
    new NodePolyfillPlugin(),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
});
