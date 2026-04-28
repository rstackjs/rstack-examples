import './index.css';

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  onClick,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600';

  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const buttonStyle = `rounded ${mode} ${
    sizeClasses[size]
  } text-white font-medium ${backgroundColor ? `bg-${backgroundColor}` : ''}`;

  return (
    <button className={buttonStyle} onClick={onClick} {...props}>
      {label}
    </button>
  );
};
