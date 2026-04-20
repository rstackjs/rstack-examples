import { describe, expect, it } from '@rstest/core';
import { getLibName, getVersion, isDev } from '@/index';

describe('Define - Compile-time Constants', () => {
  /**
   * Tests that the `define` configuration in rslib.config.ts is inherited
   * by rstest via withRslibConfig adapter
   */

  it('should get version from __VERSION__ define', () => {
    const version = getVersion();
    expect(version).toBe('1.0.0');
  });

  it('should get dev mode from __DEV__ define', () => {
    const dev = isDev();
    expect(dev).toBe(true);
  });

  it('should get lib name from process.env.LIB_NAME define', () => {
    const libName = getLibName();
    expect(libName).toBe('rstest-rslib-adapter');
  });
});

describe('Alias - Path Resolution', () => {
  /**
   * Tests that the `alias` configuration in rslib.config.ts is inherited
   * by rstest via withRslibConfig adapter
   */

  it('should resolve @ alias to src directory', async () => {
    // This import uses the @ alias configured in rslib.config.ts
    const { add } = await import('@/index');
    expect(add(1, 2)).toBe(3);
  });

  it('should resolve @utils alias', async () => {
    // This import uses the @utils alias
    const { multiply } = await import('@utils');
    expect(multiply(3, 4)).toBe(12);
  });
});
