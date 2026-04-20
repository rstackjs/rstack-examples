import { withRslibConfig } from '@rstest/adapter-rslib';
import { defineConfig, type ExtendConfigFn } from '@rstest/core';

export default defineConfig({
  extends: withRslibConfig({
    libId: 'esm',
    modifyLibConfig: (config) => {
      config.source ??= {};
      config.source.alias = {
        ...config.source.alias,
        '@test-utils': './tests/test-utils.ts',
      };
      return config;
    },
  }) as ExtendConfigFn,
});
