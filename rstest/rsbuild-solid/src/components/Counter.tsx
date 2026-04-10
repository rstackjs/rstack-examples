import { createSignal } from 'solid-js';
import { getDefaultStep } from '@/utils/step';

export interface CounterProps {
  initialValue?: number;
  step?: number;
}

export function Counter(props: CounterProps) {
  const initialValue = props.initialValue ?? 0;
  const step = props.step ?? getDefaultStep();
  const [count, setCount] = createSignal(initialValue);

  return (
    <div data-testid="counter">
      <button
        type="button"
        onClick={() => setCount((value) => value - step)}
        data-testid="decrement-btn"
      >
        -
      </button>
      <span data-testid="counter-value">{count()}</span>
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
