import { defineConfig } from '@rstest/core';

export default defineConfig({
  browser: {
    enabled: true,
    provider: 'playwright',
    browser: 'chromium',
    // Use the preinstalled Chrome in CI to avoid downloading Playwright's Chromium.
    providerOptions: process.env.GITHUB_ACTIONS
      ? {
          launch: {
            channel: 'chrome',
          },
        }
      : undefined,
    port: 3010,
  },
});
