import rspack from '@rspack/core';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  name: 'server',
  entry: {
    server: path.resolve(__dirname, 'server', 'server.ts'),
  },
  mode: 'production',
  output: {
    module: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  externalsType: 'node-commonjs',
  externals: ['react', 'express', 'react-dom/server'],
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'builtin:swc-loader',
        options: {
          detectSyntax: 'auto',
        },
      },
    ],
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new rspack.BannerPlugin({
      banner: `
import { fileURLToPath as __rspack_fileURLToPath } from 'url';
import { dirname as __rspack_dirname } from 'path'
const __filename = __rspack_fileURLToPath(import.meta.url);
const __dirname = __rspack_dirname(__filename);
    `,
      raw: true,
    }),
    new rspack.CopyRspackPlugin({
      patterns: [{ context: 'server', from: 'views', to: 'views' }],
    }),
  ],
};
