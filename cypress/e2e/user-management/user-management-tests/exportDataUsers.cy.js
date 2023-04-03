import dayjs from 'dayjs';
// @team4
describe('User Management page export verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
		// Click User Management
		cy.dashboardMenu('User Management');
	});

	it('Verify export button is visible and downloading CSV file', () => {
		cy.url().should('include', '/user-management');
		//Verify Export button visibility on the user management
		cy.wait(10000);
		cy.get('button[data-testid="asset-table-toolbar-export-btn"]').should('be.visible').click({ force: true });
		cy.get('li[role="menuitem"]')
			.contains('Download as CSV')
			.click({ force: true })
			.readFile(downloadsPath + exportFilename)
			.should('contain', csvFileHeader);
	});

	const downloadsPath = 'cypress/downloads/';
	const currentDate = dayjs().format('MM-DD-YYYY');
	const exportFilename = `Phillips Connect Users - ${currentDate}.csv`;
	const csvFileHeader =
		'Company/Sub Company,Last Name,First Name,Username,Email,Phone Number,Role,Last Login Date,Status,Created Date,Updated Date';
});
