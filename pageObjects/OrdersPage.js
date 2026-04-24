const { expect } = require("@playwright/test");

class OrdersPage {
    constructor(page) {
        this.page = page;
        this.tableLocator=page.locator('tbody');
        this.tableRowLocator =page.locator('tbody tr');
    }
    
    
    
    async validateOrderDetails(orderID){
        await this.tableLocator.waitFor();
        
        const row = this.tableRowLocator;
        const rowCount = await row.count();
        
        for (let i = 0; i < rowCount; i++) {
            let specRow = await row.nth(i).locator("th").textContent();
            
            if (orderID.includes(specRow)) {
                console.log(specRow);
                await row.nth(i).locator("button").first().click();
                break;
            }
            else {
                console.log("OrderID not found");
                expect().toBeFalsy();
            }
        }
        
    };
    
};

module.exports = { OrdersPage };