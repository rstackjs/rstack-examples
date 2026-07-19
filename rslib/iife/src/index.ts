class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}

const globalScope = globalThis as typeof globalThis & {
  calculator: Calculator;
};

globalScope.calculator = new Calculator();
