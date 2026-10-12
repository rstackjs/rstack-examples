import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import stylex from '@stylexjs/unplugin';

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        // Official StyleX plugin: compiles StyleX and appends CSS into the
        // stylesheet emitted by CssExtractRspackPlugin (used by Rsbuild).
        // See https://stylexjs.com/docs/learn/installation/rspack/
        //
        // Prefer the webpack adapter here: @stylexjs/unplugin currently attaches
        // CSS injection via the webpack() hook, which Rspack still invokes for
        // webpack-compatible plugins. The rspack() entry only runs transform.
        stylex.webpack({
          useCSSLayers: true,
          // Inject styles during development so they update with HMR.
          runtimeInjection: process.env.NODE_ENV === 'development',
        }),
      ],
    },
  },
});
