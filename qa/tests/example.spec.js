const { test, expect } = require('@playwright/test');

// Example test: visits baseURL (configured in playwright.config.js)
test('homepage loads and has a title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/./);
});
