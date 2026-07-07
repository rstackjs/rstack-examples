import { render, screen } from '@solidjs/testing-library';
import { expect, test } from '@rstest/core';
import { Button } from '../src';

test('The button should handle click events', () => {
  let count = 0;
  render(() => (
    <Button
      backgroundColor="#ccc"
      label="Demo Button"
      onClick={() => {
        count += 1;
      }}
    />
  ));

  const button = screen.getByText('Demo Button') as HTMLButtonElement;

  expect(count).toBe(0);
  button.click();
  expect(count).toBe(1);
});
