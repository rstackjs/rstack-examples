// @ts-check

import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default defineConfig({
  entry: {
    app: './index.js',
  },
  output: {
    globalObject: 'self',
    filename: '[name].bundle.js',
    path: path.resolve(import.meta.dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'css',
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: './index.html' }),
    new MonacoWebpackPlugin({
      languages: ['typescript', 'javascript', 'css'],
    }),
  ],
});
