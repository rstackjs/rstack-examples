// @ts-check

import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'css',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    // Without using CssChunkingPlugin, the current splitChunks configuration will split CSS modules into multiple chunks, causing CSS style errors
    new rspack.experiments.CssChunkingPlugin({
      // options
    }),
  ],
  optimization: {
    minimize: false,
    splitChunks: {
      maxSize: 100,
      minSize: 0,
    },
  },
});
