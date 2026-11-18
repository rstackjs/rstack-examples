import { pluginSolid } from '@rsbuild/plugin-solid';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  bundle: false,
  lib: [
    {
      id: 'compiled',
      dts: true,
      plugins: [pluginSolid()],
    },
    {
      id: 'source',
      output: {
        filename: {
          js: '[name].jsx',
        },
      },
      tools: {
        swc: {
          jsc: {
            transform: {
              react: {
                runtime: 'preserve',
              },
            },
          },
        },
        rspack: {
          module: {
            parser: {
              javascript: {
                jsx: true,
              },
            },
          },
        },
      },
    },
  ],
  output: {
    target: 'web',
  },
});
