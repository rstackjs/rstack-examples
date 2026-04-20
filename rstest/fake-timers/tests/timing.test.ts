import { afterEach, beforeEach, describe, expect, it, rstest } from '@rstest/core';
import { debounce, delay, throttle } from '../src/timing';

describe('Testing debounce with Fake Timers', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should not call function before delay', () => {
    const fn = rstest.fn();
    const debounced = debounce(fn, 500);

    debounced();

    expect(fn).not.toHaveBeenCalled();
  });

  it('should call function after delay', () => {
    const fn = rstest.fn();
    const debounced = debounce(fn, 500);

    debounced();

    rstest.advanceTimersByTime(500);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should reset timer on subsequent calls', () => {
    const fn = rstest.fn();
    const debounced = debounce(fn, 500);

    debounced();
    rstest.advanceTimersByTime(300);

    debounced();
    rstest.advanceTimersByTime(300);

    expect(fn).not.toHaveBeenCalled();

    rstest.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to debounced function', () => {
    const fn = rstest.fn();
    const debounced = debounce(fn, 500);

    debounced('arg1', 'arg2');

    rstest.advanceTimersByTime(500);

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should use last arguments when called multiple times', () => {
    const fn = rstest.fn();
    const debounced = debounce(fn, 500);

    debounced('first');
    debounced('second');
    debounced('third');

    rstest.advanceTimersByTime(500);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('third');
  });
});

describe('Testing throttle with Fake Timers', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should call function immediately on first call', () => {
    const fn = rstest.fn();
    const throttled = throttle(fn, 500);

    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should not call function again within wait period', () => {
    const fn = rstest.fn();
    const throttled = throttle(fn, 500);

    throttled();
    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should call function again after wait period', () => {
    const fn = rstest.fn();
    const throttled = throttle(fn, 500);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    rstest.advanceTimersByTime(500);

    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should queue trailing call', () => {
    const fn = rstest.fn();
    const throttled = throttle(fn, 500);

    throttled('first');
    throttled('second');

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('first');

    rstest.advanceTimersByTime(500);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith('second');
  });
});

describe('Testing delay with Fake Timers', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should resolve after specified delay', async () => {
    let resolved = false;

    delay(1000).then(() => {
      resolved = true;
    });

    expect(resolved).toBe(false);

    await rstest.advanceTimersByTimeAsync(1000);

    expect(resolved).toBe(true);
  });

  it('should work with async/await', async () => {
    const sequence: string[] = [];

    const asyncFn = async () => {
      sequence.push('start');
      await delay(500);
      sequence.push('middle');
      await delay(500);
      sequence.push('end');
    };

    const promise = asyncFn();

    expect(sequence).toEqual(['start']);

    await rstest.advanceTimersByTimeAsync(500);
    expect(sequence).toEqual(['start', 'middle']);

    await rstest.advanceTimersByTimeAsync(500);
    expect(sequence).toEqual(['start', 'middle', 'end']);

    await promise;
  });
});
