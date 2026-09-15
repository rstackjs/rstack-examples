import { useState } from 'react';

export interface ButtonProps {
  label?: string;
}

export default function Button({ label = 'Federated button' }: ButtonProps) {
  const [count, setCount] = useState(0);

  return (
    <button type="button" className="remote-button" onClick={() => setCount((value) => value + 1)}>
      {label} (clicked {count})
    </button>
  );
}
