onmessage = async (event) => {
  const { fibonacci } = await import('./fibonacci.js');
  const value = JSON.parse(event.data);
  postMessage(`fib(${value}) = ${fibonacci(value)}`);
};
