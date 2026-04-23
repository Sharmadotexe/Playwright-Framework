const { LoginPage } = require("../pageObjects/LoginPage");
const { DashboardPage } = require("../pageObjects/DashboardPage");
const { CartPage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");

class POManager{
    constructor(page){
        this.page=page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkOutPage = new CheckoutPage(this.page);
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

};

module.exports = {POManager};