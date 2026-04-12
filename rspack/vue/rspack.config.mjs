// @ts-check

import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { VueLoaderPlugin } from 'rspack-vue-loader';

/** @type {import('@rspack/cli').Configuration} */
export default defineConfig({
  context: import.meta.dirname,
  entry: {
    main: './src/main.js',
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new VueLoaderPlugin(),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'rspack-vue-loader',
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.(?:js|mjs|cjs|ts|mts|cts)$/,
        loader: 'builtin:swc-loader',
        options: {
          detectSyntax: 'auto',
        },
        type: 'javascript/auto',
      },
      {
        test: /\.css$/,
        type: 'css',
      },
      {
        test: /\.less$/,
        loader: 'less-loader',
        type: 'css',
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
    ],
  },
});
