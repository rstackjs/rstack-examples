declare module 'remote/formatPrice' {
  const formatPrice: (cents: number, currency?: string) => string;
  export default formatPrice;
}

declare module 'remote/math' {
  export const add: (a: number, b: number) => number;
  export const multiply: (a: number, b: number) => number;
}
