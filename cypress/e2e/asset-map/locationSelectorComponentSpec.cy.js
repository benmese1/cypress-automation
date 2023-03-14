// @tazim
describe('Location Selector Component verification', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), { cacheSession: false });
		cy.waitForLoad();
	});

	it('check that location selector component is integrated to dashboard', () => {
		cy.get('.relative [data-testid="location-selector-input"]').should('be.visible').type('Florida{enter}');
		cy.url().should('include', '/map');
	});

	it('check recent searches', () => {
		cy.get('.relative [data-testid="location-selector-input"]').should('be.visible').type('Florida{enter}');
		cy.waitForLoad();

		cy.searchLocation('California');

		cy.searchLocation(' ', false);
		cy.get('[data-testid="location-selector"]').type('{backspace}');

		cy.get('[data-testid="filter-bar-sub-header"] [role="presentation"]').within(() => {
			cy.contains('California');
			cy.contains('Florida');
		});
	});
});
