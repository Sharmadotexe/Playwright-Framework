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


test('Negative Login', async ({page})=>{

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


test.only('Blinking Text', async ({browser})=>{
   const context = await browser.newContext();
   const page = await context.newPage();

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const loc = page.locator("[href*= documents-request]");
   await expect(loc).toHaveAttribute("class","blinkingText");

   const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      loc.click()
   ]);


   const text =  await newPage.locator(".red").textContent();
   console.log(text);

   const arrText = text.split("@");
   const email = arrText[1].split(" ")[0];

   console.log(email);


   await page.locator("#username").fill(email);
   await page.pause();






});


