describe('Verify Organization management table view', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
		// Click Organization Management
		cy.dashboardMenu('My Organization');
	});

	it('Verify organization management table columns visibility in table view', () => {
		//verifying fields on the org mgmt table
		cy.get('[data-testid="column-header-company-name"]').should('be.visible');
		cy.get('[data-testid="column-header-parent-company"]').should('be.visible');
		cy.get('[data-testid="column-header-brand"]').should('be.visible');
		cy.get('[data-testid="column-header-type"]').should('be.visible');
		cy.get('[data-testid="column-header-time-zone"]').should('be.visible');
		cy.get('[data-testid="column-header-number-of-devices"]').should('be.visible');
		cy.get('[data-testid="column-header-updated-date"]').should('be.visible');
		cy.get('[data-testid="column-header-created-date"]').should('be.visible');
		cy.get('[data-testid="column-header-distance-unit-preference"]').should('be.visible');
	});

	it('Get the My organization name when user logged', () => {
		cy.url().should('include', '/organizations');
		cy.get('[data-testid="page"]').should('be.visible').contains('My Organization');
		cy.get('[data-testid="page"] h3').then(function ($elem) {
			cy.log('My Organization name:' + $elem.text());
		});
	});
});
