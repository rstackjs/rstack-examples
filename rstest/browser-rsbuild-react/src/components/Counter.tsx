import { useState } from 'react';

export interface CounterProps {
  initialValue?: number;
  step?: number;
}

export function Counter({ initialValue = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <div data-testid="counter">
      <button
        type="button"
        onClick={() => setCount((c) => c - step)}
        aria-label="Decrement"
        data-testid="decrement-btn"
      >
        -
      </button>
      <span data-testid="counter-value">{count}</span>
      <button
        type="button"
        onClick={() => setCount((c) => c + step)}
        aria-label="Increment"
        data-testid="increment-btn"
      >
        +
      </button>
      <button
        type="button"
        onClick={() => setCount(initialValue)}
        aria-label="Reset"
        data-testid="reset-btn"
      >
        Reset
      </button>
    </div>
  );
}
