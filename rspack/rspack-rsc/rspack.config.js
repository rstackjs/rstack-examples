import rspack from '@rspack/core';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';
import path from 'path';

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

export function createRspackConfig({
  hmr = false,
  mode = process.env.NODE_ENV === 'development' ? 'development' : 'production',
  onServerComponentChanges,
} = {}) {
  const { ServerPlugin, ClientPlugin } = createPlugins();
  const ssrEntry = path.resolve(import.meta.dirname, 'src/framework/entry.ssr.tsx');
  const rscEntry = path.resolve(import.meta.dirname, 'src/framework/entry.rsc.tsx');

  return [
    {
      name: 'client',
      mode,
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
      devtool: mode === 'development' ? 'source-map' : false,
      module: {
        rules: [cssRule(), jsRule(browserTargets), tsRule(browserTargets)],
      },
      plugins: [
        new ClientPlugin(),
        ...(hmr ? [new rspack.HotModuleReplacementPlugin(), new ReactRefreshPlugin()] : []),
      ],
    },
    {
      name: 'server',
      mode,
      target: 'node',
      context: import.meta.dirname,
      entry: './src/framework/entry.rsc.tsx',
      resolve: {
        extensions: ['...', '.ts', '.tsx', '.jsx'],
      },
      output: {
        path: path.join(import.meta.dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].js',
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
            resource: ssrEntry,
            layer: Layers.ssr,
          },
          {
            resource: rscEntry,
            layer: Layers.rsc,
            resolve: {
              conditionNames: ['react-server', '...'],
            },
          },
          {
            issuerLayer: Layers.rsc,
            exclude: ssrEntry,
            resolve: {
              conditionNames: ['react-server', '...'],
            },
          },
        ],
      },
      plugins: [
        new ServerPlugin({
          onServerComponentChanges,
        }),
      ],
      externalsType: 'module',
      externals: {
        express: 'express',
      },
    },
  ];
}

export default createRspackConfig();
