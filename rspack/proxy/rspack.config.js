// @ts-check
import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig((env, argv) => {
  console.log('env:', env, argv);
  return {
    context: import.meta.dirname,
    entry: {
      main: './index.js',
    },
    output: {
      path: path.resolve(import.meta.dirname, 'dist'),
    },
    devServer: {
      proxy: [
        {
          context: ['/api', '/auth'],
          target: 'http://localhost:3000',
        },
      ],
    },
  };
});
