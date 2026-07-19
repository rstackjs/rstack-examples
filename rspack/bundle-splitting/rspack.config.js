// @ts-check
import { rspack } from '@rspack/core';
import { defineConfig } from '@rspack/cli';

export default defineConfig({
  entry: {
    main: './index.js',
  },
  module: {
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
