import { describe, expect, it } from '@rstest/core';
import { createConfig, validateConfig } from '../src/config';

describe('toMatchFileSnapshot - Basic Usage', () => {
  /**
   * toMatchFileSnapshot() saves the snapshot to a separate file
   * that you specify. Useful for large outputs or when you want
   * to organize snapshots in a specific way.
   */

  it('should match config file snapshot', async () => {
    const config = createConfig();

    // Save to a specific file
    await expect(JSON.stringify(config, null, 2)).toMatchFileSnapshot(
      './tests/__snapshots__/config.json',
    );
  });

  it('should match config with overrides file snapshot', async () => {
    const config = createConfig({
      app: { name: 'CustomApp', version: '2.0.0', debug: true },
      features: ['custom-feature'],
    });

    await expect(JSON.stringify(config, null, 2)).toMatchFileSnapshot(
      './tests/__snapshots__/custom-config.json',
    );
  });
});

describe('toMatchFileSnapshot - Different Formats', () => {
  it('should match YAML-like format file snapshot', async () => {
    const config = createConfig();

    // Format as YAML-like string
    const yaml = `app:
  name: ${config.app.name}
  version: ${config.app.version}
  debug: ${config.app.debug}
database:
  host: ${config.database.host}
  port: ${config.database.port}
  name: ${config.database.name}
  pool:
    min: ${config.database.pool.min}
    max: ${config.database.pool.max}
features:
${config.features.map((f) => `  - ${f}`).join('\n')}
logging:
  level: ${config.logging.level}
  format: ${config.logging.format}`;

    await expect(yaml).toMatchFileSnapshot('./tests/__snapshots__/config.yaml');
  });

  it('should match validation result file snapshot', async () => {
    const config = createConfig({
      database: {
        host: 'localhost',
        port: 70000, // Invalid port
        name: 'test',
        pool: { min: 10, max: 5 }, // Invalid: min > max
      },
    });

    const result = validateConfig(config);

    await expect(JSON.stringify(result, null, 2)).toMatchFileSnapshot(
      './tests/__snapshots__/validation-errors.json',
    );
  });
});

describe('toMatchFileSnapshot - HTML Output', () => {
  it('should match HTML page file snapshot', async () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Page</title>
</head>
<body>
  <header>
    <h1>Welcome</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section>
      <h2>Content</h2>
      <p>This is the main content area.</p>
    </section>
  </main>
  <footer>
    <p>&copy; 2024 Test Company</p>
  </footer>
</body>
</html>`;

    await expect(html).toMatchFileSnapshot('./tests/__snapshots__/page.html');
  });
});
