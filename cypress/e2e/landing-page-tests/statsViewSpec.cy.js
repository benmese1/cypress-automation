
describe('Landing stats view test verification', () => {

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
        cy.waitForLoad()
    })

    it('verify total assets tile', () => {
        cy.get('[data-testid="dashboard-tile-total-assets"]')
            .should('be.visible')
            .contains("Total Assets")

        cy.get('[data-testid="dashboard-tile-total-assets"]').within(() => {
            cy.get('[data-testid="total-assets-secondary-value"]').should('have.length', 3)
                .each((item) => {
                    cy.wrap(item).contains(/\d\d?%/)
                })
        })

        cy.get('[data-testid="dashboard-tile-total-assets"]')
            .click()
        cy.url().should('include', '/assets')
    })

    it('verify assets moving tile', () => {
        cy.get('[data-testid="dashboard-tile-active-assets"]')
            .should('be.visible')
            .contains("Assets Moving")

        cy.get('[data-testid="dashboard-tile-active-assets"]').within(() => {
            cy.contains('parked Assets')
            cy.contains('Low Dwell')
            cy.contains('Medium Dwell')
            cy.contains('High Dwell')
            cy.contains('Mega Dwell')
        })

        cy.get('[data-testid="active-assets-value"]').contains(/\d+/)

        cy.get('[data-testid="dashboard-tile-active-assets"]').within(() => {
            cy.get('[data-testid="total-assets-secondary-value"]').should('have.length', 4)
                .each((item) => {
                    cy.wrap(item).contains(/\d+/)
                })
        })

        cy.get('[data-testid="dashboard-tile-active-assets"]')
            .click()

        cy.url().should('include', '/assets')
    })

    it('verify total miles travelled tile', () => {
        cy.get('[data-testid="dashboard-tile-total-distance"]')
            .should('be.visible')
            .contains("Total Miles Travelled")

        cy.get('[data-testid="total-distance-value"]')
            .should('be.visible')
            .contains(/\d+((,\d{3}){1,2})?/)

        cy.get('[data-testid="dashboard-tile-total-distance"]')
            .click()
        cy.url().should('include', '/assets')
    })
})
