import { withRsbuildConfig } from '@rstest/adapter-rsbuild';
import { defineConfig, type ExtendConfigFn } from '@rstest/core';

export default defineConfig({
  extends: withRsbuildConfig() as ExtendConfigFn,
  browser: {
    enabled: true,
    provider: 'playwright',
    browser: 'chromium',
    // Use the preinstalled Chrome in CI to avoid downloading Playwright's Chromium.
    providerOptions: process.env.CI
      ? {
          launch: {
            channel: 'chrome',
          },
        }
      : undefined,
    port: 3013,
  },
});
