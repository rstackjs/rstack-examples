import { defineConfig, ts } from '@rslint/core';

export default defineConfig([
  {
    ignores: ['**/dist-*/**', '**/auto-imports.d.ts', '**/components.d.ts', '**/__snapshots__/**'],
  },
  ts.configs.recommended,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-const': 'off',
      'prefer-spread': 'off',
    },
  },
  {
    files: ['**/worker.ts', '**/*-worker.ts'],
    rules: {
      'no-global-assign': 'off',
    },
  },
]);
