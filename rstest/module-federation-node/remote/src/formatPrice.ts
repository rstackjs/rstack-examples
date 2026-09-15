const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  CNY: '¥',
};

export default function formatPrice(cents: number, currency: string = 'USD'): string {
  const symbol = currencySymbols[currency] ?? currency;
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  const units = Math.floor(abs / 100);
  const minor = abs % 100;

  return `${sign}${symbol}${units}.${String(minor).padStart(2, '0')}`;
}
