// @team1
describe('Click on the asset dashboard flyout ', () => {
	it('Success click on asset dashboard flyout and close it', () => {
		// Login to Dev Environment
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });

		// Assert the user is visible
		cy.get("[aria-label='account of current user']").should('be.visible');

		// Click Asset Maps
		cy.dashboardMenu('Asset Map');

		// Wait for the map to reload
		cy.mapWait();

		//Click on the asset and check if flyout opens
		cy.get('[data-testid*="asset-"]')
			.eq(0)
			.click({ force: true })
			.then(() => {
				//Click on close button to close the flyout
				cy.get('[data-testid="asset-panel-close-btn"]').click({ force: true });
			});
	});
});
