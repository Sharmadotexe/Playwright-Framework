How to switch configuration file:
Create multiple config files

Then need to run this command
If your file has multiple project then it will run with each project config:
npx playwright test tests/E2EDemoPOM.spec.js --config playwright.config1.js  

You can explicitly tell playwright to run test to run with specific project config with below command:
npx playwright test tests/E2EDemoPOM.spec.js --config playwright.config1.js --project=CustomConfig1


For running tests in parallel:
test.describe.configure({mode:parallel});

For running test with tag name:
npx playwright test --grep "@WEB" 