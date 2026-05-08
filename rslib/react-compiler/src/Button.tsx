import './button.css';

interface ButtonProps {
  label: string;
  primary?: boolean;
}

export const Button = ({ label, primary = false }: ButtonProps) => {
  return (
    <button type="button" className={primary ? 'demo-button demo-button--primary' : 'demo-button'}>
      {label}
    </button>
  );
};
