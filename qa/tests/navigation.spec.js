const { test, expect } = require('@playwright/test');

// Test: navigating from Upload page to Profile page
// Adjust selectors if your app uses different link text or route paths.

test('navigate from upload to profile', async ({ page }) => {
  // go to Upload page (assumes route is /upload)
  await page.goto('/upload');

  // Try common link/button selectors to reach Profile
  const profileLink = page.getByRole('link', { name: /profile/i });
  if (await profileLink.count()) {
    await profileLink.first().click();
  } else if (await page.locator('a:has-text("Profile")').count()) {
    await page.locator('a:has-text("Profile")').first().click();
  } else if (await page.locator('button:has-text("Profile")').count()) {
    await page.locator('button:has-text("Profile")').first().click();
  } else {
    // fallback: try a link that mentions 'profile' anywhere
    await page.click('a[href*="profile"]', { timeout: 3000 }).catch(() => {});
  }

  // Expect we arrived on a profile URL (contains '/profile')
  await expect(page).toHaveURL(/.*\/profile.*/i);

  // Expect some visible profile marker (update text if different)
  await expect(page.locator('text=Profile').first()).toBeVisible();
});
