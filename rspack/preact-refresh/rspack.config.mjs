// @ts-check

import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import PreactRefreshPlugin from '@rspack/plugin-preact-refresh';

const dev = process.env.NODE_ENV === 'development';
/** @type {import('@rspack/cli').Configuration} */
export default defineConfig({
  entry: {
    main: './src/index.jsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'css',
      },
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            detectSyntax: 'auto',
            jsc: {
              experimental: {
                plugins: [
                  [
                    '@swc/plugin-prefresh', // enable prefresh specific transformation
                    {},
                  ],
                ],
              },
              externalHelpers: true,
              preserveAllComments: false,
              transform: {
                react: {
                  runtime: 'automatic',
                  pragma: 'h',
                  pragmaFrag: 'Fragment',
                  throwIfNamespace: true,
                  useBuiltins: false,
                  development: dev,
                  refresh: dev, // enable react hooks hmr compatiblity
                },
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
      scriptLoading: 'blocking',
    }),
    dev && new rspack.HotModuleReplacementPlugin(),
    dev && new PreactRefreshPlugin(),
  ],
});
