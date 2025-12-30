const { test, expect } = require('@playwright/test');

test('should display mission cards on profile page', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('input[type="email"]', 'iqbalnur2003@gmail.com');
  await page.fill('input[type="password"]', '123');
  await page.click('button:has-text("Login")');
  await page.waitForURL('**/dashboard');

  await page.goto('/profile');
  
  // Check for mission cards
  await expect(page.locator('text=Upload Assignment')).toBeVisible();
  await expect(page.locator('text=Review Assignment')).toBeVisible();
  await expect(page.locator('text=Leave a Comment/Ratings')).toBeVisible();
});
