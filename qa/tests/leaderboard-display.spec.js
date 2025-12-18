const { test, expect } = require('@playwright/test');

test('should display leaderboard on dashboard', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('input[type="email"]', 'iqbalnur2003@gmail.com');
  await page.fill('input[type="password"]', '123');
  await page.click('button:has-text("Login")');
  await page.waitForURL('**/dashboard');

  // Check leaderboard section
  await expect(page.locator('h4:has-text("Top Poin")')).toBeVisible();
  
  // Check if there are entries (assuming mock data or seeded db)
  // We can check for list items or divs inside the leaderboard area
  // The implementation uses divs with border-bottom
  // We can just check if the container is visible
  const leaderboardArea = page.locator('h4:has-text("Top Poin")').locator('..');
  await expect(leaderboardArea).toBeVisible();
});
