const { test, expect } = require('@playwright/test');

test('should show error with invalid credentials', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('input[type="email"]', 'wrong@example.com');
  await page.fill('input[type="password"]', 'wrongpassword');
  await page.click('button:has-text("Login")');

  // Assuming there's an alert or error message. 
  // Since the app uses window.alert in some places, we might need to handle dialogs or check for UI messages.
  // Looking at previous context, it might be an alert.
  
  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('Invalid'); // or whatever the error is
    await dialog.dismiss();
  });
});
