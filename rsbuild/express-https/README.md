# Rsbuild + Express (HTTPS)

Custom [Express](https://expressjs.com/) **HTTPS** server integrated with Rsbuild's dev middlewares and HMR.

The plain HTTP version lives in [`../express`](../express). Setting only `server.https` in `rsbuild.config` is not enough for a custom Express server: `app.listen()` still creates an HTTP server. This example uses [`@rsbuild/plugin-basic-ssl`](https://github.com/rstackjs/rsbuild-plugin-basic-ssl) to generate and cache a self-signed certificate. After `createDevServer()`, it reads `server.https` from `rsbuild.getNormalizedConfig()` and passes the HTTPS options to `https.createServer`.

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get Started

Start the HTTPS dev server:

```bash
pnpm dev
```

Open the printed `https://localhost:<port>/` URL. The certificate is self-signed, so the browser will show a warning — continue once for local development.

Build the app for production:

```bash
pnpm build
```

Preview the production build locally with Rsbuild's HTTPS preview server:

```bash
pnpm preview
```
