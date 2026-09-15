import { Suspense, lazy } from 'react';

const RemoteButton = lazy(() => import('remote/Button'));

export default function App() {
  return (
    <main>
      <h1>Module Federation Host</h1>
      <Suspense fallback={<p>Loading remote…</p>}>
        <RemoteButton label="Federated button" />
      </Suspense>
    </main>
  );
}
