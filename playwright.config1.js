import { chromium, defineConfig, devices } from '@playwright/test';

module.exports = defineConfig({
  testDir: './tests',
  retries: 1,
  workers:3,
  timeout: 15 * 1000,
  expect: {
    timeout: 15 * 1000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'CustomConfig1',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on',
      }
    },
    {
      name: 'CustomConfig2',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
      }
    },
    {
      name: 'CustomConfig3',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        ...devices['iPhone 15 Pro Max'],
        permissions: ['geolocation'],
        video: 'retain-on-failure'
        // viewport:{width:720, height:720}
      }
    }
  ]
});


