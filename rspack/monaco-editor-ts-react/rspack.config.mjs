// @ts-check

import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  entry: {
    app: './src/index.tsx',
  },
  devServer: {
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    tsConfig: path.resolve(import.meta.dirname, 'tsconfig.json'),
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
      {
        test: /\.(?:js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            detectSyntax: 'auto',
            jsc: {
              externalHelpers: true,
              preserveAllComments: false,
              transform: {
                react: {
                  runtime: 'automatic',
                  throwIfNamespace: true,
                  useBuiltins: false,
                },
              },
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './src/index.html',
    }),
  ],
});
