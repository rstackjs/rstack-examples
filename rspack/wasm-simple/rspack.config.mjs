// @ts-check

import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
/** @type {import('@rspack/cli').Configuration} */
export default defineConfig({
  entry: {
    main: './example.js',
  },
  output: {
    webassemblyModuleFilename: '[hash].wasm',
  },
  plugins: [new rspack.HtmlRspackPlugin()],
});
