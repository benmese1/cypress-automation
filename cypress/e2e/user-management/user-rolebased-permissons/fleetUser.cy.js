// @team4
let randomnumber = Math.floor(Math.random() * 10000);

describe('Verify no access to Usermanagement page for fleetmanager role', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('FleetmanagerUsername'), Cypress.env('FleetmanagerPassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('SupervisorMFA'));
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify not exists of Usermanagement access for fleetmanager role', () => {
		//click on AppMenu and Verify not exists of Usermanagement menu Item
		cy.verifyNotExistsOfAppMenuItems('Usermanagement');
	});
});
