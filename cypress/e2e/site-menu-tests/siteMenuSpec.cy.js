describe('Side menu test verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('username'), Cypress.env('password'), { cacheSession: false }).waitForLoad();
	});

	it('verify the header logo and side menu after clicking on the menu bar', () => {
		cy.get('[data-testid="header-logo"]').should('be.visible');
		clickDashboardMenu();
		cy.get('[data-testid="side-menu"]').should('be.visible').contains('My Account').should('not.exist');
	});

	it('verify that menu item Asset List is linked to assets page', () => {
		clickDashboardMenu();
		cy.get('[data-testid="side-menu"]').should('be.visible').contains('Asset List').click();
		cy.url().should('include', '/assets');
		cy.get('[data-testid="header-logo"]').should('be.visible');
	});

	it('verify that menu item Asset Map is linked to the map page', () => {
		clickDashboardMenu();
		cy.get('[data-testid="side-menu"]').should('be.visible').contains('Asset Map').click();
		cy.url().should('include', '/map');

		// Check dashboard roll down / up after clicking on the logo
		cy.get('[data-testid="dashboard-component"]').should('not.exist');
		cy.get('[data-testid="header-logo"]').should('be.visible').click();
		cy.get('[data-testid="dashboard-component"]').should('be.visible');

		cy.get('[data-testid="header-logo"]').should('be.visible').click();
		cy.get('[data-testid="dashboard-component"]').should('not.exist');
	});

	const clickDashboardMenu = () => {
		cy.get('[data-testid="header"] [role="button"]').click();
	};
});
