// @ts-check
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
export default defineConfig({
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'builtin:lightningcss-loader',
            /** @type {import('@rspack/core').LightningcssLoaderOptions} */
            options: {
              targets: 'ie 10',
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
