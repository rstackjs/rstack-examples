// @ts-check
import { defineConfig } from '@rspack/cli';

export default defineConfig({
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    library: {
      type: 'umd',
      name: 'rspack_library',
    },
  },
  optimization: {
    minimize: false, // no need to minify for library
  },
});
