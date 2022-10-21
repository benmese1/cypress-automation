import BasePage from "./basePage.js";

export default class HomePage extends BasePage {
    get userIconButton() {
        return cy.get("[aria-label='account of current user']")
    }

    isSignedIn() {
        this.userIconButton.should('be.visible');
    }
}
