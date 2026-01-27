const {expect,test} = require("@playwright/test");


let webContext;
const productName = "iphone 13 pro";




test.beforeAll(async({browser})=>{
    
    //Usertest1211@gmail.com Password@1

    const context =  await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("Usertest1211@gmail.com");
    await page.locator("#userPassword").fill("Password@1");
    await page.locator("#login").click();
    
    await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());
    
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
});



test('abcd', async({browser})=>{
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

    //waiting for titles to load
    await page.locator(".card-body b").first().waitFor();

    const allProducts = page.locator(".card-body");
    const num = await allProducts.count();
    
    for(let i = 0; i< num; i++){
        let specProduct = allProducts.nth(i);
        
        let title = await specProduct.locator('b').textContent();
        
        if(title?.trim() === productName){
            await specProduct.locator(".fa-shopping-cart").click();
            break;
        }  
    }
});