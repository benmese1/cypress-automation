
describe('Landing page view test verification', () => {

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
        waitForLoad()
    })

    it('verify that the side menu opened after the menu bar click', () => {
        cy.dashboardMenu()
        cy.get('[data-testid="side-menu"]').should('be.visible')
    })

    it('verify that menu item Asset List is linked to assets page', () => {
        cy.dashboardMenu()
        cy.get('[data-testid="side-menu"]')
            .should('be.visible')
            .contains('Asset List').click()
        cy.url().should('include', '/assets')
    })

    it('verify that menu item Asset Map is linked to the map page', () => {
        cy.dashboardMenu()
        cy.get('[data-testid="side-menu"]')
            .should('be.visible')
            .contains('Asset Map').click()
        cy.url().should('include', '/map')
    })

    const waitForLoad = () => {
        cy.get('[data-testid="spinner"]', { timeout: 30000 }).should('not.exist')
    }
})
