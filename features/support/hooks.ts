import {After, Before, AfterStep, BeforeStep, Status} from "@cucumber/cucumber";
import { POManager } from "../../pageObjects/POManager";
import {chromium} from "@playwright/test";


Before(async function () {
      const browser = await chromium.launch({
        headless: false
      });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});


After(async function () {
    console.log("Browser is closed")
});

BeforeStep(function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep( async function ({result}) {
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path: 'screenshot1.png'});
  }
});