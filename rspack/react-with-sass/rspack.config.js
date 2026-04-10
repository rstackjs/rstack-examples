const { rspack } = require('@rspack/core');
/** @type {import('@rspack/cli').Configuration} */
const config = {
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
        test: /\.s[ac]ss$/,
        loader: 'sass-loader',
        type: 'css',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
};
module.exports = config;
