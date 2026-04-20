import { afterEach, beforeEach, describe, expect, it, rstest } from '@rstest/core';

describe('rstest.fn() - Mock Functions', () => {
  /**
   * rstest.fn() creates a mock function that tracks calls,
   * arguments, and return values
   */

  describe('Basic Usage', () => {
    it('should create a mock function', () => {
      const mockFn = rstest.fn();

      mockFn();
      mockFn('arg1', 'arg2');

      expect(mockFn).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should track call arguments', () => {
      const mockFn = rstest.fn();

      mockFn('first');
      mockFn('second', 123);
      mockFn({ key: 'value' });

      expect(mockFn).toHaveBeenCalledWith('first');
      expect(mockFn).toHaveBeenCalledWith('second', 123);
      expect(mockFn).toHaveBeenCalledWith({ key: 'value' });
      expect(mockFn).toHaveBeenLastCalledWith({ key: 'value' });
      expect(mockFn).toHaveBeenNthCalledWith(1, 'first');
    });
  });

  describe('mockReturnValue', () => {
    it('should return specified value', () => {
      const mockFn = rstest.fn().mockReturnValue(42);

      expect(mockFn()).toBe(42);
      expect(mockFn()).toBe(42);
    });

    it('should return different values with mockReturnValueOnce', () => {
      const mockFn = rstest.fn().mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValue(0);

      expect(mockFn()).toBe(1);
      expect(mockFn()).toBe(2);
      expect(mockFn()).toBe(0);
      expect(mockFn()).toBe(0);
    });
  });

  describe('mockImplementation', () => {
    it('should use custom implementation', () => {
      const mockFn = rstest.fn().mockImplementation((a: number, b: number) => a + b);

      expect(mockFn(2, 3)).toBe(5);
      expect(mockFn(10, 20)).toBe(30);
    });

    it('should use mockImplementationOnce', () => {
      const mockFn = rstest
        .fn()
        .mockImplementationOnce(() => 'first')
        .mockImplementationOnce(() => 'second')
        .mockImplementation(() => 'default');

      expect(mockFn()).toBe('first');
      expect(mockFn()).toBe('second');
      expect(mockFn()).toBe('default');
    });
  });

  describe('mockResolvedValue / mockRejectedValue', () => {
    it('should return resolved promise', async () => {
      const mockFn = rstest.fn().mockResolvedValue('success');

      const result = await mockFn();
      expect(result).toBe('success');
    });

    it('should return resolved values sequentially', async () => {
      const mockFn = rstest
        .fn()
        .mockResolvedValueOnce('first')
        .mockResolvedValueOnce('second')
        .mockResolvedValue('default');

      expect(await mockFn()).toBe('first');
      expect(await mockFn()).toBe('second');
      expect(await mockFn()).toBe('default');
    });

    it('should return rejected promise', async () => {
      const mockFn = rstest.fn().mockRejectedValue(new Error('failed'));

      await expect(mockFn()).rejects.toThrow('failed');
    });

    it('should reject once then resolve', async () => {
      const mockFn = rstest
        .fn()
        .mockRejectedValueOnce(new Error('first attempt failed'))
        .mockResolvedValue('success');

      await expect(mockFn()).rejects.toThrow('first attempt failed');
      expect(await mockFn()).toBe('success');
    });
  });

  describe('Mock Properties', () => {
    it('should access mock.calls', () => {
      const mockFn = rstest.fn();

      mockFn('a', 1);
      mockFn('b', 2);

      expect(mockFn.mock.calls).toEqual([
        ['a', 1],
        ['b', 2],
      ]);
    });

    it('should access mock.results', () => {
      const mockFn = rstest.fn().mockReturnValueOnce(10).mockReturnValueOnce(20);

      mockFn();
      mockFn();

      expect(mockFn.mock.results).toEqual([
        { type: 'return', value: 10 },
        { type: 'return', value: 20 },
      ]);
    });

    it('should access mock.lastCall', () => {
      const mockFn = rstest.fn();

      mockFn('first');
      mockFn('last');

      expect(mockFn.mock.lastCall).toEqual(['last']);
    });
  });

  describe('Reset and Clear', () => {
    it('should clear mock with mockClear', () => {
      const mockFn = rstest.fn().mockReturnValue(42);

      mockFn();
      mockFn();

      mockFn.mockClear();

      expect(mockFn.mock.calls).toEqual([]);
      expect(mockFn()).toBe(42); // Implementation still works
    });

    it('should reset mock with mockReset', () => {
      const mockFn = rstest.fn().mockReturnValue(42);

      mockFn();

      mockFn.mockReset();

      expect(mockFn.mock.calls).toEqual([]);
      expect(mockFn()).toBeUndefined(); // Implementation is reset
    });

    it('should restore mock with mockRestore', () => {
      const mockFn = rstest.fn().mockReturnValue(42);

      mockFn();

      mockFn.mockRestore();

      expect(mockFn.mock.calls).toEqual([]);
    });
  });
});

describe('rstest.isMockFunction()', () => {
  it('should return true for mock functions', () => {
    const mockFn = rstest.fn();
    expect(rstest.isMockFunction(mockFn)).toBe(true);
  });

  it('should return false for regular functions', () => {
    const regularFn = () => {};
    expect(rstest.isMockFunction(regularFn)).toBe(false);
  });
});

describe('Global Mock Management', () => {
  let mock1: ReturnType<typeof rstest.fn>;
  let mock2: ReturnType<typeof rstest.fn>;

  beforeEach(() => {
    mock1 = rstest.fn().mockReturnValue('a');
    mock2 = rstest.fn().mockReturnValue('b');

    mock1();
    mock2();
  });

  afterEach(() => {
    rstest.restoreAllMocks();
  });

  it('should clear all mocks with rstest.clearAllMocks', () => {
    rstest.clearAllMocks();

    expect(mock1.mock.calls).toEqual([]);
    expect(mock2.mock.calls).toEqual([]);

    // Implementations still work
    expect(mock1()).toBe('a');
    expect(mock2()).toBe('b');
  });

  it('should reset all mocks with rstest.resetAllMocks', () => {
    rstest.resetAllMocks();

    expect(mock1.mock.calls).toEqual([]);
    expect(mock2.mock.calls).toEqual([]);

    // Implementations are reset
    expect(mock1()).toBeUndefined();
    expect(mock2()).toBeUndefined();
  });
});
