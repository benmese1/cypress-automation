// @team2
describe('Landing page view test verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false });
		cy.waitForLoad();
	});

	it('verify that the side menu opened after the menu bar click', () => {
		clickDashboardMenu();
		cy.get('[data-testid="side-menu"]').should('be.visible');
	});

	it('verify that menu item Devices are linked to assets page', () => {
		clickDashboardMenu();
		cy.get('[data-testid="side-menu"]').should('be.visible').contains('Devices').click();
		cy.url().should('include', '/devices');
	});

	const clickDashboardMenu = () => {
		cy.get('[data-testid="header"] [role="button"]').click();
	};
});
