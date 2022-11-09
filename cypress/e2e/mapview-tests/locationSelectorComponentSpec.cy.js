describe('Location Selector Component verification', () => {

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
    })

    it('check that location selector component is integrated to dashboard', () => {
        cy.get('.relative [data-testid="location-selector-input"]')
            .should('be.visible')
            .type('Florida{enter}')
        cy.url().should('include', '/map')
    })

    it('check recent searches', () => {
        cy.get('.relative [data-testid="location-selector-input"]')
            .should('be.visible')
            .type('Florida{enter}')

        cy.get('[data-testid="header"]').click('center')
        cy.get('[data-testid="location-selector-input"]')
            .should('be.visible')
            .type('California{enter}')

        cy.get('[data-testid="header"]').click('center')
        cy.get('[data-testid="location-selector-input"]')
            .click('center')
            .type('{selectall}{backspace}a{backspace}')

        cy.get('[data-testid="dashboard-component"] [role="presentation"]').within(() => {
                cy.contains('California')
                cy.contains('Florida')
            }
        )
    })
})
