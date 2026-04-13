import { defineConfig, ts } from '@rslint/core';

const workspaces = ['rspack', 'rsbuild', 'rspress', 'rsdoctor', 'rslib', 'rstest'];
const jsExtensions = ['js', 'cjs', 'mjs', 'jsx'];

const jsFiles = workspaces.flatMap((workspace) =>
  jsExtensions.map((extension) => `${workspace}/**/*.${extension}`),
);

export default defineConfig([
  {
    ignores: [
      'node_modules/**',
      '**/coverage/**',
      '**/compiled/**',
      '**/dist/**',
      '**/dist-*/**',
      '**/doc_build/**',
      '**/auto-imports.d.ts',
      '**/components.d.ts',
      '**/__snapshots__/**',
    ],
  },
  ts.configs.recommended,
  {
    files: jsFiles,
  },
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
]);
