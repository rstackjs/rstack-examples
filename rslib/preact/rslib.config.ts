import { pluginPreact } from '@rsbuild/plugin-preact';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  bundle: false,
  dts: true,
  output: {
    target: 'web',
  },
  plugins: [pluginPreact()],
});
