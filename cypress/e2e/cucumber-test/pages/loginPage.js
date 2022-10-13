import BasePage from "./basePage.js";

export default class LoginPage extends BasePage {

    get userNameInput() { return cy.get('.visible-lg #signInFormUsername'); }
    get passwordInput() { return cy.get('.visible-lg #signInFormPassword'); }
    get submitButton() { return cy.get('.visible-lg .btn-primary'); }


    // open(){
    //     const args = { username: 'text', password: 'tesxt' }
    //     cy.origin('https://devconnect1userpooldomain.auth.us-west-2.amazoncognito.com', { args }, ({ username, password }) => {
    //         cy.visit('/login?client_id=2652adm3ps89eqhr5ap54kd85i&response_type=code&scope=email+openid+profile&redirect_uri=http://localhost:3000/login', {failOnStatusCode: false})
    //         cy.get('.visible-lg #signInFormUsername').type(username)
    //         // this.setUserName(username);
    //         // this.setPassword(password)
    //     });
    // }

    // open(){
    //     const args = { username: 'text', password: 'tesxt' }
    //     cy.visit('https://devconnect1userpooldomain.auth.us-west-2.amazoncognito.com/login?client_id=2652adm3ps89eqhr5ap54kd85i&response_type=code&scope=email+openid+profile&redirect_uri=http://localhost:3000/')
    // }

    setUserName(username){
        return this.userNameInput.type(username);
    }

    setPassword(pwd){
        return this.passwordInput.type(pwd);
    }

    clickSignIn(){
        this.submitButton.click();
    }

}