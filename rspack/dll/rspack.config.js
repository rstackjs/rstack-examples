// @ts-check
import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.js', '.jsx'],
  },
  entry: {
    alpha: ['./alpha', './a', 'lodash'],
    beta: ['./beta', './b', './c'],
  },
  output: {
    path: path.resolve(import.meta.dirname, 'dist'),
    filename: '[name].dll.js',
    library: '[name]_dll_lib',
  },
  plugins: [
    new rspack.DllPlugin({
      path: path.join(import.meta.dirname, 'dist', '[name].manifest.json'),
      name: '[name]_dll_lib',
    }),
  ],
});
