// @ts-check
import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('@rspack/core').Configuration} */

export default defineConfig({
  entry: './src/index.js',
  context: import.meta.dirname,
  output: {
    // set uniqueName explicitly to make react-refresh works
    uniqueName: 'app',
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        include: path.resolve(import.meta.dirname, 'src'),
        use: {
          loader: 'builtin:swc-loader',
          options: {
            detectSyntax: 'auto',
            jsc: {
              transform: {
                react: {
                  runtime: 'automatic',
                  refresh: !isProduction,
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new rspack.container.ModuleFederationPluginV1({
      // List of remotes with URLs
      remotes: {
        'mfe-b': 'mfeBBB@http://localhost:8081/mfeBBB.js',
        'mfe-c': 'mfeCCC@http://localhost:8082/mfeCCC.js',
      },

      // list of shared modules with optional options
      shared: {
        // specifying a module request as shared module
        // will provide all used modules matching this name (version from package.json)
        // and consume shared modules in the version specified in dependencies from package.json
        // (or in dev/peer/optionalDependencies)
        // So it use the highest available version of this package matching the version requirement
        // from package.json, while providing it's own version to others.
        react: {
          singleton: true, // make sure only a single react module is used
        },
      },
    }),
    !isProduction && new ReactRefreshRspackPlugin(),
  ],
  devServer: {
    port: 8080,
  },
});
