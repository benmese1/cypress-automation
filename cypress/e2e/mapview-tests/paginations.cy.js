describe('Verify that pagination works for asset list', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false })
			.waitForLoad()
			.dashboardMenu('Asset Map')
			.waitForLoad();
	});

	it('verify pagination works for asset list', () => {
		// make sure pagination is visible
		cy.get('[data-testid="pagination-container"]', { timeout: 10000 }).should('be.visible');

		// click on pagination
		cy.get('[data-testid="pagination-container"]').click({ force: true });
		// click on each page to view assets
		cy.get('[data-testid="pagination-container"]')
			.find('li')
			.each(($elem) => {
				cy.get($elem).click({ force: true });
			});
	});
});
