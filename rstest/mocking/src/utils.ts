/**
 * Utility functions for mocking demonstration
 */

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Get current timestamp
 */
export function getTimestamp(): number {
  return Date.now();
}

/**
 * Format a date
 */
export function formatDate(date: Date): string {
  return date.toISOString();
}

/**
 * Sleep for a given number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Log a message with timestamp
 */
export function log(message: string): void {
  console.log(`[${new Date().toISOString()}] ${message}`);
}
