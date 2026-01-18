// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports= defineConfig({
  testDir: './tests',
  timeout: 15* 1000,
  expect: {
    timeout: 15* 1000,
  },
  reporter:'html',
  use: {
    browserName: 'chromium',
    headless:false,
    screenshot: 'on',
    trace: 'retain-on-failure',
  },
});


