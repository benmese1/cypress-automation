export default class BasePage {

    getLoginButton() { return cy.get('a .MuiButton-root'); }
    pause(ms) {
        cy.wait(ms)
    }

    logInfo(message) {
        cy.log(message)
    }

    setMobileViewport() {
        cy.viewport('iphone-x')
    }

}