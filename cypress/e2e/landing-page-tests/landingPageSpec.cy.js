describe('Landing page view test verification', () => {

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false})
            .waitForLoad();
    })
    //
    // it('verify that Landing page opened after login', () => {
    //     cy.url().should('include', '/dashboard')
    //     cy.contains('Welcome back, qa_automation')
    // })
    //
    // it('verify that location selector appeared', () => {
    //     cy.get('[data-testid="location-selector-input"]').should('be.visible')
    // })
    //
    // it('verify that Organisation tile link to My Organization page', () => {
    //     cy.get('.relative [data-testid="dashboard-component"]').within(() => {
    //         cy.contains('[data-testid="dashboard-tile-component"]', 'Organization').should('be.visible').click()
    //         cy.url().should('include', '/organizations')
    //     })
    // })
    //
    // it('verify that the Asset List tile link to the Asset Management page', () => {
    //     cy.get('.relative [data-testid="dashboard-component"]').within(() => {
    //         cy.contains('[data-testid="dashboard-tile-component"]', /^Asset List$/).should('be.visible').click()
    //         cy.url().should('include', '/assets')
    //     })
    // })

    it(' Verify search placeholder text test', () => {
        cy.get('[data-testid="location-selector-input"] input')
            .invoke('attr', 'placeholder')
            .should("equal", 'Find An Asset')
    })
})
