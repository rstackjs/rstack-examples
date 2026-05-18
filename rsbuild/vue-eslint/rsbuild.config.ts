import { defineConfig } from '@rsbuild/core';
import { pluginEslint } from '@rsbuild/plugin-eslint';
import { pluginVue } from '@rsbuild/plugin-vue';

export default defineConfig({
  plugins: [
    pluginVue(),
    pluginEslint({
      eslintPluginOptions: {
        configType: 'eslintrc',
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        fix: true,
      },
    }),
  ],
});
