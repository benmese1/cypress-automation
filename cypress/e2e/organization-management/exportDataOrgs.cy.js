describe('Organization Management page export verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		})
			.waitForLoad()
			.get("[aria-label='account of current user']")
			.should('be.visible')
			.dashboardMenu('My Organization');
	});

	it('verify export button is visible and downloading CSV file', () => {
		cy.url().should('include', '/organizations');
		cy.get('[data-testid="asset-table-toolbar-export-btn"]').should('be.visible').click({ force: true });
		cy.wait(2000);
		cy.get('[role="menuitem"]')
			.contains('Download as CSV')
			.click({ force: true })
			.readFile(downloadsPath + exportFilename)
			.should('contain', csvFileHeader);
	});

	const downloadsPath = 'cypress/downloads/';
	const exportFilename = 'Phillips Connect.csv';
	const csvFileHeader =
		'Company Name,Brand,Type,Timezone,Number of Devices,Updated Date,Created Date,Distance Unit Preference';
});
