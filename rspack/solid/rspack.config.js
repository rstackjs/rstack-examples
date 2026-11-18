// @ts-check
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  context: import.meta.dirname,
  entry: {
    main: './src/index.jsx',
  },
  resolve: {
    conditionNames: ['solid', '...'],
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        // Solid loads hydration modules from runtime URLs.
        descriptionData: { name: /^@solidjs\/web$/ },
        parser: { importDynamic: false },
      },
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
        test: /\.[jt]sx$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: { detectSyntax: 'auto' },
          },
          {
            loader: fileURLToPath(new URL('./solid-loader.js', import.meta.url)),
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
