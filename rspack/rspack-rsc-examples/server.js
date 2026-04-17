import rspack from '@rspack/core';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';
import express from 'express';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { Worker } from 'worker_threads';

let hotMiddleware;
let onServerComponentChanged;
let currentWorker;
let workerRestartPromise;

// Target browsers, see: https://github.com/browserslist/browserslist
const browserTargets = ['last 2 versions', '> 0.2%', 'not dead', 'Firefox ESR'];
// Target Node.js LTS version for server bundle
const nodeTargets = ['node 22'];

function jsRule(targets) {
  return {
    test: /\.jsx?$/,
    use: [
      {
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'ecmascript',
              jsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
            experimental: {
              keepImportAttributes: true,
            },
          },
          env: { targets },
          rspackExperiments: {
            reactServerComponents: true,
          },
        },
      },
    ],
  };
}

function tsRule(targets) {
  return {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
            experimental: {
              keepImportAttributes: true,
            },
          },
          env: { targets },
          rspackExperiments: {
            reactServerComponents: true,
          },
        },
      },
    ],
  };
}

function cssRule() {
  return {
    test: /\.css$/i,
    type: 'css/auto',
  };
}

const { createPlugins, Layers } = rspack.experiments.rsc;
const { ServerPlugin, ClientPlugin } = createPlugins();

const SSR_ENTRY = path.resolve(import.meta.dirname, 'src/framework/entry.ssr.tsx');
const RSC_ENTRY = path.resolve(import.meta.dirname, 'src/framework/entry.rsc.tsx');

const rspackConfig = [
  {
    name: 'client',
    mode: 'development',
    target: 'web',
    context: import.meta.dirname,
    entry: './src/framework/entry.client.tsx',
    resolve: {
      extensions: ['...', '.ts', '.tsx', '.jsx'],
    },
    output: {
      path: path.join(import.meta.dirname, 'dist/static'),
      publicPath: 'static/',
    },
    devtool: 'source-map',
    module: {
      rules: [cssRule(), jsRule(browserTargets), tsRule(browserTargets)],
    },
    plugins: [
      new ClientPlugin(),
      new rspack.HotModuleReplacementPlugin(),
      new ReactRefreshPlugin(),
    ],
  },
  {
    name: 'server',
    mode: 'development',
    target: 'node',
    context: import.meta.dirname,
    entry: './src/framework/entry.rsc.tsx',
    resolve: {
      extensions: ['...', '.ts', '.tsx', '.jsx'],
    },
    output: {
      path: path.join(import.meta.dirname, 'dist'),
      module: true,
      chunkFormat: 'module',
      chunkLoading: 'import',
      library: {
        type: 'module',
      },
    },
    devtool: false,
    module: {
      rules: [
        cssRule(),
        jsRule(nodeTargets),
        tsRule(nodeTargets),
        // react server components layers
        {
          resource: SSR_ENTRY,
          layer: Layers.ssr,
        },
        {
          resource: RSC_ENTRY,
          layer: Layers.rsc,
          resolve: {
            conditionNames: ['react-server', '...'],
          },
        },
        {
          issuerLayer: Layers.rsc,
          exclude: SSR_ENTRY,
          resolve: {
            conditionNames: ['react-server', '...'],
          },
        },
      ],
    },
    plugins: [
      new ServerPlugin({
        onServerComponentChanges() {
          onServerComponentChanged = true;
          console.log('[RSC] server component changes detected, restarting server...');
        },
      }),
    ],
    externalsType: 'module',
    externals: {
      express: 'express',
    },
  },
];
const compiler = rspack(rspackConfig);

compiler.compilers[1].hooks.done.tapPromise('RestartWorker', async (stats) => {
  if (stats.hasErrors()) {
    console.error('[Server] Build failed with errors');
    return;
  }

  workerRestartPromise = (async () => {
    if (currentWorker) {
      await currentWorker.terminate();
      currentWorker = null;
    }

    currentWorker = await createServerWorker();
    if (onServerComponentChanged) {
      hotMiddleware.publish({ type: 'rsc:update' });
    }
    onServerComponentChanged = false;
  })();
  await workerRestartPromise;
});

compiler.compilers[0].hooks.done.tapPromise('WaitForWorker', async () => {
  if (workerRestartPromise) {
    try {
      await workerRestartPromise;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch {
    } finally {
      workerRestartPromise = undefined;
    }
  }
});

const app = express();

app.use(
  webpackDevMiddleware(compiler, {
    writeToDisk: true,
  }),
);

hotMiddleware = webpackHotMiddleware(compiler.compilers[0], {
  log: console.log,
  path: '/__rspack_hmr',
  heartbeat: 10 * 1000,
});
app.use(hotMiddleware);

function createServerWorker() {
  return new Promise((resolve, reject) => {
    const workerPath = path.join(import.meta.dirname, 'dist/main.mjs');
    const worker = new Worker(workerPath, {
      type: 'module',
    });

    worker.on('message', (message) => {
      if (message.type === 'ready') {
        resolve(worker);
      }
    });

    worker.on('error', (error) => {
      reject(error);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });

    setTimeout(() => {
      reject(new Error('Worker initialization timeout'));
    }, 10000);
  });
}

const server = app.listen(1616, 'localhost', function () {
  console.log('Dev Server is running on %j', server.address());
});
