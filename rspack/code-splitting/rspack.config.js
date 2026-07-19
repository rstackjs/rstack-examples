// @ts-check
import { rspack } from '@rspack/core';
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
    main: './index.js',
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: 'index.html',
    }),
  ],
});
