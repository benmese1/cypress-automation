// @team4
let randomnumber = Math.floor(Math.random() * 10000);

describe('Verify no access to My Org for fleetmanager', () => {
	beforeEach(() => {
		cy.loginWithOutAuthenticator(Cypress.env('FleetmanagerUsername'), Cypress.env('FleetmanagerPassword'), {
			cacheSession: false,
		});
		cy.authenticator(Cypress.env('FleetMFA'));
		cy.waitForLoad();
		cy.get("[aria-label='account of current user']").should('be.visible');
	});

	it('Verify not exists of My Organization view access and My Organization access for fleetmanager role', () => {
		//click on AppMenu and Verify not exists of My Organization menu Item
		cy.verifyNotExistsOfAppMenuItems('My Organization');
	});
});
