const {test, expect} =  require('@playwright/test');

test('Browser Context declaration Test', async ({browser})=>{

    //creating a new browser context
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.google.com/");
});

test('Page fixture Test', async ({browser, page})=>{

   await page.goto("https://www.google.com/");
});


test('Login', async ({browser, page})=>{

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   await page.locator('#username').fill("rahulshettyacademy ");

   await page.locator("[name='password']").fill("learning");

   await page.locator("#terms").click;

   await page.locator("#signInBtn").click;
});


test.only('Negative Login', async ({page})=>{

   //locators
   const pass = page.locator("[name='password']");
   const username = page.locator('#username');
   const title = page.locator(".card-title a");


   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   await username.fill("rahulshettyacade");

   await pass.fill("learning");

   await page.locator("#terms").click();

   await page.locator("#signInBtn").click();

   console.log(await page.locator("[style*='block']").textContent());

   await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");


   await username.fill("rahulshettyacademy");
   await page.locator("#signInBtn").click();

   
   console.log(
      await title.first().textContent()
   );
   console.log(
      await title.nth(1).textContent()
   );

   const allTitles = await title.allTextContents();
   console.log(allTitles);

});