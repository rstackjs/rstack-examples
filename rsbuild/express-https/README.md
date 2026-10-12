# Rsbuild + Express (HTTPS)

Custom [Express](https://expressjs.com/) **HTTPS** server integrated with Rsbuild's dev middlewares and HMR.

The plain HTTP version lives in [`../express`](../express). Setting only `server.https` in `rsbuild.config` is not enough for a custom Express server: `app.listen()` still creates an HTTP server. This example creates the TLS socket with `https.createServer` and passes the same certificate into Rsbuild so the client uses `https` / `wss`.

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

Open the printed `https://localhost:<port>/` URL. The certificate is self-signed (`selfsigned`), so the browser will show a warning — continue once for local development.

Build the app for production:

```bash
pnpm build
```

Preview the production build locally (Rsbuild preview server; use `server.https` or `@rsbuild/plugin-basic-ssl` if you need HTTPS for preview):

```bash
pnpm preview
```
