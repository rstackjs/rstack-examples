import { expect, test } from '@rstest/playwright';

test('home page renders the Rsbuild + React app', { timeout: 15_000 }, async ({ page, serve }) => {
  const { url } = await serve('./dist/index.html');

  await page.goto(url);

  await expect(page).toHaveTitle('Rstest Playwright Example');
  await expect(page.locator('h1')).toHaveText('Rstest + Playwright');
  await expect(page.locator('.message')).toContainText(
    'Built by Rsbuild, tested end-to-end with @rstest/playwright.',
  );
});
