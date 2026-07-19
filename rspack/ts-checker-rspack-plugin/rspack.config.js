// @ts-check
import { defineConfig } from '@rspack/cli';
import { TsCheckerRspackPlugin } from 'ts-checker-rspack-plugin';

export default defineConfig({
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
