// @ts-check
import { defineConfig } from '@rspack/cli';

export default defineConfig({
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  externalsType: 'module-import',
  output: {
    module: true,
    chunkFormat: 'module',
    library: {
      type: 'modern-module',
    },
    chunkLoading: 'import',
    workerChunkLoading: 'import',
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
      javascript: {
        importMeta: false, // keep import.meta for runtime
      },
    },
  },
  optimization: {
    concatenateModules: true,
    avoidEntryIife: true,
    minimize: false, // no need to minify for library
  },
});
