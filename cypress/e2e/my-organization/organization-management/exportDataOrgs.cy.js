// @team4
describe('Organization management page export verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
		// Click Organization Management
		cy.dashboardMenu('My Organization');
	});

	it('Verify export button is visible and downloading as Excel file', () => {
		//Verify Export button visibility on the org management
		cy.get('[data-testid="btn-sub-header-action-Export"]').should('be.visible').click({ force: true });
		cy.readFile(downloadsPath + exportFilename);
	});

	const downloadsPath = 'cypress/downloads/';
	const currentDate = dayjs().format('MM-DD-YYYY');
	const exportFilename = `Phillips Connect Organizations - ${currentDate}.xlsx`;
	const FileHeader =
		'Company Name,Parent Company,Brand,Type,Time Zone,Number of Devices,Updated Date,Created Date,Distance Unit Preference';
});
