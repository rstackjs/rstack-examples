import { defineConfig } from '@rsbuild/core';
import { pluginEslint } from '@rsbuild/plugin-eslint';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginEslint({
      eslintPluginOptions: {
        configType: 'eslintrc',
      },
    }),
  ],
});
