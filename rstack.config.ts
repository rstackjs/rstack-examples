import { define } from 'rstack';

define.lint(({ ts }) => [
  {
    ignores: ['**/dist-*/**', '**/auto-imports.d.ts', '**/components.d.ts', '**/__snapshots__/**'],
  },
  ts.configs.recommended,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-const': 'off',
      'prefer-spread': 'off',
    },
  },
]);

define.fmt({
  printWidth: 100,
  singleQuote: true,
  sortPackageJson: true,
  ignorePatterns: [
    'dist-*',
    'auto-imports.d.ts',
    'components.d.ts',
    '**/@mf-types',
    '**/http-import.lock.data',
    '**/__snapshots__',
    'routeTree.gen.ts',
  ],
});

define.staged({
  '*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx}': ['rs lint --fix', 'rs fmt'],
  '*.{json,jsonc,md,mdx,yml,yaml,css,scss,less,html,vue}': 'rs fmt',
});
