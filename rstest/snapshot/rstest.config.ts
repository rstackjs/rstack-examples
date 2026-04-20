import path from 'node:path';
import { defineConfig } from '@rstest/core';

export default defineConfig({
  resolveSnapshotPath: (testPath, snapshotExtension) => {
    const testDir = path.dirname(testPath);
    const testFileName = path.basename(testPath);
    return path.join(testDir, '__snapshots__', testFileName + snapshotExtension);
  },
});
