// @ts-check

/** @type {import("@rspack/core").Configuration} */
export default {
  entry: {
    main: './src/index.ts',
  },
  mode: 'production',
  optimization: {
    // This is the feature that enables inlining, it's enabled by default in production mode
    inlineExports: true,
    // disable minimize so you can understand the output
    minimize: false,
  },
  resolve: {
    extensions: ['.ts', '...'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'builtin:swc-loader',
          /** @type {import("@rspack/core").SwcLoaderOptions} */
          options: {
            detectSyntax: 'auto',
            collectTypeScriptInfo: {
              exportedEnum: true,
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
};
