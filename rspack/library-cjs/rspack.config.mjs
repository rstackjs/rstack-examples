// @ts-check

import { defineConfig } from '@rspack/cli';

export default defineConfig({
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  externalsType: 'commonjs',
  output: {
    chunkFormat: 'commonjs',
    library: {
      type: 'commonjs',
    },
  },
  optimization: {
    minimize: false, // no need to minify for library
  },
});
