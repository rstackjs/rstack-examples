import { afterEach, beforeEach, describe, expect, it, rs, rstest } from '@rstest/core';

describe('rs.doMock() - Dynamic Module Mocking', () => {
  /**
   * rs.doMock() is NOT hoisted, allowing you to mock modules dynamically
   * based on test conditions. Use with dynamic imports.
   */

  beforeEach(() => {
    rs.resetModules();
  });

  afterEach(() => {
    rs.resetModules();
  });

  it('should dynamically mock a module', async () => {
    rs.doMock('../src/utils', () => ({
      generateId: () => 'fixed-id-123',
      getTimestamp: () => 1000000,
    }));

    const { generateId, getTimestamp } = await import('../src/utils');

    expect(generateId()).toBe('fixed-id-123');
    expect(getTimestamp()).toBe(1000000);
  });

  it('should use different mocks in different tests', async () => {
    rs.doMock('../src/utils', () => ({
      generateId: () => 'different-id',
      getTimestamp: () => 2000000,
    }));

    const { generateId, getTimestamp } = await import('../src/utils');

    expect(generateId()).toBe('different-id');
    expect(getTimestamp()).toBe(2000000);
  });

  it('should conditionally mock based on test conditions', async () => {
    const shouldMock = true;

    if (shouldMock) {
      rs.doMock('../src/utils', () => ({
        generateId: () => 'conditional-mock',
        getTimestamp: () => 0,
      }));
    }

    const { generateId } = await import('../src/utils');

    expect(generateId()).toBe('conditional-mock');
  });
});

describe('rs.doUnmock() - Remove Dynamic Mocks', () => {
  beforeEach(() => {
    rs.resetModules();
  });

  afterEach(() => {
    rs.resetModules();
  });

  it('should remove dynamic mock', async () => {
    rs.doMock('../src/utils', () => ({
      formatDate: () => 'mocked-date',
    }));

    const mocked = await import('../src/utils');
    expect(mocked.formatDate(new Date())).toBe('mocked-date');

    rs.doUnmock('../src/utils');
    rs.resetModules();

    const original = await import('../src/utils');
    // Now uses original implementation
    expect(original.formatDate(new Date('2024-01-01'))).toBe('2024-01-01T00:00:00.000Z');
  });
});

describe('rs.importActual() - Import Original Module', () => {
  /**
   * When you need to use the original module implementation
   * alongside mocked parts
   */

  it('should import actual module inside mock', async () => {
    rs.doMock('../src/utils', async () => {
      const actual = await rs.importActual<typeof import('../src/utils')>('../src/utils');

      return {
        ...actual,
        // Override only specific functions
        generateId: () => 'overridden-id',
      };
    });

    const utils = await import('../src/utils');

    // Overridden function
    expect(utils.generateId()).toBe('overridden-id');

    // Original functions still work
    expect(utils.formatDate(new Date('2024-01-01'))).toBe('2024-01-01T00:00:00.000Z');
  });
});

describe('rs.importMock() - Import Mocked Module', () => {
  /**
   * rs.importMock() returns the mocked version of a module
   * Note: This requires the module to be mocked first
   */

  beforeEach(() => {
    rs.resetModules();
  });

  it('should get mocked module via dynamic import', async () => {
    const mockFn = rstest.fn().mockReturnValue('mock-id');

    rs.doMock('../src/utils', () => ({
      generateId: mockFn,
    }));

    // Use dynamic import to get the mocked module
    const mockedUtils = await import('../src/utils');

    expect(mockedUtils.generateId()).toBe('mock-id');
    expect(mockFn).toHaveBeenCalled();
  });
});

describe('rs.resetModules() - Reset Module Registry', () => {
  /**
   * rs.resetModules() clears the module cache,
   * allowing fresh imports
   */

  it('should reset module cache', async () => {
    rs.doMock('../src/utils', () => ({
      generateId: () => 'first-mock',
    }));

    const first = await import('../src/utils');
    expect(first.generateId()).toBe('first-mock');

    rs.resetModules();

    rs.doMock('../src/utils', () => ({
      generateId: () => 'second-mock',
    }));

    const second = await import('../src/utils');
    expect(second.generateId()).toBe('second-mock');
  });
});
