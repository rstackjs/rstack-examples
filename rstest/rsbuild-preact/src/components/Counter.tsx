import { useState } from 'preact/hooks';
import { getDefaultStep } from '@/utils/step';

export interface CounterProps {
  initialValue?: number;
  step?: number;
}

export function Counter({ initialValue = 0, step = getDefaultStep() }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <div data-testid="counter">
      <button
        type="button"
        onClick={() => setCount((value) => value - step)}
        data-testid="decrement-btn"
      >
        -
      </button>
      <span data-testid="counter-value">{count}</span>
      <button
        type="button"
        onClick={() => setCount((value) => value + step)}
        data-testid="increment-btn"
      >
        +
      </button>
      <button type="button" onClick={() => setCount(initialValue)} data-testid="reset-btn">
        Reset
      </button>
    </div>
  );
}
