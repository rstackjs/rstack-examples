const { rspack } = require('@rspack/core');
const { ReactRefreshRspackPlugin } = require('@rspack/plugin-react-refresh');

/** @type {import('@rspack/cli').Configuration} */
const config = {
  entry: {
    main: './src/index.jsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'css',
      },
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
        test: /\.svg$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ReactRefreshRspackPlugin(),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: 'public',
        },
      ],
    }),
  ],
};
module.exports = config;
