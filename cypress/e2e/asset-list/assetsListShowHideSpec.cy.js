// @viktoriya
describe('Asset list table view tests', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset List');
	});

	it('validate hide/show column in Asset list table', () => {
		cy.get('[role="columnheader"][aria-label="Product Name"]').should('be.visible');

		cy.get('[role="columnheader"][aria-label="Product Name"] [data-testid="TripleDotsVerticalIcon"]')
			.click({ force: true })
			.get('[role="tooltip"]')
			.should('be.visible')
			.contains('Hide Columns')
			.click();

		// Check if a column is hidden
		cy.get('[role="columnheader"][aria-label="Product Name"]').should('not.exist');

		// Show hidden column
		cy.get('[data-testid="asset-table-toolbar-columns-btn"]')
			.click()
			.get('.MuiDataGrid-panelContent')
			.should('be.visible')
			.contains('Product')
			.click();

		cy.clickOutside();

		// Check if a column is visible
		cy.get('[role="columnheader"][aria-label="Product Name"]').should('be.visible');
	});
});
