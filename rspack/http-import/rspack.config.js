// @ts-check
import { rspack } from '@rspack/core';
import { defineConfig } from '@rspack/cli';

export default defineConfig({
  entry: './src/index.js',
  experiments: {
    buildHttp: {
      allowedUris: ['https://www.unpkg.com'],
      lockfileLocation: 'http-import.lock',
    },
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
});
