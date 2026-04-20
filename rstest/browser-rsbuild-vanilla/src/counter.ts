export function createCounter(initialValue = 0) {
  let value = initialValue;

  const container = document.createElement('div');
  container.className = 'counter';

  const display = document.createElement('span');
  display.className = 'counter-display';
  display.textContent = String(value);
  display.setAttribute('data-testid', 'counter-value');

  const incrementBtn = document.createElement('button');
  incrementBtn.textContent = '+';
  incrementBtn.setAttribute('data-testid', 'increment-btn');

  const decrementBtn = document.createElement('button');
  decrementBtn.textContent = '-';
  decrementBtn.setAttribute('data-testid', 'decrement-btn');

  const updateDisplay = () => {
    display.textContent = String(value);
  };

  const increment = () => {
    value++;
    updateDisplay();
  };

  const decrement = () => {
    value--;
    updateDisplay();
  };

  incrementBtn.addEventListener('click', increment);
  decrementBtn.addEventListener('click', decrement);

  container.appendChild(decrementBtn);
  container.appendChild(display);
  container.appendChild(incrementBtn);

  return {
    element: container,
    getValue: () => value,
    increment,
    decrement,
  };
}
