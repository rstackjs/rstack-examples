import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import rspack from '@rspack/core';
import { sveltePreprocess } from 'svelte-preprocess';

const isProd = process.env.NODE_ENV === 'production';
const swcLoaderConfig = {
  loader: 'builtin:swc-loader',
  /**
   * @type {import('@rspack/core').SwcLoaderOptions}
   */
  options: {
    detectSyntax: 'auto',
  },
};

const svelteLoaderConfig = {
  loader: 'svelte-loader',
  options: {
    compilerOptions: {
      dev: !isProd,
    },
    emitCss: isProd,
    hotReload: !isProd,
    preprocess: sveltePreprocess({ sourceMap: !isProd, postcss: true }),
  },
};

export default defineConfig({
  entry: {
    index: './src/index.ts',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'css',
      },
      {
        test: /\.(?:js|ts)$/,
        use: [swcLoaderConfig],
      },
      {
        test: /\.svelte$/,
        use: [svelteLoaderConfig],
      },
      {
        test: /\.(?:svelte\.js|svelte\.ts)$/,
        use: [svelteLoaderConfig, swcLoaderConfig],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      title: 'Svelte App',
      template: path.join(import.meta.dirname, 'index.html'),
    }),
  ],
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  devServer: {
    historyApiFallback: true,
  },
});
