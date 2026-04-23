const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");

test("End to End Demo test", async ({ page }) => {
    const poManager = new POManager(page);

    //variables
    const email = "Usertest1211@gmail.com";
    const password = "Password@1";
    const productName = "iphone 13 pro";
    const cardNumber = "0001 9931 9292 9999";
    const monthValue = '02';
    const DateValue = '10';
    const cvvNumber = "0099";
    const nameOnCard = "Vikas";
    const couponCode = "rahulshettyacademy";
    const countryName = "India";
    

    const loginPage = poManager.getLoginPage(page);
    await loginPage.goToPage();
    await loginPage.validLogin(email, password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAdd(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage(page);
    await cartPage.validateAndCheckout(productName);

    const checkoutPage = poManager.getCheckOutPage(page);
    await checkoutPage.fillCreditCardDetails(cardNumber, monthValue, DateValue, cvvNumber);
    await checkoutPage.fillNameAndCouponCode(nameOnCard,couponCode);
    await checkoutPage.clickOnApplyCouponandExpect();
    await checkoutPage.validateEmailAndFillCountry(email,countryName);
    await checkoutPage.clickSubmit();

    //Order confirmed page
    const thankyouText = await page.locator(".hero-primary");

    await thankyouText.waitFor();
    expect(thankyouText).toHaveText('Thankyou for the order.');

    const orderID = await page.locator('label[class="ng-star-inserted"]').textContent();

    await page.locator('label[routerlink="/dashboard/myorders"]').click();

    await page.locator('tbody').waitFor();

    const row = await page.locator('tbody tr');
    const rowCount = await row.count();

    for (let i = 0; i < rowCount; i++) {
        let specRow = await row.nth(i).locator("th").textContent();

        if (orderID.includes(specRow)) {
            console.log(specRow);
            await row.nth(i).locator("button").first().click();
            break;
        }
        else {
            console.log("OrderID not found");
            expect().toBeFalsy();
        }
    }

    // order page
    const orderIDLoc = await page.locator('.col-text.-main').textContent();
    await expect(orderID.includes(orderIDLoc)).toBeTruthy();
    await expect(page.locator('p[class="text"]').nth(0)).toHaveText(email);
    await expect(page.locator('p[class="text"]').nth(2)).toHaveText(email);
    await expect(page.locator('.title')).toHaveText(productName);

});