# Rsbuild + StyleX

Minimal example of using [StyleX](https://stylexjs.com/) with Rsbuild via the official [`@stylexjs/unplugin`](https://stylexjs.com/docs/learn/installation/rspack/) adapter.

During development, `runtimeInjection` injects StyleX styles at runtime so style changes apply through HMR without a page refresh.

In production, runtime injection is disabled. The plugin compiles StyleX at build time and appends the generated CSS to the stylesheet emitted by Rsbuild's `CssExtractRspackPlugin` (fed by `src/index.css`), producing content-hashed CSS filenames instead of a separate hardcoded `/stylex.css` link.

This example uses `stylex.webpack()` (not `stylex.rspack()`) because `@stylexjs/unplugin` currently attaches CSS injection through the webpack-compatible hook; Rspack still runs that hook for plugins registered via `tools.rspack.plugins`.

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get Started

Start the dev server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```
