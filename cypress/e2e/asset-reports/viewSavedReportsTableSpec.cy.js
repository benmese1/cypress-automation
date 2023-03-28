// @team2

describe('Reports Page: View Saved Reports Table', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Reports');
	});

	it('Verify Reports Table Columns Visibility', () => {
		// Verify Material UI Premium Columns button
		cy.get('[data-testid="asset-table-toolbar-columns-btn"]').should('be.visible');
		// Verify Material UI Premium Filters button
		cy.get('[data-testid="asset-table-toolbar-filter-btn"]').should('be.visible');
		// Verify Material UI Premium Density button
		cy.get('[data-testid="asset-table-toolbar-density-btn"]').should('be.visible');
		// Verify Material UI Premium Export button
		cy.get('[data-testid="asset-table-toolbar-export-btn"]').should('be.visible');

		//verify columns
		const columnHeadersList = [
			'Report Name',
			'Report Type',
			'Company',
			'Created By',
			'Last Run',
			'Report Created',
			'Scheduled',
			'Last Updated',
		];
		cy.get("[role='columnheader']").each((el) => {
			expect(el.text()).oneOf(columnHeadersList);
		});
		cy.get("[role='columnheader']").should('have.length', columnHeadersList.length);
	});

	it('Verify Reports Page Initial View', () => {
		cy.url().should('include', '/reports');
		//verify header text
		cy.get('[data-testId="management-reports"]').should('have.text', 'Reports');
		//verify sub-header text
		cy.get('[data-testId="company-phillips-connect"]').should('have.text', 'Phillips Connect');
		//verify Search Input is present
		cy.get('[data-testId="items-list-search-input"]').should('be.visible');
		//verify 'Create New Report' button is present
		cy.get('[data-testId="btn-sub-header-action-Create New Report"]').should('be.visible');
	});

	it('Verify New Report Modal Can Be Closed', () => {
		cy.get('[data-testId="btn-sub-header-action-Create New Report"]').click();
		cy.get('[role="dialog"]').should('be.visible');
		cy.get('#create-report-dialog-title').should('have.text', 'Create New Report');
		cy.get('[data-testId="report-type-autocomplete-label"]').should('have.text', 'Report Type');

		//Close via 'Cancel' button
		cy.get('[data-testId="btn-org-form-cancel"]').click();
		cy.get('[role="dialog"]').should('not.be.visible');

		//Close via 'X' button
		cy.get('[data-testId="btn-sub-header-action-Create New Report"]').click();
		cy.get('[role="dialog"]').should('be.visible');
		cy.get('[data-testId="CloseIcon"] ').click();
		cy.get('[role="dialog"]').should('not.be.visible');
	});
});
