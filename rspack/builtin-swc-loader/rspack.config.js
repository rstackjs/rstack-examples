// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  entry: {
    main: './src/index.jsx',
  },
  resolve: {
    extensions: ['...', '.jsx'],
    alias: {
      '@swc/helpers': path.dirname(fileURLToPath(import.meta.resolve('@swc/helpers/package.json'))),
    },
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        type: 'css',
      },
      {
        test: /\.(?:js|mjs|jsx|ts|tsx)$/,
        use: {
          loader: 'builtin:swc-loader',
          /**
           * @type {import('@rspack/core').SwcLoaderOptions}
           */
          options: {
            detectSyntax: 'auto',
            jsc: {
              transform: {
                react: {
                  runtime: 'automatic',
                  development: !isProduction,
                },
              },
              experimental: {
                plugins: [
                  [
                    '@swc/plugin-remove-console', // need to use specific version to be compatible with rspack's internal swc version
                    {
                      exclude: ['error'],
                    },
                  ],
                  ['@swc/plugin-prefresh', {}],
                  ['@swc/plugin-emotion', {}],
                  ['@swc/plugin-loadable-components', {}],
                  [
                    '@swc/plugin-relay',
                    {
                      rootDir: import.meta.dirname,
                      artifactDirectory: 'src/__generated__',
                      language: 'typescript',
                    },
                  ],
                  ['@swc/plugin-styled-components', {}],
                  ['@swc/plugin-styled-jsx', {}],
                  ['@swc/plugin-transform-imports', {}],
                ],
              },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
});
