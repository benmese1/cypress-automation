// @team4
describe('User management table view tests', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
		// Click User Management
		cy.dashboardMenu('User Management');
	});

	it('Validate hide/show column in User management table', () => {
		cy.get('[data-testid="column-header-username"]').should('be.visible');
		//Click on the Menu w.r.t the column which want to Hide
		cy.get('[role="columnheader"][aria-label="Username"] [data-testid="TripleDotsVerticalIcon"]').click({
			force: true,
		});
		cy.get('[role="tooltip"]').should('be.visible').contains('Hide Columns').click();
		// Check if a column is hidden
		cy.get('[data-testid="column-header-username"]').should('not.exist');
		cy.wait(3000);
		// Show hidden column
		cy.get('[data-testid="asset-table-toolbar-columns-btn"]').should('be.visible').click();
		cy.get('[role="tooltip"]').should('be.visible').contains('Username').click();
		cy.clickOutside();

		// Check if a column is visible
		cy.get('[data-testid="column-header-username"]').should('be.visible');
	});
});
