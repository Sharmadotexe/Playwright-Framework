const {expect,test} = require("@playwright/test");



test('register functionality', async ({page,browser})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/register");

    await page.locator("#firstName").fill("User");
    await page.locator("#lastName").fill("Test");
    await page.locator("#userEmail").fill("Testuser@gmail.com");
    await page.locator("#userMobile").fill("9988998899");
    await page.selectOption('.custom-select', 'Student');
    await page.locator("[value='Male']").click();
    await page.locator("#userPassword").fill("pass");
    await page.locator("#confirmPassword").fill("pass");
    await page.locator("[type='checkbox']").click();
    await page.locator("#login").click();
});



test.only('Login functionality', async ({page,browser})=>{
    //Usertest1211@gmail.com Password@1

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("Usertest1211@gmail.com");
    await page.locator("#userPassword").fill("Password@1");
    await page.locator("#login").click();
    await page.locator(".card-body b").first().waitFor();

    console.log(await page.locator(".card-body b").allTextContents());
});

