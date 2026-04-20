import { defineConfig } from '@rstest/core';

export default defineConfig({
  browser: {
    enabled: true,
    provider: 'playwright',
    browser: 'chromium',
    port: 3010,
  },
});
