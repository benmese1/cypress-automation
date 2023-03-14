import impersonationdata from '../../fixtures/impersonation.json';

describe('Login with Supervisor user and Verify Not Exists of impersonate option', () => {
	beforeEach(() => {
		cy.login(Cypress.env('SupervisorUsername'), Cypress.env('SupervisorPassword'), {
			cacheSession: false,
		}).waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify Not Exists of impersonate option for Supervisor user', () => {
		cy.myAcount_NotExistsOfImpersonateUser();
	});
});
