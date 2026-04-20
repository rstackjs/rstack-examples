import { describe, expect, it } from '@rstest/core';
import { add, divide, factorial, multiply, subtract } from '../src/math';

describe('math utilities', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should add zero', () => {
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    it('should handle negative result', () => {
      expect(subtract(3, 5)).toBe(-2);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(4, 5)).toBe(20);
    });

    it('should handle zero', () => {
      expect(multiply(4, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });

    it('should handle decimal results', () => {
      expect(divide(5, 2)).toBe(2.5);
    });
  });

  describe('factorial', () => {
    it('should return 1 for factorial of 0', () => {
      expect(factorial(0)).toBe(1);
    });

    it('should return 1 for factorial of 1', () => {
      expect(factorial(1)).toBe(1);
    });

    it('should calculate factorial of positive numbers', () => {
      expect(factorial(5)).toBe(120);
      expect(factorial(3)).toBe(6);
    });

    it('should throw error for negative numbers', () => {
      expect(() => factorial(-1)).toThrow('Cannot calculate factorial of negative number');
    });
  });

  // Note: untested_power is intentionally NOT tested
  // to demonstrate uncovered code in coverage reports
});
