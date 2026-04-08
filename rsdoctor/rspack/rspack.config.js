const { rspack } = require('@rspack/core');
const { ReactRspackRefreshPlugin } = require('@rspack/plugin-react-refresh');
const { RsdoctorRspackPlugin } = require('@rsdoctor/rspack-plugin');

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
  entry: {
    main: './src/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                jsx: true,
              },
              externalHelpers: true,
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
      },
      {
        test: /\.css$/,
        use: ['builtin:lightningcss-loader'],
        type: 'css',
      },
    ],
  },
  resolve: {
    extensions: ['...', '.tsx', '.ts', '.jsx'],
  },
  plugins: [
    new ReactRspackRefreshPlugin(),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    process.env.RSDOCTOR === 'true' &&
      new RsdoctorRspackPlugin({
        features: ['bundle', 'plugins', 'loader'],
      }),
  ],
  experiments: {
    css: true,
  },
};
