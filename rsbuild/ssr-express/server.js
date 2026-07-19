import { createRsbuild, loadConfig, logger } from '@rsbuild/core';
import express from 'express';

const serverRender = (serverAPI) => async (_req, res) => {
  const indexModule = await serverAPI.environments.node.loadBundle('index');

  const markup = indexModule.render();

  const template = await serverAPI.environments.web.getTransformedHtml('index');

  const html = template.replace('<!--app-content-->', markup);

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
