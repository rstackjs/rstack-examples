const { rspack } = require('@rspack/core');
const { RspackDevServer } = require('@rspack/dev-server');

const compiler = rspack({
  entry: './src/index.js',
  context: __dirname,
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
