import express from 'express';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);

const templateHtml = fs.readFileSync('./template.html', 'utf-8');

const serverRender = (_req, res) => {
  const remotesPath = path.join(process.cwd(), `./dist/server/index.js`);

  const importedApp = require(remotesPath);

  const markup = importedApp.render();

  const { entries } = JSON.parse(fs.readFileSync('./dist/manifest.json', 'utf-8'));

  const { js, css } = entries['index'].initial;

  const scriptTags = js.map((file) => `<script src="${file}" defer></script>`).join('\n');
  const styleTags = css.map((file) => `<link rel="stylesheet" href="${file}">`).join('\n');

  const html = templateHtml
    .replace('<!--app-content-->', markup)
    .replace('<!--app-head-->', `${scriptTags}\n${styleTags}`);

  res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
};

const port = process.env.PORT || 3000;

export async function preview() {
  const app = express();

  app.get('/', (req, res, next) => {
    try {
      serverRender(req, res, next);
    } catch (err) {
      console.error('SSR render error, downgrade to CSR...\n', err);
      next();
    }
  });

  app.use(express.static('dist'));

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

preview(process.cwd());
