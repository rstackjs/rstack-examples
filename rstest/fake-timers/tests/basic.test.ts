import { afterEach, beforeEach, describe, expect, it, rstest } from '@rstest/core';

describe('rstest.useFakeTimers() - Basic Usage', () => {
  /**
   * rstest.useFakeTimers() replaces setTimeout, setInterval,
   * Date.now, and other time-related globals with mock implementations
   */

  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  describe('setTimeout', () => {
    it('should not execute callback until time advances', () => {
      let called = false;

      setTimeout(() => {
        called = true;
      }, 1000);

      expect(called).toBe(false);
    });

    it('should execute callback after advancing time', () => {
      let called = false;

      setTimeout(() => {
        called = true;
      }, 1000);

      rstest.advanceTimersByTime(1000);

      expect(called).toBe(true);
    });

    it('should not execute if time advanced partially', () => {
      let called = false;

      setTimeout(() => {
        called = true;
      }, 1000);

      rstest.advanceTimersByTime(500);

      expect(called).toBe(false);

      rstest.advanceTimersByTime(500);

      expect(called).toBe(true);
    });
  });

  describe('setInterval', () => {
    it('should execute interval callback multiple times', () => {
      let count = 0;

      setInterval(() => {
        count++;
      }, 100);

      rstest.advanceTimersByTime(350);

      expect(count).toBe(3);
    });

    it('should stop interval with clearInterval', () => {
      let count = 0;

      const intervalId = setInterval(() => {
        count++;
      }, 100);

      rstest.advanceTimersByTime(250);
      expect(count).toBe(2);

      clearInterval(intervalId);

      rstest.advanceTimersByTime(200);
      expect(count).toBe(2); // Should not increase
    });
  });
});

describe('rstest.advanceTimersByTime()', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should advance time by specified milliseconds', () => {
    const results: number[] = [];

    setTimeout(() => results.push(1), 100);
    setTimeout(() => results.push(2), 200);
    setTimeout(() => results.push(3), 300);

    rstest.advanceTimersByTime(150);
    expect(results).toEqual([1]);

    rstest.advanceTimersByTime(100);
    expect(results).toEqual([1, 2]);

    rstest.advanceTimersByTime(100);
    expect(results).toEqual([1, 2, 3]);
  });

  it('should handle nested timers', () => {
    const results: string[] = [];

    setTimeout(() => {
      results.push('first');
      setTimeout(() => {
        results.push('nested');
      }, 100);
    }, 100);

    rstest.advanceTimersByTime(100);
    expect(results).toEqual(['first']);

    rstest.advanceTimersByTime(100);
    expect(results).toEqual(['first', 'nested']);
  });
});

describe('rstest.advanceTimersByTimeAsync()', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should advance time and flush promises', async () => {
    let resolved = false;

    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolved = true;
        resolve();
      }, 1000);
    });

    await rstest.advanceTimersByTimeAsync(1000);

    expect(resolved).toBe(true);
    await promise;
  });
});

describe('rstest.runAllTimers()', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should run all pending timers', () => {
    const results: number[] = [];

    setTimeout(() => results.push(1), 100);
    setTimeout(() => results.push(2), 500);
    setTimeout(() => results.push(3), 1000);

    rstest.runAllTimers();

    expect(results).toEqual([1, 2, 3]);
  });

  it('should run nested timers', () => {
    const results: string[] = [];

    setTimeout(() => {
      results.push('a');
      setTimeout(() => {
        results.push('b');
        setTimeout(() => {
          results.push('c');
        }, 100);
      }, 100);
    }, 100);

    rstest.runAllTimers();

    expect(results).toEqual(['a', 'b', 'c']);
  });
});

describe('rstest.runAllTimersAsync()', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should run all timers and flush promises', async () => {
    const results: string[] = [];

    setTimeout(async () => {
      await Promise.resolve();
      results.push('async-1');
    }, 100);

    setTimeout(async () => {
      await Promise.resolve();
      results.push('async-2');
    }, 200);

    await rstest.runAllTimersAsync();

    expect(results).toEqual(['async-1', 'async-2']);
  });
});

describe('rstest.runOnlyPendingTimers()', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should only run currently pending timers', () => {
    const results: string[] = [];

    setTimeout(() => {
      results.push('first');
      setTimeout(() => {
        results.push('nested');
      }, 100);
    }, 100);

    rstest.runOnlyPendingTimers();

    // Only first timer runs, nested is not yet pending
    expect(results).toEqual(['first']);

    rstest.runOnlyPendingTimers();

    expect(results).toEqual(['first', 'nested']);
  });

  it('should be useful for interval testing', () => {
    let count = 0;

    setInterval(() => {
      count++;
    }, 100);

    rstest.runOnlyPendingTimers();
    expect(count).toBe(1);

    rstest.runOnlyPendingTimers();
    expect(count).toBe(2);
  });
});

describe('rstest.advanceTimersToNextTimer()', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should advance to next timer only', () => {
    const results: number[] = [];

    setTimeout(() => results.push(1), 100);
    setTimeout(() => results.push(2), 200);
    setTimeout(() => results.push(3), 300);

    rstest.advanceTimersToNextTimer();
    expect(results).toEqual([1]);

    rstest.advanceTimersToNextTimer();
    expect(results).toEqual([1, 2]);

    rstest.advanceTimersToNextTimer();
    expect(results).toEqual([1, 2, 3]);
  });

  it('should handle multiple steps', () => {
    const results: string[] = [];

    setTimeout(() => results.push('a'), 50);
    setTimeout(() => results.push('b'), 100);
    setTimeout(() => results.push('c'), 150);

    rstest.advanceTimersToNextTimer(2);

    expect(results).toEqual(['a', 'b']);
  });
});

describe('rstest.getTimerCount()', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should return count of pending timers', () => {
    expect(rstest.getTimerCount()).toBe(0);

    setTimeout(() => {}, 100);
    expect(rstest.getTimerCount()).toBe(1);

    setTimeout(() => {}, 200);
    setTimeout(() => {}, 300);
    expect(rstest.getTimerCount()).toBe(3);

    rstest.runAllTimers();
    expect(rstest.getTimerCount()).toBe(0);
  });

  it('should count intervals as one timer each', () => {
    const id = setInterval(() => {}, 100);
    expect(rstest.getTimerCount()).toBe(1);

    clearInterval(id);
    expect(rstest.getTimerCount()).toBe(0);
  });
});

describe('rstest.clearAllTimers()', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should clear all pending timers', () => {
    let called = false;

    setTimeout(() => {
      called = true;
    }, 1000);
    setInterval(() => {
      called = true;
    }, 500);

    expect(rstest.getTimerCount()).toBe(2);

    rstest.clearAllTimers();

    expect(rstest.getTimerCount()).toBe(0);

    rstest.advanceTimersByTime(2000);
    expect(called).toBe(false);
  });
});
