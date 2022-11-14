describe('Landing page view test verification', () => {

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
    })

    it('verify that the side menu opened after the menu bar click', () => {
        clickMenu()
        cy.get('[data-testid="side-menu"]').should('be.visible')
    })

    it.skip('verify that menu item Asset List is linked to assets page', () => {
        clickMenu()
        cy.get('[data-testid="side-menu"]')
            .should('be.visible')
            .contains('Asset List').click()
        cy.url().should('include', '/assets')
    })

    it.skip('verify that menu item Asset Map is linked to the map page', () => {
        clickMenu()
        cy.get('[data-testid="side-menu"]')
            .should('be.visible')
            .contains('Asset Map').click()
        cy.url().should('include', '/map')
    })

    const clickMenu = () => {
        cy.get('[data-testid="header"] [role="button"]').click()
        cy.wait(100)
        cy.get('[data-testid="header"] [role="button"]').click()
    }
})
