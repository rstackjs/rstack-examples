const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('should have manifest', async (t) => {
  const manifest = path.resolve(__dirname, 'dist', 'rspack-manifest.json');
  assert(fs.existsSync(manifest));
  const manifestJson = JSON.parse(await fs.promises.readFile(manifest, 'utf-8'));
  assert(manifestJson.files['main.js'] === 'main.js');
  assert(manifestJson.entrypoints.includes('main.js'));
});
