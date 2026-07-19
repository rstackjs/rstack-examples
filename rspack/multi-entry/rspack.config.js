// @ts-check
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  entry: {
    index: './index.js',
    second: './second.js',
  },
  output: {
    publicPath: 'http://localhost:3000',
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      filename: 'index.html',
      chunks: ['index'],
    }),
    new rspack.HtmlRspackPlugin({
      filename: 'second.html',
      chunks: ['second'],
    }),
  ],
});
