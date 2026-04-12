// @ts-check

import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh';

/** @type {import('@rspack/cli').Configuration} */
export default defineConfig({
  entry: {
    main: './src/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                jsx: true,
              },
              externalHelpers: true,
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
      },
      {
        test: /\.css$/,
        use: ['builtin:lightningcss-loader'],
        type: 'css',
      },
    ],
  },
  resolve: {
    extensions: ['...', '.tsx', '.ts', '.jsx'],
  },
  plugins: [
    new ReactRefreshRspackPlugin(),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    process.env.RSDOCTOR === 'true' &&
      new RsdoctorRspackPlugin({
        features: ['bundle', 'plugins', 'loader'],
      }),
  ],
  experiments: {
    css: true,
  },
});
