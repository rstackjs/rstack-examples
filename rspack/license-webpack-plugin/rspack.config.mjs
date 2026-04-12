// @ts-check

import { defineConfig } from '@rspack/cli';
import { LicenseWebpackPlugin } from 'license-webpack-plugin';

export default defineConfig({
  entry: {
    main: './src/index.jsx',
  },
  plugins: [
    new LicenseWebpackPlugin({
      stats: {
        warnings: false,
        errors: false,
      },
      perChunkOutput: true,
      outputFilename: `3rdpartylicenses.txt`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            detectSyntax: 'auto',
            jsc: {
              externalHelpers: true,
              preserveAllComments: false,
              transform: {
                react: {
                  runtime: 'automatic',
                  throwIfNamespace: true,
                  useBuiltins: false,
                },
              },
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
});
