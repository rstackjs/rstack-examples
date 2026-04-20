import { createCounter } from './counter';

const app = document.querySelector<HTMLDivElement>('#root');

if (app) {
  app.innerHTML = `
    <h1>Vanilla Counter App</h1>
    <div id="counter-container"></div>
  `;

  const container = document.querySelector<HTMLDivElement>('#counter-container');
  if (container) {
    const counter = createCounter(0);
    container.appendChild(counter.element);
  }
}
