// @ts-check
import { defineConfig } from '@rspack/cli';
import GeneratePackageJsonPlugin from 'generate-package-json-webpack-plugin';

const basePackage = {
  name: 'my-module',
  version: '1.0.0',
  main: './main.js',
  engines: {
    node: '>= 14',
  },
};

export default defineConfig({
  plugins: [new GeneratePackageJsonPlugin(basePackage, {})],
});
