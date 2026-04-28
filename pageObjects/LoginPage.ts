import { Page,Locator } from "@playwright/test";

export class LoginPage{
    page:Page;
    email:Locator;
    password:Locator;
    loginButton:Locator;
    cards:Locator;

    constructor(page:Page){
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
        this.cards = page.locator(".card-body b").first();
    }

    async goToPage(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }


    async validLogin(email:string, password:string){
    await this.email.fill(email);
    await this.password.fill("Password@1");
    await this.loginButton.click();
    await this.cards.waitFor();
    }
};


module.exports = {LoginPage};