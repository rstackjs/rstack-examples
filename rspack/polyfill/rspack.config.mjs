// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  context: import.meta.dirname,
  entry: {
    main: './src/index.js',
  },
  resolve: {
    alias: {
      'core-js': path.dirname(fileURLToPath(import.meta.resolve('core-js'))),
    },
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        loader: 'builtin:swc-loader',
        options: {
          detectSyntax: 'auto',
          env: {
            targets: ['> 0.01%', 'not dead', 'not op_mini all'],
            mode: 'usage',
            coreJs: '3.26',
          },
        },
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
});
