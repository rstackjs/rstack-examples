// @ts-check
import { defineConfig } from '@rspack/cli';
import CaseSensitivePlugin from 'case-sensitive-paths-webpack-plugin';

export default defineConfig({
  plugins: [new CaseSensitivePlugin()],
});
