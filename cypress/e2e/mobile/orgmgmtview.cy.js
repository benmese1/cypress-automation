const sizes = ['iphone-8', 'ipad-2', [1170, 2532], 'samsung-note9']

describe('Mobile Organization Management View verification', () => {
  sizes.forEach((size) => {
   it(`Organization management table and filed validations on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
      } else {
        cy.viewport(size)
      }
      
      cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
      cy.waitForLoad()
      cy.get("[aria-label='account of current user']").should('be.visible');
      cy.dashboardMenu('My Organization');
      validatePageView();
      validateCreateNew();
    })

    /**
     * Validate buttons and fields on the organization management table
     */
    const validatePageView = () => {
        cy.get('[data-testid="page"]')
          .should('be.visible')
          .contains('My Organization');

        // Validate buttons
        // Upload button visible
        cy.get('[data-testid="global-button-component"]')
          .contains('Upload')
          .should('be.visible');

        // Export button visible
        cy.get('[data-testid="global-button-component"]')
          .contains('Export')
          .should('be.visible');

        // Create New button visible
        cy.get('[data-testid="global-button-component"]')
          .contains('Create New')
          .should('be.visible');

        // Validate table
        // Validate Organization name present on the table
          cy.get('[role="grid"] div .MuiDataGrid-virtualScroller')
            .scrollTo('topLeft',{ ensureScrollable: false })
            .get('[role="columnheader"][data-field="name"]')
            .should('be.visible');

        // Validate Created field name present on the table
          cy.get('[role="grid"] div .MuiDataGrid-virtualScroller')
            .scrollTo('topRight',{ ensureScrollable: false })
            .get('[role="columnheader"][data-field="added_date"]')
            .should('be.visible');   
    }

    /**
     * Validate Create new button and cancel the dialog once create new drawer opened
     */
    const validateCreateNew = () => {
        cy.get('[data-testid="global-button-component"]')
            .contains('Create New')
            .click();
        cy.get('[role="dialog"]')
            .contains('Create New')
            .should('be.visible');
        cy.get('[data-testid="global-text-btn-component"]')
            .contains('Cancel')
            .click();
        cy.logout();
    }
  })
})