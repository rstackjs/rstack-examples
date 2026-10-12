import https from 'node:https';
import express from 'express';
import { createRsbuild, loadConfig } from '@rsbuild/core';
import selfsigned from 'selfsigned';

export async function startDevServer() {
  const { content } = await loadConfig({});

  // Generate an untrusted self-signed certificate for local HTTPS.
  // Your browser will warn once; confirm to continue (same as plugin-basic-ssl).
  const pems = await selfsigned.generate([{ name: 'commonName', value: 'localhost' }]);
  const httpsOptions = {
    key: pems.private,
    cert: pems.cert,
  };

  // Pass the same HTTPS options into Rsbuild so asset/HMR URLs use https/wss.
  // Do not rely on `server.https` alone with `app.listen()` — that stays HTTP.
  const rsbuild = await createRsbuild({
    rsbuildConfig: {
      ...content,
      server: {
        ...content.server,
        middlewareMode: true,
        https: httpsOptions,
      },
    },
  });

  const app = express();

  // Create Rsbuild DevServer instance (middleware only)
  const rsbuildServer = await rsbuild.createDevServer();

  // Apply Rsbuild’s built-in middlewares
  app.use(rsbuildServer.middlewares);

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
