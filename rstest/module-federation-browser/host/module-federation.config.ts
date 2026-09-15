import { dependencies } from './package.json';

export const mfConfig = {
  name: 'host',
  remotes: { remote: 'remote@http://localhost:3001/mf/remoteEntry.js' },
  shared: {
    react: { singleton: true, requiredVersion: dependencies.react },
    'react-dom': { singleton: true, requiredVersion: dependencies['react-dom'] },
  },
  // Prefer the host's already loaded React; the remote is a production build. See https://rslib.rs/guide/advanced/module-federation#faqs
  shareStrategy: 'loaded-first',
} as const;
