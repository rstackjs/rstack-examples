const { rspack } = require('@rspack/core');
const { ReactRspackRefreshPlugin } = require('@rspack/plugin-react-refresh');

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('@rspack/cli').Configuration} */
const config = {
  entry: { main: './src/index.tsx' },
  devtool: false,
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
            plugins: [!isProduction && require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: './index.html' }),
    !isProduction && new ReactRspackRefreshPlugin(),
  ],
};

module.exports = config;
