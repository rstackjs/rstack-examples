// Declare compile-time constants
declare const __VERSION__: string;
declare const __DEV__: boolean;

/**
 * Get library version from define
 */
export function getVersion(): string {
  return __VERSION__;
}

/**
 * Check if in development mode
 */
export function isDev(): boolean {
  return __DEV__;
}

/**
 * Get library name from environment
 */
export function getLibName(): string {
  return process.env.LIB_NAME || 'unknown';
}

// Re-export utilities
export * from '@utils';
