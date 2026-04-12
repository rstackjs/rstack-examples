// @ts-check

import { defineConfig } from '@rspack/cli';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default defineConfig({
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'json',
    }),
  ],
});
