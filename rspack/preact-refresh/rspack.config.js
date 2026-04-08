const { rspack } = require('@rspack/core');
const PreactRefreshPlugin = require('@rspack/plugin-preact-refresh');
const dev = process.env.NODE_ENV === 'development';
/** @type {import('@rspack/cli').Configuration} */
const config = {
  entry: {
    main: './src/index.jsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'css',
      },
      {
        test: /\.jsx$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              experimental: {
                plugins: [
                  [
                    '@swc/plugin-prefresh', // enable prefresh specific transformation
                    {},
                  ],
                ],
              },
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              externalHelpers: true,
              preserveAllComments: false,
              transform: {
                react: {
                  runtime: 'automatic',
                  pragma: 'h',
                  pragmaFrag: 'Fragment',
                  throwIfNamespace: true,
                  useBuiltins: false,
                  development: dev,
                  refresh: dev, // enable react hooks hmr compatiblity
                },
              },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
      scriptLoading: 'blocking',
    }),
    dev && new rspack.HotModuleReplacementPlugin(),
    dev && new PreactRefreshPlugin(),
  ],
};
module.exports = config;
