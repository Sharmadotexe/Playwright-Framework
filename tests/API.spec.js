const {expect, test, request} = require('@playwright/test');

let token;
let orderID;

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

test.beforeAll( async()=>{
    const apiContext = await request.newContext({
        ignoreHTTPSErrors: true,
    });
    const loginResponse =  await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data:loginPayload
        });
        await expect(loginResponse).toBeOK();
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;



        //create order API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderIdPayload,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }); 

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderID = orderResponseJson.orders[0];
});



test("End to End Demo test", async ({page})=>{

    await page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

    await page.locator('button[routerlink="/dashboard/myorders"]').click();

    await page.locator('tbody').waitFor();

    const row = await page.locator('tbody tr');
    const rowCount = await row.count();

    for(let i = 0; i < rowCount; i++){
            let specRow = await row.nth(i).locator("th").textContent();

        if(orderID.includes(specRow)){
            console.log(specRow);
            await row.nth(i).locator("button").first().click();
            break;
        }
        else{
            console.log("OrderID not found");
            expect().toBeFalsy();
        }
    }

    // order page
    const orderIDLoc =await page.locator('.col-text.-main').textContent();
    await expect(orderID.includes(orderIDLoc)).toBeTruthy();
});




