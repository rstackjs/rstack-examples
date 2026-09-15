import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
      output: {
        distPath: './dist/esm',
      },
    },
    {
      format: 'mf',
      syntax: ['node 18'],
      output: {
        distPath: './dist/mf',
        filenameHash: false,
      },
      plugins: [
        pluginModuleFederation(
          {
            name: 'remote',
            // Use .cjs for the CommonJS entry in this "type": "module" package.
            filename: 'remoteEntry.cjs',
            exposes: {
              './formatPrice': './src/formatPrice.ts',
              './math': './src/math.ts',
            },
          },
          { target: 'node' },
        ),
      ],
    },
  ],
  output: {
    target: 'node',
  },
});
