import type React from 'react';
import styles from './index.module.css';

interface CounterButtonProps {
  onClick: () => void;
  label: string;
}

export const CounterButton: React.FC<CounterButtonProps> = ({ onClick, label }) => (
  <button type="button" className={`${styles.button} counter-button`} onClick={onClick}>
    {label}
  </button>
);
