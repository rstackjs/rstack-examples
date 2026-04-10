import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';
import { render } from 'preact';
import { Counter } from '../src/components/Counter';

describe('pluginPreact - component rendering', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    render(null, container);
    container.remove();
  });

  it('should render with initial value', () => {
    render(<Counter initialValue={10} />, container);

    expect(container.querySelector('[data-testid="counter-value"]')?.textContent).toBe('10');
  });

  it('should increment on button click', async () => {
    render(<Counter />, container);

    const incrementButton = container.querySelector(
      '[data-testid="increment-btn"]',
    ) as HTMLButtonElement;
    incrementButton.click();
    await Promise.resolve();

    expect(container.querySelector('[data-testid="counter-value"]')?.textContent).toBe('1');
  });
});
