import { defineConfig } from '@rstest/core';

export default defineConfig({
  // Reuse the worker (and its Chromium browser) across test files.
  isolate: false,
});
