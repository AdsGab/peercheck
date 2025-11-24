class RegisterPage {
  get username() { return $('input[placeholder="Username"]'); }
  get email() { return $('input[placeholder="Email"]'); }
  get password() { return $('input[placeholder="Password"]'); }
  get submit() { return $('button[type="submit"]'); }

  async open() { await browser.url('/register'); }

  async register(username, email, password) {
    await this.username.waitForExist({ timeout: 5000 });
    await this.username.setValue(username);
    await this.email.setValue(email);
    await this.password.setValue(password);
    await this.submit.click();
  }
}

module.exports = new RegisterPage();
