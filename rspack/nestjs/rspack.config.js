// @ts-check
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { RunScriptWebpackPlugin } from 'run-script-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  context: import.meta.dirname,
  target: 'node',
  entry: {
    main: isDev ? ['@rspack/core/hot/poll?100', './src/main.ts'] : './src/main.ts',
  },
  output: {
    clean: true,
    filename: '[name].cjs',
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
              transform: {
                legacyDecorator: true,
                decoratorMetadata: true,
              },
            },
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin({
        minimizerOptions: {
          // We need to disable mangling and compression for class names and function names for Nest.js to work properly
          // The execution context class returns a reference to the class/handler function, which is for example used for applying metadata using decorators
          // https://docs.nestjs.com/fundamentals/execution-context#executioncontext-class
          compress: {
            keep_classnames: true,
            keep_fnames: true,
          },
          mangle: {
            keep_classnames: true,
            keep_fnames: true,
          },
        },
      }),
    ],
  },
  externalsType: 'commonjs',
  plugins: isDev
    ? [
        new RunScriptWebpackPlugin({
          name: 'main.cjs',
          autoRestart: false,
        }),
        new rspack.HotModuleReplacementPlugin(),
      ]
    : [],
  externals: [
    nodeExternals({
      allowlist: [/@rspack\/core\/hot\/poll/],
    }),
  ],
});
