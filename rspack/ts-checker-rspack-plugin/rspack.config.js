const { defineConfig } = require('@rspack/cli');
const { TsCheckerRspackPlugin } = require('ts-checker-rspack-plugin');

module.exports = defineConfig({
  entry: './src/index.ts',
  plugins: [new TsCheckerRspackPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              detectSyntax: 'auto',
            },
          },
        ],
      },
    ],
  },
});
