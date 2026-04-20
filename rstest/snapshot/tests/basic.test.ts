import { describe, expect, it } from '@rstest/core';
import { createUser, formatUser, generateUsers, type User } from '../src/user';

describe('toMatchSnapshot - Basic Usage', () => {
  /**
   * toMatchSnapshot() creates a snapshot file on first run,
   * then compares against it on subsequent runs
   */

  it('should match user object snapshot', () => {
    const user = createUser();

    // Snapshot will be saved to __snapshots__/basic.test.ts.snap
    expect(user).toMatchSnapshot();
  });

  it('should match formatted user snapshot', () => {
    const user = createUser({ name: 'Jane Doe', email: 'jane@example.com' });
    const formatted = formatUser(user);

    expect(formatted).toMatchSnapshot();
  });

  it('should match array snapshot', () => {
    const users = generateUsers(3);

    expect(users).toMatchSnapshot();
  });

  it('should match with custom snapshot name', () => {
    const user = createUser({ role: 'admin' });

    // Use a custom name for the snapshot
    expect(user).toMatchSnapshot('admin user');
  });
});

describe('toMatchSnapshot - Complex Objects', () => {
  it('should match nested object snapshot', () => {
    const data = {
      users: generateUsers(2),
      pagination: {
        page: 1,
        perPage: 10,
        total: 100,
      },
      meta: {
        generatedAt: '2024-01-01T00:00:00.000Z',
        version: '1.0.0',
      },
    };

    expect(data).toMatchSnapshot();
  });

  it('should match user with metadata snapshot', () => {
    const user = createUser({
      metadata: {
        preferences: {
          theme: 'dark',
          language: 'en',
        },
        lastLogin: '2024-01-15T10:30:00.000Z',
      },
    });

    expect(user).toMatchSnapshot();
  });
});

describe('toMatchSnapshot - Property Matchers', () => {
  /**
   * Use property matchers for dynamic values like dates or IDs
   */

  it('should match with property matchers for dynamic values', () => {
    const user: User = {
      id: Math.random() * 1000, // Dynamic ID
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      createdAt: new Date(), // Dynamic date
    };

    expect(user).toMatchSnapshot({
      id: expect.any(Number),
      createdAt: expect.any(Date),
    });
  });

  it('should match array with property matchers', () => {
    const users = [
      { id: Math.random(), name: 'User 1' },
      { id: Math.random(), name: 'User 2' },
    ];

    expect(users).toMatchSnapshot([
      { id: expect.any(Number), name: 'User 1' },
      { id: expect.any(Number), name: 'User 2' },
    ]);
  });
});
