// @ts-check
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
export default defineConfig({
  context: import.meta.dirname,
  entry: {
    main: './src/main.jsx',
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
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@vue/babel-plugin-jsx'],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
  ],
});
