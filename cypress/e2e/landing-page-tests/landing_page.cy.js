import '@4tw/cypress-drag-drop'

describe('Landing page view test verification', () => {

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
    })

    it('verify that Landing page opened after login', () => {
        cy.url().should('include', '/dashboard')
        cy.contains('Welcome back, qa_automation')
    })

    it('verify that Organisation tile link to My Organization page', () => {
        cy.get('.relative [data-testid="dashboard-component"]').within(() => {
            cy.contains('[data-testid="dashboard-tile-component"]', 'Organisation').should('be.visible').click()
            cy.url().should('include', '/organizations')
        })
    })

    it.skip('verify that View is configurable by end user', () => {

    })
})
