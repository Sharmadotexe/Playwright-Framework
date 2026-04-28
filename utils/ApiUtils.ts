import {Page,Locator} from "@playwright/test"

export class ApiUtils {
    apiContext:any;
    loginPayload:any;

    constructor(apiContext:any, loginPayload:any) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async createToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        return token;
    };


    async createOrder(orderIdPayload:any) {
        let response:any = {};
        response.token = await this.createToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderIdPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });

        const orderResponseJson = await orderResponse.json();
        const orderID = orderResponseJson.orders[0];
        response.orderID = orderID;

        return response;
    };
}

module.exports = {ApiUtils}