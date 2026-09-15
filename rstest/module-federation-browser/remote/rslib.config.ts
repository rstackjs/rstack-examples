import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';
import { devDependencies } from './package.json';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      dts: true,
      output: {
        distPath: './dist/esm',
      },
    },
    {
      format: 'mf',
      output: {
        distPath: './dist/mf',
        // Chunks are fetched by the host page, so they must resolve against
        // the remote's own origin instead of the host's.
        assetPrefix: 'http://localhost:3001/mf',
      },
      // `rslib mf-dev` serves the container from the same URL.
      dev: {
        assetPrefix: 'http://localhost:3001/mf',
      },
      plugins: [
        pluginModuleFederation(
          {
            name: 'remote',
            filename: 'remoteEntry.js',
            exposes: {
              './Button': './src/Button.tsx',
            },
            shared: {
              react: { singleton: true, requiredVersion: devDependencies.react },
              'react-dom': { singleton: true, requiredVersion: devDependencies['react-dom'] },
            },
          },
          {},
        ),
      ],
    },
  ],
  output: {
    target: 'web',
  },
  // just for dev
  server: {
    port: 3001,
  },
  plugins: [pluginReact()],
});
