import { Counter } from '@components/Counter';
import { afterEach, beforeEach, describe, expect, it } from '@rstest/core';
import { render } from 'solid-js/web';

declare const __APP_VERSION__: string;

describe('withRsbuildConfig - pluginSolid support', () => {
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

  it('should resolve @components alias from rsbuild.config.ts', () => {
    dispose = render(() => <Counter initialValue={5} />, container);

    expect(container.querySelector('[data-testid="counter-value"]')?.textContent).toBe('5');
  });

  it('should resolve @/ alias from rsbuild.config.ts', async () => {
    const { getDefaultStep } = await import('@/utils/step');

    expect(getDefaultStep()).toBe(1);
  });

  it('should inherit __APP_VERSION__ from rsbuild.config.ts', () => {
    expect(__APP_VERSION__).toBe('1.0.0');
  });
});
