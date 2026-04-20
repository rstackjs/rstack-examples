import { afterAll, beforeAll, describe, expect, it } from '@rstest/core';
import { createUser, type User } from '../src/user';

describe('Custom Snapshot Serializer', () => {
  /**
   * expect.addSnapshotSerializer() allows you to customize
   * how specific types are serialized in snapshots
   */

  beforeAll(() => {
    // Add custom serializer for User objects
    expect.addSnapshotSerializer({
      // Check if this serializer should handle the value
      test: (val): val is User => {
        return (
          val !== null &&
          typeof val === 'object' &&
          'id' in val &&
          'name' in val &&
          'email' in val &&
          'role' in val
        );
      },
      // Serialize the value
      serialize: (val: User, config, indentation, _depth, _refs, _printer) => {
        const indent = indentation + config.indent;
        return `User {\n${indent}id: ${val.id}\n${indent}name: "${val.name}"\n${indent}email: "${val.email}"\n${indent}role: "${val.role}"\n${indentation}}`;
      },
    });
  });

  afterAll(() => {
    // Note: In a real scenario, you might want to reset serializers
    // rstest provides ways to manage this
  });

  it('should use custom serializer for User', () => {
    const user = createUser({
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      role: 'admin',
    });

    expect(user).toMatchInlineSnapshot(`
User {
  id: 1
  name: "Alice"
  email: "alice@example.com"
  role: "admin"
}
`);
  });

  it('should use custom serializer for another User', () => {
    const user = createUser({
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      role: 'guest',
    });

    expect(user).toMatchInlineSnapshot(`
User {
  id: 2
  name: "Bob"
  email: "bob@example.com"
  role: "guest"
}
`);
  });
});

describe('Custom Serializer - Date Formatting', () => {
  beforeAll(() => {
    // Add custom serializer for Date objects
    expect.addSnapshotSerializer({
      test: (val): val is Date => val instanceof Date,
      serialize: (val: Date) => {
        return `Date<${val.toISOString().split('T')[0]}>`;
      },
    });
  });

  it('should format dates nicely', () => {
    const date = new Date('2024-06-15T10:30:00.000Z');

    expect(date).toMatchInlineSnapshot(`Date<2024-06-15>`);
  });

  it('should format dates in objects', () => {
    const event = {
      name: 'Conference',
      date: new Date('2024-12-01T09:00:00.000Z'),
    };

    expect(event).toMatchInlineSnapshot(`
{
  "date": Date<2024-12-01>,
  "name": "Conference",
}
`);
  });
});

describe('Custom Serializer - Error Objects', () => {
  beforeAll(() => {
    // Add custom serializer for Error objects
    expect.addSnapshotSerializer({
      test: (val): val is Error => val instanceof Error,
      serialize: (val: Error) => {
        return `[Error: ${val.message}]`;
      },
    });
  });

  it('should serialize errors cleanly', () => {
    const error = new Error('Something went wrong');

    expect(error).toMatchInlineSnapshot(`[Error: Something went wrong]`);
  });

  it('should serialize TypeError', () => {
    const error = new TypeError('Invalid type provided');

    expect(error).toMatchInlineSnapshot(`[Error: Invalid type provided]`);
  });
});
