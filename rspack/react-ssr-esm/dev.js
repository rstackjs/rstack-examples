import path from 'node:path';
import rspack from '@rspack/core';
import { spawn } from 'cross-spawn';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import rspackConfigClient from './rspack.config.client.js';
import rspackConfigServer from './rspack.config.server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compiler = rspack([
  {
    ...rspackConfigClient,
    mode: 'development',
    devtool: 'source-map',
    output: {
      ...rspackConfigClient.output,
      filename: '[name].js',
    },
  },
  {
    ...rspackConfigServer,
    mode: 'development',
    devtool: 'source-map',
  },
]);

let node;

compiler.hooks.watchRun.tap('Dev', (compiler) => {
  console.log(`Compiling ${compiler.name} ...`);
  if (compiler.name === 'server' && node) {
    node.kill();
    node = undefined;
  }
});

compiler.watch({}, (err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(stats?.toString('minimal'));
  const compiledSuccessfully = !stats?.hasErrors();
  if (compiledSuccessfully && !node) {
    console.log('Starting Node.js ...');
    node = spawn('node', ['--inspect', path.join(__dirname, 'dist/server.js')], {
      stdio: 'inherit',
    });
  }
});
