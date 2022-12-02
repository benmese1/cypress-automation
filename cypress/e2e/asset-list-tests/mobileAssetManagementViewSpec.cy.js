describe('Mobile Asset Management View verification', {retries: 0}, () => {

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'), {cacheSession: false});
        cy.waitForLoad()
        cy.dashboardMenu('Asset List')
    })

    it('Iphone portrait view', () => {
        cy.viewport('iphone-5', 'portrait')
        validatePageView()
    })

    it('Iphone landscape view', () => {
        cy.viewport('iphone-5', 'landscape')
        validatePageView()
    })

    it('Ipad portrait view', () => {
        cy.viewport('ipad-2', 'portrait')
        validatePageView()
    })

    it('Ipad landscape view', () => {
        // type ViewportPreset = 'macbook-16' | 'macbook-15' | 'macbook-13' | 'macbook-11' | 'ipad-2' | 'ipad-mini' | 'iphone-xr' | 'iphone-x' | 'iphone-6+' | 'iphone-se2' | 'iphone-8' | 'iphone-7' | 'iphone-6' | 'iphone-5' | 'iphone-4' | 'iphone-3' | 'samsung-s10' | 'samsung-note9'
        cy.viewport('ipad-2', 'landscape')
        validatePageView()
    })

    const validatePageView = () => {
        cy.get('h1').contains('Asset Management').should('be.visible')
        // Validate buttons
        cy.get('[data-testid="global-button-component"]').contains('Upload').should('be.visible')
        cy.get('[data-testid="global-button-component"]').contains('Export').should('be.visible')
        cy.get('[data-testid="global-button-component"]').contains('Add Asset').should('be.visible')
        // Validate table
        cy.get('[role="columnheader"][ aria-label="Company Name"]').should('be.visible')

        // TODO scroll to bottom right corner
        // cy.get('[role="columnheader"][ aria-label="Battery Power"]').should('be.visible')

        validateDialog()
    }

    const validateDialog = () => {
        cy.scrollTo('topLeft')
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
