# Rspack with Solid 2

For an integrated setup, use [Rsbuild's Solid plugin](https://rsbuild.rs/plugins/list/plugin-solid). This example shows how to configure Rspack directly with Solid 2's native compiler.

- `solid-loader.js` runs `@solidjs/compiler` and enables `solid-js/refresh` for application code in development. `builtin:swc-loader` then handles JavaScript syntax lowering.
- The `solid` resolve condition selects JSX sources from Solid libraries.
- Dynamic imports inside `@solidjs/web` are left for the runtime, which loads hydration modules from URLs.
- DOM APIs such as `render` come from `@solidjs/web`.

```bash
pnpm install
pnpm dev
pnpm build
```

Increment the counter, then edit `src/Message.jsx`. Solid Refresh updates the child component while preserving the parent's count.
