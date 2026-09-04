import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  bundle: false,
  dts: true,
  output: {
    target: 'web',
  },
  plugins: [
    pluginReact(),
    pluginLess({
      lessLoaderOptions: {
        additionalData: `
          @primary-color: #007acc;
          @logo-size: 100px;
          @text-size: 50px;
        `,
      },
    }),
  ],
});
