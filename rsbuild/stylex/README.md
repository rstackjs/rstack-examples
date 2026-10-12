# Rsbuild + StyleX

Minimal example of using [StyleX](https://stylexjs.com/) with Rsbuild via the official [`@stylexjs/unplugin`](https://stylexjs.com/docs/learn/installation/rspack/) adapter.

The plugin compiles StyleX at build time and appends the generated CSS to the stylesheet emitted by Rsbuild's `CssExtractRspackPlugin` (fed by `src/index.css`). StyleX styles therefore stay in the normal CSS asset pipeline with content-hashed filenames, instead of a separate hardcoded `/stylex.css` link.

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
