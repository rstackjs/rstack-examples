// Use @components alias inherited from rsbuild.config.ts
import { Counter } from '@components/Counter';
import { cleanup, render } from '@rstest/browser-react';
import { afterEach, describe, expect, it } from '@rstest/core';
import { getByTestId } from '@testing-library/dom';

declare const __APP_VERSION__: string;

describe('withRsbuildConfig - alias inheritance', () => {
  afterEach(() => {
    cleanup();
  });

  it('should resolve @components alias from rsbuild.config.ts', async () => {
    const { container } = await render(<Counter initialValue={5} />);
    expect(getByTestId(container, 'counter-value').textContent).toBe('5');
  });

  it('should resolve @/ alias from rsbuild.config.ts', async () => {
    // Dynamic import using @/ alias
    const { useCounter } = await import('@/hooks');
    expect(typeof useCounter).toBe('function');
  });
});

describe('withRsbuildConfig - define inheritance', () => {
  it('should inherit __APP_VERSION__ from rsbuild.config.ts', () => {
    expect(__APP_VERSION__).toBe('1.0.0');
  });
});
