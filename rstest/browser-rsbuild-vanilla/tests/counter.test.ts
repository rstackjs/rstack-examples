import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';
import { createCounter } from '../src/counter';

describe('createCounter', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('should render with initial value', () => {
    const counter = createCounter(10);
    container.appendChild(counter.element);

    expect(counter.getValue()).toBe(10);
    expect(counter.element.querySelector('[data-testid="counter-value"]')?.textContent).toBe('10');
  });

  it('should increment on button click', () => {
    const counter = createCounter(0);
    container.appendChild(counter.element);

    const btn = counter.element.querySelector('[data-testid="increment-btn"]') as HTMLButtonElement;
    btn.click();

    expect(counter.getValue()).toBe(1);
  });

  it('should decrement on button click', () => {
    const counter = createCounter(5);
    container.appendChild(counter.element);

    const btn = counter.element.querySelector('[data-testid="decrement-btn"]') as HTMLButtonElement;
    btn.click();

    expect(counter.getValue()).toBe(4);
  });
});

describe('Browser APIs', () => {
  it('should have access to DOM', () => {
    expect(typeof document).toBe('object');
    expect(typeof window).toBe('object');
  });

  it('should have access to localStorage', () => {
    localStorage.setItem('test', 'value');
    expect(localStorage.getItem('test')).toBe('value');
    localStorage.removeItem('test');
  });
});
