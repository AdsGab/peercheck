class LoginPage {
  get email() { return $('input[placeholder="Email"]'); }
  get password() { return $('input[placeholder="Password"]'); }
  get submit() { return $('button[type="submit"]'); }

  async open() { await browser.url('/login'); }

  async login(email, password) {
    await this.email.waitForExist({ timeout: 5000 });
    await this.email.setValue(email);
    await this.password.setValue(password);
    await this.submit.click();
  }
}

module.exports = new LoginPage();
