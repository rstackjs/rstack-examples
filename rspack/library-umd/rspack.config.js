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
  output: {
    filename: '[name].cjs',
    globalObject: 'globalThis',
    library: {
      type: 'umd',
      name: 'rspack_library',
    },
  },
  optimization: {
    minimize: false, // no need to minify for library
  },
});
