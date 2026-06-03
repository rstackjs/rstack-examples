import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';
import { tanstackStart } from '@tanstack/react-start/plugin/rsbuild';

export default defineConfig({
  source: {
    // RSC needs SWC to compile dependencies so directives like "use client" can be detected.
    // The TanStack Rsbuild plugin will add this automatically when RSC is enabled in the future.
    include: [{ not: /[\\/]core-js[\\/]/ }],
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
