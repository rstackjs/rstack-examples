import { withRsbuildConfig } from '@rstest/adapter-rsbuild';
import { defineConfig, type ExtendConfigFn } from '@rstest/core';

export default defineConfig({
  extends: withRsbuildConfig({
    environmentName: 'web',
  }) as ExtendConfigFn,
});
