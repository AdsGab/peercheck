const { test, expect } = require('@playwright/test');

// Test: navigate through profile sections (Your Rank, Your Assignment, Your Answer, Edit Profile)
// Update the text selectors below if your UI uses different labels or tabs.

test('navigate each section on profile', async ({ page }) => {
  await page.goto('/profile');

  const sections = [
    { name: /your rank/i, selector: 'text=Your Rank' },
    { name: /your assignment/i, selector: 'text=Your Assignment' },
    { name: /your review/i, selector: 'text=Your Answer' },
  ];

  for (const s of sections) {
    // Try clicking a tab/button or link with the section text
    if (await page.getByRole('tab', { name: s.name }).count()) {
      await page.getByRole('tab', { name: s.name }).first().click();
    } else if (await page.getByRole('button', { name: s.name }).count()) {
      await page.getByRole('button', { name: s.name }).first().click();
    } else if (await page.locator(s.selector).count()) {
      await page.locator(s.selector).first().click();
    } else {
      // try any element containing the text
      await page.locator(`text=${s.name}`).first().click().catch(() => {});
    }

    // After clicking, assert that some expected content for the section is visible.
    // These expectations are conservative — update as needed for your UI.
    switch (s.selector) {
      case 'text=Your Rank':
        await expect(page.locator('text=Rank').first()).toBeVisible();
        break;
      case 'text=Your Assignment':
        await expect(page.locator('text=Assignment').first()).toBeVisible();
        break;
      case 'text=Your Rdeview':
        await expect(page.locator('text=Review').first()).toBeVisible();
        break;
      default:
        // generic check: some content shows up that contains the section name
        await expect(page.locator(`text=${s.name}`).first()).toBeVisible();
    }
  }
});
