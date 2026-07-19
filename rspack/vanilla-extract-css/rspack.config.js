// @ts-check
import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

/** @type {import('@rspack/core').Configuration} */

export default defineConfig({
  entry: path.join(import.meta.dirname, './src/index.tsx'),
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|jsx|ts|tsx)$/,
        exclude: [/node_modules/],
        loader: 'builtin:swc-loader',
        options: {
          detectSyntax: 'auto',
          jsc: {
            externalHelpers: true,
            preserveAllComments: false,
            transform: {
              react: {
                runtime: 'automatic',
                pragma: 'React.createElement',
                pragmaFrag: 'React.Fragment',
                throwIfNamespace: true,
                useBuiltins: false,
              },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.css$/i,
        type: 'css',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new VanillaExtractPlugin()],
});
