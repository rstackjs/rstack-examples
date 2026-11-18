import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';
import { render } from '@solidjs/web';
import { flush } from 'solid-js';
import { Counter } from '../src/components/Counter';

describe('pluginSolid - component rendering', () => {
  let container: HTMLDivElement;
  let dispose: (() => void) | undefined;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    container.remove();
  });

  it('should render with initial value', () => {
    dispose = render(() => <Counter initialValue={10} />, container);

    expect(container.querySelector('[data-testid="counter-value"]')?.textContent).toBe('10');
  });

  it('should increment on button click', () => {
    dispose = render(() => <Counter />, container);

    const incrementButton = container.querySelector(
      '[data-testid="increment-btn"]',
    ) as HTMLButtonElement;
    incrementButton.click();
    // Solid 2 batches reactive updates. Flush before asserting DOM changes.
    flush();

    expect(container.querySelector('[data-testid="counter-value"]')?.textContent).toBe('1');
  });
});
