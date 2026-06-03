import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';
import { tanstackStart } from '@tanstack/react-start/plugin/rsbuild';

export default defineConfig({
  mode: 'development',
  source: {
    include: [/[\\/]node_modules[\\/]/],
  },
  server: {
    port: 3000,
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
