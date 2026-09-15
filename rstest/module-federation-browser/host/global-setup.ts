import { access, readFile } from 'node:fs/promises';
import { createServer, type Server } from 'node:http';
import { resolve } from 'node:path';

const remoteDir = resolve(__dirname, '../remote/dist');
const remoteEntry = `${remoteDir}/mf/remoteEntry.js`;
let server: Server;

export async function setup() {
  await access(remoteEntry).catch(() => {
    throw new Error(
      `Remote entry not found: ${remoteEntry}. Run \`pnpm install\` or \`pnpm --dir ../remote build\`.`,
    );
  });
  server = createServer(async (req, res) => {
    try {
      const body = await readFile(`${remoteDir}${req.url}`);
      res.setHeader('access-control-allow-origin', '*');
      if (req.url?.endsWith('.js')) res.setHeader('content-type', 'text/javascript');
      res.writeHead(200).end(body);
    } catch {
      res.writeHead(404).end('Not found');
    }
  });
  await new Promise<void>((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(3001, resolveListen);
  });
}

export async function teardown() {
  await new Promise<void>((resolveClose, rejectClose) => {
    server.close((error) => (error ? rejectClose(error) : resolveClose()));
  });
}
