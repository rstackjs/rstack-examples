import { act, cleanup, renderHook } from '@rstest/browser-react';
import { afterEach, describe, expect, it } from '@rstest/core';
import { useCounter, usePrevious, useToggle } from '../src/hooks';

describe('renderHook - useCounter', () => {
  afterEach(() => {
    cleanup();
  });

  it('should initialize with value', async () => {
    const { result } = await renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('should increment with act', async () => {
    const { result } = await renderHook(() => useCounter(0));

    await act(() => result.current.increment());

    expect(result.current.count).toBe(1);
  });
});

describe('renderHook - useToggle', () => {
  afterEach(() => {
    cleanup();
  });

  it('should toggle value', async () => {
    const { result } = await renderHook(() => useToggle(false));

    await act(() => result.current.toggle());
    expect(result.current.value).toBe(true);

    await act(() => result.current.toggle());
    expect(result.current.value).toBe(false);
  });
});

describe('renderHook - usePrevious', () => {
  afterEach(() => {
    cleanup();
  });

  it('should return previous value after rerender', async () => {
    let value = 1;
    const { result, rerender } = await renderHook(() => usePrevious(value));

    expect(result.current).toBeUndefined();

    value = 2;
    await rerender();
    expect(result.current).toBe(1);
  });
});
