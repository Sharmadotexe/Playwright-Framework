# Playwright Automation Project

## 1.How to switch configuration file:
#### a.Create multiple config files
#### b.Then need to run this command, If your file has multiple project then it will run with each project config:
```bash
npx playwright test tests/E2EDemoPOM.spec.js --config playwright.config1.js
``` 

#### c.You can explicitly tell playwright to run test to run with specific project config with below command:
```bash
npx playwright test tests/E2EDemoPOM.spec.js --config playwright.config1.js --project=CustomConfig1
```

## 2.For running tests in parallel:
```bash
test.describe.configure({mode:parallel});
```

## 3.For running test with tag name:
```bash
npx playwright test --grep "@WEB"
```


## 4.Allure:
```bash
npm install -D allure-playwright
```
#### For Running the tests with Allure reports:
```bash
npx playwright test --reporter=line,allure-playwright
```

## 5.For Running and Viewing:
```bash
npx allure generate ./allure-results
npx allure open ./allure-report
```

## 6.Jenkins Local Server Start:
#### Open Dir where .war file is present
#### then run below command:
```bash
java -jar jenkins.war -httpPort=9090
```

## 7.How to resolve PKIX, SSL certification error
#### Download Zscale Root CA certificate.crt from browser settings
#### Open Terminal as Administrator
#### navigate to java->bin folder
#### Execute below command:
```bash
keytool -importcert ^
  -alias zscaler-root-ca ^
  -file "C:\path\to\Zscaler Root CA.crt" ^
  -keystore "..\lib\security\cacerts" ^
  -storepass changeit ^
  ```


