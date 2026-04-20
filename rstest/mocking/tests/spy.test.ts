import { afterEach, beforeEach, describe, expect, it, rstest } from '@rstest/core';
import { Logger } from '../src/logger';

describe('rstest.spyOn() - Spying on Methods', () => {
  /**
   * rstest.spyOn() creates a spy on an existing method,
   * allowing you to track calls while preserving the original implementation
   */

  describe('Basic Usage', () => {
    it('should spy on object method', () => {
      const calculator = {
        add: (a: number, b: number) => a + b,
      };

      const spy = rstest.spyOn(calculator, 'add');

      const result = calculator.add(2, 3);

      expect(result).toBe(5);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(2, 3);
    });

    it('should track multiple calls', () => {
      const obj = {
        greet: (name: string) => `Hello, ${name}!`,
      };

      const spy = rstest.spyOn(obj, 'greet');

      obj.greet('Alice');
      obj.greet('Bob');
      obj.greet('Charlie');

      expect(spy).toHaveBeenCalledTimes(3);
      expect(spy).toHaveBeenNthCalledWith(1, 'Alice');
      expect(spy).toHaveBeenNthCalledWith(2, 'Bob');
      expect(spy).toHaveBeenNthCalledWith(3, 'Charlie');
    });
  });

  describe('Mocking Implementation', () => {
    it('should mock the implementation', () => {
      const api = {
        fetchData: () => 'real data',
      };

      const spy = rstest.spyOn(api, 'fetchData').mockReturnValue('mocked data');

      expect(api.fetchData()).toBe('mocked data');
      expect(spy).toHaveBeenCalled();
    });

    it('should mock with custom implementation', () => {
      const math = {
        multiply: (a: number, b: number) => a * b,
      };

      rstest.spyOn(math, 'multiply').mockImplementation((a, b) => a + b);

      expect(math.multiply(2, 3)).toBe(5); // Returns sum instead of product
    });

    it('should restore original implementation', () => {
      const obj = {
        getValue: () => 'original',
      };

      const spy = rstest.spyOn(obj, 'getValue').mockReturnValue('mocked');

      expect(obj.getValue()).toBe('mocked');

      spy.mockRestore();

      expect(obj.getValue()).toBe('original');
    });
  });

  describe('Spying on Class Methods', () => {
    let logger: Logger;

    beforeEach(() => {
      logger = new Logger('Test');
    });

    afterEach(() => {
      rstest.restoreAllMocks();
    });

    it('should spy on class instance method', () => {
      const infoSpy = rstest.spyOn(logger, 'info');

      logger.info('Test message');

      expect(infoSpy).toHaveBeenCalledWith('Test message');
    });

    it('should spy on multiple methods', () => {
      const infoSpy = rstest.spyOn(logger, 'info');
      const errorSpy = rstest.spyOn(logger, 'error');

      logger.info('Info message');
      logger.error('Error message');

      expect(infoSpy).toHaveBeenCalledWith('Info message');
      expect(errorSpy).toHaveBeenCalledWith('Error message');
    });

    it('should mock class method implementation', () => {
      const warnSpy = rstest.spyOn(logger, 'warn').mockImplementation(() => {
        // Do nothing - suppress output
      });

      logger.warn('This should be suppressed');

      expect(warnSpy).toHaveBeenCalled();
    });
  });

  describe('Spying on Console', () => {
    afterEach(() => {
      rstest.restoreAllMocks();
    });

    it('should spy on console.log', () => {
      const consoleSpy = rstest.spyOn(console, 'log').mockImplementation(() => {});

      console.log('Hello', 'World');

      expect(consoleSpy).toHaveBeenCalledWith('Hello', 'World');
    });

    it('should spy on console.error', () => {
      const consoleSpy = rstest.spyOn(console, 'error').mockImplementation(() => {});

      console.error('Error occurred');

      expect(consoleSpy).toHaveBeenCalledWith('Error occurred');
    });
  });

  describe('Spying on Getters and Setters', () => {
    it('should spy on getter', () => {
      const obj = {
        _value: 42,
        get value() {
          return this._value;
        },
      };

      const spy = rstest.spyOn(obj, 'value', 'get').mockReturnValue(100);

      expect(obj.value).toBe(100);
      expect(spy).toHaveBeenCalled();
    });

    it('should spy on setter', () => {
      const obj = {
        _value: 0,
        get value() {
          return this._value;
        },
        set value(v: number) {
          this._value = v;
        },
      };

      const spy = rstest.spyOn(obj, 'value', 'set');

      obj.value = 42;

      expect(spy).toHaveBeenCalledWith(42);
    });
  });
});
