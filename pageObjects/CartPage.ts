import {expect, Page, Locator} from "@playwright/test"

export class CartPage{

    page:Page;
    cartProductName:Locator;
    checkOutBtn:Locator;

    constructor(page:Page){
        this.page=page;
        this.cartProductName=page.locator('.cartSection h3');
        this.checkOutBtn=page.locator('li.totalRow button.btn-primary');

    }

    async validateAndCheckout(productName:string){
        await expect(this.cartProductName).toHaveText(productName);
        await this.checkOutBtn.click();
    }
};


module.exports={CartPage};