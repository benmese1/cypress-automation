describe('Verify User management table view', () => {
	beforeEach(() => {
		cy.login(Cypress.env('TESTusername'), Cypress.env('TESTpassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
		// Click User Management
		cy.dashboardMenu('User Management');
	});

	it('Verify user management table columns visibility in table view', () => {
		//verifying fields on the user mgmt table
		cy.get('[data-testid="column-header-company/sub-company"]').should('be.visible');
		cy.get('[data-testid="column-header-last-name"]').should('be.visible');
		cy.get('[data-testid="column-header-first-name"]').should('be.visible');
		cy.get('[data-testid="column-header-username"]').should('be.visible');
		cy.get('[data-testid="column-header-email"]').should('be.visible');
		cy.get('[data-testid="column-header-phone-number"]').should('be.visible');
		cy.get('[data-testid="column-header-role"]').should('be.visible');
		cy.get('[data-testid="column-header-last-login-date"]').should('be.visible');
		cy.get('[data-testid="column-header-status"]').should('be.visible');
		cy.get('[data-testid="column-header-created-date"]').should('be.visible');
		cy.get('[data-testid="column-header-updated-date"]').should('be.visible');
	});

	it('Get organization name for the associated user logged', () => {
		cy.url().should('include', '/user-management');
		cy.get('[data-testid="page"]').should('be.visible').contains('User Management');
		cy.get('[data-testid="page"] h3').then(function ($elem) {
			cy.log('Organization name for the user:' + $elem.text());
		});
	});
});
