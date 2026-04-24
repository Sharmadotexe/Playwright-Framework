const { LoginPage } = require("../pageObjects/LoginPage");
const { DashboardPage } = require("../pageObjects/DashboardPage");
const { CartPage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");
const { OrderConfirmationPage } = require("./OrderConfirmationPage");
const { OrdersPage } = require("./OrdersPage");
const { ConfirmOrderPage } = require("./ConfirmOrderPage");

class POManager{
    constructor(page){
        this.page=page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkOutPage = new CheckoutPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
        this.confirmOrderPage = new ConfirmOrderPage(this.page);
    };

    getLoginPage(){
        return this.loginPage;
    };

    getDashboardPage(){
        return this.dashboardPage;
    };

    getCartPage(){
        return this.cartPage;
    };

    getCheckOutPage(){
        return this.checkOutPage;
    }

    getOrderConfirmationPage(){
        return this.orderConfirmationPage;
    }

    getOrderPage(){
       return this.ordersPage;
    }

    getConfirmOrderPage(){
       return this.confirmOrderPage;
    }

};

module.exports = {POManager};