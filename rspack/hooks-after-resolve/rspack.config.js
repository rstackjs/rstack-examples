// @ts-check
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

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
  entry: './src/index.js',
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    {
      /**
       *
       * @param {import('@rspack/core').Compiler} compiler
       */
      apply(compiler) {
        compiler.hooks.normalModuleFactory.tap('nmf', (nmf) => {
          nmf.hooks.afterResolve.tap('afterResolver', (data) => {
            console.log('data:', data.createData?.resource);
          });
        });
      },
    },
  ],
});
