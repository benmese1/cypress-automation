describe('User Management page export verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { 
            cacheSession: false 
        })
            .waitForLoad()
		    .get("[aria-label='account of current user']").should('be.visible')
		    .dashboardMenu('User Management');
	});

    it('verify export button is visible and downloading CSV file', () => {
        cy.url().should('include', '/user-management');
        cy.get('[aria-label="Export"]')
            .should('be.visible')
            .click({ force: true })
            .wait(2000)
            .get('[role="menuitem"]')
            .should('contain.text','Download as CSV')
            .click({ force: true })
            .readFile(downloadsPath + exportFilename)
            .should('contain', csvFileHeader);
    });

    const downloadsPath = 'cypress/downloads/';
    const exportFilename = 'Phillips Connect.csv';
    const csvFileHeader = 'Company/Sub Company,Last Name,First Name,Username,Email,Phone Number,Role,Last Login Date,Created Date,Status,Created Date,Updated Date';

})