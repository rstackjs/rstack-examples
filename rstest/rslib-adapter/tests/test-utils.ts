/**
 * Test utilities for rslib-adapter example
 */

export function createTestContext<T extends object>(initial: T) {
  let context = { ...initial };

  return {
    get: () => context,
    set: (partial: Partial<T>) => {
      context = { ...context, ...partial };
    },
    reset: () => {
      context = { ...initial };
    },
  };
}

export function waitFor(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
