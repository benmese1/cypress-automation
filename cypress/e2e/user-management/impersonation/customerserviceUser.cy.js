// @team4
import impersonationdata from '../../../fixtures/impersonation.json';

describe('Login with Customerservice user and Verify Not Exists of impersonate option', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('CustomerserviceUsername'), Cypress.env('CustomerservicePassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('CustomerMFA'));
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify Not Exists of impersonate option for CustomerserviceUsename', () => {
		cy.myAcount_NotExistsOfImpersonateUser();
	});
});
