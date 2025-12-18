const { test, expect } = require('@playwright/test');

test('should allow user to fill upload form', async ({ page }) => {
  // Login first
  await page.goto('/login');
  await page.fill('input[type="email"]', 'iqbalnur2003@gmail.com'); // Adjust if needed
  await page.fill('input[type="password"]', '123');
  await page.click('button:has-text("Login")');
  
  // Wait for navigation to dashboard or home
  await page.waitForURL('**/dashboard');

  await page.goto('/upload');
  
  await page.fill('textarea[placeholder="Add Your Text Here..."]', 'Test Description');
  
  // Check if pills for filters exist
  await expect(page.locator('text=Jurusan')).toBeVisible();
  await expect(page.locator('text=Mata Kuliah')).toBeVisible();
  await expect(page.locator('text=Tingkat')).toBeVisible();
});
