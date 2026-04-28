import { Page,expect,Locator } from "@playwright/test";

export class CheckoutPage {
    page:Page;
    creditCardLocator:Locator;
    expiryMonthLocator:Locator;
    expiryDateLocator:Locator;
    cvvLocator:Locator;
    nameOnCardLocator:Locator;
    couponLocator:Locator;
    couponBtn:Locator;
    waitLocator:Locator;
    emailLocator:Locator;
    countryLocator:Locator;
    countryResultsLocator:Locator;
    submitBtnLocator:Locator;
    constructor(page:Page) {
        this.page = page;
        this.creditCardLocator = page.locator('input[type="text"]').nth(0);
        this.expiryMonthLocator = page.locator('select.input.ddl').nth(0)
        this.expiryDateLocator = page.locator('select.input.ddl').nth(1);
        this.cvvLocator = page.locator('input[type="text"]').nth(1);
        this.nameOnCardLocator = page.locator('input[type="text"]').nth(2);
        this.couponLocator = page.locator('input[type="text"]').nth(3);
        this.couponBtn = page.locator('[type="submit"]');
        this.waitLocator = page.locator('.mt-1.ng-star-inserted');
        this.emailLocator = page.locator('input[type="text"]').nth(4);
        this.countryLocator = page.locator('.form-group input');
        this.countryResultsLocator = page.locator('.ta-results');
        this.submitBtnLocator = page.locator(".btnn.action__submit");
    }

    async fillCreditCardDetails(cardNumber:string, monthValue:string, DateValue:string, cvvNumber:string) {
        await this.creditCardLocator.fill(cardNumber);
        await this.expiryMonthLocator.selectOption({ label: monthValue });
        await this.expiryDateLocator.selectOption({ label: DateValue });
        await this.cvvLocator.fill(cvvNumber);
    }

    async fillNameAndCouponCode(nameOnCard:string, couponCode:string) {
        await this.nameOnCardLocator.fill(nameOnCard);
        await this.couponLocator.fill(couponCode);
    }

    async clickOnApplyCouponandExpect() {
        await this.couponBtn.click();
        await this.waitLocator.waitFor();
        await expect(this.waitLocator).toHaveText("* Coupon Applied");
    }

    async validateEmailAndFillCountry(email:string, countryName:string) {
        await expect(this.emailLocator).toHaveValue(email);
        await this.countryLocator.pressSequentially(countryName);
        const countryNames = await this.countryResultsLocator;
        await countryNames.waitFor();

        const cnt = await countryNames.locator('button').count();

        for (let i = 0; i < cnt; i++) {
            let specCountry = await countryNames.locator('button').nth(i).textContent();

            if (specCountry?.trim() === countryName) {
                await countryNames.locator('button').nth(i).click();
                break;
            }
        }
    }

    async clickSubmit() {
        await this.submitBtnLocator.click();
    }
}

module.exports = { CheckoutPage };