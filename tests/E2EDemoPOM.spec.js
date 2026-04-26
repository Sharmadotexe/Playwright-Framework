const { test, expect } = require("@playwright/test");
const {customtest} = require("../utils/testBase")
const { POManager } = require("../pageObjects/POManager");
const dataSet = JSON.parse(JSON.stringify(require("../utils/E2EDemoPOMTestData.json")));

for(const data of dataSet){
test(`End to End Demo test for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    let orderID;
    

    const loginPage = poManager.getLoginPage(page);
    await loginPage.goToPage();
    await loginPage.validLogin(data.email, data.password);

    const dashboardPage = poManager.getDashboardPage(page);
    await dashboardPage.searchProductAndAdd(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage(page);
    await cartPage.validateAndCheckout(data.productName);

    const checkoutPage = poManager.getCheckOutPage(page);
    await checkoutPage.fillCreditCardDetails(data.cardNumber, data.monthValue, data.DateValue, data.cvvNumber);
    await checkoutPage.fillNameAndCouponCode(data.nameOnCard,data.couponCode);
    await checkoutPage.clickOnApplyCouponandExpect();
    await checkoutPage.validateEmailAndFillCountry(data.email,data.countryName);
    await checkoutPage.clickSubmit();

    const orderConfirmationPage = poManager.getOrderConfirmationPage(page);
    orderID = await orderConfirmationPage.confirmTextandReturnOrderID();

    await orderConfirmationPage.navigateToCartPage();

    const ordersPage = poManager.getOrderPage(page);
    await ordersPage.validateOrderDetails(orderID);
    
    const confirmorderPage = poManager.getConfirmOrderPage(page);
    await confirmorderPage.confirmOrderDetails(orderID,data.email,data.productName);
});
}


customtest.only('End to End Test from custom text data', async({page, testDataForOrder})=>{
const poManager = new POManager(page);
    let orderID;
    

    const loginPage = poManager.getLoginPage(page);
    await loginPage.goToPage();
    await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);

    const dashboardPage = poManager.getDashboardPage(page);
    await dashboardPage.searchProductAndAdd(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage(page);
    await cartPage.validateAndCheckout(testDataForOrder.productName);

    const checkoutPage = poManager.getCheckOutPage(page);
    await checkoutPage.fillCreditCardDetails(testDataForOrder.cardNumber, testDataForOrder.monthValue, testDataForOrder.DateValue, testDataForOrder.cvvNumber);
    await checkoutPage.fillNameAndCouponCode(testDataForOrder.nameOnCard,testDataForOrder.couponCode);
    await checkoutPage.clickOnApplyCouponandExpect();
    await checkoutPage.validateEmailAndFillCountry(testDataForOrder.email,testDataForOrder.countryName);
    await checkoutPage.clickSubmit();

    const orderConfirmationPage = poManager.getOrderConfirmationPage(page);
    orderID = await orderConfirmationPage.confirmTextandReturnOrderID();

    await orderConfirmationPage.navigateToCartPage();

    const ordersPage = poManager.getOrderPage(page);
    await ordersPage.validateOrderDetails(orderID);
    
    const confirmorderPage = poManager.getConfirmOrderPage(page);
    await confirmorderPage.confirmOrderDetails(orderID,testDataForOrder.email,testDataForOrder.productName);
});
