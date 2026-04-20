/**
 * Countdown timer
 */
export class CountdownTimer {
  private remaining: number;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private onTick?: (remaining: number) => void;
  private onComplete?: () => void;

  constructor(durationMs: number) {
    this.remaining = durationMs;
  }

  /**
   * Set callback for each tick
   */
  setOnTick(callback: (remaining: number) => void): void {
    this.onTick = callback;
  }

  /**
   * Set callback for when timer completes
   */
  setOnComplete(callback: () => void): void {
    this.onComplete = callback;
  }

  /**
   * Start the countdown
   */
  start(tickInterval = 1000): void {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.remaining -= tickInterval;

      if (this.remaining <= 0) {
        this.remaining = 0;
        this.stop();
        this.onTick?.(0);
        this.onComplete?.();
      } else {
        this.onTick?.(this.remaining);
      }
    }, tickInterval);
  }

  /**
   * Stop the countdown
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Get remaining time
   */
  getRemaining(): number {
    return this.remaining;
  }

  /**
   * Check if timer is running
   */
  isRunning(): boolean {
    return this.intervalId !== null;
  }
}

/**
 * Stopwatch for measuring elapsed time
 */
export class Stopwatch {
  private startTime: number | null = null;
  private elapsedTime = 0;
  private running = false;

  /**
   * Start the stopwatch
   */
  start(): void {
    if (!this.running) {
      this.startTime = Date.now();
      this.running = true;
    }
  }

  /**
   * Stop the stopwatch
   */
  stop(): void {
    if (this.running && this.startTime !== null) {
      this.elapsedTime += Date.now() - this.startTime;
      this.running = false;
      this.startTime = null;
    }
  }

  /**
   * Reset the stopwatch
   */
  reset(): void {
    this.startTime = null;
    this.elapsedTime = 0;
    this.running = false;
  }

  /**
   * Get elapsed time in milliseconds
   */
  getElapsed(): number {
    if (this.running && this.startTime !== null) {
      return this.elapsedTime + (Date.now() - this.startTime);
    }
    return this.elapsedTime;
  }

  /**
   * Check if stopwatch is running
   */
  isRunning(): boolean {
    return this.running;
  }
}
