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
		cy.get('[data-testid="SaveAltIcon"]', { timeout: 20000 }).should('be.visible').click({ force: true });
		//From Export button verify "Download as CSV" functionality
		cy.get('[role="menuitem"]').contains('Download as CSV').click({ force: true }).wait(2000);
		cy.readFile(`${downloadsPath}` + '\\' + `${getExportedFile()}`).should('contain', csvFileHeader);	
	});

	it('Verify export button is visible and downloading Excel file', () => {
		cy.url().should('include', '/organizations');
		//Verify Export button visibility on the org management
		cy.get('[data-testid="SaveAltIcon"]', { timeout: 20000 }).should('be.visible').click({ force: true });
		//From Export button verify "Download as Excel" functionality
		cy.get('[role="menuitem"]').contains('Download as Excel').click({ force: true }).wait(2000);
		cy.readFile(`${downloadsPath}` + '\\' + `${getExportedFile()}`).should('contain', csvFileHeader);	
	});

	const downloadsPath = Cypress.config('downloadsFolder');
	const csvFileHeader =
		'Company Name,Parent Company,Brand,Type,Time Zone,Number of Devices,Updated Date,Created Date,Distance Unit Preference';
});

function getExportedFile() {
	return `Organizations - ${new Date().toLocaleDateString().split('/').join('_')}.csv`;
}

