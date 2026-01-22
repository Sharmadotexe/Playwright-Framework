const {expect, test, request} = require('@playwright/test');

const loginPayload = {
    userEmail: "vikas.sharma16@Cipla.com",
    userPassword: "av"
}

test.beforeAll( async()=>{
    const apiContext = await request.newContext();
    const loginResponse =  await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data:loginPayload
        });
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = loginResponse.json();
        const token = loginResponseJson.token();
});


