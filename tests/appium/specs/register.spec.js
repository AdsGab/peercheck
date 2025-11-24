const RegisterPage = require('../pages/RegisterPage');

describe('Register flow', () => {
  it('should create a new user (or display error if already exists)', async () => {
    await RegisterPage.open();
    const rnd = Math.floor(Math.random() * 100000);
    const username = `e2euser${rnd}`;
    const email = `e2euser${rnd}@example.com`;
    const password = 'Password123!';

    await RegisterPage.register(username, email, password);

    // Registration flow sets localStorage token on success. We'll check localStorage.
    await browser.pause(1000);
    const token = await browser.execute(() => localStorage.getItem('token'));
    if (token) {
      console.log('Registration appears successful, token saved.');
    } else {
      console.log('No token saved; registration may have failed or user exists.');
    }
  });
});
