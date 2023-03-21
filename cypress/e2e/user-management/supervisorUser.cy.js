// @team4
import impersonationdata from '../../../fixtures/impersonation.json';

describe('Login with Supervisor user and Verify Not Exists of impersonate option', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('SupervisorUsername'), Cypress.env('SupervisorPassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('SupervisorMFA'));
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify Not Exists of impersonate option for Supervisor user', () => {
		cy.myAcount_NotExistsOfImpersonateUser();
	});
});
