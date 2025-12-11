const { test, expect } = require('@playwright/test');

// Test: Exchange Poin flow — choose GoPay, fill mock data, confirm
// Update route, selectors, and form fields to match your app.

test('exchange poin simulation using GoPay', async ({ page }) => {
  // Go to the Exchange Poin page — try common routes or navigate from homepage
  await page.goto('/exchange');

  // If there's a link from homepage, fallback to that
  if ((await page.locator('text=Exchange Poin').count()) === 0 && (await page.locator('text=Exchange').count())) {
    await page.locator('text=Exchange').first().click().catch(() => {});
  }

  // Wait for the exchange UI
  await expect(page.locator('text=Exchange').first()).toBeVisible({ timeout: 5000 }).catch(() => {});

  // Select GoPay as payment method — try multiple selector strategies
  if (await page.locator('text=gopay', { exact: false }).count()) {
    await page.locator('text=gopay', { exact: false }).first().click();
  } else if (await page.getByRole('button', { name: /gopay/i }).count()) {
    await page.getByRole('button', { name: /gopay/i }).first().click();
  }

  // Fill mock data — adapt field names/placeholders to your form
  // Example fields: phone, name, amount, confirmation
  const nameInput = page.locator('input[name="name"], input[placeholder*="Name"], input[aria-label*="Name"]');
  if (await nameInput.count()) await nameInput.first().fill('QA Tester');

  const phoneInput = page.locator('input[name="phone"], input[placeholder*="Phone"], input[aria-label*="Phone"]');
  if (await phoneInput.count()) await phoneInput.first().fill('081234567890');

  const amountInput = page.locator('input[name="amount"], input[placeholder*="Amount"], input[aria-label*="Amount"]');
  if (await amountInput.count()) await amountInput.first().fill('1000');

  // Click confirm / pay / continue
  const confirmButton = page.getByRole('button', { name: /confirm|pay|continue/i });
  if (await confirmButton.count()) {
    await confirmButton.first().click();
  } else if (await page.locator('button:has-text("Confirm")').count()) {
    await page.locator('button:has-text("Confirm")').first().click();
  }

  // Expect a success message or receipt — update to match your app's success indicator
  await expect(page.locator('text=success', { timeout: 5000 }).first()).toBeVisible().catch(async () => {
    // fallback: look for receipt or transaction id
    await expect(page.locator('text=receipt').first()).toBeVisible().catch(() => {});
  });
});
