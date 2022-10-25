describe('Login', () => {
    it('Success login test', () => {
        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.get("[aria-label='account of current user']").should('be.visible')
    })

    it('Incorrect password test', () => {
        cy.login(Cypress.env('username'), 'incorrect');
        cy.contains('Incorrect username or password.')
    })

    it('Empty login test', () => {
        cy.login(' ', ' ');
        cy.contains('The username you entered cannot be empty or contain only spaces')
    })

    it('Empty password test', () => {
        cy.login(Cypress.env('username'), ' ');
        cy.contains('The password you entered cannot be empty or contain only spaces');
    })
})
