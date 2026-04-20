import { describe, expect, it } from '@rstest/core';
import { createTestContext, waitFor } from '@test-utils';

describe('modifyLibConfig - Custom Test Aliases', () => {
  /**
   * Tests that the modifyLibConfig option in withRslibConfig
   * allows adding custom aliases for testing
   */

  it('should resolve @test-utils alias added via modifyLibConfig', () => {
    // The @test-utils alias is added in rstest.config.ts via modifyLibConfig
    const ctx = createTestContext({ value: 0 });

    expect(ctx.get()).toEqual({ value: 0 });
  });

  it('should use test utilities correctly', () => {
    const ctx = createTestContext({ name: 'test', count: 0 });

    ctx.set({ count: 5 });
    expect(ctx.get()).toEqual({ name: 'test', count: 5 });

    ctx.reset();
    expect(ctx.get()).toEqual({ name: 'test', count: 0 });
  });

  it('should support async test utilities', async () => {
    const start = Date.now();
    await waitFor(50);
    const elapsed = Date.now() - start;

    expect(elapsed).toBeGreaterThanOrEqual(45);
  });
});
