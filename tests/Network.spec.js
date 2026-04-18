const { expect, test, request } = require('@playwright/test');
const ApiUtils = require('./utils/ApiUtil');
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

const fakePayLoadOrders = { data: [], message: "No Orders" };

test.beforeAll(async () => {
    const apiContext = await request.newContext({
        ignoreHTTPSErrors: true,
    });

    const ApiUtil = new ApiUtils(apiContext, loginPayload);
    response = await ApiUtil.createOrder(orderIdPayload);
});



test("Place the order", async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

//     await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
//         async route => {
//             const response = await page.request.fetch(route.request());
//             let body = JSON.stringify(fakePayLoadOrders);

//             route.fulfill(
//                 {
//                     response,
//                     body,
//                 }
//             );
//         }
//     )

//     await page.locator('button[routerlink="/dashboard/myorders"]').click();
//      await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
//   console.log(await page.locator(".mt-4").textContent());
await page.route(
  '**/api/ecom/order/get-orders-for-customer/*',
  async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(fakePayLoadOrders),
    });
  }
);

await page.locator('button[routerlink="/dashboard/myorders"]').click();

// Assert UI instead of waiting for network
await expect(page.locator('.mt-4')).toHaveText(" You have No Orders to show at this time. Please Visit Back Us ");


  });