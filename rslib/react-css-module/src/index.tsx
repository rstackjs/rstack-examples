import type React from 'react';
import { CounterButton } from './components/CounterButton';
import { useCounter } from './useCounter';

export const Counter: React.FC = () => {
  const { increment, decrement } = useCounter();

  return (
    <div>
      <CounterButton onClick={decrement} label="-" />
      <CounterButton onClick={increment} label="+" />
    </div>
  );
};
