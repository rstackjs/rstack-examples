/**
 * Polling utility for checking conditions
 */
export class Poller<T> {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  /**
   * Poll until condition is met or timeout
   */
  async poll(
    checkFn: () => T | Promise<T>,
    options: {
      interval?: number;
      timeout?: number;
      condition?: (result: T) => boolean;
    } = {},
  ): Promise<T> {
    const { interval = 100, timeout = 5000, condition = Boolean } = options;

    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      const check = async () => {
        try {
          const result = await checkFn();

          if (condition(result)) {
            this.stop();
            resolve(result);
          } else if (Date.now() - startTime >= timeout) {
            this.stop();
            reject(new Error(`Polling timeout after ${timeout}ms`));
          }
        } catch (error) {
          this.stop();
          reject(error);
        }
      };

      // Set timeout for overall polling
      this.timeoutId = setTimeout(() => {
        this.stop();
        reject(new Error(`Polling timeout after ${timeout}ms`));
      }, timeout);

      // Start polling
      this.intervalId = setInterval(check, interval);

      // Check immediately
      check();
    });
  }

  /**
   * Stop polling
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}

/**
 * Rate limiter using token bucket algorithm
 */
export class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private readonly maxTokens: number;
  private readonly refillRate: number; // tokens per second

  constructor(maxTokens: number, refillRate: number) {
    this.maxTokens = maxTokens;
    this.tokens = maxTokens;
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }

  /**
   * Try to acquire a token
   */
  tryAcquire(): boolean {
    this.refill();

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }

    return false;
  }

  /**
   * Get time until next token is available
   */
  getWaitTime(): number {
    this.refill();

    if (this.tokens >= 1) {
      return 0;
    }

    return Math.ceil(((1 - this.tokens) / this.refillRate) * 1000);
  }

  /**
   * Get current token count
   */
  getTokens(): number {
    this.refill();
    return Math.floor(this.tokens);
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}
