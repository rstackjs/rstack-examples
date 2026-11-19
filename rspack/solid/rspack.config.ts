import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  context: import.meta.dirname,
  entry: {
    main: './src/index.jsx',
  },
  resolve: {
    conditionNames: ['solid', '...'],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'solid-loader',
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
