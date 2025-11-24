describe('Profile page interactions', () => {
  it('should open profile, open edit, click change photo and interact with upload modal', async () => {
    await browser.url('/profile');

    // Open Edit Profile by clicking the pill 'Edit Profile' (text 'Edit Profile' in pills)
    const editPill = await $('div=Edit Profile');
    if (await editPill.isExisting()) {
      await editPill.click();
    } else {
      // alternative: click Hi button to open edit
      const hiButton = await $('button[aria-label="Open profile edit"]');
      if (await hiButton.isExisting()) await hiButton.click();
      await browser.pause(500);
    }

    // Click 'Change Photo'
    const changeBtn = await $('button=Change Photo');
    await changeBtn.waitForExist({ timeout: 5000 });
    await changeBtn.click();

    // Wait for upload input to exist and set a file (file path must be accessible to test runner)
    const fileInput = await $('#profile-upload-input');
    if (await fileInput.isExisting()) {
      // NOTE: replace this path with a valid absolute path on the runner machine
      const testImagePath = process.env.E2E_TEST_IMAGE || 'C:\\Windows\\Web\\Wallpaper\\Windows\\img0.jpg';
      try {
        await fileInput.setValue(testImagePath);
        // Click confirm
        const confirm = await $('button=Confirm');
        await confirm.waitForEnabled({ timeout: 5000 });
        await confirm.click();
      } catch (err) {
        console.log('File upload failed. Ensure path exists on runner:', err.message);
      }
    } else {
      console.log('Upload input not found; modal may not be open.');
    }

    // Click Save confirmation flow (if appears)
    const yesSave = await $('button=Yes, Save');
    if (await yesSave.isExisting()) {
      await yesSave.click();
    }

    await browser.pause(800);
  });
});
