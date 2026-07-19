import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation(
      {
        name: 'rsbuild_remote',
        exposes: {
          '.': './src/App.tsx',
        },
        shared: {
          react: {
            singleton: true,
          },
          'react-dom': {
            singleton: true,
          },
        },
      },
      {},
    ),
  ],
  server: {
    cors: {
      origin: 'http://localhost:3000',
    },
    port: 3002,
  },
});
