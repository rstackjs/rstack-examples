import { rspack } from '@rspack/core';
import { RspackDevServer } from '@rspack/dev-server';

const compiler = rspack({
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  entry: './src/index.js',
  context: import.meta.dirname,
  plugins: [new rspack.HtmlRspackPlugin()],
  lazyCompilation: {
    backend: {
      server() {
        return devServer.server;
      },
    },
  },
});

const devServer = new RspackDevServer({}, compiler);

devServer.start();
