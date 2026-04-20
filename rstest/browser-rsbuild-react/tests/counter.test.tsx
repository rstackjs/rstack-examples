import { act, cleanup, render } from '@rstest/browser-react';
import { afterEach, describe, expect, it } from '@rstest/core';
import { getByTestId } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Counter } from '../src/components/Counter';

describe('render - Component Testing', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render with initial value', async () => {
    const { container } = await render(<Counter initialValue={10} />);
    expect(getByTestId(container, 'counter-value').textContent).toBe('10');
  });

  it('should increment on button click', async () => {
    const user = userEvent.setup();
    const { container } = await render(<Counter />);

    await act(() => user.click(getByTestId(container, 'increment-btn')));

    expect(getByTestId(container, 'counter-value').textContent).toBe('1');
  });

  it('should clean up on unmount', async () => {
    const { container, unmount } = await render(<Counter />);
    expect(container.querySelector('[data-testid="counter"]')).not.toBeNull();

    await unmount();
    expect(container.innerHTML).toBe('');
  });
});
