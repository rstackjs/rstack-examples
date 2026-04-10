// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: './src/index.ts',
  resolve: {
    tsConfig: {
      configFile: path.resolve(__dirname, 'tsconfig.json'),
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
