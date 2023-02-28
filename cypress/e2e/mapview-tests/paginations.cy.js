describe('Verify that pagination works for asset list', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset Map');
	});

	it('verify pagination works for asset list', () => {
		// make sure pagination is visible
		cy.get('[aria-label="pagination navigation"]', { timeout: 10000 }).should('be.visible');

		// click on pagination
		cy.get('[aria-label="pagination navigation"]').click({ force: true });
		// click on each page to view assets
		cy.get(
			'[class="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeSmall MuiPaginationItem-text MuiPaginationItem-rounded Mui-selected MuiPaginationItem-page css-123d89"]'
		).each(($elem) => {
			cy.get($elem).click({ force: true });
		});
	});
});
