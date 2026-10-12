import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  // Custom Express owns the HTTPS listen socket; keep Rsbuild in middleware mode.
  server: {
    middlewareMode: true,
  },
});
