import { expect, test } from '@rstest/core';

// Load federated modules through their specifier so the remote container initializes first.

test('calls the federated formatPrice module', async () => {
  const { default: formatPrice } = await import('remote/formatPrice');

  expect(formatPrice(1250)).toBe('$12.50');
  expect(formatPrice(5)).toBe('$0.05');
  expect(formatPrice(-305, 'EUR')).toBe('-€3.05');
  expect(formatPrice(88800, 'CNY')).toBe('¥888.00');
});

test('calls the federated math module', async () => {
  const { add, multiply } = await import('remote/math');

  expect(add(2, 3)).toBe(5);
  expect(multiply(6, 7)).toBe(42);
});
