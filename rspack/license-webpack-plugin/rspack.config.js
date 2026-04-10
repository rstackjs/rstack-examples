const { defineConfig } = require('@rspack/cli');
const { LicenseWebpackPlugin } = require('license-webpack-plugin');

module.exports = defineConfig({
  entry: {
    main: './src/index.jsx',
  },
  plugins: [
    new LicenseWebpackPlugin({
      stats: {
        warnings: false,
        errors: false,
      },
      perChunkOutput: true,
      outputFilename: `3rdpartylicenses.txt`,
    }),
  ],
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
    ],
  },
});
