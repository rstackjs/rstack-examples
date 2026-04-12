// @ts-check
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

/** @type {import("@rspack/core").Configuration} */
export default defineConfig({
  entry: {
    main: './src/index.ts',
  },
  mode: 'production',
  optimization: {
    // This is the feature that enables inlining, it's enabled by default in production mode
    inlineExports: true,
    // disable minimize so you can understand the output
    minimize: false,
  },
  resolve: {
    extensions: ['.ts', '...'],
  },
  plugins: [
    new rspack.DefinePlugin({
      ENV: JSON.stringify('mobile'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'builtin:swc-loader',
          /** @type {import("@rspack/core").SwcLoaderOptions} */
          options: {
            detectSyntax: 'auto',
            jsc: {
              target: 'es2015', // use target es2015 or greater so swc won't transform const to var
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
});
