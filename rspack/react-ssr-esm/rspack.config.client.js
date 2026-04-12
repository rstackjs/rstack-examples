import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { RspackManifestPlugin } from 'rspack-manifest-plugin';
export default defineConfig({
  name: 'client',
  entry: {
    client: path.resolve(import.meta.dirname, 'client/client.tsx'),
  },
  mode: 'production',
  output: {
    clean: true,
    module: true,
    path: path.resolve(import.meta.dirname, 'dist/static'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
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
  target: 'web',
  plugins: [new RspackManifestPlugin()],
});
