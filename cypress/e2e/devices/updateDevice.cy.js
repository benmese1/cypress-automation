describe('update device verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });
		cy.waitForLoad();
	});
	it('verify that search box working', () => {
		//opening device management page
		cy.get(
			'[data-testid="dashboard-component-buttons-device-management"] > [data-testid="global-button-component"]'
		).click();
		cy.waitForLoad();
	});
	const clickDashboardMenu = () => {
		cy.get('[data-testid="header"] [role="button"]').click();
	};
});
