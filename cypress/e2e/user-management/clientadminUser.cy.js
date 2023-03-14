import impersonationdata from '../../fixtures/impersonation.json';

describe('Login with client admin user and Verify Not Exists of impersonate option', () => {
	beforeEach(() => {
		cy.login(Cypress.env('ClientadminUsername'), Cypress.env('ClientadminPassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify Not Exists of impersonate option for client admin user', () => {
		cy.myAcount_NotExistsOfImpersonateUser();
	});
});
