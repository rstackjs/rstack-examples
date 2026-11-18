# Rsbuild with Solid 2

Use `@rsbuild/plugin-solid` v2 with `solid-js` and `@solidjs/web` v2. The default native compiler handles JSX and Solid Refresh without a Babel plugin.

Import DOM APIs such as `render` from `@solidjs/web`, and set TypeScript's `jsx` to `preserve` and `jsxImportSource` to `@solidjs/web`.

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
