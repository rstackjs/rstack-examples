import { createSignal, type Component } from 'solid-js';
import './button.css';

export interface CounterButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  initialValue?: number;
  step?: number;
}

export const CounterButton: Component<CounterButtonProps> = ({
  primary = false,
  size = 'medium',
  initialValue = 0,
  step = 1,
}) => {
  const mode = primary ? 'demo-button--primary' : 'demo-button--secondary';
  const [count, setCount] = createSignal(initialValue);

  return (
    <div class="counter-card" data-testid="counter-card">
      <span class="counter-card__label">Solid counter</span>
      <strong class="counter-card__value" data-testid="counter-value">
        {count()}
      </strong>
      <button
        type="button"
        class={`demo-button ${`demo-button--${size}`} ${mode}`}
        data-testid="increment-button"
        onClick={() => setCount((value) => value + step)}
      >
        Increment by {step}
      </button>
    </div>
  );
};
