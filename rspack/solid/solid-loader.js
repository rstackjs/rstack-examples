import { transformAsync, transformRefreshAsync } from '@solidjs/compiler';
import remapping from '@jridgewell/remapping';

/** @type {import('@rspack/core').LoaderDefinition} */
export default async function solidLoader(source, inputSourceMap) {
  const callback = this.async();
  const filename = this.resourcePath;
  const dev = this.mode === 'development';

  try {
    let code = source;
    const maps = [];

    // Register component boundaries before compiling JSX. Only app code needs HMR.
    if (dev && this.hot && !/[\\/]node_modules[\\/]/.test(filename)) {
      const refresh = await transformRefreshAsync(code, {
        filename,
        bundler: 'standard',
        importSource: 'solid-js/refresh',
        sourceMap: true,
      });
      code = refresh.code;
      if (refresh.map) maps.push(JSON.parse(refresh.map));
    }

    const result = await transformAsync(code, {
      filename,
      generate: 'dom',
      dev,
      sourceMap: true,
    });
    if (result.map) maps.unshift(JSON.parse(result.map));
    if (inputSourceMap) {
      maps.push(typeof inputSourceMap === 'string' ? JSON.parse(inputSourceMap) : inputSourceMap);
    }

    callback(null, result.code, maps.length ? remapping(maps, () => null) : undefined);
  } catch (error) {
    callback(error instanceof Error ? error : new Error(String(error)));
  }
}
