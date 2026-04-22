const {expect} = require("@playwright/test");

class CartPage{
    constructor(page){
        this.page=page;
        this.cartProductName=page.locator('.cartSection h3');
        this.checkOutBtn=page.locator('li.totalRow button.btn-primary');

    }

    async validateAndCheckout(productName){
        await expect(this.cartProductName).toHaveText(productName);
        await this.checkOutBtn.click();
    }
};


module.exports={CartPage};