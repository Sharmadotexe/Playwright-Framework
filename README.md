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


Allure:
npm install -D allure-playwright
For Running the tests with Allure reports:
npx playwright test --reporter=line,allure-playwright

For Running and Viewing:
npx allure generate ./allure-results
npx allure open ./allure-report



Jenkins Local Server Start:
Open Dir where .war file is present
then run below command:
java -jar jenkins.war -httpPort=9090



How to resolve PKIX, SSL certification error
Download Zscale Root CA certificate.crt from browser settings
Open Terminal as Administrator
navigate to java->bin folder
Execute below command:

keytool -importcert ^
  -alias zscaler-root-ca ^
  -file "C:\path\to\Zscaler Root CA.crt" ^
  -keystore "..\lib\security\cacerts" ^
  -storepass changeit ^
  
