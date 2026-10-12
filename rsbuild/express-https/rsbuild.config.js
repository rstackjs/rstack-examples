import { defineConfig } from '@rsbuild/core';
import { pluginBasicSsl } from '@rsbuild/plugin-basic-ssl';

export default defineConfig({
  plugins: [pluginBasicSsl()],
  // Custom Express owns the HTTPS listen socket; keep Rsbuild in middleware mode.
  server: {
    middlewareMode: true,
  },
});
