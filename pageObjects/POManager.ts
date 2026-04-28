import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrderConfirmationPage } from "./OrderConfirmationPage";
import { OrdersPage } from "./OrdersPage";
import { ConfirmOrderPage } from "./ConfirmOrderPage";
import {Page} from "@playwright/test";

export class POManager{

    page:Page;
    loginPage:LoginPage;
    dashboardPage:DashboardPage;
    cartPage:CartPage;
    checkOutPage:CheckoutPage;
    orderConfirmationPage:OrderConfirmationPage;
    ordersPage:OrdersPage;
    confirmOrderPage:ConfirmOrderPage;

    constructor(page:Page){
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