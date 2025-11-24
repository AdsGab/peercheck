Appium + WebdriverIO sample tests for PeerCheck

Overview
- This folder contains a minimal WebdriverIO + Appium scaffold and example test cases for the PeerCheck frontend.
- Tests are written to run in a mobile web browser (Chrome on Android Emulator) via Appium.

Prerequisites
- Node.js (v16+ recommended)
- Java and Android SDK (for Android emulator) OR a real Android device with USB debugging enabled
- Appium (installed globally or use the project-devDependency)
- Start the frontend dev server (Vite) so tests can reach `http://localhost:5173`
- Start the backend if tests depend on it: `http://localhost:4000`

Install
From this folder run:

```powershell
cd tests\appium
npm install
```

Start Appium (if not already running)

```powershell
npx appium
```

Start the frontend (from repo root)

```powershell
# from repo root
cd peercheck-frontend
npm run dev
```

Run tests

```powershell
cd tests\appium
npm test
```

Notes
- The sample tests use selectors based on placeholders and visible button text that exist in the current frontend.
- File-upload tests require a path to a file accessible to the test runner environment. On Windows use absolute paths (e.g. `C:\path\to\image.jpg`).
- These are example cases intended as a starting point — adjust selectors and timeouts for your environment.
