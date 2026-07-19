// @ts-check
import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  entry: './index',
  output: {
    path: path.resolve(import.meta.dirname, 'dist'),
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new rspack.DllReferencePlugin({
      manifest: path.resolve(import.meta.dirname, '../dll/dist/alpha.manifest.json'),
      extensions: ['.js', '.ts'],
    }),
    new rspack.DllReferencePlugin({
      manifest: path.resolve(import.meta.dirname, '../dll/dist/beta.manifest.json'),
      scope: 'beta',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
  mode: 'development',
});
