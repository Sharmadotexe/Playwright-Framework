class LoginPage{

    constructor(page){
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
    }

    async goToPage(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }


    async validLogin(email, password){
    await this.email.fill(email);
    await this.password.fill("Password@1");
    await this.loginButton.click();
    }
};


module.exports = {LoginPage};