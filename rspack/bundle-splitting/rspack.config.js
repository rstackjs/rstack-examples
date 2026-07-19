// @ts-check
import { rspack } from '@rspack/core';
import { defineConfig } from '@rspack/cli';

export default defineConfig({
  entry: {
    main: './index.js',
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
    parser: {
      asset: {
        dataUrlCondition: {
          maxSize: 1,
        },
      },
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /common/,
        },
      },
    },
  },
  plugins: [new rspack.HtmlRspackPlugin()],
});
