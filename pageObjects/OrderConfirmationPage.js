const { expect } = require("@playwright/test");

class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.thankyouTextLocator =  page.locator(".hero-primary");
        this.orderIDLocator =  page.locator('label[class="ng-star-inserted"]');
        this.navOrdersLocator = page.locator('label[routerlink="/dashboard/myorders"]');
    }

    async confirmTextandReturnOrderID() {
        const thankyouText =  this.thankyouTextLocator;
        await expect(thankyouText).toHaveText('Thankyou for the order.');
        const orderID = await this.orderIDLocator.textContent();
        return orderID;
    }

    async navigateToCartPage(){
        await this.navOrdersLocator.click();
    }
}


module.exports = {OrderConfirmationPage};