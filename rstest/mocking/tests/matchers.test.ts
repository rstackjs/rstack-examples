import { describe, expect, it, rstest } from '@rstest/core';

describe('Mock Matchers', () => {
  /**
   * Special matchers for asserting mock function calls
   */

  describe('toHaveBeenCalled / toHaveBeenCalledTimes', () => {
    it('should check if mock was called', () => {
      const mockFn = rstest.fn();

      expect(mockFn).not.toHaveBeenCalled();

      mockFn();

      expect(mockFn).toHaveBeenCalled();
    });

    it('should check exact call count', () => {
      const mockFn = rstest.fn();

      mockFn();
      mockFn();
      mockFn();

      expect(mockFn).toHaveBeenCalledTimes(3);
    });
  });

  describe('toHaveBeenCalledWith', () => {
    it('should check call arguments', () => {
      const mockFn = rstest.fn();

      mockFn('hello', 123, { key: 'value' });

      expect(mockFn).toHaveBeenCalledWith('hello', 123, { key: 'value' });
    });

    it('should work with partial matchers', () => {
      const mockFn = rstest.fn();

      mockFn({ name: 'John', age: 30, city: 'NYC' });

      expect(mockFn).toHaveBeenCalledWith(expect.objectContaining({ name: 'John' }));
    });

    it('should work with array matchers', () => {
      const mockFn = rstest.fn();

      mockFn([1, 2, 3, 4, 5]);

      expect(mockFn).toHaveBeenCalledWith(expect.arrayContaining([1, 2, 3]));
    });
  });

  describe('toHaveBeenLastCalledWith', () => {
    it('should check last call arguments', () => {
      const mockFn = rstest.fn();

      mockFn('first');
      mockFn('second');
      mockFn('last');

      expect(mockFn).toHaveBeenLastCalledWith('last');
    });
  });

  describe('toHaveBeenNthCalledWith', () => {
    it('should check nth call arguments', () => {
      const mockFn = rstest.fn();

      mockFn('a');
      mockFn('b');
      mockFn('c');

      expect(mockFn).toHaveBeenNthCalledWith(1, 'a');
      expect(mockFn).toHaveBeenNthCalledWith(2, 'b');
      expect(mockFn).toHaveBeenNthCalledWith(3, 'c');
    });
  });

  describe('toHaveReturned / toHaveReturnedWith', () => {
    it('should check if mock returned', () => {
      const mockFn = rstest.fn().mockReturnValue(42);

      mockFn();

      expect(mockFn).toHaveReturned();
    });

    it('should check return value', () => {
      const mockFn = rstest.fn().mockReturnValue('result');

      mockFn();

      expect(mockFn).toHaveReturnedWith('result');
    });

    it('should check return times', () => {
      const mockFn = rstest.fn().mockReturnValue(true);

      mockFn();
      mockFn();

      expect(mockFn).toHaveReturnedTimes(2);
    });

    it('should check last return value', () => {
      const mockFn = rstest
        .fn()
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(3);

      mockFn();
      mockFn();
      mockFn();

      expect(mockFn).toHaveLastReturnedWith(3);
    });

    it('should check nth return value', () => {
      const mockFn = rstest.fn().mockReturnValueOnce('first').mockReturnValueOnce('second');

      mockFn();
      mockFn();

      expect(mockFn).toHaveNthReturnedWith(1, 'first');
      expect(mockFn).toHaveNthReturnedWith(2, 'second');
    });
  });
});

describe('Asymmetric Matchers with Mocks', () => {
  it('should use expect.any()', () => {
    const mockFn = rstest.fn();

    mockFn(42, 'string', new Date());

    expect(mockFn).toHaveBeenCalledWith(expect.any(Number), expect.any(String), expect.any(Date));
  });

  it('should use expect.stringContaining()', () => {
    const mockFn = rstest.fn();

    mockFn('Hello, World!');

    expect(mockFn).toHaveBeenCalledWith(expect.stringContaining('World'));
  });

  it('should use expect.stringMatching()', () => {
    const mockFn = rstest.fn();

    mockFn('user@example.com');

    expect(mockFn).toHaveBeenCalledWith(expect.stringMatching(/@example\.com$/));
  });

  it('should use expect.objectContaining()', () => {
    const mockFn = rstest.fn();

    mockFn({
      id: 1,
      name: 'Test',
      email: 'test@example.com',
      createdAt: new Date(),
    });

    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: 'Test',
      }),
    );
  });

  it('should combine multiple asymmetric matchers', () => {
    const mockFn = rstest.fn();

    mockFn({
      user: { id: 123, name: 'John' },
      timestamp: Date.now(),
      message: 'User logged in successfully',
    });

    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        }),
        timestamp: expect.any(Number),
        message: expect.stringContaining('logged in'),
      }),
    );
  });
});
