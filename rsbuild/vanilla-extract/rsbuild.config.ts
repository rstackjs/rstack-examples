import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';

export default defineConfig({
  plugins: [
    pluginReact({
      reactRefreshOptions: {
        exclude: [/node_modules/, /\.css\.ts$/],
      },
    }),
  ],
  splitChunks: {
    cacheGroups: {
      vanillaCss: {
        minSize: 0,
        chunks: 'all',
        test: /@vanilla-extract\/webpack-plugin/,
        priority: 1000,
        name: process.env.NODE_ENV === 'development' && 'vanilla-extract',
      },
    },
  },
  tools: {
    rspack: {
      plugins: [new VanillaExtractPlugin()],
    },
  },
});
