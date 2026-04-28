import './button.css';

export interface ButtonProps {
  /**
   * Whether the button is primary
   * @default true
   */
  primary?: boolean;
  /**
   * Background color of the button
   */
  backgroundColor?: string;
  /**
   * Size of Button
   * @default 'large'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Label of the button
   */
  label: string;
}

export const Button = ({
  primary = true,
  size = 'large',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'demo-button--primary' : 'demo-button--secondary';
  return (
    <button
      type="button"
      className={['demo-button', `demo-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
