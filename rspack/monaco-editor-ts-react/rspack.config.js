const { rspack } = require('@rspack/core');
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  devServer: {
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    tsConfig: path.resolve(__dirname, 'tsconfig.json'),
  },
  output: {
    globalObject: 'self',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'css',
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
      },
      {
        test: /\.(?:js|mjs|jsx|ts|tsx)$/,
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
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './src/index.html',
    }),
  ],
};
