const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");



test("End to End Demo test", async ({ page }) => {
    const poManager = new POManager(page);

    //variables
    const email = "Usertest1211@gmail.com";
    const password = "Password@1";
    const productName = "iphone 13 pro";

    const loginPage = poManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.validLogin(email, password);
    
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAdd(productName);
    await dashboardPage.navigateToCart();

    await expect(page.locator('.cartSection h3')).toHaveText(productName);

    await page.locator('li.totalRow button.btn-primary').click();



    await page.locator('input[type="text"]').nth(0).fill("0001 9931 9292 9999"); // credit card number
    await page.locator('select.input.ddl').nth(0).selectOption({ label: '02' }); // DD1
    await page.locator('select.input.ddl').nth(1).selectOption({ label: '10' }); // DD2


    await page.locator('input[type="text"]').nth(1).fill("0909"); //    CVV
    await page.locator('input[type="text"]').nth(2).fill("Vikas"); //    name on card
    await page.locator('input[type="text"]').nth(3).fill("rahulshettyacademy"); //    apply coupon
    await page.locator('[type="submit"]').click(); //click apply coupon
    await page.locator('.mt-1.ng-star-inserted').waitFor();
    await expect(page.locator('.mt-1.ng-star-inserted')).toHaveText("* Coupon Applied");


    await expect(page.locator('input[type="text"]').nth(4)).toHaveValue(email); //email

    await page.locator('.form-group input').pressSequentially("India"); // country


    const countryNames = await page.locator('.ta-results');
    await countryNames.waitFor();


    const cnt = await countryNames.locator('button').count();

    for (let i = 0; i < cnt; i++) {
        let specCountry = await countryNames.locator('button').nth(i).textContent();

        if (specCountry?.trim() === "India") {
            await countryNames.locator('button').nth(i).click();
            break;
        }
    }

    await page.locator(".btnn.action__submit").click();


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