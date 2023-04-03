// @team4
import impersonationdata from '../../../fixtures/impersonation.json';

describe('Login with Equipment manager user and Verify Not Exists of impersonate option', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('EquipmentmanagerUsername'), Cypress.env('EquipmentmanagerPassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('EquipmentMFA'));
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify Not Exists of impersonate option for Equipment manager user', () => {
		cy.myAcount_NotExistsOfImpersonateUser();
	});
});
