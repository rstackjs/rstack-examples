// @ts-check
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: '@tailwindcss/webpack',
            options: {
              // ...
            },
          },
        ],
        type: 'css',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
});
