const { test, expect } = require('@playwright/test');

test('should log out successfully', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('input[type="email"]', 'iqbalnur2003@gmail.com');
  await page.fill('input[type="password"]', '123');
  await page.click('button:has-text("Login")');
  await page.waitForURL('**/dashboard');

  // Open dropdown
  await page.click('button[aria-label="Open profile menu"]');
  
  // Click Log Out
  await page.click('text=Log Out');
  
  await expect(page).toHaveURL('/login');
});
