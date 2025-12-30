const { test, expect } = require('@playwright/test');

test('should navigate to register page and show form', async ({ page }) => {
  await page.goto('/login');
  await page.click('text=Sign Up'); // Assuming there is a link to Sign Up/Register

  await expect(page).toHaveURL(/\/register/);
  await expect(page.locator('input[placeholder="Name"]')).toBeVisible();
  await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
  await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
});
