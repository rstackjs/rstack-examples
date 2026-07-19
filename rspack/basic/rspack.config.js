// @ts-check
import { rspack } from '@rspack/core';
import { defineConfig } from '@rspack/cli';

export default defineConfig({
  entry: './src/index.js',
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
});
