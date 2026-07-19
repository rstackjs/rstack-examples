import fs from 'node:fs';
import { createRsbuild, loadConfig, logger } from '@rsbuild/core';
import express from 'express';

const templateHtml = fs.readFileSync('./template.html', 'utf-8');

let manifest;

const serverRender = (serverAPI) => async (_req, res) => {
  const indexModule = await serverAPI.environments.node.loadBundle('index');

  const markup = indexModule.render();

  const { entries } = JSON.parse(manifest);

  const { js = [], css = [] } = entries['index'].initial;

  const scriptTags = js.map((url) => `<script src="${url}" defer></script>`).join('\n');
  const styleTags = css.map((file) => `<link rel="stylesheet" href="${file}">`).join('\n');

  const html = templateHtml
    .replace('<!--app-content-->', markup)
    .replace('<!--app-head-->', `${scriptTags}\n${styleTags}`);

  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  res.end(html);
};

export async function startDevServer() {
  const { content } = await loadConfig({});

  // Init Rsbuild
  const rsbuild = await createRsbuild({
    rsbuildConfig: content,
  });

  rsbuild.onDevCompileDone(async () => {
    // update manifest info when rebuild
    manifest = await fs.promises.readFile('./dist/manifest.json', 'utf-8');
  });

  const app = express();

  // Create Rsbuild DevServer instance
  const rsbuildServer = await rsbuild.createDevServer();

  const serverRenderMiddleware = serverRender(rsbuildServer);

  app.get('/', async (req, res, next) => {
    try {
      await serverRenderMiddleware(req, res, next);
    } catch (err) {
      logger.error('SSR render error, downgrade to CSR...');
      logger.error(err);
      next();
    }
  });

  // Apply Rsbuild’s built-in middlewares
  app.use(rsbuildServer.middlewares);

  const httpServer = app.listen(rsbuildServer.port, () => {
    // Notify Rsbuild that the custom server has started
    rsbuildServer.afterListen();

    console.log(`Server started at http://localhost:${rsbuildServer.port}`);
  });

  rsbuildServer.connectWebSocket({ server: httpServer });

  return {
    close: async () => {
      await rsbuildServer.close();
      httpServer.close();
    },
  };
}

startDevServer();
