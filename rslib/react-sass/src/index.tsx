import type React from 'react';
import { useCounter } from './useCounter';
import './index.scss';

export const Counter: React.FC = () => {
  const { count } = useCounter();

  return (
    <div>
      <h1 className="counter-title">React</h1>
      <h2 className="counter-text">Counter: {count}</h2>
    </div>
  );
};
