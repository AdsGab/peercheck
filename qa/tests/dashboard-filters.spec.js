const { test, expect } = require('@playwright/test');

test('should display filter dropdowns on dashboard', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("Login")');
  await page.waitForURL('**/dashboard');

  // Check filters
  const jurusanPill = page.locator('text=Jurusan');
  await expect(jurusanPill).toBeVisible();
  
  await jurusanPill.click();
  // Check if dropdown appears
  await expect(page.locator('text=Semua Jurusan')).toBeVisible();
});
