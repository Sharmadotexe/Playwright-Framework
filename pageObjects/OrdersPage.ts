import {expect, Page, Locator} from "@playwright/test"
export class OrdersPage {
    page:Page;
    tableLocator:Locator;
    tableRowLocator:Locator;
    constructor(page:Page) {
        this.page = page;
        this.tableLocator=page.locator('tbody');
        this.tableRowLocator =page.locator('tbody tr');
    }
    
    
    
    async validateOrderDetails(orderID:string){
        await this.tableLocator.waitFor();
        
        const row = this.tableRowLocator;
        const rowCount = await row.count();
        
        for (let i = 0; i < rowCount; i++) {
            let specRow: any = await row.nth(i).locator("th").textContent();
            
            if (orderID.includes(specRow)) {
                console.log(specRow);
                await row.nth(i).locator("button").first().click();
                break;
            }
            else {
                console.log("OrderID not found");
                expect(false).toBeTruthy();
            }
        }
        
    };
    
};

module.exports = { OrdersPage };