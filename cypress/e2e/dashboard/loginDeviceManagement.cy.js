// @team2
describe('Landing page view test verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: true });
		cy.waitForLoad();
	});

	it('Verify that the side menu opened after the menu bar click', () => {
		cy.get('[data-testid="header"] [role="button"]').click();
		cy.get('[data-testid="side-menu"]').should('be.visible');
	});

	it('Verify that menu item Devices are linked to assets page', () => {
		cy.get('[data-testid="header"] [role="button"]').click();
		cy.get('[data-testid="side-menu"]').should('be.visible').contains('Devices').click();
		cy.url().should('include', '/devices');
	});
});
