import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

test('should have manifest', async (t) => {
  const manifest = path.resolve(import.meta.dirname, 'dist', 'rspack-manifest.json');
  assert(fs.existsSync(manifest));
  const manifestJson = JSON.parse(await fs.promises.readFile(manifest, 'utf-8'));
  assert(manifestJson.files['main.js'] === 'main.js');
  assert(manifestJson.entrypoints.includes('main.js'));
});
