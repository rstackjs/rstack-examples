import rspack from '@rspack/core';
import express from 'express';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { Worker } from 'worker_threads';
import { createRspackConfig } from './rspack.config.js';

let hotMiddleware;
let onServerComponentChanged;
let currentWorker;
let workerRestartPromise;

const compiler = rspack(
  createRspackConfig({
    hmr: true,
    mode: 'development',
    onServerComponentChanges() {
      onServerComponentChanged = true;
      console.log('[RSC] server component changes detected, restarting server...');
    },
  }),
);

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
    const workerPath = path.join(import.meta.dirname, 'dist/main.js');
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
