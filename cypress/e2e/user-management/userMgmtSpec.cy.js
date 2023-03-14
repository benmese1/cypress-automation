// @team4
describe('User management page general tests', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
		// Click User Management
		cy.dashboardMenu('User Management');
	});

	it('Verify different buttons visibility on the page above table header', () => {
		// Verify Premium Columns button
		cy.get('[data-testid="asset-table-toolbar-columns-btn"]').should('be.visible');
		// Verify Filters button
		cy.get('[data-testid="asset-table-toolbar-filter-btn"]').should('be.visible');
		// Verify Density button
		cy.get('[data-testid="asset-table-toolbar-density-btn"]').should('be.visible');
		// Verify Export button
		cy.get('[data-testid="asset-table-toolbar-export-btn"]').should('be.visible');
	});

	it('Verify user management table, search button and create new button is displayed', () => {
		//Verify user management table
		cy.get('[role="grid"]').should('be.visible');
		//Verify search button visiblity
		cy.get('[data-testid="items-list-search-input"]').should('be.visible');
		//Verify Create New button visibility
		cy.get('[data-testid="btn-sub-header-action-Create New"]').should('be.visible');
	});
});
