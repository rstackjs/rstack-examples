/**
 * User interface for snapshot testing
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
  metadata?: Record<string, unknown>;
}

/**
 * Create a user object
 */
export function createUser(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    ...overrides,
  };
}

/**
 * Format user for display
 */
export function formatUser(user: User): string {
  return `${user.name} <${user.email}> (${user.role})`;
}

/**
 * Generate user list
 */
export function generateUsers(count: number): User[] {
  return Array.from({ length: count }, (_, i) =>
    createUser({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }),
  );
}
