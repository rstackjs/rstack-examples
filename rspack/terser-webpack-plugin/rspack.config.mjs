// @ts-check

import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import TerserPlugin from 'terser-webpack-plugin';
import { StatsWriterPlugin } from 'webpack-stats-plugin';

export default defineConfig({
  plugins: [new StatsWriterPlugin()],
  optimization: {
    minimizer: [new TerserPlugin(), new rspack.LightningCssMinimizerRspackPlugin()],
  },
});
