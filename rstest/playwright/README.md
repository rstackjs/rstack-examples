# Rstest Playwright Example

End-to-end testing a Rsbuild + React app with
[`@rstest/playwright`](https://rstest.rs/integration/playwright). The tests
run in Rstest's Node.js workers and use Playwright to drive a real Chromium
page, which makes them a natural part of the same Rstest workflow as unit
tests.

## What it tests

- The built Rsbuild + React app renders in a real Chromium page: `tests/home.test.ts` serves `dist/` with the `serve` fixture from `@rstest/playwright`, opens it, and checks the page title and heading with `toHaveTitle` and `toHaveText`.

## Run the example

```bash
pnpm install

# Install the Chromium binary used by Playwright (one-time setup):
pnpm exec playwright install chromium

# Build the app and run the E2E tests:
pnpm test
```

You can also start the app itself with `pnpm dev` or `pnpm preview`.

## Debugging

- Run with `PWDEBUG=1 rstest` to launch Chromium in headed mode with devtools.
- Set `RSTEST_PLAYWRIGHT_TRACE=retain-on-failure rstest` to capture a
  Playwright trace for failing tests, then open it with
  `npx playwright show-trace <trace.zip>`.
