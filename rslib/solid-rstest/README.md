# Rslib Solid Rstest

This example targets Solid 2. `@rsbuild/plugin-solid` v2 compiles the JavaScript output without Babel, while the `solid` export condition preserves JSX for consumers to compile. Both `solid-js` and `@solidjs/web` are peer dependencies.

`@solidjs/testing-library` is pinned to `1.0.0-rc.2` for Solid 2 support.

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get started

Build the library:

```bash
pnpm build
```

Build the library in watch mode:

```bash
pnpm dev
```

Run tests:

```bash
pnpm test
```
