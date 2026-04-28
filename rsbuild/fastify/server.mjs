import Fastify from 'fastify';
import { createRsbuild, loadConfig } from '@rsbuild/core';

export async function startDevServer() {
  const { content } = await loadConfig({});

  // Init Rsbuild
  const rsbuild = await createRsbuild({
    rsbuildConfig: content,
  });

  const fastify = Fastify();

  const middie = await import('@fastify/middie');

  await fastify.register(middie);

  // Create Rsbuild DevServer instance
  const rsbuildServer = await rsbuild.createDevServer();

  // Apply Rsbuild’s built-in middlewares
  fastify.use(rsbuildServer.middlewares);

  await fastify.listen({
    port: rsbuildServer.port,
  });

  // Notify Rsbuild that the custom server has started
  await rsbuildServer.afterListen();

  rsbuildServer.connectWebSocket({ server: fastify.server });
}

startDevServer(process.cwd());
