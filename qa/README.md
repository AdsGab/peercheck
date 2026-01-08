# QA — Playwright tests for Peercheck

This folder contains a minimal Playwright test scaffold.

Quick start (from `n:\Semester 7\peercheck\qa`):

PowerShell commands:

```
# install dev dependencies
npm install

# install browsers used by Playwright
npx playwright install

# run tests (uses baseURL from playwright.config.js)
npm test

# run headed (visible) tests
npm run test:headed

# open the generated HTML report (after a run)
npm run show-report
```

Notes:
- `playwright.config.js` uses `baseURL: 'http://localhost:5173'` (Vite default). Update this if your frontend runs on a different port or start your frontend before running tests.
- Add more tests under `tests/` and update config as needed.
