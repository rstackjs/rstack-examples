// @ts-check

import { defineConfig } from '@rspack/cli';
export default defineConfig({
  context: import.meta.dirname,
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /src/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
          },
        ],
      },
    ],
  },
});
