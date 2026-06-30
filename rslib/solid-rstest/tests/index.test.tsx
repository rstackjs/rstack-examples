import { render, screen } from '@solidjs/testing-library';
import { expect, test } from '@rstest/core';
import { CounterButton } from '../src';

test('CounterButton should render and update count', () => {
  render(() => <CounterButton initialValue={2} step={3} primary />);

  const value = screen.getByTestId('counter-value');
  const button = screen.getByTestId('increment-button') as HTMLButtonElement;

  expect(value.textContent).toBe('2');
  button.click();
  expect(value.textContent).toBe('5');
});
