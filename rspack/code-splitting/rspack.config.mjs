// @ts-check
import { rspack } from '@rspack/core';
import { defineConfig } from '@rspack/cli';

export default defineConfig({
  entry: {
    main: './index.js',
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: 'index.html',
    }),
  ],
});
