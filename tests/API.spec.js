const { expect, test, request } = require('@playwright/test');
const ApiUtils = require('./utils/ApiUtil');

let token;
let orderID;
let response;

const loginPayload = {
    userEmail: "Usertest1211@gmail.com",
    userPassword: "Password@1"
}

const orderIdPayload = {
    orders: [{
        country: "Argentina",
        productOrderedId: "6964a1cbc941646b7a91786b"
    }]
}

test.beforeAll(async () => {
    const apiContext = await request.newContext({
        ignoreHTTPSErrors: true,
    });

    const ApiUtil = new ApiUtils(apiContext, loginPayload);
    response = await ApiUtil.createOrder(orderIdPayload);
});



test("End to End Demo test", async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

    await page.locator('button[routerlink="/dashboard/myorders"]').click();

    await page.locator('tbody').waitFor();

    const row = await page.locator('tbody tr');
    const rowCount = await row.count();

    for (let i = 0; i < rowCount; i++) {
        let specRow = await row.nth(i).locator("th").textContent();

        if (response.orderID.includes(specRow)) {
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
    await expect(response.orderID.includes(orderIDLoc)).toBeTruthy();
});




