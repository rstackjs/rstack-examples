const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname,
  target: 'node',
  entry: {
    main: ['@rspack/core/hot/poll?100', './src/main.ts'],
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            detectSyntax: 'auto',
            jsc: {
              parser: {
                decorators: true,
              },
            },
          },
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  externalsType: 'commonjs',
  plugins: [
    !process.env.BUILD &&
      new RunScriptWebpackPlugin({
        name: 'main.js',
        autoRestart: false,
      }),
  ],
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
module.exports = config;
