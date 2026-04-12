// @ts-check

import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { RunScriptWebpackPlugin } from 'run-script-webpack-plugin';

/** @type {import('@rspack/cli').Configuration} */
export default defineConfig({
  context: import.meta.dirname,
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
  externals: [
    function (obj, callback) {
      const resource = obj.request;
      const lazyImports = [
        '@nestjs/core',
        '@nestjs/microservices',
        '@nestjs/platform-express',
        'cache-manager',
        'class-validator',
        'class-transformer',
        // ADD THIS
        '@nestjs/microservices/microservices-module',
        '@nestjs/websockets',
        'socket.io-adapter',
        'utf-8-validate',
        'bufferutil',
        'kerberos',
        '@mongodb-js/zstd',
        'snappy',
        '@aws-sdk/credential-providers',
        'mongodb-client-encryption',
        '@nestjs/websockets/socket-module',
        'bson-ext',
        'snappy/package.json',
        'aws4',
      ];
      if (!lazyImports.includes(resource)) {
        return callback();
      }
      try {
        import.meta.resolve(resource);
      } catch (err) {
        callback(null, resource);
      }
      callback();
    },
  ],
});
