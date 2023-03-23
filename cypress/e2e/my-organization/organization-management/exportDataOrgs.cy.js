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
		cy.get('[data-testid="btn-sub-header-action-Export"]', { timeout: 20000 }).should('be.visible').click({ force: true });
		cy.readFile(`${downloadsPath}` + '\\' + `${getExportedFile()}`).should('contain', FileHeader);
	});

	const downloadsPath = Cypress.config('downloadsFolder');
	const FileHeader =
		'Company Name,Parent Company,Brand,Type,Time Zone,Number of Devices,Updated Date,Created Date,Distance Unit Preference';
});

function getExportedFile() {
	return `Organizations - ${new Date().toLocaleDateString().split('/').join('_')}.xlsx`;
}

