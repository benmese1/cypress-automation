describe('Landing page view test verification', () => {

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
    })

    it('verify that the side menu opened after the menu bar click', () => {
        cy.get('[data-testid="header"] [role="button"]').click()
        cy.get('[data-testid="side-menu"]').should('be.visible')
    })

    it('verify that menu item Asset List is linked to assets page', () => {
        cy.get('[data-testid="header"] [role="button"]').click()
        cy.get('[data-testid="side-menu"]').contains('Asset List').click()
        cy.url().should('include', '/assets')
    })

    it('verify that menu item Asset Map is linked to the map page', () => {
        cy.get('[data-testid="header"] [role="button"]').click()
        cy.get('[data-testid="side-menu"]').contains('Asset Map').click()
        cy.url().should('include', '/map')
    })
})
