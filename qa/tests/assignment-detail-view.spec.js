const { test, expect } = require('@playwright/test');

test('should navigate to assignment detail', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('input[type="email"]', 'iqbalnur2003@gmail.com');
  await page.fill('input[type="password"]', '123');
  await page.click('button:has-text("Login")');
  await page.waitForURL('**/dashboard');

  // Click on first assignment card if exists
  // We might need to wait for cards to load
  const firstCard = page.locator('div[style*="cursor: pointer"]').first();
  if (await firstCard.count() > 0) {
      await firstCard.click();
      await expect(page).toHaveURL(/\/assignment\/\d+/);
      await expect(page.locator('text=Detail Assignment')).toBeVisible(); // Assuming header text
  } else {
      console.log('No assignments found to test detail view');
  }
});
