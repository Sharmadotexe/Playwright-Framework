// const { test, expect } = require("@playwright/test");
import {test, expect,Page} from "@playwright/test";
import {customtest} from "../utils/testBase";
import { POManager } from "../pageObjects/POManager";
import rawDataSet from "../utils/E2EDemoPOMTestData.json";

const dataSet = JSON.parse(JSON.stringify(rawDataSet));


// test.describe.configure({mode:'parallel'});
for(const data of dataSet){
test(`@WEB End to End Demo test for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    let orderID:any;
    

    const loginPage = poManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.validLogin(data.email, data.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAdd(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.validateAndCheckout(data.productName);

    const checkoutPage = poManager.getCheckOutPage();
    await checkoutPage.fillCreditCardDetails(data.cardNumber, data.monthValue, data.DateValue, data.cvvNumber);
    await checkoutPage.fillNameAndCouponCode(data.nameOnCard,data.couponCode);
    await checkoutPage.clickOnApplyCouponandExpect();
    await checkoutPage.validateEmailAndFillCountry(data.email,data.countryName);
    await checkoutPage.clickSubmit();

    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    orderID = await orderConfirmationPage.confirmTextandReturnOrderID();

    await orderConfirmationPage.navigateToCartPage();

    const ordersPage = poManager.getOrderPage();
    await ordersPage.validateOrderDetails(orderID);
    
    const confirmorderPage = poManager.getConfirmOrderPage();
    await confirmorderPage.confirmOrderDetails(orderID,data.email,data.productName);
});
}


customtest('End to End Test from custom text data', async({page, testDataForOrder})=>{
const poManager = new POManager(page);
    let orderID: any;
    

    const loginPage = poManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAdd(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.validateAndCheckout(testDataForOrder.productName);

    const checkoutPage = poManager.getCheckOutPage();
    await checkoutPage.fillCreditCardDetails(testDataForOrder.cardNumber, testDataForOrder.monthValue, testDataForOrder.DateValue, testDataForOrder.cvvNumber);
    await checkoutPage.fillNameAndCouponCode(testDataForOrder.nameOnCard,testDataForOrder.couponCode);
    await checkoutPage.clickOnApplyCouponandExpect();
    await checkoutPage.validateEmailAndFillCountry(testDataForOrder.email,testDataForOrder.countryName);
    await checkoutPage.clickSubmit();

    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    orderID = await orderConfirmationPage.confirmTextandReturnOrderID();

    await orderConfirmationPage.navigateToCartPage();

    const ordersPage = poManager.getOrderPage();
    await ordersPage.validateOrderDetails(orderID);
    
    const confirmorderPage = poManager.getConfirmOrderPage();
    await confirmorderPage.confirmOrderDetails(orderID,testDataForOrder.email,testDataForOrder.productName);
});
