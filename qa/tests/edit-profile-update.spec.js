const { test, expect } = require('@playwright/test');

test('should navigate to edit profile page', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("Login")');
  await page.waitForURL('**/dashboard');

  // Open dropdown
  await page.click('button[aria-label="Open profile menu"]');
  
  // Click Edit Profile
  await page.click('text=Edit Profile');
  
  await expect(page).toHaveURL('/edit-profile');
  await expect(page.locator('h2:has-text("Edit Profile")')).toBeVisible();
  await expect(page.locator('input[placeholder="Name"]')).toBeVisible();
});
