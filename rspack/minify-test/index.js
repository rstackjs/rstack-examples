import fs from 'node:fs';
import path from 'node:path';

it('[minify-test]: chunk a should not be minified', () => {
  const content = fs.readFileSync(path.resolve(import.meta.dirname, 'a.js'), 'utf-8');
  expect(content).toMatch('\n');
});

it('[minify-test]: chunk b should not be minified', () => {
  const content = fs.readFileSync(path.resolve(import.meta.dirname, 'b.js'), 'utf-8');
  expect(content).toMatch('\n');
});

it('[minify-test]: chunk a2 should be minified', () => {
  const content = fs.readFileSync(path.resolve(import.meta.dirname, 'a2.js'), 'utf-8');
  expect(content).not.toMatch('\n');
});
