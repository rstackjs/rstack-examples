const { rspack } = require('@rspack/core');
const path = require('path');
/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname,
  entry: {
    main: ['./src/index.jsx'],
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
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
      {
        test: /.css$/,
        type: 'css',
      },
      {
        test: /.less$/,
        loader: 'less-loader',
        type: 'css',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
};
module.exports = config;
