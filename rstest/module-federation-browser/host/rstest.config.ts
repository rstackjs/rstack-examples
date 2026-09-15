import { federation } from '@module-federation/rstest';
import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rstest/core';
import { mfConfig } from './module-federation.config';

export default defineConfig({
  // Required for globalSetup to run when @module-federation/rstest is used in browser mode; see README.
  // https://github.com/web-infra-dev/rstest/blob/main/examples/federation/main-app/rstest.browser.config.ts
  federation: true,
  globalSetup: './global-setup.ts',
  browser: {
    enabled: true,
    provider: 'playwright',
    browser: 'chromium',
    port: 3014,
    providerOptions: process.env.GITHUB_ACTIONS
      ? {
          launch: {
            channel: 'chrome',
          },
        }
      : undefined,
  },
  plugins: [
    pluginReact(),
    federation({
      ...mfConfig,
      remoteType: 'script',
    }),
  ],
});
