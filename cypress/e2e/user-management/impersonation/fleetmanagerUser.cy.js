// @team4
import impersonationdata from '../../../fixtures/impersonation.json';

describe('Login with Fleet manager user and Verify Not Exists of impersonate option', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('FleetmanagerUsername'), Cypress.env('FleetmanagerPassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('FleetMFA'));
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify Not Exists of impersonate option for Fleet manager user', () => {
		cy.myAcount_NotExistsOfImpersonateUser();
	});
});
