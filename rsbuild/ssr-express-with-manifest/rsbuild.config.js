import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  environments: {
    web: {
      source: {
        entry: {
          index: './src/index',
        },
      },
      output: {
        manifest: true,
      },
    },
    node: {
      output: {
        module: true,
        target: 'node',
        distPath: {
          root: 'dist/server',
        },
      },
      source: {
        entry: {
          index: './src/index.server',
        },
      },
    },
  },
  tools: {
    htmlPlugin: false,
  },
});
