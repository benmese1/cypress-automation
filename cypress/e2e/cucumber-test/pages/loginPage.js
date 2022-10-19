import BasePage from "./basePage.js";

export default class LoginPage extends BasePage {

    get incorrectUserPassMsg() { return cy.get('.errorMessage-customizable'); }
    get submitButton() { return cy.get('.visible-lg .btn-primary'); }

    open(user, pwd) {
        const args = {
            username: user, password: pwd,
            client_id: Cypress.env('client_id'), redirect_uri: Cypress.env('redirect_uri')
        }
        cy.visit("/login");
        cy.origin('https://devconnect1userpooldomain.auth.us-west-2.amazoncognito.com', {args}, ({
                                                                                                     username,
                                                                                                     password,
                                                                                                     client_id,
                                                                                                     redirect_uri,
                                                                                                 }) => {
            cy.visit('/login?client_id=' + client_id + '&response_type=code&scope=email+openid+profile&redirect_uri=' + redirect_uri);
            cy.get('.visible-lg #signInFormUsername').type(username);
            cy.get('.visible-lg #signInFormPassword').type(password);
            cy.get('.visible-lg .btn-primary').click();
        });
    }

    isIncorrectDisplayed() {
        this.incorrectUserPassMsg.should('be.visible');
    }

    isIncorrectText(text) {
        this.incorrectUserPassMsg.should("contain.text", text);
    }

    isSubmitButtonDisplayed() {
        this.submitButton.should('be.visible');
    }
}