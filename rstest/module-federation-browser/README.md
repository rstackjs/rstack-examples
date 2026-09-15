# Rstest Module Federation (Browser) Example

Test a federated React component in [Rstest Browser Mode](https://rstest.rs/guide/browser-testing).

- `remote/` builds a React library as ESM with declarations and exposes `remote/Button` through Rslib's `mf` format on port 3001.
- `host/` consumes the component in a React app on port 3002 and tests it in Chromium.

## What it tests

- A federated React component loaded over HTTP renders in a real Chromium page and responds to clicks: `host/tests/button.test.tsx` renders `remote/Button` with `@rstest/browser-react`, clicks it, and asserts the counter text with `expect.element`.
- Host and remote share one React copy: the counter state only works because `react` and `react-dom` are singletons, with [`shareStrategy: 'loaded-first'`](https://rslib.rs/guide/advanced/module-federation#faqs) preferring the host's React over the production remote's.

## Run the tests

From `host/`:

```bash
pnpm install
pnpm exec playwright install chromium # One-time browser installation
pnpm test
```

## Run the apps in the browser

From this directory, start the remote and host in separate terminals:

```bash
pnpm --dir remote dev
pnpm --dir host dev
```

Open `http://localhost:3002` and click the federated button to increment its counter.
