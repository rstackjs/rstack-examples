# Rstest with Rsbuild and Solid 2

`withRsbuildConfig()` reuses `@rsbuild/plugin-solid` v2, aliases, and defines from the Rsbuild configuration. No Babel plugin is needed.

The tests use jsdom. happy-dom 21.0.4 does not create a text node when `textContent` is set to the number `0`, which breaks subsequent Solid 2 text updates.

Import `render` from `@solidjs/web` and call `flush()` from `solid-js` after interactions to apply batched reactive updates before asserting DOM changes.

```bash
pnpm install
pnpm build
pnpm test
pnpm dev
```
