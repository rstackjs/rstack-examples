// @ts-check

import { defineConfig } from '@rspack/cli';
import { StatsWriterPlugin } from 'webpack-stats-plugin';

export default defineConfig({
  plugins: [new StatsWriterPlugin()],
});
