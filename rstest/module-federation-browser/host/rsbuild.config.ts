import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { mfConfig } from './module-federation.config';

export default defineConfig({
  server: {
    port: 3002,
  },
  plugins: [pluginReact(), pluginModuleFederation(mfConfig)],
});
