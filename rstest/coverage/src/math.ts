/**
 * Basic math utilities demonstrating line and function coverage
 */

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

/**
 * Calculate the factorial of a number
 * Demonstrates branch coverage with recursion
 */
export function factorial(n: number): number {
  if (n < 0) {
    throw new Error('Cannot calculate factorial of negative number');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

/**
 * This function is intentionally NOT tested to show uncovered code
 */
export function untested_power(base: number, exponent: number): number {
  if (exponent === 0) {
    return 1;
  }
  if (exponent < 0) {
    return 1 / untested_power(base, -exponent);
  }
  return base * untested_power(base, exponent - 1);
}
