import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <>
      <h1>Locator API Demo</h1>
      <form aria-label="Login form">
        <label htmlFor="username">Username</label>
        <input id="username" placeholder="Enter username" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Enter password" />
        <label>
          <input id="remember" type="checkbox" />
          Remember me
        </label>
        <button type="button">Login</button>
      </form>
    </>
  );
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
