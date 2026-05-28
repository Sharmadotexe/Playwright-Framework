import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { POManager } from "../../pageObjects/POManager";
import {chromium} from "@playwright/test";
import { setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(60 * 1000);

Given('a login to Ecommerce application with {string} and {string}', async function (email: string, password: string) {
    // const browser = await chromium.launch();
    // const context = await browser.newContext();
    // this.page = await context.newPage();

    // this.poManager = new POManager(this.page);

    const loginPage = this.poManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.validLogin(email, password);
});


When('adding product {string} to cart', async function (productName) {
    const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.searchProductAndAdd(productName);
    await dashboardPage.navigateToCart();
});



Then('verify {string} is present in the orders',async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.validateAndCheckout(productName);
});


When('Enter valid details that include {string} {string} {string} {string} {string} {string} {string} {string} details and Place the order', async function (cardNumber, monthValue, DateValue, cvvNumber, nameOnCard, couponCode, email, countryName) {

    const checkoutPage = this.poManager.getCheckOutPage();
    await checkoutPage.fillCreditCardDetails(cardNumber,monthValue,DateValue,cvvNumber);
    await checkoutPage.fillNameAndCouponCode(nameOnCard,couponCode);
    await checkoutPage.clickOnApplyCouponandExpect();
    await checkoutPage.validateEmailAndFillCountry(email,countryName);
    await checkoutPage.clickSubmit();
});


Then('verify order is present in Order History with {string} and {string}', async function (email, productName) {
    const orderConfirmationPage = this.poManager.getOrderConfirmationPage();
    const orderID = await orderConfirmationPage.confirmTextandReturnOrderID();

    await orderConfirmationPage.navigateToCartPage();

    const ordersPage = this.poManager.getOrderPage();
    await ordersPage.validateOrderDetails(orderID);
    
    const confirmorderPage = this.poManager.getConfirmOrderPage();
    await confirmorderPage.confirmOrderDetails(orderID,email,productName);
});


Given('a login to Ecommerce2 application with {string} and {string}', async function (email, password){

   const pass = this.page.locator("[name='password']");
    this.username = this.page.locator('#username');
    this.title = this.page.locator(".card-title a");

   await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   await this.username.fill(email);

   await pass.fill(password);

   await this.page.locator("#terms").click();

   await this.page.locator("#signInBtn").click();
});


Then('Verify error message is displayed', async function(){
   console.log(await this.page.locator("[style*='block']").textContent());
   await expect(this.page.locator("[style*='block']")).toContainText("Incorrect username/password.");
})
