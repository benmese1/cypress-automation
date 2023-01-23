describe('Organization management page export verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
		// Click Organization Management
		cy.dashboardMenu('My Organization');
	});

	it('Verify export button is visible and downloading CSV file', () => {
		cy.url().should('include', '/organizations');
		//Verify Export button visibility on the org management
		cy.get('[data-testid="asset-table-toolbar-export-btn"]').should('be.visible').click({ force: true });
		cy.wait(2000);
		//From Export button verify "Download as CSV" functionality
		cy.get('[role="menuitem"]')
			.contains('Download as CSV')
			.click({ force: true })
			.readFile(downloadsPath + exportFilename)
			.should('contain', csvFileHeader);
	});

	const downloadsPath = 'cypress/downloads/';
	const exportFilename = 'Phillips Connect.csv';
	const csvFileHeader =
		'Company Name,Parent Company,Brand,Type,Timezone,Number of Devices,Updated Date,Created Date,Distance Unit Preference';
});
