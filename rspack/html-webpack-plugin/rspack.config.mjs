// @ts-check
import { defineConfig } from '@rspack/cli';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default defineConfig({
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
});
