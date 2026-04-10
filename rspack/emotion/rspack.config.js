const { rspack } = require('@rspack/core');
/** @type {import('@rspack/cli').Configuration} */
const config = {
  entry: {
    main: './src/index.jsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        loader: 'builtin:swc-loader',
        options: {
          detectSyntax: 'auto',
          jsc: {
            transform: {
              react: {
                importSource: '@emotion/react',
                runtime: 'automatic',
              },
            },
            experimental: {
              plugins: [['@swc/plugin-emotion', {}]],
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
};
module.exports = config;
