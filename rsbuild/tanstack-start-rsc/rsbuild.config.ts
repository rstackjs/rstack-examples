import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';
import { tanstackStart } from '@tanstack/react-start/plugin/rsbuild';

export default defineConfig({
  source: {
    include: [/[\\/]node_modules[\\/]/],
  },
  plugins: [
    pluginReact(),
    pluginTailwindcss(),
    tanstackStart({
      rsc: {
        enabled: true,
      },
    }),
  ],
});
