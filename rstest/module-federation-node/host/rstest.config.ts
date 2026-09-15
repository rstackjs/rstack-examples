import path from 'node:path';
import { federation } from '@module-federation/rstest';
import { defineConfig } from '@rstest/core';

export default defineConfig({
  plugins: [
    federation({
      name: 'host',
      remoteType: 'commonjs',
      remotes: {
        remote: `commonjs ${path.resolve(__dirname, '../remote/dist/mf/remoteEntry.cjs')}`,
      },
    }),
  ],
});
