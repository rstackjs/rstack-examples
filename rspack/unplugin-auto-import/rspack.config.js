import { defineConfig } from '@rspack/cli';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'rspack-vue-loader';
import AutoImport from 'unplugin-auto-import/rspack';

export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue'],
    }),
    new VueLoaderPlugin(),
    // the aims of `HtmlWebpackPlugin` is ensure
    // `unplugin-auto-import` will not includes `index.html`
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'css',
      },
      {
        test: /\.vue$/,
        loader: 'rspack-vue-loader',
        options: {
          experimentalInlineMatchResource: true,
        },
      },
    ],
  },
});
