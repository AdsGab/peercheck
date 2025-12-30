const { test, expect } = require('@playwright/test');

test('should open roadmap modal on profile page', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('input[type="email"]', 'iqbalnur2003@gmail.com');
  await page.fill('input[type="password"]', '123');
  await page.click('button:has-text("Login")');
  await page.waitForURL('**/dashboard');

  await page.goto('/profile');
  
  // Click trophy button
  await page.click('button[aria-label="Show roadmap"]');
  
  // Check modal visibility
  await expect(page.locator('text=Rank Information Detail')).toBeVisible();
  
  // Close modal
  await page.click('button:has-text("Close")');
  await expect(page.locator('text=Rank Information Detail')).not.toBeVisible();
});
