# Rstest Module Federation (Node) Example

Test a local CommonJS remote with [`@module-federation/rstest`](https://module-federation.io/), without an HTTP server.

- `remote/` builds an ESM library with declarations and uses Rslib's `mf` format to expose `remote/formatPrice` and `remote/math`.
- `host/` loads the built container from disk and tests the exposed functions.

## What it tests

- Functions exposed by a Node Module Federation remote can be called from an Rstest test without an HTTP server: `host/tests/federated-modules.test.ts` imports `remote/formatPrice` and `remote/math` and checks their results.
- Federated modules are loaded with dynamic `import()` through their specifiers, so the Module Federation runtime initializes the container first, matching upstream's [`NodeLocal.dynamic.test.tsx`](https://github.com/web-infra-dev/rstest/blob/main/examples/federation/main-app/test/NodeLocal.dynamic.test.tsx).

## Run the example

From `host/`:

```bash
pnpm install
pnpm test
```

For a remote served over HTTP to a real browser, see the [browser example](../module-federation-browser).
