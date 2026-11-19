import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  context: import.meta.dirname,
  entry: {
    main: './src/index.jsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
    conditionNames: ['solid', '...'],
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.[cm]?[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: { detectSyntax: 'auto' },
          },
          {
            loader: 'solid-loader',
            // Leave plain TypeScript to SWC.
            options: { scriptRegex: /\.[cm]?(?:jsx?|tsx)$/ },
          },
        ],
      },
      {
        // Solid loads hydration modules from URLs at runtime.
        descriptionData: { name: /^@solidjs\/web$/ },
        parser: { importDynamic: false },
      },
      {
        test: /\.css$/,
        type: 'css',
      },
      {
        test: /\.module.css$/,
        type: 'css/module',
        parser: {
          namedExports: false,
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
});
