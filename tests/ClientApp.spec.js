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


test('Login functionality', async ({page,browser})=>{
    //Usertest1211@gmail.com Password@1

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("Usertest1211@gmail.com");
    await page.locator("#userPassword").fill("Password@1");
    await page.locator("#login").click();
    await page.locator(".card-body b").first().waitFor();

    console.log(await page.locator(".card-body b").allTextContents());
});

test('Dropdown Handling', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.selectOption('select.form-control', 'teach');
    await page.pause();
});


test('Special Locators', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Student").check();
    await page.getByLabel("Gender").selectOption("Female");

    await page.getByPlaceholder("Password").fill("This is the password");

    await page.getByRole("button", {name: 'Submit'}).click();

    const submitTxt =  page.getByText("The Form has been submitted successfully!.");
    await expect(submitTxt).toBeVisible();

    //chaining methods
    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button", {name:"Add"}).click();
});



test('Calender Handling', async({page})=>{

    const date = "15";
    const month = "01";
    const year = "2026";

    await page.goto("http://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__tile.react-calendar__decade-view__years__year").getByText(year).click();
    await page.locator(".react-calendar__tile").nth(Number(month)-1).click();
    await page.locator(`//abbr[text()="${date}"]`).click();

    
});



test('Handling Popups', async({page})=>{
   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // page.goto("https://www.google.com/");

    // page.goBack();
    // page.goForward();
    // page.goBack();


    await page.locator("#confirmbtn").click();
    await page.on("dialog", dialog => dialog.accept());

    await page.locator("#confirmbtn").click();
    await page.on("dialog", dialog => dialog.dismiss());


    await page.locator("#mousehover").hover();
});



test.only('Handling Framses', async({page})=>{
   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   const pageFrame = page.frameLocator("#courses-iframe");

   await pageFrame.locator("li a[href='lifetime-access']:visible").click();
});




