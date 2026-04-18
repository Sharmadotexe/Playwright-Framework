const { request, expect, test } = require('@playwright/test')

//Lecture Number 68
test('Security Test', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("Usertest1211@gmail.com");
    await page.locator("#userPassword").fill("Password@1");
    await page.locator("#login").click();
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69e35fe0f86ba51a6570961e" }));
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    await page.pause();
})