import { describe, expect, it } from '@rstest/core';
import { formatAppInfo, getAppName, getAppVersion, getPlatform } from '@/index';

describe('withRsbuildConfig - define inheritance', () => {
  it('should inherit __APP_VERSION__ from rsbuild.config.ts', () => {
    expect(getAppVersion()).toBe('2.0.0');
  });

  it('should inherit __PLATFORM__ from rsbuild.config.ts', () => {
    expect(getPlatform()).toBe('web');
  });

  it('should inherit process.env.APP_NAME from rsbuild.config.ts', () => {
    expect(getAppName()).toBe('my-app');
  });
});

describe('withRsbuildConfig - alias inheritance', () => {
  it('should resolve @/ alias to src directory', () => {
    expect(typeof formatAppInfo).toBe('function');
    expect(formatAppInfo()).toBe('My-app v2.0.0 (web)');
  });

  it('should resolve @utils alias', async () => {
    const { capitalize } = await import('@utils/string');
    expect(capitalize('hello')).toBe('Hello');
  });
});
