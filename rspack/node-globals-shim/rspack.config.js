// @ts-check
import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

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
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new rspack.ProvidePlugin({
      process: path.resolve(import.meta.dirname, './src/process-shim.js'),
    }),
  ],
});
