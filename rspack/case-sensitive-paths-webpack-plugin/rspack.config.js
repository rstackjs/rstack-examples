// @ts-check
import { defineConfig } from '@rspack/cli';
import CaseSensitivePlugin from 'case-sensitive-paths-webpack-plugin';

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
  plugins: [new CaseSensitivePlugin()],
});
