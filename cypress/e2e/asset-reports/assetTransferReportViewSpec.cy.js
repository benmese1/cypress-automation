// @team2

describe('Reports: View Asset Transfer Report', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Reports');
	});

	it('Verify Asset Transfer Report Table', () => {
		cy.createNewReport('Asset Transfer');
		cy.url().should('include', 'reports/asset-transfer/template');
		// Verify Material UI Columns button
		cy.get('[data-testid="asset-table-toolbar-columns-btn"]').should('be.visible');
		// Verify Material UI Filters button
		cy.get('[data-testid="asset-table-toolbar-filter-btn"]').should('be.visible');
		// Verify Material UI Density button
		cy.get('[data-testid="asset-table-toolbar-density-btn"]').should('be.visible');
		// Verify Material UI Export button
		cy.get('[data-testid="asset-table-toolbar-export-btn"]').should('be.visible');

		//verify columns
		const columnHeadersList = ['Date', 'Asset Name', 'Device ID', 'VIN', 'Old Company', 'New Company', 'User Name'];
		cy.get("[role='columnheader']").each((el) => {
			expect(el.text()).oneOf(columnHeadersList);
		});
		cy.get("[role='columnheader']").should('have.length', columnHeadersList.length);
	});

	it('Verify Asset Transfer Report Initial View', () => {
		cy.createNewReport('Asset Transfer');

		//verify header text
		cy.get('[data-testId="management-reports"]').should('have.text', 'Reports');
		//verify sub-header text
		cy.get('[data-testId="company-phillips-connect"]').should('have.text', 'Phillips Connect');
		//verify Search Input is present
		cy.get('[data-testId="items-list-search-input"]').should('be.visible');
		//verify 'Schedule' button is present
		cy.get('[data-testId="btn-sub-header-action-Schedule"]').should('be.visible');
		//verify 'Run Report' button is present
		cy.get('[data-testId="btn-sub-header-action-Run Report"]').should('be.visible');

		//click 'Back' button
		cy.get('[data-testId="ArrowBackIcon"]').click();
		cy.url().should('include', 'reports');
	});
});
