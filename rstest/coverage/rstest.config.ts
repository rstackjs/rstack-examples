import { defineConfig } from '@rstest/core';

export default defineConfig({
  coverage: {
    enabled: true,
    provider: 'istanbul',
    include: ['src/**/*.ts'],
    exclude: ['src/**/*.d.ts', 'src/**/*.test.ts', 'src/**/index.ts'],
    reporters: ['text', 'html', 'lcov'],
    reportsDirectory: './coverage',
    thresholds: {
      lines: 70,
      branches: 70,
      functions: 70,
      statements: 70,
    },
    clean: true,
  },
});
