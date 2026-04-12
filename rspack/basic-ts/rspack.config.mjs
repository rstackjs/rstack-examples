// @ts-check
import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  entry: './src/index.ts',
  resolve: {
    tsConfig: {
      configFile: path.resolve(import.meta.dirname, 'tsconfig.json'),
    },
    extensions: ['...', '.ts'],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|ts|mts|cts)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            /**
             * @type {import('@rspack/core').SwcLoaderOptions}
             */
            options: {
              detectSyntax: 'auto',
            },
          },
        ],
      },
    ],
  },
});
