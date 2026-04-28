declare global {
  var calculator: Calculator;
}

class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}

globalThis.calculator = new Calculator();

export default Calculator;
