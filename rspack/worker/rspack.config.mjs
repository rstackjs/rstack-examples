// @ts-check

import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  entry: './example.js',
  context: import.meta.dirname,
  output: {
    path: path.join(import.meta.dirname, 'dist'),
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
});
