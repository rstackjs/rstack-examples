import { afterEach, beforeEach, describe, expect, it, rstest } from '@rstest/core';

describe('rstest.setSystemTime() - Mocking Date', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should set system time to specific date', () => {
    rstest.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));

    expect(new Date().toISOString()).toBe('2024-01-01T00:00:00.000Z');
    expect(Date.now()).toBe(new Date('2024-01-01T00:00:00.000Z').getTime());
  });

  it('should set system time using timestamp', () => {
    const timestamp = 1704067200000; // 2024-01-01
    rstest.setSystemTime(timestamp);

    expect(Date.now()).toBe(timestamp);
  });

  it('should advance time from set date', () => {
    rstest.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));

    rstest.advanceTimersByTime(1000 * 60 * 60); // 1 hour

    expect(new Date().toISOString()).toBe('2024-01-01T01:00:00.000Z');
  });

  it('should work with setTimeout and set date', () => {
    rstest.setSystemTime(new Date('2024-06-15T12:00:00.000Z'));

    const captured: { date: Date | null } = { date: null };

    setTimeout(() => {
      captured.date = new Date();
    }, 5000);

    rstest.advanceTimersByTime(5000);

    expect(captured.date?.toISOString()).toBe('2024-06-15T12:00:05.000Z');
  });
});

describe('Verifying Mocked System Time', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should verify mocked time via Date.now()', () => {
    rstest.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));

    expect(Date.now()).toBe(new Date('2024-01-01T00:00:00.000Z').getTime());

    rstest.advanceTimersByTime(1000);

    expect(Date.now()).toBe(new Date('2024-01-01T00:00:01.000Z').getTime());
  });
});

describe('Date Constructor with Fake Timers', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
    rstest.setSystemTime(new Date('2024-03-15T10:30:00.000Z'));
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should create Date with mocked time', () => {
    const date = new Date();

    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(2); // March (0-indexed)
    expect(date.getDate()).toBe(15);
    expect(date.getUTCHours()).toBe(10);
    expect(date.getUTCMinutes()).toBe(30);
  });

  it('should still allow creating specific dates', () => {
    const specificDate = new Date('2020-05-20T08:00:00.000Z');

    expect(specificDate.getFullYear()).toBe(2020);
    expect(specificDate.getMonth()).toBe(4); // May
    expect(specificDate.getDate()).toBe(20);
  });

  it('should work with date comparisons', () => {
    const now = new Date();
    const past = new Date('2024-01-01');
    const future = new Date('2024-12-31');

    expect(now > past).toBe(true);
    expect(now < future).toBe(true);
  });
});

describe('Performance.now() with Fake Timers', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should mock performance.now()', () => {
    const start = performance.now();

    rstest.advanceTimersByTime(1000);

    const end = performance.now();

    expect(end - start).toBe(1000);
  });
});

describe('Real-world Date Scenarios', () => {
  beforeEach(() => {
    rstest.useFakeTimers();
  });

  afterEach(() => {
    rstest.useRealTimers();
  });

  it('should test expiration logic', () => {
    rstest.setSystemTime(new Date('2024-01-15T00:00:00.000Z'));

    const expirationDate = new Date('2024-01-20T00:00:00.000Z');

    const isExpired = () => new Date() > expirationDate;

    expect(isExpired()).toBe(false);

    // Advance 4 days
    rstest.advanceTimersByTime(4 * 24 * 60 * 60 * 1000);
    expect(isExpired()).toBe(false);

    // Advance 2 more days (total 6 days = Jan 21)
    rstest.advanceTimersByTime(2 * 24 * 60 * 60 * 1000);
    expect(isExpired()).toBe(true);
  });

  it('should test scheduled task logic', () => {
    rstest.setSystemTime(new Date('2024-01-01T08:00:00.000Z'));

    const scheduledTasks: string[] = [];

    // Task scheduled for noon
    const noonTime = new Date('2024-01-01T12:00:00.000Z').getTime();
    const checkTime = () => {
      if (Date.now() >= noonTime) {
        scheduledTasks.push('noon-task');
      }
    };

    checkTime();
    expect(scheduledTasks).toEqual([]);

    // Advance to 11:00
    rstest.advanceTimersByTime(3 * 60 * 60 * 1000);
    checkTime();
    expect(scheduledTasks).toEqual([]);

    // Advance to 12:30
    rstest.advanceTimersByTime(1.5 * 60 * 60 * 1000);
    checkTime();
    expect(scheduledTasks).toEqual(['noon-task']);
  });
});
