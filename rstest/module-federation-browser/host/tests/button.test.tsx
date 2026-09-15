import { page } from '@rstest/browser';
import { render } from '@rstest/browser-react';
import { expect, it } from '@rstest/core';
import Button from 'remote/Button';

it('renders and clicks the federated Button in the browser', { timeout: 15_000 }, async () => {
  await render(<Button label="Federated button" />);

  const button = page.getByRole('button', { name: /Federated button/ });
  await expect.element(button).toHaveText('Federated button (clicked 0)');

  await button.click();

  await expect.element(button).toHaveText('Federated button (clicked 1)');
});
