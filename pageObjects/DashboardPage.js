class DashboardPage {
    constructor(page) {
        this.page = page;
        this.allProducts = page.locator(".card-body");
        this.overlayLocator = page.locator('.ngx-spinner-overlay');
        this.cartLocator = page.locator('[routerlink="/dashboard/cart"]');
    };


    async searchProductAndAdd(productName) {
        const num = await this.allProducts.count();

        for (let i = 0; i < num; i++) {
            let specProduct = this.allProducts.nth(i);
            let title = await specProduct.locator('b').textContent();

            if (title?.trim() === productName) {
                await specProduct.locator(".fa-shopping-cart").click();
                break;
            }
        }
        await this.overlayLocator.waitFor({ state: 'hidden' });
    }


    async navigateToCart(){
        await this.cartLocator.click();
    }
};

module.exports = { DashboardPage };