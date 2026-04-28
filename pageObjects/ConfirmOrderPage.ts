import { expect,Page,Locator } from "@playwright/test";

export class ConfirmOrderPage {

    page:Page;
    orderIdLocator:Locator;
    billingLocator:Locator;
    deliveryLocator:Locator;
    productNameLocator:Locator;

    constructor(page:Page) {
        this.page = page;
        this.orderIdLocator = page.locator('.col-text.-main');
        this.billingLocator = page.locator('p[class="text"]').nth(0);
        this.deliveryLocator = page.locator('p[class="text"]').nth(2);
        this.productNameLocator = page.locator('.title');
    }


    async confirmOrderDetails(orderID:any,email:string, productName:string) {
        const orderIDText = await this.orderIdLocator.textContent();
        await expect(orderID.includes(orderIDText)).toBeTruthy();
        await expect(this.billingLocator).toHaveText(email);
        await expect(this.deliveryLocator).toHaveText(email);
        await expect(this.productNameLocator).toHaveText(productName);
    }
}

module.exports = {ConfirmOrderPage};