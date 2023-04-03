// @team2
describe.skip('Side menu test verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true }).waitForLoad();
	});

	it('Verify the header logo and side menu after clicking on the menu bar', () => {
		cy.get('[data-testid="header-logo"]').should('be.visible');
		cy.get('[data-testid="header"] [role="button"]').click();
		cy.get('[data-testid="side-menu"]').should('be.visible').contains('My Account');
	});

	it('Check dashboard roll down / up after clicking on the logo', () => {
		cy.dashboardMenu('Asset Map');
		cy.url().should('include', '/map');

		// Check dashboard roll down / up after clicking on the logo
		cy.get('[data-testid="dashboard-component"]').should('not.exist');
		cy.get('[data-testid="header-logo"]').should('be.visible').click();
		cy.get('[data-testid="dashboard-component"]').should('be.visible');

		cy.get('[data-testid="header-logo"]').should('be.visible').click();
		cy.get('[data-testid="dashboard-component"]').should('not.exist');
	});
});
