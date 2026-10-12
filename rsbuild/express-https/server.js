import https from 'node:https';
import express from 'express';
import { createRsbuild, loadConfig } from '@rsbuild/core';

export async function startDevServer() {
  const { content } = await loadConfig({});

  const rsbuild = await createRsbuild({
    rsbuildConfig: content,
  });

  const app = express();

  // Create Rsbuild DevServer instance (middleware only)
  const rsbuildServer = await rsbuild.createDevServer();

  // Apply Rsbuild’s built-in middlewares
  app.use(rsbuildServer.middlewares);

  // Read the HTTPS options after plugin-basic-ssl has generated the certificate.
  const { https: httpsOptions } = rsbuild.getNormalizedConfig().server;
  const httpsServer = https.createServer(httpsOptions, app);

  httpsServer.listen(rsbuildServer.port, async () => {
    // Notify Rsbuild that the custom server has started
    await rsbuildServer.afterListen();
  });

  rsbuildServer.connectWebSocket({ server: httpsServer });

  return {
    close: async () => {
      await rsbuildServer.close();
      httpsServer.close();
    },
  };
}

startDevServer();
