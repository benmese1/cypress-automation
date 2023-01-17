describe('Asset list table view tests', () => {
	beforeEach(() => {
		cy.task('generateOTP', Cypress.env('TESTsecretKey'));
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.wait(1000);
	});

	it('validate hide/show column in Asset list table', () => {
		cy.task('generateOTP', Cypress.env('TESTsecretKey')).then((token) => {
			cy.get('[name="authentication_code"]').type(token);
		});

		cy.xpath('//button[contains(text(), "Sign in")]').click();

		cy.get('[role="columnheader"][aria-label="Product"]').should('be.visible');

		cy.get('[role="columnheader"][aria-label="Product"] [data-testid="TripleDotsVerticalIcon"]')
			.click({ force: true })
			.get('[role="tooltip"]')
			.should('be.visible')
			.contains('Hide Columns')
			.click();

		// Check if a column is hidden
		cy.get('[role="columnheader"][aria-label="Product"]').should('not.exist');

		// Show hidden column
		cy.get('[data-testid="asset-table-toolbar-columns-btn"]')
			.click()
			.get('.MuiDataGrid-panelContent')
			.should('be.visible')
			.contains('Product')
			.click();

		cy.clickOutside();

		// Check if a column is visible
		cy.get('[role="columnheader"][aria-label="Product"]').should('be.visible');
	});
});
