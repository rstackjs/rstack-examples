import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Counter } from './components/Counter';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <h1>React Counter App</h1>
      <Counter />
    </StrictMode>,
  );
}
