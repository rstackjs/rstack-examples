// @ts-check
import { defineConfig } from '@rspack/cli';

export default defineConfig({
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  externalsType: 'commonjs',
  output: {
    chunkFormat: 'commonjs',
    filename: '[name].cjs',
    library: {
      type: 'commonjs',
    },
  },
  optimization: {
    minimize: false, // no need to minify for library
  },
});
