/**
 * Config interface for snapshot testing
 */
export interface AppConfig {
  app: {
    name: string;
    version: string;
    debug: boolean;
  };
  database: {
    host: string;
    port: number;
    name: string;
    pool: {
      min: number;
      max: number;
    };
  };
  features: string[];
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    format: 'json' | 'text';
  };
}

/**
 * Create default config
 */
export function createConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return {
    app: {
      name: 'MyApp',
      version: '1.0.0',
      debug: false,
      ...overrides.app,
    },
    database: {
      host: 'localhost',
      port: 5432,
      name: 'myapp_db',
      pool: {
        min: 2,
        max: 10,
        ...overrides.database?.pool,
      },
      ...overrides.database,
    },
    features: overrides.features ?? ['auth', 'api', 'websocket'],
    logging: {
      level: 'info',
      format: 'json',
      ...overrides.logging,
    },
  };
}

/**
 * Validate config
 */
export function validateConfig(config: AppConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.app.name) {
    errors.push('app.name is required');
  }

  if (config.database.port < 1 || config.database.port > 65535) {
    errors.push('database.port must be between 1 and 65535');
  }

  if (config.database.pool.min > config.database.pool.max) {
    errors.push('database.pool.min must be <= database.pool.max');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
