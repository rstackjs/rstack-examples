// @ts-check
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  context: import.meta.dirname,
  entry: {
    main: './src/index.jsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'css',
      },
      {
        test: /\.module.css$/,
        type: 'css/module',
        parser: {
          namedExports: false,
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['solid']],
              plugins: ['solid-refresh/babel'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
});
