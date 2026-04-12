// @ts-check

import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { sentryWebpackPlugin } from '@sentry/webpack-plugin';
export default defineConfig({
  entry: './src/index.js',
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    sentryWebpackPlugin({}),
  ],
});
