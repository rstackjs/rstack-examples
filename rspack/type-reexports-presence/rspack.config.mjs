// @ts-check

/** @type {import("@rspack/core").Configuration} */
export default {
  entry: {
    main: './src/index.ts',
  },
  mode: 'production',
  optimization: {
    // disable minimize so you can understand the output
    minimize: false,
  },
  resolve: {
    extensions: ['.ts', '...'],
  },
  module: {
    parser: {
      javascript: {
        typeReexportsPresence: 'tolerant',
      },
    },
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'builtin:swc-loader',
          /** @type {import("@rspack/core").SwcLoaderOptions} */
          options: {
            detectSyntax: 'auto',
            collectTypeScriptInfo: {
              typeExports: true,
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
};
