// @team4
let randomnumber = Math.floor(Math.random() * 10000);

describe('Verify no access to Usermanagement page for Customerservice', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('CustomerserviceUsename'), Cypress.env('CustomerservicePassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('CustomerMFA'));
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify not exists of Usermanagement access for Customerservice role', () => {
		//click on AppMenu and Verify not exists of Usermanagement menu Item
		cy.verifyNotExistsOfAppMenuItems('Usermanagement');
	});
});
