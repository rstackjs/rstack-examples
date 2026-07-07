import type { Component } from 'solid-js';
import './button.css';

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export const Button: Component<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  onClick,
}) => {
  const mode = primary ? 'demo-button--primary' : 'demo-button--secondary';

  return (
    <button
      type="button"
      class={`demo-button demo-button--${size} ${mode}`}
      style={{ 'background-color': backgroundColor }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
