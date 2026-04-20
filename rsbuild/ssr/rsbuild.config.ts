import { defineConfig, logger, type RequestHandler, type RsbuildDevServer } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export const serverRender =
  (server: RsbuildDevServer): RequestHandler =>
  async (_req, res, _next) => {
    const indexModule = await server.environments.node.loadBundle<{
      render: () => string;
    }>('index');

    const markup = indexModule.render();

    const template = await server.environments.web.getTransformedHtml('index');

    const html = template.replace('<!--app-content-->', markup);

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.end(html);
  };

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    setup: [
      ({ action, server }) => {
        if (action !== 'dev') {
          return;
        }

        const serverRenderMiddleware = serverRender(server);

        server.middlewares.use(async (req, res, next) => {
          if (req.method === 'GET' && req.url === '/') {
            try {
              await serverRenderMiddleware(req, res, next);
            } catch (err) {
              logger.error('SSR render error, downgrade to CSR...');
              logger.error(err);
              next();
            }
          } else {
            next();
          }
        });
      },
    ],
  },
  environments: {
    web: {
      source: {
        entry: {
          index: './src/index',
        },
      },
    },
    node: {
      output: {
        module: true,
        target: 'node',
        distPath: {
          root: 'dist/server',
        },
      },
      source: {
        entry: {
          index: './src/index.server',
        },
      },
    },
  },
  html: {
    template: './template.html',
  },
});
