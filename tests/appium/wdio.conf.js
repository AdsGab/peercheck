exports.config = {
  runner: 'local',
  specs: [
    './specs/**/*.spec.js'
  ],
  maxInstances: 1,
  capabilities: [
    {
      // Mobile web on Android via Appium (Chrome)
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Android Emulator',
      'appium:browserName': 'Chrome'
    }
  ],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'http://localhost:5173',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['appium'],
  appium: {
    command: 'appium'
  },
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
};
