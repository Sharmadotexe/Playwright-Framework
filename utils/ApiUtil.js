module.exports = class ApiUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async createToken(loginPayload) {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        return token;
    };


    async createOrder(orderIdPayload) {
        let response = {};
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