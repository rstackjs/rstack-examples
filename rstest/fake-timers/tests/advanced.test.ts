import { afterEach, beforeEach, describe, expect, it, rstest } from '@rstest/core';
import { RateLimiter } from '../src/polling';
import { retryWithBackoff } from '../src/timing';

describe('RateLimiter with Fake Timers', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
    rstest.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should allow requests up to max tokens', () => {
    const limiter = new RateLimiter(3, 1);

    expect(limiter.tryAcquire()).toBe(true);
    expect(limiter.tryAcquire()).toBe(true);
    expect(limiter.tryAcquire()).toBe(true);
    expect(limiter.tryAcquire()).toBe(false);
  });

  it('should refill tokens over time', () => {
    const limiter = new RateLimiter(3, 1); // 1 token per second

    limiter.tryAcquire();
    limiter.tryAcquire();
    limiter.tryAcquire();
    expect(limiter.getTokens()).toBe(0);

    rstest.advanceTimersByTime(2000);

    expect(limiter.getTokens()).toBe(2);
    expect(limiter.tryAcquire()).toBe(true);
    expect(limiter.tryAcquire()).toBe(true);
  });

  it('should not exceed max tokens', () => {
    const limiter = new RateLimiter(3, 1);

    rstest.advanceTimersByTime(10000);

    expect(limiter.getTokens()).toBe(3);
  });

  it('should calculate wait time correctly', () => {
    const limiter = new RateLimiter(1, 1);

    limiter.tryAcquire();
    expect(limiter.getWaitTime()).toBeGreaterThan(0);

    rstest.advanceTimersByTime(1000);
    expect(limiter.getWaitTime()).toBe(0);
  });
});

describe('retryWithBackoff with Fake Timers', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should succeed on first attempt', async () => {
    const fn = rstest.fn().mockResolvedValue('success');

    const resultPromise = retryWithBackoff(fn, { maxRetries: 3 });

    await rstest.runAllTimersAsync();

    const result = await resultPromise;
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry on failure and eventually succeed', async () => {
    const fn = rstest.fn().mockRejectedValueOnce(new Error('fail 1')).mockResolvedValue('success');

    const resultPromise = retryWithBackoff(fn, {
      maxRetries: 3,
      initialDelay: 100,
    });

    // Run all timers to complete the retry cycle
    await rstest.runAllTimersAsync();

    const result = await resultPromise;
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2); // Initial + 1 retry
  });
});

describe('Timeout Patterns with Fake Timers', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should handle promise race with timers', async () => {
    let resolved = false;

    const slowPromise = new Promise<string>((resolve) => {
      setTimeout(() => {
        resolved = true;
        resolve('done');
      }, 500);
    });

    // Start the promise
    slowPromise.then(() => {});

    expect(resolved).toBe(false);

    await rstest.advanceTimersByTimeAsync(500);

    expect(resolved).toBe(true);
  });

  it('should handle multiple concurrent timers', async () => {
    const results: string[] = [];

    setTimeout(() => results.push('first'), 100);
    setTimeout(() => results.push('second'), 200);
    setTimeout(() => results.push('third'), 300);

    expect(results).toEqual([]);

    await rstest.advanceTimersByTimeAsync(150);
    expect(results).toEqual(['first']);

    await rstest.advanceTimersByTimeAsync(100);
    expect(results).toEqual(['first', 'second']);

    await rstest.advanceTimersByTimeAsync(100);
    expect(results).toEqual(['first', 'second', 'third']);
  });
});
