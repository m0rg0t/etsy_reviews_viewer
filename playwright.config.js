import {defineConfig} from '@playwright/test';
export default defineConfig({testDir: './tests/browser', retries: 0,
  use: {baseURL: 'http://127.0.0.1:4173', serviceWorkers: 'block', trace: 'retain-on-failure'},
  projects: [{name: 'chromium', use: {browserName: 'chromium'}}, {name: 'webkit', use: {browserName: 'webkit'}}],
  webServer: {command: 'npm run preview -- --port 4173', url: 'http://127.0.0.1:4173', reuseExistingServer: false}
});
