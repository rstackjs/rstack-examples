// @ts-check

import { defineConfig } from '@rspack/cli';
import { WebpackManifestPlugin as RspackManifestPlugin } from 'rspack-manifest-plugin';

export default defineConfig({
  plugins: [
    new RspackManifestPlugin({
      fileName: 'rspack-manifest.json',
      generate: (seed, files, entries) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = Object.keys(entries).reduce(
          (previous, name) =>
            previous.concat(entries[name].filter((fileName) => !fileName.endsWith('.map'))),
          [],
        );
        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),
  ],
});
