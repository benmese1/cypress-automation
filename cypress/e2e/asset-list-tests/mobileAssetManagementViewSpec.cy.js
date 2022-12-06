describe('Mobile Asset Management View verification', {retries: 0}, () => {

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
        cy.waitForLoad()
        cy.dashboardMenu('Asset List')
    })

    it('Iphone portrait view', () => {
        cy.viewport('iphone-5', 'portrait')
        cy.waitForLoad(2000)
        validatePageView()
    })

    it('Iphone landscape view', () => {
        cy.viewport('iphone-5', 'landscape')
        cy.waitForLoad(2000)
        validatePageView()
    })

    it('Ipad portrait view', () => {
        cy.viewport('ipad-2', 'portrait')
        cy.waitForLoad(2000)
        validatePageView()
    })

    it('Ipad landscape view', () => {
        cy.viewport('ipad-2', 'landscape')
        cy.waitForLoad(2000)
        validatePageView()
    })

    const validatePageView = () => {
        cy.get('h1').contains('Asset Management').should('be.visible')
        // Validate buttons
        cy.get('[data-testid="global-button-component"]').contains('Upload').should('be.visible')
        cy.get('[data-testid="global-button-component"]').contains('Export').should('be.visible')
        cy.get('[data-testid="global-button-component"]').contains('Add Asset').should('be.visible')

        // Validate table
        cy.get(".MuiDataGrid-virtualScroller").scrollTo('topLeft')
        cy.get('[role="columnheader"][ aria-label="Company Name"]').should('be.visible')

        cy.get(".MuiDataGrid-virtualScroller").scrollTo('topRight')
        cy.get('[role="columnheader"][ aria-label="Battery Power"]').should('be.visible')

        validateDialog()
    }

    const validateDialog = () => {
        cy.get('[data-testid="global-button-component"]')
            .contains('Upload')
            .click();
        cy.get('[role="dialog"]')
            .contains('Upload Assets CSV file')
            .should('be.visible');
        cy.get('[role="dialog"]')
            .get('[data-testid="global-button-component"]')
            .contains('Cancel')
            .click();
    }
})
